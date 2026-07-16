# ATSIestudio — Project instructions

## Stack

- Angular 21
- Standalone APIs
- TypeScript strict
- SCSS
- Angular Router
- npm

## General principles

- Keep the implementation as simple as the project allows.
- Do not create abstractions without a concrete need.
- Do not install dependencies without explaining why they are necessary.
- Do not introduce UI libraries unless the project specification requests one.
- Do not add functionality outside the documented scope.
- Prefer Angular's native capabilities before external packages.

## Angular conventions

- Use standalone components.
- Use signals for local synchronous state when appropriate.
- Use the built-in Angular control-flow syntax.
- Prefer the `inject()` function for dependency injection.
- Keep components focused and reasonably small.
- Keep templates semantic and accessible.
- Avoid `any`.
- Use lazy-loaded routes when the project has multiple pages or feature areas.

## Styling

- Use SCSS.
- Build layouts mobile first.
- Avoid inline styles.
- Keep global styles limited.
- Define project-specific visual tokens only when required by the project.
- Do not create a generic design system unless the specification requires it.

## Accessibility

- Use semantic HTML.
- Ensure interactive elements are keyboard accessible.
- Provide visible focus states.
- Associate labels and controls correctly.
- Use ARIA only when native HTML is insufficient.
- Respect reduced-motion preferences when animations are introduced.

## Performance

- Avoid unnecessary dependencies.
- Lazy-load images and routes where appropriate.
- Use optimized image formats.
- Do not load resources the current project does not need.

## Before completing a task

Run:

```bash
npm run validate