/**
 * Portfolio - JavaScript Principal
 * Arquitectura modular con patrones de diseño claros
 * @author José Gallardo Caballero
 * 
 * Los datos se cargan desde archivos separados:
 * - src/js/data/projects.js (PROJECTS_DATA)
 * - src/js/data/certifications.js (CERTIFICATIONS_DATA)
 * - src/js/data/translations.js (TRANSLATIONS)
 */

// =============================================================================
// CONFIGURACIÓN GLOBAL
// =============================================================================

const CONFIG = {
  pdfWorkerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js',
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  scrollThreshold: 0,
  debounceDelay: 100
};

// =============================================================================
// MÓDULO: UTILIDADES
// =============================================================================

const Utils = {
  /**
   * Debounce function para optimizar eventos frecuentes
   */
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

  /**
   * Convierte descripción con saltos de línea a HTML
   */
  parseDescription(text) {
    const paragraphs = text.split(/\n\n+/);
    let html = '';
    
    paragraphs.forEach(paragraph => {
      if (paragraph.trim().startsWith('- ') || paragraph.trim().includes('\n- ')) {
        const items = paragraph
          .split(/\n/)
          .filter(line => line.trim().startsWith('-'))
          .map(line => `<li>${line.replace(/^- /, '').trim()}</li>`)
          .join('');
        html += `<ul>${items}</ul>`;
      } else {
        html += `<p>${paragraph.replaceAll('\n', ' ')}</p>`;
      }
    });
    
    return html;
  }
};

// =============================================================================
// MÓDULO: SIDEBAR
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
    // Toggle sidebar en móvil
    this.elements.toggle.addEventListener('click', () => this.toggle());
    this.elements.overlay.addEventListener('click', () => this.close());

    // Cerrar sidebar al hacer click en un enlace (móvil)
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (globalThis.innerWidth <= 1024) {
          this.close();
        }
      });
    });

    // Actualizar sección activa al hacer scroll
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
// MÓDULO: HEADER MÓVIL
// =============================================================================

const HeaderModule = {
  elements: {
    header: null
  },
  lastScrollTop: 0,

  init() {
    this.elements.header = document.getElementById('main-header');
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
    
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.elements.header.classList.add('hidden');
    } else {
      this.elements.header.classList.remove('hidden');
    }
    
    this.lastScrollTop = Math.max(0, scrollTop);
  }
};

// =============================================================================
// MÓDULO: CARRUSEL
// =============================================================================

const CarouselModule = {
  /**
   * Crea una instancia de carrusel
   */
  create(containerSelector, items, cardRenderer) {
    const container = document.querySelector(containerSelector);
    if (!container) return null;

    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.carousel-button.prev');
    const nextBtn = container.querySelector('.carousel-button.next');

    let currentIndex = 0;

    const instance = {
      render(language) {
        carousel.innerHTML = '';
        items.forEach((item, index) => {
          const card = cardRenderer(item, index, currentIndex, language);
          carousel.appendChild(card);
        });
        this.updatePosition();
        this.updateButtons();
      },

      updatePosition() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        this.updateActiveCard();
      },

      updateActiveCard() {
        const cards = carousel.querySelectorAll('.project-card, .certification-card');
        cards.forEach((card, index) => {
          card.classList.toggle('active', index === currentIndex);
        });
      },

      updateButtons() {
        const shouldHide = items.length <= 1;
        prevBtn.classList.toggle('hidden', shouldHide);
        nextBtn.classList.toggle('hidden', shouldHide);
      },

      move(direction) {
        currentIndex = (currentIndex + direction + items.length) % items.length;
        this.updatePosition();
      },

      getCurrentIndex() {
        return currentIndex;
      }
    };

    // Bind events
    prevBtn.addEventListener('click', () => instance.move(-1));
    nextBtn.addEventListener('click', () => instance.move(1));

    return instance;
  }
};

// =============================================================================
// MÓDULO: PROYECTOS
// =============================================================================

