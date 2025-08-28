// JavaScript para o Dashboard do Administrador
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do dashboard
    initializeDashboard();
    
    // Event listeners para navegação
    setupNavigationListeners();
    
    // Event listeners para ações do dashboard
    setupDashboardActions();
    
    // Inicializar gráficos
    initializeCharts();
});

function initializeDashboard() {
    // Atualizar informações do usuário
    updateUserInfo();
    
    // Carregar dados do dashboard
    loadDashboardData();
    
    // Configurar notificações
    setupNotifications();
}

function setupNavigationListeners() {
    // Navegação do menu lateral
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                navigation.navigateTo(href);
            }
        });
    });
    
    // Logout
    const logoutLink = document.querySelector('.logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigation.confirmAction('Deseja realmente sair do sistema?', () => {
                navigation.navigateTo('prototipo_login.html');
            });
        });
    }
}

function setupDashboardActions() {
    // Ações dos botões de gestão rápida
    setupQuickManagementActions();
    
    // Ações dos filtros de tempo
    setupTimeFilters();
    
    // Ações dos alertas
    setupAlertActions();
}

function setupQuickManagementActions() {
    // Botões de gestão rápida
    const managementButtons = document.querySelectorAll('.management-action');
    managementButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleManagementAction(action);
        });
    });
}

function setupTimeFilters() {
    // Filtros de tempo para gráficos
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const period = this.textContent.trim();
            updateChartData(period);
        });
    });
}

function setupAlertActions() {
    // Ações dos alertas
    const alertItems = document.querySelectorAll('.alert-item');
    alertItems.forEach(alert => {
        alert.addEventListener('click', function() {
            const alertType = this.getAttribute('data-alert-type');
            handleAlertAction(alertType);
        });
    });
}

function updateUserInfo() {
    // Simular dados do administrador logado
    const userInfo = {
        nome: 'Ana Santos',
        cargo: 'Administrador do Sistema',
        avatar: 'AS'
    };
    
    // Atualizar elementos na página
    const profileName = document.querySelector('.profile-info h3');
    if (profileName) profileName.textContent = userInfo.nome;
    
    const profileRole = document.querySelector('.profile-info p');
    if (profileRole) profileRole.textContent = userInfo.cargo;
    
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) profileAvatar.textContent = userInfo.avatar;
}

function loadDashboardData() {
    // Simular carregamento de dados do dashboard
    const dashboardData = {
        pacientesAtivos: 1547,
        profissionais: 203,
        ocupacaoLeitos: 75,
        consultasHoje: 89,
        novosUsuarios: 12,
        agendamentosPendentes: 8,
        alertasCriticos: 2
    };
    
    // Atualizar métricas
    updateMetrics(dashboardData);
    
    // Carregar alertas
    loadAlerts();
}

function updateMetrics(data) {
    // Atualizar números das métricas
    const metricElements = {
        'pacientes-ativos': data.pacientesAtivos,
        'profissionais': data.profissionais,
        'ocupacao-leitos': data.ocupacaoLeitos + '%',
        'consultas-hoje': data.consultasHoje
    };
    
    Object.keys(metricElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = metricElements[id];
        }
    });
    
    // Atualizar métricas nos cards de gestão
    updateManagementMetrics(data);
}

function updateManagementMetrics(data) {
    // Atualizar contadores nos cards de gestão rápida
    const managementMetrics = {
        'novos-usuarios-count': data.novosUsuarios,
        'agendamentos-pendentes-count': data.agendamentosPendentes,
        'alertas-criticos-count': data.alertasCriticos
    };
    
    Object.keys(managementMetrics).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = managementMetrics[id];
        }
    });
}

function loadAlerts() {
    // Simular carregamento de alertas
    const alerts = [
        {
            type: 'critical',
            title: 'Servidor de Banco de Dados Offline',
            message: 'Ação Imediata Necessária: Verificar logs e reiniciar serviço.',
            action: 'sistema'
        },
        {
            type: 'warning',
            title: '5 Novos Cadastros de Profissionais',
            message: 'Revisar e aprovar novos profissionais pendentes.',
            action: 'usuarios'
        },
        {
            type: 'info',
            title: 'Atualização de Segurança Disponível',
            message: 'Recomendado aplicar a atualização o mais breve possível.',
            action: 'sistema'
        }
    ];
    
    renderAlerts(alerts);
}

