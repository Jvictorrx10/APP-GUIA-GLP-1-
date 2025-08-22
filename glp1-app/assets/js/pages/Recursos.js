// Página Recursos
import { hardReset } from '../localState.js';

export default async function Recursos() {
  return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%); padding: 1rem;">
      <div style="max-width: 1152px; margin: 0 auto; padding: 2rem 0;">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-8">
          <h1 class="title-font" style="font-size: 2.5rem; color: #111827; margin-bottom: 1rem;">
            <span class="golden-accent">Recursos</span> & Ferramentas
          </h1>
          <p style="font-size: 1.125rem; color: #4b5563; max-width: 32rem; margin: 0 auto;">
            Conteúdos adicionais e ferramentas para aprofundar sua jornada
          </p>
        </div>

        <!-- Ebook CTA - Destaque no topo -->
        <div class="card text-center animate-fade-in mb-8" style="
          animation-delay: 0.1s;
          border: 2px solid rgba(251, 191, 36, 0.3);
        ">
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
            🌟 Acesse o Guia Completo
          </h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem; max-width: 24rem; margin-left: auto; margin-right: auto;">
            Mergulhe no conteúdo original completo! O guia está sempre disponível online para consulta e aprofundamento.
          </p>
          <button 
            onclick="window.open('https://gamma.app/docs/O-Hormonio-Secreto-que-Pode-Mudar-Tudo-Seu-Guia-para-o-Emagrecime-iefsqtua7o3aeg6?mode=doc', '_blank')"
            class="btn btn-primary"
            style="background: linear-gradient(90deg, #f59e0b, #ea580c); padding: 0.75rem 2rem;"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.75rem;">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" x2="21" y1="14" y2="3"/>
            </svg>
            Abrir Guia Completo no Gamma
          </button>
        </div>

        <!-- Tabs -->
        <div class="mb-8">
          <div class="tabs-container" style="
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.25rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            padding: 0.25rem;
            border-radius: 16px;
            margin-bottom: 2rem;
          ">
            <button 
              class="tab-button active"
              data-tab="tools"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem;
                border: none;
                border-radius: 12px;
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
                color: #374151;
                cursor: pointer;
                transition: all 0.2s ease;
                font-weight: 500;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              "
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
              Ferramentas
            </button>
            <button 
              class="tab-button"
              data-tab="settings"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem;
                border: none;
                border-radius: 12px;
                background: transparent;
                color: #374151;
                cursor: pointer;
                transition: all 0.2s ease;
                font-weight: 500;
              "
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Configurações
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div id="tab-content">
          ${renderToolsTab()}
        </div>
        
      </div>
    </div>
    
    <script>
      // Setup tab switching
      document.addEventListener('click', (e) => {
        if (e.target.closest('.tab-button')) {
          const button = e.target.closest('.tab-button');
          const tabKey = button.dataset.tab;
          
          // Update active tab
          document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'transparent';
            btn.style.boxShadow = 'none';
          });
          
          button.classList.add('active');
          button.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))';
          button.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
          
          // Update content
          const content = document.getElementById('tab-content');
          if (tabKey === 'tools') {
            content.innerHTML = \`${renderToolsTab()}\`;
          } else {
            content.innerHTML = \`${renderSettingsTab()}\`;
          }
        }
      });
      
      // Export data function
      window.exportData = function() {
        const exportData = {
          exported_at: new Date().toISOString(),
          version: "2.0",
          note: "Backup completo do seu progresso GLP-1 Natural",
          state: window.glp1State ? window.glp1State.loadState() : {}
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = \`glp1_backup_\${new Date().toISOString().split('T')[0]}.json\`;
        link.click();
        URL.revokeObjectURL(url);
        
        window.showToast('Backup exportado com sucesso!', 'success');
      };
      
      // Reset app function
      window.resetApp = function() {
        if (confirm('⚠️ ATENÇÃO: Isso apagará TODOS os seus dados (pontos, progresso, medalhas). Esta ação NÃO pode ser desfeita. Tem certeza?')) {
          if (confirm('Última confirmação: você realmente deseja resetar completamente o aplicativo?')) {
            if (window.glp1State && window.glp1State.hardReset) {
              window.glp1State.hardReset();
            } else {
              localStorage.clear();
              sessionStorage.clear();
            }
            window.location.reload();
          }
        }
      };
    </script>
  `;
}

