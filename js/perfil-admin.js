document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.admin-sidebar a[data-target]');
    const sections = document.querySelectorAll('.admin-section');
    const toastContainer = document.getElementById('toast-container');
    const tabelaAprovacoes = document.getElementById('tabela-aprovacoes');
    const ajaxForms = document.querySelectorAll('.form-ajax');

    // Navegação em Abas (SPA)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Função de Toast (Alertas)
    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    };

    // Ações de Aprovar/Rejeitar na Tabela
    if (tabelaAprovacoes) {
        tabelaAprovacoes.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-action')) {
                const row = e.target.closest('tr');
                const action = e.target.getAttribute('data-action');
                const atorName = row.querySelector('strong').textContent;

                row.style.opacity = '0.5';
                e.target.disabled = true;

                setTimeout(() => {
                    row.remove();
                    if (action === 'aprovar') {
                        showToast(`${atorName} aprovado com sucesso.`, 'success');
                    } else {
                        showToast(`Cadastro de ${atorName} rejeitado.`, 'danger');
                    }
                }, 400); 
            }
        });
    }

    // Formulários "Fake" Ajax
    ajaxForms.forEach(form => {
        const btn = form.querySelector('button[type="submit"]');
        if(btn) btn.setAttribute('data-original-text', btn.textContent);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="text"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (input && input.value.trim() !== '') {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Salvando...';

                setTimeout(() => {
                    showToast(`Registro salvo com sucesso.`, 'success');
                    input.value = ''; 
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.getAttribute('data-original-text');
                }, 500);
            }
        });
    });
});