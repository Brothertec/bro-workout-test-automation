# Instruções para agentes

## Contexto do projeto

Automação de testes do Bro Workout em JavaScript.

- Interface: Cucumber, Gherkin, step definitions e Page Objects.
- API: Playwright Test em `api/`.
- `e2e/` contém exemplos em Playwright Test.
- Consulte `docs/ai-testing.md` para o estado do setup MCP.

## Antes de implementar

- Leia os arquivos relacionados ao cenário solicitado.
- Verifique se já existem cenários, passos e Page Objects reutilizáveis.
- Preserve alterações locais feitas pelo usuário.
- Não migre testes entre Cucumber e Playwright Test sem solicitação.
- Use o padrão de módulos do arquivo que estiver sendo alterado.

## Testes de interface

- Mantenha cenários Gherkin em `tests/features/`.
- Mantenha passos em `tests/step-definitions/`.
- Centralize seletores e operações de página em `tests/pages/`.
- Preserve os identificadores das histórias e dos cenários.
- Prefira seletores por papel, nome acessível e label.
- Inspecione a interface antes de definir novos seletores.
- Evite esperas fixas; use condições e verificações do Playwright.

## Testes de API

- Mantenha os testes em `api/`.
- Valide status, conteúdo e efeitos esperados conforme o contrato.
- Use dados únicos quando o cenário exigir.
- Informe quando a execução criar ou deixar registros no ambiente.
- Não trate comportamento observado como requisito sem evidência.

## Uso do Playwright MCP

- Use o MCP para inspecionar a interface e verificar comportamentos
  dentro do escopo autorizado.
- Não use sessões autenticadas pessoais sem solicitação.
- Não envie formulários nem crie, edite ou exclua registros sem
  autorização que cubra essas ações.
- Não inclua credenciais, tokens ou dados pessoais nos artefatos.

## Tratamento de falhas

- Diferencie defeito do produto, erro no teste e falha de ambiente.
- Preserve as validações do comportamento esperado.
- Não remova verificações nem adicione skip ou falha esperada
  apenas para deixar a execução aprovada.
- Informe resultados inconclusivos e limitações da verificação.

## Planejamento, geração e correção

- Planejamento: apresente cenários, pré-condições, dados e resultados
  esperados antes de gerar código quando a tarefa pedir um plano.
- Geração: siga o formato de teste escolhido para a tarefa,
  reutilizando a estrutura existente.
- Correção: investigue a causa e proponha a menor alteração necessária.
- As definições dos agentes estão em `.codex/agents/`.
- O piloto de interface em Playwright Test está limitado aos arquivos
  `e2e/home-title.spec.ts`, `e2e/home-heading.spec.ts` e
  `e2e/home-links.spec.ts`.
- Essa exceção não autoriza migrar os testes Cucumber existentes.

## Execução e Git

- Respeite o modo de trabalho combinado com o usuário.
- Em modo coach, oriente e revise; não edite ou execute ações
  sem autorização.
- Não faça commit, push, abertura de PR ou merge sem autorização.
- Não adicione arquivos de configuração pessoal ou artefatos
  de navegação ao commit.
- Ao concluir, informe o que mudou, o que foi verificado e
  o que permanece pendente.
