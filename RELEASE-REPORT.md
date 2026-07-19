# Release Report

## Project

- Name: ATSIestudio
- Version: provisional preview
- Environment: Firebase Hosting preview + Firebase Functions production backend
- Date: 18 de julio de 2026
- Responsible: Codex, con autorización expresa del usuario
- Commit: `6d8d091` (`feature(app): fase 12 completada`)
- Branch: `develop`

## 1. Release summary

Despliegue provisional para facilitar la configuración y validación de Google Analytics, Turnstile y
el formulario antes de publicar el canal principal. Se desplegó `submitContact` y un canal temporal
de Hosting con caducidad de siete días. No se modificó el canal `live`.

## 2. Preconditions

- [x] Approval received.
- [ ] QA approved; quedan abiertos Turnstile, consentimiento, revisión legal y QA final.
- [x] Build passed.
- [x] Environment confirmed: proyecto `atsi-estudio`, región `europe-west1`.
- [x] Backup not applicable: no existe estado persistente ni una versión previa de la Function.

## 3. Commands executed

```text
npm.cmd ci
npm.cmd --prefix functions ci
npm.cmd test -- --watch=false
npm.cmd run lint
npm.cmd run build:production
npm.cmd --prefix functions test
npm.cmd audit --omit=dev
npm.cmd --prefix functions audit --omit=dev
firebase.cmd deploy --only functions:submitContact --project atsi-estudio --non-interactive
firebase.cmd hosting:channel:deploy provisional --expires 7d --project atsi-estudio --config firebase.preview.json --non-interactive
```

`npm run validate` mantiene el fallo de formato conocido en 20 archivos históricos. El despliegue
provisional fue autorizado expresamente y las comprobaciones funcionales, lint, tests y build se
ejecutaron por separado.

## 4. Deployment

- Provider: Firebase
- Project/target: `atsi-estudio`
- Function: `submitContact`, Node.js 22, `europe-west1`, estado `ACTIVE`
- Hosting channel: `provisional`
- Preview URL: `https://atsi-estudio--provisional-6idpiz2u.web.app`
- Expiration: 25 de julio de 2026 a las 06:45 UTC
- Result: correcto con observaciones; no se publicó el canal `live`

## 5. Smoke tests

| Test          | Result    | Notes                                                                               |
| ------------- | --------- | ----------------------------------------------------------------------------------- |
| Home          | Correcto  | HTTP 200, title y canonical presentes.                                              |
| Direct routes | Correcto  | `/contacto` responde HTTP 200 con contenido prerenderizado.                         |
| Navigation    | Pendiente | Revisión manual completa en navegador.                                              |
| Form          | Parcial   | Rewrite operativo; payload inválido devuelve HTTP 400. Falta envío legítimo.        |
| Function HTTP | Correcto  | Método 405, media 415, origen 403 y payload excesivo 413 verificados.               |
| Antispam      | Correcto  | Honeypot desplegado devuelve 400; rate limit y replay cubiertos por tests.          |
| Analytics     | Parcial   | ID y consentimiento desplegados; falta comprobar DebugView y Network.               |
| Cookies       | Parcial   | Inventario técnico actualizado; pendiente de revisión legal final.                  |
| 404           | Correcto  | Ruta inexistente devuelve HTTP 404.                                                 |
| SSL           | Correcto  | Preview servido mediante HTTPS.                                                     |
| Deep links    | Correcto  | Las 13 rutas prerenderizadas responden directamente; las públicas llevan canonical. |
| Cache         | Correcto  | HTML/404 sin caché obsoleta y bundles con hash inmutables durante un año.           |
| Security      | Correcto  | CSP, `nosniff`, frame denial, permisos y referrer policy desplegados.               |
| Preview SEO   | Correcto  | Todo el canal temporal responde con `X-Robots-Tag: noindex`.                        |

## 6. Incidents

| ID     | Description                                                               | Impact                                                | Resolution                                                                             |
| ------ | ------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| DEP-01 | `npm ci` no pudo reemplazar `esbuild.exe` por varios dev servers activos. | Instalación frontend incompleta en el primer intento. | Se cerraron los procesos del workspace y `npm ci` terminó correctamente.               |
| DEP-02 | APIs y cuentas de servicio de Functions aún no existían.                  | Primer intento detenido durante la propagación.       | Firebase habilitó las APIs; el segundo intento creó la Function y terminó en `ACTIVE`. |
| DEP-03 | Turnstile no estaba autorizado en el hostname del preview.                | El formulario legítimo no podía completarse.          | Hostname temporal autorizado; el widget se inicializa correctamente en el preview.     |
| DEP-04 | No existe política de limpieza de imágenes en Artifact Registry.          | El deploy terminó activo, pero el comando devolvió 1. | Pendiente acordar retención y configurar la política en `europe-west1`.                |

## 7. Rollback

- Previous stable version: no existía Function desplegada; el canal `live` no se modificó.
- Hosting rollback: eliminar el canal `provisional` desde Firebase Hosting.
- Function rollback: eliminar `submitContact` si se decide retirar el backend provisional.
- Rollback required: No.

## 8. Final status

- [ ] Successful.
- [x] Successful with observations.
- [ ] Rolled back.
- [ ] Failed.

## 9. Communication

- Stakeholders informed: usuario responsable del proyecto.
- Time: al cierre de esta tarea.
- Notes: preview temporal, no apto todavía para publicación profesional.

---

## Actualización del preview — 19 de julio de 2026

- **Cambio:** identificador interno actualizado al nombre definitivo `atsi-estudio`.
- **Salida verificada:** `dist/atsi-estudio/browser`.
- **Entorno:** canal Firebase Hosting `provisional`; el canal `live` no se modificó.
- **URL:** `https://atsi-estudio--provisional-6idpiz2u.web.app`.
- **Caducidad:** 26 de julio de 2026 a las 19:21, hora peninsular española.
- **Validación previa:** `npm ci`, 40 pruebas frontend, 11 pruebas de Functions,
  `npm run validate` y build de producción correctos.
- **Smoke test:** home, servicios, contacto, páginas legales, sitemap y robots responden 200; una
  ruta inexistente responde 404; `/api/contact` alcanza la Function y rechaza un payload vacío con
  400; CSP, HSTS y `X-Robots-Tag: noindex` están activos.
- **Observación:** Firebase CLI no pudo sincronizar el dominio del canal con Firebase Authentication
  porque Authentication no está inicializado. La aplicación no utiliza Firebase Authentication y
  el despliegue de Hosting terminó correctamente.
- **Rollback:** el canal conserva versiones anteriores; puede seleccionarse una release previa o
  eliminarse el canal temporal sin afectar a `live`.
- **Lighthouse posterior:** el contraste insuficiente del número de la segunda tarjeta de servicios
  y del eyebrow del CTA final se corrigió con un azul claro sobre la superficie oscura. El preview
  obtiene 100 en Performance, Accessibility y Best Practices tanto en móvil como en escritorio. SEO
  obtiene 69 únicamente por el `noindex` deliberado del canal temporal; el mismo build con la
  configuración pública obtiene 100 en SEO y Accessibility, 100 en Best Practices y 99 en
  Performance.
