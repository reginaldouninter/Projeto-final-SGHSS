// Dashboard do Paciente - Funcionalidades Completas
document.addEventListener('DOMContentLoaded', function() {
    // Simula dados do usuário
    const userData = {
        name: 'Maria Santos',
        nextAppointment: {
            date: '15/07/2025',
            time: '14:30',
            doctor: 'Dr. João Silva',
            specialty: 'Cardiologia'
        },
        pendingExams: 2,
        notifications: 3
    };

    // Inicializa funcionalidades
    setupNavigation();
    setupCardActions();
    setupMobileMenu();
});

function setupNavigation() {
    // Navegação do menu lateral
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active de todos os itens
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            
            // Adiciona active ao item clicado
            this.classList.add('active');
            
            // Navega para a página correspondente
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                if (href.includes('logout') || this.classList.contains('logout-link')) {
                    handleLogout();
                } else {
                    window.location.href = href;
                }
            }
        });
    });
}

function setupCardActions() {
    // Ações dos cards do dashboard
    document.querySelectorAll('.card-action, .action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            
            // Roteamento baseado no texto do botão
            if (buttonText.includes('Agendar Nova Consulta') || buttonText.includes('Agendar Consulta')) {
                window.location.href = 'prototipo_agendamento.html';
            } else if (buttonText.includes('Iniciar Teleconsulta') || buttonText.includes('Teleconsulta')) {
                window.location.href = 'prototipo_telemedicina.html';
            } else if (buttonText.includes('Ver Detalhes') && buttonText.includes('Consulta')) {
                window.location.href = 'paciente_consulta_detalhes.html?id=1';
            } else if (buttonText.includes('Ver Todos') && buttonText.includes('Exames')) {
                window.location.href = 'paciente_exames.html';
            } else if (buttonText.includes('Ver Todas') && buttonText.includes('Notificações')) {
                window.location.href = 'paciente_notificacoes.html';
            } else if (buttonText.includes('Histórico Médico') || buttonText.includes('Visualizar Histórico')) {
                window.location.href = 'paciente_historico_medico.html';
            } else if (buttonText.includes('Prontuário')) {
                window.location.href = 'paciente_prontuario.html';
            } else {
                // Ação genérica para outros botões
                showNotification('Navegando para: ' + buttonText, 'info');
            }
        });
    });
}

function setupMobileMenu() {
    // Responsividade do menu
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.page-header, .header');
        if (header && !document.querySelector('.menu-toggle')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'menu-toggle';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.style.cssText = `
                background: none; 
                border: none; 
                font-size: 20px; 
                cursor: pointer; 
                color: #2563EB;
                padding: 10px;
                border-radius: 8px;
                transition: background 0.3s ease;
            `;
            menuBtn.onclick = toggleSidebar;
            header.insertBefore(menuBtn, header.firstChild);
        }
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

function handleLogout() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        showNotification('Saindo do sistema...', 'info');
        setTimeout(() => {
            localStorage.removeItem('userType');
            window.location.href = 'prototipo_login.html';
        }, 1500);
    }
}

// Funções específicas para ações do dashboard
function verDetalhesConsulta(id = 1) {
    window.location.href = `paciente_consulta_detalhes.html?id=${id}`;
}

function verExamesPendentes() {
    window.location.href = 'paciente_exames.html';
}

function verNotificacoes() {
    window.location.href = 'paciente_notificacoes.html';
}

function verHistoricoMedico() {
    window.location.href = 'paciente_historico_medico.html';
}

function agendarNovaConsulta() {
    window.location.href = 'prototipo_agendamento.html';
}

function iniciarTeleconsulta() {
    window.location.href = 'prototipo_telemedicina.html';
}

function acessarProntuario() {
    window.location.href = 'paciente_prontuario.html';
}

function verTodosExames() {
    window.location.href = 'paciente_exames.html';
}

function verTodasNotificacoes() {
    window.location.href = 'paciente_notificacoes.html';
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Adiciona estilos se não existirem
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                min-width: 300px;
            }
            .notification-content {
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #6B7280;
            }
            .notification-info { border-left: 4px solid #2563EB; }
            .notification-success { border-left: 4px solid #10B981; }
            .notification-warning { border-left: 4px solid #F59E0B; }
            .notification-danger { border-left: 4px solid #EF4444; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Inicialização quando a página carrega
window.addEventListener('load', function() {
    // Marca o item ativo no menu baseado na URL atual
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        }
    });
});

