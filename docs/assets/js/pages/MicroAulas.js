// Página MicroAulas
import { loadState, getCompletedLessons } from '../localState.js';

// Dados das micro-aulas organizados por fases
const microLessonsData = [
  {
    phase: 1,
    title: "Fundamentos do GLP-1 Natural",
    lessons: [
      { id: 1, title: "O que é GLP-1 Natural?", chapter: "Cap. 1" },
      { id: 2, title: "Por que proteína no café?", chapter: "Cap. 3" },
      { id: 3, title: "Por que dietas falham?", chapter: "Cap. 2" },
      { id: 4, title: "Fibras no almoço", chapter: "Cap. 3" },
      { id: 5, title: "Respirar antes de comer", chapter: "Cap. 4" },
      { id: 6, title: "Movimento simples já ajuda", chapter: "Cap. 5" }
    ]
  },
  {
    phase: 2,
    title: "Alimentação GLP-1 na Prática",
    lessons: [
      { id: 7, title: "Varie as fontes de fibras", chapter: "Cap. 3" },
      { id: 8, title: "Proteína no lanche também conta", chapter: "Cap. 3" },
      { id: 9, title: "Gorduras boas = saciedade", chapter: "Cap. 3" },
      { id: 10, title: "Inclua fermentados naturais", chapter: "Cap. 3" },
      { id: 11, title: "Coma sem distrações", chapter: "Cap. 4" },
      { id: 12, title: "A água ajuda o GLP-1", chapter: "Cap. 3" }
    ]
  },
  {
    phase: 3,
    title: "Emoções, Sono e Fome por Impulso",
    lessons: [
      { id: 13, title: "Sono é prioridade", chapter: "Cap. 4" },
      { id: 14, title: "Crie um ritual de sono", chapter: "Cap. 4" },
      { id: 15, title: "É fome ou emoção?", chapter: "Cap. 4" },
      { id: 16, title: "Escreva o que sente", chapter: "Cap. 4" },
      { id: 17, title: "Pausa antes de comer", chapter: "Cap. 4" },
      { id: 18, title: "Perdoe e recomece", chapter: "Cap. 6" }
    ]
  }
];

export default async function MicroAulas() {
  const state = loadState();
  const completedLessons = getCompletedLessons(state);
  
  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1024px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-8">
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Suas <span class="golden-accent">Micro-aulas</span>
          </h1>
          <p style="font-size: 1.125rem; color: #4b5563; max-width: 32rem; margin: 0 auto;">
            Aprenda os conceitos e coloque em prática com os checklists.
          </p>
        </div>

        <!-- Lesson List -->
        <div class="space-y-8">
          ${microLessonsData.map((phase, phaseIndex) => `
            <div class="card animate-fade-in" style="animation-delay: ${phaseIndex * 0.1}s;">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="
                  width: 48px;
                  height: 48px;
                  background: linear-gradient(135deg, #3b82f6, #4f46e5);
                  border-radius: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                  color: white;
                  font-weight: bold;
                  font-size: 1.25rem;
                ">
                  ${phase.phase}
                </div>
                <h2 class="title-font" style="font-size: 1.5rem; color: #111827;">
                  ${phase.title}
                </h2>
              </div>

              <div class="space-y-3">
                ${phase.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id.toString());
                  
                  return `
                    <a href="#/Aula?id=${lesson.id}" style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      padding: 1rem;
                      border-radius: 16px;
                      border: 1px solid #e5e7eb;
                      background: white;
                      text-decoration: none;
                      color: inherit;
                      transition: all 0.3s ease;
                      ${isCompleted ? 'border-color: #10b981; background: rgba(16, 185, 129, 0.05);' : ''}
                    " onmouseover="this.style.borderColor='#3b82f6'; this.style.background='rgba(59, 130, 246, 0.05)';" 
                       onmouseout="this.style.borderColor='${isCompleted ? '#10b981' : '#e5e7eb'}'; this.style.background='${isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'white'}';">
                      
                      <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="color: ${isCompleted ? '#10b981' : '#3b82f6'};">
                          ${isCompleted ? 
                            `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>` :
                            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>`
                          }
                        </div>
                        <div>
                          <h3 style="font-weight: 500; color: #111827; margin-bottom: 0.25rem;">
                            ${lesson.title}
                          </h3>
                          <span class="badge badge-outline" style="font-size: 0.75rem; color: #3b82f6; border-color: #3b82f6;">
                            ${lesson.chapter}
                          </span>
                        </div>
                      </div>
                      
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">
                        <polyline points="9,18 15,12 9,6"/>
                      </svg>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Ebook Access Button -->
        <div class="card text-center animate-fade-in" style="animation-delay: 0.4s;">
          <div style="
            display: inline-flex;
            padding: 1rem;
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            border-radius: 16px;
            margin-bottom: 1rem;
          ">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <h2 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 0.5rem;">
            Acesse o Guia Completo
          </h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem; max-width: 24rem; margin-left: auto; margin-right: auto;">
            Consulte o conteúdo original completo a qualquer momento para aprofundar seus conhecimentos.
          </p>
          <button 
            onclick="window.open('https://gamma.app/docs/O-Hormonio-Secreto-que-Pode-Mudar-Tudo-Seu-Guia-para-o-Emagrecime-iefsqtua7o3aeg6?mode=doc', '_blank')"
            class="btn btn-outline"
            style="border-color: #f59e0b; color: #f59e0b; padding: 0.75rem 1.5rem;"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" x2="21" y1="14" y2="3"/>
            </svg>
            Abrir no Gamma
          </button>
        </div>
        
      </div>
    </div>
  `;
}

