# ATSIestudio — Create Project

Este procedimiento se utiliza al comenzar un proyecto nuevo desde el starter.

Su resultado debe ser un plan aprobado, no una implementación.

---

## 1. Lectura inicial

Leer:

1. `AGENTS.md`.
2. `PROJECT-SPEC.md`.
3. `.atsi/README.md`.
4. `.atsi/prompts/master.md`.
5. `package.json`.
6. Configuración de Angular.
7. Rutas y estilos existentes.

No modificar código todavía.

---

## 2. Comprensión del proyecto

Identificar:

### Negocio

- Actividad.
- Propuesta de valor.
- Cliente objetivo.
- Problema que resuelve.
- Tono y personalidad.

### Objetivos

- Conversión principal.
- Conversiones secundarias.
- Acciones esperadas.

### Alcance

- Rutas.
- Páginas.
- Secciones.
- Funcionalidades.
- Integraciones.
- Contenido.
- Exclusiones.

### Diseño

- Identidad visual.
- Paleta.
- Tipografía.
- Composición.
- Animaciones.
- Responsive.

### Requisitos técnicos

- Versión de Angular.
- Hosting.
- Backend.
- Servicios externos.
- SEO.
- Accesibilidad.
- Rendimiento.

---

## 3. Detección de ambigüedades

Buscar:

- Datos de contacto sin definir.
- Rutas contradictorias.
- Contenido pendiente.
- Recursos visuales inexistentes.
- Funcionalidades descritas parcialmente.
- Integraciones sin proveedor.
- Elementos incluidos y excluidos a la vez.
- Decisiones con impacto en costes.
- Datos personales sin tratamiento definido.

Clasificar:

### Bloqueante

Impide implementar una parte esencial.

### No bloqueante

Permite avanzar con una decisión temporal y reversible.

No inventar información real.

---

## 4. Priorización

Separar:

### MVP obligatorio

Necesario para cumplir el objetivo principal.

### Incluido complementario

Forma parte del alcance, pero puede implementarse después del núcleo.

### Futuro

Mencionado como evolución, no se implementa ahora.

No mover requisitos obligatorios a futuro sin autorización.

---

## 5. Arquitectura propuesta

Definir de forma proporcionada:

- Rutas.
- Componentes.
- Servicios.
- Modelos.
- Datos.
- Formularios.
- SEO.
- Estilos.
- Integraciones.
- Infraestructura.

No crear automáticamente:

- `core`.
- `shared`.
- `features`.
- Librerías internas.
- Capas de repositorio.
- Design system completo.

Solo cuando exista necesidad concreta.

---

## 6. Dependencias

Para cada dependencia propuesta:

- Nombre.
- Problema que resuelve.
- Motivo por el que Angular nativo no basta.
- Impacto aproximado.
- Estado de mantenimiento.
- Alternativa sin dependencia.

No instalar durante esta fase.

---

## 7. Contenido y recursos

Registrar:

- Copy disponible.
- Copy a generar.
- Copy que requiere validación.
- Logo.
- Imágenes.
- Iconos.
- Datos legales.
- Datos de contacto.
- Proyectos y casos de éxito.

Cuando falte material:

- Usar placeholders claramente identificados.
- No presentar recursos provisionales como finales.
- No inventar trabajos o clientes.

---

## 8. Plan de implementación

Usar `templates/implementation-plan-template.md`.

Dividir en fases pequeñas y verificables.

Cada fase debe incluir:

- Objetivo.
- Alcance.
- Archivos previstos.
- Criterios de aceptación.
- Dependencias.
- Riesgos.

Orden orientativo:

1. Base y estructura.
2. Sistema visual mínimo.
3. Layout y navegación.
4. Rutas y páginas.
5. Funcionalidades.
6. Formularios e integraciones.
7. SEO.
8. Responsive y accesibilidad.
9. QA.
10. Infraestructura y despliegue.

---

## 9. Criterios globales

El plan debe contemplar:

- Rutas funcionales.
- Navegación responsive.
- Contenido coherente.
- Estados de formularios.
- Headings correctos.
- Metadatos por ruta.
- Navegación por teclado.
- Móvil, tablet y escritorio.
- Cero errores de consola.
- `npm run validate`.
- Ausencia de funcionalidad fuera de alcance.

---

## 10. Respuesta esperada

Entregar:

1. Resumen del proyecto.
2. Ambigüedades bloqueantes.
3. Ambigüedades no bloqueantes.
4. Arquitectura propuesta.
5. Dependencias propuestas.
6. Plan de implementación.
7. Primer paso recomendado.

No crear, editar ni eliminar archivos en esta fase.
