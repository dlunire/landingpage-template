# Sara Construcción

Estructura del proyecto

```plaintext
sara-construcciones-landing/
├── api-backend/                 # Backend sobre el ecosistema DLUnire
│   ├── src/
│   │   ├── Routes/              # Definición de rutas (usando tu sistema DLRoute)
│   │   ├── Controllers/         # Despacho de JSON con el contenido temporal
│   │   │   └── LandingController.php
│   │   └── Core/
│   └── index.php
│
└── frontend-svelte/             # Frontend SPA (Svelte + TS + SCSS externo)
    ├── src/
    │   ├── assets/              # Isologotipo de Sara Construcciones y placeholders de obras
    │   ├── components/          # Componentes modulares de la Landing de Construcción
    │   │   ├── Navbar/          # Navegación principal (Inicio, Proyectos, Servicios, Contacto)
    │   │   │   ├── Navbar.svelte
    │   │   │   └── Navbar.scss
    │   │   ├── Hero/            # Impacto visual con propuesta de valor principal
    │   │   │   ├── Hero.svelte
    │   │   │   └── Hero.scss
    │   │   ├── AboutUs/         # Reseña de la constructora (Trayectoria, solidez y pilares)
    │   │   │   ├── AboutUs.svelte
    │   │   │   └── AboutUs.scss
    │   │   ├── Services/        # Grid de servicios (Obras civiles, Remodelaciones, Diseño Arquitectónico)
    │   │   │   ├── Services.svelte
    │   │   │   └── Services.scss
    │   │   ├── Projects/        # Galería o portafolio de proyectos destacados (en ejecución / entregados)
    │   │   │   ├── Projects.svelte
    │   │   │   └── Projects.scss
    │   │   ├── ContactForm/     # Formulario crítico para captación de leads e interesados
    │   │   │   ├── ContactForm.svelte
    │   │   │   └── ContactForm.scss
    │   │   └── Footer/          # Derechos, enlaces legales y redes sociales
    │   │       ├── Footer.svelte
    │   │       └── Footer.scss
    │   ├── styles/              # Preprocesamiento SCSS global
    │   │   ├── _variables.scss  # Colores (ej. Gris concreto, tonos tierra/óxido o azul estructural)
    │   │   ├── _mixins.scss     # Mixins de diseño responsivo y layouts
    │   │   └── global.scss      # Reset y estilos globales de tipografía
    │   ├── models/              # Interfaces de TypeScript para el tipado de los datos de la constructora
    │   │   └── landing.interface.ts
    │   ├── services/            # Cliente HTTP para conectar con la API de DLUnire
    │   │   └── api.service.ts
    │   ├── App.svelte           # Orquestador del Layout estructurado
    │   └── main.ts              # Inicialización de Svelte
    ├── tsconfig.json
    └── vite.config.ts
```

