/**
 * Datos de Proyectos
 * @description Lista de proyectos del portfolio
 */

const PROJECTS_DATA = [
  {
    title: "MKV-Translator",
    description: {
      es: `Aplicación web dedicada a traducir subítulos de un idioma ya existentes a cualquier otro idioma utilizando inteligencia artificial.\n\nLa traducción se hace desde el navegador del usuario y no desde un servidor externo.\n\nEl usuario pasa el vídeo en formato MKV con almenos un fichero de subtítulos ya existente y puede traducirlo cuantas veces quiera.\n\nSe puede hostear en local a través de un docker compose, además de necesitar una API Key de los servicios que proporcionan IA, como OpenAI o Groq, entre otros.\n\nDesarrollado con Python FastAPI en el backend y HTML, CSS y JavaScript Vanilla en el frontend para maximizar rendimiento y control sobre la interfaz de usuario.`,
      en: `Web application dedicated to translating existing subtitles from one language to any other language using artificial intelligence.\n\nThe translation is done from the user's browser and not from an external server.\n\nThe user uploads the MKV video file with at least one existing subtitle file and can translate it as many times as they want.\n\nIt can be hosted locally through a docker compose, and requires an API Key from AI service providers such as OpenAI or Groq, among others.\n\nDeveloped with Python FastAPI on the backend and HTML, CSS, and Vanilla JavaScript on the frontend to maximize performance and control over the user interface.`,
    },
    image:
      "https://cdn.jsdelivr.net/gh/joseleelsuper/Portfolio@main/assets/projects/MKV-Translator.webp",
    github: "https://github.com/Joseleelsuper/MKV-Translator",
  },
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
