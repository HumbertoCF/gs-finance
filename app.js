'use strict';

// ===== Utilidades =====
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** Converte "1.234,56" / "320,00" / "320" em número. */
function parseValor(txt) {
  const n = parseFloat(String(txt).replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

// Cada categoria -> classes completas (escritas por extenso p/ o Tailwind compilar) + letra.
const CATEGORIAS = {
  mercado: { letra: 'M', classe: 'bg-[#16B364]/12 text-[#16B364]', nome: 'Mercado' },
  assinaturas: { letra: 'A', classe: 'bg-[#8B5CF6]/12 text-[#8B5CF6]', nome: 'Assinaturas' },
  uber: { letra: 'U', classe: 'bg-[#06B6D4]/12 text-[#06B6D4]', nome: 'Uber' },
  ifood: { letra: 'I', classe: 'bg-[#F04438]/12 text-[#F04438]', nome: 'Ifood' },
  saude: { letra: 'S', classe: 'bg-[#3B82F6]/12 text-[#3B82F6]', nome: 'Saúde' },
  lazer: { letra: 'L', classe: 'bg-[#EC4899]/12 text-[#EC4899]', nome: 'Lazer' },
};

// ===== Navegação entre telas =====
function navegar(view) {
  $$('[data-view]').forEach((sec) => sec.classList.toggle('hidden', sec.dataset.view !== view));
  $$('[data-nav]').forEach((btn) => btn.classList.toggle('nav-active', btn.dataset.nav === view));
  const ativa = $(`[data-view="${view}"]`);
  if (ativa) ativa.classList.add('animate-rise');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Toast =====
let toastTimer;
function showToast(msg) {
  const toast = $('[data-toast]');
  $('[data-toast-msg]', toast).textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
}

// ===== Modal adicionar gasto =====
function abrirModal() {
  const m = $('[data-modal]');
  m.classList.remove('hidden');
  m.classList.add('flex');
  const desc = $('[data-add-desc]', m);
  if (desc) setTimeout(() => desc.focus(), 50);
}
function fecharModal() {
  const m = $('[data-modal]');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

// ===== Extrato: busca + filtros =====
let filtroAtivo = 'all';
let total = 726.40;

function atualizarTotal(delta) {
  total += delta;
  const el = $('[data-total]');
  if (el) el.textContent = brl.format(total);
}

function aplicarFiltros() {
  const termo = ($('[data-search]')?.value || '').trim().toLowerCase();
  const itens = $$('[data-list] > li');
  let visiveis = 0;
  itens.forEach((li) => {
    const okCat = filtroAtivo === 'all' || li.dataset.cat === filtroAtivo;
    const okBusca = !termo || (li.dataset.name || '').includes(termo);
    const mostrar = okCat && okBusca;
    li.classList.toggle('hidden', !mostrar);
    if (mostrar) visiveis += 1;
  });
  const results = $('[data-results]');
  if (results) results.textContent = String(visiveis);
  const empty = $('[data-empty]');
  if (empty) empty.classList.toggle('hidden', visiveis !== 0);
}

function selecionarChip(btn) {
  $$('[data-filter]').forEach((c) => {
    const ativo = c === btn;
    c.classList.toggle('bg-brand-gradient', ativo);
    c.classList.toggle('text-white', ativo);
    c.classList.toggle('font-semibold', ativo);
    c.classList.toggle('border', !ativo);
    c.classList.toggle('border-slate-200', !ativo);
    c.classList.toggle('text-ink/70', !ativo);
    c.classList.toggle('font-medium', !ativo);
  });
  filtroAtivo = btn.dataset.filter;
  aplicarFiltros();
}

function adicionarGasto(desc, valor, catKey) {
  const cat = CATEGORIAS[catKey] || CATEGORIAS.mercado;
  const li = document.createElement('li');
  li.className = 'flex items-center gap-3 py-3.5 animate-rise';
  li.dataset.cat = catKey;
  li.dataset.name = desc.toLowerCase();
  li.innerHTML =
    '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ' + cat.classe + ' text-sm font-bold">' + cat.letra + '</span>' +
    '<div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold"></p>' +
    '<p class="truncate text-xs text-muted">' + cat.nome + ' · Agora</p></div>' +
    '<span class="shrink-0 text-sm font-bold text-danger">- ' + brl.format(valor) + '</span>';
  $('p.font-semibold', li).textContent = desc; // evita injeção de HTML
  $('[data-list]').prepend(li);

  const count = $('[data-count]');
  if (count) count.textContent = String($$('[data-list] > li').length);
  atualizarTotal(valor);
  aplicarFiltros();
}

// ===== Eventos =====
document.addEventListener('click', (e) => {
  const navBtn = e.target.closest('[data-nav]');
  if (navBtn) {
    navegar(navBtn.dataset.nav);
    return;
  }

  const chip = e.target.closest('[data-filter]');
  if (chip) {
    selecionarChip(chip);
    return;
  }

  const sw = e.target.closest('[data-switch]');
  if (sw) {
    sw.setAttribute('aria-pressed', sw.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    return;
  }

  const contato = e.target.closest('[data-contact]');
  if (contato) {
    const key = $('[data-transfer-key]');
    if (key) key.value = contato.dataset.contact;
    showToast('Destinatário: ' + contato.dataset.contact);
    return;
  }

  const action = e.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'open-add') abrirModal();
  else if (action === 'config') navegar('perfil');
  else if (action === 'close-add') fecharModal();
  else if (action === 'toggle-balance') toggleSaldo();
  else if (action === 'connect-bank') showToast('Redirecionando para o Open Finance…');
  else if (action === 'toast-detalhes') showToast('Abrindo detalhes da meta…');
  else if (action === 'toast-editar') showToast('Modo de edição de limites');
  else if (action === 'toast-sair') showToast('Saindo da conta…');
});

// Fecha modal ao clicar no fundo
$('[data-modal]')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) fecharModal();
});

// Esc fecha modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharModal();
});

// Mostrar/ocultar saldo
function toggleSaldo() {
  const el = $('[data-balance]');
  const label = $('[data-eye-label]');
  const escondido = el.textContent.includes('•');
  el.textContent = escondido ? el.dataset.amount : 'R$ ••••••';
  if (label) label.textContent = escondido ? 'Ocultar' : 'Mostrar';
}

// Busca
$('[data-search]')?.addEventListener('input', aplicarFiltros);

// Submit: adicionar gasto
$('[data-form-add]')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = $('[data-add-desc]').value.trim();
  const valor = parseValor($('[data-add-value]').value);
  const cat = $('[data-add-cat]').value;
  if (!desc || valor <= 0) {
    showToast('Preencha descrição e valor válido');
    return;
  }
  adicionarGasto(desc, valor, cat);
  e.target.reset();
  fecharModal();
  showToast('Gasto adicionado com sucesso');
});

// Submit: transferência
$('[data-form-transfer]')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const valor = parseValor($('[data-transfer-amount]').value);
  const chave = $('[data-transfer-key]').value.trim();
  if (valor <= 0 || !chave) {
    showToast('Informe valor e chave Pix');
    return;
  }
  e.target.reset();
  showToast('Pix de ' + brl.format(valor) + ' enviado!');
});

// ===== Inicialização =====
navegar('dashboard');
aplicarFiltros();
