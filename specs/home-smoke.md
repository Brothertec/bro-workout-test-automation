# Validação básica da página inicial do Bro Workout

## Application Overview

Validar somente o título da página, o heading principal e a presença dos links da página inicial, sem clicar ou navegar. Os valores esperados foram obtidos no snapshot da preparação já concluída. Pré-condição: página inicial aberta pelo seed.spec.ts em contexto novo, sem sessão pessoal autenticada. A URL inicial esperada é https://bro-workout-frontend.vercel.app/. Não executar novamente o seed nesta etapa de planejamento. Não enviar formulários nem criar, editar ou excluir registros.

## Test Scenarios

### 1. Página inicial — verificações sem interação

**Seed:** `seed.spec.ts`

#### 1.1. Verificar o título da página inicial

**File:** `e2e/home-title.spec.ts`

**Steps:**
  1. Partindo de um contexto novo preparado pelo seed.spec.ts, consultar o título da página inicial sem realizar interações.
    - expect: O título da página é exatamente “Bro Workout”.
    - expect: A verificação falha se o título estiver ausente ou diferente.

#### 1.2. Verificar o heading principal

**File:** `e2e/home-heading.spec.ts`

**Steps:**
  1. Partindo de um contexto novo preparado pelo seed.spec.ts, localizar o heading de nível 1 pelo nome acessível “Bem-vindo ao Bro Workout”, sem clicar.
    - expect: O heading de nível 1 “Bem-vindo ao Bro Workout” está presente e visível.
    - expect: A verificação falha se o heading não for encontrado ou não estiver visível.

#### 1.3. Verificar os links de navegação e de acesso da página inicial

**File:** `e2e/home-links.spec.ts`

**Steps:**
  1. Partindo de um contexto novo preparado pelo seed.spec.ts, verificar por papel e nome acessível a presença dos links do banner, sem clicar: “Início”, “Usuários”, “Exercícios” e “Treino Ativo”.
    - expect: Os quatro links estão presentes e visíveis no banner.
    - expect: A verificação falha se qualquer um dos links estiver ausente ou não estiver visível.
  2. Verificar por papel e nome acessível a presença dos links dos cartões da página inicial, sem clicar: “Ver Usuários”, “Ver Exercícios” e “Começar Acompanhamento”.
    - expect: Os três links estão presentes e visíveis.
    - expect: A verificação falha se qualquer um dos links estiver ausente ou não estiver visível.
    - expect: Nenhum link é acionado; o destino e o comportamento de navegação não são validados.
