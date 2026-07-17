# Implementation Plan

## Project

- Name: ATSIestudio
- Version: 1.0
- Date: 2026-07-16
- Prepared by: Codex, pendiente de aprobación humana

---

## 1. Project summary

### Business context

ATSIestudio es un estudio de Segovia que ofrece desarrollo web y de aplicaciones a autónomos, negocios locales y pymes españolas. La web debe convertir una oferta técnica potencialmente compleja en una propuesta comercial clara, ordenada y cercana, además de servir como escaparate de calidad y referencia técnica del propio estudio.

### Primary objective

Conseguir solicitudes de presupuesto mediante un formulario para contar un proyecto. La conversión secundaria es el contacto directo por correo electrónico. La web debe explicar servicios, metodología y precios orientativos antes de pedir la conversión, aunque los importes aún no están definidos.

### Target audience

- Autónomos, pequeñas empresas, negocios locales y pymes de España.
- Negocios sin presencia digital o con una web antigua.
- Empresas que necesitan aplicaciones web, integraciones o herramientas internas.
- Búsquedas comerciales nacionales y búsquedas locales relacionadas con Segovia.

### Scope summary

El núcleo obligatorio comprende inicio, servicios y sus páginas específicas, cómo trabajamos, contacto y formulario, con SEO técnico, responsive y accesibilidad AA. La especificación también incluye sobre ATSIestudio, proyectos o demostraciones, páginas legales, analítica con consentimiento, envío mediante Firebase Function, antispam, Firebase Hosting y una página 404; se planifican como entrega complementaria necesaria antes de producción cuando el contenido y la configuración estén disponibles.

Servicios a presentar:

- Desarrollo web.
- Desarrollo personalizado: aplicaciones, integraciones y herramientas internas cuando corresponda al servicio real.
- Mantenimiento web.

Incluido funcionalmente:

- Navegación responsive y enlaces de contacto.
- Formulario con validación y estados de carga, éxito y error.
- Metadatos por ruta, canonical, Open Graph, `sitemap.xml` y `robots.txt`.
- Privacidad, aviso legal y política de cookies.
- Google Analytics solo tras consentimiento cuando sea no esencial.
- Firebase Hosting y Function para el contacto.
- Protección básica contra spam.
- Imágenes optimizadas, accesibilidad y rendimiento.

Expresamente excluido de v1:

- Login, área privada, CMS y panel de administración.
- Blog, reservas, comercio electrónico y traducciones.
- Landing pages por sectores, FAQ ampliado y casos de éxito como línea editorial de V2.

Evolución futura, sin implementación ahora:

- Nuevas páginas SEO de servicios y sectores.
- Blog, guías, recursos y casos de éxito ampliados.
- Nuevas funcionalidades no descritas en la especificación.

### Visual direction

Diseño mobile-first, editorial y minimalista: blancos y grises claros, azul oscuro dominante y azul brillante reservado a acciones y énfasis. Tipografía sans-serif legible, titulares marcados, contenedores amplios, ritmo vertical generoso, tarjetas limpias, radios suaves y sombras discretas. Las imágenes y mockups serán apoyo, no protagonistas. Las animaciones se limitarán a `opacity` y `transform`, serán breves y respetarán `prefers-reduced-motion`. Deben evitarse estética futurista, plantilla genérica, saturación visual, glassmorphism, neumorfismo y efectos continuos.

### Content strategy

Puede generarse un primer borrador en español de España para propuesta de valor, descripción no factual de los tres servicios, problemas habituales, proceso, ventajas, CTA y FAQ básica, usando naturalmente las keywords aprobadas. Todo copy requiere revisión humana antes de producción.

Necesita aprobación humana: precios orientativos, metodología real, alcance exacto de cada servicio, tono final, FAQ y afirmaciones comerciales. No pueden inventarse clientes, testimonios, métricas, certificaciones, proyectos, resultados, datos legales, datos de contacto ni experiencia. Logo, fotografías, mockups y proyectos se tratarán como recursos pendientes; cualquier demostración conceptual deberá identificarse inequívocamente como tal.

---

## 2. Scope prioritization

### Mandatory MVP

- Inicio.
- Índice de servicios y páginas de desarrollo web, desarrollo personalizado y mantenimiento.
- Cómo trabajamos.
- Contacto, email directo y formulario frontend completo.
- Layout, navegación responsive y footer.
- SEO por ruta y base técnica indexable.
- Responsive y WCAG 2.2 AA como referencia.

### Included complementary before final delivery

- Sobre ATSIestudio.
- Proyectos o demostraciones, únicamente con material aprobado y sin convertirlos en casos de éxito ficticios.
- FAQ básica incluida en las secciones previstas.
- Páginas legales y 404.
- Analytics y consentimiento.
- Firebase Function, proveedor de email y antispam.
- Firebase Hosting, despliegue, rendimiento, QA y preparación de producción.

### Future evolution

- Casos de éxito como sección editorial ampliada, FAQ ampliado, blog y landing pages por sectores.
- Arquitectura SEO futura adicional: landing pages, web profesional, web avanzada, sectores, recursos y guías.
- Cualquier CMS, autenticación, administración, reservas, ecommerce o traducción.

---

## 3. Open questions

### Blocking

No bloquean la primera tarea técnica, pero sí las partes indicadas y la publicación profesional:

