/**
 * Portfolio - JavaScript principal
 * Datos externos:
 * - src/js/data/projects.js (PROJECTS_DATA)
 * - src/js/data/certifications.js (CERTIFICATIONS_DATA)
 * - src/js/data/translations.js (TRANSLATIONS)
 */

// =============================================================================
// CONFIGURACION GLOBAL
// =============================================================================

const CONFIG = {
  pdfWorkerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js',
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  recentProjectsLimit: 3,
  recentCertificationsLimit: 3,
  debounceDelay: 100
};

// =============================================================================
// MODULO: UTILIDADES
// =============================================================================

const Utils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  },

  translate(key, language, fallback = '') {
    const resources = typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS : {};
    const value = key.split('.').reduce((current, part) => current?.[part], resources[language]);
    return typeof value === 'string' ? value : fallback;
  },

  parseDescription(text = '') {
    const paragraphs = text.split(/\n\n+/);
    let html = '';

    paragraphs.forEach(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return;

      if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
        const items = trimmed
          .split(/\n/)
          .filter(line => line.trim().startsWith('-'))
          .map(line => `<li>${this.escapeHTML(line.replace(/^- /, '').trim())}</li>`)
          .join('');
        html += `<ul>${items}</ul>`;
      } else {
        html += `<p>${this.escapeHTML(trimmed.replaceAll('\n', ' '))}</p>`;
      }
    });

    return html;
  }
};

// =============================================================================
// MODULO: SIDEBAR
// =============================================================================

const SidebarModule = {
  elements: {
    sidebar: null,
    toggle: null,
    overlay: null,
    navLinks: null
  },

  init() {
    this.elements.sidebar = document.getElementById('sidebar');
    this.elements.toggle = document.getElementById('sidebar-toggle');
    this.elements.overlay = document.getElementById('sidebar-overlay');
    this.elements.navLinks = document.querySelectorAll('.nav-link');

    if (!this.elements.sidebar || !this.elements.toggle) return;

    this.bindEvents();
    this.initActiveSection();
  },

  bindEvents() {
    this.elements.toggle.addEventListener('click', () => this.toggle());
    this.elements.overlay.addEventListener('click', () => this.close());

    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (globalThis.innerWidth <= 1024) {
          this.close();
        }
      });
    });

    globalThis.addEventListener('scroll', Utils.debounce(() => {
      this.updateActiveSection();
    }, CONFIG.debounceDelay), { passive: true });
  },

  toggle() {
    const isOpen = this.elements.sidebar.classList.toggle('open');
    this.elements.toggle.classList.toggle('active', isOpen);
    this.elements.overlay.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },

  close() {
    this.elements.sidebar.classList.remove('open');
    this.elements.toggle.classList.remove('active');
    this.elements.overlay.classList.remove('visible');
    document.body.style.overflow = '';
  },

  initActiveSection() {
    const hash = globalThis.location.hash || '#inicio';
    this.setActiveLink(hash);
  },

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = `#${section.id}`;
      }
    });

    if (currentSection) {
      this.setActiveLink(currentSection);
    }
  },

  setActiveLink(hash) {
    this.elements.navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === hash);
    });
  }
};

// =============================================================================
// MODULO: HEADER MOVIL
// =============================================================================

const HeaderModule = {
  elements: {
    header: null,
    toggle: null
  },
  lastScrollTop: 0,

  init() {
    this.elements.header = document.getElementById('main-header');
    this.elements.toggle = document.getElementById('sidebar-toggle');
    if (!this.elements.header) return;

    this.bindEvents();
  },

  bindEvents() {
    globalThis.addEventListener('scroll', Utils.debounce(() => {
      this.handleScroll();
    }, 50), { passive: true });
  },

  handleScroll() {
    const scrollTop = globalThis.pageYOffset || document.documentElement.scrollTop;
    const shouldHide = scrollTop > this.lastScrollTop && scrollTop > 100;

    this.elements.header.classList.toggle('hidden', shouldHide);
    this.elements.toggle?.classList.toggle('hidden', shouldHide);

    this.lastScrollTop = Math.max(0, scrollTop);
  }
};

