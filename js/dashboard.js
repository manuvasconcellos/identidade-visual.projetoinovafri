document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Simulação de Dados de Sessão (Substitua por injeção via Back-end)
    const sessionData = {
        userName: "Manuela",
        profileCompletionRatio: 0.75 // 75% completado
    };

    // 2. Saudação Dinâmica e Contextual
    const renderGreeting = () => {
        const nameElement = document.getElementById('user-name-display');
        const greetingTitle = document.getElementById('greeting-title');
        const currentHour = new Date().getHours();
        
        let timeGreeting = "Bem-vindo(a)";
        if (currentHour >= 5 && currentHour < 12) timeGreeting = "Bom dia";
        else if (currentHour >= 12 && currentHour < 18) timeGreeting = "Boa tarde";
        else timeGreeting = "Boa noite";

        if (nameElement) {
            nameElement.textContent = sessionData.userName;
            greetingTitle.innerHTML = `${timeGreeting}, <span class="text-highlight">${sessionData.userName}</span>`;
        }
    };

    // 3. Execução Tátil da Gamificação (Progress Bar)
    const animateCompletionBar = () => {
        const targetPercentage = sessionData.profileCompletionRatio * 100;
        const barElement = document.getElementById('completion-bar');
        const valueElement = document.getElementById('completion-value');

        if (barElement && valueElement) {
            // Atraso intencional de 300ms para criar a sensação de "cálculo ao vivo" no load da página
            setTimeout(() => {
                barElement.style.width = `${targetPercentage}%`;
                valueElement.textContent = `${targetPercentage}%`;
                
                // Altera cor se a métrica for crítica (Abaixo de 50%)
                if (targetPercentage < 50) {
                    barElement.style.background = '#ff4d4d';
                    valueElement.style.color = '#ff4d4d';
                }
            }, 300);
        }
    };

    // 4. Feature de Escala e Retenção: Copiar Link do Perfil
    const initClipboardFeature = () => {
        const btnCopy = document.getElementById('btn-copy-profile');
        
        if (btnCopy) {
            btnCopy.addEventListener('click', async () => {
                const dummyProfileLink = "https://inovafrihub.com.br/ator/techminds-ltda";
                
                try {
                    await navigator.clipboard.writeText(dummyProfileLink);
                    
                    // Feedback Tátil Temporário
                    const originalHTML = btnCopy.innerHTML;
                    btnCopy.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Link Copiado!`;
                    btnCopy.style.background = "rgba(235, 150, 255, 0.1)";
                    
                    setTimeout(() => {
                        btnCopy.innerHTML = originalHTML;
                        btnCopy.style.background = "transparent";
                    }, 2500);

                } catch (err) {
                    console.error('Falha ao copiar link:', err);
                }
            });
        }
    };

    // Init Engine
    renderGreeting();
    animateCompletionBar();
    initClipboardFeature();

});