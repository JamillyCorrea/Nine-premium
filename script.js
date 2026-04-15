
// MENU LATERAL
function abrirMenu() {
  const menuLateral = document.getElementById("menuLateral");
  const botaoMenu = document.querySelector(".menu");

  if (menuLateral) {
    menuLateral.classList.add("ativo");
  }

  if (botaoMenu) {
    botaoMenu.classList.add("escondido");
  }
}

function fecharMenu() {
  const menuLateral = document.getElementById("menuLateral");
  const botaoMenu = document.querySelector(".menu");

  if (menuLateral) {
    menuLateral.classList.remove("ativo");
  }

  if (botaoMenu) {
    botaoMenu.classList.remove("escondido");
  }
}

// SCROLL DOS DESTINOS
function scrollCards(direcao) {
  const container = document.querySelector(".destinos-cards");
  const card = document.querySelector(".destinos-cards .card-destino");

  if (!container || !card) return;

  const gap = 18;
  const distancia = card.offsetWidth + gap;

  container.scrollBy({
    left: direcao * distancia,
    behavior: "smooth"
  });
}

// VITRINE DE IMÓVEIS
function scrollVitrine(direcao) {
  const container = document.getElementById("vitrineCards");
  const cards = container ? container.querySelectorAll(".imovel-card") : [];

  if (!container || !cards.length) return;

  const estiloContainer = window.getComputedStyle(container);
  const gap = parseInt(estiloContainer.columnGap || estiloContainer.gap || 0, 10) || 0;
  const distancia = cards[0].offsetWidth + gap;

  const scrollAtual = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  // Vai do último para o primeiro
  if (direcao === 1 && scrollAtual >= maxScroll - 5) {
    container.scrollTo({
      left: 0,
      behavior: "smooth"
    });
    return;
  }

  // Vai do primeiro para o último
  if (direcao === -1 && scrollAtual <= 5) {
    container.scrollTo({
      left: maxScroll,
      behavior: "smooth"
    });
    return;
  }

  // Scroll normal
  container.scrollBy({
    left: direcao * distancia,
    behavior: "smooth"
  });
}

// INDICADOR DA VITRINE
function atualizarIndicador() {
  const container = document.getElementById("vitrineCards");
  const progresso = document.getElementById("progressoLinha");

  if (!container || !progresso) return;

  const linha = progresso.parentElement;
  if (!linha) return;

  const maxScroll = container.scrollWidth - container.clientWidth;

  if (maxScroll <= 0) {
    progresso.style.transform = "translateX(0)";
    return;
  }

  const larguraLinha = linha.offsetWidth;
  const larguraProgresso = progresso.offsetWidth;
  const maxMove = larguraLinha - larguraProgresso;

  const porcentagem = container.scrollLeft / maxScroll;
  const deslocamento = porcentagem * maxMove;

  progresso.style.transform = `translateX(${deslocamento}px)`;
}

// CARD ATIVO DA VITRINE
function atualizarCardsAtivos() {
  const container = document.getElementById("vitrineCards");
  const cards = container ? container.querySelectorAll(".imovel-card") : [];

  if (!container || !cards.length) return;

  const centroContainer = container.scrollLeft + container.clientWidth / 2;

  cards.forEach((card) => {
    const centroCard = card.offsetLeft + card.offsetWidth / 2;

    if (Math.abs(centroContainer - centroCard) < card.offsetWidth / 2) {
      card.classList.add("imovel-card-ativo");
    } else {
      card.classList.remove("imovel-card-ativo");
    }
  });
}

// INICIALIZAÇÃO
function inicializarSite() {
  const vitrine = document.getElementById("vitrineCards");

  atualizarIndicador();
  atualizarCardsAtivos();

  if (vitrine) {
    vitrine.addEventListener("scroll", atualizarIndicador);
    vitrine.addEventListener("scroll", atualizarCardsAtivos);
  }
}

window.addEventListener("load", inicializarSite);
window.addEventListener("resize", () => {
  atualizarIndicador();
  atualizarCardsAtivos();
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});