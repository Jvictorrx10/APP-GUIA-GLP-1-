// Módulo de estado local para GLP-1 Natural App
// Gerencia todo o estado da aplicação usando LocalStorage

const DATA_SCHEMA_VERSION = 2;
const STORAGE_KEY = 'glp1_state_v1';

// Configurações
const CONFIG = {
  CORE_POINTS: 5,
  BONUS_POINTS: 2,
  LESSON_POINTS: 5,
  DAILY_POINTS_CAP: 100,
  MAX_CHECKS_PER_ITEM_PER_DAY: 1,
  DEBOUNCE_DELAY: 500
};

// Estado inicial limpo
const INITIAL_STATE = {
  version: DATA_SCHEMA_VERSION,
  createdAt: Date.now(),
  lastUpdated: Date.now(),
  points: 0,
  streakDays: 0,
  lastCheckDate: null,
  checkmarks: {}, // { "2024-01-15": { "diario_glp1": ["protein_breakfast", "water_intake"] } }
  lessons: {}, // { "1": { read: true, readAt: timestamp } }
  badges: [] // Array de IDs de medalhas conquistadas
};

// Utilitários de data
const DateUtils = {
  today() {
    return new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  },
  
  yesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
  },
  
  daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};

// Gerenciador de debounce
const DebounceManager = {
  timers: new Map(),
  
  debounce(key, fn, delay = CONFIG.DEBOUNCE_DELAY) {
    return new Promise((resolve, reject) => {
      // Cancelar timer anterior se existir
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
      }
      
      // Criar novo timer
      const timer = setTimeout(async () => {
        try {
          const result = await fn();
          this.timers.delete(key);
          resolve(result);
        } catch (error) {
          this.timers.delete(key);
          reject(error);
        }
      }, delay);
      
      this.timers.set(key, timer);
    });
  },
  
  cancel(key) {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  },
  
  cancelAll() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
};

// Funções principais de estado
export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...INITIAL_STATE };
    }
    
    const state = JSON.parse(stored);
    
    // Verificar versão e migrar se necessário
    if (!state.version || state.version !== DATA_SCHEMA_VERSION) {
      console.log('Migrando estado para nova versão...');
      return { ...INITIAL_STATE };
    }
    
    // Garantir que todas as propriedades existam
    return {
      ...INITIAL_STATE,
      ...state,
      lastUpdated: Date.now()
    };
  } catch (error) {
    console.error('Erro ao carregar estado:', error);
    return { ...INITIAL_STATE };
  }
}

