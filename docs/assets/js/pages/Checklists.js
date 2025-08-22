// Página Checklists
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
    const completed = items.filter(item => window.glp1State.isChecked(tabKey, item.id)).length;
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
            gap: 0.25rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            padding: 0.25rem;
            border-radius: 16px;
            margin-bottom: 2rem;
          ">
            ${Object.entries(checklistsData).map(([key, data]) => {
              const progress = getTabProgress(key);
              const isActive = key === requestedChecklist;
              
              return `
                <button 
                  class="tab-button ${isActive ? 'active' : ''}"
                  data-tab="${key}"
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    border: none;
                    border-radius: 12px;
                    background: ${isActive ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))' : 'transparent'};
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: center;
                    ${isActive ? 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);' : ''}
                  "
                >
                  <span style="font-size: 1.25rem;">${data.icon}</span>
                  <span style="font-weight: 500; font-size: 0.75rem; line-height: 1.2;">
                    ${data.title}
                  </span>
                  <span class="badge badge-outline" style="font-size: 0.75rem;">
                    ${progress.completed}/${progress.total}
                  </span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tab Content -->
        <div id="tab-content">
          ${renderTabContent(requestedChecklist, checklistsData[requestedChecklist])}
        </div>
        
      </div>
    </div>
    
    <script>
      // Setup tab switching
      document.addEventListener('click', (e) => {
        if (e.target.closest('.tab-button')) {
          const button = e.target.closest('.tab-button');
          const tabKey = button.dataset.tab;
          
          // Update URL
          window.location.hash = '#/Checklists?checklist=' + tabKey;
        }
      });
      
      // Setup checklist events
      ${setupChecklistEvents.toString()}
      setupChecklistEvents();
    </script>
  `;
}

function renderTabContent(tabKey, tabData) {
  const progress = getTabProgress(tabKey);
  
  return `
    <div class="animate-fade-in">
      <!-- Tab Header -->
      <div class="card text-center mb-6">
        <div style="
          display: inline-flex;
          padding: 1rem;
          border-radius: 16px;
          background: linear-gradient(135deg, ${getGradientColors(tabData.color)});
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          margin-bottom: 1rem;
        ">
          <span style="font-size: 2rem;">${tabData.icon}</span>
        </div>
        <h2 class="title-font" style="font-size: 1.875rem; color: #111827; margin-bottom: 0.5rem;">
          ${tabData.title}
        </h2>
        <p style="color: #4b5563;">
          ${progress.completed} de ${progress.total} itens concluídos
        </p>
      </div>

      <!-- Items -->
      <div class="space-y-4">
        ${tabData.items.map((item, index) => 
          ChecklistItem({ item, listId: tabKey, index, lessonId: item.lessonId })
        ).join('')}
      </div>
    </div>
  `;
}

function getTabProgress(tabKey) {
  const items = checklistsData[tabKey].items;
  const completed = items.filter(item => window.glp1State?.isChecked(tabKey, item.id) || false).length;
  return { completed, total: items.length };
}

function getGradientColors(gradient) {
  const gradients = {
    "from-green-500 to-emerald-600": "#10b981, #059669",
    "from-blue-500 to-cyan-600": "#3b82f6, #0891b2",
    "from-purple-500 to-pink-600": "#8b5cf6, #db2777",
    "from-orange-500 to-red-600": "#f97316, #dc2626"
  };
  return gradients[gradient] || "#3b82f6, #1d4ed8";
}

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

