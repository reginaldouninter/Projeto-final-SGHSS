// JavaScript para o Dashboard do Profissional
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do dashboard
    initializeDashboard();
    
    // Event listeners para navegação
    setupNavigationListeners();
    
    // Event listeners para ações do dashboard
    setupDashboardActions();
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
    // Ações dos cards de consultas
    setupConsultaActions();
    
    // Ações dos botões de acesso rápido
    setupQuickActions();
    
    // Ações dos filtros
    setupFilters();
}

function setupConsultaActions() {
    // Botões "Ver Detalhes" nas consultas
    document.querySelectorAll('.btn-ver-detalhes').forEach(btn => {
        btn.addEventListener('click', function() {
            const consultaId = this.getAttribute('data-consulta-id');
            verDetalhesConsulta(consultaId);
        });
    });
    
    // Botões "Iniciar Consulta"
    document.querySelectorAll('.btn-iniciar-consulta').forEach(btn => {
        btn.addEventListener('click', function() {
            const consultaId = this.getAttribute('data-consulta-id');
            iniciarConsulta(consultaId);
        });
    });
    
    // Botões "Remarcar"
    document.querySelectorAll('.btn-remarcar').forEach(btn => {
        btn.addEventListener('click', function() {
            const consultaId = this.getAttribute('data-consulta-id');
            remarcarConsulta(consultaId);
        });
    });
}

function setupQuickActions() {
    // Botão Nova Consulta
    const btnNovaConsulta = document.getElementById('btnNovaConsulta');
    if (btnNovaConsulta) {
        btnNovaConsulta.addEventListener('click', () => {
            navigation.navigateTo('profissional_agenda.html');
        });
    }
    
    // Botão Ver Agenda
    const btnVerAgenda = document.getElementById('btnVerAgenda');
    if (btnVerAgenda) {
        btnVerAgenda.addEventListener('click', () => {
            navigation.navigateTo('profissional_agenda.html');
        });
    }
    
    // Botão Pacientes
    const btnPacientes = document.getElementById('btnPacientes');
    if (btnPacientes) {
        btnPacientes.addEventListener('click', () => {
            navigation.navigateTo('profissional_pacientes.html');
        });
    }
    
    // Botão Prescrições
    const btnPrescricoes = document.getElementById('btnPrescricoes');
    if (btnPrescricoes) {
        btnPrescricoes.addEventListener('click', () => {
            navigation.navigateTo('profissional_prescricoes.html');
        });
    }
}

function setupFilters() {
    // Filtro de período
    const periodFilter = document.getElementById('periodFilter');
    if (periodFilter) {
        periodFilter.addEventListener('change', function() {
            const period = this.value;
            filterByPeriod(period);
        });
    }
    
    // Filtro de status
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            filterByStatus(status);
        });
    }
}

function updateUserInfo() {
    // Simular dados do profissional logado
    const userInfo = {
        nome: 'Dr. João Silva',
        especialidade: 'Cardiologista',
        crm: 'CRM/SP 123456',
        avatar: 'JS'
    };
    
    // Atualizar elementos na página
    const profileName = document.querySelector('.profile-info h3');
    if (profileName) profileName.textContent = userInfo.nome;
    
    const profileRole = document.querySelector('.profile-info p');
    if (profileRole) profileRole.textContent = userInfo.especialidade;
    
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) profileAvatar.textContent = userInfo.avatar;
}

function loadDashboardData() {
    // Simular carregamento de dados do dashboard
    const dashboardData = {
        consultasHoje: 8,
        proximasConsultas: 12,
        pacientesAtivos: 156,
        prescricoesPendentes: 3
    };
    
    // Atualizar métricas
    updateMetrics(dashboardData);
    
    // Carregar consultas do dia
    loadConsultasHoje();
    
    // Carregar próximas consultas
    loadProximasConsultas();
}

function updateMetrics(data) {
    const metrics = [
        { id: 'consultasHoje', value: data.consultasHoje },
        { id: 'proximasConsultas', value: data.proximasConsultas },
        { id: 'pacientesAtivos', value: data.pacientesAtivos },
        { id: 'prescricoesPendentes', value: data.prescricoesPendentes }
    ];
    
    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (element) {
            element.textContent = metric.value;
        }
    });
}

function loadConsultasHoje() {
    // Simular dados de consultas de hoje
    const consultas = [
        {
            id: 1,
            paciente: 'Maria Santos',
            horario: '09:00',
            tipo: 'Consulta de Rotina',
            status: 'agendada'
        },
        {
            id: 2,
            paciente: 'João Oliveira',
            horario: '10:30',
            tipo: 'Retorno',
            status: 'em-andamento'
        },
        {
            id: 3,
            paciente: 'Ana Costa',
            horario: '14:00',
            tipo: 'Primeira Consulta',
            status: 'agendada'
        }
    ];
    
    renderConsultas(consultas, 'consultasHojeContainer');
}