export function saveState(state) {
  try {
    const stateToSave = {
      ...state,
      lastUpdated: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    return true;
  } catch (error) {
    console.error('Erro ao salvar estado:', error);
    return false;
  }
}

export function isChecked(listId, itemId, date = null) {
  const state = loadState();
  const checkDate = date || DateUtils.today();
  
  const dayCheckmarks = state.checkmarks[checkDate];
  if (!dayCheckmarks) return false;
  
  const listCheckmarks = dayCheckmarks[listId];
  if (!listCheckmarks || !Array.isArray(listCheckmarks)) return false;
  
  return listCheckmarks.includes(itemId);
}

export async function toggleChecklistItem({ listId, itemId, type, date = null }) {
  const checkDate = date || DateUtils.today();
  const debounceKey = `checklist_${listId}_${itemId}_${checkDate}`;
  
  return DebounceManager.debounce(debounceKey, async () => {
    const state = loadState();
    
    // Inicializar estruturas se não existirem
    if (!state.checkmarks[checkDate]) {
      state.checkmarks[checkDate] = {};
    }
    if (!state.checkmarks[checkDate][listId]) {
      state.checkmarks[checkDate][listId] = [];
    }
    
    const listCheckmarks = state.checkmarks[checkDate][listId];
    const isCurrentlyChecked = listCheckmarks.includes(itemId);
    const points = type === 'core' ? CONFIG.CORE_POINTS : CONFIG.BONUS_POINTS;
    
    if (!isCurrentlyChecked) {
      // Marcar item
      
      // Verificar limite de pontos diários
      if (state.points >= CONFIG.DAILY_POINTS_CAP) {
        throw new Error(`Limite diário de ${CONFIG.DAILY_POINTS_CAP} pontos atingido!`);
      }
      
      // Verificar se já foi marcado hoje (proteção extra)
      const todayCount = listCheckmarks.filter(id => id === itemId).length;
      if (todayCount >= CONFIG.MAX_CHECKS_PER_ITEM_PER_DAY) {
        throw new Error('Este item já foi marcado hoje!');
      }
      
      // Adicionar marcação
      listCheckmarks.push(itemId);
      
      // Adicionar pontos (respeitando o cap)
      state.points = Math.min(state.points + points, CONFIG.DAILY_POINTS_CAP);
      
      // Atualizar data da última marcação
      state.lastCheckDate = checkDate;
      
    } else {
      // Desmarcar item
      
      // Remover marcação
      const index = listCheckmarks.indexOf(itemId);
      if (index > -1) {
        listCheckmarks.splice(index, 1);
      }
      
      // Remover pontos (não pode ficar negativo)
      state.points = Math.max(state.points - points, 0);
    }
    
    // Recalcular streak
    state.streakDays = calculateStreak(state);
    
    // Salvar estado
    const saved = saveState(state);
    if (!saved) {
      throw new Error('Erro ao salvar estado');
    }
    
    return !isCurrentlyChecked; // Retorna novo estado
  });
}

export async function toggleLessonRead(lessonId) {
  const debounceKey = `lesson_${lessonId}`;
  
  return DebounceManager.debounce(debounceKey, async () => {
    const state = loadState();
    
    const isCurrentlyRead = state.lessons[lessonId]?.read || false;
    
    if (!isCurrentlyRead) {
      // Marcar como lida
      
      // Verificar limite de pontos diários
      if (state.points >= CONFIG.DAILY_POINTS_CAP) {
        throw new Error(`Limite diário de ${CONFIG.DAILY_POINTS_CAP} pontos atingido!`);
      }
      
      state.lessons[lessonId] = {
        read: true,
        readAt: Date.now()
      };
      
      // Adicionar pontos
      state.points = Math.min(state.points + CONFIG.LESSON_POINTS, CONFIG.DAILY_POINTS_CAP);
      
    } else {
      // Desfazer leitura
      
      if (state.lessons[lessonId]) {
        state.lessons[lessonId].read = false;
        delete state.lessons[lessonId].readAt;
      }
      
      // Remover pontos
      state.points = Math.max(state.points - CONFIG.LESSON_POINTS, 0);
    }
    
    // Salvar estado
    const saved = saveState(state);
    if (!saved) {
      throw new Error('Erro ao salvar estado');
    }
    
    return !isCurrentlyRead; // Retorna novo estado
  });
}

// Funções de cálculo
export function calculateStreak(state = null) {
  const currentState = state || loadState();
  const checkmarks = currentState.checkmarks;
  const dates = Object.keys(checkmarks).sort().reverse();
  
  if (dates.length === 0) return 0;
  
  let streak = 0;
  const today = DateUtils.today();
  
  // Verificar sequência a partir de hoje
  for (let i = 0; i < 30; i++) { // Máximo 30 dias para evitar loop infinito
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().slice(0, 10);
    
    const dayCheckmarks = checkmarks[dateStr];
    if (dayCheckmarks && Object.keys(dayCheckmarks).length > 0) {
      // Verificar se há pelo menos um item marcado neste dia
      const hasItems = Object.values(dayCheckmarks).some(list => 
        Array.isArray(list) && list.length > 0
      );
      
      if (hasItems) {
        streak++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  return streak;
}

export function getTodayCompletedCount(state = null) {
  const currentState = state || loadState();
  const today = DateUtils.today();
  const todayCheckmarks = currentState.checkmarks[today];
  
  if (!todayCheckmarks) return 0;
  
  return Object.values(todayCheckmarks).reduce((total, listItems) => {
    if (Array.isArray(listItems)) {
      return total + listItems.length;
    }
    return total;
  }, 0);
}

export function getJourneyDays(state = null) {
  const currentState = state || loadState();
  if (!currentState.createdAt) return 0;
  
  const daysDiff = Math.floor((Date.now() - currentState.createdAt) / (1000 * 60 * 60 * 24));
  return Math.max(0, daysDiff);
}

export function getCompletedLessons(state = null) {
  const currentState = state || loadState();
  return Object.keys(currentState.lessons).filter(lessonId => 
    currentState.lessons[lessonId]?.read
  );
}

// Função de reset completo (para debug/desenvolvimento)
export function hardReset() {
  try {
    // Limpar todas as chaves relacionadas
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.includes('glp1') || 
        key.includes('demo') || 
        key.includes('seed') || 
        key.includes('mock') || 
        key.includes('initial')
      )) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Cancelar todos os debounces
    DebounceManager.cancelAll();
    
    console.log('Estado resetado completamente');
    return true;
  } catch (error) {
    console.error('Erro ao resetar estado:', error);
    return false;
  }
}

// Função para inicialização segura
export function initializeApp() {
  // Limpar dados legados na primeira execução
  const hasLegacyData = localStorage.getItem('firstRun') !== null ||
                       localStorage.getItem('userProfiles') !== null ||
                       localStorage.getItem('checklistEntries') !== null;
  
  if (hasLegacyData) {
    console.log('Detectados dados legados, limpando...');
    
    // Remover chaves legadas específicas
    const legacyKeys = [
      'firstRun', 'userProfiles', 'checklistEntries', 'medals', 'microLessons',
      'demoPoints', 'mockProgress', 'initialBadges', 'seedUser', '__seed'
    ];
    
    legacyKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }
  
  // Carregar ou criar estado inicial
  const state = loadState();
  
  // Se é primeira execução, garantir estado zerado
  if (!localStorage.getItem(STORAGE_KEY)) {
    console.log('Primeira execução detectada, inicializando estado limpo');
    saveState(INITIAL_STATE);
    return INITIAL_STATE;
  }
  
  return state;
}

// Exportar configurações para uso externo
export const CONFIG_EXPORT = { ...CONFIG };

// Tornar funções disponíveis globalmente (compatibilidade)
if (typeof window !== 'undefined') {
  window.glp1State = {
    loadState,
    saveState,
    isChecked,
    toggleChecklistItem,
    toggleLessonRead,
    calculateStreak,
    getTodayCompletedCount,
    getJourneyDays,
    getCompletedLessons,
    hardReset,
    initializeApp,
    CONFIG: CONFIG_EXPORT
  };
}

