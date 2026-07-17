# ATSIestudio — Performance Standards

## Principios

- Medir antes de optimizar.
- Priorizar experiencia real.
- Evitar dependencias innecesarias.
- Aplicar optimización proporcional.

## Objetivos orientativos

Cuando el contenido y servicios externos lo permitan:

- Lighthouse Performance superior a 90.
- LCP dentro de valores recomendados.
- CLS bajo.
- Interacciones fluidas.
- Sin errores de consola.

Los objetivos no son garantías contractuales salvo acuerdo.

## Imágenes

- AVIF o WebP.
- Dimensiones correctas.
- Responsive images cuando aporten valor.
- Lazy loading fuera del viewport.
- Prioridad para LCP.
- Reservar espacio.
- Comprimir.

## JavaScript

- Lazy loading de rutas.
- Evitar paquetes grandes.
- Eliminar código muerto.
- Evitar listeners y cálculos innecesarios.
- Retrasar scripts no críticos.
- Revisar terceros.

## CSS

- Mantener globales mínimos.
- Evitar duplicación.
- Evitar animaciones de layout.
- Reducir CSS de terceros.
- No bloquear render innecesariamente.

## Fuentes

- Pocas familias.
- Pocos pesos.
- Formatos modernos.
- `font-display`.
- Preload solo para recursos críticos.
- Evitar descargar estilos no usados.

## Red

- CDN.
- Caching.
- Compresión.
- Archivos con hash.
- Payloads razonables.
- Evitar requests duplicados.

## Angular

- Build de producción.
- Lazy routes.
- Control de bundle.
- Templates sin cálculos costosos.
- Gestión eficiente de estado.
- No usar una librería completa por una utilidad pequeña.

## Terceros

Cada script debe justificar:

- Valor.
- Peso.
- Privacidad.
- Carga.
- Consentimiento.
- Alternativa.

## Monitorización

En proyectos mantenidos:

- Detectar degradaciones.
- Revisar cambios de terceros.
- Medir rutas principales.
