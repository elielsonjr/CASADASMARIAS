/* ==========================================================================
   MARIAS PRIVÉE - MAIN CONTROLLER & APPLICATION ENGINE
   ========================================================================== */

// --- 1. Database Persistence Layer (LocalStorage CRUD) ---
const LOCAL_STORAGE_KEY = 'marias_privee_companions';

const DEFAULT_COMPANIONS = [
    {
        id: 'sophia-1',
        name: 'Sophia Smith',
        age: 23,
        height: 1.68,
        weight: 54,
        hair: 'Loiro',
        eyes: 'Verdes',
        rateHour: 450,
        rateNight: 1800,
        whatsapp: '5511999998888',
        badge: 'VIP',
        availability: 'disponivel',
        image: 'assets/model_sophia.png',
        services: ['Jantar de Negócios', 'Viagens Nacionais/Internacionais', 'Massagem Terapêutica', 'Festas Privadas', 'Companhia Executiva'],
        description: 'Sophia é formada em Relações Públicas, fala inglês fluente e possui uma presença extremamente refinada. Ideal para acompanhá-lo em jantares de gala, eventos corporativos ou uma noite de conversa inteligente com excelente vinho. Seu charme e sofisticação tornam qualquer ocasião memorável.'
    },
    {
        id: 'valentina-2',
        name: 'Valentina Rossi',
        age: 25,
        height: 1.72,
        weight: 58,
        hair: 'Morena',
        eyes: 'Castanhos',
        rateHour: 400,
        rateNight: 1600,
        whatsapp: '5511999998888',
        badge: 'Destaque',
        availability: 'disponivel',
        image: 'assets/model_valentina.png',
        services: ['Alta Gastronomia', 'Eventos Sociais', 'Fetiche Básico', 'Dança Privada', 'Massagem Relaxante'],
        description: 'Valentina é uma mulher de traços marcantes e sorriso contagiante. Apaixonada por gastronomia e vinhos finos, ela é a companhia perfeita para quem busca tanto elegância social quanto momentos intensos de cumplicidade e descontração. Extremamente carismática e atenta aos detalhes.'
    },
    {
        id: 'gabriela-3',
        name: 'Gabriela Vasconcelos',
        age: 22,
        height: 1.65,
        weight: 52,
        hair: 'Ruivo',
        eyes: 'Azuis',
        rateHour: 500,
        rateNight: 2000,
        whatsapp: '5511999998888',
        badge: 'Novidade',
        availability: 'disponivel',
        image: 'assets/model_gabriela.png',
        services: ['Encontros Reservados', 'Viagem de Fim de Semana', 'Sessão de Fotos Privada', 'Massagem Tântrica', 'Conversa Intelectual'],
        description: 'Gabriela é estudante de Letras, apaixonada por literatura, arte e filosofia. Ela possui um olhar enigmático e uma personalidade magnética e misteriosa. Excelente ouvinte, sua delicadeza e sensualidade discreta criam um ambiente altamente confortável e inesquecível para homens exigentes.'
    },
    {
        id: 'isabella-4',
        name: 'Isabella Mendes',
        age: 26,
        height: 1.70,
        weight: 60,
        hair: 'Preto',
        eyes: 'Castanhos',
        rateHour: 420,
        rateNight: 1700,
        whatsapp: '5511999998888',
        badge: '',
        availability: 'ocupada',
        image: 'assets/model_isabella.png',
        services: ['Acompanhamento de Viagem', 'Clube/Festas VIP', 'Massagem Desportiva', 'Esportes de Aventura', 'Jantar Romântico'],
        description: 'Isabella é personal trainer, mantém uma rotina de bem-estar ativa e tem uma energia contagiante. Ela é extrovertida, atlética e ama noites de agito nos melhores clubes da cidade. Se você procura uma companhia dinâmica, alegre e com curvas perfeitas para momentos intensos de prazer.'
    }
];

