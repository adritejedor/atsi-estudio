# ATSIestudio — Review Code

Este procedimiento revisa código ya implementado como lo haría una revisión senior.

La revisión debe encontrar problemas reales, priorizarlos y corregir únicamente los que estén dentro del alcance autorizado.

---

## 1. Alcance de la revisión

Definir:

- Rama, commit, diff o archivos revisados.
- Funcionalidad afectada.
- Criterios de aceptación.
- Documentos aplicables.

No revisar el repositorio completo si la petición se limita a una funcionalidad, salvo que exista impacto transversal.

---

## 2. Leer antes de revisar

- `AGENTS.md`.
- `PROJECT-SPEC.md`.
- `.atsi/prompts/master.md`.
- Estándares aplicables.
- Código anterior relacionado.
- Tests existentes.

---

## 3. Clasificación de hallazgos

### Crítico

Puede causar:

- Pérdida o exposición de datos.
- Fallo de producción.
- Vulnerabilidad grave.
- Bloqueo de la conversión principal.
- Inaccesibilidad de un flujo esencial.

### Alto

Provoca:

- Bug funcional importante.
- Incumplimiento de alcance.
- Problema notable de accesibilidad.
- Regresión significativa.
- Arquitectura difícil de mantener.

### Medio

Provoca:

- Deuda técnica localizada.
- Duplicación relevante.
- Problemas de responsive.
- SEO o rendimiento mejorables.
- Edge case razonable sin cubrir.

### Bajo

Mejora menor:

- Naming.
- Simplificación.
- Consistencia.
- Limpieza no urgente.

---

## 4. Revisión funcional

Comprobar:

- Cumplimiento del requisito.
- Estados normales y de error.
- Navegación.
- Formularios.
- Enlaces.
- Datos mostrados.
- Estados vacíos.
- Carga.
- Confirmaciones.
- Compatibilidad con flujos existentes.

Buscar regresiones indirectas.

---

## 5. Revisión de arquitectura

Comprobar:

- Responsabilidad de componentes.
- Acoplamiento.
- Dependencias.
- Servicios compartidos.
- Flujo de datos.
- Estado.
- Rutas.
- Organización de archivos.
- Complejidad proporcional.

Señalar:

- Abstracciones prematuras.
- Componentes genéricos de un solo uso.
- Lógica duplicada.
- Servicios sin necesidad.
- Estado compartido innecesario.

---

## 6. Revisión Angular

Comprobar:

- APIs standalone.
- Tipado.
- Signals.
- Inyección.
- Control flow.
- Suscripciones.
- Cleanup.
- Formularios.
- Manejo de errores.
- Lazy loading.
- Change detection.
- Imports.

Buscar:

- `any`.
- Suscripciones manuales evitables.
- Lógica en templates.
- Inputs mutados.
- Observables sin gestionar.
- Servicios con responsabilidades múltiples.
- Imports o providers innecesarios.

---

## 7. Revisión HTML y accesibilidad

Comprobar:

- Semántica.
- Headings.
- Botones y enlaces.
- Labels.
- Orden de teclado.
- Focus.
- Mensajes de estado.
- Alt.
- Contraste.
- Touch targets.
- Reduced motion.
- ARIA válida.

No aceptar accesibilidad aparente basada solo en atributos ARIA.

---

## 8. Revisión SCSS y responsive

Comprobar:

- Mobile-first.
- Selectores.
- Especificidad.
- Anidación.
- Valores repetidos.
- Overflow.
- Breakpoints.
- Estados.
- Animaciones.
- Compatibilidad con zoom.
- Contenido largo.

Buscar:

- `!important`.
- Alturas rígidas.
- Texto cortado.
- Posicionamiento frágil.
- Dependencia excesiva de píxeles.
- Estilos globales invasivos.

---

## 9. Revisión SEO

Para rutas públicas:

- Title.
- Description.
- H1.
- Headings.
- Canonical.
- Enlaces.
- Contenido indexable.
- Imágenes.
- Metadatos sociales.
- Sitemap.
- Robots.
- Schema válido.

---

## 10. Revisión de rendimiento

Comprobar:

- Imágenes.
- Bundle.
- Fuentes.
- Scripts.
- Lazy loading.
- Requests.
- Recursos duplicados.
- Renderizado.
- Animaciones.
- Terceros.
- Caching.

No recomendar optimizaciones sin evidencia.

---

## 11. Seguridad y privacidad

Comprobar:

- Secretos.
- Variables.
- Validación.
- Sanitización.
- Permisos.
- Logs.
- Datos personales.
- Formularios.
- Spam.
- Dependencias.
- Configuración cloud.

---

## 12. Corrección

Corregir automáticamente:

- Hallazgos críticos.
- Hallazgos altos.
- Hallazgos medios claramente dentro del alcance.
- Problemas de lint o build relacionados.

No corregir automáticamente:

- Cambios de producto.
- Cambios visuales subjetivos.
- Refactors amplios no solicitados.
- Dependencias nuevas.
- Cambios de API pública.
- Decisiones comerciales.

En esos casos, proponer y esperar aprobación.

---

## 13. Revalidación

Después de corregir:

- Repetir revisión de los archivos afectados.
- Ejecutar tests.
- Ejecutar `npm run validate`.
- Revisar consola.
- Verificar que no se introdujeron regresiones.

---

## 14. Informe

Entregar:

### Alcance revisado

### Hallazgos

Tabla o listado con:

- Severidad.
- Archivo.
- Problema.
- Impacto.
- Estado.

### Correcciones realizadas

### Decisiones pendientes

### Validación

### Riesgos residuales

No declarar “sin problemas” si alguna comprobación no pudo realizarse.