// =============================================================================
// MODULO: PROYECTOS
// =============================================================================

const ProjectsModule = {
  elements: {
    overview: null,
    toggle: null
  },
  expanded: false,
  expandedDescriptions: new Set(),

  init(language) {
    if (typeof PROJECTS_DATA === 'undefined') {
      console.error('PROJECTS_DATA no esta definido. Asegurate de cargar projects.js');
      return;
    }

    this.elements.overview = document.getElementById('projects-overview');
    this.elements.toggle = document.querySelector('[data-toggle-list="projects"]');
    this.elements.toggle?.addEventListener('click', () => this.toggle());
    this.renderOverview(language);
  },

  renderOverview(language) {
    if (!this.elements.overview || typeof PROJECTS_DATA === 'undefined') return;

    const items = this.expanded
      ? PROJECTS_DATA
      : PROJECTS_DATA.slice(0, CONFIG.recentProjectsLimit);

    this.elements.overview.innerHTML = '';
    items.forEach(project => {
      this.elements.overview.appendChild(this.renderCard(project, language, 'compact'));
    });

    this.updateToggle(language);
    this.updateDescriptionToggles(language);
  },

  renderCard(project, language, variant = 'compact') {
    const card = document.createElement('article');
    card.className = `project-card project-card--${variant}`;

    const key = this.getProjectKey(project);
    const title = Utils.escapeHTML(project.title);
    const description = project.description?.[language] || project.description?.[CONFIG.defaultLanguage] || '';
    const isDescriptionExpanded = this.expandedDescriptions.has(key);
    const descriptionId = `project-description-${key}`;
    const descriptionContent = variant === 'detail'
      ? `<div class="project-description">${Utils.parseDescription(description)}</div>`
      : `
        <div class="project-description project-description--compact ${isDescriptionExpanded ? 'expanded' : ''}" id="${descriptionId}">
          ${Utils.parseDescription(description)}
        </div>
        <button
          class="project-description-toggle"
          type="button"
          data-project-description-toggle="${key}"
          aria-expanded="${String(isDescriptionExpanded)}"
          aria-controls="${descriptionId}"
          hidden
        >
          ${Utils.translate(isDescriptionExpanded ? 'common.readLess' : 'common.readMore', language, isDescriptionExpanded ? 'Leer menos' : 'Leer más')}
        </button>
      `;

    card.innerHTML = `
      <img src="${project.image}" alt="${title}" class="project-image" loading="lazy">
      <div class="project-info">
        <h3 class="project-title">${title}</h3>
        ${descriptionContent}
        ${this.renderLinks(project)}
      </div>
    `;

    return card;
  },

  getProjectKey(project) {
    return project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  },

  renderLinks(project) {
    const links = [];

    if (project.github) {
      links.push(`
        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
          <span class="material-icons" aria-hidden="true">code</span>
          <span>GitHub</span>
        </a>
      `);
    }

    if (project.web) {
      links.push(`
        <a href="${project.web}" class="project-link" target="_blank" rel="noopener noreferrer">
          <span class="material-icons" aria-hidden="true">language</span>
          <span>Web</span>
        </a>
      `);
    }

    return links.length ? `<div class="project-links">${links.join('')}</div>` : '';
  },

  update(language) {
    this.renderOverview(language);
  },

  toggle(language) {
    this.expanded = !this.expanded;
    this.renderOverview(language || I18nModule.getLanguage());
  },

  updateToggle(language) {
    if (!this.elements.toggle || typeof PROJECTS_DATA === 'undefined') return;

    const hasMoreItems = PROJECTS_DATA.length > CONFIG.recentProjectsLimit;
    this.elements.toggle.hidden = !hasMoreItems;
    this.elements.toggle.setAttribute('aria-expanded', String(this.expanded));
    this.elements.toggle.textContent = Utils.translate(
      this.expanded ? 'common.showLess' : 'common.viewAll',
      language,
      this.expanded ? 'Ver menos' : 'Ver todos'
    );
  },

  updateDescriptionToggles(language) {
    if (!this.elements.overview) return;

    const toggleButtons = this.elements.overview.querySelectorAll('[data-project-description-toggle]');

    toggleButtons.forEach(button => {
      const key = button.dataset.projectDescriptionToggle;
      const description = document.getElementById(button.getAttribute('aria-controls'));
      if (!description) return;

      const isExpanded = this.expandedDescriptions.has(key);
      description.classList.toggle('expanded', isExpanded);
      button.setAttribute('aria-expanded', String(isExpanded));
      button.textContent = Utils.translate(
        isExpanded ? 'common.readLess' : 'common.readMore',
        language,
        isExpanded ? 'Leer menos' : 'Leer más'
      );

      button.onclick = () => {
        if (this.expandedDescriptions.has(key)) {
          this.expandedDescriptions.delete(key);
        } else {
          this.expandedDescriptions.add(key);
        }
        this.updateDescriptionToggles(I18nModule.getLanguage());
      };
    });

    globalThis.requestAnimationFrame(() => {
      toggleButtons.forEach(button => {
        const description = document.getElementById(button.getAttribute('aria-controls'));
        if (!description) return;

        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          button.hidden = false;
          return;
        }

        button.hidden = description.scrollHeight <= description.clientHeight + 2;
      });
    });
  }
};

