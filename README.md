# CardioIA Portal de Atendimento

**FIAP · 2º ano de Inteligência Artificial · Fase 2 · Ir Além 1**

Portal responsivo em React e Vite para simular a organização de pacientes e
agendamentos de uma equipe de atendimento. O projeto usa Context API, Hooks,
rotas protegidas e CSS Modules. Os dados são fictícios e não há integração com
serviço clínico ou back-end.

## Vídeo de demonstração

**Vídeo ainda não publicado.** Incluir aqui o link do YouTube como **não listado**,
com duração de até quatro minutos. O [roteiro](docs/roteiro_video.md) descreve
as telas, ações e fala sugeridas.

## Integrantes

| Nome completo | RM |
|---|---|
| CAUAN OTTO RODRIGUES SOUSA | 567940 |
| FERNANDO A GURGEL | 567606 |
| IRACI MONTEIRO SOUZA | 567544 |
| MARIA LUISA RODRIGUES NASCIMENTO | 567659 |
| RAFAELA TORRES MARTINS | 567735 |

Tutor: Leonardo Ruiz Orabona. Coordenador: André Godoi.

## Instalar e executar

Requer **Node.js 22.12 ou superior**. O ambiente de validação usa Node.js 24.18.0.
As versões diretas estão fixadas no `package.json`; `package-lock.json` registra
a resolução completa das dependências.

```bash
git clone https://github.com/fiap-ia-trabalho/fiap-ia-trabalho-cardioia-portal.git
cd fiap-ia-trabalho-cardioia-portal
npm ci
npm run dev
```

Abra **http://localhost:5173**. No Windows, após a instalação, também pode usar
o atalho `abrir_portal.bat`, que gera e abre a versão otimizada do portal.

### Acesso de demonstração

- E-mail: `demo@cardioia.local`
- Senha: `cardioia123`

O botão **Preencher acesso** completa esses campos. A sessão é simulada e usa
um token em formato JWT no `localStorage`, com expiração de oito horas. O token
não tem assinatura verificável nem proteção de servidor. A proteção das rotas
é apenas uma demonstração de interface; os arquivos estáticos não são privados.
Use somente os dados e as credenciais fictícios fornecidos.

## Funcionalidades

- **Visão geral:** total de pacientes, consultas agendadas, consultas para hoje,
  próximos atendimentos e distribuição por tipo de consulta.
- **Pacientes:** consumo de JSON local via `fetch`, busca por nome, código e e-mail,
  e acesso ao formulário com o paciente já selecionado.
- **Agendamentos:** seleção de paciente, profissional, tipo, data e horário;
  validação de campos e bloqueio de conflitos de paciente ou profissional.
- **Cancelamento:** libera o horário e atualiza os indicadores.
- **Persistência:** a sessão e a agenda permanecem após recarregar o navegador;
  sair encerra a sessão e impede acesso às páginas protegidas.
- **Responsividade:** menu lateral no desktop, menu móvel e listas que se adaptam
  em cartões em telas estreitas, mantendo as ações acessíveis.

Os três agendamentos iniciais são gerados para os próximos dias na primeira
abertura. Os registros salvos permanecem no navegador; não representam uma base
compartilhada entre computadores. As datas de referência usam `America/Bahia`.

## Requisitos do enunciado e implementação

| Requisito | Implementação |
|---|---|
| React com Vite | `src/main.jsx`, `src/App.jsx` e `vite.config.js` |
| Autenticação simulada via Context API e JWT fake | `src/contexts/AuthContext.jsx` e `src/services/auth.js` |
| Pacientes de API fake ou base simulada | `public/data/pacientes.json` e `src/services/patients.js` |
| Formulário com useState e useReducer | `src/pages/Appointments.jsx`: filtros/mensagens e estado do formulário |
| Dashboard com contagens | `src/pages/Dashboard.jsx`, conectado ao estado compartilhado da agenda |
| Proteção de rotas com AuthContext | `src/components/ProtectedRoute.jsx` |
| CSS Modules | Arquivos `.module.css` dos componentes e páginas |
| Organização por contexts, components, services e pages | As quatro pastas ficam em `src/` |
| Nomes completos e RMs | Tabela de integrantes neste README |
| Vídeo não listado com link no README | Pendente de gravação e publicação |

O estado da agenda também usa `useReducer` em `PortalContext`. `useEffect` carrega
os pacientes, persiste os registros e controla a expiração da sessão; `useContext`
compartilha os dados e `useMemo` filtra a lista de pacientes.

## Organização do código

```text
public/data/pacientes.json
src/
  contexts/      AuthContext e PortalContext
  components/    Layout, marca, tabela e proteção de rotas
  services/      Autenticação, consumo de JSON e regras de agendamento
  pages/         Login, Dashboard, Patients e Appointments
  App.jsx        Rotas e providers
  main.jsx       Entrada do React
  styles.css     Base visual global
docs/
  roteiro_video.md
tests/
  appointments.test.js
  auth.test.js
```

## Verificação

```bash
npm test
npm run build
npm run preview
```

Os testes verificam conflitos de agendamento, liberação de horário após
cancelamento, datas inválidas, campos fora da base e o ciclo da sessão simulada.
O build gera a pasta `dist/`. O comando `preview` serve essa versão localmente.

## Relação com a entrega principal

A [entrega principal da Fase 2](https://github.com/fiap-ia-trabalho/2ano_cardioia-fase2-estetoscopio-digital)
implementa extração de sintomas e classificação de risco por texto. Este portal
é o desafio Ir Além 1 e simula somente a interface; não executa nem integra os
modelos de diagnóstico. O Ir Além 2, de MLP para ECG, não faz parte deste projeto.

## Referências técnicas

- [React: useReducer](https://react.dev/reference/react/useReducer)
- [React: createContext](https://react.dev/reference/react/createContext)
- [Vite: instalação e execução](https://vite.dev/guide/)

A interface utiliza as fontes disponíveis no sistema. A execução não depende
de APIs externas ou serviços de fontes.