- [ ] Confirmar email público y email receptor. Impacto: bloquea los enlaces reales, la configuración de envío y la prueba extremo a extremo del contacto.
- [ ] Facilitar razón social o titular, NIF/CIF, domicilio, datos registrales si aplican y medios de contacto legales. Impacto: bloquea aviso legal, privacidad y revisión jurídica.
- [ ] Definir datos exactos del formulario, finalidad, base jurídica, plazos de conservación, destinatarios y derechos. Impacto: bloquea texto de privacidad, minimización de datos y backend final.
- [ ] Confirmar dominio canónico definitivo. Impacto: bloquea canonical, Open Graph absoluto, sitemap final, configuración de Hosting y verificación de producción.
- [ ] Confirmar proyecto Firebase, cuentas autorizadas, región de Functions y entornos. Impacto: bloquea backend, configuración cloud y despliegue.
- [ ] Elegir proveedor de envío de email y aportar credenciales mediante secretos. Impacto: bloquea Function funcional y tiene implicaciones de coste, residencia y privacidad.
- [ ] Aprobar mecanismo antispam y su tratamiento de datos. Impacto: bloquea la protección definitiva del endpoint público.
- [ ] Proporcionar ID/propiedad de Google Analytics y aprobar qué eventos medir. Impacto: bloquea analítica real y su validación.
- [ ] Validar textos legales y política de cookies con asesoramiento responsable. Impacto: bloquea publicación profesional cuando existan analítica o terceros no esenciales.

### Non-blocking

- [ ] Nombre escrito como “Atsi estudio” o “ATSIestudio”. Provisional: usar `ATSIestudio`, consistente con el repositorio; sustituible centralizando el nombre en contenido y metadatos.
- [ ] URL de referencia visual es `https://...`. Provisional: diseñar solo con los criterios textuales; incorporar la referencia posteriormente tras revisión, sin copiar componentes.
- [ ] Logo definitivo. Provisional: wordmark tipográfico textual accesible; reemplazar por SVG aprobado conservando nombre accesible y dimensiones.
- [ ] Fotografías e ilustraciones. Provisional: reservar únicamente ubicaciones que aporten valor y usar fondos/formas CSS durante desarrollo; sustituir por AVIF/WebP con dimensiones y `alt` aprobados. No publicar placeholders.
- [ ] Proyectos publicables y permiso de uso. Provisional: mantener la ruta fuera de navegación o presentar solo demostraciones aprobadas y rotuladas como conceptuales; nunca simular clientes o resultados.
- [ ] Precios orientativos. Provisional: preparar la estructura de contenido sin importes y no afirmar precios; insertar rangos aprobados antes de cerrar el copy, ya que la claridad de precios es objetivo comercial.
- [ ] Metodología y alcance contractual reales. Provisional: borrador genérico basado solo en claridad, fases y revisión; someterlo a aprobación antes de considerarlo final.
- [ ] Fuente tipográfica. Provisional: pila del sistema para evitar descargas y privacidad; una fuente alojada localmente puede sustituirla tras aprobar familia, licencia, formatos y pesos.
- [ ] Campos del formulario. Provisional reversible para prototipo frontend: nombre, email, empresa opcional, tipo de proyecto, mensaje y aceptación de privacidad; no conectar ni publicar hasta confirmar minimización y textos.
- [ ] Firestore para leads. Provisional recomendada: no almacenar leads; enviar el correo y conservar solo registros técnicos sin datos personales. Añadir Firestore únicamente con necesidad, política de retención, reglas y autorización explícita.
- [ ] Entornos. Provisional: desarrollo local y producción; añadir staging solo si el flujo de revisión lo necesita, manteniendo configuraciones separadas y sin secretos en Git.
- [ ] Estrategia exacta SSR/prerender compatible con Firebase Hosting. Provisional: conservar prerender del starter para rutas estáticas y evaluar Function/adapter solo cuando se elija el despliegue; la web corporativa no necesita SSR dinámico.
- [ ] La página “Proyectos” aparece en v1, mientras “casos de éxito” es V2. Provisional: tratar v1 como escaparate limitado de demostraciones claramente identificadas, sujeto a material aprobado; reservar casos detallados y resultados para V2.
- [ ] La referencia pide fotografía grande, pero identidad indica que ninguna fotografía enorme debe dominar. Provisional: priorizar la regla detallada de identidad y usar medios de apoyo contenidos.
- [ ] Consentimiento: confirmar si solo habrá Analytics o más cookies/terceros. Provisional: no cargar ningún script no esencial antes de consentimiento y ofrecer rechazar/aceptar con igual claridad y revocación posterior.

---

## 4. Proposed architecture

### Routes

```text
/
├── /servicios
│   ├── /servicios/desarrollo-web
│   ├── /servicios/desarrollo-personalizado
│   └── /servicios/mantenimiento
├── /como-trabajamos
├── /proyectos
├── /sobre-atsi-estudio
├── /contacto
├── /aviso-legal
├── /privacidad
├── /cookies
└── /** (404)
```

Cada página será un componente standalone cargado con `loadComponent`. Las URLs son minúsculas, descriptivas y asignan una intención principal a cada servicio. La ruta de proyectos queda condicionada a contenido aprobado, pero está prevista porque figura en la arquitectura v1.

### Suggested source structure

```text
src/app/
├── app.ts | app.html | app.scss
├── app.config.ts | app.config.server.ts
├── app.routes.ts | app.routes.server.ts
├── layout/
│   ├── site-header.*
│   └── site-footer.*
├── pages/
│   ├── home/
│   ├── services/
│   ├── web-development/
│   ├── custom-development/
│   ├── maintenance/
│   ├── process/
│   ├── projects/
│   ├── about/
│   ├── contact/
│   ├── legal-notice/
│   ├── privacy/
│   ├── cookies/
│   └── not-found/
├── contact/             # solo cuando existan modelo, formulario y gateway reales
└── seo/                 # solo el servicio mínimo de metadatos compartidos
```

No se crearán carpetas `core`, `shared` o `features`. CTA, tarjetas o secciones permanecerán en su página hasta demostrar reutilización real; entonces se extraerá el componente concreto, no una biblioteca genérica.

