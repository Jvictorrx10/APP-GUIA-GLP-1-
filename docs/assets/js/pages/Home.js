// Página Home
import { loadState, getTodayCompletedCount, calculateStreak, getJourneyDays } from '../localState.js';
import { StatsCard } from '../components/StatsCard.js';
import { TodayOverview } from '../components/TodayOverview.js';
import { QuickActions } from '../components/QuickActions.js';

export default async function Home() {
  // Carregar dados do estado local
  const state = loadState();
  const stats = {
    totalPoints: state.points || 0,
    currentStreak: calculateStreak(state),
    journeyDays: getJourneyDays(state),
    completedToday: getTodayCompletedCount(state)
  };
  
  const maxDailyItems = 12;

  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(251, 191, 36, 0.1) 50%, rgba(249, 115, 22, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1152px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-8">
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Olá, <span class="golden-accent">linda</span>! ✨
          </h1>
          <p style="font-size: 1.125rem; color: #4b5563; max-width: 32rem; margin: 0 auto; line-height: 1.6;">
            Bem-vinda à sua jornada de transformação natural. Cada pequeno passo conta!
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          ${StatsCard({
            title: "Pontos Totais",
            value: stats.totalPoints,
            subtitle: stats.totalPoints === 0 ? "Comece marcando seus primeiros itens!" : "Continue coletando!",
            icon: "sparkles",
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
            title: "Jornada",
            value: `${stats.journeyDays} dia${stats.journeyDays !== 1 ? 's' : ''}`,
            subtitle: stats.journeyDays === 0 ? "Comece sua jornada!" : "Desde o início",
            icon: "calendar",
            gradient: "from-blue-500 to-cyan-600"
          })}
        </div>

        <!-- Today Overview -->
        <div class="mb-8">
          ${TodayOverview({
            completedToday: stats.completedToday,
            totalToday: maxDailyItems,
            currentStreak: stats.currentStreak
          })}
        </div>

        <!-- Quick Actions -->
        <div class="mb-8">
          <h2 class="title-font text-2xl text-gray-900 mb-6">Ações Rápidas</h2>
          ${QuickActions()}
        </div>

        <!-- Motivational Message -->
        <div class="card text-center">
          <h3 class="title-font text-2xl text-gray-900 mb-4">
            ${stats.totalPoints === 0 ? "Sua jornada começa agora!" : "Você não está apenas mudando hábitos..."}
          </h3>
          <p style="font-size: 1.125rem; color: #4b5563; line-height: 1.6; max-width: 48rem; margin: 0 auto;">
            ${stats.totalPoints === 0 ? (
              "Marque seu primeiro item nos checklists e comece a colecionar pontos. Pequenas ações geram grandes transformações! 🌱"
            ) : (
              `Você está <strong>criando uma nova versão de si mesma</strong>, uma pessoa que escolhe 
              o cuidado próprio, que honra seu corpo e que constrói uma relação saudável com a comida. 
              Continue assim! 🌟`
            )}
          </p>
        </div>
        
      </div>
    </div>
  `;
}

// Função para atualizar stats (será chamada por outros componentes)
window.refreshHomeStats = function() {
  // Recarregar a página Home se estiver ativa
  if (window.router && window.router.currentRoute === 'Home') {
    window.router.handleRoute();
  }
};

