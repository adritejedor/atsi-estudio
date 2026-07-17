# ATSIestudio — Implement Feature

Este procedimiento se usa para implementar una página, sección, componente o funcionalidad concreta.

---

## 1. Reformular la tarea

Antes de editar, expresar la tarea en una frase:

- Qué se implementa.
- Qué objetivo cumple.
- Qué parte del alcance cubre.
- Qué queda fuera.

Ejemplo:

> Implementar la cabecera responsive y la navegación principal sin desarrollar todavía el contenido de las páginas.

Si no puede definirse claramente, solicitar información.

---

## 2. Comprobar alcance

Verificar:

- Está en `PROJECT-SPEC.md`.
- Pertenece a la fase actual.
- No depende de una decisión bloqueante.
- No introduce funcionalidad futura.
- No cambia el presupuesto implícitamente.

---

## 3. Revisar código relacionado

Antes de editar:

- Rutas.
- Componentes.
- Estilos globales.
- Servicios.
- Modelos.
- Tests.
- Convenciones de nombres.
- Soluciones similares existentes.

No duplicar.

---

## 4. Plan breve

Para una tarea no trivial, indicar:

1. Archivos.
2. Orden.
3. Validaciones.
4. Riesgos.

---

## 5. Implementación

### Reglas

- Implementar solo la tarea.
- Mantener cambios localizados.
- No hacer refactors globales.
- No instalar dependencias sin aprobación.
- No modificar `PROJECT-SPEC.md`.
- No modificar `AGENTS.md`.
- No inventar datos.

### Angular

- Standalone.
- Tipado estricto.
- `inject()` cuando corresponda.
- Signals cuando mejoren claridad.
- Control flow moderno.
- Lógica compleja fuera del template.
- Componentes enfocados.

### HTML

- Semántico.
- Botones para acciones.
- Enlaces para navegación.
- Labels visibles.
- Sin elementos interactivos anidados.
- Headings coherentes.

### SCSS

- Mobile-first.
- Estilos locales para reglas específicas.
- Globales solo para reglas realmente globales.
- Sin `!important`.
- Sin anidación excesiva.
- Hover y focus coherentes.
- Reduced motion.

---

## 6. Estados de interfaz

Implementar cuando apliquen:

- Inicial.
- Cargando.
- Correcto.
- Vacío.
- Error.
- Deshabilitado.
- Confirmación.

No implementar solo el caso ideal.

---

## 7. Formularios

- Labels visibles.
- Validación comprensible.
- Errores asociados.
- Prevención de doble envío.
- Estado de carga.
- Confirmación.
- Error recuperable.
- Validación de servidor cuando exista backend.
- Sin secretos en frontend.
- Antispam si está en alcance.

---

## 8. Contenido

- No usar Lorem Ipsum.
- No inventar testimonios.
- No inventar clientes.
- No inventar cifras.
- No inventar datos de contacto.
- Marcar placeholders pendientes.

El copy debe ser:

- Claro.
- Directo.
- Natural.
- Sin promesas exageradas.
- Alineado con conversión y SEO.

---

## 9. Accesibilidad

Comprobar durante el desarrollo:

- Teclado.
- Focus.
- Semántica.
- Labels.
- Mensajes.
- Contraste.
- Textos alternativos.
- Reduced motion.
- Áreas interactivas adecuadas.

---

## 10. Responsive

Revisar:

- Móvil estrecho.
- Móvil grande.
- Tablet.
- Escritorio.
- Escritorio amplio.

Comprobar:

- Overflow.
- Navegación.
- Grids.
- Texto.
- Imágenes.
- Formularios.
- Botones.
- Espaciado.

---

## 11. SEO

Para páginas públicas:

- Un `h1`.
- Jerarquía lógica.
- Texto indexable.
- Enlaces internos.
- Sin duplicación.
- Keyword natural.
- Title y description cuando la página esté completa.

---

## 12. Validación

1. Revisión visual.
2. Consola.
3. Tests relacionados.
4. `npm run validate`.

No silenciar errores.

---

## 13. Finalización

La tarea termina cuando:

- Cumple el requisito.
- No amplía alcance.
- Funciona en breakpoints aplicables.
- Es accesible.
- No introduce errores.
- No contiene código temporal.
- No contiene datos inventados.
- Supera las validaciones.

---

## 14. Informe final

Incluir:

- Implementado.
- Archivos modificados.
- Decisiones técnicas.
- Dependencias.
- Validación.
- Pendientes.
- Próximo paso.
