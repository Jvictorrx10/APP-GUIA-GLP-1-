// Página Medals
import { loadState, getTodayCompletedCount, calculateStreak, getJourneyDays } from '../localState.js';

// Definições das medalhas
const medalDefinitions = [
  {
    id: "first_3_days",
    name: "Primeiros Passos",
    description: "Complete 3 dias seguidos",
    icon: "🎯",
    color: "from-green-400 to-emerald-500",
    criteria: "3 dias de sequência",
    checkCriteria: (state) => {
      return calculateStreak(state) >= 3;
    }
  },
  {
    id: "fiber_week", 
    name: "Rainha das Fibras",
    description: "7 dias incluindo fibras nas refeições",
    icon: "❤️",
    color: "from-purple-400 to-pink-500",
    criteria: "Checklist semanal de fibras completo",
    checkCriteria: (state) => {
      // Verificar se tem fiber_week marcado em qualquer dia
      const checkmarks = state.checkmarks;
      return Object.values(checkmarks).some(dayData => 
        dayData.semanal_habitos && dayData.semanal_habitos.includes('fiber_week')
      );
    }
  },
  {
    id: "self_praise_5",
    name: "Amor Próprio",
    description: "5 ações de autoelogio",
    icon: "⭐",
    color: "from-yellow-400 to-orange-500", 
    criteria: "5 vezes se elogiando",
    checkCriteria: (state) => {
      const checkmarks = state.checkmarks;
      let selfPraiseCount = 0;
      Object.values(checkmarks).forEach(dayData => {
        if (dayData.diario_glp1 && dayData.diario_glp1.includes('self_praise')) {
          selfPraiseCount++;
        }
      });
      return selfPraiseCount >= 5;
    }
  },
  {
    id: "sleep_week",
    name: "Guardiã do Sono",
    description: "7 noites com 6h+ de sono",
    icon: "📅",
    color: "from-blue-400 to-cyan-500",
    criteria: "Semana completa de bom sono", 
    checkCriteria: (state) => {
      const checkmarks = state.checkmarks;
      return Object.values(checkmarks).some(dayData => 
        dayData.semanal_habitos && dayData.semanal_habitos.includes('sleep_week')
      );
    }
  },
  {
    id: "planned_meals",
    name: "Planejadora Expert",
    description: "10 refeições planejadas",
    icon: "⚡",
    color: "from-indigo-400 to-purple-500",
    criteria: "10 refeições bem planejadas",
    checkCriteria: (state) => {
      const checkmarks = state.checkmarks;
      return Object.values(checkmarks).some(dayData => 
        dayData.semanal_habitos && dayData.semanal_habitos.includes('planned_meals')
      );
    }
  },
  {
    id: "first_checklist",
    name: "Primeiro Passo", 
    description: "Marque seu primeiro item",
    icon: "🏆",
    color: "from-green-400 to-teal-500",
    criteria: "Primeira ação completada",
    checkCriteria: (state) => {
      return getTodayCompletedCount(state) >= 1 || Object.keys(state.checkmarks).length > 0;
    }
  },
  {
    id: "guilt_free_week",
    name: "Liberdade Emocional",
    description: "Primeira semana sem culpa",
    icon: "💚",
    color: "from-teal-400 to-green-500",
    criteria: "Semana livre de culpa alimentar",
    checkCriteria: (state) => {
      const checkmarks = state.checkmarks;
      return Object.values(checkmarks).some(dayData => 
        dayData.semanal_habitos && dayData.semanal_habitos.includes('guilt_free_week')
      );
    }
  },
  {
    id: "consistency_champion",
    name: "Campeã da Consistência",
    description: "7 dias com pelo menos 1 item",
    icon: "🥇",
    color: "from-amber-400 to-yellow-500",
    criteria: "Uma semana de ações diárias",
    checkCriteria: (state) => {
      const checkmarks = state.checkmarks;
      const datesWithItems = Object.keys(checkmarks).filter(date => {
        const dayData = checkmarks[date];
        return Object.values(dayData).some(listItems => 
          Array.isArray(listItems) && listItems.length > 0
        );
      });
      return datesWithItems.length >= 7;
    }
  }
];

