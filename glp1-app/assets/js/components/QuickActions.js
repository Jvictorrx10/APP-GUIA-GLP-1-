// Componente QuickActions
export function QuickActions() {
  const quickActions = [
    {
      title: "Completar Checklist",
      description: "Continue sua jornada de hoje",
      icon: "checkSquare",
      href: "#/Checklists",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      title: "Micro-aulas",
      description: "Aprenda e pratique",
      icon: "bookOpen",
      href: "#/MicroAulas",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Ver Progresso",
      description: "Acompanhe sua evolução",
      icon: "trendingUp",
      href: "#/Progress",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "Acelerar Resultados",
      description: "Conheça o método completo",
      icon: "crown",
      href: "#/Pro",
      gradient: "from-amber-400 to-yellow-500"
    }
  ];

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${quickActions.map((action, index) => `
        <div class="animate-fade-in" style="animation-delay: ${index * 0.1}s;">
          <a href="${action.href}" class="card" style="text-decoration: none; color: inherit; display: block; transition: transform 0.2s ease;">
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
              <div class="stats-card-icon" style="background: linear-gradient(135deg, ${getGradientColors(action.gradient)}); padding: 0.75rem; border-radius: 12px;">
                ${getIconSvg(action.icon)}
              </div>
              <div>
                <h3 style="font-weight: 600; color: #111827; margin-bottom: 0.25rem;">${action.title}</h3>
                <p style="font-size: 0.875rem; color: #6b7280;">${action.description}</p>
              </div>
            </div>
          </a>
        </div>
      `).join('')}
    </div>
  `;
}

function getGradientColors(gradient) {
  const gradients = {
    "from-green-400 to-emerald-500": "#4ade80, #10b981",
    "from-purple-400 to-pink-500": "#c084fc, #ec4899",
    "from-blue-400 to-cyan-500": "#60a5fa, #06b6d4",
    "from-amber-400 to-yellow-500": "#fbbf24, #eab308"
  };
  return gradients[gradient] || "#60a5fa, #3b82f6";
}

function getIconSvg(iconName) {
  const icons = {
    checkSquare: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,11 12,14 22,4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    bookOpen: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    trendingUp: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>`,
    crown: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`
  };
  
  return icons[iconName] || '';
}

