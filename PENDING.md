# ATSIestudio — Pendientes y deuda acumulada

Este documento reúne decisiones, contenidos y validaciones que todavía no pueden considerarse
cerrados. No sustituye a `IMPLEMENTATION-PLAN.md`: sirve como lista operativa para no publicar
elementos provisionales por error.

## Bloqueos de publicación

- [ ] **Resolver el fallo de Cloudflare Turnstile.** El widget devuelve actualmente una petición
      `400 Bad Request`. Obtener el código de error exacto, comprobar que la site key y el secreto
      pertenecen al mismo widget, autorizar el hostname usado (`localhost`, preview y producción),
      descartar interferencias de extensiones y repetir el flujo completo.
- [x] Autorizar temporalmente `atsi-estudio--provisional-6idpiz2u.web.app` en el widget de Turnstile
      para probar el formulario del preview; retirarlo cuando caduque el canal.
- [ ] **Validar el formulario extremo a extremo en un entorno desplegado.** Confirmar token de
      Turnstile, llamada a Firebase Function, envío mediante Resend, recepción en
      `adriantejedor96@gmail.com`, respuesta de error y ausencia de datos personales en logs.
- [ ] **Completar el despliegue definitivo de Firebase Hosting y Functions.** `submitContact` ya está
      activa y el preview de Hosting está validado hasta el 25 de julio de 2026, con HTTPS, rutas,
      404, headers, caché, canonical, CSP y exclusión de indexación. Falta conectar y verificar el
      dominio personalizado, aprobar QA y promover una versión a `live` con rollback comprobado.
- [ ] Definir la retención de imágenes antiguas de Functions en Artifact Registry y configurar su
      política de limpieza en `europe-west1`; Firebase propone un día por defecto, pero debe
      conservarse una ventana de rollback acordada.
- [ ] **Verificar el remitente de Resend.** Confirmar que `atsiestudio.com` y
      `contacto@atsiestudio.com` están verificados y que SPF, DKIM y, cuando corresponda, DMARC están
      correctamente configurados.
- [ ] **Completar y revisar jurídicamente las páginas legales.** Los textos actuales son borradores y
      no deben publicarse como definitivos.

## Datos legales y privacidad

- [ ] Sustituir todos los `*******` de aviso legal, privacidad y cookies.
- [ ] Añadir nombre completo o razón social del titular cuando exista.
- [ ] Añadir NIF/CIF y domicilio profesional.
- [ ] Añadir datos registrales si llegan a resultar aplicables.
- [ ] Confirmar qué datos de contacto deben figurar como datos legales definitivos.
- [ ] Definir el plazo de conservación de solicitudes y correos de contacto.
- [ ] Revisar la base jurídica del formulario y del sistema antispam con una persona competente.
- [ ] Formalizar y documentar la relación con Google Cloud/Firebase, Resend y Cloudflare como
      proveedores del tratamiento cuando corresponda.
- [ ] Revisar ubicaciones de tratamiento, transferencias internacionales y garantías aplicables de
      cada proveedor.
- [ ] Auditar en producción las cookies, identificadores y almacenamiento realmente utilizados por
      Turnstile; actualizar su inventario y duración.
- [ ] Actualizar la fecha de revisión de los documentos cuando se aprueben los textos definitivos.
- [ ] Revisar de nuevo privacidad y cookies cuando se incorpore Analytics o cambie cualquier
      proveedor.

## Contenido y copy

- [ ] **Realizar una revisión humana completa del copy.** Los textos iniciales generados para Home,
      servicios, proceso, sobre ATSIestudio, proyectos, contacto y FAQ necesitan aprobación de tono,
      exactitud y coherencia comercial.
- [ ] Confirmar el nombre de marca definitivo y su escritura consistente: `ATSIestudio` frente a
      `Atsi estudio`.
- [ ] Validar la propuesta de valor, afirmaciones comerciales y alcance real de cada servicio.
- [ ] Confirmar que la metodología publicada en “Cómo trabajamos” coincide con el proceso que se
      ofrecerá realmente: fases, comunicación, entregas, revisiones, cambios y responsabilidades.
- [ ] Revisar y aprobar todas las preguntas frecuentes; evitar que sus respuestas se interpreten como
      condiciones contractuales universales.
- [ ] Completar la información auténtica de “Sobre ATSIestudio” cuando esté disponible: historia,
      titular/equipo, experiencia, forma de colaboración y fotografía opcional.
- [ ] Revisar los CTA y microcopys del formulario después de cerrar el posicionamiento y los textos
      legales.
- [ ] Sustituir cualquier formulación provisional que permanezca visible antes de producción.

## Servicios y precios

- [x] **Sustituir todos los precios provisionales “Desde 1.000 €”.** Definir importes o rangos reales
      para desarrollo web, desarrollo personalizado, mantenimiento y hosting/dominios.
- [x] Precisar qué incluye y qué excluye el precio inicial de cada servicio.
- [x] Definir si los precios incluyen o no impuestos y cómo debe comunicarse legalmente.
- [x] Separar costes puntuales y recurrentes, especialmente mantenimiento, hosting, dominios,
      renovaciones, licencias y servicios de terceros.
- [x] Definir condiciones que modifican el presupuesto: páginas, integraciones, migraciones,
      contenidos, urgencia, soporte y revisiones.
- [x] Alinear `PROJECT-SPEC.md` e `IMPLEMENTATION-PLAN.md` con el cuarto servicio de hosting y
      dominios, añadido posteriormente por decisión del usuario. `PROJECT-SPEC.md` no debe modificarse
      sin autorización expresa.

## Proyectos y recursos visuales