export default async function Medals() {
  const state = loadState();
  const stats = {
    totalPoints: state.points || 0,
    currentStreak: calculateStreak(state),
    journeyDays: getJourneyDays(state)
  };
  
  // Verificar medalhas conquistadas
  const earnedMedals = [];
  medalDefinitions.forEach(medal => {
    if (medal.checkCriteria(state)) {
      earnedMedals.push(medal.id);
    }
  });
  
  const earnedCount = earnedMedals.length;
  const totalCount = medalDefinitions.length;

  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(251, 191, 36, 0.1) 50%, rgba(249, 115, 22, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1152px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-8">
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Suas <span class="golden-accent">Medalhas</span>
          </h1>
          <p style="font-size: 1.125rem; color: #4b5563; max-width: 32rem; margin: 0 auto;">
            ${earnedCount === 0 ? 
              "Suas conquistas aparecerão aqui conforme você progredir!" :
              "Celebre cada conquista na sua jornada de transformação"
            }
          </p>
        </div>

        <!-- Summary Card -->
        <div class="card text-center animate-fade-in mb-8">
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="
              padding: 1rem;
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              border-radius: 16px;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            ">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </div>
            <div style="text-align: left;">
              <h2 class="title-font" style="font-size: 1.875rem; color: #111827;">
                ${earnedCount} de ${totalCount}
              </h2>
              <p style="color: #4b5563;">Medalhas conquistadas</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6" style="max-width: 24rem; margin: 0 auto;">
            <div class="text-center">
              <p class="title-font golden-accent" style="font-size: 1.5rem;">${stats.totalPoints}</p>
              <p style="font-size: 0.875rem; color: #6b7280;">Pontos Totais</p>
            </div>
            <div class="text-center">
              <p class="title-font golden-accent" style="font-size: 1.5rem;">${earnedCount}</p>
              <p style="font-size: 0.875rem; color: #6b7280;">Conquistas</p>
            </div>
            <div class="text-center" style="grid-column: span 2; margin: 0 auto;">
              <p class="title-font golden-accent" style="font-size: 1.5rem;">
                ${totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0}%
              </p>
              <p style="font-size: 0.875rem; color: #6b7280;">Completado</p>
            </div>
          </div>
        </div>

        <!-- Medals Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          ${medalDefinitions.map((medal, index) => {
            const isEarned = earnedMedals.includes(medal.id);
            
            return `
              <div class="card text-center animate-fade-in" style="
                animation-delay: ${index * 0.1}s;
                transition: transform 0.2s ease;
                ${isEarned ? 'border: 2px solid rgba(251, 191, 36, 0.3); background: linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.05));' : ''}
              " onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                
                <div style="
                  display: inline-flex;
                  padding: 1rem;
                  border-radius: 16px;
                  margin-bottom: 1rem;
                  ${isEarned 
                    ? `background: linear-gradient(135deg, ${getGradientColors(medal.color)}); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); transform: scale(1.1);` 
                    : 'background: #f3f4f6;'
                  }
                  transition: all 0.3s ease;
                ">
                  ${isEarned ? 
                    `<span style="font-size: 2rem;">${medal.icon}</span>` :
                    `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>`
                  }
                </div>
                
                <h3 class="title-font" style="
                  font-size: 1.125rem;
                  margin-bottom: 0.5rem;
                  color: ${isEarned ? '#111827' : '#6b7280'};
                ">
                  ${medal.name}
                </h3>
                
                <p style="
                  font-size: 0.875rem;
                  margin-bottom: 0.75rem;
                  color: ${isEarned ? '#374151' : '#9ca3af'};
                ">
                  ${medal.description}
                </p>
                
                <p style="
                  font-size: 0.75rem;
                  font-weight: 500;
                  color: ${isEarned ? '#f59e0b' : '#9ca3af'};
                ">
                  ${medal.criteria}
                </p>
                
                ${isEarned ? `
                  <div style="
                    margin-top: 0.75rem;
                    padding: 0.25rem 0.75rem;
                    background: linear-gradient(90deg, #fbbf24, #f59e0b);
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 9999px;
                    display: inline-block;
                  ">
                    ✨ Conquistada!
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Motivational Message -->
        <div class="card text-center animate-fade-in" style="animation-delay: 0.5s;">
          <h3 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 1rem;">
            ${earnedCount >= 5 ? "🏆 Você é uma verdadeira campeã!" : 
             earnedCount >= 2 ? "⭐ Excelente progresso!" :
             earnedCount >= 1 ? "🌟 Primeira medalha conquistada!" :
             "🚀 Suas primeiras medalhas estão esperando!"}
          </h3>
          <p style="font-size: 1.125rem; color: #4b5563; line-height: 1.6; max-width: 48rem; margin: 0 auto;">
            ${earnedCount >= 5 ? "Sua dedicação é inspiradora! Você transformou pequenos hábitos em grandes conquistas." :
             earnedCount >= 2 ? "Continue assim! Cada medalha representa sua força de vontade e determinação." :
             earnedCount >= 1 ? "Parabéns pela sua primeira conquista! Este é apenas o começo da sua jornada de transformação." :
             "Marque seus primeiros itens nos checklists para conquistar suas primeiras medalhas. Cada ação conta!"}
          </p>
        </div>
        
      </div>
    </div>
  `;
}

function getGradientColors(gradient) {
  const gradients = {
    "from-green-400 to-emerald-500": "#4ade80, #10b981",
    "from-purple-400 to-pink-500": "#c084fc, #ec4899",
    "from-yellow-400 to-orange-500": "#facc15, #f97316",
    "from-blue-400 to-cyan-500": "#60a5fa, #06b6d4",
    "from-indigo-400 to-purple-500": "#818cf8, #8b5cf6",
    "from-green-400 to-teal-500": "#4ade80, #14b8a6",
    "from-teal-400 to-green-500": "#2dd4bf, #22c55e",
    "from-amber-400 to-yellow-500": "#fbbf24, #eab308"
  };
  return gradients[gradient] || "#60a5fa, #3b82f6";
}

