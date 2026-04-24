document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-recuperacao');
    const emailInput = document.getElementById('email-recuperacao');
    const btnSubmit = document.getElementById('btn-submit');
    const errorBox = document.getElementById('error-message');
    
    // Elementos de transição de estado
    const headerInstrucoes = document.getElementById('header-instrucoes');
    const footerVoltar = document.getElementById('footer-voltar');
    const alertaSucesso = document.getElementById('alerta-sucesso');

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            // Reseta estados de erro
            emailInput.classList.remove('error-input');
            errorBox.classList.add('hidden');

            const emailVal = emailInput.value.trim();

            // Validação
            if (!emailVal || !isValidEmail(emailVal)) {
                errorBox.textContent = 'Por favor, insira um endereço de e-mail válido.';
                errorBox.classList.remove('hidden');
                emailInput.classList.add('error-input');
                
                // Tremor visual para feedback
                btnSubmit.style.animation = "shake 0.4s";
                setTimeout(() => btnSubmit.style.animation = "", 400);
                return;
            }

            // Estado de Processamento
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Verificando dados...';

            // Simula a requisição ao Back-end (1.5 segundos)
            setTimeout(() => {
                // Oculta formulário e textos iniciais
                form.classList.add('hidden');
                headerInstrucoes.classList.add('hidden');
                footerVoltar.classList.add('hidden');
                
                // Exibe mensagem de sucesso
                alertaSucesso.classList.remove('hidden');
            }, 1500);
        });
    }
});