// Componente ChecklistItem
import { toggleChecklistItem, isChecked } from '../localState.js';

export function ChecklistItem({ item, listId, index = 0, lessonId }) {
  const isCompleted = isChecked(listId, item.id);
  const itemId = `checklist-item-${listId}-${item.id}`;
  
  return `
    <div class="animate-fade-in" style="animation-delay: ${index * 0.1}s;">
      <div class="card ${isCompleted ? 'ring-2 ring-green-200 bg-green-50/50' : ''}" style="transition: all 0.3s ease;">
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          
          <!-- Checkbox Button -->
          <button 
            id="${itemId}"
            class="btn-checkbox ${isCompleted ? 'completed' : ''}"
            style="
              flex-shrink: 0;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 2px solid ${isCompleted ? '#10b981' : '#d1d5db'};
              background: ${isCompleted ? '#10b981' : 'transparent'};
              color: ${isCompleted ? 'white' : '#10b981'};
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0;
            "
            data-list-id="${listId}"
            data-item-id="${item.id}"
            data-type="${item.type}"
            data-points="${item.points}"
          >
            <span class="spinner hidden">
              <div style="width: 16px; height: 16px; border: 2px solid #e5e7eb; border-top: 2px solid #10b981; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </span>
            <span class="check-icon ${isCompleted ? '' : 'hidden'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </span>
            <span class="uncheck-icon ${isCompleted ? 'hidden' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </span>
          </button>

          <!-- Content -->
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.5rem;">
              <p style="font-weight: 500; line-height: 1.5; color: ${isCompleted ? '#047857' : '#111827'};">
                ${item.text}
              </p>
              
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
                <!-- Points Badge -->
                <span class="badge ${item.type === 'core' ? 'badge-primary' : 'badge-outline'}" style="font-size: 0.75rem;">
                  ${isCompleted ? `+${item.points}` : item.points}pts
                </span>
                
                <!-- Hint Button -->
                ${item.hint ? `
                  <button 
                    class="btn-hint"
                    style="
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      border: none;
                      background: #f3f4f6;
                      color: #9ca3af;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.2s ease;
                    "
                    onclick="toggleHint('${itemId}-hint')"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" x2="12.01" y1="17" y2="17"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
            </div>

            <!-- Lesson Link -->
            ${lessonId ? `
              <a href="#/Aula?id=${lessonId}" style="
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
                font-size: 0.75rem;
                color: #2563eb;
                text-decoration: none;
                margin-top: 0.5rem;
                transition: color 0.2s ease;
              ">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                <span>Ver micro-aula relacionada</span>
              </a>
            ` : ''}

            <!-- Hint Content -->
            ${item.hint ? `
              <div id="${itemId}-hint" class="hint-content hidden" style="
                margin-top: 0.75rem;
                padding: 0.75rem;
                background: #f9fafb;
                border-radius: 8px;
                font-size: 0.875rem;
                color: #4b5563;
                line-height: 1.5;
              ">
                ${item.hint}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Função para toggle de hint
window.toggleHint = function(hintId) {
  const hintElement = document.getElementById(hintId);
  if (hintElement) {
    hintElement.classList.toggle('hidden');
  }
};

// Configurar event listeners para checkboxes
export function setupChecklistEvents() {
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.btn-checkbox')) {
      const button = e.target.closest('.btn-checkbox');
      const listId = button.dataset.listId;
      const itemId = button.dataset.itemId;
      const type = button.dataset.type;
      const points = parseInt(button.dataset.points);
      
      // Prevenir múltiplos cliques
      if (button.disabled) return;
      
      try {
        // Mostrar loading
        button.disabled = true;
        const spinner = button.querySelector('.spinner');
        const checkIcon = button.querySelector('.check-icon');
        const uncheckIcon = button.querySelector('.uncheck-icon');
        
        spinner.classList.remove('hidden');
        checkIcon.classList.add('hidden');
        uncheckIcon.classList.add('hidden');
        
        // Toggle item
        const newState = await toggleChecklistItem({
          listId,
          itemId,
          type,
          points
        });
        
        // Atualizar UI
        updateCheckboxUI(button, newState);
        
        // Mostrar toast
        window.showToast(
          newState ? `Item marcado (+${points} pontos)` : `Item desmarcado (-${points} pontos)`,
          newState ? 'success' : 'info'
        );
        
        // Atualizar stats na Home
        if (window.refreshHomeStats) {
          window.refreshHomeStats();
        }
        
      } catch (error) {
        console.error('Erro ao toggle item:', error);
        window.showToast(error.message, 'error');
      } finally {
        // Esconder loading
        setTimeout(() => {
          button.disabled = false;
          const spinner = button.querySelector('.spinner');
          spinner.classList.add('hidden');
        }, 500);
      }
    }
  });
}

function updateCheckboxUI(button, isCompleted) {
  const card = button.closest('.card');
  const checkIcon = button.querySelector('.check-icon');
  const uncheckIcon = button.querySelector('.uncheck-icon');
  const pointsBadge = card.querySelector('.badge');
  const itemText = card.querySelector('p');
  
  // Atualizar botão
  button.style.border = `2px solid ${isCompleted ? '#10b981' : '#d1d5db'}`;
  button.style.background = isCompleted ? '#10b981' : 'transparent';
  button.style.color = isCompleted ? 'white' : '#10b981';
  
  // Atualizar ícones
  if (isCompleted) {
    checkIcon.classList.remove('hidden');
    uncheckIcon.classList.add('hidden');
  } else {
    checkIcon.classList.add('hidden');
    uncheckIcon.classList.remove('hidden');
  }
  
  // Atualizar card
  if (isCompleted) {
    card.classList.add('ring-2', 'ring-green-200');
    card.style.background = 'rgba(34, 197, 94, 0.05)';
  } else {
    card.classList.remove('ring-2', 'ring-green-200');
    card.style.background = '';
  }
  
  // Atualizar texto
  itemText.style.color = isCompleted ? '#047857' : '#111827';
  
  // Atualizar badge de pontos
  const points = button.dataset.points;
  pointsBadge.textContent = isCompleted ? `+${points}pts` : `${points}pts`;
}

