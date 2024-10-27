document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Funcionalidad para ocultar/mostrar el header en móvil
    let lastScrollTop = 0;
    const header = document.getElementById('main-header');
    const mobileThemeToggle = document.getElementById('theme-toggle-mobile');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // Funcionalidad del botón de tema para móvil
    mobileThemeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Carrusel de proyectos
    const projects = [
        {
            title: "TNGLore",
            description:
            `
            Es un proyecto en conjunto que abarca una página web, un bot de Discord y una base de datos MongoDB.
            Lo empezamos en verano, y tiene el objetivo de conseguir cartas del lore (historia, momentos de recuerdo) de un grupo de amigos. Estas cartas se podrán conseguir dentro de cofres, los cuales los obtienes de forma aleatoria hablando por un canal de texto en discord. El bot tiene una probabilidad de responder al mensaje enviado y ofrecer un cofre al usuario con una carta aleatoria. Cada una de las cartas tiene su propia descripción, colección y rareza. La página web sirve para registrarse en el proyecto y poder acceder a tus cartas, las colecciones y un marketplace, cuya finalidad es poder intercambiar cartas entre usuarios.

            La página web está siendo desarrollada por Javier Troyano con Express.js y el bot de discord por mí, José Gallardo, con Python.    
            `,
            image: "../assets/proyects/TNGLore.webp",
            web: "https://tnglore.onrender.com/"
        },
        {
            title: "Proyecto 2",
            description: "Descripción del proyecto 2",
            image: "https://via.placeholder.com/500x300",
            github: "https://github.com/usuario/proyecto2"
        },
        {
            title: "Proyecto 3",
            description: "Descripción del proyecto 3",
            image: "https://via.placeholder.com/500x300",
            web: "https://proyecto3.com"
        }
    ];

    const carousel = document.querySelector('#proyectos .carousel');
    const prevButton = document.querySelector('#proyectos .carousel-button.prev');
    const nextButton = document.querySelector('#proyectos .carousel-button.next');
    let currentIndex = 0;

    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + projects.length) % projects.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % projects.length) {
            card.classList.add('next');
        }
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="material-icons">code</span></a>` : ''}
                    ${project.web ? `<a href="${project.web}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="material-icons">language</span></a>` : ''}
                </div>
            </div>
        `;
        return card;
    }

    function updateCarousel() {
        carousel.innerHTML = '';
        projects.forEach((project, index) => {
            const card = createProjectCard(project, index);
            carousel.appendChild(card);
        });
        updateCarouselButtons();
    }

    function moveCarousel(direction) {
        const currentActive = carousel.querySelector('.project-card.active');
        const nextActive = direction > 0 
            ? currentActive.nextElementSibling || carousel.firstElementChild
            : currentActive.previousElementSibling || carousel.lastElementChild;
    
        // Efecto de deslizamiento
        carousel.classList.add('sliding');
        carousel.style.transform = `translateX(${direction * -100}%)`;
    
        setTimeout(() => {
            carousel.classList.remove('sliding');
            carousel.style.transform = '';
    
            currentActive.classList.remove('active');
            nextActive.classList.add('active');
    
            currentIndex = Array.from(carousel.children).indexOf(nextActive);
    
            projects.forEach((_, index) => {
                const card = carousel.children[index];
                card.classList.remove('prev', 'next');
                if (index === (currentIndex - 1 + projects.length) % projects.length) {
                    card.classList.add('prev');
                } else if (index === (currentIndex + 1) % projects.length) {
                    card.classList.add('next');
                }
            });
    
            updateCarouselButtons();
        }, 500); // Duración de la transición
    }

    function updateCarouselButtons() {
        const shouldHideButtons = projects.length <= 1;
        prevButton.classList.toggle('hidden', shouldHideButtons);
        nextButton.classList.toggle('hidden', shouldHideButtons);
    }

    prevButton.addEventListener('click', () => moveCarousel(-1));
    nextButton.addEventListener('click', () => moveCarousel(1));

    updateCarousel();

    // Carrusel de certificaciones
    const certifications = [
        {
            title: "Certificación 1",
            issuer: "Empresa 1",
            image: "../assets/certifications/cert1.jpg",
            verifyLink: "https://example.com/verify1",
            downloadLink: "../assets/certifications/cert1.pdf"
        },
        // Añade más certificaciones aquí
    ];

    const certCarousel = document.querySelector('#certificaciones .carousel');
    const certPrevButton = document.querySelector('#certificaciones .carousel-button.prev');
    const certNextButton = document.querySelector('#certificaciones .carousel-button.next');
    let currentCertIndex = 0;

    function createCertificationCard(certification, index) {
        const card = document.createElement('div');
        card.className = 'certification-card';
        if (index === currentCertIndex) {
            card.classList.add('active');
        } else if (index === (currentCertIndex - 1 + certifications.length) % certifications.length) {
            card.classList.add('prev');
        } else if (index === (currentCertIndex + 1) % certifications.length) {
            card.classList.add('next');
        }
        card.innerHTML = `
            <img src="${certification.image}" alt="${certification.title}" class="certification-image">
            <div class="certification-info">
                <h3 class="certification-title">${certification.title}</h3>
                <p class="certification-issuer">${certification.issuer}</p>
                <div class="certification-links">
                    <a href="${certification.verifyLink}" class="certification-link" target="_blank" rel="noopener noreferrer">
                        <span class="material-icons">verified</span>
                        Verificar
                    </a>
                    <a href="${certification.downloadLink}" class="certification-link" download>
                        <span class="material-icons">file_download</span>
                        Descargar PDF
                    </a>
                </div>
            </div>
        `;
        return card;
    }

    function updateCertCarousel() {
        certCarousel.innerHTML = '';
        certifications.forEach((certification, index) => {
            const card = createCertificationCard(certification, index);
            certCarousel.appendChild(card);
        });
        updateCertCarouselButtons();
    }

    function moveCertCarousel(direction) {
        const currentActive = certCarousel.querySelector('.certification-card.active');
        const nextActive = direction > 0 
            ? currentActive.nextElementSibling || certCarousel.firstElementChild
            : currentActive.previousElementSibling || certCarousel.lastElementChild;
    
        // Efecto de deslizamiento
        certCarousel.classList.add('sliding');
        certCarousel.style.transform = `translateX(${direction * -100}%)`;
    
        setTimeout(() => {
            certCarousel.classList.remove('sliding');
            certCarousel.style.transform = '';
    
            currentActive.classList.remove('active');
            nextActive.classList.add('active');
    
            currentCertIndex = Array.from(certCarousel.children).indexOf(nextActive);
    
            certifications.forEach((_, index) => {
                const card = certCarousel.children[index];
                card.classList.remove('prev', 'next');
                if (index === (currentCertIndex - 1 + certifications.length) % certifications.length) {
                    card.classList.add('prev');
                } else if (index === (currentCertIndex + 1) % certifications.length) {
                    card.classList.add('next');
                }
            });
    
            updateCertCarouselButtons();
        }, 500); // Duración de la transición
    }

    function updateCertCarouselButtons() {
        const shouldHideButtons = certifications.length <= 1;
        certPrevButton.classList.toggle('hidden', shouldHideButtons);
        certNextButton.classList.toggle('hidden', shouldHideButtons);
    }

    certPrevButton.addEventListener('click', () => moveCertCarousel(-1));
    certNextButton.addEventListener('click', () => moveCertCarousel(1));

    updateCertCarousel();

    // Internationalization
    const i18next = window.i18next;
    const languageDetector = new window.i18nextBrowserLanguageDetector();

    i18next
        .use(languageDetector)
        .init({
            fallbackLng: 'en',
            supportedLngs: ['es', 'en'],
            resources: {
                es: {
                    translation: {
                        header: {
                            title: "Estudiante Ingeniería Informática"
                        },
                        nav: {
                            home: "Inicio",
                            about: "Sobre mí",
                            projects: "Proyectos",
                            certifications: "Certificaciones"
                        },
                        home: {
                            degree: "Graduado Ingeniería Informática",
                            downloadCV: "Descargar CV"
                        },
                        about: {
                            title: "Sobre mí",
                            intro: "Me llamo José Gallardo Caballero. Vivo en León, pero actualmente estoy estudiando en la Escuela Politécnica Superior de la Universidad de Burgos.",
                            skills: "Estoy familiarizado con la programación de distintos lenguajes como Python y Java, entre otros.",
                            ai: "Sé crear IAs simples, que aprenden a realizar una tarea durante el transcurso de su vida con Python.",
                            ambition: "Mi ambición es convertir problemas complejos en soluciones tecnológicas eficientes. Trabajando en equipo, he realizado proyectos que fortalecen mis habilidades analíticas y técnicas. Esta experiencia me impulsa a seguir creciendo profesionalmente y aportar significativamente al campo de la ingeniería informática."
                        },
                        projects: {
                            title: "Proyectos"
                        },
                        certifications: {
                            title: "Certificaciones",
                            verify: "Verificar",
                            download: "Descargar PDF"
                        }
                    }
                },
                en: {
                    translation: {
                        header: {
                            title: "Computer Engineering Student"
                        },
                        nav: {
                            home: "Home",
                            about: "About",
                            projects: "Projects",
                            certifications: "Certifications"
                        },
                        home: {
                            degree: "Computer Engineering Graduate",
                            downloadCV: "Download CV"
                        },
                        about: {
                            title: "About Me",
                            intro: "My name is José Gallardo Caballero. I live in León, but I'm currently studying at the Higher Polytechnic School of the University of Burgos.",
                            skills: "I'm familiar with programming in various languages such as Python and Java, among others.",
                            ai: "I know how to create simple AIs that learn to perform a task during their lifetime using Python.",
                            ambition: "My ambition is to turn complex problems into efficient technological solutions. Working in teams, I have carried out projects that strengthen my analytical and technical skills. This experience drives me to continue growing professionally and contribute significantly to the field of computer engineering."
                        },
                        projects: {
                            title: "Projects"
                        },
                        certifications: {
                            title: "Certifications",
                            verify: "Verify",
                            download: "Download PDF"
                        }
                    }
                }
            }
        }, function(err, t) {
            updateContent(i18next.language);
        });

    function updateContent(language) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });
        document.documentElement.lang = language;
    }
});