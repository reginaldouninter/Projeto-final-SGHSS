// Sistema de Navegação Global
class NavigationSystem {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.updateActiveNavItem();
    }

    getCurrentUser() {
        // Simula dados do usuário logado
        const userType = localStorage.getItem('userType') || 'paciente';
        const users = {
            paciente: {
                name: 'Maria Santos',
                type: 'Paciente',
                avatar: 'MS'
            },
            profissional: {
                name: 'Dr. João Silva',
                type: 'Médico Cardiologista',
                avatar: 'JS'
            },
            administrador: {
                name: 'Ana Costa',
                type: 'Administradora',
                avatar: 'AC'
            }
        };
        return users[userType];
    }

    setupNavigation() {
        // Adiciona event listeners para todos os links de navegação
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item') || e.target.closest('.nav-item')) {
                e.preventDefault();
                const link = e.target.matches('.nav-item') ? e.target : e.target.closest('.nav-item');
                const href = link.getAttribute('href');
                
                if (href && href !== '#') {
                    this.navigateTo(href);
                }
            }
        });

        // Logout functionality
        const logoutLinks = document.querySelectorAll('.logout-link');
        logoutLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }
    }

    updateActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.includes(currentPage)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    navigateTo(url) {
        // Adiciona efeito de transição
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    }

    logout() {
        if (confirm('Tem certeza que deseja sair do sistema?')) {
            localStorage.removeItem('userType');
            this.navigateTo('prototipo_login.html');
        }
    }

    // Função para mostrar notificações
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove após 5 segundos
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Remove ao clicar no X
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Função para confirmar ações
    confirmAction(message, callback) {
        if (confirm(message)) {
            callback();
        }
    }
}

// Inicializa o sistema de navegação quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new NavigationSystem();
});

// Funções utilitárias globais
window.utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    },
    
    formatTime: (time) => {
        return new Date(`2000-01-01 ${time}`).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    showLoading: () => {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Carregando...</p>
            </div>
        `;
        document.body.appendChild(loading);
        return loading;
    },
    
    hideLoading: (loadingElement) => {
        if (loadingElement) {
            loadingElement.remove();
        }
    }
};

// Estilos para notificações e loading
const styles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease;
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

.notification-info {
    border-left: 4px solid #2563EB;
}

.notification-success {
    border-left: 4px solid #10B981;
}

.notification-warning {
    border-left: 4px solid #F59E0B;
}

.notification-danger {
    border-left: 4px solid #EF4444;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.loading-spinner {
    background: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #E5E7EB;
    border-top: 4px solid #2563EB;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);

