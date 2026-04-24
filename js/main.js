document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. CONTROLE DE ESTADO DO CABEÇALHO
       (Garante contraste e leitura durante o scroll)
    =========================================== */
    const navGlobal = document.getElementById('nav-global');
    
    if (navGlobal) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navGlobal.classList.add('scrolled');
            } else {
                navGlobal.classList.remove('scrolled');
            }
        }, { passive: true }); // passive: true melhora a performance de renderização no mobile
    }

    /* ==========================================
       2. GATILHO PSICOLÓGICO: PROVA SOCIAL NUMÉRICA
       (Animação de contagem para ancoragem de autoridade)
    =========================================== */
    const counters = document.querySelectorAll('.stat-number');
    const animationSpeed = 150; // Velocidade do incremento (menor = mais rápido)

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calcula o incremento dinâmico baseado na velocidade
                const inc = target / animationSpeed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15); // Taxa de atualização (ms)
                } else {
                    counter.innerText = target; // Garante que crava no número exato
                }
            };
            updateCount();
        });
    };

    // Aplica um atraso cinemático de 600ms antes de começar a contagem
    // Isso garante que o usuário já tenha focado a visão na dobra da página
    setTimeout(animateCounters, 600);

    /* ==========================================
       3. UX TÁTIL: BARRA DE BUSCA
       (Validação de front-end com feedback de erro visual)
    =========================================== */
    const searchForm = document.querySelector('.hero-search-form');
    const searchInput = document.getElementById('input-busca');
    const searchWrapper = document.querySelector('.search-glass-wrapper');

    if (searchForm && searchInput && searchWrapper) {
        searchForm.addEventListener('submit', (e) => {
            // Se o campo estiver vazio, bloqueia o envio e treme a barra
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchWrapper.style.animation = "shake 0.4s";
                searchWrapper.style.borderColor = "#ff4d4d"; // Cor de alerta
                searchInput.focus();
                
                // Reseta a animação para permitir novo feedback se o usuário errar de novo
                setTimeout(() => { 
                    searchWrapper.style.animation = ""; 
                    searchWrapper.style.borderColor = ""; 
                }, 400); 
            }
        });
    }

    /* ==========================================
       4. RAIO-X DO ECOSSISTEMA: FILTRAGEM DE ATORES
       (Comportamento de Single Page Application)
    =========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const actorCards = document.querySelectorAll('.actor-card');

    if (filterBtns.length > 0 && actorCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // 4.1. Atualiza o estado visual do botão clicado
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 4.2. Captura a categoria do botão
                const filterValue = btn.getAttribute('data-filter');

                // 4.3. Filtra a grelha de atores instantaneamente
                actorCards.forEach(card => {
                    // Se for "all" (Todos) ou bater com a categoria, exibe o card
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        
                        // Força um pequeno reflow para a animação de ScaleIn rodar novamente
                        card.style.animation = 'none';
                        card.offsetHeight; 
                        card.style.animation = null;
                    } else {
                        // Oculta os que não pertencem à categoria
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
    
});