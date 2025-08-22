// Página Pro
export default async function Pro() {
  const currentFeatures = [
    "4 Checklists completos",
    "18 Micro-aulas essenciais", 
    "Sistema de pontos e medalhas",
    "Progresso detalhado",
    "100% offline e privado"
  ];

  const proPromises = [
    "Acelerar a ativação diária do GLP-1",
    "Manter saciedade por muito mais tempo",
    "Plano de 14 dias estruturado",
    "30+ receitas anti-inflamatórias",
    "Rotinas completas anti-estresse",
    "Planejador semanal personalizado"
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "O método mudou completamente minha relação com a comida. Não sinto mais aquela fome desesperadora!",
      avatar: "M"
    },
    {
      name: "Ana Costa", 
      text: "Finalmente encontrei um caminho sustentável. As receitas são deliciosas e funcionam de verdade.",
      avatar: "A"
    },
    {
      name: "Lucia Santos",
      text: "Duas semanas seguindo o método e já sinto a diferença na saciedade. Recomendo!",
      avatar: "L"
    }
  ];

  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1152px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-6 mb-12">
          <div class="animate-fade-in" style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(90deg, #8b5cf6, #ec4899);
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>
            <span style="font-weight: 600;">Método Emagrecer Pro</span>
          </div>
          
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Você está pronta para
          </h1>
          <h2 class="title-font golden-accent" style="font-size: 2rem; margin-bottom: 1rem;">
            acelerar seus resultados?
          </h2>
          
          <p style="font-size: 1.25rem; color: #4b5563; max-width: 48rem; margin: 0 auto; line-height: 1.6;">
            Descubra o método completo que vai acelerar a ativação do seu GLP-1 Natural 
            e manter a saciedade por muito mais tempo, de forma 100% natural.
          </p>
        </div>

        <!-- Comparison -->
        <div class="card animate-fade-in mb-12" style="overflow: hidden; padding: 0;">
          <div class="grid md:grid-cols-2">
            <!-- Current App -->
            <div style="padding: 2rem; border-right: 1px solid #e5e7eb;">
              <div class="text-center mb-6">
                <h3 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 0.5rem;">
                  O que você tem agora
                </h3>
                <p style="color: #6b7280;">Fundamentos essenciais</p>
              </div>
              
              <ul class="space-y-3">
                ${currentFeatures.map(feature => `
                  <li style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: rgba(16, 185, 129, 0.1);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    ">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    </div>
                    <span style="color: #374151;">${feature}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Pro Method -->
            <div style="padding: 2rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05)); position: relative;">
              <div class="badge" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: linear-gradient(90deg, #8b5cf6, #ec4899);
                color: white;
                font-size: 0.75rem;
              ">
                Método Completo
              </div>
              
              <div class="text-center mb-6">
                <h3 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 0.5rem;">
                  Método Emagrecer Pro
                </h3>
                <p style="color: #8b5cf6; font-weight: 600;">Resultados acelerados</p>
              </div>
              
              <ul class="space-y-3 mb-8">
                ${proPromises.map(promise => `
                  <li style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: linear-gradient(90deg, #8b5cf6, #ec4899);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    ">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    </div>
                    <span style="color: #374151;">${promise}</span>
                  </li>
                `).join('')}
              </ul>
              
              <button 
                onclick="window.open('https://checkout.exemplo.com/emagrecer-pro', '_blank')"
                class="btn btn-primary"
                style="
                  width: 100%;
                  background: linear-gradient(90deg, #8b5cf6, #ec4899);
                  padding: 0.75rem 1rem;
                  font-size: 1.125rem;
                "
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" x2="21" y1="14" y2="3"/>
                </svg>
                Conhecer o Método Completo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 0.5rem;">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="card text-center animate-fade-in" style="animation-delay: 0.1s;">
            <div style="
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #8b5cf6, #ec4899);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem;
            ">
              <span style="font-size: 2rem;">⚡</span>
            </div>
            <h3 class="title-font" style="font-size: 1.25rem; color: #111827; margin-bottom: 0.75rem;">
              Ativação Acelerada
            </h3>
            <p style="color: #4b5563;">
              Técnicas avançadas para ativar o GLP-1 mais rapidamente e intensificar a saciedade.
            </p>
          </div>

          <div class="card text-center animate-fade-in" style="animation-delay: 0.2s;">
            <div style="
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #3b82f6, #06b6d4);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem;
            ">
              <span style="font-size: 2rem;">🕒</span>
            </div>
            <h3 class="title-font" style="font-size: 1.25rem; color: #111827; margin-bottom: 0.75rem;">
              Saciedade Prolongada
            </h3>
            <p style="color: #4b5563;">
              Aprenda como manter os níveis de GLP-1 elevados por muito mais tempo durante o dia.
            </p>
          </div>

          <div class="card text-center animate-fade-in" style="animation-delay: 0.3s;">
            <div style="
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #f59e0b, #ea580c);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem;
            ">
              <span style="font-size: 2rem;">📋</span>
            </div>
            <h3 class="title-font" style="font-size: 1.25rem; color: #111827; margin-bottom: 0.75rem;">
              Plano Estruturado
            </h3>
            <p style="color: #4b5563;">
              14 dias de protocolo detalhado com tudo o que você precisa fazer, quando e como.
            </p>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="animate-fade-in mb-12" style="animation-delay: 0.4s;">
          <h2 class="title-font text-center" style="font-size: 1.875rem; color: #111827; margin-bottom: 1.5rem;">
            Resultados <span class="golden-accent">reais</span> de quem seguiu o método
          </h2>
          
          <div class="grid md:grid-cols-3 gap-6">
            ${testimonials.map((testimonial, index) => `
              <div class="card">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                  <div style="
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #c084fc, #ec4899);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                  ">
                    ${testimonial.avatar}
                  </div>
                  <div>
                    <h4 style="font-weight: 600; color: #111827;">${testimonial.name}</h4>
                    <div style="display: flex;">
                      ${Array(5).fill().map(() => `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                        </svg>
                      `).join('')}
                    </div>
                  </div>
                </div>
                <p style="color: #4b5563; font-style: italic;">"${testimonial.text}"</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CTA Final -->
        <div class="card text-center animate-fade-in" style="
          animation-delay: 0.5s;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05));
          padding: 3rem 2rem;
        ">
          <h2 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            Chegou a hora de acelerar
          </h2>
          <p style="font-size: 1.25rem; color: #4b5563; margin-bottom: 2rem; max-width: 48rem; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Você já provou que tem dedicação. Agora descubra como potencializar 
            seus resultados com o método completo de ativação do GLP-1 Natural.
          </p>
          
          <button 
            onclick="window.open('https://checkout.exemplo.com/emagrecer-pro', '_blank')"
            class="btn btn-primary"
            style="
              background: linear-gradient(90deg, #8b5cf6, #ec4899);
              padding: 1rem 3rem;
              font-size: 1.125rem;
              margin-bottom: 1rem;
            "
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>
            Conhecer o Método Emagrecer Pro
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 0.5rem;">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </button>
          
          <p style="font-size: 0.875rem; color: #6b7280;">
            ✨ Método 100% natural • Sem medicamentos • Resultados sustentáveis
          </p>
        </div>
        
      </div>
    </div>
  `;
}

