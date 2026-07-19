# ATSIestudio — Accessibility Standards

## Objetivo

WCAG 2.2 nivel AA como referencia, aplicando criterios proporcionados al proyecto.

La accesibilidad se incorpora desde el inicio.

## Semántica

- Landmarks.
- Headings en orden lógico.
- Listas para conjuntos.
- Tablas solo para datos tabulares.
- Botones para acciones.
- Enlaces para navegación.
- No usar `div` interactivos.

## Teclado

- Todos los controles utilizables.
- Orden lógico.
- Sin trampas de focus.
- Escape para cerrar overlays cuando corresponda.
- Menús y diálogos con comportamiento adecuado.

## Focus

- Visible.
- Contraste suficiente.
- No ocultarlo.
- Restaurar focus al cerrar diálogos.
- Gestionar focus al cambiar contexto importante.

## Formularios

- Labels visibles.
- Instrucciones asociadas.
- Errores específicos.
- Resumen o anuncio cuando sea útil.
- No depender solo del color.
- Campos requeridos indicados.
- Autocomplete cuando corresponda.
- Mensajes mediante live regions cuando sea necesario.

## Imágenes

- Alt descriptivo para contenido.
- Alt vacío para decoración.
- No repetir texto adyacente.
- No usar imágenes de texto salvo logos.

## Color

- Contraste AA.
- Estados no comunicados solo por color.
- Enlaces distinguibles.
- Gráficos con alternativa.

## Movimiento

- Respetar reduced motion.
- Evitar flashes.
- Evitar autoplay intrusivo.
- Controles para contenido en movimiento cuando aplique.

## Contenido

- Lenguaje claro.
- Texto de enlaces descriptivo.
- Títulos útiles.
- Instrucciones comprensibles.
- Evitar iconos sin nombre accesible.

## Componentes complejos

Antes de ARIA, usar HTML nativo.

Para:

- Dialog.
- Tabs.
- Accordion.
- Menu.
- Combobox.

Seguir patrones reconocidos y probar con teclado.

## Responsive y zoom

- Funcionar a 200% de zoom.
- No bloquear orientación.
- No requerir scroll horizontal salvo contenido específico.
- Touch targets razonables.

## Validación

Combinar:

- Revisión manual de teclado.
- Inspección semántica.
- Herramientas automáticas.
- Lectura con tecnología asistiva en flujos críticos cuando sea posible.

Una puntuación automática no demuestra accesibilidad completa.
