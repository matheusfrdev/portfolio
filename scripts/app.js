const theme=document.getElementById('theme');
let preference;try{preference=localStorage.getItem('mf-theme');}catch{}
function setTheme(light){document.body.classList.toggle('light',light);theme.setAttribute('aria-label',light?'Ativar tema escuro':'Ativar tema claro');document.querySelector('meta[name="theme-color"]').content=light?'#fafafa':'#121214';}
setTheme(preference==='light');
theme.addEventListener('click',()=>{const light=!document.body.classList.contains('light');setTheme(light);try{localStorage.setItem('mf-theme',light?'light':'dark');}catch{}});

const projectDetails = {
  nortiva: {
    title: 'Nortiva', category: 'Sites & design', image: 'images/nortiva.png',
    description: [
      'Desenvolvemos landing pages, sites institucionais e automações web sob medida, com foco em valorizar cada negócio e facilitar o contato com possíveis clientes.'
    ],
    features: ['Landing pages e sites institucionais', 'Automações web sob medida', 'Valorização de cada negócio e facilidade de contato com possíveis clientes'],
    links: [{ text: 'Conhecer a Nortiva', url: 'https://www.instagram.com/thenortiva/' }, { text: 'GitHub', url: 'https://github.com/Nortiva' }]
  },

  maracaki: {
    title: 'Maracaki', category: 'Software & Micro-SaaS', image: 'https://raw.githubusercontent.com/Maracaki/Site/f4178a0ca8e3509266776ca70e6c0dc079381fb1/img/robo-maracaki.webp',
    description: [
      'A Maracaki é uma empresa de software voltada à criação de sistemas inteligentes e soluções Micro-SaaS para o mercado comercial. A proposta é transformar necessidades reais dos negócios em ferramentas digitais práticas, com foco em simplificar processos e apoiar a rotina de quem empreende.',
      'Cada solução parte de um problema específico: reduzir tarefas repetitivas, organizar informações ou facilitar atividades do dia a dia. A ideia é desenvolver sistemas com uma finalidade clara e interfaces fáceis de usar, aproximando a tecnologia das necessidades de cada negócio.'
    ],
    features: ['Sistemas inteligentes voltados a necessidades reais', 'Micro-SaaS com foco em problemas específicos', 'Simplificação de processos e tarefas do dia a dia', 'Interfaces práticas para o mercado comercial'],
    links: [{ text: 'Conhecer a Maracaki', url: 'https://maracaki.github.io/Site/' }, { text: 'GitHub', url: 'https://github.com/Maracaki' }]
  },

  patodevs: {
  title: 'PatoDevs', category: 'Comunidade de desenvolvedores', image: 'images/patodevs.png',
  description: [
    'Uma comunidade de desenvolvedores para compartilhar conhecimento, conectar ideias e construir projetos juntos.'
  ],
  features: ['Compartilhamento de conhecimento', 'Conexão entre desenvolvedores e ideias', 'Construção de projetos em comunidade'],
  links: [{ text: 'Conhecer o PatoDevs', url: 'https://patodevs.vercel.app/' }, { text: 'GitHub', url: 'https://github.com/PatoDevs' }]
  },
  trezzer: {
    title: 'Trezzer', category: 'Links & presença digital', image: 'images/trezzer.png',
    description: [
      'O Trezzer reúne a presença digital de uma pessoa em uma única página. A proposta é organizar links, redes sociais, projetos e informações de contato em um endereço fácil de compartilhar.',
      'A apresentação do projeto explora uma interface clara e uma identidade visual própria. O objetivo é tornar o acesso ao conteúdo mais prático, permitindo que quem visita encontre os principais links em um só lugar.'
    ],
    features: ['Links e redes sociais em uma única página', 'Espaço para apresentar projetos e contatos', 'Página pensada para compartilhar na bio'],
    links: [{ text: 'Ver projeto', url: 'https://trezzer.netlify.app' }, { text: 'GitHub', url: 'https://github.com/matheusfrdev/Trezzer' }]
  },
  cardapio: {
    title: 'Cardápio Digital', category: 'Cardápio & pedidos', image: 'images/cardapio-logo.svg',
    description: [
      'Um cardápio digital 100% open source desenvolvido em HTML, CSS e JavaScript. O cliente pode consultar os produtos, navegar pelas categorias e montar seu pedido diretamente na interface.',
      'O projeto inclui carrinho com quantidades e valores, opções de entrega ou retirada e informações para finalizar o pedido pelo WhatsApp. A configuração permite adaptar os produtos e a identidade visual a diferentes estabelecimentos.'
    ],
    features: ['Produtos organizados por categorias', 'Carrinho com quantidades e total do pedido', 'Entrega ou retirada e envio pelo WhatsApp', 'Configuração de produtos e personalização visual'],
    links: [{ text: 'Ver projeto', url: 'https://matheusfrdev.github.io/cardapio-digital/' }, { text: 'GitHub', url: 'https://github.com/matheusfrdev/cardapio-digital' }]
  },
  roddi: {
  title: 'Roddi', category: 'Aplicativo para entregadores', image: 'images/roddi.png',
  description: [
    'Um aplicativo em desenvolvimento para facilitar a rotina de entregadores. A proposta reúne organização de entregas, acesso aos destinos e controle de ganhos e gastos em uma interface simples, pensada para celular.',
    'O projeto possui identidade visual própria e prevê armazenamento dos registros no aparelho, sem necessidade de conta, com opções de backup. A versão web será a base para uma futura adaptação para Android.'
  ],
  features: ['Organização e acompanhamento de entregas', 'Acesso aos destinos pelo Google Maps', 'Controle de ganhos e gastos do turno', 'Armazenamento local e backup planejados'],
  links: [{ text: 'Ver projeto', url: 'https://github.com/matheusfrdev/roddi' }]
}
};
const dialog = document.getElementById('project-dialog');
function openProject(key) {
  const project = projectDetails[key];
  if (!project) return;
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-category').textContent = project.category;
  const image = document.getElementById('dialog-image');
  image.src = project.image;
  image.classList.toggle('nortiva-image', key === 'nortiva');
  image.classList.toggle('patodevs-image', key === 'patodevs');
  image.classList.toggle('maracaki-image', key === 'maracaki');
  image.alt = 'Apresentação do projeto ' + project.title;
  document.getElementById('dialog-description').replaceChildren(...project.description.map(text => {
    const p = document.createElement('p'); p.textContent = text; return p;
  }));
  document.getElementById('dialog-features').replaceChildren(...project.features.map(text => {
    const li = document.createElement('li'); li.textContent = text; return li;
  }));
  document.getElementById('dialog-links').replaceChildren(...project.links.map(link => {
    const a = document.createElement('a'); a.textContent = link.text; a.href = link.url;
    a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
  }));
  dialog.showModal(); document.body.classList.add('dialog-open');
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const emailAddress = 'matheusfrdev@gmail.com';
const copyFeedback = document.querySelector('.copy-feedback');
let copyFeedbackTimer;
function copyEmailFallback() {
  const previousFocus = document.activeElement;
  const field = document.createElement('textarea');
  field.value = emailAddress;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.append(field);
  field.select();
  let copied = false;
  try { copied = document.execCommand('copy'); }
  finally { field.remove(); previousFocus?.focus({preventScroll:true}); }
  return copied;
}
document.querySelectorAll('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(emailAddress);
      copied = true;
    } catch {
      try { copied = copyEmailFallback(); } catch {}
    }
    clearTimeout(copyFeedbackTimer);
    copyFeedback.textContent = copied ? 'E-mail copiado!' : 'Não foi possível copiar. Copie manualmente: ' + emailAddress;
    if (copied) copyFeedbackTimer = setTimeout(() => { copyFeedback.textContent = ''; }, 3500);
  });
});

