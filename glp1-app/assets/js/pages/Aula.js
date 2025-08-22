// Página Aula
import { loadState, toggleLessonRead } from '../localState.js';

// Dados completos das micro-aulas
const microLessonsData = [
    { id: 1, title: "O que é GLP-1 Natural?", chapter: "Cap. 1", content: "O GLP-1 (Peptídeo 1 semelhante ao glucagon) é um hormônio intestinal que regula o apetite, a glicose e a digestão. Ativá-lo naturalmente é a chave para um emagrecimento sustentável sem medicamentos. Ele funciona enviando sinais de saciedade para o cérebro, retardando o esvaziamento do estômago e otimizando a liberação de insulina.", checklistType: 'diario_glp1', points: 5 },
    { id: 2, title: "Por que proteína no café?", chapter: "Cap. 3", content: "A proteína é o macronutriente que mais estimula a liberação de GLP-1. Começar o dia com ela sinaliza saciedade ao cérebro, reduzindo a fome e os desejos por doces ao longo do dia. Fontes como ovos, iogurte grego e whey protein são excelentes.", checklistId: 'protein_breakfast', checklistType: 'diario_glp1', points: 5 },
    { id: 3, title: "Por que dietas falham?", chapter: "Cap. 2", content: "Dietas restritivas criam um ciclo de privação e culpa, aumentando o estresse (cortisol) que, por sua vez, inibe o GLP-1. O foco deve ser em adicionar hábitos, não em restringir alimentos. A mentalidade da abundância é mais eficaz que a da escassez.", checklistId: 'flexibility_mindset', checklistType: 'diario_glp1', points: 5 },
    { id: 4, title: "Fibras no almoço", chapter: "Cap. 3", content: "As fibras, especialmente as solúveis (aveia, leguminosas, maçã), fermentam no intestino e produzem ácidos graxos de cadeia curta (AGCC), que são potentes ativadores da secreção de GLP-1.", checklistId: 'fiber_week', checklistType: 'semanal_habitos', points: 5 },
    { id: 5, title: "Respirar antes de comer", chapter: "Cap. 4", content: "A respiração profunda ativa o sistema nervoso parassimpático, o modo 'descansar e digerir'. Isso reduz o cortisol e melhora a sensibilidade do corpo ao GLP-1, além de aumentar a consciência sobre a fome real.", checklistId: 'breathing_exercise', checklistType: 'diario_glp1', points: 5 },
    { id: 6, title: "Movimento simples já ajuda", chapter: "Cap. 5", content: "O exercício, mesmo leve, aumenta a produção de GLP-1 e melhora a sensibilidade à insulina. Uma caminhada após as refeições já faz uma grande diferença para regular o açúcar no sangue.", checklistType: 'semanal_habitos', points: 5 },
    { id: 7, title: "Varie as fontes de fibras", chapter: "Cap. 3", content: "Cada tipo de fibra alimenta diferentes bactérias benéficas no intestino. Variar entre folhas, legumes, grãos e sementes cria um microbioma mais rico, que por sua vez produz mais GLP-1.", checklistType: 'semanal_habitos', points: 5 },
    { id: 8, title: "Proteína no lanche também conta", chapter: "Cap. 3", content: "Um lanche com proteína, como um punhado de nozes ou um iogurte, mantém os níveis de GLP-1 estáveis entre as refeições, prevenindo picos de fome e quedas de energia.", checklistType: 'diario_glp1', points: 5 },
    { id: 9, title: "Gorduras boas = saciedade", chapter: "Cap. 3", content: "Gorduras saudáveis, como as do abacate, azeite de oliva e nozes, também estimulam o GLP-1. Elas retardam a digestão, prolongando a sensação de saciedade por mais tempo.", checklistType: 'semanal_habitos', points: 5 },
    { id: 10, title: "Inclua fermentados naturais", chapter: "Cap. 3", content: "Alimentos como iogurte natural, kefir e chucrute são ricos em probióticos, que melhoram a saúde intestinal e a capacidade do seu corpo de produzir GLP-1.", checklistType: 'semanal_habitos', points: 5 },
    { id: 11, title: "Coma sem distrações", chapter: "Cap. 4", content: "O ato de prestar atenção na comida (mindful eating) melhora a digestão e a comunicação entre o intestino e o cérebro, tornando os sinais de saciedade do GLP-1 mais eficazes.", checklistId: 'mindful_eating', checklistType: 'diario_glp1', points: 5 },
    { id: 12, title: "A água ajuda o GLP-1", chapter: "Cap. 3", content: "A hidratação é fundamental para a digestão e para que as fibras façam seu trabalho de estimular o GLP-1. Beber água ao longo do dia é um ato simples e poderoso.", checklistId: 'water_intake', checklistType: 'diario_glp1', points: 5 },
    { id: 13, title: "Sono é prioridade", chapter: "Cap. 4", content: "A privação do sono desregula os hormônios da fome (grelina e leptina) e reduz a produção de GLP-1. Priorizar 7-8 horas de sono é crucial para o emagrecimento.", checklistId: 'sleep_quality', checklistType: 'diario_glp1', points: 5 },
    { id: 14, title: "Crie um ritual de sono", chapter: "Cap. 4", content: "Desligar telas, tomar um chá calmante ou ler um livro antes de dormir ajuda o corpo a relaxar, diminuir o cortisol e preparar-se para uma noite de sono reparadora, otimizando o GLP-1 do dia seguinte.", checklistId: 'sleep_week', checklistType: 'semanal_habitos', points: 5 },
    { id: 15, title: "É fome ou emoção?", chapter: "Cap. 4", content: "A fome emocional é uma busca por conforto, não por nutrientes. Aprender a identificar a diferença e a lidar com as emoções de outras formas (caminhar, conversar, escrever) é fundamental.", checklistId: 'hunger_awareness', checklistType: 'diario_glp1', points: 5 },
    { id: 16, title: "Escreva o que sente", chapter: "Cap. 4", content: "O journaling é uma ferramenta poderosa para processar emoções sem usar a comida. Colocar os sentimentos no papel ajuda a entendê-los e a reduzir a alimentação por impulso.", checklistId: 'emotion_journaling', checklistType: 'mentalidade_emocoes', points: 5 },
    { id: 17, title: "Pausa antes de comer", chapter: "Cap. 4", content: "A simples ação de parar e respirar 3 vezes antes de comer cria um espaço entre o impulso e a ação, permitindo uma escolha mais consciente e alinhada com seus objetivos.", checklistId: 'mindful_pause', checklistType: 'mentalidade_emocoes', points: 5 },
    { id: 18, title: "Perdoe e recomece", chapter: "Cap. 6", content: "A culpa por um 'deslize' alimentar gera mais estresse e mais compulsão. Praticar o autoperdão quebra esse ciclo. Cada refeição é uma nova oportunidade de fazer uma boa escolha.", checklistId: 'self_forgiveness', checklistType: 'mentalidade_emocoes', points: 5 }
];

