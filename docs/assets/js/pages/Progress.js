// Página Progress
import { loadState, calculateStreak, getTodayCompletedCount, getJourneyDays } from '../localState.js';
import { StatsCard } from '../components/StatsCard.js';
import { ProgressBar } from '../components/ProgressBar.js';

export default async function Progress() {
  const state = loadState();
  
  const stats = {
    totalPoints: state.points || 0,
    currentStreak: calculateStreak(state),
    completedToday: getTodayCompletedCount(state),
    journeyDays: getJourneyDays(state)
  };
  
  const weeklyGoal = 12;
  
  // Gerar dados da semana
  const weeklyData = generateWeeklyData(state);
  const weeklyCompleted = weeklyData.reduce((sum, day) => sum + day.entries, 0);
  const weeklyProgress = weeklyCompleted > 0 ? Math.min((weeklyCompleted / (weeklyGoal * 7)) * 100, 100) : 0;

  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(251, 191, 36, 0.1) 50%, rgba(249, 115, 22, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1152px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-8">
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Seu <span class="golden-accent">Progresso</span>
          </h1>
          <p style="font-size: 1.125rem; color: #4b5563; max-width: 32rem; margin: 0 auto;">
            ${stats.totalPoints === 0 ? 
              "Sua jornada de transformação está começando!" : 
              "Acompanhe sua jornada de transformação e celebre cada conquista"
            }
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          ${StatsCard({
            title: "Pontos Totais",
            value: stats.totalPoints,
            subtitle: stats.totalPoints === 0 ? "Marque seus primeiros itens!" : "Continue coletando!",
            icon: "award",
            gradient: "from-purple-500 to-pink-600"
          })}
          ${StatsCard({
            title: "Sequência Atual",
            value: `${stats.currentStreak} dia${stats.currentStreak !== 1 ? 's' : ''}`,
            subtitle: stats.currentStreak === 0 ? "Crie sua primeira sequência!" : "Mantenha o ritmo",
            icon: "target",
            gradient: "from-orange-500 to-red-600"
          })}
          ${StatsCard({
            title: "Hoje",
            value: `${stats.completedToday} itens`,
            subtitle: stats.completedToday === 0 ? "Comece marcando itens!" : "Completados",
            icon: "calendar",
            gradient: "from-green-500 to-emerald-600"
          })}
          ${StatsCard({
            title: "Jornada",
            value: `${stats.journeyDays} dia${stats.journeyDays !== 1 ? 's' : ''}`,
            subtitle: stats.journeyDays === 0 ? "Bem-vinda!" : "Desde o início",
            icon: "trendingUp",
            gradient: "from-blue-500 to-cyan-600"
          })}
        </div>

        <!-- Weekly Progress -->
        <div class="card animate-fade-in mb-8">
          <h2 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 1.5rem;">
            Semana Atual
          </h2>
          
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <span style="font-weight: 500; color: #374151;">Progresso Semanal</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">
                ${weeklyCompleted} de ${weeklyGoal * 7} itens
              </span>
            </div>
            ${ProgressBar({ current: weeklyCompleted, total: weeklyGoal * 7 })}
            <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">
              ${weeklyProgress === 0 ? 
                "Marque seus primeiros itens para ver o progresso!" :
                `${weeklyProgress.toFixed(1)}% da meta semanal alcançada`
              }
            </p>
          </div>

          <div class="grid grid-cols-7 gap-2" style="gap: 1rem;">
            ${weeklyData.map((day, index) => `
              <div class="text-center animate-fade-in" style="animation-delay: ${index * 0.1}s;">
                <div style="
                  width: 100%;
                  aspect-ratio: 1;
                  border-radius: 12px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 0.5rem;
                  transition: all 0.3s ease;
                  ${day.entries > 0 
                    ? 'background: linear-gradient(135deg, #10b981, #059669); color: white; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);' 
                    : 'background: #f3f4f6; color: #9ca3af;'
                  }
                ">
                  <span style="font-weight: bold; font-size: 1.125rem;">${day.entries}</span>
                  <span style="font-size: 0.75rem; opacity: 0.8;">${day.points}pts</span>
                </div>
                <span style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; display: block; font-weight: 500;">
                  ${day.day}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Motivational Message -->
        <div class="card text-center animate-fade-in" style="animation-delay: 0.3s;">
          <h3 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 1rem;">
            ${stats.currentStreak >= 7 ? "🎉 Incrível! Você está no caminho certo!" :
             stats.currentStreak >= 3 ? "⭐ Ótimo progresso! Continue assim!" :
             stats.totalPoints === 0 ? "🌱 Sua jornada começa agora!" :
             "🌱 Cada dia é um novo começo!"}
          </h3>
          <p style="font-size: 1.125rem; color: #4b5563; line-height: 1.6; max-width: 48rem; margin: 0 auto;">
            ${stats.currentStreak >= 7 ? "Sua consistência é inspiradora! Você está criando hábitos duradouros e transformando sua relação com o autocuidado." :
             stats.currentStreak >= 3 ? "Você está construindo uma rotina sólida. Pequenas ações consistentes geram grandes transformações." :
             stats.totalPoints === 0 ? "Marque seu primeiro item nos checklists e comece a construir sua nova rotina de autocuidado. Cada pequeno passo conta!" :
             "Lembre-se: não é sobre a perfeição, é sobre o progresso. Cada check é um passo em direção à melhor versão de você."}
          </p>
        </div>
        
      </div>
    </div>
  `;
}

function generateWeeklyData(state) {
  const weekData = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    
    // Calcular entradas para este dia
    const dayCheckmarks = state.checkmarks[dateStr] || {};
    const entries = Object.values(dayCheckmarks).reduce((total, listItems) => {
      if (Array.isArray(listItems)) {
        return total + listItems.length;
      }
      return total;
    }, 0);
    
    // Calcular pontos (estimativa baseada em 5 pontos por item)
    const points = entries * 5;
    
    // Nome do dia
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const day = dayNames[date.getDay()];
    
    weekData.push({
      date: dateStr,
      day,
      entries,
      points
    });
  }
  
  return weekData;
}

