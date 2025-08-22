import { loadState, getTodayCompletedCount } from '../localState.js';
import { ChecklistItem, setupChecklistEvents } from '../components/ChecklistItem.js';

// Dados dos checklists
const checklistsData = {
  diario_glp1: {
    title: "Checklist Diário GLP-1",
    icon: "🎯",
    color: "from-green-500 to-emerald-600",
    items: [
      { id: "protein_breakfast", text: "Comi proteína no café da manhã?", points: 5, type: "core", hint: "Ovos, iogurte grego, queijo cottage ou whey protein ajudam a ativar o GLP-1 naturalmente.", lessonId: 2 },
      { id: "water_intake", text: "Bebi 6–8 copos d'água hoje?", points: 5, type: "core", hint: "A hidratação adequada potencializa os efeitos do GLP-1 e melhora a digestão.", lessonId: 12 },
      { id: "mindful_eating", text: "Evitei distrações ao comer?", points: 5, type: "core", hint: "Comer sem TV, celular ou trabalho ajuda na percepção da saciedade.", lessonId: 11 },
      { id: "hunger_awareness", text: "Percebi se era fome real ou emocional?", points: 5, type: "core", hint: "Fome real vem gradualmente, fome emocional é súbita e específica.", lessonId: 15 },
      { id: "sleep_quality", text: "Dormi pelo menos 6 horas?", points: 5, type: "core", hint: "O sono inadequado reduz a produção de GLP-1 e aumenta a fome.", lessonId: 13 },
      { id: "breathing_exercise", text: "Respirei 3 vezes profundamente antes de comer?", points: 2, type: "bonus", hint: "A respiração ativa o sistema parassimpático, melhorando a digestão.", lessonId: 5 },
      { id: "meal_planning", text: "Planejei pelo menos 2 refeições do dia?", points: 5, type: "core", hint: "Planejar evita escolhas impulsivas e garante refeições equilibradas." },
      { id: "self_praise", text: "Me elogiei por alguma conquista hoje?", points: 2, type: "bonus", hint: "O autoelogio fortalece a autoestima e motiva a continuidade." },
      { id: "emotional_trigger", text: "Lidei bem com algum gatilho emocional?", points: 5, type: "core", hint: "Identifique o gatilho, respire e escolha uma resposta consciente." },
      { id: "recipe_usage", text: "Usei uma receita do guia?", points: 2, type: "bonus", hint: "As receitas foram desenvolvidas para maximizar o GLP-1 natural." },
      { id: "why_reinforcement", text: "Reforcei meu 'porquê' hoje?", points: 5, type: "core", hint: "Lembre-se do motivo que te trouxe até aqui - isso fortalece a motivação." },
      { id: "flexibility_mindset", text: "Pratiquei flexibilidade comigo mesma?", points: 5, type: "core", hint: "Flexibilidade é sustentabilidade. Seja gentil com seus deslizes.", lessonId: 3 }
    ]
  },
  semanal_habitos: {
    title: "Semanal de Hábitos",
    icon: "✅",
    color: "from-blue-500 to-cyan-600",
    items: [
      { id: "fiber_week", text: "7 dias incluindo fibras nas refeições", points: 20, type: "core", hint: "Verduras, frutas, grãos integrais ativam o GLP-1 e melhoram a saciedade.", lessonId: 4 },
      { id: "sleep_week", text: "7 noites com pelo menos 6h de sono", points: 20, type: "core", hint: "O sono regular é fundamental para o metabolismo e produção hormonal.", lessonId: 14 },
      { id: "planned_meals", text: "10 refeições planejadas na semana", points: 20, type: "core", hint: "Planejamento é a chave para escolhas conscientes e saudáveis." },
      { id: "guilt_free_week", text: "Uma semana sem culpa alimentar", points: 20, type: "core", hint: "A culpa gera estresse, que bloqueia o GLP-1. Seja gentil consigo." }
    ]
  },
  mentalidade_emocoes: {
    title: "Mentalidade & Emoções",
    icon: "🧠",
    color: "from-purple-500 to-pink-600",
    items: [
      { id: "hunger_emotion_check", text: "Identifiquei fome real vs. emocional", points: 3, type: "core", hint: "Fome física: gradual, qualquer alimento serve. Emocional: súbita, específica.", lessonId: 15 },
      { id: "emotion_journaling", text: "Escrevi sobre o que sinto", points: 3, type: "core", hint: "Escrever organiza pensamentos e ajuda a processar emoções.", lessonId: 16 },
      { id: "mindful_pause", text: "Fiz uma pausa consciente antes de comer", points: 3, type: "core", hint: "3 respirações profundas ativam a resposta relaxante do corpo.", lessonId: 17 },
      { id: "self_forgiveness", text: "Pratiquei o autoperdão", points: 3, type: "core", hint: "Perdoar-se quebra o ciclo de culpa e restrição que sabota o emagrecimento.", lessonId: 18 }
    ]
  },
  anti_sanfona: {
    title: "Anti-Efeito Sanfona",
    icon: "🛡️",
    color: "from-orange-500 to-red-600",
    items: [
      { id: "no_restriction", text: "Esqueço a mentalidade restritiva", points: 8, type: "core", hint: "Restrição extrema desregula hormônios e gera compulsão. Foque no equilíbrio." },
      { id: "want_vs_need", text: "Diferencio vontade de necessidade", points: 8, type: "core", hint: "Vontade passa, necessidade nutricional é constante e gradual." },
      { id: "sustainable_flexible", text: "Priorizo flexibilidade sustentável", points: 8, type: "core", hint: "80% das vezes fazendo bem já gera resultados incríveis e duradouros." },
      { id: "weekly_wins", text: "Revisei minhas vitórias da semana", points: 8, type: "core", hint: "Celebre pequenas conquistas - elas constroem confiança e motivação." }
    ]
  }
};

