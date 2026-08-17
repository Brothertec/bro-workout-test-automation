# Bro Workout — Automação de Testes

Esqueleto E2E do [Bro Workout](https://bro-workout-frontend.vercel.app/) com **JavaScript**, **Playwright**, **Cucumber** e **Page Objects**.

## Estrutura

```text
features/              # Cenários Gherkin
  support/             # World, hooks e variáveis de ambiente
pages/                 # Page Objects
step-definitions/      # Passos Cucumber
```

## Setup

1. Instale as dependências do Node:

```bash
npm install
```

2. Baixe o Chromium do Playwright. Sem esse passo o teste falha com `Executable doesn't exist` — o `npm install` tenta fazer isso no `postinstall`, mas pode não gravar o browser no cache local (`%USERPROFILE%\AppData\Local\ms-playwright` no Windows). Rode na máquina onde os testes vão executar:

```bash
npx playwright install chromium
```

3. (Opcional) Copie as variáveis de ambiente. No Windows:

```powershell
Copy-Item .env.example .env
```

## Execução

```bash
npm test
npm run test:headed
```

`npm test` roda em headless. `npm run test:headed` abre o Chromium visível e precisa do browser completo instalado no passo 2.

O relatório HTML é gerado em `reports/cucumber-report.html`.

## Problemas comuns

**`browserType.launch: Executable doesn't exist`**  
O Playwright não encontrou o Chromium. Rode `npx playwright install chromium` e execute o teste de novo.