// =============================================================================
// MODULO: CERTIFICACIONES
// =============================================================================

const CertificationsModule = {
  elements: {
    overview: null,
    toggle: null
  },
  expanded: false,
  imageExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'],

  init(language) {
    if (typeof CERTIFICATIONS_DATA === 'undefined') {
      console.error('CERTIFICATIONS_DATA no esta definido. Asegurate de cargar certifications.js');
      return;
    }

    this.elements.overview = document.getElementById('certifications-overview');
    this.elements.toggle = document.querySelector('[data-toggle-list="certifications"]');
    this.elements.toggle?.addEventListener('click', () => this.toggle());
    this.renderOverview(language);
  },

  renderOverview(language) {
    if (!this.elements.overview || typeof CERTIFICATIONS_DATA === 'undefined') return;

    const items = this.expanded
      ? CERTIFICATIONS_DATA
      : CERTIFICATIONS_DATA.slice(0, CONFIG.recentCertificationsLimit);

    this.elements.overview.innerHTML = '';
    items.forEach(certification => {
      this.elements.overview.appendChild(this.renderCard(certification, language, 'compact'));
    });
    this.updateToggle(language);
    this.renderPDFs();
  },

  isImageUrl(url) {
    if (!url) return false;
    const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
    return this.imageExtensions.includes(extension);
  },

  isPdfUrl(url) {
    if (!url) return false;
    const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
    return extension === 'pdf';
  },

  renderCard(certification, language, variant = 'compact') {
    const card = document.createElement('article');
    card.className = `certification-card certification-card--${variant}`;

    const verifyText = Utils.translate('certifications.verify', language, 'Verificar');
    const downloadText = Utils.translate('certifications.download', language, 'Descargar');
    const title = Utils.escapeHTML(certification.title);
    const issuer = Utils.escapeHTML(certification.issuer);
    const hasImage = Boolean(certification.image);
    const isImage = this.isImageUrl(certification.image);
    const isPdf = this.isPdfUrl(certification.image);

    let imageContent = '';
    if (hasImage && isImage) {
      imageContent = `<img src="${certification.image}" alt="${title}" class="certification-preview" loading="lazy">`;
    } else if (!hasImage || !isPdf) {
      imageContent = this.renderBadge();
    }

    card.innerHTML = `
      <div class="certification-image" ${hasImage && isPdf ? `data-pdf="${certification.image}"` : ''}>
        ${imageContent}
      </div>
      <div class="certification-info">
        <h3 class="certification-title">${title}</h3>
        <p class="certification-issuer">${issuer}</p>
        <div class="certification-links">
          <a href="${certification.verifyLink}" class="certification-link" target="_blank" rel="noopener noreferrer">
            <span class="material-icons" aria-hidden="true">verified</span>
            <span>${verifyText}</span>
          </a>
          ${certification.downloadLink ? `
            <a href="${certification.downloadLink}" class="certification-link" download>
              <span class="material-icons" aria-hidden="true">file_download</span>
              <span>${downloadText}</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;

    return card;
  },

  renderBadge() {
    return `
      <div class="certification-badge">
        <span class="material-icons" aria-hidden="true">workspace_premium</span>
      </div>
    `;
  },

  renderPDFs() {
    if (!globalThis.pdfjsLib) {
      console.warn('PDF.js no esta cargado');
      return;
    }

    const pdfElements = document.querySelectorAll('[data-pdf]');

    pdfElements.forEach(element => {
      const pdfUrl = element.dataset.pdf;

      if (!pdfUrl?.startsWith('http')) {
        return;
      }

      globalThis.pdfjsLib.getDocument(pdfUrl).promise
        .then(pdf => pdf.getPage(1))
        .then(page => {
          const scale = 0.6;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.setAttribute('role', 'img');
          canvas.setAttribute('aria-label', Utils.translate(
            'certifications.previewLabel',
            I18nModule.getLanguage(),
            'Vista previa del certificado'
          ));

          return page.render({
            canvasContext: context,
            viewport: viewport
          }).promise.then(() => canvas);
        })
        .then(canvas => {
          element.innerHTML = '';
          element.appendChild(canvas);
        })
        .catch(err => {
          console.error('Error al renderizar PDF:', err);
          element.innerHTML = this.renderBadge();
        });
    });
  },

  update(language) {
    this.renderOverview(language);
  },

  toggle(language) {
    this.expanded = !this.expanded;
    this.renderOverview(language || I18nModule.getLanguage());
  },

  updateToggle(language) {
    if (!this.elements.toggle || typeof CERTIFICATIONS_DATA === 'undefined') return;

    const hasMoreItems = CERTIFICATIONS_DATA.length > CONFIG.recentCertificationsLimit;
    this.elements.toggle.hidden = !hasMoreItems;
    this.elements.toggle.setAttribute('aria-expanded', String(this.expanded));
    this.elements.toggle.textContent = Utils.translate(
      this.expanded ? 'common.showLess' : 'common.viewAll',
      language,
      this.expanded ? 'Ver menos' : 'Ver todos'
    );
  }
};

