# ATSIestudio — Deploy

Este procedimiento prepara y ejecuta una publicación controlada.

No publicar si existe una comprobación obligatoria fallida.

---

## 1. Confirmar autorización

Antes de desplegar:

- Versión aprobada.
- Rama correcta.
- Pago o autorización comercial cuando corresponda.
- Entorno de destino confirmado.
- Credenciales y permisos disponibles.
- Ventana de despliegue adecuada.

---

## 2. Preparación

Comprobar:

- Variables de entorno.
- Secretos fuera del repositorio.
- Configuración de producción.
- URLs.
- Analytics.
- Consentimiento.
- Firebase o proveedor.
- Dominio.
- DNS.
- SSL.
- Backups cuando exista estado persistente.

---

## 3. Validación previa

Ejecutar:

```bash
npm ci
npm run validate
```

Cuando aplique:

- Tests adicionales.
- Build de producción.
- Emulator.
- Preview.
- Revisión manual.

No desplegar desde un entorno con cambios sin commit no entendidos.

---

## 4. Build

- Usar configuración de producción.
- Revisar warnings.
- Revisar tamaño.
- Revisar source maps según política.
- Confirmar archivos de salida.
- Confirmar sitemap y robots.

---

## 5. Despliegue

Seguir el proveedor del proyecto.

Para Firebase, comprobar:

- Proyecto correcto.
- Alias correcto.
- Target correcto.
- Hosting rewrites.
- Functions.
- Región.
- Billing.
- Secrets.
- Reglas.
- Índices.
- App Check cuando corresponda.

No ejecutar despliegues destructivos sin advertencia.

---

## 6. Verificación posterior

Realizar smoke test:

- Home.
- Navegación.
- Rutas directas.
- Formulario.
- Email o integración.
- Assets.
- Consola.
- Analytics.
- Cookies.
- Páginas legales.
- Sitemap.
- Robots.
- 404.
- Móvil.
- SSL.
- Dominio `www` y raíz cuando aplique.

---

## 7. Rollback

Antes de publicar, conocer:

- Última versión estable.
- Mecanismo de rollback.
- Datos que no deben perderse.
- Dependencias de backend.

Si aparece un problema crítico:

1. Detener cambios.
2. Evaluar impacto.
3. Hacer rollback.
4. Comunicar.
5. Registrar.
6. Corregir fuera de producción.

---

## 8. Registro

Usar `release-report-template.md`.

Registrar:

- Fecha.
- Versión.
- Commit.
- Entorno.
- Cambios.
- Comandos.
- Resultado.
- Incidencias.
- Rollback disponible.
- Responsable.

---

## 9. Cierre

Una publicación termina cuando:

- Producción responde.
- Flujos críticos funcionan.
- No hay errores críticos.
- El cliente o responsable ha sido informado.
- El informe está actualizado.