### Main components

- `App`: shell con salto al contenido, cabecera, `router-outlet` y footer.
- `SiteHeader`: marca, navegación primaria, CTA y menú responsive con botón nativo, estado local mediante signal, Escape y gestión de foco cuando proceda.
- `SiteFooter`: navegación secundaria, contacto confirmado y enlaces legales.
- Un componente standalone por ruta: contenido semántico y un solo `h1`.
- `ContactForm`, cuando se implemente: formulario reactivo tipado, validación, prevención de doble envío y estados accesibles.
- Componentes adicionales solo tras comprobar uso en al menos dos contextos y una responsabilidad concreta.

### Services

- `SeoService`: aplicar por navegación title, description, canonical, Open Graph y robots excepcionales; los datos únicos se declararán junto a la ruta o página.
- `ContactService`: encapsular POST al endpoint de la Function, tipos y errores; se añadirá únicamente en la fase backend.
- `ConsentService`: persistir preferencia y exponer estado para carga condicional de Analytics; sin gestor externo si solo existe una categoría no esencial.

### Models

- `PageMetadata`: title, description, canonical path, Open Graph y robots opcional.
- `ContactRequest`: únicamente campos aprobados y necesarios.
- `ContactStatus`: estados explícitos `idle`, `submitting`, `success` y `error`.
- `ConsentPreferences`: versión y elección de analítica, sin datos identificativos.

### Layout and responsive

Shell global con landmarks, enlace de salto, cabecera y footer. Mobile-first y breakpoints definidos por quiebre real del contenido, no por dispositivos. Grid/Flex, contenedor máximo coherente, tipografía fluida con límites, touch targets razonables, zoom al 200 %, contenido largo y navegación por teclado. El menú no dependerá de hover ni de ARIA innecesaria.

### Content

Copy visible junto a cada página para mantener edición simple e indexación/prerender. Los datos repetidos y reales —navegación, servicios resumidos o metadatos— podrán vivir en constantes tipadas solo si eliminan duplicación comprobada. No se propone CMS ni fuente remota.

### Styling

`styles.scss` contendrá reset mínimo, base tipográfica, custom properties de marca/espaciado necesarias, contenedor y focus global. Cada componente conservará SCSS local. Selectores simples, baja especificidad, sin `!important`, sin framework interno. Iconos pequeños mediante SVG propio revisado o CSS cuando aporte valor, no mediante paquete completo.

### SEO

- Prerender de todas las rutas públicas estáticas, aprovechando SSR/hydration ya configurados y revisando la estrategia antes de Firebase.
- Metadata única, canonical con dominio confirmado, Open Graph y `lang="es"`.
- Un `h1` e intención por URL; enlazado interno entre índice y servicios.
- `sitemap.xml` y `robots.txt` estáticos generados/revisados con URLs definitivas.
- 404 accesible; validar comportamiento HTTP/fallback en Hosting.
- JSON-LD solo con `Organization`/`ProfessionalService` si los datos visibles y reales permiten un schema válido; nunca ratings o reseñas inventados.

### Data and privacy

Recogida mínima, aviso por capas junto al formulario, consentimiento explícito cuando corresponda, validación cliente/servidor y ningún secreto en frontend. No registrar mensajes ni emails. Por defecto no usar Firestore: el endpoint envía al buzón confirmado. Analytics no se descarga antes del consentimiento; la preferencia se guarda localmente, se puede revocar y no contiene datos personales.

### External integrations

- Firebase Functions: endpoint POST con validación, límites, antispam, secretos y proveedor de correo; región pendiente.
- Firebase Hosting: estáticos/prerender, HTTPS, headers, caché, rewrites y dominio; configuración pendiente.
- Google Analytics: SPA page views y eventos de formulario sin PII, cargados tras consentimiento; ID pendiente.
- Proveedor de email: API desde Function, nunca desde Angular; elección pendiente.

---

## 5. Dependencies

### Existing

- Angular 21 (`core`, `common`, `forms`, `router`, browser/server): aplicación, routing, formularios, renderizado e hidratación.
- Angular SSR 21 y Express 5: servidor/prerender del starter.
- RxJS 7.8 y tslib: soporte Angular y flujos asíncronos.
- Angular CLI/build 21, TypeScript 5.9: compilación estricta y tooling.
- ESLint 10, angular-eslint 21 y typescript-eslint 8: lint TypeScript/template y accesibilidad estática.
- Prettier 3 y organize-imports: formato.
- Vitest 4 y jsdom 27: pruebas unitarias.

### Proposed

#### Firebase CLI (herramienta de desarrollo, no dependencia de runtime Angular)

- Need: inicializar emuladores, Functions y Hosting; desplegar al proyecto aprobado.
- Why native is insufficient: Angular y el navegador no administran infraestructura Firebase.
- Alternative: consola y Google Cloud CLI, con mayor trabajo manual.
- Approximate impact: tooling de desarrollo; sin peso en el bundle cliente si se mantiene fuera del runtime.
- Install timing: fase 14/16, después de confirmar proyecto, región y estrategia de despliegue.
- Recommendation: aprobar cuando comience Firebase, preferiblemente ejecución versionada/documentada; no instalar ahora.

#### Firebase Functions SDK and Admin SDK (backend only)

- Need: definir y ejecutar la Function y acceder a servicios de servidor si fueran necesarios.
- Why native is insufficient: forman parte del runtime y contratos de Firebase Functions.
- Alternative: endpoint en otro proveedor; cambiaría la infraestructura especificada.
- Approximate impact: solo bundle/backend de Functions, no Angular cliente.
- Install timing: fase 14, en workspace/backend separado según la estructura generada por Firebase.
- Recommendation: aprobar en esa fase; evitar `firebase` en el frontend salvo necesidad demostrada.

