document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MÁSCARAS DE INPUT (DATA INTEGRITY)
       Aplica formatação em tempo real nos campos.
    =========================================== */
    
    const applyMask = (input, maskFunction) => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            e.target.value = maskFunction(e.target.value);
        });
    };

    // Máscara de Telefone (WhatsApp) -> (99) 99999-9999
    const maskPhone = (value) => {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses no DDD
            .replace(/(\d)(\d{4})$/, '$1-$2')    // Coloca hífen nos últimos 4 dígitos
            .substring(0, 15); // Limita tamanho
    };

    // Máscara de CPF -> 999.999.999-99
    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14);
    };

    // Máscara de CNPJ -> 99.999.999/9999-99
    const maskCNPJ = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .substring(0, 18);
    };

    applyMask(document.getElementById('whatsapp'), maskPhone);
    applyMask(document.getElementById('cpf'), maskCPF);
    applyMask(document.getElementById('cnpj'), maskCNPJ);

    /* ==========================================
       2. PROGRESSIVE DISCLOSURE (REDUÇÃO DE ATRITO)
       Oculta/exibe campos de CNPJ baseados no Tipo de Ator
    =========================================== */
    const tipoAtorSelect = document.getElementById('tipo-ator');
    const linhaOrganizacao = document.getElementById('linha-organizacao');
    const inputNomeOrg = document.getElementById('nome-organizacao');
    const inputCnpj = document.getElementById('cnpj');

    // Entidades que exigem dados de Organização
    const requerOrganizacao = ['startup', 'empresa', 'investidor', 'universidade', 'governo'];

    if (tipoAtorSelect) {
        tipoAtorSelect.addEventListener('change', (e) => {
            const valor = e.target.value;
            
            if (requerOrganizacao.includes(valor)) {
                // Exibe os campos e torna obrigatórios
                linhaOrganizacao.classList.remove('hidden');
                inputNomeOrg.setAttribute('required', 'true');
                // CNPJ mantemos sem 'required' estrito se houver startups em early-stage sem formalização,
                // mas você pode alterar caso seja regra de negócio dura.
            } else {
                // Oculta os campos, remove obrigatoriedade e limpa os dados
                linhaOrganizacao.classList.add('hidden');
                inputNomeOrg.removeAttribute('required');
                inputNomeOrg.value = '';
                inputCnpj.value = '';
            }
        });
        
        // Dispara o evento no carregamento para garantir o estado correto caso haja cache de navegação
        tipoAtorSelect.dispatchEvent(new Event('change'));
    }

    /* ==========================================
       3. PREVENÇÃO DE MULTI-SUBMIT (UX TÁTIL)
       Altera o botão para evitar que cliquem 2x
    =========================================== */
    const form = document.getElementById('form-registro-direto');
    const btnSubmit = document.getElementById('btn-submit');

    if (form) {
        form.addEventListener('submit', (e) => {
            // Opcional: Aqui entraria uma validação customizada antes do envio
            
            // UX State:
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = 'Processando Registro...';
            
            // Permite que o formulário prossiga para o Action natural
        });
    }
});