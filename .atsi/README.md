# ATSIestudio Workflow

**Versión:** 1.0.0

Esta carpeta contiene el sistema operativo interno utilizado por ATSIestudio para transformar una necesidad de negocio en un proyecto web planificado, implementado, revisado y preparado para producción.

El sistema está diseñado para trabajar con un agente de programación dentro del repositorio, especialmente Codex, sin delegar en la IA la responsabilidad profesional sobre el resultado.

La IA acelera el desarrollo, pero no sustituye:

- La definición del alcance.
- La toma de decisiones comerciales.
- La revisión humana.
- El control de calidad.
- La validación de seguridad y privacidad.
- La aprobación del cliente.
- La responsabilidad sobre la entrega.

---

## 1. Documentos principales del repositorio

### `AGENTS.md`

Define cómo debe comportarse el agente dentro del proyecto.

Debe contener:

- Stack tecnológico.
- Convenciones generales.
- Restricciones.
- Comandos de validación.
- Reglas de calidad.
- Normas específicas del repositorio.

Debe leerse antes de modificar código.

No debe modificarse durante una tarea normal salvo autorización expresa.

### `PROJECT-SPEC.md`

Define qué debe construirse para el proyecto actual.

Debe contener:

- Contexto del negocio.
- Objetivos.
- Público objetivo.
- Conversión principal.
- Alcance.
- Páginas y secciones.
- Funcionalidades.
- Identidad visual.
- SEO.
- Requisitos técnicos.
- Exclusiones.

Es la fuente principal de verdad sobre el producto.

Toda funcionalidad no incluida expresamente se considera fuera de alcance hasta que sea aprobada.

### `.atsi/`

Contiene los procedimientos, estándares, checklists y plantillas utilizados por ATSIestudio.

---

## 2. Estructura

```text
.atsi/
├── README.md
├── VERSION.md
├── CHANGELOG.md
│
├── prompts/
│   ├── master.md
│   ├── create-project.md
│   ├── implement-feature.md
│   ├── review-code.md
│   ├── optimize-performance.md
│   ├── optimize-seo.md
│   └── deploy.md
│
├── standards/
│   ├── angular.md
│   ├── scss.md
│   ├── accessibility.md
│   ├── seo.md
│   └── performance.md
│
├── checklists/
│   ├── qa.md
│   ├── accessibility.md
│   ├── seo.md
│   ├── performance.md
│   └── release.md
│
└── templates/
    ├── project-spec-template.md
    ├── implementation-plan-template.md
    ├── qa-report-template.md
    └── release-report-template.md
```

---

## 3. Responsabilidad de cada carpeta

### `prompts/`

Define procedimientos que el agente debe seguir para ejecutar una tarea.

Los prompts explican **cómo trabajar**.

### `standards/`

Define los criterios técnicos permanentes de ATSIestudio.

Los estándares explican **qué nivel de calidad se espera**.

### `checklists/`

Contiene listas objetivas de comprobación.

Los checklists permiten confirmar **qué se ha validado**.

### `templates/`

Contiene documentos reutilizables para planificar y registrar proyectos.

Las plantillas permiten mantener **una estructura común y trazable**.

---

## 4. Jerarquía de instrucciones

Cuando existan varias instrucciones, se aplica el siguiente orden:

1. Instrucción explícita del usuario para la tarea actual.
2. `PROJECT-SPEC.md`.
3. `AGENTS.md`.
4. `.atsi/prompts/`.
5. `.atsi/standards/`.
6. `.atsi/checklists/`.
7. Convenciones ya existentes en el proyecto.

Si dos instrucciones se contradicen:

1. No elegir arbitrariamente.
2. Explicar la contradicción.
3. Indicar el impacto de cada alternativa.
4. Solicitar una decisión antes de realizar cambios irreversibles.

---

## 5. Flujo general

```text
Briefing del cliente
        ↓
PROJECT-SPEC.md
        ↓
Análisis con create-project.md
        ↓
Plan de implementación
        ↓
Desarrollo por tareas con implement-feature.md
        ↓
Revisión técnica con review-code.md
        ↓
Optimización específica
        ↓
QA
        ↓
Revisión del cliente
        ↓
Correcciones incluidas
        ↓
Release checklist
        ↓
Despliegue
        ↓
Verificación de producción
```

---

## 6. Uso recomendado con Codex

### Inicio de proyecto

```text
Lee completamente AGENTS.md, PROJECT-SPEC.md, .atsi/README.md,
.atsi/prompts/master.md y .atsi/prompts/create-project.md.

Utiliza .atsi/templates/implementation-plan-template.md para preparar
un plan de implementación.

No modifiques código todavía.
```

### Implementación de una tarea

```text
Sigue AGENTS.md, PROJECT-SPEC.md, .atsi/prompts/master.md y
.atsi/prompts/implement-feature.md.

Implementa únicamente la siguiente tarea:
[DESCRIPCIÓN].
```

### Revisión técnica

```text
Aplica .atsi/prompts/review-code.md al trabajo implementado.

Corrige los problemas críticos y altos que estén dentro del alcance.
No añadas funcionalidades nuevas.
```

### Optimización de rendimiento

```text
Aplica .atsi/prompts/optimize-performance.md.

Mide primero, identifica los principales cuellos de botella y realiza
solo cambios justificables.
```

### Optimización SEO

```text
Aplica .atsi/prompts/optimize-seo.md a las rutas públicas del proyecto.

No alteres el significado comercial del contenido sin indicarlo.
```

### QA

```text
Ejecuta .atsi/checklists/qa.md y registra el resultado usando
.atsi/templates/qa-report-template.md.
```

### Despliegue

```text
Sigue .atsi/prompts/deploy.md y .atsi/checklists/release.md.

No publiques mientras exista una comprobación obligatoria fallida.
```

---

## 7. Principios fundamentales

- La especificación se define antes de programar.
- No se añaden funcionalidades fuera de alcance.
- Se prioriza la solución más sencilla que cumpla los requisitos.
- No se instalan dependencias sin una necesidad concreta.
- La IA no toma decisiones comerciales.
- El código generado se revisa.
- Compilar no significa que el proyecto esté terminado.
- Accesibilidad, rendimiento, SEO y privacidad forman parte del producto.
- Los cambios del cliente se clasifican como corrección, cambio incluido o ampliación.
- Toda entrega debe superar las validaciones aplicables.
- Las métricas orientativas no justifican degradar la experiencia de usuario.
- No se inventan testimonios, clientes, proyectos, cifras ni datos de contacto.

---

## 8. Evolución del sistema

La carpeta `.atsi` debe evolucionar a partir de proyectos reales.

Cuando aparezca un problema recurrente:

1. Documentarlo.
2. Identificar si corresponde a un prompt, estándar, checklist o plantilla.
3. Actualizar únicamente el documento correcto.
4. Evitar duplicar la misma regla en varios archivos.
5. Registrar el cambio en `CHANGELOG.md`.
6. Incrementar la versión cuando corresponda.

El objetivo no es crear documentación extensa por sí misma, sino acumular conocimiento operativo útil y reutilizable.