#### SDK del proveedor de email, por decidir

- Need: entrega autenticada y observable de mensajes.
- Why native is insufficient: `fetch` puede llamar una API, pero un SDK oficial puede tipar errores y autenticación; no es imprescindible.
- Alternative: API REST con `fetch` nativo desde la Function.
- Approximate impact: backend únicamente, variable por proveedor.
- Install timing: después de seleccionar proveedor y revisar mantenimiento, licencia, residencia, coste y tamaño.
- Recommendation: evitar por defecto y usar REST si es simple; aprobar solo si el SDK reduce riesgo real.

#### Protección antispam de terceros, por decidir

- Need: reducir abuso automatizado si honeypot, rate limiting y validación no bastan.
- Why native is insufficient: una prueba de riesgo o reputación requiere servicio externo.
- Alternative: honeypot accesible, límite por IP/ventana, validación servidor y monitorización.
- Approximate impact: script/red/privacidad en cliente y backend; puede afectar consentimiento, UX y CSP.
- Install timing: fase 15 tras medir el riesgo.
- Recommendation: evitar inicialmente un widget invasivo; aprobar un servicio solo si la protección básica resulta insuficiente.

#### Google Analytics script

- Need: medición de navegación SPA y conversiones solicitada en el alcance.
- Why native is insufficient: métricas agregadas requieren plataforma de analítica; los eventos del navegador por sí solos no crean informes.
- Alternative: analítica privacy-first aprobada o métricas de servidor; supondría cambiar el requisito.
- Approximate impact: script de tercero, red, privacidad y rendimiento; carga diferida tras consentimiento.
- Install timing: fase 13 tras ID, eventos y textos legales.
- Recommendation: aprobar la integración sin wrapper npm; evitar librería Angular adicional.

No se recomiendan librerías UI, Tailwind, Bootstrap, PrimeNG, paquetes de animación, iconos completos, estado global, gestor de consentimiento genérico ni Firebase cliente en esta versión.

---

## 6. Implementation phases

## Phase 1 — Starter validation and cleanup

### Objective

Obtener una base Angular coherente y verificable sin recrear el proyecto.

### Scope

- Instalar las dependencias ya bloqueadas por `package-lock.json` en una tarea autorizada posterior.
- Revisar y corregir formato/configuración inicial solo donde falle.
- Sustituir el estado de bienvenida por el shell mínimo y alinear/eliminar expectativas obsoletas del test.
- Confirmar SSR/prerender, strict mode y baseline de build.

### Files expected

- `src/app/app.ts`, `src/app/app.html`, `src/app/app.scss`, `src/app/app.spec.ts`
- Solo si la validación demuestra necesidad: archivos de configuración existentes.

### Dependencies

- Dependencias existentes del lockfile; no añadir paquetes.

### Acceptance criteria

- [ ] Starter sin contenido o tests de bienvenida inconsistentes.
- [ ] `npm run lint`, `npm run format:check`, `npm test -- --run` y build pasan.
- [ ] No se ha recreado ni sustituido el proyecto.

### Risks

- La instalación puede revelar incompatibilidades entre ESLint 10 y typescript-eslint 8; no desactivar reglas para ocultarlas.

### Pending information

- Ninguna comercial.

### Validation

- `node --version`, `npm.cmd --version`, `npm.cmd ci`, `npm.cmd run validate`, `npm.cmd test -- --run`.

## Phase 2 — Route structure and global layout

### Objective

Crear el árbol lazy y el shell semántico verificable.

### Scope

- Rutas públicas, componentes de página mínimos, 404, shell, skip link, cabecera y footer estructurales.
- Mantener la ruta proyectos condicionada a contenido aprobado.

### Files expected

- `src/app/app.routes.ts`, `src/app/app.html`
- `src/app/layout/site-header.*`, `src/app/layout/site-footer.*`
- `src/app/pages/*/*`

### Dependencies

- Fase 1; sin paquetes nuevos.

### Acceptance criteria

- [ ] Todas las rutas cargan de forma lazy, tienen un landmark principal y 404.
- [ ] Navegación y skip link funcionan con teclado.
- [ ] No existen carpetas o componentes genéricos sin uso.

### Risks

- Crear demasiado contenido provisional; en esta fase basta estructura mínima explícita y no publicable.

### Pending information

- Decisión provisional sobre visibilidad de `/proyectos`.

### Validation

- `npm.cmd run validate`, prueba manual de rutas, teclado y fallback.

## Phase 3 — Visual foundations and global styles

### Objective

Definir los fundamentos visuales mínimos de la marca sin construir un design system.

### Scope

- Reset mínimo, colores, tipografía, spacing necesario, contenedor, focus, botones/enlaces base.
- Mobile-first, contraste AA y reduced motion.

### Files expected

- `src/styles.scss`; SCSS del shell solo cuando corresponda.

### Dependencies

- Fase 2.

### Acceptance criteria

- [ ] Tokens limitados a valores realmente repetidos.
- [ ] Contraste, focus, zoom 200 % y overflow comprobados.
- [ ] Sin fuente remota ni dependencia visual no aprobada.

### Risks

- Paleta y logo no están aprobados; conservar valores fácilmente sustituibles.

### Pending information

- Logo, tipografía y códigos de color finales.

### Validation

- `npm.cmd run validate`; inspección móvil/escritorio, contraste y reduced motion.

## Phase 4 — Header and responsive navigation

### Objective

Completar una navegación clara, accesible y responsive orientada al contacto.

### Scope

- Marca, enlaces, estado activo, CTA, menú móvil con signal, Escape y focus.

### Files expected

