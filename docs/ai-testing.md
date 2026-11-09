# Playwright MCP e agentes de IA

## Objetivo

Preparar o projeto para uso do Playwright MCP com Codex e Claude Code
no VS Code, seguido da configuração dos agentes de testes.

## Estado atual

- Codex: servidor MCP reconhecido e navegação validada.
- Claude Code: configuração criada; conexão ainda não validada.
- Agentes planner, generator e healer: ainda não configurados.
- Versão do servidor MCP: `@playwright/mcp@latest`.
- A definição de uma versão fixa está pendente.

## Pré-requisitos do setup validado

- Node.js e npm disponíveis.
- VS Code com a extensão Codex.
- Google Chrome instalado.
- Acesso à rede para obter o pacote do servidor MCP.

Para Claude Code, é necessário ter o cliente instalado e validar
separadamente a conexão.

## Arquivos de configuração

- `.codex/config.toml`: configuração do Playwright MCP para Codex.
- `.mcp.json`: configuração do Playwright MCP para Claude Code.

As configurações pessoais de cada desenvolvedor ficam fora do repositório.

## Validação no Codex

1. Abrir a pasta `bro-workout-test-automation` no VS Code.
2. Iniciar um novo chat do Codex associado à raiz do repositório.
3. Confirmar que o servidor `playwright` e suas ferramentas estão disponíveis.
4. Solicitar:

   > Use exclusivamente o servidor MCP playwright para abrir
   > https://example.com e informar o título da página.
   > Não altere arquivos do projeto, não execute testes e não envie formulários.

Resultado esperado: título `Example Domain`.

A navegação foi validada nesse endereço. Isso não equivale à execução
dos testes do Bro Workout.

## Problemas encontrados durante o setup

### Servidor ausente no chat

O chat estava associado à pasta acima do repositório.
A configuração foi reconhecida ao iniciar um novo chat na raiz correta.

O Codex também exige que o projeto seja considerado confiável para
carregar configurações locais.

### Google Chrome não encontrado

O servidor tentou iniciar o Google Chrome no caminho padrão do macOS.
A navegação funcionou após sua instalação na pasta Aplicativos.

## Padrões existentes do projeto

- Interface: Cucumber, cenários Gherkin, step definitions e Page Objects.
- API: Playwright Test na pasta `api/`.
- A pasta `e2e/` contém exemplos em Playwright Test.

A configuração dos agentes deverá considerar esses formatos.
Este setup não define uma migração dos testes existentes.

## Próximos passos

- Validar o MCP no Claude Code.
- Definir uma versão fixa do servidor.
- Alinhar as instruções dos agentes com os padrões do projeto.
- Configurar e validar planner, generator e healer.
