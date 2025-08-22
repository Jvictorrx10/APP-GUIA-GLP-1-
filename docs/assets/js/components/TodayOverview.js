// Componente TodayOverview
import { ProgressBar } from './ProgressBar.js';

export function TodayOverview({ completedToday, totalToday, currentStreak }) {
  const percentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  
  return `
    <div class="card animate-fade-in">
      <div class="text-center mb-6">
        <h2 class="title-font text-2xl text-gray-900 mb-2">Progresso de Hoje</h2>
        <p class="text-gray-600">
          ${completedToday === 0 ? 
            "Comece marcando seus primeiros itens nos checklists!" : 
            `Você completou ${completedToday} de ${totalToday} itens disponíveis`
          }
        </p>
      </div>
      
      <div class="mb-6">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span class="font-medium text-gray-700">Progresso Diário</span>
          <span class="text-sm font-semibold text-gray-900">${completedToday}/${totalToday} itens</span>
        </div>
        ${ProgressBar({ current: completedToday, total: totalToday })}
        <p class="text-sm text-gray-500" style="margin-top: 0.5rem;">
          ${percentage === 0 ? 
            "Marque seu primeiro item para começar!" :
            `${percentage}% dos itens diários concluídos`
          }
        </p>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div class="text-2xl font-bold text-green-600 title-font">${completedToday}</div>
          <div class="text-sm text-green-700">Itens Hoje</div>
        </div>
        <div class="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
          <div class="text-2xl font-bold text-orange-600 title-font">${currentStreak}</div>
          <div class="text-sm text-orange-700">Dias Seguidos</div>
        </div>
      </div>
    </div>
  `;
}