const DataService = {
    init() {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!data) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_COMPANIONS));
            return DEFAULT_COMPANIONS;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Error reading storage, resetting...", e);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_COMPANIONS));
            return DEFAULT_COMPANIONS;
        }
    },
    getAll() {
        return this.init();
    },
    getById(id) {
        const list = this.getAll();
        return list.find(g => g.id === id) || null;
    },
    saveAll(list) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    },
    add(companion) {
        const list = this.getAll();
        const newCompanion = {
            ...companion,
            id: companion.id || 'girl-' + Date.now()
        };
        list.push(newCompanion);
        this.saveAll(list);
        return newCompanion;
    },
    update(id, updatedFields) {
        const list = this.getAll();
        const index = list.findIndex(g => g.id === id);
        if (index === -1) return null;
        list[index] = {
            ...list[index],
            ...updatedFields,
            id
        };
        this.saveAll(list);
        return list[index];
    },
    delete(id) {
        const list = this.getAll();
        const filtered = list.filter(g => g.id !== id);
        if (filtered.length === list.length) return false;
        this.saveAll(filtered);
        return true;
    },
    toggleAvailability(id) {
        const companion = this.getById(id);
        if (!companion) return null;
        const newAvailability = companion.availability === 'disponivel' ? 'ocupada' : 'disponivel';
        this.update(id, { availability: newAvailability });
        return newAvailability;
    },
    reset() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_COMPANIONS));
        return DEFAULT_COMPANIONS;
    }
};

// --- 2. Dynamic Components Rendering Templates ---