function loadProximasConsultas() {
    // Simular dados de próximas consultas
    const consultas = [
        {
            id: 4,
            paciente: 'Carlos Lima',
            data: '16/07/2025',
            horario: '09:00',
            tipo: 'Teleconsulta'
        },
        {
            id: 5,
            paciente: 'Fernanda Silva',
            data: '16/07/2025',
            horario: '11:00',
            tipo: 'Consulta de Rotina'
        }
    ];
    
    renderProximasConsultas(consultas, 'proximasConsultasContainer');
}

function renderConsultas(consultas, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    consultas.forEach(consulta => {
        const consultaElement = createConsultaElement(consulta);
        container.appendChild(consultaElement);
    });
}

function renderProximasConsultas(consultas, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    consultas.forEach(consulta => {
        const consultaElement = createProximaConsultaElement(consulta);
        container.appendChild(consultaElement);
    });
}

function createConsultaElement(consulta) {
    const div = document.createElement('div');
    div.className = 'consulta-item';
    div.innerHTML = `
        <div class="consulta-info">
            <h4>${consulta.paciente}</h4>
            <p>${consulta.horario} - ${consulta.tipo}</p>
            <span class="status ${consulta.status}">${getStatusText(consulta.status)}</span>
        </div>
        <div class="consulta-actions">
            <button class="btn btn-primary btn-ver-detalhes" data-consulta-id="${consulta.id}">
                Ver Detalhes
            </button>
            ${consulta.status === 'agendada' ? 
                `<button class="btn btn-success btn-iniciar-consulta" data-consulta-id="${consulta.id}">
                    Iniciar
                </button>` : ''
            }
        </div>
    `;
    return div;
}

function createProximaConsultaElement(consulta) {
    const div = document.createElement('div');
    div.className = 'consulta-item';
    div.innerHTML = `
        <div class="consulta-info">
            <h4>${consulta.paciente}</h4>
            <p>${consulta.data} às ${consulta.horario}</p>
            <span class="tipo">${consulta.tipo}</span>
        </div>
        <div class="consulta-actions">
            <button class="btn btn-secondary btn-ver-detalhes" data-consulta-id="${consulta.id}">
                Ver Detalhes
            </button>
            <button class="btn btn-warning btn-remarcar" data-consulta-id="${consulta.id}">
                Remarcar
            </button>
        </div>
    `;
    return div;
}

function getStatusText(status) {
    const statusMap = {
        'agendada': 'Agendada',
        'em-andamento': 'Em Andamento',
        'concluida': 'Concluída',
        'cancelada': 'Cancelada'
    };
    return statusMap[status] || status;
}

function verDetalhesConsulta(consultaId) {
    navigation.navigateTo(`profissional_detalhes_consulta.html?id=${consultaId}`);
}

function iniciarConsulta(consultaId) {
    navigation.confirmAction('Iniciar consulta agora?', () => {
        navigation.navigateTo(`prototipo_telemedicina.html?consulta=${consultaId}`);
    });
}

function remarcarConsulta(consultaId) {
    navigation.confirmAction('Deseja remarcar esta consulta?', () => {
        navigation.showNotification('Consulta remarcada com sucesso!', 'success');
        // Recarregar dados
        loadDashboardData();
    });
}

function filterByPeriod(period) {
    navigation.showNotification(`Filtrando por período: ${period}`, 'info');
    // Implementar lógica de filtro
}

function filterByStatus(status) {
    navigation.showNotification(`Filtrando por status: ${status}`, 'info');
    // Implementar lógica de filtro
}

function setupNotifications() {
    // Verificar notificações pendentes
    checkPendingNotifications();
    
    // Configurar verificação periódica
    setInterval(checkPendingNotifications, 30000); // A cada 30 segundos
}

function checkPendingNotifications() {
    // Simular verificação de notificações
    const notifications = [
        {
            type: 'info',
            message: 'Nova consulta agendada para amanhã às 10:00'
        }
    ];
    
    notifications.forEach(notification => {
        navigation.showNotification(notification.message, notification.type);
    });
}

// Funções específicas para ações do dashboard
function novaConsulta() {
    navigation.navigateTo('profissional_agenda.html');
}

function verAgenda() {
    navigation.navigateTo('profissional_agenda.html');
}

function gerenciarPacientes() {
    navigation.navigateTo('profissional_pacientes.html');
}

function criarPrescricao() {
    navigation.navigateTo('profissional_prescricoes.html');
}

function verRelatorios() {
    navigation.navigateTo('profissional_relatorios.html');
}

function configurarPerfil() {
    navigation.navigateTo('profissional_perfil.html');
}

// Exportar funções para uso global
window.dashboardProfissional = {
    novaConsulta,
    verAgenda,
    gerenciarPacientes,
    criarPrescricao,
    verRelatorios,
    configurarPerfil,
    verDetalhesConsulta,
    iniciarConsulta,
    remarcarConsulta
};