- `src/app/layout/site-header.ts`, `.html`, `.scss`, `.spec.ts`.

### Dependencies

- Fases 2–3.

### Acceptance criteria

- [ ] Funciona con teclado, puntero y touch; estado expandido se anuncia correctamente.
- [ ] Focus visible y sin trampas; resize/navegación no deja estados incoherentes.
- [ ] CTA conduce a contacto.

### Risks

- Sobrecomplicar el menú con patrones ARIA; preferir botón y navegación nativos.

### Pending information

- Wordmark/logo final.

### Validation

- Tests de estado esenciales, `npm.cmd run validate`, teclado y breakpoints reales.

## Phase 5 — Home page

### Objective

Comunicar qué hace ATSIestudio, para quién y cómo iniciar una solicitud.

### Scope

- Hero, propuesta de valor, problemas, servicios, proceso, ventajas, proyectos/demos solo si están aprobados, FAQ básica, CTA final.
- Copy en español de España, directo y basado en hechos conocidos.

### Files expected

- `src/app/pages/home/home.*`; assets aprobados en `public/`.

### Dependencies

- Fases 3–4; borrador de copy revisable.

### Acceptance criteria

- [ ] Un `h1`, jerarquía correcta, CTA primario al formulario y enlaces descriptivos.
- [ ] No hay cifras, clientes, testimonios, precios o resultados inventados.
- [ ] La keyword principal aparece de forma natural, no repetitiva.

### Risks

- Falta copy y material visual final.

### Pending information

- Precios, metodología, recursos y aprobación del copy.

### Validation

- `npm.cmd run validate`, lectura editorial, teclado, responsive, headings y Lighthouse preliminar.

## Phase 6 — Service pages

### Objective

Cubrir las intenciones comerciales específicas y explicar servicios y precios orientativos aprobados.

### Scope

- Índice, desarrollo web, desarrollo personalizado y mantenimiento.
- Problema, destinatario, alcance real, proceso, orientación de precio aprobada, FAQ relevante y CTA.

### Files expected

- `src/app/pages/services/*`
- `src/app/pages/web-development/*`
- `src/app/pages/custom-development/*`
- `src/app/pages/maintenance/*`

### Dependencies

- Fase 5; definición comercial de servicios.

### Acceptance criteria

- [ ] Cada URL tiene intención, `h1`, contenido y enlazado interno únicos.
- [ ] Límites y precios no exceden la oferta aprobada.
- [ ] No se duplica texto para rellenar páginas.

### Risks

- Canibalización SEO o promesas comerciales no validadas.

### Pending information

- Alcance y rangos de precio de cada servicio.

### Validation

- `npm.cmd run validate`, revisión SEO/editorial y responsive.

## Phase 7 — “Cómo trabajamos” page

### Objective

Reducir incertidumbre mostrando un proceso transparente y real.

### Scope

- Fases, responsabilidades, comunicación, revisiones, entrega y siguiente paso, solo tras validación comercial.

### Files expected

- `src/app/pages/process/process.*`.

### Dependencies

- Fundamentos y metodología aprobada.

### Acceptance criteria

- [ ] Proceso claro y accionable, sin compromisos contractuales inventados.
- [ ] Listas y headings semánticos; CTA a contacto.

### Risks

- Presentar un proceso provisional como política real.

### Pending information

- Metodología, plazos y reglas de revisión reales.

### Validation

- `npm.cmd run validate`, revisión humana de contenido y teclado.

## Phase 8 — “Sobre ATSIestudio” page

### Objective

Generar confianza con información auténtica sobre el estudio.

### Scope

- Enfoque, ubicación, valores y forma de colaboración; sin biografía o credenciales inventadas.

### Files expected

- `src/app/pages/about/about.*`; imagen aprobada opcional.

### Dependencies

- Datos humanos/comerciales aprobados.

### Acceptance criteria

- [ ] Solo contiene afirmaciones verificadas.
- [ ] Refuerza claridad, cercanía y profesionalidad sin frases vacías.

### Risks

- El spec aporta pocos datos diferenciadores.

### Pending information

- Historia, equipo, experiencia y fotografía que puedan publicarse.

### Validation

- `npm.cmd run validate`, revisión factual/editorial y de imágenes.

## Phase 9 — Projects page

### Objective

Resolver la página prevista sin convertir contenido conceptual en casos reales.

### Scope

- Inventario de proyectos autorizados o demostraciones rotuladas; alcance, rol y enlace solo cuando sean reales.
- Si no hay contenido suficiente, acordar ocultar la ruta de navegación hasta una entrega posterior, sin inventar relleno.

### Files expected

- `src/app/pages/projects/projects.*`; assets aprobados.

### Dependencies

- Permisos, clasificación y material de proyectos.

### Acceptance criteria

- [ ] Cada elemento indica claramente si es real o conceptual.
- [ ] No hay clientes, métricas, testimonios o resultados ficticios.
- [ ] Imágenes optimizadas con dimensiones y texto alternativo.

### Risks

- Contradicción entre página v1 y casos de éxito V2; daño reputacional si se etiqueta mal.

### Pending information

- Proyectos publicables, permisos y decisión sobre conceptuales.

### Validation

- `npm.cmd run validate`, revisión factual, permisos y peso de medios.

## Phase 10 — Contact page and frontend form

### Objective

Crear el flujo principal completo en frontend, aún desacoplado del proveedor definitivo.

### Scope

- Email directo confirmado, formulario reactivo tipado, labels, autocomplete, validación, privacidad, estados y prevención de doble envío.
- Contrato del gateway preparado, sin simular éxito en producción.

### Files expected

- `src/app/pages/contact/contact.*`
- `src/app/contact/contact-form.*`, `contact.models.ts`, `contact.service.ts` cuando exista endpoint.