// 2.1 Lounge Showcase Section
const LoungeSection = {
    render(containerElement) {
        if (!containerElement) return;
        containerElement.innerHTML = `
            <div class="section-header" id="lounge">
                <h2 class="section-title">O Ambiente</h2>
                <div class="title-underline"></div>
                <p class="section-subtitle">Conheça nosso lounge luxuoso, projetado sob medida para garantir momentos inesquecíveis com privacidade e requinte.</p>
            </div>
            <div class="lounge-grid">
                <div class="lounge-img-wrapper">
                    <img src="assets/lounge_bg.png" alt="Casa das Marias Lounge" class="lounge-img" loading="lazy">
                </div>
                <div class="lounge-details">
                    <h3>Exclusividade & Conforto</h3>
                    <p>Na Casa das Marias, cada detalhe foi cuidadosamente planejado para oferecer uma experiência sensorial incomparável. Nosso lounge conta com iluminação indireta sofisticada, sofás de veludo confortáveis e uma seleção de bebidas importadas da mais alta qualidade.</p>
                    <p>Valorizamos a privacidade acima de tudo. Por isso, oferecemos uma entrada reservada de acesso discreto e segurança qualificada no local, permitindo que você relaxe e desfrute com total paz de espírito.</p>
                    <div class="lounge-features">
                        <div class="feature-item">
                            <div class="feature-icon-box"><i class="fa-solid fa-user-secret"></i></div>
                            <div class="feature-text">
                                <h4>Sigilo Absoluto</h4>
                                <p>Acesso e estacionamento privativos para sua total discrição.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon-box"><i class="fa-solid fa-martini-glass-citrus"></i></div>
                            <div class="feature-text">
                                <h4>Bar de Elite</h4>
                                <p>Drinks finos, champagne e destilados premium selecionados.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon-box"><i class="fa-solid fa-hotel"></i></div>
                            <div class="feature-text">
                                <h4>Suítes VIP</h4>
                                <p>Quartos climatizados com hidromassagem e som ambiente.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon-box"><i class="fa-solid fa-shield-halved"></i></div>
                            <div class="feature-text">
                                <h4>Segurança</h4>
                                <p>Sistema de monitoramento e equipe treinada para sua tranquilidade.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// 2.2 Companion Portfolio Grid Card
const GirlCard = {
    html(girl) {
        let badgeHtml = '<span class="badge badge-verified"><i class="fa-solid fa-circle-check"></i> Verificada</span>';
        if (girl.badge) {
            let badgeClass = 'badge-standard';
            if (girl.badge.toUpperCase() === 'VIP') badgeClass = 'badge-gold';
            else if (girl.badge.toUpperCase() === 'NOVIDADE') badgeClass = 'badge-magenta';
            badgeHtml += `<span class="badge ${badgeClass}">${girl.badge}</span>`;
        }

        const isAvailable = girl.availability === 'disponivel';
        const statusHtml = isAvailable 
            ? `<div class="status-dot-badge"><span class="dot-green"></span> Disponível</div>`
            : `<div class="status-dot-badge"><span class="dot-red"></span> Ocupada</div>`;

        const formattedRate = girl.rateHour.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

        return `
            <div class="girl-card" data-id="${girl.id}">
                <div class="girl-card-img-wrapper">
                    <img src="${girl.image || 'assets/model_sophia.png'}" alt="${girl.name}" class="girl-card-img" loading="lazy">
                    <div class="girl-card-overlay"></div>
                    <div class="card-badges">${badgeHtml}</div>
                    <div class="card-status">${statusHtml}</div>
                </div>
                <div class="girl-card-content">
                    <h3 class="girl-card-name">${girl.name}</h3>
                    <div class="girl-card-location"><i class="fa-solid fa-location-dot"></i> Petrolina - PE</div>
                    <div class="girl-card-specs">
                        <span>${girl.age} anos</span>
                        <span>${girl.height.toFixed(2)}m</span>
                        <span>${girl.weight}kg</span>
                    </div>
                    <p class="girl-card-bio">${girl.description}</p>
                    <div class="girl-card-footer">
                        <div class="girl-card-rate">
                            <span class="rate-label">Cachê / Hora</span>
                            ${formattedRate}
                        </div>
                        <button class="girl-card-btn view-profile-btn" data-id="${girl.id}">
                            Ver Perfil <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

// 2.3 Profile Details Modal Panel
const ProfileModal = {
    html(girl) {
        const servicesHtml = girl.services.map(service => 
            `<span class="service-tag">${service.trim()}</span>`
        ).join('');

        const isAvailable = girl.availability === 'disponivel';
        const availabilityBadgeHtml = isAvailable
            ? `<div class="status-dot-badge"><span class="dot-green"></span> Disponível</div>`
            : `<div class="status-dot-badge"><span class="dot-red"></span> Ocupada / Reservada</div>`;

        const formattedHourRate = girl.rateHour.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
        const formattedNightRate = girl.rateNight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

        const whatsappText = `Olá! Vi o perfil de ${girl.name} no site da Casa das Marias e gostaria de consultar a disponibilidade para agendamento.`;
        const encodedText = encodeURIComponent(whatsappText);
        const cleanedPhone = girl.whatsapp.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodedText}`;

        return `
            <div class="profile-detail-grid">
                <div class="profile-detail-img-wrapper">
                    <img src="${girl.image || 'assets/model_sophia.png'}" alt="${girl.name}" class="profile-detail-img">
                </div>
                <div class="profile-detail-info">
                    <div class="profile-detail-header">
                        <div class="profile-detail-header-left">
                            <h3>${girl.name}</h3>
                            <div class="girl-card-location" style="margin-bottom: 0;"><i class="fa-solid fa-location-dot"></i> Petrolina - PE</div>
                            <div class="profile-tags" style="margin-top: 8px;">
                                <span class="badge badge-verified"><i class="fa-solid fa-circle-check"></i> Perfil Verificado</span>
                                ${girl.badge ? `<span class="badge ${girl.badge.toUpperCase() === 'VIP' ? 'badge-gold' : 'badge-magenta'}">${girl.badge}</span>` : ''}
                            </div>
                        </div>
                        <div class="profile-detail-header-right">
                            ${availabilityBadgeHtml}
                        </div>
                    </div>
                    <div class="profile-detail-specs">
                        <div class="spec-box">
                            <span>Idade</span>
                            <p>${girl.age} anos</p>
                        </div>
                        <div class="spec-box">
                            <span>Altura</span>
                            <p>${girl.height.toFixed(2)}m</p>
                        </div>
                        <div class="spec-box">
                            <span>Peso</span>
                            <p>${girl.weight}kg</p>
                        </div>
                        <div class="spec-box">
                            <span>Cabelo</span>
                            <p>${girl.hair}</p>
                        </div>
                        <div class="spec-box">
                            <span>Olhos</span>
                            <p>${girl.eyes}</p>
                        </div>
                        <div class="spec-box">
                            <span>Nacionalidade</span>
                            <p>Brasileira</p>
                        </div>
                    </div>
                    <div class="profile-bio">
                        <h4>Apresentação</h4>
                        <p>${girl.description}</p>
                    </div>
                    <div class="profile-services">
                        <h4>Serviços Disponíveis</h4>
                        <div class="services-list">
                            ${servicesHtml}
                        </div>
                    </div>
                    <div class="profile-rates">
                        <div class="rate-item">
                            <span>Cachê / Hora</span>
                            <p>${formattedHourRate} <span>/h</span></p>
                        </div>
                        <div class="rate-item">
                            <span>Cachê / Pernoite</span>
                            <p>${formattedNightRate} <span>/noite</span></p>
                        </div>
                    </div>
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-primary wa-booking-btn btn-glow">
                        <i class="fa-brands fa-whatsapp"></i> Agendar com ${girl.name.split(' ')[0]}
                    </a>
                </div>
            </div>
        `;
    }
};

// 2.4 Administrative Dashboard CRUD Panel
const AdminDashboard = {
    render(containerElement, companions) {
        if (!containerElement) return;

        const totalCount = companions.length;
        const availableCount = companions.filter(g => g.availability === 'disponivel').length;
        const busyCount = totalCount - availableCount;

        const rowsHtml = companions.map(girl => {
            const isAvailable = girl.availability === 'disponivel';
            const statusClass = isAvailable ? 'dot-green' : 'dot-red';
            const statusLabel = isAvailable ? 'Disponível' : 'Ocupada';
            
            const formattedHour = girl.rateHour.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
            const formattedNight = girl.rateNight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

            let badgeMarkup = '<span class="text-muted">—</span>';
            if (girl.badge) {
                const badgeClass = girl.badge.toUpperCase() === 'VIP' ? 'badge-gold' : 'badge-magenta';
                badgeMarkup = `<span class="badge ${badgeClass} badge-row">${girl.badge}</span>`;
            }

            return `
                <tr data-id="${girl.id}">
                    <td>
                        <div class="admin-table-model-info">
                            <img src="${girl.image || 'assets/model_sophia.png'}" alt="${girl.name}" class="admin-table-avatar">
                            <div>
                                <div class="admin-table-model-name">${girl.name}</div>
                                <div class="admin-table-model-sub">WhatsApp: +${girl.whatsapp}</div>
                            </div>
                        </div>
                    </td>
                    <td>${girl.age} anos</td>
                    <td>${girl.height.toFixed(2)}m / ${girl.weight}kg</td>
                    <td>${badgeMarkup}</td>
                    <td>
                        <div><strong>${formattedHour}</strong>/h</div>
                        <div class="admin-table-model-sub">${formattedNight}/noite</div>
                    </td>
                    <td>
                        <div class="status-indicator toggle-status-btn" data-id="${girl.id}">
                            <span class="${statusClass}"></span>
                            <span>${statusLabel}</span>
                        </div>
                    </td>
                    <td>
                        <div class="admin-actions">
                            <button class="admin-action-btn btn-edit edit-girl-btn" data-id="${girl.id}" title="Editar Perfil">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="admin-action-btn btn-delete delete-girl-btn" data-id="${girl.id}" title="Excluir Perfil">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        containerElement.innerHTML = `
            <div class="admin-view-header">
                <div>
                    <h2>Painel de Controle</h2>
                    <p class="section-subtitle" style="text-align: left; margin: 5px 0 0 0;">Gerencie o portfólio de acompanhantes e controle sua disponibilidade em tempo real.</p>
                </div>
                <div class="admin-header-actions">
                    <button class="btn btn-secondary reset-db-btn" id="admin-reset-btn">
                        <i class="fa-solid fa-arrow-rotate-left"></i> Resetar Padrão
                    </button>
                    <button class="btn btn-primary btn-glow" id="admin-add-btn">
                        <i class="fa-solid fa-plus"></i> Adicionar Modelo
                    </button>
                    <button class="btn btn-secondary" id="admin-back-btn">
                        <i class="fa-solid fa-house"></i> Voltar ao Site
                    </button>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="admin-stats-bar">
                <div class="glass-panel stat-card">
                    <div class="stat-card-icon"><i class="fa-solid fa-users"></i></div>
                    <div class="stat-card-info">
                        <span>Total de Modelos</span>
                        <h4>${totalCount}</h4>
                    </div>
                </div>
                <div class="glass-panel stat-card">
                    <div class="stat-card-icon"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="stat-card-info">
                        <span>Disponíveis</span>
                        <h4>${availableCount}</h4>
                    </div>
                </div>
                <div class="glass-panel stat-card">
                    <div class="stat-card-icon"><i class="fa-solid fa-circle-xmark"></i></div>
                    <div class="stat-card-info">
                        <span>Ocupadas / Reservadas</span>
                        <h4>${busyCount}</h4>
                    </div>
                </div>
            </div>

            <!-- Management Table -->
            <div class="glass-panel admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Idade</th>
                            <th>Físico</th>
                            <th>Selo Especial</th>
                            <th>Cachê</th>
                            <th>Status (Disponibilidade)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="admin-table-body">
                        ${rowsHtml || `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">Nenhuma acompanhante cadastrada. Clique em "Adicionar Modelo" para começar.</td></tr>`}
                    </tbody>
                </table>
            </div>
        `;
    }
};

// --- 3. App Core Event Loop Coordinators ---

let currentCompanions = [];
let activeFilter = 'all';
let searchQuery = '';

// DOM Cache Elements
let mainNav, menuToggle, companionsGrid, searchInput, filterTagsContainer;
let heroView, loungeView, portfolioView, adminView;
let profileModal, profileModalContent, profileModalClose;
let authModal, authPasswordInput, authSubmitBtn, authErrorMsg, authModalClose;
let adminFormModal, adminFormClose, companionForm, formCancelBtn, formModalTitle;

document.addEventListener('DOMContentLoaded', () => {
    // Cache Elements
    mainNav = document.getElementById('main-nav');
    menuToggle = document.getElementById('menu-toggle');
    companionsGrid = document.getElementById('companions-grid');
    searchInput = document.getElementById('search-input');
    filterTagsContainer = document.getElementById('filter-tags-container');

    heroView = document.getElementById('hero-view');
    loungeView = document.getElementById('lounge-view');
    portfolioView = document.getElementById('portfolio-view');
    adminView = document.getElementById('admin-view');

    profileModal = document.getElementById('profile-modal');
    profileModalContent = document.getElementById('profile-modal-content');
    profileModalClose = document.getElementById('profile-modal-close');

    authModal = document.getElementById('auth-modal');
    authPasswordInput = document.getElementById('auth-password');
    authSubmitBtn = document.getElementById('auth-submit-btn');
    authErrorMsg = document.getElementById('auth-error-msg');
    authModalClose = document.getElementById('auth-modal-close');

    adminFormModal = document.getElementById('admin-form-modal');
    adminFormClose = document.getElementById('admin-form-close');
    companionForm = document.getElementById('companion-form');
    formCancelBtn = document.getElementById('form-cancel-btn');
    formModalTitle = document.getElementById('form-modal-title');

    // Load Data
    currentCompanions = DataService.getAll();
    
    // Render Sections
    LoungeSection.render(loungeView);
    renderPortfolioGrid();
    
    // Setup Events
    setupEventListeners();
});

function renderPortfolioGrid() {
    if (!companionsGrid) return;
    
    let filtered = currentCompanions;
    
    if (activeFilter !== 'all') {
        filtered = filtered.filter(girl => {
            if (activeFilter === 'Loiras') return girl.hair.toLowerCase().includes('loiro');
            if (activeFilter === 'Morenas') return girl.hair.toLowerCase().includes('moren') || girl.hair.toLowerCase().includes('pret');
            if (activeFilter === 'Ruivas') return girl.hair.toLowerCase().includes('ruiv');
            if (activeFilter === 'VIP') return girl.badge && girl.badge.toUpperCase() === 'VIP';
            if (activeFilter === 'Novidade') return girl.badge && girl.badge.toUpperCase() === 'NOVIDADE';
            return true;
        });
    }
    
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(girl => girl.name.toLowerCase().includes(query));
    }
    
    if (filtered.length === 0) {
        companionsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 15px; color: rgba(255,255,255,0.1)"></i>
                <p>Nenhuma acompanhante encontrada correspondendo aos seus critérios.</p>
            </div>
        `;
        return;
    }
    
    companionsGrid.innerHTML = filtered.map(girl => GirlCard.html(girl)).join('');
}

function renderAdminDashboard() {
    if (!adminView) return;
    AdminDashboard.render(adminView, currentCompanions);
}

function switchView(view) {
    if (view === 'admin') {
        heroView.classList.add('hidden');
        loungeView.classList.add('hidden');
        portfolioView.classList.add('hidden');
        adminView.classList.remove('hidden');
        renderAdminDashboard();
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.getElementById('nav-admin-btn').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        adminView.classList.add('hidden');
        heroView.classList.remove('hidden');
        loungeView.classList.remove('hidden');
        portfolioView.classList.remove('hidden');
        renderPortfolioGrid();
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector('[data-target="home"]').classList.add('active');
    }
}

function setupEventListeners() {
    // Mobile Navigation Toggle
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('mobile-active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-active')) {
                mainNav.classList.remove('mobile-active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // Navigation Links Scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (!target) return;
            
            e.preventDefault();
            switchView('portfolio');

            if (target === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (target === 'lounge') {
                const element = document.getElementById('lounge-view');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else if (target === 'models') {
                const element = document.getElementById('portfolio-view');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Filtering inputs
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderPortfolioGrid();
        });
    }

    if (filterTagsContainer) {
        filterTagsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeFilter = btn.getAttribute('data-filter');
            renderPortfolioGrid();
        });
    }

    // Grid Open Modal Click
    if (companionsGrid) {
        companionsGrid.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('.view-profile-btn');
            const card = e.target.closest('.girl-card');
            
            if (card && !e.target.closest('.girl-card-btn')) {
                const girlId = card.getAttribute('data-id');
                openProfileDetails(girlId);
            } else if (viewBtn) {
                const girlId = viewBtn.getAttribute('data-id');
                openProfileDetails(girlId);
            }
        });
    }

    if (profileModalClose) {
        profileModalClose.addEventListener('click', () => {
            profileModal.classList.add('hidden');
        });
    }
    
    // Auth security trigger open
    const adminTriggers = document.querySelectorAll('.admin-trigger');
    adminTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            authPasswordInput.value = '';
            authErrorMsg.classList.add('hidden');
            authModal.classList.remove('hidden');
            authPasswordInput.focus();
        });
    });

    if (authModalClose) {
        authModalClose.addEventListener('click', () => {
            authModal.classList.add('hidden');
        });
    }

    if (authSubmitBtn) {
        authSubmitBtn.addEventListener('click', handleAuthentication);
    }
    if (authPasswordInput) {
        authPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAuthentication();
        });
    }

    // Modal Background Clicks Close
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) profileModal.classList.add('hidden');
        if (e.target === authModal) authModal.classList.add('hidden');
        if (e.target === adminFormModal) adminFormModal.classList.add('hidden');
    });

    // Admin Dashboard delegated clicks
    if (adminView) {
        adminView.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-girl-btn');
            if (editBtn) {
                openEditForm(editBtn.getAttribute('data-id'));
                return;
            }

            const deleteBtn = e.target.closest('.delete-girl-btn');
            if (deleteBtn) {
                handleDeleteCompanion(deleteBtn.getAttribute('data-id'));
                return;
            }

            const statusBtn = e.target.closest('.toggle-status-btn');
            if (statusBtn) {
                handleToggleStatus(statusBtn.getAttribute('data-id'));
                return;
            }

            const resetBtn = e.target.closest('.reset-db-btn');
            if (resetBtn) {
                handleResetDatabase();
                return;
            }

            const addBtn = e.target.closest('#admin-add-btn');
            if (addBtn) {
                openAddForm();
                return;
            }

            const backBtn = e.target.closest('#admin-back-btn');
            if (backBtn) {
                switchView('portfolio');
                return;
            }
        });
    }

    // Form buttons
    if (adminFormClose) {
        adminFormClose.addEventListener('click', () => {
            adminFormModal.classList.add('hidden');
        });
    }
    if (formCancelBtn) {
        formCancelBtn.addEventListener('click', () => {
            adminFormModal.classList.add('hidden');
        });
    }

    if (companionForm) {
        companionForm.addEventListener('submit', handleFormSubmit);
    }
}

