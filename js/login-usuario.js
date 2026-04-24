document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const btnSubmit = document.getElementById('btn-submit');
    const errorBox = document.getElementById('error-message');
    const btnTogglePassword = document.getElementById('btn-toggle-password');

    // Visibilidade da Senha (Reduz a taxa de falha de login por digitação errada)
    if (btnTogglePassword && senhaInput) {
        btnTogglePassword.addEventListener('click', () => {
            const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
            senhaInput.setAttribute('type', type);
            
            if (type === 'text') {
                btnTogglePassword.classList.add('active');
                btnTogglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                btnTogglePassword.classList.remove('active');
                btnTogglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    }

    // Validador Regex Padrão
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Submissão do Formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            let hasError = false;
            let errorMessage = '';

            // Limpeza de estado
            emailInput.classList.remove('error-input');
            senhaInput.classList.remove('error-input');
            errorBox.classList.add('hidden');

            const emailVal = emailInput.value.trim();
            const passVal = senhaInput.value;

            // Validação Sequencial
            if (!emailVal || !isValidEmail(emailVal)) {
                hasError = true;
                errorMessage = 'Por favor, insira um endereço de e-mail válido.';
                emailInput.classList.add('error-input');
            } else if (!passVal) {
                hasError = true;
                errorMessage = 'A senha é obrigatória para acessar o sistema.';
                senhaInput.classList.add('error-input');
            }

            if (hasError) {
                e.preventDefault(); 
                errorBox.textContent = errorMessage;
                errorBox.classList.remove('hidden');
                
                // Tremor visual (feedback de negação)
                btnSubmit.style.animation = "shake 0.4s";
                setTimeout(() => btnSubmit.style.animation = "", 400);
            } else {
                // Previne o duplo clique (Double Charge/Submit)
                btnSubmit.disabled = true;
                btnSubmit.textContent = 'Entrando...';
            }
            if (hasError) {
                e.preventDefault(); 
                errorBox.textContent = errorMessage;
                errorBox.classList.remove('hidden');
                
                btnSubmit.style.animation = "shake 0.4s";
                setTimeout(() => btnSubmit.style.animation = "", 400);
            } else {
                // Impede o envio padrão do formulário para não dar erro 404
                e.preventDefault(); 
                
                btnSubmit.disabled = true;
                btnSubmit.textContent = 'Autenticando...';

                // Simula o tempo de resposta do servidor e redireciona para o Dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard-ator.html';
                }, 800);
            }
        });
    }
});