document.addEventListener('DOMContentLoaded', () => {
    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- TEXT ROTATOR (Badge) ---
    // Removido a pedido do usuário para manter estático
    const badgeText = document.getElementById('badge-text');
    if (badgeText) {
        badgeText.textContent = "PARA PESSOA FÍSICA E MEIs";
    }

    // --- NUMBER COUNTER ANIMATION ---
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.count-up');
    let counted = false;

    if (statsSection && counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // ~60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 }); // Trigger when 50% visible
        
        counterObserver.observe(statsSection);
    }

    // --- YOUTUBE IFRAME API & VSL LOGIC ---
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var playerVsl;
    var playerDepoimento;

    window.onYouTubeIframeAPIReady = function() {
        // Substitua 'SEU_ID_VSL' pelo código do seu vídeo no YouTube
        playerVsl = new YT.Player('youtube-vsl', {
            videoId: 'wlwJouu0p_M', // ID da VSL real
            playerVars: { 
                'autoplay': 0, 
                'controls': 0, // Esconde a barra de progresso e botões do YouTube
                'rel': 0, // Evita vídeos recomendados de outros canais
                'modestbranding': 1, // Minimiza a logo do YouTube
                'showinfo': 0, 
                'disablekb': 1, // Desativa atalhos de teclado do youtube
                'iv_load_policy': 3, // Esconde anotações
                'fs': 0 // Desativa tela cheia
            }
        });

        // Substitua 'SEU_ID_DEPOIMENTO' pelo código do seu vídeo no YouTube
        playerDepoimento = new YT.Player('youtube-depoimento', {
            videoId: '-qrmO-UamWY', // Vídeo de depoimento enviado
            playerVars: { 
                'autoplay': 0, 
                'controls': 0, // Esconde tudo
                'rel': 0, 
                'modestbranding': 1,
                'showinfo': 0,
                'iv_load_policy': 3,
                'fs': 0
            }
        });
    };

    const vslOverlay = document.getElementById('vsl-overlay');
    
    if (vslOverlay) {
        vslOverlay.addEventListener('click', () => {
            vslOverlay.style.display = 'none';
            if (playerVsl && typeof playerVsl.playVideo === 'function') {
                playerVsl.playVideo();
            }
        });

        // Autoplay após 3 segundos
        setTimeout(() => {
            // Só executa o autoplay se o overlay ainda estiver visível (ou seja, o usuário não clicou ainda)
            if (vslOverlay.style.display !== 'none') {
                vslOverlay.style.display = 'none';
                if (playerVsl && typeof playerVsl.playVideo === 'function') {
                    // Tenta dar o play. Nota: Navegadores modernos podem mutar o som se não houver interação prévia.
                    playerVsl.playVideo();
                }
            }
        }, 3000);
    }

    // --- FAQ ACCORDION ---
    const faqRows = document.querySelectorAll('.faq-row');
    
    faqRows.forEach(row => {
        const question = row.querySelector('.faq-q');
        question.addEventListener('click', () => {
            const isActive = row.classList.contains('active');
            
            // Close all
            faqRows.forEach(r => r.classList.remove('active'));
            
            // Open clicked
            if (!isActive) {
                row.classList.add('active');
            }
        });
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

