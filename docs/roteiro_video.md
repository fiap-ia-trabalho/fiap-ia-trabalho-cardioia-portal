# Roteiro de demonstração do portal CardioIA

Alvo: **3 minutos**, com margem até o limite de **4 minutos**.
Grave a tela com voz ou legendas e publique como **não listado** no YouTube.
Este vídeo é a demonstração do Ir Além 1; a entrega principal tem outro roteiro.

## Preparar a tela

Abra o portal e o README. No editor, deixe `src/contexts/AuthContext.jsx`,
`src/components/ProtectedRoute.jsx` e `src/pages/Appointments.jsx` disponíveis.
Use a base fictícia e as credenciais da demonstração.

Para mostrar uma nova consulta, escolha um horário livre no dia seguinte. Os
agendamentos iniciais ocupam 09:00 com Dra. Helena Costa e 11:00 com Dr. Rafael Mendes.
Um exemplo livre na base inicial é João Ribeiro, Dr. Rafael Mendes, às 10:00.

## 1 Apresentação e login de demonstração

**Tempo:** 0:00 a 0:30.

**Mostre:** README, depois tela de login. Clique em Preencher acesso e Entrar no portal.

**Fala:**
> Olá! Este é o portal CardioIA, nosso Ir Além 1 da Fase 2. Construímos uma interface
> responsiva em React com Vite para organizar pacientes e consultas. Todos os dados
> são fictícios. Este acesso de demonstração cria uma sessão simulada, que permite
> entrar nas páginas protegidas.

## 2 Dashboard e pacientes

**Tempo:** 0:30 a 1:00.

**Mostre:** os indicadores e próximos atendimentos. Abra Pacientes e busque `joao`.
Mostre João Ribeiro mesmo com a busca sem acento. Apague a busca e clique em Agendar.

**Fala:**
> No dashboard, vemos o total de pacientes, as consultas agendadas e os atendimentos
> de hoje. A lista de pacientes vem de um arquivo JSON local, consumido com fetch.
> A busca funciona por nome, código ou e-mail e aceita variações de acentuação.
> Ao clicar em agendar, o formulário já recebe o paciente escolhido.

## 3 Criar consulta e atualizar os indicadores

**Tempo:** 1:00 a 1:40.

**Mostre:** selecione profissional, tipo, data e horário livre. Clique em Agendar
consulta. Volte ao dashboard e aponte o aumento do total de consultas.

**Fala:**
> O formulário reúne paciente, profissional, tipo de consulta, data e horário.
> Os campos são validados e não podemos reservar o mesmo profissional ou paciente
> duas vezes no mesmo horário. Ao confirmar, a consulta aparece na agenda e os
> indicadores mudam. O estado é compartilhado por Context API, e a agenda permanece
> após recarregar o navegador.

## 4 Demonstrar controle de estado e proteção de rotas

**Tempo:** 1:40 a 2:25.

**Mostre:** recarregue e confira a consulta. No editor, mostre os arquivos indicados.
Não precisa ler o código inteiro.

**Fala:**
> No código, o AuthContext guarda a sessão e fornece login e saída. O componente de
> proteção redireciona ao login quando não há sessão. Em Agendamentos, useReducer
> controla os campos e erros do formulário; useState controla filtros e mensagens.
> useEffect carrega e persiste os dados. A aparência usa CSS Modules, com componentes
> e páginas organizados nas quatro pastas solicitadas.

## 5 Responsividade e encerramento

**Tempo:** 2:25 a 3:00.

**Mostre:** estreite a janela para mostrar o menu móvel. Abra o menu, navegue e
depois clique em Sair da conta. Tente abrir `/#/agendamentos`, que volta ao login.

**Fala:**
> Em telas menores, o menu se adapta e as listas são exibidas em cartões.
> Ao sair, o portal volta ao login e as rotas deixam de mostrar os dados.
> Esta autenticação é somente didática, sem servidor ou assinatura real do token.
> O código, os integrantes e as instruções de execução estão no repositório. Obrigada!

## Conferir antes de entregar

- Duração final até quatro minutos, com textos legíveis e voz ou legendas claras.
- Vídeo publicado como não listado e link acessível.
- Link incluído no README do portal.
- Repositório público com código, README, nomes e RMs.
- Entrega na plataforma da FIAP, conforme os campos exibidos na atividade.
