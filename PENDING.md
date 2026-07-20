# ATSIestudio — Seguimiento de producción v1.0.0

La versión 1.0.0 está publicada en producción. Los copys, textos legales y precios se consideran
definitivos. Este documento conserva únicamente comprobaciones manuales, configuración externa y
seguimiento operativo que no pueden cerrarse desde el repositorio.

## Producción verificada — 19 de julio de 2026

- [x] Firebase Hosting publicado en el canal `live`, versión `fd26b0e069ae9983` y release
      `1784491843311000`.
- [x] Dominio canónico operativo mediante HTTPS en `https://atsiestudio.com`, con certificado SSL
      válido y HSTS activo.
- [x] `www.atsiestudio.com` redirige permanentemente al dominio sin `www` y conserva la ruta.
- [x] Las 13 rutas públicas responden 200 y contienen title, description, canonical y contenido
      prerenderizado.
- [x] `sitemap.xml`, `robots.txt`, logo e imagen del proyecto responden 200; el sitemap contiene las
      13 rutas y producción no publica `noindex`.
- [x] Las rutas inexistentes sirven el `404.html` estático con estado HTTP 404.
- [x] Los 13 destinos internos enlazados desde el HTML de producción responden sin errores.
- [x] CSP, HSTS, protección contra framing, `nosniff`, política de permisos y referrer policy están
      activos.
- [x] Lighthouse sobre el dominio definitivo: Performance 100, Accessibility 100, Best Practices
      100 y SEO 100; contraste y rastreabilidad superados.
- [x] Analytics no realiza peticiones durante la auditoría previa al consentimiento.
- [x] `submitContact` está activa en `europe-west1`, revisión `submitcontact-00005-sub`, con los
      secretos habilitados. El rewrite acepta el origen definitivo, rechaza payloads inválidos con
      400 y orígenes no autorizados con 403.
- [x] Tests y validaciones: 40 pruebas frontend, 11 pruebas de Functions, lint, formato,
      build/prerender y auditorías de dependencias sin vulnerabilidades.
- [x] Artifact Registry elimina automáticamente las imágenes de Functions con más de 7 días.

## Pendiente antes de promocionar públicamente la web

- [ ] **Completar un envío real del formulario desde `https://atsiestudio.com/contacto`.** Validar
      Turnstile en navegador, recepción mediante Resend, contenido del teléfono, estados de éxito y
      error, y ausencia de datos personales en logs. Esta prueba envía un correo real y requiere una
      interacción legítima con el widget.
- [ ] **Cerrar la autenticación del correo.** El DNS público tiene MX de Google, pero no publica SPF
      ni DMARC a fecha de esta revisión. Confirmar el dominio y remitente en Resend, publicar SPF,
      DKIM y DMARC con los valores indicados por el proveedor y volver a verificarlos.
- [ ] Confirmar en Cloudflare Turnstile que `atsiestudio.com` y `www.atsiestudio.com` están
      autorizados; retirar el hostname del preview cuando deje de utilizarse.
- [ ] Desactivar en GA4 «Cambios de página basados en eventos del historial» para evitar duplicar
      los `page_view` enviados por Angular.
- [ ] Tras aceptar analítica, comprobar en Network y DebugView los eventos `page_view`,
      `generate_lead`, email, teléfono y WhatsApp.

## QA manual pendiente

- [ ] Revisar móvil estrecho, móvil grande, tablet, escritorio y zoom al 200 %, incluidas las tablas
      legales.
- [ ] Completar navegación por teclado y tecnología asistiva, especialmente navegación,
      consentimiento, formulario, mensajes de estado y Turnstile.
- [ ] Validar reflow, objetivos táctiles y movimiento reducido en dispositivos reales iOS y
      Android.
- [ ] Probar las dos últimas versiones de Chrome, Edge, Firefox y Safari.
- [ ] Ejecutar manualmente los checklists de QA y release que requieran juicio visual o tecnología
      asistiva.

## Operación y mantenimiento

- [ ] Configurar presupuestos, cuotas y alertas de costes en Firebase/Google Cloud, Resend,
      Cloudflare y Analytics.
- [ ] Configurar seguimiento para `contact_rejected` y `contact_delivery_failed` y revisar métricas
      de abuso tras el lanzamiento; añadir rate limiting distribuido solo si el tráfico lo exige.
- [ ] Auditar la retención de logs de infraestructura y documentar la rotación de secretos.
- [ ] Completar la documentación operativa de instalación, emuladores, despliegue y rollback sin
      credenciales, y asignar responsables.
- [ ] Decidir si se mantendrá un entorno estable de staging además de desarrollo y producción.
- [ ] Preparar una imagen social definitiva y añadir `og:image` cuando exista el recurso.
- [ ] Valorar JSON-LD únicamente cuando haya datos públicos suficientes para un marcado
      verificable.

## Decisiones cerradas

- Firebase project y Hosting site: `atsi-estudio`.
- Firebase Functions: Node.js 22 en `europe-west1`.
- Correo público y remitente de Resend: `contacto@atsiestudio.com`.
- Receptor interno del formulario: `adriantejedor96@gmail.com`.
- Teléfono y WhatsApp: `655 340 607`.
- Dominio canónico: `https://atsiestudio.com`; `www` redirige permanentemente a la versión sin
  `www`.
- No se almacenan leads en Firestore.
- Google Analytics no se carga antes del consentimiento.
