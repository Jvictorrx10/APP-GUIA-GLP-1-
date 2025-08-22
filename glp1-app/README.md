# GLP-1 Natural - Aplicação Web

Uma aplicação web completa para acompanhamento da jornada de transformação natural com GLP-1, incluindo checklists diários, micro-aulas educativas e sistema de progresso gamificado.

## 🚀 Características

- **100% Client-side**: Aplicação estática que funciona sem servidor
- **PWA Ready**: Suporte a Progressive Web App com service worker
- **Responsive**: Interface adaptada para desktop e mobile
- **Offline First**: Funciona sem conexão com internet após primeiro carregamento
- **Estado Persistente**: Dados salvos localmente no navegador
- **Sistema de Pontos**: Gamificação com medalhas e streaks

## 📱 Funcionalidades

### Checklists Interativos
- **Checklist Diário GLP-1**: 12 itens focados na rotina diária
- **Semanal de Hábitos**: 4 hábitos essenciais para manter
- **Mentalidade & Emoções**: 4 práticas de bem-estar mental
- **Anti-Efeito Sanfona**: 4 estratégias para manter resultados

### Micro-aulas Educativas
- **15 micro-aulas** organizadas em 3 fases de aprendizado
- Sistema de marcação "lido/não lido" com pontuação
- Links para conteúdo aprofundado no Gamma
- Integração com checklists relacionados

### Sistema de Progresso
- Pontuação por ações completadas
- Tracking de sequência (streak) de dias
- Visualização de progresso semanal
- Medalhas por conquistas

### Páginas Especiais
- **Recursos**: Links úteis e ferramentas complementares
- **Medalhas**: Sistema de conquistas e reconhecimento
- **Emagrecer Pro**: Upgrade para versão premium

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos responsivos com gradientes e animações
- **JavaScript ES6+**: Módulos nativos, sem build necessário
- **Service Worker**: Cache e funcionalidade offline
- **Local Storage**: Persistência de dados local
- **Web App Manifest**: Instalação como PWA

## 📁 Estrutura do Projeto

```
glp1-app/
├── index.html              # Página principal
├── 404.html               # Página de erro
├── manifest.webmanifest   # Configuração PWA
├── sw.js                  # Service Worker
├── README.md              # Esta documentação
└── assets/
    ├── css/
    │   └── global.css     # Estilos globais
    └── js/
        ├── app.js         # Aplicação principal
        ├── localState.js  # Gerenciamento de estado
        ├── components/    # Componentes reutilizáveis
        │   ├── ChecklistItem.js
        │   ├── ProgressBar.js
        │   ├── QuickActions.js
        │   ├── StatsCard.js
        │   └── TodayOverview.js
        └── pages/         # Páginas da aplicação
            ├── Home.js
            ├── Checklists.js
            ├── MicroAulas.js
            ├── Aula.js
            ├── Progress.js
            ├── Medals.js
            ├── Recursos.js
            └── Pro.js
```

## 🌐 Deploy

### GitHub Pages
1. Faça upload de todos os arquivos para um repositório GitHub
2. Ative GitHub Pages nas configurações do repositório
3. Selecione a branch main como fonte
4. A aplicação estará disponível em `https://seuusuario.github.io/nome-do-repo`

### Servidor Local (Desenvolvimento)
```bash
# Navegue até a pasta do projeto
cd glp1-app

# Inicie um servidor HTTP simples
python3 -m http.server 8080

# Acesse no navegador
open http://localhost:8080
```

### Outros Serviços
- **Netlify**: Arraste a pasta `glp1-app` para o deploy
- **Vercel**: Conecte o repositório GitHub
- **Surge.sh**: `surge glp1-app/`

## 💾 Dados e Privacidade

- Todos os dados são armazenados localmente no navegador
- Nenhuma informação é enviada para servidores externos
- Para resetar dados: abra DevTools → Application → Local Storage → delete `glp1-natural-state`

## 🔧 Personalização

### Modificar Checklists
Edite o arquivo `assets/js/localState.js` na seção `CHECKLIST_DATA`

### Alterar Micro-aulas
Modifique o array `LESSONS_DATA` em `assets/js/localState.js`

### Customizar Cores
Ajuste as variáveis CSS em `assets/css/global.css`

## 📱 Instalação como App

1. Abra a aplicação no navegador mobile
2. Toque no menu do navegador
3. Selecione "Adicionar à tela inicial"
4. Confirme a instalação

## 🐛 Solução de Problemas

### Aplicação não carrega
- Verifique se está servindo via HTTP (não file://)
- Limpe o cache do navegador
- Verifique o console para erros JavaScript

### Dados não salvam
- Verifique se Local Storage está habilitado
- Teste em modo privado/incógnito
- Limpe dados antigos se houver conflito

### PWA não instala
- Verifique se está em HTTPS (ou localhost)
- Confirme que manifest.webmanifest está acessível
- Teste em diferentes navegadores

## 📄 Licença

Este projeto é de uso educacional e demonstrativo. Todos os direitos reservados.

## 🤝 Contribuição

Para sugestões e melhorias, abra uma issue no repositório GitHub.

---

**Versão**: 2.0  
**Última atualização**: Agosto 2025  
**Compatibilidade**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

