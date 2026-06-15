# GS Finance — App de Finanças Pessoais 💸

App de controle de gastos de uma fintech, construído para a atividade da FIAP
(HTML, CSS e Tailwind CSS). Recriação das telas desenhadas no Figma (Fase 2),
com acabamento visual mais polido e a mesma identidade (roxo/violeta, cards
arredondados, sombras suaves).

> **Telas:** Dashboard, Extrato de gastos, Transferir (Pix) e Perfil — com
> navegação por clique, totalmente responsivas (sidebar no desktop, bottom
> navigation no mobile).

## ✨ Funcionalidades

**Telas**
- **Dashboard** — gráfico entrada/saída, gastos por categoria, donut de limite,
  painel de alertas (abas Status/Alertas) e header com busca.
- **Extrato** — lista de lançamentos com **busca** e **filtros por categoria**,
  cards de resumo, limites por categoria e Open Finance.
- **Transferir** — formulário de Pix com contatos recentes e validação.
- **Perfil** — dados da conta e preferências com **switches** interativos.

**Interatividade (UX)**
- Navegação entre telas sem recarregar a página.
- Busca e filtros que atualizam a lista em tempo real.
- Modal **Adicionar gasto** que insere o lançamento e recalcula o total.
- Toasts de confirmação, toggles e estados de hover/ativo.

## 🛠️ Tecnologias

- **HTML5** semântico — `front/index.html`
- **Tailwind CSS** — utilitários no markup + tema customizado
- **CSS** separado em `front/css/styles.css` (saída compilada do Tailwind)
- **JavaScript** (vanilla) — `front/js/app.js`
- Fonte **Plus Jakarta Sans** e ícones **SVG** embutidos localmente (abre 100% offline)

## ▶️ Como abrir

Tudo já vem compilado e embutido. Basta abrir:

```
front/index.html
```

Não precisa de internet, build, nem servidor — clicar duas vezes no `front/index.html` funciona.

## 📁 Estrutura

```
.
├── front/                # ENTREGÁVEL — site que abre no navegador
│   ├── index.html        # estrutura das telas (HTML)
│   ├── css/styles.css     # estilos compilados do Tailwind (CSS)
│   ├── js/app.js          # interatividade: navegação, filtros, modal, toasts
│   └── fonts/             # Plus Jakarta Sans (woff2)
└── README.md
```

> As ferramentas de build (Tailwind, configs) e arquivos de apoio ficam em `assets/`
> (fora do versionamento). Para recompilar o CSS: `npm --prefix assets/build install`
> e `npm --prefix assets/build run build`.

---

Projeto desenvolvido por **Humberto Campos** · FIAP.
