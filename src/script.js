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
        let scrollTop = window.pageY || document.documentElement.scrollTop;
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
            description: {
                es: [
                    "Es un proyecto en conjunto que abarca una página web, un bot de Discord y una base de datos MongoDB.",
                    "Lo empezamos en verano, y tiene el objetivo de conseguir cartas del lore (historia, momentos de recuerdo) de un grupo de amigos.",
                    "Estas cartas se podrán conseguir dentro de cofres, los cuales los obtienes de forma aleatoria hablando por un canal de texto en discord.",
                    "El bot tiene una probabilidad de responder al mensaje enviado y ofrecer un cofre al usuario con una carta aleatoria.",
                    "Cada una de las cartas tiene su propia descripción, colección y rareza.",
                    "La página web sirve para registrarse en el proyecto y poder acceder a tus cartas, las colecciones y un marketplace, cuya finalidad es poder intercambiar cartas entre usuarios.",
                    "La página web está siendo desarrollada por Javier Troyano con Express.js y el bot de discord por mí, José Gallardo, con Python."
                ],
                en: [
                    "This is a collaborative project that includes a website, a Discord bot, and a MongoDB database.",
                    "We started it in the summer with the goal of collecting lore cards (history, memorable moments) of a group of friends.",
                    "These cards can be obtained from chests, which are randomly acquired by chatting in a Discord text channel.",
                    "The bot has a chance to respond to the sent message and offer a chest to the user with a random card.",
                    "Each card has its own description, collection, and rarity.",
                    "The website is used to register for the project and access your cards, collections, and a marketplace, which allows users to exchange cards.",
                    "The website is being developed by Javier Troyano using Express.js, and I, José Gallardo, am developing the Discord bot using Python."
                ]
            },
            image: "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/proyects/TNGLore.webp",
        },
        {
            title: "JoseleelBot",
            description: {
                es: [
                    "Es un bot de discord multitarea y de moderación. Algunas de sus funcionalidades son:",
                    "- Reemplazar las URLs de redes sociales pasadas en canales de texto por URLs que arreglan los embeds en Discord.",
                    "- Avisa a los amigos de las personas cuyo día es su cumpleaños.",
                    "- Colabora con el proyecto de TNGLore para otorgar cofres a los usuarios que hablen por canales de texto.",
                    "- Utiliza la API de Groq (IA) para que, con un comando, puedas ser respondido con inteligencia artificial.",
                    "- Soporta ficheros de texto, imágenes y audios."
                ],
                en: [
                    "This is a multitasking and moderation Discord bot. Some of its features include:",
                    "- Replacing social media URLs posted in text channels with URLs that fix embeds in Discord.",
                    "- Notifying friends when it's someone's birthday.",
                    "- Collaborating with the TNGLore project to award chests to users who chat in text channels.",
                    "- Using the Groq API (AI) to respond to commands with artificial intelligence.",
                    "- Supporting text files, images, and audio."
                ]
            },
            image: "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/JoseleelBot.webp",
        },
        {
            title: "Talf",
            description: {
                es: [
                    "Talf es el nombre del proyecto que hice durante la asignatura de Metodología de la programación (Mepro).",
                    "Se trata de recrear dos juegos de mesa 'vikingos' llamados Brandubh y Ardri, los cuales elijes uno de los dos al iniciar el programa.",
                    "Debía de ser desarrollado en Java-20 y comprobado su funcionamiento con test de JUnit.",
                    "Ha sido mi primer proyecto profesional de programación en el que se juntaron varias tareas, como mantener limpieza del código, manejo de excepciones y, sobretodo, el aprendizaje que conllevó hacer el juego."
                ],
                en: [
                    "Talf is the name of the project I did during the Programming Methodology (Mepro) course.",
                    "It involves recreating two 'Viking' board games called Brandubh and Ardri, one of which you choose when starting the program.",
                    "It had to be developed in Java-20 and its functionality verified with JUnit tests.",
                    "This was my first professional programming project that combined several tasks, such as maintaining code cleanliness, exception handling, and, above all, the learning experience that came with creating the game."
                ]
            },
            image: "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/proyects/Talf.webp",
            github: "https://github.com/Joseleelsuper/Ardri"
        }
        // Añade más proyectos aquí
    ];

    const carousel = document.querySelector('#proyectos .carousel');
    const prevButton = document.querySelector('#proyectos .carousel-button.prev');
    const nextButton = document.querySelector('#proyectos .carousel-button.next');
    let currentIndex = 0;

    function createProjectCard(project, index, language) {
        const card = document.createElement('div');
        card.className = 'project-card';
        if (index === currentIndex) {
            card.classList.add('active');
        }
        const descriptionHtml = project.description[language].map(paragraph => `<p>${paragraph}</p>`).join('');
        // Texto opcional para el botón de GitHub y Web.
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-description">${descriptionHtml}</div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="material-icons">code</span></a>` : ''}
                    ${project.web ? `<a href="${project.web}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="material-icons">language</span></a>` : ''}
                </div>
            </div>
        `;
        return card;
    }

    function updateProjectCarousel(language) {
        carousel.innerHTML = '';
        projects.forEach((project, index) => {
            const card = createProjectCard(project, index, language);
            carousel.appendChild(card);
        });
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateCarouselButtons(projects.length, prevButton, nextButton);
    }

    function moveProjectCarousel(direction) {
        currentIndex = (currentIndex + direction + projects.length) % projects.length;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateActiveCard(carousel, currentIndex);
    }

    prevButton.addEventListener('click', () => moveProjectCarousel(-1));
    nextButton.addEventListener('click', () => moveProjectCarousel(1));

    // Carrusel de certificaciones
    const certifications = [
        {
            title: "CS50's Introduction to Artificial Intelligence with Python",
            issuer: "HarvardX",
            image: "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/certifications/GallardoCaballeroJose_CS50AIVerified.pdf",
            verifyLink: "https://courses.edx.org/certificates/975705ba7ff14d7a8d6718fe3e22a1d6",
            downloadLink: "../assets/certifications/GallardoCaballeroJose_CS50AIVerified.pdf"
        },
        // Añade más certificaciones aquí
    ];

    const certCarousel = document.querySelector('#certificaciones .carousel');
    const certPrevButton = document.querySelector('#certificaciones .carousel-button.prev');
    const certNextButton = document.querySelector('#certificaciones .carousel-button.next');
    let currentCertIndex = 0;

    function createCertificationCard(certification, index, language) {
        const card = document.createElement('div');
        card.className = 'certification-card';
        if (index === currentCertIndex) {
            card.classList.add('active');
        }
        card.innerHTML = `
            <div class="certification-image" data-pdf="${certification.image}"></div>
            <div class="certification-info">
                <h3 class="certification-title">${certification.title}</h3>
                <p class="certification-issuer">${certification.issuer}</p>
                <div class="certification-links">
                    <a href="${certification.verifyLink}" class="certification-link" target="_blank" rel="noopener noreferrer">
                        <span class="material-icons">verified</span>
                        ${language === 'es' ? 'Verificar' : 'Verify'}
                    </a>
                    <a href="${certification.downloadLink}" class="certification-link" download>
                        <span class="material-icons">file_download</span>
                        ${language === 'es' ? 'Descargar Certificado' : 'Download Certificate'}
                    </a>
                </div>
            </div>
        `;
        return card;
    }

    function updateCertCarousel(language) {
        certCarousel.innerHTML = '';
        certifications.forEach((certification, index) => {
            const card = createCertificationCard(certification, index, language);
            certCarousel.appendChild(card);
        });
        certCarousel.style.transform = `translateX(-${currentCertIndex * 100}%)`;
        updateCarouselButtons(certifications.length, certPrevButton, certNextButton);
        renderPDFs();
    }

    function moveCertCarousel(direction) {
        currentCertIndex = (currentCertIndex + direction + certifications.length) % certifications.length;
        certCarousel.style.transform = `translateX(-${currentCertIndex * 100}%)`;
        updateActiveCard(certCarousel, currentCertIndex);
    }

    certPrevButton.addEventListener('click', () => moveCertCarousel(-1));
    certNextButton.addEventListener('click', () => moveCertCarousel(1));

    function updateCarouselButtons(totalItems, prevButton, nextButton) {
        const shouldHideButtons = totalItems <= 1;
        prevButton.classList.toggle('hidden', shouldHideButtons);
        nextButton.classList.toggle('hidden', shouldHideButtons);
    }

    function updateActiveCard(carouselElement, activeIndex) {
        const cards = carouselElement.querySelectorAll('.project-card, .certification-card');
        cards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Render PDFs as images
    function renderPDFs() {
        const pdfElements = document.querySelectorAll('[data-pdf]');
        pdfElements.forEach(element => {
            const pdfUrl = element.dataset.pdf;
            pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const scale = 0.5; // Reduced scale for smaller image
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                    element.appendChild(canvas);
                    
                    // Make the canvas responsive
                    canvas.style.width = '100%';
                    canvas.style.height = 'auto';
                    canvas.style.maxWidth = '500px'; // Set a maximum width
                });
            });
        });
    }

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
                            title: "Graduado Ingeniería Informática"
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
            updateProjectCarousel(i18next.language);
            updateCertCarousel(i18next.language);
        });

    function updateContent(language) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });
        document.documentElement.lang = language;
        updateProjectCarousel(language);
        updateCertCarousel(language);
    }
});