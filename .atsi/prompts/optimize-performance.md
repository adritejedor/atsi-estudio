# ATSIestudio — Optimize Performance

Este procedimiento mejora el rendimiento basándose en mediciones, no en suposiciones.

---

## 1. Condiciones previas

Antes de optimizar:

- La funcionalidad debe estar estable.
- El contenido principal debe estar disponible.
- Debe conocerse el entorno de prueba.
- Debe evitarse medir con extensiones o procesos que alteren resultados.

---

## 2. Establecer una línea base

Registrar:

- Ruta probada.
- Dispositivo o emulación.
- Navegador.
- Entorno.
- Build de producción.
- Lighthouse.
- Core Web Vitals disponibles.
- Tamaño de bundle.
- Requests.
- Errores de consola.

No optimizar sin línea base.

---

## 3. Prioridad

Orden recomendado:

1. Problemas que bloquean la carga.
2. LCP.
3. INP o interacción lenta.
4. CLS.
5. JavaScript excesivo.
6. Imágenes.
7. Fuentes.
8. CSS.
9. Scripts de terceros.
10. Microoptimizaciones.

---

## 4. Imágenes

Comprobar:

- AVIF o WebP.
- Dimensiones adecuadas.
- `width` y `height`.
- `srcset` y `sizes` cuando aporten valor.
- Lazy loading fuera del viewport.
- Imagen LCP priorizada.
- Compresión.
- Ausencia de imágenes decorativas innecesarias.

No aplicar lazy loading a la imagen LCP principal.

---

## 5. Angular y JavaScript

Comprobar:

- Lazy loading de rutas.
- Imports innecesarios.
- Librerías grandes.
- Código muerto.
- Listeners globales.
- Renderizados repetidos.
- Suscripciones.
- Cálculos en templates.
- Polyfills no requeridos.
- Scripts de terceros.

No añadir complejidad arquitectónica para reducir cantidades irrelevantes.

---

## 6. CSS

Comprobar:

- CSS global.
- Reglas duplicadas.
- Fuentes bloqueantes.
- Animaciones.
- Layout shifts.
- Alturas no reservadas.
- Estilos de terceros.
- Especificidad.

---

## 7. Fuentes

Preferir:

- Pocas familias.
- Pocos pesos.
- Subconjuntos necesarios.
- `font-display`.
- Preload solo para fuentes críticas.
- Fuentes locales cuando sea conveniente.

No precargar recursos no críticos.

---

## 8. Red y caching

Comprobar:

- Compresión.
- Cache headers.
- CDN.
- Archivos con hash.
- Requests duplicados.
- APIs lentas.
- Payloads excesivos.
- Recursos de terceros.

---

## 9. Terceros

Para cada script externo:

- Valor aportado.
- Peso.
- Momento de carga.
- Consentimiento.
- Alternativa.
- Posibilidad de retrasarlo.

No mantener scripts “por si acaso”.

---

## 10. Animaciones

- Preferir `transform` y `opacity`.
- Evitar animar layout.
- Respetar reduced motion.
- Evitar movimiento continuo.
- Limitar observadores y listeners.

---

## 11. Validar cada cambio

Después de cada grupo de cambios:

- Build de producción.
- Medición equivalente.
- Comparar con línea base.
- Verificar funcionalidad.
- Verificar accesibilidad.

Revertir optimizaciones que compliquen mucho el código sin mejora material.

---

## 12. Criterios de finalización

- No hay regresiones.
- Las mejoras están medidas.
- El bundle es razonable.
- Imágenes críticas están optimizadas.
- No hay CLS evidente.
- No hay errores.
- Se ejecuta `npm run validate`.

---

## 13. Informe

Registrar:

- Línea base.
- Cuellos de botella.
- Cambios.
- Métricas posteriores.
- Mejoras no realizadas y motivo.
- Riesgos residuales.
