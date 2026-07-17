# ATSIestudio — Master Workflow

Este documento define el procedimiento general que debe seguirse en cualquier tarea realizada dentro del proyecto.

Debe utilizarse junto con:

- `AGENTS.md`.
- `PROJECT-SPEC.md`.
- El prompt específico de la tarea.
- Los estándares aplicables.
- Los checklists correspondientes.

---

## 1. Comprensión del contexto

Antes de modificar archivos:

1. Leer `AGENTS.md`.
2. Leer `PROJECT-SPEC.md`.
3. Leer el procedimiento específico de la tarea.
4. Revisar la estructura actual del repositorio.
5. Revisar el código relacionado.
6. Identificar las convenciones existentes.
7. Comprender el objetivo funcional y de negocio.

No comenzar sin entender:

- Qué debe construirse.
- Para quién se construye.
- Qué objetivo cumple.
- Qué está incluido.
- Qué está excluido.

---

## 2. Fuente de verdad

`PROJECT-SPEC.md` es la fuente principal sobre el producto.

No inventar:

- Páginas.
- Funcionalidades.
- Integraciones.
- Servicios.
- Precios.
- Datos de contacto.
- Clientes.
- Testimonios.
- Casos de éxito.
- Métricas.
- Certificaciones.

Cuando falte información:

1. Indicar qué falta.
2. Explicar por qué afecta a la tarea.
3. Clasificarlo como bloqueante o no bloqueante.
4. Preguntar antes de adoptar una decisión irreversible.

Se permiten decisiones técnicas menores cuando sean:

- Reversibles.
- Coherentes con el proyecto.
- Sin impacto comercial.
- Sin nuevas dependencias.
- Sin costes adicionales.

---

## 3. Análisis previo

Comprobar antes de desarrollar:

### Alcance

- La tarea está incluida.
- No contradice una exclusión.
- No introduce funcionalidad futura.
- No altera el alcance comercial.

### Arquitectura

- Existe una ubicación clara.
- No se añade una capa sin necesidad.
- Se respetan patrones ya presentes.
- No se crea una abstracción para un único uso.

### Dependencias

- Angular, TypeScript, HTML y CSS nativos no son suficientes.
- La dependencia tiene mantenimiento activo.
- Su tamaño e impacto son razonables.
- Existe una justificación explícita.

### Contenido

- Los textos pueden utilizarse.
- Los recursos visuales están disponibles o marcados como provisionales.
- No se presentan datos ficticios como reales.

### Riesgos

- Seguridad.
- Privacidad.
- Costes cloud.
- Compatibilidad.
- Rendimiento.
- Accesibilidad.
- Datos personales.
- Servicios de terceros.

---

## 4. Planificación

Para tareas medianas o grandes, presentar un plan breve antes de modificar código.

Debe incluir:

1. Objetivo.
2. Archivos previstos.
3. Orden de implementación.
4. Validaciones.
5. Riesgos.
6. Decisiones pendientes.

El plan debe ser proporcional.

No crear planes extensos para cambios triviales.

---

## 5. Principios de implementación

### Simplicidad

Elegir la solución más sencilla que cumpla los requisitos.

Evitar:

- Abstracciones prematuras.
- Patrones innecesarios.
- Capas preparadas para escenarios hipotéticos.
- Componentes genéricos sin reutilización real.
- Configuración no requerida.

### Coherencia

Antes de introducir una convención:

- Revisar cómo se resuelve el mismo problema.
- Mantener nombres y estructura consistentes.
- No mezclar estilos arquitectónicos sin motivo.

### Cambios limitados

- Modificar únicamente lo necesario.
- No realizar refactors globales no solicitados.
- No reformatear archivos no relacionados.
- No cambiar nombres públicos sin necesidad.

### Código completo

No dejar:

- `TODO` sin explicación.
- Código comentado.
- Imports sin uso.
- Componentes sin referencia.
- Errores silenciados.
- Placeholders presentados como contenido final.
- Implementaciones temporales sin documentar.

---

## 6. Angular

Aplicar `standards/angular.md`.

Principios mínimos:

- Componentes standalone.
- Tipado estricto.
- `inject()` cuando mejore claridad.
- Signals para estado local síncrono cuando corresponda.
- Formularios reactivos para formularios no triviales.
- Servicios solo para lógica o estado compartido.
- Evitar suscripciones manuales innecesarias.
- Lazy loading cuando aporte valor.
- No usar `any`.

