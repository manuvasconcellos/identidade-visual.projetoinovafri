document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login-admin');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnSubmit = document.getElementById('btn-submit');
    const errorBox = document.getElementById('error-message');
    const btnTogglePassword = document.getElementById('btn-toggle-password');

    // 1. Alternador de Visibilidade de Senha (UX Crítica)
    if (btnTogglePassword && passwordInput) {
        btnTogglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Troca visual do ícone para dar feedback de estado
            if (type === 'text') {
                btnTogglePassword.classList.add('active');
                btnTogglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                btnTogglePassword.classList.remove('active');
                btnTogglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    }

    // 2. Validador Regex de E-mail
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // 3. Interceptação de Submissão e Validação Front-end
    if (form) {
        form.addEventListener('submit', (e) => {
            let hasError = false;
            let errorMessage = '';

            // Reseta estados visuais
            emailInput.classList.remove('error-input');
            passwordInput.classList.remove('error-input');
            errorBox.classList.add('hidden');

            const emailVal = emailInput.value.trim();
            const passVal = passwordInput.value;

            // Análise de falhas
            if (!emailVal || !isValidEmail(emailVal)) {
                hasError = true;
                errorMessage = 'Insira um endereço de e-mail operacional válido.';
                emailInput.classList.add('error-input');
            } else if (!passVal) {
                hasError = true;
                errorMessage = 'A credencial de senha é obrigatória.';
                passwordInput.classList.add('error-input');
            }

            if (hasError) {
                e.preventDefault(); // Aborta requisição inútil ao servidor
                errorBox.textContent = errorMessage;
                errorBox.classList.remove('hidden');
                
                // Shake effect no botão para ancoragem visual
                btnSubmit.style.animation = "shake 0.4s";
                setTimeout(() => btnSubmit.style.animation = "", 400);
            } else {
                // Previne duplo clique e dá feedback de processamento
                btnSubmit.disabled = true;
                btnSubmit.textContent = 'Autenticando...';
            }
            
        });
    }
});