function findLessonById(id) {
  return microLessonsData.find(l => l.id === id) || null;
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

export default async function Aula() {
  const params = getUrlParams();
  const lessonId = parseInt(params.id, 10);
  const lesson = findLessonById(lessonId);
  
  if (!lesson) {
    return `
      <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
        <h1 style="font-size: 1.5rem; font-weight: bold; color: #dc2626; margin-bottom: 0.5rem;">
          Aula não encontrada
        </h1>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">
          A aula que você está procurando não existe ou foi movida.
        </p>
        <a href="#/MicroAulas" class="btn btn-primary">
          Voltar para as Aulas
        </a>
      </div>
    `;
  }
  
  const state = loadState();
  const isCompleted = state.lessons[lessonId.toString()]?.read || false;

  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 768px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Back Button -->
        <div class="animate-fade-in" style="margin-bottom: 2rem;">
          <a href="#/MicroAulas" style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #4b5563;
            text-decoration: none;
            transition: color 0.2s ease;
          " onmouseover="this.style.color='#111827'" onmouseout="this.style.color='#4b5563'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            <span>Voltar para todas as aulas</span>
          </a>
        </div>

        <!-- Lesson Content -->
        <div class="card animate-fade-in" style="padding: 3rem 2rem;">
          
          <!-- Header -->
          <header class="text-center space-y-4" style="margin-bottom: 2rem;">
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              background: rgba(59, 130, 246, 0.1);
              color: #1d4ed8;
              padding: 0.5rem 1rem;
              border-radius: 9999px;
              font-size: 0.875rem;
              font-weight: 500;
              margin-bottom: 1rem;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <span>${lesson.chapter}</span>
            </div>
            
            <h1 class="title-font" style="font-size: 2.5rem; color: #111827; line-height: 1.2;">
              ${lesson.title}
            </h1>
            
            ${isCompleted ? `
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(16, 185, 129, 0.1);
                color: #047857;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 500;
              ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Aula concluída</span>
              </div>
            ` : ''}
          </header>

          <!-- Content -->
          <article style="
            font-size: 1.125rem;
            color: #374151;
            line-height: 1.7;
            text-align: justify;
            margin-bottom: 2rem;
          ">
            <p>${lesson.content}</p>
          </article>

          <!-- Footer -->
          <footer style="padding-top: 2rem; border-top: 1px solid #e5e7eb;">
            
            <!-- Toggle Button -->
            <div class="text-center" style="margin-bottom: 2rem;">
              <button 
                id="lesson-toggle-btn"
                class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}"
                style="padding: 0.75rem 1.5rem; font-size: 1rem;"
                data-lesson-id="${lessonId}"
                data-points="${lesson.points}"
              >
                <span class="spinner hidden" style="margin-right: 0.5rem;">
                  <div style="width: 20px; height: 20px; border: 2px solid #e5e7eb; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                </span>
                <span class="btn-icon">
                  ${isCompleted ? 
                    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                      <line x1="18" x2="6" y1="6" y2="18"/>
                      <line x1="6" x2="18" y1="6" y2="18"/>
                    </svg>` :
                    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>`
                  }
                </span>
                <span class="btn-text">
                  ${isCompleted 
                    ? `Desfazer Leitura (−${lesson.points} pontos)` 
                    : `Marcar como Lido (+${lesson.points} pontos)`
                  }
                </span>
              </button>
            </div>

            <!-- Call to Action -->
            <div class="text-center space-y-4">
              <h3 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">
                Pronta para a prática?
              </h3>
              <p style="color: #4b5563; margin-bottom: 1.5rem;">
                Agora que você aprendeu o conceito, vamos aplicar no seu dia a dia.
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: center;">
                <a href="#/Checklists?checklist=${lesson.checklistType}" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 1rem;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.75rem;">
                    <polyline points="9,11 12,14 22,4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  Ir para o Checklist
                </a>
                
                <button 
                  onclick="window.open('https://gamma.app/docs/O-Hormonio-Secreto-que-Pode-Mudar-Tudo-Seu-Guia-para-o-Emagrecime-iefsqtua7o3aeg6?mode=doc', '_blank')"
                  class="btn btn-outline"
                  style="padding: 0.75rem 1.5rem;"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" x2="21" y1="14" y2="3"/>
                  </svg>
                  Ver no Gamma
                </button>
              </div>
            </div>
          </footer>
        </div>
        
      </div>
    </div>
    
    <script>
      // Setup lesson toggle
      document.addEventListener('click', async (e) => {
        if (e.target.closest('#lesson-toggle-btn')) {
          const button = e.target.closest('#lesson-toggle-btn');
          const lessonId = button.dataset.lessonId;
          const points = parseInt(button.dataset.points);
          
          // Prevenir múltiplos cliques
          if (button.disabled) return;
          
          try {
            // Mostrar loading
            button.disabled = true;
            const spinner = button.querySelector('.spinner');
            const icon = button.querySelector('.btn-icon');
            const text = button.querySelector('.btn-text');
            
            spinner.classList.remove('hidden');
            icon.style.opacity = '0';
            
            // Toggle lesson
            const newState = await window.glp1State.toggleLessonRead(lessonId);
            
            // Atualizar UI
            updateLessonUI(button, newState, points);
            
            // Mostrar toast
            window.showToast(
              newState ? \`Marcada como lida (+\${points} pontos)\` : \`Leitura desfeita (−\${points} pontos)\`,
              newState ? 'success' : 'info'
            );
            
            // Atualizar stats na Home
            if (window.refreshHomeStats) {
              window.refreshHomeStats();
            }
            
          } catch (error) {
            console.error('Erro ao toggle lesson:', error);
            window.showToast(error.message, 'error');
          } finally {
            // Esconder loading
            setTimeout(() => {
              button.disabled = false;
              const spinner = button.querySelector('.spinner');
              const icon = button.querySelector('.btn-icon');
              spinner.classList.add('hidden');
              icon.style.opacity = '1';
            }, 500);
          }
        }
      });
      
      function updateLessonUI(button, isCompleted, points) {
        const icon = button.querySelector('.btn-icon');
        const text = button.querySelector('.btn-text');
        
        // Atualizar classe do botão
        if (isCompleted) {
          button.classList.remove('btn-primary');
          button.classList.add('btn-secondary');
        } else {
          button.classList.remove('btn-secondary');
          button.classList.add('btn-primary');
        }
        
        // Atualizar ícone
        icon.innerHTML = isCompleted ? 
          \`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
          </svg>\` :
          \`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
            <polyline points="20,6 9,17 4,12"/>
          </svg>\`;
        
        // Atualizar texto
        text.textContent = isCompleted 
          ? \`Desfazer Leitura (−\${points} pontos)\`
          : \`Marcar como Lido (+\${points} pontos)\`;
      }
    </script>
  `;
}