function renderAlerts(alerts) {
    const alertsContainer = document.querySelector('.alerts-section');
    if (!alertsContainer) return;
    
    // Limpar alertas existentes (exceto o título)
    const existingAlerts = alertsContainer.querySelectorAll('.alert-item');
    existingAlerts.forEach(alert => alert.remove());
    
    // Adicionar novos alertas
    alerts.forEach(alert => {
        const alertElement = createAlertElement(alert);
        alertsContainer.appendChild(alertElement);
    });
}

function createAlertElement(alert) {
    const div = document.createElement('div');
    div.className = `alert-item ${alert.type}`;
    div.setAttribute('data-alert-type', alert.action);
    
    const iconMap = {
        'critical': 'fas fa-exclamation-triangle',
        'warning': 'fas fa-user-plus',
        'info': 'fas fa-info-circle'
    };
    
    div.innerHTML = `
        <div class="alert-icon">
            <i class="${iconMap[alert.type]}"></i>
        </div>
        <div class="alert-content">
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
        </div>
    `;
    
    return div;
}

function handleManagementAction(action) {
    const actionMap = {
        'usuarios': 'administrador_usuarios.html',
        'consultas': 'administrador_consultas.html',
        'financeiro': 'administrador_financeiro.html',
        'sistema': 'administrador_sistema.html',
        'relatorios': 'administrador_relatorios.html'
    };
    
    if (actionMap[action]) {
        navigation.navigateTo(actionMap[action]);
    }
}

function handleAlertAction(alertType) {
    const alertActionMap = {
        'sistema': 'administrador_sistema.html',
        'usuarios': 'administrador_usuarios.html',
        'consultas': 'administrador_consultas.html'
    };
    
    if (alertActionMap[alertType]) {
        navigation.navigateTo(alertActionMap[alertType]);
    }
}

function initializeCharts() {
    // Inicializar gráfico de consultas
    const ctx = document.getElementById('consultasChart');
    if (ctx) {
        createConsultasChart(ctx);
    }
}

function createConsultasChart(ctx) {
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                label: 'Consultas',
                data: [120, 150, 180, 200],
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: 'rgba(124, 58, 237, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Armazenar referência do gráfico para atualizações
    window.consultasChart = chart;
}

function updateChartData(period) {
    if (!window.consultasChart) return;
    
    let data = [];
    let labels = [];
    
    switch(period) {
        case '7 dias':
            data = [12, 15, 18, 22, 19, 25, 28];
            labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
            break;
        case '30 dias':
            data = [120, 150, 180, 200];
            labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
            break;
        case '90 dias':
            data = [450, 520, 480, 600, 550, 680, 720, 650, 750, 800, 780, 850];
            labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            break;
        default:
            return;
    }
    
    window.consultasChart.data.labels = labels;
    window.consultasChart.data.datasets[0].data = data;
    window.consultasChart.update();
    
    navigation.showNotification(`Gráfico atualizado para período: ${period}`, 'info');
}

function setupNotifications() {
    // Verificar notificações pendentes
    checkPendingNotifications();
    
    // Configurar verificação periódica
    setInterval(checkPendingNotifications, 60000); // A cada 1 minuto
}

function checkPendingNotifications() {
    // Simular verificação de notificações críticas
    const criticalAlerts = document.querySelectorAll('.alert-item.critical');
    if (criticalAlerts.length > 0) {
        navigation.showNotification(`${criticalAlerts.length} alerta(s) crítico(s) requer(em) atenção`, 'warning');
    }
}

// Funções específicas para ações do dashboard
function gerenciarUsuarios() {
    navigation.navigateTo('administrador_usuarios.html');
}

function gerenciarConsultas() {
    navigation.navigateTo('administrador_consultas.html');
}

function verFinanceiro() {
    navigation.navigateTo('administrador_financeiro.html');
}

function verRelatorios() {
    navigation.navigateTo('administrador_relatorios.html');
}

function configurarSistema() {
    navigation.navigateTo('administrador_sistema.html');
}

function gerenciarPerfil() {
    navigation.navigateTo('administrador_perfil.html');
}

function aprovarUsuarios() {
    navigation.navigateTo('administrador_usuarios.html?filter=pendentes');
}

function revisarAgendamentos() {
    navigation.navigateTo('administrador_consultas.html?filter=pendentes');
}

function verificarAlertas() {
    navigation.navigateTo('administrador_sistema.html#alertas');
}

// Exportar funções para uso global
window.dashboardAdministrador = {
    gerenciarUsuarios,
    gerenciarConsultas,
    verFinanceiro,
    verRelatorios,
    configurarSistema,
    gerenciarPerfil,
    aprovarUsuarios,
    revisarAgendamentos,
    verificarAlertas,
    updateChartData
};

