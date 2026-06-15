# GS Finance

Projeto de front-end de uma fintech (controle de gastos pessoais), feito para a
atividade da FIAP. As telas foram baseadas no protótipo do Figma da Fase 2 e
montadas com HTML, CSS e Tailwind.

## Telas

- **Dashboard** — gráfico de entrada/saída, gastos por categoria, donut de limite e painel de alertas.
- **Extrato** — lista de gastos com busca e filtro por categoria.
- **Transferir** — formulário de Pix com contatos recentes.
- **Perfil** — dados da conta e preferências.

A navegação entre as telas é feita em JavaScript (sem recarregar a página). Tem
também o modal de adicionar gasto, busca/filtro em tempo real e alguns toasts.

## Como rodar

É só abrir o arquivo no navegador:

```
front/index.html
```

Não precisa de internet nem de servidor — o CSS já está compilado e a fonte e os
ícones ficam junto do projeto.

## Organização

```
front/
  index.html      # html das telas
  css/styles.css  # css (build do tailwind)
  js/app.js       # navegação, busca, filtros, modal
  fonts/          # fonte usada no projeto
```

---

Humberto Campos — FIAP.
