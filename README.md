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
- **Dashboard** — saldo (com ocultar/mostrar), entradas/saídas, gráfico de
  gastos por categoria (donut), ações rápidas e últimas transações.
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

- **HTML5** semântico — `index.html`
- **Tailwind CSS** — utilitários no markup + tema customizado (`tailwind.config.js`)
- **CSS** separado em `styles.css` (saída compilada do Tailwind)
- **JavaScript** (vanilla) para interatividade — `app.js`
- Ícones em **SVG inline** (sem dependência de imagens externas → abre offline)

## ▶️ Como abrir

O CSS já vem compilado e o JS é um script clássico. Basta abrir:

```
index.html
```

Não precisa de internet, build, nem servidor — clicar duas vezes no `index.html` funciona.

## 🔧 Recompilar o Tailwind (opcional)

```bash
npm install
npm run build      # gera styles.css minificado
npm run dev        # modo watch durante o desenvolvimento
```

## 📁 Estrutura

```
.
├── index.html            # estrutura das telas (HTML)
├── styles.css            # estilos compilados do Tailwind (CSS)
├── app.js                # interatividade: navegação, filtros, modal, toasts
├── src/input.css         # entrada do Tailwind (@tailwind + componentes)
├── tailwind.config.js    # tema: cores da marca, sombras, gradientes
└── package.json          # scripts de build
```

---

Projeto desenvolvido por **Humberto Campos** · FIAP · Front-end Design Engineering.
