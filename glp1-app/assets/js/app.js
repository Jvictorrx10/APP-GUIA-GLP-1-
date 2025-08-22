// App principal - Bootstrap e roteador simples
import { initializeApp, loadState } from './localState.js';

// Configuração do roteador hash
class HashRouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.defaultRoute = 'Home';
    
    // Escutar mudanças no hash
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }
  
  addRoute(path, component) {
    this.routes.set(path, component);
  }
  
  navigate(path) {
    window.location.hash = `#/${path}`;
  }
  
  getCurrentRoute() {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#/') {
      return this.defaultRoute;
    }
    
    // Extrair rota do hash (#/Home -> Home)
    const route = hash.replace('#/', '');
    const [routeName] = route.split('?'); // Remover query params
    
    return routeName || this.defaultRoute;
  }
  
  getQueryParams() {
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
  
  async handleRoute() {
    const routeName = this.getCurrentRoute();
    const component = this.routes.get(routeName);
    
    if (component) {
      this.currentRoute = routeName;
      await this.renderComponent(component, routeName);
    } else {
      // Rota não encontrada, redirecionar para home
      this.navigate(this.defaultRoute);
    }
  }
  
  async renderComponent(component, routeName) {
    const appContainer = document.getElementById('app');
    
    try {
      // Mostrar loading
      this.showLoading();
      
      // Renderizar componente
      const content = await component();
      
      // Atualizar conteúdo
      appContainer.innerHTML = `
        <div class="app-container">
          ${this.renderSidebar(routeName)}
          <main class="main-content">
            ${this.renderHeader()}
            <div class="page-content">
              ${content}
            </div>
          </main>
        </div>
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
      `;
      
      // Configurar eventos da sidebar
      this.setupSidebarEvents();
      
      // Esconder loading
      this.hideLoading();
      
    } catch (error) {
      console.error('Erro ao renderizar componente:', error);
      appContainer.innerHTML = `
        <div class="error-container">
          <h1>Erro</h1>
          <p>Ocorreu um erro ao carregar a página.</p>
          <button onclick="window.location.reload()" class="btn btn-primary">Recarregar</button>
        </div>
      `;
    }
  }
  
  showLoading() {
    const loading = document.querySelector('.loading-screen');
    if (loading) {
      loading.style.display = 'flex';
    }
  }
  
  hideLoading() {
    const loading = document.querySelector('.loading-screen');
    if (loading) {
      loading.style.display = 'none';
    }
  }
  
  renderSidebar(currentRoute) {
    const navigationItems = [
      { title: "Início", path: "Home", icon: "🏠" },
      { title: "Checklists", path: "Checklists", icon: "✅" },
      { title: "Micro-aulas", path: "MicroAulas", icon: "📚" },
      { title: "Progresso", path: "Progress", icon: "📊" },
      { title: "Medalhas", path: "Medals", icon: "🏆" },
      { title: "Recursos", path: "Recursos", icon: "⚙️" }
    ];
    
    const proItems = [
      { title: "Emagrecer Pro", path: "Pro", icon: "⭐" }
    ];
    
    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand">
            <div class="sidebar-logo">✅</div>
            <div>
              <div class="sidebar-title">GLP-1 Natural</div>
              <div class="sidebar-subtitle">Sua jornada de transformação</div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-content">
          <div class="sidebar-section">
            <div class="sidebar-section-title">Menu</div>
            <nav class="sidebar-nav">
              <a href="https://gamma.app/docs/O-Hormonio-Secreto-que-Pode-Mudar-Tudo-Seu-Guia-para-o-Emagrecime-iefsqtua7o3aeg6?mode=doc" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="sidebar-nav-link highlight">
                <span class="sidebar-nav-icon">📖</span>
                <span>Acesse o Guia Completo</span>
                <span style="margin-left: auto; opacity: 0.6;">↗</span>
              </a>
              ${navigationItems.map(item => `
                <a href="#/${item.path}" 
                   class="sidebar-nav-link ${currentRoute === item.path ? 'active' : ''}">
                  <span class="sidebar-nav-icon">${item.icon}</span>
                  <span>${item.title}</span>
                </a>
              `).join('')}
            </nav>
          </div>
          
          <div class="sidebar-section">
            <div class="sidebar-section-title">Premium</div>
            <nav class="sidebar-nav">
              ${proItems.map(item => `
                <a href="#/${item.path}" 
                   class="sidebar-nav-link ${currentRoute === item.path ? 'active' : ''}">
                  <span class="sidebar-nav-icon">${item.icon}</span>
                  <span>${item.title}</span>
                </a>
              `).join('')}
            </nav>
          </div>
        </div>
        
        <div class="sidebar-footer">
          <div class="sidebar-user">
            <div class="sidebar-user-avatar">U</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">Bem-vinda!</div>
              <div class="sidebar-user-status">Continue sua jornada</div>
            </div>
          </div>
        </div>
      </aside>
    `;
  }
  
  renderHeader() {
    return `
      <header class="main-header">
        <button class="menu-toggle" id="menuToggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 class="main-title">GLP-1 Natural</h1>
      </header>
    `;
  }
  
  setupSidebarEvents() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (menuToggle && sidebar && overlay) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });
      
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }
}

// Utilitários globais
window.showToast = function(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Mostrar toast
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remover toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Função para navegar
window.navigate = function(path) {
  router.navigate(path);
};

// Inicializar aplicação
const router = new HashRouter();

// Registrar rotas (serão implementadas nas próximas fases)
router.addRoute('Home', () => import('./pages/Home.js').then(m => m.default()));
router.addRoute('Checklists', () => import('./pages/Checklists.js').then(m => m.default()));
router.addRoute('MicroAulas', () => import('./pages/MicroAulas.js').then(m => m.default()));
router.addRoute('Aula', () => import('./pages/Aula.js').then(m => m.default()));
router.addRoute('Progress', () => import('./pages/Progress.js').then(m => m.default()));
router.addRoute('Medals', () => import('./pages/Medals.js').then(m => m.default()));
router.addRoute('Recursos', () => import('./pages/Recursos.js').then(m => m.default()));
router.addRoute('Pro', () => import('./pages/Pro.js').then(m => m.default()));

// Inicializar estado da aplicação
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicializando GLP-1 Natural App...');
  
  // Inicializar estado local
  const initialState = initializeApp();
  console.log('Estado inicial:', initialState);
  
  // Inicializar roteador
  router.handleRoute();
});

// Exportar router para uso global
window.router = router;