### Dependencies

- Datos y política aprobados; Angular Forms existente.

### Acceptance criteria

- [ ] Solo recoge datos necesarios; errores específicos y asociados.
- [ ] Loading, éxito y error son visibles y anunciados sin depender del color.
- [ ] Teclado, autofill, doble envío y fallo de red están cubiertos.

### Risks

- Privacidad y contrato del backend incompletos.

### Pending information

- Campos, email, finalidad, retención, textos y endpoint.

### Validation

- Tests unitarios del flujo, `npm.cmd run validate`, teclado y lector de pantalla en flujo crítico.

## Phase 11 — Legal pages

### Objective

Publicar documentos legales navegables y coherentes con el tratamiento real.

### Scope

- Aviso legal, privacidad y cookies; enlaces persistentes desde footer/formulario/banner.

### Files expected

- `src/app/pages/legal-notice/*`, `privacy/*`, `cookies/*`.

### Dependencies

- Datos y textos revisados por persona competente; decisiones de formulario/Analytics/proveedores.

### Acceptance criteria

- [ ] Textos completos, aprobados y coherentes con el comportamiento técnico.
- [ ] Enlaces accesibles desde los puntos relevantes.

### Risks

- La implementación no sustituye asesoramiento legal.

### Pending information

- Todos los datos legales y tratamientos enumerados como bloqueantes.

### Validation

- `npm.cmd run validate`, revisión jurídica/humana y comprobación de enlaces.

## Phase 12 — Technical SEO and route metadata

### Objective

Hacer cada ruta pública indexable, única y compartible.

### Scope

- Titles, descriptions, canonical, OG, idioma, headings, enlazado, sitemap, robots, 404 y prerender.
- JSON-LD solo si es verificable.

### Files expected

- `src/app/seo/*`, rutas/páginas afectadas, `src/index.html`, `public/robots.txt`, `public/sitemap.xml`.

### Dependencies

- Dominio, copy y rutas finales.

### Acceptance criteria

- [ ] Metadata única y URLs absolutas correctas.
- [ ] Sitemap solo incluye rutas indexables; robots referencia el sitemap.
- [ ] HTML prerenderizado contiene contenido y metadata esperados.

### Risks

- Canonical erróneo en entornos no productivos o rutas vacías indexadas.

### Pending information

- Dominio, imagen social y datos estructurados reales.

### Validation

- Build, inspección de `dist`, validadores sitemap/robots/schema, Lighthouse SEO y enlaces rotos.

## Phase 13 — Analytics and consent

### Objective

Medir navegación y conversiones sin cargar analítica antes de una elección válida.

### Scope

- Banner/panel mínimo, aceptar/rechazar equivalente, persistencia/versionado, revocación, carga condicional y eventos SPA/formulario sin PII.

### Files expected

- `src/app/consent/*`, configuración de app/layout y política de cookies.

### Dependencies

- ID Analytics, eventos, textos y criterio legal aprobados.

### Acceptance criteria

- [ ] Cero requests de Analytics antes de consentimiento.
- [ ] Rechazar es tan accesible como aceptar; preferencia revocable.
- [ ] No se envían email, nombre, mensaje ni otros datos personales.

### Risks

- Doble page view en SPA/hidratación, impacto de terceros y cambios regulatorios.

### Pending information

- Propiedad/ID, eventos, retención y aprobación legal.

### Validation

- Red del navegador en aceptar/rechazar/revocar, navegación SPA, `npm.cmd run validate`, teclado y CSP.

## Phase 14 — Firebase Function and contact delivery

### Objective

Enviar solicitudes validadas desde backend sin exponer secretos.

### Scope

- Proyecto Functions, endpoint POST, validación server-side, CORS/origen, límites de payload, proveedor, secretos, respuesta tipada y logs sin PII.
- No Firestore salvo aprobación posterior explícita.

### Files expected

- Directorio/configuración de Functions generado de forma controlada, archivos de entorno de ejemplo sin secretos y servicio Angular de contacto.

### Dependencies

- Firebase Functions/Admin y proveedor aprobado; fases 10–11.

### Acceptance criteria

- [ ] Validación cliente y servidor; secretos solo en secret manager/configuración segura.
- [ ] Éxito, rechazo y fallo del proveedor se manejan sin filtrar detalles.
- [ ] Email llega al receptor en emulador/entorno autorizado y no se registran datos personales.

### Risks

- Abuso, costes, CORS, cold starts, cuotas, residencia y entregabilidad.

### Pending information

- Proyecto, región, proveedor, remitente, receptor, secretos y entornos.

### Validation

- Emulator Suite, tests del handler, payloads inválidos/grandes, fallo de proveedor, `npm.cmd run validate` en ambos workspaces.

## Phase 15 — Spam protection

### Objective

Proteger el endpoint con medidas proporcionadas y accesibles.

### Scope

- Honeypot no expuesto a tecnología asistiva, control temporal, rate limiting server-side y monitorización; servicio de reto solo si se justifica.

### Files expected

- Formulario y Function; configuración del proveedor solo si se aprueba.

### Dependencies

- Fase 14 y decisión de riesgo/proveedor.

### Acceptance criteria

- [ ] Automatismos básicos se rechazan sin perjudicar el flujo normal.
- [ ] La validación crítica ocurre en servidor y no revela reglas explotables.
- [ ] La solución cumple accesibilidad y privacidad.

### Risks

- Falsos positivos, bypass, IP compartida y coste/privacidad de terceros.

### Pending information

- Volumen esperado, tolerancia y proveedor si la base no basta.

### Validation

- Pruebas de honeypot, frecuencia, duplicados y flujo legítimo; logs agregados sin PII.