// --- Action Implementations ---

function openProfileDetails(id) {
    const companion = DataService.getById(id);
    if (!companion) return;

    profileModalContent.innerHTML = ProfileModal.html(companion);
    profileModal.classList.remove('hidden');
}

function handleAuthentication() {
    const password = authPasswordInput.value;
    if (password === 'admin123') {
        authModal.classList.add('hidden');
        switchView('admin');
    } else {
        authErrorMsg.classList.remove('hidden');
        authPasswordInput.focus();
    }
}

function handleToggleStatus(id) {
    const newStatus = DataService.toggleAvailability(id);
    if (newStatus) {
        currentCompanions = DataService.getAll();
        renderAdminDashboard();
    }
}

function handleDeleteCompanion(id) {
    const companion = DataService.getById(id);
    if (!companion) return;

    if (confirm(`Deseja realmente excluir permanentemente o perfil de ${companion.name}?`)) {
        if (DataService.delete(id)) {
            currentCompanions = DataService.getAll();
            renderAdminDashboard();
        }
    }
}

function handleResetDatabase() {
    if (confirm("Isso irá apagar todas as modificações e restaurar os perfis originais. Continuar?")) {
        currentCompanions = DataService.reset();
        renderAdminDashboard();
    }
}

function openAddForm() {
    formModalTitle.textContent = "Adicionar Nova Modelo";
    document.getElementById('form-girl-id').value = '';
    companionForm.reset();
    adminFormModal.classList.remove('hidden');
    document.getElementById('form-name').focus();
}