// Desconta o cabeçalho real da primeira tela, inclusive com zoom e no celular.
const pageHeader = document.querySelector('.page > header');
function updateHeaderHeight() {
  document.documentElement.style.setProperty('--header-height', `${pageHeader.getBoundingClientRect().height}px`);
}
updateHeaderHeight();
if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(pageHeader);
else window.addEventListener('resize', updateHeaderHeight);

// Revela uma única vez, sem esconder conteúdo quando JS não está disponível.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealTargets = document.querySelectorAll('.about, .section-title, .project, .contact');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      revealObserver.unobserve(entry.target);
      // Devolve aos cards suas transições de hover originais.
      setTimeout(() => entry.target.classList.remove('scroll-reveal'), 500);
    });
  }, { threshold: 0.08 });
  revealTargets.forEach(element => {
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('scroll-reveal', 'is-pending');
    revealObserver.observe(element);
  });
  function showAllReveals() {
    revealObserver.disconnect();
    revealTargets.forEach(element => element.classList.remove('scroll-reveal', 'is-pending'));
  }
  reducedMotion.addEventListener('change', event => {
    if (event.matches) showAllReveals();
  });
  document.addEventListener('focusin', event => {
    const pending = event.target.closest('.is-pending');
    if (pending) {
      pending.classList.remove('is-pending', 'scroll-reveal');
      revealObserver.unobserve(pending);
    }
  });
}
