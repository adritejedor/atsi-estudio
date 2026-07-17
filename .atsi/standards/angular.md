# ATSIestudio — Angular Standards

## Versión y estilo

- Usar la versión definida en el proyecto.
- Preferir APIs standalone.
- TypeScript strict.
- Evitar APIs obsoletas.
- Seguir convenciones del Angular CLI.

## Arquitectura

- Mantenerla proporcional.
- No crear carpetas por tradición.
- Agrupar por funcionalidad cuando el proyecto crezca.
- Extraer compartidos solo con reutilización real.
- Evitar capas sin comportamiento.

## Componentes

- Responsabilidad clara.
- Tamaño razonable.
- Inputs y outputs tipados.
- No mutar inputs.
- Lógica compleja fuera del template.
- Componentes de presentación sin lógica de negocio cuando sea posible.

## Estado

- Signals para estado local síncrono.
- RxJS para flujos asíncronos o composición donde aporte valor.
- No introducir una librería global de estado sin necesidad demostrada.
- Evitar duplicar una misma fuente de verdad.

## Inyección

- Preferir `inject()` cuando mejore legibilidad.
- Mantener providers con el alcance mínimo.
- No usar servicios como contenedores genéricos de utilidades.

## Routing

- Rutas claras.
- Lazy loading para áreas independientes.
- Titles y metadatos por ruta.
- Guards solo cuando exista requisito.
- Página 404.
- Scroll y anchors revisados.

## Formularios

- Formularios reactivos para formularios con validación real.
- Tipado.
- Errores comprensibles.
- Validación en servidor cuando exista backend.
- Prevención de doble envío.

## HTTP y datos

- Modelos tipados.
- Manejo explícito de errores.
- No exponer respuestas crudas innecesariamente.
- Evitar múltiples llamadas idénticas.
- Cancelar o gestionar flujos cuando corresponda.

## Templates

- Control flow moderno.
- Sin expresiones complejas.
- Sin llamadas costosas repetidas.
- Semántica HTML.
- Eventos y bindings claros.

## Nombres

- Nombres orientados al dominio.
- Booleanos con prefijos claros.
- Evitar abreviaturas opacas.
- Archivos consistentes con el proyecto.

## Errores

- No capturar y silenciar.
- Mostrar mensajes útiles.
- Registrar solo lo necesario.
- No incluir datos personales en logs.

## Tests

- Priorizar lógica crítica.
- Validar flujos esenciales.
- Evitar tests frágiles basados en implementación.
- No buscar cobertura por porcentaje sin valor.

## Dependencias

- Angular primero.
- Justificar cada paquete.
- Revisar mantenimiento, licencia y tamaño.
- No instalar librerías UI por defecto.