const ProjectsModule = {
  carousel: null,

  init(language) {
    // PROJECTS_DATA viene del archivo projects.js
    if (typeof PROJECTS_DATA === 'undefined') {
      console.error('PROJECTS_DATA no está definido. Asegúrate de cargar projects.js');
      return;
    }

    this.carousel = CarouselModule.create(
      '#proyectos .carousel-container',
      PROJECTS_DATA,
      this.renderCard.bind(this)
    );

    if (this.carousel) {
      this.carousel.render(language);
    }
  },

  renderCard(project, index, currentIndex, language) {
    const card = document.createElement('div');
    card.className = `project-card ${index === currentIndex ? 'active' : ''}`;
    
    const descriptionHtml = Utils.parseDescription(project.description[language]);

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image">
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-description">${descriptionHtml}</div>
        <div class="project-links">
          ${project.github ? `
            <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
              <span class="material-icons">code</span>
              <span>GitHub</span>
            </a>
          ` : ''}
          ${project.web ? `
            <a href="${project.web}" class="project-link" target="_blank" rel="noopener noreferrer">
              <span class="material-icons">language</span>
              <span>Web</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;

    return card;
  },

  update(language) {
    if (this.carousel) {
      this.carousel.render(language);
    }
  }
};

// =============================================================================
// MÓDULO: CERTIFICACIONES
// =============================================================================

const CertificationsModule = {
  carousel: null,
  imageExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'],

  init(language) {
    // CERTIFICATIONS_DATA viene del archivo certifications.js
    if (typeof CERTIFICATIONS_DATA === 'undefined') {
      console.error('CERTIFICATIONS_DATA no está definido. Asegúrate de cargar certifications.js');
      return;
    }

    this.carousel = CarouselModule.create(
      '#certificaciones .carousel-container',
      CERTIFICATIONS_DATA,
      this.renderCard.bind(this)
    );

    if (this.carousel) {
      this.carousel.render(language);
      this.renderPDFs();
    }
  },

  /**
   * Detecta si una URL es una imagen basándose en la extensión
   */
  isImageUrl(url) {
    if (!url) return false;
    const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
    return this.imageExtensions.includes(extension);
  },

  /**
   * Detecta si una URL es un PDF basándose en la extensión
   */
  isPdfUrl(url) {
    if (!url) return false;
    const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
    return extension === 'pdf';
  },

  renderCard(certification, index, currentIndex, language) {
    const card = document.createElement('div');
    card.className = `certification-card ${index === currentIndex ? 'active' : ''}`;

    const verifyText = language === 'es' ? 'Verificar' : 'Verify';
    const downloadText = language === 'es' ? 'Descargar' : 'Download';
    const hasImage = Boolean(certification.image);
    const isImage = this.isImageUrl(certification.image);
    const isPdf = this.isPdfUrl(certification.image);

    let imageContent = '';
    if (hasImage && isImage) {
      // Es una imagen regular, mostrarla directamente
      imageContent = `<img src="${certification.image}" alt="${certification.title}" class="certification-preview">`;
    } else if (hasImage && isPdf) {
      // Es un PDF, se renderizará después con PDF.js
      // imageContent remains empty, PDF will be rendered later
    } else {
      // No hay imagen, mostrar badge
      imageContent = `
        <div class="certification-badge">
          <span class="material-icons">workspace_premium</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="certification-image" ${hasImage && isPdf ? `data-pdf="${certification.image}"` : ''}>
        ${imageContent}
      </div>
      <div class="certification-info">
        <h3 class="certification-title">${certification.title}</h3>
        <p class="certification-issuer">${certification.issuer}</p>
        <div class="certification-links">
          <a href="${certification.verifyLink}" class="certification-link" target="_blank" rel="noopener noreferrer">
            <span class="material-icons">verified</span>
            ${verifyText}
          </a>
          ${certification.downloadLink ? `
            <a href="${certification.downloadLink}" class="certification-link" download>
              <span class="material-icons">file_download</span>
              ${downloadText}
            </a>
          ` : ''}
        </div>
      </div>
    `;

    return card;
  },

  renderPDFs() {
    if (!globalThis.pdfjsLib) {
      console.warn('PDF.js no está cargado');
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
          canvas.setAttribute('aria-label', 'Vista previa del certificado');

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
          element.innerHTML = `
            <div class="certification-badge">
              <span class="material-icons">workspace_premium</span>
            </div>
          `;
        });
    });
  },

  update(language) {
    if (this.carousel) {
      this.carousel.render(language);
      this.renderPDFs();
    }
  }
};

// =============================================================================
// MÓDULO: INTERNACIONALIZACIÓN (i18n)
// =============================================================================

const I18nModule = {
  currentLanguage: CONFIG.defaultLanguage,

  init() {
    // TRANSLATIONS viene del archivo translations.js
    if (typeof TRANSLATIONS === 'undefined') {
      console.error('TRANSLATIONS no está definido. Asegúrate de cargar translations.js');
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
    
    // Actualizar carruseles con el nuevo idioma
    ProjectsModule.update(this.currentLanguage);
    CertificationsModule.update(this.currentLanguage);
  },

  getLanguage() {
    return this.currentLanguage;
  }
};

// =============================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================================================

const App = {
  init() {
    // Configurar PDF.js
    if (globalThis.pdfjsLib) {
      globalThis.pdfjsLib.GlobalWorkerOptions.workerSrc = CONFIG.pdfWorkerSrc;
    }

    // Inicializar módulos
    SidebarModule.init();
    HeaderModule.init();
    I18nModule.init();

    // Inicializar contenido con idioma por defecto
    const language = I18nModule.getLanguage();
    ProjectsModule.init(language);
    CertificationsModule.init(language);

    console.log('Portfolio inicializado correctamente');
  }
};

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => App.init());
