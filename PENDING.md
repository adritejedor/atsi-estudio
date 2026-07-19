# ATSIestudio — Pendientes para producción

Esta lista recoge únicamente comprobaciones y tareas que siguen abiertas. Los textos comerciales,
las páginas legales y los precios publicados se consideran definitivos para producción.

## Bloqueos de publicación

- [ ] **Validar el formulario de extremo a extremo en el dominio definitivo.** Comprobar Cloudflare
      Turnstile, la llamada a `submitContact`, el envío mediante Resend, la recepción en el buzón
      interno, los estados de error y la ausencia de datos personales en los logs de aplicación.
- [ ] **Verificar el remitente de Resend.** Confirmar `atsiestudio.com` y
      `contacto@atsiestudio.com`, junto con SPF, DKIM y DMARC cuando corresponda.
- [ ] **Conectar el dominio definitivo y publicar Firebase Hosting.** Configurar
      `atsiestudio.com`, promover una versión al canal `live`, ejecutar el smoke test posterior y
      comprobar el procedimiento de rollback.
- [ ] Configurar `www.atsiestudio.com` como dominio adicional y redirigir permanentemente cada ruta
      hacia su equivalente en `https://atsiestudio.com`.
- [ ] Autorizar los hostnames definitivos en Cloudflare Turnstile y retirar el hostname del canal de
      preview cuando deje de utilizarse.

## Configuración de servicios

- [ ] Definir la retención de imágenes antiguas de Functions en Artifact Registry y configurar la
      política de limpieza en `europe-west1` con una ventana de rollback suficiente.
- [ ] Desactivar en GA4 la opción «Cambios de página basados en eventos del historial» dentro de
      Medición mejorada para evitar duplicar los `page_view` enviados por Angular.
- [ ] Verificar en Network que Analytics no realiza ninguna petición antes del consentimiento y que
      `page_view`, `generate_lead`, email, teléfono y WhatsApp aparecen correctamente después.
- [ ] Revisar cuotas, alertas y costes de Firebase, Resend, Cloudflare y Analytics.
- [ ] Configurar alertas para los eventos técnicos `contact_rejected` y
      `contact_delivery_failed`.

## SEO y recursos públicos

- [ ] Preparar la imagen social definitiva y añadir `og:image` cuando esté disponible.
- [ ] Valorar y añadir JSON-LD únicamente cuando existan datos públicos suficientes para un marcado
      verificable.
- [ ] Verificar tras el despliegue que `sitemap.xml`, `robots.txt`, canonical, metadatos y contenido
      prerenderizado se sirven correctamente desde el dominio definitivo.
- [ ] Confirmar que las rutas inexistentes sirven el `404.html` estático con estado HTTP 404.

## Calidad técnica y QA

- [ ] Completar una revisión responsive en móvil estrecho, móvil grande, tablet, escritorio y zoom
      al 200 %, incluidas las tablas legales.
- [ ] Realizar una revisión manual completa por teclado y con tecnología asistiva, especialmente en
      navegación, consentimiento, formulario, mensajes de estado y Turnstile.
- [ ] Medir contraste, reflow, objetivos táctiles y movimiento reducido en todo el sitio.
- [ ] Probar las dos últimas versiones de Chrome, Edge, Firefox y Safari, documentando cualquier
      entorno que no esté disponible.
- [ ] Revisar consola, red, enlaces rotos, navegación, rutas directas y formulario en producción.
- [ ] Ejecutar los checklists de QA, accesibilidad, SEO, rendimiento y release antes de publicar.

## Operación y mantenimiento

- [ ] Decidir si se mantendrá un entorno estable de staging además de desarrollo y producción.
- [ ] Completar la documentación de instalación, build, emuladores, secretos, despliegue y rollback
      sin incluir credenciales.
- [ ] Definir responsables de revisión técnica, publicación y operación.
- [ ] Preparar la comprobación posterior al despliegue y el procedimiento de rotación de secretos.
- [ ] Revisar métricas de abuso después de publicar y adoptar rate limiting distribuido solo si el
      volumen o los ataques lo justifican.
- [ ] Auditar la retención de los logs de infraestructura generados por Google Cloud.

## Decisiones cerradas

- Los copys comerciales, la metodología, las FAQ, los textos legales y los precios publicados son
  definitivos para esta salida a producción.
- Firebase project: `atsi-estudio`.
- Firebase Functions: `europe-west1`.
- Correo público y remitente de Resend: `contacto@atsiestudio.com`.
- Receptor interno del formulario: `adriantejedor96@gmail.com`.
- Teléfono y WhatsApp: `655 340 607`.
- Dominio canónico: `https://atsiestudio.com`; la variante `www` redirigirá a la versión sin `www`.
- No se almacenan leads en Firestore.
- Google Analytics no se carga antes del consentimiento.