---

## 7. HTML y accesibilidad

Aplicar `standards/accessibility.md`.

Mínimos:

- HTML semántico.
- Jerarquía lógica de encabezados.
- Botones para acciones.
- Enlaces para navegación.
- Labels asociados.
- Teclado completo.
- Focus visible.
- Textos alternativos adecuados.
- ARIA solo cuando HTML nativo no sea suficiente.
- Estados de error y confirmación accesibles.
- Respeto por `prefers-reduced-motion`.

---

## 8. SCSS y responsive

Aplicar `standards/scss.md`.

- Mobile-first.
- Sin estilos inline salvo casos justificados.
- Evitar `!important`.
- Selectores simples.
- Espaciado consistente.
- Estados hover, focus, active y disabled.
- Cada breakpoint debe sentirse diseñado.
- No crear un design system complejo sin necesidad.

---

## 9. SEO

Cuando la tarea afecte a una ruta pública:

- Revisar intención de búsqueda.
- Definir title y description.
- Mantener headings correctos.
- Usar contenido indexable.
- Revisar enlaces internos.
- Revisar canonical.
- Añadir datos estructurados solo si son válidos.
- Mantener metadatos sociales.

Aplicar `standards/seo.md`.

---

## 10. Rendimiento

Aplicar `standards/performance.md`.

Evitar:

- Dependencias innecesarias.
- Imágenes sin optimizar.
- Fuentes excesivas.
- JavaScript no utilizado.
- Animaciones costosas.
- Recursos duplicados.
- Llamadas repetidas.
- Scripts de terceros sin valor claro.

---

## 11. Seguridad y privacidad

Cuando existan formularios, datos o integraciones:

- No incluir secretos en frontend.
- No subir credenciales al repositorio.
- Validar en cliente y servidor.
- No confiar únicamente en el frontend.
- Recoger solo los datos necesarios.
- Evitar logs con datos personales.
- Revisar reglas de acceso.
- Considerar spam y abuso.
- Documentar variables de entorno.
- Señalar decisiones con implicaciones legales para revisión humana.

---

## 12. Autorrevisión

Antes de finalizar:

### Funcionalidad

- Cumple el requisito.
- Maneja estados normales.
- Maneja errores previsibles.
- No rompe flujos existentes.

### Código

- Es legible.
- Está tipado.
- No tiene código muerto.
- No duplica lógica evidente.
- No añade complejidad innecesaria.

### Interfaz

- Móvil.
- Tablet.
- Escritorio.
- Estados interactivos.
- Coherencia visual.

### Calidad transversal

- Accesibilidad.
- SEO.
- Rendimiento.
- Seguridad.
- Privacidad.

---

## 13. Validación técnica

Ejecutar:

```bash
npm run validate
```

Ejecutar además los comandos específicos disponibles y relevantes.

No finalizar con:

- Build fallido.
- Lint fallido.
- Formato fallido.
- Tests relacionados fallidos.
- Errores de consola.
- Imports sin uso.

Si algo no puede validarse, indicar:

- Qué no se ejecutó.
- Por qué.
- Qué riesgo queda.
- Cómo completar la comprobación.

---

## 14. Informe final

Incluir:

### Implementado

Resultado funcional.

### Archivos principales

Archivos creados o modificados.

### Decisiones

Decisiones técnicas relevantes.

### Dependencias

Dependencias nuevas y justificación, o confirmar que no se añadieron.

### Validación

Comandos ejecutados y resultado.

### Pendientes

Únicamente pendientes reales.

No afirmar que una tarea está terminada si algo sigue sin implementar o validar.

---

## 15. Restricciones permanentes

No:

- Modificar `PROJECT-SPEC.md` sin autorización.
- Modificar `AGENTS.md` sin autorización.
- Añadir funcionalidad no solicitada.
- Inventar información comercial.
- Instalar dependencias sin justificar.
- Ocultar errores.
- Desactivar reglas para evitar corregir código.
- Reducir accesibilidad por estética.
- Introducir secretos.
- Publicar sin proceso de release.
- Realizar cambios destructivos sin advertencia.

---

## Objetivo

El resultado debe ser:

- Correcto.
- Claro.
- Accesible.
- Mantenible.
- Proporcionado.
- Alineado con el negocio.
- Preparado para revisión profesional.

La velocidad solo es una ventaja cuando no reduce la calidad.