function renderToolsTab() {
  return `
    <div class="grid md:grid-cols-2 gap-8">
      <div class="card animate-fade-in">
        <div class="text-center mb-6">
          <div style="
            display: inline-flex;
            padding: 1rem;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 16px;
            margin-bottom: 1rem;
          ">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
          </div>
          <h2 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 0.5rem;">
            Exportar Backup
          </h2>
          <p style="color: #4b5563;">
            Faça backup completo do seu progresso em formato JSON
          </p>
        </div>

        <button 
          onclick="exportData()"
          class="btn btn-primary"
          style="width: 100%; background: linear-gradient(90deg, #10b981, #059669); margin-bottom: 1rem;"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" x2="12" y1="15" y2="3"/>
          </svg>
          Baixar Backup Completo
        </button>

        <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px;">
          <p style="font-size: 0.875rem; color: #047857;">
            <strong>100% Privado:</strong> Seus dados nunca saem do seu dispositivo. 
            O backup inclui: progresso, pontos, medalhas e micro-aulas concluídas.
          </p>
        </div>
      </div>

      <div class="card animate-fade-in" style="animation-delay: 0.1s;">
        <div class="text-center mb-6">
          <div style="
            display: inline-flex;
            padding: 1rem;
            background: linear-gradient(135deg, #3b82f6, #06b6d4);
            border-radius: 16px;
            margin-bottom: 1rem;
          ">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h2 class="title-font" style="font-size: 1.5rem; color: #111827; margin-bottom: 0.5rem;">
            Status do App
          </h2>
          <p style="color: #4b5563;">
            Informações sobre o armazenamento local
          </p>
        </div>

        <div class="space-y-4">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 8px;">
            <span style="color: #4b5563;">Tipo de dados:</span>
            <span style="font-weight: 600;">100% Local</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 8px;">
            <span style="color: #4b5563;">Privacidade:</span>
            <span class="badge badge-success">Garantida</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 8px;">
            <span style="color: #4b5563;">Versão dos dados:</span>
            <span style="font-weight: 600;">v2.0</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSettingsTab() {
  return `
    <div style="max-width: 32rem; margin: 0 auto;">
      <div class="card animate-fade-in">
        <div class="text-center mb-8">
          <h2 class="title-font" style="font-size: 1.875rem; color: #111827; margin-bottom: 0.5rem;">
            Configurações
          </h2>
          <p style="color: #4b5563;">Personalize sua experiência no app</p>
        </div>

        <div class="space-y-6">
          <div style="padding: 1rem; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 16px;">
            <h4 style="font-weight: 600; color: #92400e; margin-bottom: 0.5rem;">🔒 Compromisso com a Privacidade</h4>
            <p style="font-size: 0.875rem; color: #a16207; line-height: 1.5;">
              Este aplicativo funciona 100% offline após o primeiro carregamento. Seus dados pessoais, 
              progresso e informações <strong>nunca são enviados para servidores externos</strong>. 
              Tudo permanece seguro no seu dispositivo.
            </p>
          </div>

          <div style="padding: 1rem; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px;">
            <h4 style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">⚡ Funcionalidade Offline</h4>
            <p style="font-size: 0.875rem; color: #1d4ed8; line-height: 1.5;">
              Após o primeiro acesso, o app funciona completamente offline. Você pode usar todos os 
              checklists, micro-aulas e recursos mesmo sem conexão com a internet.
            </p>
          </div>

          <div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 16px;">
            <h4 style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">⚠️ Reset Completo</h4>
            <p style="font-size: 0.875rem; color: #dc2626; line-height: 1.5; margin-bottom: 0.75rem;">
              Use esta opção apenas se quiser recomeçar completamente do zero. 
              <strong>Todos os dados serão perdidos permanentemente.</strong>
            </p>
            <button
              onclick="resetApp()"
              class="btn btn-outline"
              style="border-color: #dc2626; color: #dc2626;"
            >
              Reset Completo do App
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