function getUrlParams() {
  const hash = window.location.hash;
  const [, queryString] = hash.split('?');
  
  if (!queryString) return {};
  
  const params = {};
  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
}

export default async function Checklists() {
  // Obter parâmetros da URL
  const params = getUrlParams();
  const requestedChecklist = params.checklist || 'diario_glp1';
  
  // Carregar estado
  const state = loadState();
  const todayPoints = state.points || 0;
  
  // Calcular progresso para cada tab
  function getTabProgress(tabKey) {
    const items = checklistsData[tabKey].items;
    const completed = items.filter(item => window.glp1State?.isChecked(tabKey, item.id) || false).length;
    return { completed, total: items.length };
  }
  
  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(251, 191, 36, 0.1) 50%, rgba(249, 115, 22, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1024px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-8">
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Seus <span class="golden-accent">Checklists</span>
          </h1>
          <p style="font-size: 1.125rem; color: #4b5563; max-width: 32rem; margin: 0 auto;">
            Acompanhe sua jornada diária rumo à transformação natural
          </p>
          
          <!-- Points Badge -->
          <div class="badge badge-primary" style="font-size: 1rem; padding: 0.5rem 1.5rem;">
            ${todayPoints} pontos hoje ✨
          </div>
        </div>

        <!-- Tabs -->
        <div class="mb-8">
          <div class="tabs-container" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            padding: 0.25rem;
            border-radius: 16px;
          ">
            ${Object.entries(checklistsData).map(([key, checklist]) => {
              const progress = getTabProgress(key);
              const isActive = key === requestedChecklist;
              
              return `
                <button 
                  onclick="window.navigate('Checklists?checklist=${key}')"
                  class="tab-button"
                  style="
                    padding: 1rem;
                    border: none;
                    border-radius: 12px;
                    background: ${isActive ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent'};
                    color: ${isActive ? 'white' : '#4b5563'};
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: center;
                  "
                >
                  <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${checklist.icon}</div>
                  <div style="font-size: 0.875rem; margin-bottom: 0.25rem;">${checklist.title}</div>
                  <div style="font-size: 0.75rem; opacity: 0.8;">${progress.completed}/${progress.total}</div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Checklist Content -->
        ${renderChecklistContent(requestedChecklist, checklistsData[requestedChecklist])}
      </div>
    </div>
  `;
}

function renderChecklistContent(checklistKey, checklist) {
  const progress = checklist.items.filter(item => window.glp1State?.isChecked(checklistKey, item.id) || false).length;
  
  return `
    <div class="card animate-fade-in">
      <!-- Checklist Header -->
      <div class="text-center mb-8">
        <div style="
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
        ">
          ${checklist.icon}
        </div>
        
        <h2 style="font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">
          ${checklist.title}
        </h2>
        
        <p style="color: #6b7280; margin-bottom: 1rem;">
          ${progress} de ${checklist.items.length} itens concluídos
        </p>
        
        <!-- Progress Bar -->
        <div class="progress-bar" style="max-width: 300px; margin: 0 auto;">
          <div class="progress-bar-fill" style="width: ${(progress / checklist.items.length) * 100}%;"></div>
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-4">
        ${checklist.items.map(item => renderChecklistItem(checklistKey, item)).join('')}
      </div>
    </div>
  `;
}

function renderChecklistItem(checklistKey, item) {
  const isChecked = window.glp1State?.isChecked(checklistKey, item.id) || false;
  const pointsColor = item.type === 'core' ? '#3b82f6' : '#f59e0b';
  
  return `
    <div class="card" style="
      border: 2px solid ${isChecked ? '#10b981' : '#e5e7eb'};
      background: ${isChecked ? 'rgba(16, 185, 129, 0.05)' : 'white'};
      transition: all 0.3s ease;
    ">
      <div style="display: flex; align-items: flex-start; gap: 1rem;">
        <!-- Checkbox -->
        <button 
          data-checklist-id="${checklistKey}"
          data-checklist-item="${item.id}"
          class="btn-checkbox ${isChecked ? 'completed' : ''}"
          style="
            width: 32px;
            height: 32px;
            flex-shrink: 0;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
          "
        >
          ${isChecked ? '✓' : ''}
        </button>
        
        <!-- Content -->
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <h3 style="
              font-size: 1rem;
              font-weight: 600;
              color: ${isChecked ? '#059669' : '#111827'};
              flex: 1;
            ">
              ${item.text}
            </h3>
            
            <!-- Points Badge -->
            <div class="badge" style="
              background: ${pointsColor};
              color: white;
              font-size: 0.75rem;
              padding: 0.25rem 0.5rem;
            ">
              ${item.points}pts
            </div>
          </div>
          
          <!-- Hint -->
          ${item.hint ? `
            <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
              <button 
                class="btn-hint"
                onclick="this.nextElementSibling.classList.toggle('hidden')"
                style="
                  width: 20px;
                  height: 20px;
                  flex-shrink: 0;
                  font-size: 0.75rem;
                  margin-top: 0.125rem;
                "
              >
                💡
              </button>
              <div class="hint-content hidden">
                ${item.hint}
              </div>
            </div>
          ` : ''}
          
          <!-- Lesson Link -->
          ${item.lessonId ? `
            <div style="margin-top: 0.75rem;">
              <a 
                href="#/Aula?id=${item.lessonId}" 
                style="
                  color: #3b82f6;
                  text-decoration: none;
                  font-size: 0.875rem;
                  font-weight: 500;
                  border-bottom: 1px solid transparent;
                  transition: border-color 0.2s ease;
                "
                onmouseover="this.style.borderColor='#3b82f6'"
                onmouseout="this.style.borderColor='transparent'"
              >
                📖 Ver micro-aula relacionada
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