## Phase 16 — Firebase Hosting

### Objective

Configurar un despliegue repetible, seguro y compatible con prerender/SPA.

### Scope

- Proyecto/targets, build output, rewrites, 404, headers, caché, HTTPS, dominio y separación de entornos.

### Files expected

- `firebase.json`, `.firebaserc` o alternativa segura, documentación/env examples; nunca credenciales.

### Dependencies

- Proyecto Firebase, dominio y estrategia SSR/prerender.

### Acceptance criteria

- [ ] Deep links, assets, 404, canonical y Function funcionan en preview/producción.
- [ ] Assets con hash tienen caché larga; HTML no queda obsoleto.
- [ ] Deploy reproducible y sin secretos versionados.

### Risks

- Confundir proyectos/entornos o desplegar canonical de producción en preview.

### Pending information

- IDs, permisos, dominio, entornos y decisión de renderizado.

### Validation

- Preview channel, navegación directa a todas las rutas, headers, HTTPS, Function y rollback documentado.

## Phase 17 — Cross-cutting responsive and accessibility review

### Objective

Validar WCAG 2.2 AA y experiencia diseñada en móvil, tablet y escritorio.

### Scope

- Semántica, headings, teclado, focus, zoom, reflow, contraste, touch, formularios, alt, movimiento y contenido largo.

### Files expected

- Solo componentes/estilos con hallazgos; informe QA si se adopta plantilla en fase posterior.

### Dependencies

- Todas las páginas y flujos funcionales.

### Acceptance criteria

- [ ] Flujo completo operable por teclado y revisión con tecnología asistiva en contacto.
- [ ] 200 % zoom/reflow sin pérdida ni scroll horizontal indebido.
- [ ] Lighthouse Accessibility >95 y revisión manual AA sin problemas críticos conocidos.

### Risks

- Una puntuación automática no demuestra conformidad.

### Pending information

- Dispositivos y tecnología asistiva disponibles para QA.

### Validation

- Teclado, lector de pantalla disponible, axe/Lighthouse si se aprueba tooling, navegadores soportados y reduced motion.

## Phase 18 — Performance

### Objective

Cumplir objetivos orientativos midiendo rutas principales y corrigiendo cuellos reales.

### Scope

- Lighthouse, bundles, LCP/CLS, imágenes, fuentes, lazy routes, scripts terceros, caché y render.

### Files expected

- Solo archivos implicados por medición; assets optimizados.

### Dependencies

- Build casi final y entorno representativo.

### Acceptance criteria

- [ ] Performance >90, Accessibility/Best Practices/SEO >95 cuando contenido y terceros lo permitan.
- [ ] AVIF/WebP, dimensiones reservadas y lazy loading fuera de viewport.
- [ ] Sin dependencias o recursos no usados y sin regresiones de consola.

### Risks

- Analytics, antispam, red y dispositivo alteran resultados; documentar condiciones.

### Pending information

- Assets finales y terceros definitivos.

### Validation

- Build production, Lighthouse móvil repetido, análisis de bundle disponible y Network/Performance.

## Phase 19 — QA

### Objective

Comprobar alcance, contenido, funcionalidad y compatibilidad antes de release.

### Scope

- Rutas, enlaces, formulario extremo a extremo, consentimiento, 404, metadata, contenido, consola, responsive y últimas dos versiones de Chrome, Edge, Firefox y Safari.

### Files expected

- Tests afectados y reporte QA según `.atsi/templates/qa-report-template.md` cuando se autorice.

### Dependencies

- Fases anteriores y entorno preview.

### Acceptance criteria

- [ ] Cero defectos críticos/altos abiertos y ningún contenido temporal o enlace roto.
- [ ] `npm run validate` y tests relevantes pasan.
- [ ] Alcance incluido verificado; exclusiones no implementadas.

### Risks

- Safari requiere hardware/servicio disponible; registrar cualquier cobertura ausente.

### Pending information

- Responsables de revisión comercial, legal y dispositivos de prueba.

### Validation

- Matriz manual, tests automáticos, consola/red, validadores SEO y flujo real de correo.

## Phase 20 — Production readiness

### Objective

Cerrar contenido, legal, configuración, documentación y release verificable.

### Scope

- Aprobaciones, secretos, dominio, backups/rollback, presupuestos cloud, monitorización mínima, documentación y checklist de release.

### Files expected

- README/documentación básica y reporte de release; configuración final autorizada.

### Dependencies

- QA aprobado y autoridad de despliegue.

### Acceptance criteria

- [ ] Copy, recursos, datos comerciales y legales aprobados; no quedan placeholders.
- [ ] Dominio, HTTPS, Analytics/consentimiento, envío y antispam verificados en producción.
- [ ] Documentación cubre desarrollo, build, deploy, secretos y rollback sin exponerlos.

### Risks

- Publicar sin aprobación jurídica/comercial o en el proyecto Firebase incorrecto.

### Pending information

- Aprobación final, ventana de publicación y responsables operativos.

### Validation

- `.atsi/checklists/release.md`, `npm.cmd run validate`, smoke test post-deploy, Lighthouse y verificación de conversiones.

---

## 7. Global acceptance criteria

### Functional

- [ ] Todas las rutas previstas y 404 funcionan en navegación y acceso directo.
- [ ] Navegación responsive, email y CTAs conducen al destino correcto.
- [ ] Formulario valida en cliente/servidor y maneja loading, éxito, error y doble envío.
- [ ] Consentimiento controla realmente la carga de Analytics.

### Responsive

- [ ] Móvil, tablet y escritorio se sienten diseñados, no solo reordenados.
- [ ] Zoom al 200 %, orientación y contenido largo no rompen el layout.
- [ ] Chrome, Edge, Firefox y Safari, últimas dos versiones.

