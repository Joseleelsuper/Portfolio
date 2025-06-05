document.addEventListener("DOMContentLoaded", function () {
  // Configurar PDF.js worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js";
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  // Funcionalidad para ocultar/mostrar el header en móvil
  let lastScrollTop = 0;
  const header = document.getElementById("main-header");
  const mobileThemeToggle = document.getElementById("theme-toggle-mobile");

  window.addEventListener(
    "scroll",
    () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    { passive: true }
  );

  // Funcionalidad del botón de tema para móvil
  mobileThemeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  // Carrusel de proyectos
  const projects = [
    {
      title: "UpdateMe",
      description: {
        es: `Plataforma que proporciona actualizaciones semanales sobre las últimas tendencias en tecnología e inteligencia artificial a través de correo electrónico.\n\nEl servicio funciona como una newsletter profesional que requiere únicamente la suscripción del usuario para comenzar a recibir contenido semanalmente.\n\nObjetivos técnicos del proyecto:\n\n- Implementación de internacionalización completa con soporte multilingüe en tiempo real, permitiendo a los usuarios cambiar entre idiomas instantáneamente.\n- Integración de un sistema de pagos seguro mediante Stripe para gestionar transacciones y datos financieros de manera confiable.\n- Arquitectura basada en patrones de diseño que facilitan la intercambiabilidad entre diferentes proveedores de IA, manteniendo un código mantenible y escalable.\n- Configuración de un dominio personalizado tanto para la aplicación web como para las comunicaciones por correo (JoseGallardo@updateme.dev), profesionalizando la experiencia del usuario y facilitando la comunicación directa.\n\nDesarrollado con Python Flask en el backend y HTML, CSS y JavaScript Vanilla en el frontend para maximizar rendimiento y control sobre la interfaz de usuario.`,
        en: `Platform that delivers weekly updates about the latest trends in technology and artificial intelligence via email.\n\nThe service functions as a professional newsletter that only requires user subscription to begin receiving content on a weekly basis.\n\nTechnical objectives of the project:\n\n- Implementation of complete internationalization with real-time multilingual support, allowing users to switch between languages instantly.\n- Integration of a secure payment system using Stripe to manage transactions and financial data reliably.\n- Architecture based on design patterns that facilitate interchangeability between different AI providers, maintaining maintainable and scalable code.\n- Configuration of a custom domain for both the web application and email communications (JoseGallardo@updateme.dev), professionalizing the user experience and facilitating direct communication.\n\nDeveloped with Python Flask on the backend and HTML, CSS, and Vanilla JavaScript on the frontend to maximize performance and control over the user interface.`,
      },
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/UpdateMe.webp",
      github: "https://github.com/Joseleelsuper/UpdateMe",
      web: "https://updateme.dev/",
    },
    {
      title: "GreenLake Portal",
      description: {
        es: `Se trata de una página web en la que los turistas accederán a todo tipo de servicios desde un solo sitio. En base a los días que el turista visite la ciudad se le proporcionará un listado de movilidad, alojamiento y festividades en esas fechas.\n\nUtilizamos una base de datos no relacional (MongoDB) para cargar de manera dinámica los distintos tipos de establecimientos, rutas y actividades que hay por toda la web.\n\nLa movilidad viene dada por la empresa de vuelo Ryanair. Pensamos en una solución de transporte terrestre pero ni Alsa ni Renfe nos proporcionaban una solución aceptable.\n\nLa página tendrá un chat Bot con información de los CSV compartidos en el repositorio de la Fase II de HP, que permitirá a los turistas preguntarles cualquier cosa referente a GreenLake Village.\n\nAdemás, una ciudad 3D estará disponible para que cualquier turista pueda observar desde su dispositivo una vista previa de lo que verá durante su turismo.`,
        en: `This is a website where tourists can access all kinds of services from a single location. Based on the days the tourist visits the city, they will be provided with a list of mobility options, accommodations, and festivities during those dates.\n\nWe use a non-relational database (MongoDB) to dynamically load different types of establishments, routes, and activities throughout the website.\n\nMobility is provided by the airline company Ryanair. We considered ground transportation solutions, but neither Alsa nor Renfe provided an acceptable solution.\n\nThe page will feature a chat Bot with information from CSV files shared in the Phase II HP repository, allowing tourists to ask anything about GreenLake Village.\n\nAdditionally, a 3D city will be available for any tourist to preview what they will see during their tourism experience from their device.`,
      },
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/GreenLake.webp",
      github: "https://github.com/Troyano19/CDSTechChallenge_FaseII",
      web: "https://greenlake-portal.vercel.app/",
    },
    {
      title: "TNGLore",
      description: {
        es: `Es un proyecto que abarca una página web, un bot de Discord y una base de datos MongoDB.\n\nLo empecé en diciembre de 2024, y tiene el objetivo de conseguir cartas del lore (historia, momentos de recuerdo) de un grupo de amigos.\n\nEstas cartas se podrán conseguir dentro de cofres, los cuales los obtienes de forma aleatoria hablando por un canal de texto en discord.\n\nEl bot tiene una probabilidad de responder al mensaje enviado y ofrecer un cofre al usuario con una carta aleatoria.\n\nCada una de las cartas tiene su propia descripción, colección y rareza.\n\nLa página web sirve para registrarse en el proyecto y poder acceder a tus cartas, las colecciones y un marketplace, cuya finalidad es poder intercambiar cartas entre usuarios.\n\nLa página web está siendo desarrollada en python Flask y el bot de Discord en Python.`,
        en: `This is a project that includes a website, a Discord bot, and a MongoDB database.\n\nI started it in December 2024, and its goal is to collect lore cards (history, memorable moments) of a group of friends.\n\nThese cards can be obtained from chests, which you get randomly by chatting in a Discord text channel.\n\nThe bot has a chance to respond to the sent message and offer a chest to the user with a random card.\n\nEach card has its own description, collection, and rarity.\n\nThe website is used to register for the project and access your cards, collections, and a marketplace, which allows users to exchange cards.\n\nThe website is being developed in Python Flask and the Discord bot in Python.`,
      },
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/TNGLore.webp",
      github: "https://github.com/Joseleelsuper/TNGLore",
      web: "https://tnglore.vercel.app/",
    },
    {
      title: "JoseleelBot",
      description: {
        es: `Es un bot de discord multitarea y de moderación. Algunas de sus funcionalidades son:\n- Reemplazar las URLs de redes sociales pasadas en canales de texto por URLs que arreglan los embeds en Discord.\n- Avisa a los amigos de las personas cuyo día es su cumpleaños.\n- Colabora con el proyecto de TNGLore para otorgar cofres a los usuarios que hablen por canales de texto.\n- Utiliza la API de Groq (IA) para que, con un comando, puedas ser respondido con inteligencia artificial.\n- Soporta ficheros de texto, imágenes y audios.`,
        en: `This is a multitasking and moderation Discord bot. Some of its features include:\n- Replacing social media URLs posted in text channels with URLs that fix embeds in Discord.\n- Notifying friends when it's someone's birthday.\n- Collaborating with the TNGLore project to award chests to users who chat in text channels.\n- Using the Groq API (AI) to respond to commands with artificial intelligence.\n- Supporting text files, images, and audio.`,
      },
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/JoseleelBot.webp",
    },
    {
      title: "Talf",
      description: {
        es: `Talf es el nombre del proyecto que hice durante la asignatura de Metodología de la programación (Mepro).\n\nSe trata de recrear dos juegos de mesa 'vikingos' llamados Brandubh y Ardri, los cuales elijes uno de los dos al iniciar el programa.\n\nDebía de ser desarrollado en Java-20 y comprobado su funcionamiento con test de JUnit.\n\nHa sido mi primer proyecto profesional de programación en el que se juntaron varias tareas, como mantener limpieza del código, manejo de excepciones y, sobretodo, el aprendizaje que conllevó hacer el juego.`,
        en: `Talf is the name of the project I did during the Programming Methodology (Mepro) course.\n\nIt involves recreating two 'Viking' board games called Brandubh and Ardri, one of which you choose when starting the program.\n\nIt had to be developed in Java-20 and its functionality verified with JUnit tests.\n\nThis was my first professional programming project that combined several tasks, such as maintaining code cleanliness, exception handling, and, above all, the learning experience that came with creating the game.`,
      },
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/Talf.webp",
      github: "https://github.com/Joseleelsuper/Ardri",
    },
    {
      title: "Hunt The Wumpus - Adaptación",
      description: {
        es: `Este proyecto es una adaptación del juego de Hunt The Wumpus, un juego de texto de los años 70.\n\nEstá adaptado para que un algoritmo maneje un agente inteligente para conseguir la victoria.\n\nEl agente gana si consigue el oro, y pierde si cae en la misma casilla que el Wumpus o algún pozo.`,
        en: `This project is an adaptation of the text-based game Hunt The Wumpus from the 70s.\n\nIt is adapted so that an algorithm controls an intelligent agent to achieve victory.\n\nThe agent wins if it gets the gold and loses if it falls into the same square as the Wumpus or a pit.`,
      },
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/Wumpus.webp",
      github: "https://github.com/Joseleelsuper/Hunt-The-Wumpus",
    },
  ];

  const carousel = document.querySelector("#proyectos .carousel");
  const prevButton = document.querySelector("#proyectos .carousel-button.prev");
  const nextButton = document.querySelector("#proyectos .carousel-button.next");
  let currentIndex = 0;

  function createProjectCard(project, index, language) {
    const card = document.createElement("div");
    card.className = "project-card";
    if (index === currentIndex) {
      card.classList.add("active");
    }
    // Mejorar visualización: dividir por dobles saltos de línea para párrafos y detectar listas
    const paragraphs = project.description[language].split(/\n\n+/);
    let descriptionHtml = "";
    paragraphs.forEach((paragraph) => {
      // Detectar si es una lista (líneas que empiezan por "-")
      if (/^- /.test(paragraph.trim()) || paragraph.trim().includes("\n- ")) {
        // Convertir en lista
        const items = paragraph
          .split(/\n/)
          .filter((line) => line.trim().startsWith("-"))
          .map((line) => `<li>${line.replace(/^- /, "").trim()}</li>`)
          .join("");
        descriptionHtml += `<ul>${items}</ul>`;
      } else {
        descriptionHtml += `<p>${paragraph.replace(/\n/g, " ")}</p>`;
      }
    });
    card.innerHTML = `
            <img src="${project.image}" alt="${
      project.title
    }" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-description">${descriptionHtml}</div>
                <div class="project-links">
                    ${
                      project.github
                        ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="material-icons">code</span></a>`
                        : ""
                    }
                    ${
                      project.web
                        ? `<a href="${project.web}" class="project-link" target="_blank" rel="noopener noreferrer"><span class="material-icons">language</span></a>`
                        : ""
                    }
                </div>
            </div>
        `;
    return card;
  }

  function updateProjectCarousel(language) {
    carousel.innerHTML = "";
    projects.forEach((project, index) => {
      const card = createProjectCard(project, index, language);
      carousel.appendChild(card);
    });
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateCarouselButtons(projects.length, prevButton, nextButton);
  }

  function moveProjectCarousel(direction) {
    currentIndex =
      (currentIndex + direction + projects.length) % projects.length;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateActiveCard(carousel, currentIndex);
  }

  prevButton.addEventListener("click", () => moveProjectCarousel(-1));
  nextButton.addEventListener("click", () => moveProjectCarousel(1));

  // Carrusel de certificaciones
  const certifications = [
    {
      title: "CS50's Introduction to Artificial Intelligence with Python",
      issuer: "HarvardX",
      image:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/certifications/GallardoCaballeroJose_CS50AIVerified.pdf",
      verifyLink:
        "https://courses.edx.org/certificates/975705ba7ff14d7a8d6718fe3e22a1d6",
      downloadLink:
        "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/certifications/GallardoCaballeroJose_CS50AIVerified.pdf",
    },
    {
      title:
        "TOP Scorer - Challenge Mejor Estudiante de Informática de España 2024",
      issuer: "Capgemini",
      verifyLink: "https://editx.eu/en/it-challenges/205",
    },
  ];

  const certCarousel = document.querySelector("#certificaciones .carousel");
  const certPrevButton = document.querySelector(
    "#certificaciones .carousel-button.prev"
  );
  const certNextButton = document.querySelector(
    "#certificaciones .carousel-button.next"
  );
  let currentCertIndex = 0;

  function createCertificationCard(certification, index, language) {
    const card = document.createElement("div");
    card.className = "certification-card";
    if (index === currentCertIndex) {
      card.classList.add("active");
    }
    card.innerHTML = `
            <div class="certification-image" ${
              certification.image ? `data-pdf="${certification.image}"` : ""
            }></div>
            <div class="certification-info">
                <h3 class="certification-title">${certification.title}</h3>
                <p class="certification-issuer">${certification.issuer}</p>
                <div class="certification-links">
                    <a href="${
                      certification.verifyLink
                    }" class="certification-link" target="_blank" rel="noopener noreferrer">
                        <span class="material-icons">verified</span>
                        ${language === "es" ? "Verificar" : "Verify"}
                    </a>
                    ${
                      certification.downloadLink
                        ? `
                        <a href="${
                          certification.downloadLink
                        }" class="certification-link" download>
                            <span class="material-icons">file_download</span>
                            ${
                              language === "es"
                                ? "Descargar Certificado"
                                : "Download Certificate"
                            }
                        </a>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
    return card;
  }

  function updateCertCarousel(language) {
    certCarousel.innerHTML = "";
    certifications.forEach((certification, index) => {
      const card = createCertificationCard(certification, index, language);
      certCarousel.appendChild(card);
    });
    certCarousel.style.transform = `translateX(-${currentCertIndex * 100}%)`;
    updateCarouselButtons(
      certifications.length,
      certPrevButton,
      certNextButton
    );
    renderPDFs();
  }

  function moveCertCarousel(direction) {
    currentCertIndex =
      (currentCertIndex + direction + certifications.length) %
      certifications.length;
    certCarousel.style.transform = `translateX(-${currentCertIndex * 100}%)`;
    updateActiveCard(certCarousel, currentCertIndex);
  }

  certPrevButton.addEventListener("click", () => moveCertCarousel(-1));
  certNextButton.addEventListener("click", () => moveCertCarousel(1));

  function updateCarouselButtons(totalItems, prevButton, nextButton) {
    const shouldHideButtons = totalItems <= 1;
    prevButton.classList.toggle("hidden", shouldHideButtons);
    nextButton.classList.toggle("hidden", shouldHideButtons);
  }

  function updateActiveCard(carouselElement, activeIndex) {
    const cards = carouselElement.querySelectorAll(
      ".project-card, .certification-card"
    );
    cards.forEach((card, index) => {
      if (index === activeIndex) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  }

  // Render PDFs as images - Versión mejorada
  function renderPDFs() {
    if (!window.pdfjsLib) {
      console.warn("PDF.js no está cargado correctamente");
      return;
    }

    const pdfElements = document.querySelectorAll("[data-pdf]");
    pdfElements.forEach((element) => {
      // Limpiar cualquier contenido existente para evitar duplicación
      element.innerHTML = "";

      const pdfUrl = element.dataset.pdf;

      // Verificar que la URL no sea undefined o vacía
      if (!pdfUrl || pdfUrl === "undefined") {
        console.warn("URL de PDF no válida o no definida");
        const fallbackMsg = document.createElement("div");
        fallbackMsg.textContent = "No hay vista previa disponible";
        fallbackMsg.style.padding = "20px";
        fallbackMsg.style.textAlign = "center";
        element.appendChild(fallbackMsg);
        return;
      }

      // Solo cargar PDFs desde URLs que comiencen con http:// o https://
      if (!pdfUrl.startsWith("http://") && !pdfUrl.startsWith("https://")) {
        console.warn("URL de PDF no válida:", pdfUrl);
        return;
      }

      // Usar try/catch para manejar errores
      try {
        window.pdfjsLib
          .getDocument(pdfUrl)
          .promise.then((pdf) => {
            return pdf.getPage(1);
          })
          .then((page) => {
            const scale = 0.5; // Reduced scale for smaller image
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            // Agregar atributos para accesibilidad
            canvas.setAttribute("role", "img");
            canvas.setAttribute("aria-label", "Vista previa del certificado");

            // Hacer responsive
            canvas.style.width = "100%";
            canvas.style.height = "auto";
            canvas.style.maxWidth = "500px";

            return page.render(renderContext).promise.then(() => canvas);
          })
          .then((canvas) => {
            // Limpiar el elemento nuevamente por si acaso
            element.innerHTML = "";
            element.appendChild(canvas);
          })
          .catch((err) => {
            console.error("Error al renderizar PDF:", err);
            const errorMsg = document.createElement("div");
            errorMsg.textContent = "Error al cargar la vista previa";
            errorMsg.style.padding = "20px";
            errorMsg.style.textAlign = "center";
            element.innerHTML = ""; // Limpiar cualquier contenido previo
            element.appendChild(errorMsg);
          });
      } catch (err) {
        console.error("Error al procesar PDF:", err);
      }
    });
  }

  // Cargar los recursos críticos de manera óptima
  function loadCriticalResources() {
    // Precarga de Material Icons (opcional)
    if (!document.querySelector('link[rel="preload"][href*="materialicons"]')) {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.href =
        "https://fonts.googleapis.com/icon?family=Material+Icons";
      preloadLink.as = "style";
      document.head.appendChild(preloadLink);
    }
  }

  // Internationalization
  const i18next = window.i18next;
  const languageDetector = new window.i18nextBrowserLanguageDetector();

  i18next.use(languageDetector).init(
    {
      fallbackLng: "en",
      supportedLngs: ["es", "en"],
      resources: {
        es: {
          translation: {
            header: {
              title: "Graduado Ingeniería Informática",
            },
            nav: {
              home: "Inicio",
              about: "Sobre mí",
              projects: "Proyectos",
              certifications: "Certificaciones",
            },
            home: {
              degree: "Graduado Ingeniería Informática",
              downloadCV: "Descargar CV",
            },
            about: {
              title: "Sobre mí",
              intro:
                "Me llamo José Gallardo Caballero. Vivo en León, pero actualmente estoy estudiando en la Escuela Politécnica Superior de la Universidad de Burgos.",
              skills:
                "Estoy familiarizado con la programación de distintos lenguajes como Python y Java, entre otros.",
              ai: "Sé crear IAs simples, que aprenden a realizar una tarea durante el transcurso de su vida con Python.",
              ambition:
                "Mi ambición es convertir problemas complejos en soluciones tecnológicas eficientes. Trabajando en equipo, he realizado proyectos que fortalecen mis habilidades analíticas y técnicas. Esta experiencia me impulsa a seguir creciendo profesionalmente y aportar significativamente al campo de la ingeniería informática.",
            },
            projects: {
              title: "Proyectos",
            },
            certifications: {
              title: "Certificaciones",
              verify: "Verificar",
              download: "Descargar PDF",
            },
          },
        },
        en: {
          translation: {
            header: {
              title: "Computer Engineering Student",
            },
            nav: {
              home: "Home",
              about: "About",
              projects: "Projects",
              certifications: "Certifications",
            },
            home: {
              degree: "Computer Engineering Graduate",
              downloadCV: "Download CV",
            },
            about: {
              title: "About Me",
              intro:
                "My name is José Gallardo Caballero. I live in León, but I'm currently studying at the Higher Polytechnic School of the University of Burgos.",
              skills:
                "I'm familiar with programming in various languages such as Python and Java, among others.",
              ai: "I know how to create simple AIs that learn to perform a task during their lifetime using Python.",
              ambition:
                "My ambition is to turn complex problems into efficient technological solutions. Working in teams, I have carried out projects that strengthen my analytical and technical skills. This experience drives me to continue growing professionally and contribute significantly to the field of computer engineering.",
            },
            projects: {
              title: "Projects",
            },
            certifications: {
              title: "Certifications",
              verify: "Verify",
              download: "Download PDF",
            },
          },
        },
      },
    },
    function (err, t) {
      updateContent(i18next.language);
      updateProjectCarousel(i18next.language);
      updateCertCarousel(i18next.language);
    }
  );

  function updateContent(language) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      element.textContent = i18next.t(key);
    });
    document.documentElement.lang = language;
    updateProjectCarousel(language);
    updateCertCarousel(language);
  }

  // Inicializar recursos
  loadCriticalResources();

  // Iniciar carruseles cuando el DOM esté listo
  updateProjectCarousel(i18next ? i18next.language : "es");

  // Evitar llamar a renderPDFs dos veces
  let pdfsRendered = false;
  function updateCertCarouselOptimized(language) {
    certCarousel.innerHTML = "";
    certifications.forEach((certification, index) => {
      const card = createCertificationCard(certification, index, language);
      certCarousel.appendChild(card);
    });
    certCarousel.style.transform = `translateX(-${currentCertIndex * 100}%)`;
    updateCarouselButtons(
      certifications.length,
      certPrevButton,
      certNextButton
    );

    // Solo renderizar PDFs si no se han renderizado antes o si se ha cambiado de idioma
    if (!pdfsRendered || i18next.language !== language) {
      pdfsRendered = true;
      renderPDFs();
    }
  }

  // Reemplazar la llamada original con la optimizada
  updateCertCarouselOptimized(i18next ? i18next.language : "es");

  // Si PDF.js está cargado, no necesitamos llamar a renderPDFs de nuevo aquí
  if (!window.pdfjsLib) {
    console.warn("PDF.js no está disponible");
    // Intentar cargar PDF.js si no está disponible
    window.addEventListener("pdfjsReady", renderPDFs);
  }
});
