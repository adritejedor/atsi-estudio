import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Desarrollo web para pymes | ATSIestudio',
    data: {
      seo: {
        description:
          'Desarrollo web y aplicaciones a medida para pymes. Soluciones claras, profesionales y adaptadas a las necesidades reales de cada negocio.',
        canonicalPath: '/',
      },
    },
    loadComponent: () => import('./pages/home/home').then(({ Home }) => Home),
    pathMatch: 'full',
  },
  {
    path: 'servicios',
    title: 'Servicios de desarrollo web para pymes | ATSIestudio',
    data: {
      seo: {
        description:
          'Servicios de desarrollo web, software a medida, mantenimiento, hosting y dominios para autónomos, negocios locales y pymes.',
        canonicalPath: '/servicios',
      },
    },
    loadComponent: () => import('./pages/services/services').then(({ Services }) => Services),
  },
  {
    path: 'servicios/desarrollo-web',
    title: 'Desarrollo de páginas web para empresas | ATSIestudio',
    data: {
      seo: {
        description:
          'Diseño y desarrollo de páginas web profesionales para empresas que necesitan una presencia digital clara, rápida y preparada para crecer.',
        canonicalPath: '/servicios/desarrollo-web',
      },
    },
    loadComponent: () =>
      import('./pages/web-development/web-development').then(
        ({ WebDevelopment }) => WebDevelopment,
      ),
  },
  {
    path: 'servicios/desarrollo-personalizado',
    title: 'Desarrollo de software a medida | ATSIestudio',
    data: {
      seo: {
        description:
          'Aplicaciones web, integraciones y herramientas internas desarrolladas a medida para resolver procesos concretos de pequeñas y medianas empresas.',
        canonicalPath: '/servicios/desarrollo-personalizado',
      },
    },
    loadComponent: () =>
      import('./pages/custom-development/custom-development').then(
        ({ CustomDevelopment }) => CustomDevelopment,
      ),
  },
  {
    path: 'servicios/mantenimiento',
    title: 'Mantenimiento web para empresas | ATSIestudio',
    data: {
      seo: {
        description:
          'Mantenimiento web para mantener páginas y aplicaciones actualizadas, seguras y operativas con un alcance adaptado a cada proyecto.',
        canonicalPath: '/servicios/mantenimiento',
      },
    },
    loadComponent: () =>
      import('./pages/maintenance/maintenance').then(({ Maintenance }) => Maintenance),
  },
  {
    path: 'servicios/hosting-y-dominios',
    title: 'Gestión de hosting y dominios | ATSIestudio',
    data: {
      seo: {
        description:
          'Gestión de hosting, dominios, renovaciones y configuración técnica para centralizar la infraestructura digital de tu empresa.',
        canonicalPath: '/servicios/hosting-y-dominios',
      },
    },
    loadComponent: () =>
      import('./pages/hosting-domains/hosting-domains').then(
        ({ HostingDomains }) => HostingDomains,
      ),
  },
  {
    path: 'como-trabajamos',
    title: 'Cómo trabajamos en proyectos web | ATSIestudio',
    data: {
      seo: {
        description:
          'Conoce cómo organizamos un proyecto digital: análisis, alcance, propuesta, desarrollo, revisiones, entrega y acompañamiento posterior.',
        canonicalPath: '/como-trabajamos',
      },
    },
    loadComponent: () => import('./pages/process/process').then(({ Process }) => Process),
  },
  {
    path: 'proyectos',
    title: 'Proyectos de desarrollo web | ATSIestudio',
    data: {
      seo: {
        description:
          'Una selección de proyectos web desarrollados por ATSIestudio, con información verificable sobre el trabajo realizado en cada caso.',
        canonicalPath: '/proyectos',
      },
    },
    loadComponent: () => import('./pages/projects/projects').then(({ Projects }) => Projects),
  },
  {
    path: 'sobre-atsi-estudio',
    title: 'Sobre ATSIestudio | Desarrollo web en Segovia',
    data: {
      seo: {
        description:
          'ATSIestudio es un estudio de desarrollo web en Segovia que crea soluciones digitales claras y profesionales para pymes de España.',
        canonicalPath: '/sobre-atsi-estudio',
      },
    },
    loadComponent: () => import('./pages/about/about').then(({ About }) => About),
  },
  {
    path: 'contacto',
    title: 'Contacto y presupuesto | ATSIestudio',
    data: {
      seo: {
        description:
          'Cuéntanos qué necesita tu empresa y solicita una primera valoración para tu página web, aplicación, mantenimiento, hosting o dominio.',
        canonicalPath: '/contacto',
      },
    },
    loadComponent: () => import('./pages/contact/contact').then(({ Contact }) => Contact),
  },
  {
    path: 'aviso-legal',
    title: 'Aviso legal | ATSIestudio',
    data: {
      seo: {
        description:
          'Información legal sobre la titularidad, las condiciones de uso y la propiedad intelectual del sitio web de ATSIestudio.',
        canonicalPath: '/aviso-legal',
      },
    },
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice').then(({ LegalNotice }) => LegalNotice),
  },
  {
    path: 'privacidad',
    title: 'Privacidad | ATSIestudio',
    data: {
      seo: {
        description:
          'Información sobre el tratamiento de datos personales y los derechos de las personas usuarias de ATSIestudio.',
        canonicalPath: '/privacidad',
      },
    },
    loadComponent: () => import('./pages/privacy/privacy').then(({ Privacy }) => Privacy),
  },
  {
    path: 'cookies',
    title: 'Política de cookies | ATSIestudio',
    data: {
      seo: {
        description:
          'Información sobre las cookies, la analítica opcional y las tecnologías de seguridad utilizadas en ATSIestudio.',
        canonicalPath: '/cookies',
      },
    },
    loadComponent: () => import('./pages/cookies/cookies').then(({ Cookies }) => Cookies),
  },
  {
    path: '**',
    title: 'Página no encontrada | ATSIestudio',
    data: {
      seo: {
        description:
          'La página solicitada no está disponible. Regresa al inicio o consulta los servicios de ATSIestudio.',
        robots: 'noindex,nofollow',
      },
    },
    loadComponent: () => import('./pages/not-found/not-found').then(({ NotFound }) => NotFound),
  },
];
