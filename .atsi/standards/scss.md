# ATSIestudio — SCSS Standards

## Principios

- Mobile-first.
- Claridad antes que abstracción.
- Estilos locales por defecto.
- Globales solo para reglas realmente globales.
- Sin `!important` salvo excepción documentada.

## Organización

Los estilos globales pueden incluir:

- Reset o normalización mínima.
- Tipografía base.
- Variables del proyecto.
- Layout base.
- Utilidades escasas y justificadas.

No crear un framework CSS interno para un proyecto pequeño.

## Selectores

- Evitar selectores profundos.
- Evitar dependencia de la estructura DOM.
- Evitar IDs para estilos.
- Evitar nesting excesivo.
- Mantener especificidad baja.

## Variables

Usar custom properties para valores que:

- Se reutilizan.
- Cambian por tema.
- Representan identidad visual.
- Necesitan runtime.

Usar variables SCSS para cálculos o composición de build cuando aporten claridad.

## Espaciado

- Mantener escala consistente.
- Evitar valores arbitrarios repetidos.
- Usar `clamp()` cuando ayude al diseño fluido.
- No sacrificar legibilidad por compactar.

## Responsive

- Comenzar por móvil.
- Añadir breakpoints por necesidad del contenido.
- No diseñar solo para dispositivos concretos.
- Probar zoom y contenido largo.
- Evitar alturas fijas en texto.

## Tipografía

- `rem` para tamaños de texto.
- Altura de línea legible.
- Longitud de línea razonable.
- No usar texto demasiado pequeño.
- Evitar demasiados pesos y familias.

## Estados

Todo elemento interactivo debe contemplar:

- Hover.
- Focus-visible.
- Active.
- Disabled.
- Loading cuando corresponda.

No ocultar el outline sin sustituto.

## Animación

- Sutil.
- `transform` y `opacity`.
- Reduced motion.
- Sin movimiento continuo innecesario.
- Duraciones moderadas.
- No animar layout de forma costosa.

## Layout

- Flex y Grid.
- Evitar posicionamiento absoluto como estructura principal.
- Reservar espacio para medios.
- Evitar overflow horizontal.
- Usar contenedores y ancho máximo coherentes.

## Mantenibilidad

- No duplicar bloques grandes.
- No extraer mixins para una sola regla.
- No usar utilidades crípticas.
- Comentar solo decisiones no obvias.