function openEditForm(id) {
    const girl = DataService.getById(id);
    if (!girl) return;

    formModalTitle.textContent = `Editar Perfil de ${girl.name}`;
    document.getElementById('form-girl-id').value = girl.id;
    
    document.getElementById('form-name').value = girl.name;
    document.getElementById('form-age').value = girl.age;
    document.getElementById('form-height').value = girl.height;
    document.getElementById('form-weight').value = girl.weight;
    document.getElementById('form-hair').value = girl.hair;
    document.getElementById('form-eyes').value = girl.eyes;
    document.getElementById('form-rate-hour').value = girl.rateHour;
    document.getElementById('form-rate-night').value = girl.rateNight;
    document.getElementById('form-whatsapp').value = girl.whatsapp;
    document.getElementById('form-badge').value = girl.badge;
    document.getElementById('form-image').value = girl.image;
    document.getElementById('form-availability').value = girl.availability;
    document.getElementById('form-services').value = girl.services.join(', ');
    document.getElementById('form-description').value = girl.description;

    adminFormModal.classList.remove('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('form-girl-id').value;
    
    const servicesInput = document.getElementById('form-services').value;
    const servicesArray = servicesInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const companionData = {
        name: document.getElementById('form-name').value,
        age: parseInt(document.getElementById('form-age').value, 10),
        height: parseFloat(document.getElementById('form-height').value),
        weight: parseInt(document.getElementById('form-weight').value, 10),
        hair: document.getElementById('form-hair').value,
        eyes: document.getElementById('form-eyes').value,
        rateHour: parseInt(document.getElementById('form-rate-hour').value, 10),
        rateNight: parseInt(document.getElementById('form-rate-night').value, 10),
        whatsapp: document.getElementById('form-whatsapp').value.replace(/\D/g, ''),
        badge: document.getElementById('form-badge').value,
        image: document.getElementById('form-image').value,
        availability: document.getElementById('form-availability').value,
        services: servicesArray,
        description: document.getElementById('form-description').value
    };

    if (id) {
        DataService.update(id, companionData);
    } else {
        DataService.add(companionData);
    }

    currentCompanions = DataService.getAll();
    adminFormModal.classList.add('hidden');
    renderAdminDashboard();
}
