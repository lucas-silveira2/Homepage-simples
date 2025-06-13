// Dados de exemplo dos jogos
const jogos = [
    {
        id: 1,
        nome: "Hollow Knight",
        desenvolvedor: "Team Cherry",
        preco: 24.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
        avaliacao: 4.9
    },
    {
        id: 2,
        nome: "Five Nights at Freddy's",
        desenvolvedor: "Scott Cawthon",
        preco: 19.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/319510/header.jpg",
        avaliacao: 4.8
    },
    {
        id: 3,
        nome: "Cuphead",
        desenvolvedor: "Studio MDHR",
        preco: 29.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg",
        avaliacao: 4.7
    },
    {
        id: 4,
        nome: "Katana ZERO",
        desenvolvedor: "Askiisoft",
        preco: 14.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/460950/header.jpg",
        avaliacao: 4.8
    },
    {
        id: 5,
        nome: "Castle Crashers",
        desenvolvedor: "The Behemoth",
        preco: 14.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/204360/header.jpg",
        avaliacao: 4.7
    },
    {
        id: 6,
        nome: "Minecraft",
        desenvolvedor: "Mojang",
        preco: 29.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/header.jpg",
        avaliacao: 4.9
    },
    {
        id: 7,
        nome: "Plants vs. Zombies",
        desenvolvedor: "PopCap Games",
        preco: 9.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/3590/header.jpg",
        avaliacao: 4.6
    },
    {
        id: 8,
        nome: "Celeste",
        desenvolvedor: "Extremely OK Games",
        preco: 19.99,
        imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg",
        avaliacao: 4.9
    }
];

// Estado do carrinho
let carrinhoItens = [];

// Função para criar as estrelas de avaliação
function criarEstrelas(avaliacao) {
    const estrelasCheias = Math.floor(avaliacao);
    let html = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < estrelasCheias) {
            html += '<i class="fas fa-star"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    
    return html;
}

// Função para formatar preço
function formatarPreco(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const jogo = jogos.find(j => j.id === id);
    if (jogo) {
        const itemExistente = carrinhoItens.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinhoItens.push({
                id: jogo.id,
                nome: jogo.nome,
                preco: jogo.preco,
                imagem: jogo.imagem,
                quantidade: 1
            });
        }
        atualizarCarrinho();
    }
}

// Função para remover do carrinho
function removerDoCarrinho(id) {
    carrinhoItens = carrinhoItens.filter(item => item.id !== id);
    atualizarCarrinho();
}

// Função para atualizar quantidade
function atualizarQuantidade(id, novaQuantidade) {
    const item = carrinhoItens.find(item => item.id === id);
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            item.quantidade = novaQuantidade;
            atualizarCarrinho();
        }
    }
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    // Atualizar contador
    const contador = document.getElementById('cartCount');
    const totalItens = carrinhoItens.reduce((total, item) => total + item.quantidade, 0);
    contador.textContent = totalItens;

    // Atualizar itens no modal
    const cartItems = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyCartMessage');
    
    if (carrinhoItens.length === 0) {
        cartItems.innerHTML = '';
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        cartItems.innerHTML = carrinhoItens.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.nome}</h4>
                    <div class="cart-item-price">${formatarPreco(item.preco)}</div>
                    <div class="cart-item-quantity">
                        <span>Quantidade: ${item.quantidade}</span>
                    </div>
                </div>
                <button class="remove-item" onclick="removerDoCarrinho(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // Atualizar total
    const total = carrinhoItens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    document.getElementById('checkoutTotal').textContent = total.toFixed(2);
    document.getElementById('checkoutSubtotal').textContent = total.toFixed(2);
}

// Função para criar o card do jogo
function criarCardJogo(jogo) {
    return `
        <div class="product-card" data-id="${jogo.id}">
            <div class="product-image">
                <img src="${jogo.imagem}" alt="${jogo.nome}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${jogo.nome}</h3>
                <p class="product-developer">${jogo.desenvolvedor}</p>
                <div class="product-rating">
                    ${criarEstrelas(jogo.avaliacao)}
                </div>
                <div class="product-price">
                    <span class="current-price">${formatarPreco(jogo.preco)}</span>
                </div>
                <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${jogo.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Adicionar
                </button>
            </div>
        </div>
    `;
}

// Função para renderizar os jogos
function renderizarJogos() {
    const gridJogos = document.getElementById('productsGrid');
    if (gridJogos) {
        gridJogos.innerHTML = jogos.map(jogo => criarCardJogo(jogo)).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarJogos();

    // Event listeners para modais
    document.getElementById('cartButton').addEventListener('click', () => {
        document.getElementById('cartModal').classList.remove('hidden');
    });

    document.getElementById('closeCartModal').addEventListener('click', () => {
        document.getElementById('cartModal').classList.add('hidden');
    });

    document.getElementById('continueShopping').addEventListener('click', () => {
        document.getElementById('cartModal').classList.add('hidden');
    });

    document.getElementById('proceedToCheckout').addEventListener('click', () => {
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('checkoutModal').classList.remove('hidden');
    });

    document.getElementById('closeCheckoutModal').addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.add('hidden');
    });

    // Fechar modais ao clicar no overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                e.target.parentElement.classList.add('hidden');
            }
        });
    });

    // Scroll suave para a seção de jogos ao clicar no botão "Explorar Jogos"
    const explorarJogosBtn = document.querySelector('.banner-button');
    const produtosSection = document.getElementById('productsGrid');

    function smoothScrollTo(element, duration = 800) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    if (explorarJogosBtn && produtosSection) {
        explorarJogosBtn.addEventListener('click', () => {
            smoothScrollTo(produtosSection, 1000);
        });
    }
});