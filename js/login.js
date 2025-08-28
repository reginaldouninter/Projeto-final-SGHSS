// Seleção de tipo de usuário
document.querySelectorAll('.user-type-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.user-type-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});

// Toggle de senha
document.getElementById('passwordToggle').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Validação em tempo real
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById('emailError');
    
    if (email && !emailRegex.test(email)) {
        this.classList.add('error');
        errorElement.style.display = 'block';
    } else {
        this.classList.remove('error');
        errorElement.style.display = 'none';
    }
});

document.getElementById('password').addEventListener('blur', function() {
    const password = this.value;
    const errorElement = document.getElementById('passwordError');
    
    if (password && password.length < 6) {
        this.classList.add('error');
        errorElement.style.display = 'block';
    } else {
        this.classList.remove('error');
        errorElement.style.display = 'none';
    }
});

// Submissão do formulário
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginBtn = document.getElementById('loginBtn');
    const loading = document.getElementById('loading');
    
    // Simular loading
    loginBtn.disabled = true;
    loading.style.display = 'inline-block';
    loginBtn.innerHTML = '<div class="loading"></div>Entrando...';
    
    setTimeout(() => {
        const userType = document.querySelector('.user-type-option.active').dataset.type;
        
        // Redirecionar baseado no tipo de usuário
        let redirectUrl = '';
        switch(userType) {
            case 'paciente':
                redirectUrl = 'prototipo_dashboard_paciente.html';
                break;
            case 'profissional':
                redirectUrl = 'prototipo_dashboard_profissional.html';
                break;
            case 'admin':
                redirectUrl = 'prototipo_dashboard_administrador.html';
                break;
        }
        
        // Redirecionar para a página correspondente
        window.location.href = redirectUrl;
    }, 2000);
});

// Link de esqueci senha
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funcionalidade de recuperação de senha será implementada.');
});