### Accessibility

- [ ] WCAG 2.2 AA como referencia; teclado completo, focus visible y landmarks.
- [ ] Labels, errores y estados asociados/anunciados; headings lógicos y un `h1` por página.
- [ ] Alternativas de imágenes correctas, contraste AA y reduced motion.

### SEO

- [ ] Titles, descriptions, canonical y Open Graph únicos.
- [ ] Sitemap, robots, 404, enlaces internos y prerender correctos.
- [ ] Contenido útil por intención; keywords naturales y datos estructurados solo reales.

### Performance

- [ ] Imágenes modernas, dimensionadas y diferidas cuando corresponde.
- [ ] Rutas lazy, bundle y scripts de terceros revisados.
- [ ] Objetivos orientativos Lighthouse: Performance >90; Accessibility, Best Practices y SEO >95.

### Security and privacy

- [ ] Sin secretos en frontend/repositorio, validación servidor, payload limitado y CORS/origen revisado.
- [ ] Recogida mínima, sin PII en Analytics/logs y sin Firestore por defecto.
- [ ] Textos legales y proveedores coinciden con el comportamiento real.

### Quality

- [ ] Sin errores de consola, enlaces rotos, código muerto, imports sin uso o contenido temporal.
- [ ] Tests críticos mantenibles y `npm run validate` exitoso.
- [ ] Ninguna funcionalidad futura/excluida se ha introducido.

---

## 8. Out of scope

- Login, área privada, CMS, panel de administración.
- Blog, reservas online, ecommerce y traducciones.
- Casos de éxito ampliados, FAQ ampliada, landings sectoriales y recursos de la arquitectura SEO futura.
- Funcionalidad no descrita expresamente.

---

## 9. First implementation task

**Validar y sanear el shell mínimo del starter.** En una siguiente tarea autorizada: instalar exclusivamente las dependencias existentes mediante `npm ci`; ejecutar lint, formato, tests y build; corregir el test obsoleto y retirar el estado `title` sin uso; mantener `App` como shell mínimo con `router-outlet`; ajustar únicamente formato/configuración si una validación concreta lo exige. No crear páginas, diseño, Firebase ni formulario.

Resultado verificable: starter limpio con `npm run validate` y la prueba raíz pasando, sin contenido comercial pendiente ni dependencias nuevas. Si aparece incompatibilidad de tooling, documentarla antes de modificar versiones.

---

## 10. Current starter audit

### Versions and engines

- Runtime local: Node `v24.13.0`, compatible con `>=24.0.0 <25`.
- npm local: `11.6.2`, compatible con `>=11` y coincidente con `packageManager`.
- Angular declarado: `21.1.x` (`@angular/cli`/build/SSR `^21.1.2`, framework `^21.1.0`).
- TypeScript declarado: `~5.9.2`.

### Configuration

- Aplicación standalone, TypeScript y templates estrictos, SCSS, Angular Router.
- Builder `@angular/build:application`, SSR Express y `outputMode: server`; todas las rutas servidor están configuradas como prerender.
- Hidratación cliente con event replay.
- Budgets production: initial 500 kB warning/1 MB error; estilos 4/8 kB.
- Assets desde `public/`; estilos globales en `src/styles.scss`.
- ESLint flat config con reglas recomendadas TS/Angular y accesibilidad de templates.
- Prettier 3 configurado en `package.json`, 100 columnas, comillas simples y parser Angular; organize-imports instalado.
- Tests con Angular unit-test builder, Vitest y jsdom; una spec raíz.
- No se detectó configuración de CI.

### Scripts

- `start`, `build`, `build:production`, `watch`, `test`, `lint`, `format`, `format:check`, `validate` y wrapper `ng`.
- `validate` ejecuta lint, format check y build; no incluye tests.

### Current application

- `src/app/app.html` contiene solo `router-outlet`; `app.routes.ts` no tiene rutas.
- `App` conserva una signal `title` sin uso; la spec espera un `h1` de bienvenida que ya no existe, por lo que está obsoleta.
- `styles.scss` está vacío salvo comentario; `app.scss` solo asegura bloque/altura mínima.
- `index.html` conserva `lang="en"`, título y favicon del starter.
- No hay páginas, navegación, contenido, SEO específico ni Firebase configurado.

### Validation baseline

- `npm.cmd list --depth=0` informa todas las dependencias como ausentes porque no existe instalación local (`node_modules`).
- `npm.cmd run validate` comienza correctamente pero falla en `ng lint`: no encuentra `@angular-eslint/builder:lint` por dependencias no instaladas. No se ejecutaron formato ni build después del fallo encadenado.
- No se ejecutó `npm install`/`npm ci`, conforme a la restricción de esta fase.
- El comando `npm` directo en PowerShell queda bloqueado por ExecutionPolicy para `npm.ps1`; `npm.cmd` funciona y debe usarse en este entorno.

### Repository state preservation

Antes de crear este plan ya existían cambios ajenos a esta tarea: `PROJECT-SPEC.md` modificado y `.atsi/` sin seguimiento. No se han alterado. El único archivo creado en esta fase es `IMPLEMENTATION-PLAN.md`.

---

## 11. Notes

- `PROJECT-SPEC.md` es la autoridad de producto; `AGENTS.md` y `.atsi/` gobiernan la ejecución.
- El mandato específico de esta tarea autoriza crear este plan, aunque la plantilla genérica de `create-project.md` indica normalmente no editar archivos.
- Los objetivos Lighthouse son orientativos y deben medirse bajo condiciones documentadas, no prometerse como garantía contractual.
- Toda decisión comercial, legal, de privacidad, coste cloud o publicación requiere aprobación humana antes de volverse irreversible.
