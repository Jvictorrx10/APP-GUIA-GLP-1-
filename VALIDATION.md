# Guia de Validação - GLP-1 Natural

Este documento contém os testes manuais para validar todas as funcionalidades da aplicação.

## ✅ Checklist de Validação

### 🌐 Carregamento Inicial
- [ ] Aplicação carrega sem erros no console
- [ ] Tela de loading aparece brevemente
- [ ] Página inicial (Home) é exibida corretamente
- [ ] Sidebar está visível e funcional
- [ ] Stats cards mostram valores zerados (0 pontos, 0 dias)

### 📱 Responsividade
- [ ] Layout se adapta corretamente em mobile (< 768px)
- [ ] Menu hambúrguer funciona em telas pequenas
- [ ] Sidebar se oculta/mostra corretamente
- [ ] Cards se reorganizam em grid responsivo
- [ ] Textos permanecem legíveis em todas as resoluções

### 🧭 Navegação
- [ ] Todos os links da sidebar funcionam
- [ ] URLs mudam corretamente (hash routing)
- [ ] Botão "voltar" do navegador funciona
- [ ] Links ativos são destacados na sidebar
- [ ] Transições entre páginas são suaves

### ✅ Funcionalidade dos Checklists

#### Checklist Diário GLP-1
- [ ] Página carrega com 12 itens
- [ ] Todos os checkboxes estão desmarcados inicialmente
- [ ] Clicar em checkbox marca o item (visual verde)
- [ ] Pontos são atribuídos corretamente por item
- [ ] Links "Ver micro-aula relacionada" funcionam
- [ ] Contador "0/12" atualiza conforme itens marcados

#### Outros Checklists
- [ ] Semanal de Hábitos (4 itens) funciona corretamente
- [ ] Mentalidade & Emoções (4 itens) funciona corretamente
- [ ] Anti-Efeito Sanfona (4 itens) funciona corretamente
- [ ] Navegação entre abas funciona sem problemas

### 📚 Micro-aulas

#### Lista de Micro-aulas
- [ ] 15 micro-aulas são exibidas
- [ ] Organizadas em 3 fases distintas
- [ ] Cards têm cores diferentes por capítulo
- [ ] Clicar em uma aula abre a página individual

#### Página Individual da Aula
- [ ] Conteúdo da aula é exibido corretamente
- [ ] Botão "Marcar como Lido" está presente
- [ ] Clicar no botão atribui pontos (+5)
- [ ] Botão "Ir para o Checklist" funciona
- [ ] Link "Ver no Gamma" abre em nova aba
- [ ] Botão "Voltar" retorna à lista de aulas

### 📊 Sistema de Pontos e Progresso

#### Pontuação
- [ ] Pontos iniciais são 0
- [ ] Marcar item de checklist adiciona pontos corretos
- [ ] Marcar micro-aula como lida adiciona 5 pontos
- [ ] Pontos são persistidos entre sessões
- [ ] Stats cards atualizam em tempo real

#### Página de Progresso
- [ ] Mostra pontos totais corretamente
- [ ] Exibe sequência atual de dias
- [ ] Gráfico semanal funciona (mesmo com dados zerados)
- [ ] Mensagem motivacional é exibida

### 🏆 Medalhas
- [ ] Página carrega sem erros
- [ ] Medalhas são exibidas mesmo sem conquistas
- [ ] Layout de medalhas é visualmente atrativo
- [ ] Sistema está preparado para futuras conquistas

### ⚙️ Recursos
- [ ] Lista de recursos é exibida
- [ ] Links externos funcionam corretamente
- [ ] Abrem em nova aba quando apropriado
- [ ] Layout é organizado e legível

### ⭐ Emagrecer Pro
- [ ] Página de upgrade carrega corretamente
- [ ] Call-to-action é claro e atrativo
- [ ] Links para upgrade funcionam
- [ ] Design incentiva a conversão

### 💾 Persistência de Dados

#### LocalStorage
- [ ] Dados são salvos automaticamente
- [ ] Recarregar página mantém estado
- [ ] Fechar e reabrir navegador mantém dados
- [ ] Diferentes abas compartilham mesmo estado

#### Reset de Dados
- [ ] Limpar LocalStorage reseta aplicação
- [ ] Primeira visita mostra estado limpo
- [ ] Não há dados "mockados" ou pré-populados

### 🔄 PWA (Progressive Web App)

#### Service Worker
- [ ] Service Worker é registrado sem erros
- [ ] Aplicação funciona offline após primeiro carregamento
- [ ] Cache é atualizado corretamente

#### Instalação
- [ ] Prompt de instalação aparece (mobile)
- [ ] Aplicação pode ser adicionada à tela inicial
- [ ] Ícone personalizado é usado
- [ ] Nome da aplicação está correto

### 🌐 Links Externos

#### Guia Completo
- [ ] Link "Acesse o Guia Completo" funciona
- [ ] Abre em nova aba
- [ ] Direciona para conteúdo correto

#### Links das Micro-aulas
- [ ] "Ver no Gamma" abre links corretos
- [ ] Todos os links estão funcionais
- [ ] Abrem em nova aba

### 🐛 Tratamento de Erros

#### Navegação
- [ ] URLs inválidas redirecionam para Home
- [ ] Parâmetros inválidos são tratados
- [ ] Aplicação não quebra com dados corrompidos

#### Console
- [ ] Sem erros críticos de JavaScript
- [ ] Warnings são mínimos e não críticos
- [ ] Performance é adequada

## 📋 Teste de Fluxo Completo

### Cenário: Novo Usuário
1. [ ] Acessa aplicação pela primeira vez
2. [ ] Vê estado zerado (0 pontos, 0 dias)
3. [ ] Navega para Checklists
4. [ ] Marca primeiro item do Checklist Diário
5. [ ] Vê pontos atualizarem na sidebar
6. [ ] Clica em "Ver micro-aula relacionada"
7. [ ] Lê micro-aula e marca como lida
8. [ ] Volta para Home e vê progresso atualizado
9. [ ] Navega para Progresso e confirma dados
10. [ ] Recarrega página e confirma persistência

### Cenário: Usuário Retornando
1. [ ] Dados anteriores são mantidos
2. [ ] Pode continuar de onde parou
3. [ ] Novos itens podem ser marcados
4. [ ] Progresso continua acumulando

## 🎯 Critérios de Aceitação

### Obrigatórios ✅
- Aplicação carrega sem erros críticos
- Todas as páginas são acessíveis
- Checklists funcionam corretamente
- Micro-aulas podem ser marcadas como lidas
- Dados são persistidos localmente
- Interface é responsiva

### Desejáveis 🎁
- Performance otimizada
- Animações suaves
- PWA instalável
- Funciona offline
- Design atrativo e profissional

## 📝 Relatório de Bugs

Use este template para reportar problemas:

```
**Descrição**: [Descreva o problema]
**Passos para reproduzir**: 
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Resultado esperado**: [O que deveria acontecer]
**Resultado atual**: [O que realmente acontece]
**Navegador**: [Chrome/Firefox/Safari + versão]
**Dispositivo**: [Desktop/Mobile/Tablet]
**Console**: [Erros no console, se houver]
```

---

**Última atualização**: Agosto 2025  
**Versão testada**: 2.0

