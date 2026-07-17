import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'ATSIestudio',
    loadComponent: () => import('./pages/home/home').then(({ Home }) => Home),
    pathMatch: 'full',
  },
  {
    path: 'servicios',
    title: 'Servicios | ATSIestudio',
    loadComponent: () => import('./pages/services/services').then(({ Services }) => Services),
  },
  {
    path: 'servicios/desarrollo-web',
    title: 'Desarrollo web | ATSIestudio',
    loadComponent: () =>
      import('./pages/web-development/web-development').then(
        ({ WebDevelopment }) => WebDevelopment,
      ),
  },
  {
    path: 'servicios/desarrollo-personalizado',
    title: 'Desarrollo personalizado | ATSIestudio',
    loadComponent: () =>
      import('./pages/custom-development/custom-development').then(
        ({ CustomDevelopment }) => CustomDevelopment,
      ),
  },
  {
    path: 'servicios/mantenimiento',
    title: 'Mantenimiento web | ATSIestudio',
    loadComponent: () =>
      import('./pages/maintenance/maintenance').then(({ Maintenance }) => Maintenance),
  },
  {
    path: 'como-trabajamos',
    title: 'Cómo trabajamos | ATSIestudio',
    loadComponent: () => import('./pages/process/process').then(({ Process }) => Process),
  },
  {
    path: 'proyectos',
    title: 'Proyectos | ATSIestudio',
    loadComponent: () => import('./pages/projects/projects').then(({ Projects }) => Projects),
  },
  {
    path: 'sobre-atsi-estudio',
    title: 'Sobre ATSIestudio',
    loadComponent: () => import('./pages/about/about').then(({ About }) => About),
  },
  {
    path: 'contacto',
    title: 'Contacto | ATSIestudio',
    loadComponent: () => import('./pages/contact/contact').then(({ Contact }) => Contact),
  },
  {
    path: 'aviso-legal',
    title: 'Aviso legal | ATSIestudio',
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice').then(({ LegalNotice }) => LegalNotice),
  },
  {
    path: 'privacidad',
    title: 'Privacidad | ATSIestudio',
    loadComponent: () => import('./pages/privacy/privacy').then(({ Privacy }) => Privacy),
  },
  {
    path: 'cookies',
    title: 'Política de cookies | ATSIestudio',
    loadComponent: () => import('./pages/cookies/cookies').then(({ Cookies }) => Cookies),
  },
  {
    path: '**',
    title: 'Página no encontrada | ATSIestudio',
    loadComponent: () => import('./pages/not-found/not-found').then(({ NotFound }) => NotFound),
  },
];