// =============================================================================
// MODULO: INTERNACIONALIZACION
// =============================================================================

const I18nModule = {
  currentLanguage: CONFIG.defaultLanguage,

  init() {
    if (typeof TRANSLATIONS === 'undefined') {
      console.error('TRANSLATIONS no esta definido. Asegurate de cargar translations.js');
      return;
    }

    if (globalThis.i18next) {
      globalThis.i18next.use(new globalThis.i18nextBrowserLanguageDetector()).init({
        fallbackLng: 'en',
        supportedLngs: CONFIG.supportedLanguages,
        resources: {
          es: { translation: TRANSLATIONS.es },
          en: { translation: TRANSLATIONS.en }
        }
      }, () => {
        this.currentLanguage = globalThis.i18next.language.split('-')[0];
        if (!CONFIG.supportedLanguages.includes(this.currentLanguage)) {
          this.currentLanguage = CONFIG.defaultLanguage;
        }
        this.updateContent();
      });
    }
  },

  updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.dataset.i18n;
      if (globalThis.i18next) {
        element.textContent = globalThis.i18next.t(key);
      }
    });

    document.documentElement.lang = this.currentLanguage;

    ProjectsModule.update(this.currentLanguage);
    CertificationsModule.update(this.currentLanguage);
  },

  getLanguage() {
    return this.currentLanguage;
  }
};

// =============================================================================
// INICIALIZACION DE LA APLICACION
// =============================================================================

const App = {
  init() {
    if (globalThis.pdfjsLib) {
      globalThis.pdfjsLib.GlobalWorkerOptions.workerSrc = CONFIG.pdfWorkerSrc;
    }

    SidebarModule.init();
    HeaderModule.init();
    I18nModule.init();

    const language = I18nModule.getLanguage();
    ProjectsModule.init(language);
    CertificationsModule.init(language);

    console.log('Portfolio inicializado correctamente');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