- [x] Confirmar permiso y alcance publicable de `skepsisink.com`, incluida la captura utilizada.
- [x] Revisar el copy del proyecto para que describa únicamente trabajo y resultados verificables.
- [x] Añadir proyectos reales futuros reutilizando la estructura existente; no duplicar
      `skepsisink.com` como si fueran casos distintos.
- [x] Confirmar si la página de proyectos debe permanecer en la navegación mientras solo exista un
      proyecto publicado.
- [x] Revisar textos alternativos, dimensiones, compresión y formatos de todas las imágenes finales.
- [ ] Preparar una imagen social/OG definitiva cuando se cierre la fase SEO.

## Analytics y consentimiento

- [x] Configurar el ID de medición de Google Analytics `G-DZ2WCW1HP3`.
- [x] Implementar `page_view`, `generate_lead` y contactos por email, teléfono y WhatsApp sin datos
      personales.
- [x] Implementar el consentimiento antes de cargar Analytics: aceptar y rechazar con igual claridad,
      persistencia versionada y mecanismo de revocación.
- [ ] Desactivar en el flujo web de GA4 la opción “Cambios de página basados en eventos del historial”
      dentro de Medición mejorada para evitar duplicar los `page_view` enviados por Angular.
- [ ] Verificar en Network que no existe ninguna petición de Analytics antes del consentimiento.
- [x] Actualizar la política de cookies y privacidad con el inventario, duración y tratamiento real de
      Analytics antes de activarlo.

## Protección antispam

- [x] Implementar honeypot, control temporal, Turnstile server-side, rechazo de tokens duplicados y
      rate limiting efímero sin almacenar direcciones IP en claro.
- [x] Registrar rechazos mediante categorías técnicas estructuradas, sin incluir campos del
      formulario en los logs de aplicación.
- [ ] Revisar métricas de abuso tras publicar y sustituir el límite por instancia por uno distribuido
      únicamente si el volumen o los ataques lo justifican.
- [ ] Auditar metadatos y retención de los logs de infraestructura generados automáticamente por
      Google Cloud, que son independientes de los logs controlados por la aplicación.

## SEO y configuración pública

- [x] Confirmar `https://atsiestudio.com` sin `www` como dominio canónico definitivo.
- [ ] Configurar `www.atsiestudio.com` como dominio adicional en DNS/Firebase Hosting y aplicar una
      redirección permanente hacia la misma ruta de `https://atsiestudio.com`.
- [x] Completar metadata por ruta: descriptions, canonical y Open Graph únicos, sin imagen social.
- [x] Generar y validar `sitemap.xml` y `robots.txt` con el dominio canónico definitivo.
- [ ] Definir la imagen social y los datos visibles que permitan, si procede, JSON-LD válido.
- [ ] Verificar en preview/producción que Firebase Hosting sirve el `404.html` estático con estado 404;
      la configuración local ya evita el fallback con estado 200 y la página declara `noindex`.
- [ ] Revisar enlazado interno, headings y contenido prerenderizado de todas las rutas.

## Calidad técnica y QA

- [ ] Corregir el baseline de Prettier: `npm run validate` sigue señalando 20 archivos históricos no
      formateados, aunque los archivos creados en las fases recientes sí pasan sus comprobaciones.
- [ ] Completar revisión responsive en móvil estrecho, móvil grande, tablet, escritorio y zoom al
      200 %, incluidas las tablas legales.
- [ ] Realizar revisión manual completa por teclado y con tecnología asistiva disponible, especialmente
      navegación, formulario, mensajes de estado y Turnstile.
- [ ] Medir contraste, reflow, touch targets y `prefers-reduced-motion` en el conjunto del sitio.
- [ ] Ejecutar Lighthouse en un entorno representativo y corregir hallazgos medidos; objetivos:
      Performance > 90 y Accessibility/Best Practices/SEO > 95 cuando terceros lo permitan.
- [ ] Probar las dos últimas versiones de Chrome, Edge, Firefox y Safari; documentar cualquier entorno
      no disponible.
- [ ] Revisar consola, red, enlaces rotos, rutas directas y formulario en preview y producción.
- [ ] Ejecutar los checklists de QA, accesibilidad, SEO, rendimiento y release antes de publicar.

## Operación y mantenimiento

- [ ] Definir si habrá únicamente desarrollo y producción o también un entorno de staging/preview.
- [ ] Documentar instalación, build, emuladores, secretos, despliegue y rollback sin incluir
      credenciales.
- [ ] Definir responsables de revisión comercial, legal, técnica y de publicación.
- [ ] Revisar cuotas, alertas y costes de Firebase, Resend, Cloudflare y Analytics.
- [ ] Configurar alertas para los eventos técnicos `contact_rejected` y `contact_delivery_failed`;
      la Function ya los emite de forma estructurada sin campos del formulario.
- [ ] Preparar la comprobación posterior al despliegue y el procedimiento para rotar secretos.

## Decisiones ya cerradas que no deben reabrirse sin motivo

- Firebase project: `atsi-estudio`.
- Funciones previstas en `europe-west1`, pendiente de confirmación final antes de producción.
- Correo público actual: `contacto@atsiestudio.com`.
- Receptor interno actual del formulario: `adriantejedor96@gmail.com`.
- Teléfono y WhatsApp actuales: `655 340 607`.
- Remitente previsto en Resend: `contacto@atsiestudio.com`.
- Dominio canónico: `https://atsiestudio.com`; `www.atsiestudio.com` será únicamente una variante de
  acceso redirigida a la versión sin `www`.
- No almacenar leads en Firestore por defecto.
- No cargar Google Analytics antes de obtener consentimiento.
