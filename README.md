# ATSIestudio

Web corporativa de ATSIestudio construida con Angular 21, prerender y Firebase Hosting.

## Requisitos

- Node.js 24
- npm 11
- Firebase CLI autenticada para emuladores o despliegues

## Desarrollo

```text
npm ci
npm start
```

Validación frontend:

```text
npm test -- --watch=false
npm run validate
```

Validación de Firebase Functions:

```text
npm --prefix functions ci
npm --prefix functions test
```

Los secretos del formulario se gestionan mediante Google Secret Manager. Consulta
`functions/README.md`; nunca deben guardarse en el repositorio.

## Firebase Hosting

El proyecto Firebase autorizado es `atsi-estudio`. Angular genera las rutas estáticas en
`dist/atsi-angular-starter/browser`; `/api/contact` se reescribe a `submitContact` en
`europe-west1`.

Preview temporal, público pero excluido de indexación mediante `X-Robots-Tag`:

```text
npm run firebase:preview
```

El canal live utiliza `firebase.json` y solo debe publicarse después de aprobar QA y el checklist de
release:

```text
npm run firebase:deploy:hosting
```

Cuando la versión de preview esté aprobada, Firebase también permite promover exactamente esa
release mediante:

```text
firebase hosting:clone atsi-estudio:provisional atsi-estudio:live --project atsi-estudio
```

El rollback del canal live se realiza desde el historial de releases de Firebase Hosting. Los
canales preview no permiten rollback y caducan a los siete días.
