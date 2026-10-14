# Requerimientos del frontend para el backend

## 1. Alcance

Este documento describe únicamente la información y los comportamientos que necesita el frontend. No prescribe lenguaje, framework, almacenamiento, rutas de endpoints ni estrategia de implementación del backend.

Actualmente el frontend consume JSON locales mediante servicios. Live y la tarjeta de prédica son vistas preparadas con datos simulados; el estado `live` y el video de muestra no demuestran una transmisión real.

## 2. Pantalla Live

### Información requerida

| Campo actual | Necesidad del frontend |
| --- | --- |
| `status` | `live`: transmisión activa; `offline`: ausencia confirmada de transmisión; `unknown`: no se pudo determinar el estado. |
| `provider` | Identificar la plataforma del reproductor; actualmente `youtube`. |
| `checkedAt` | Fecha de comprobación en ISO 8601, o `null` si no existe una comprobación. |
| `video.id` | ID válido del video activo para construir el reproductor de YouTube; `null` si no hay video. |
| `video.title` | Título del video, opcional; admite `null`. |
| `links.youtube` | Enlace HTTPS para abrir la transmisión o el canal en YouTube. |
| `links.facebook` | Enlace HTTPS para abrir Facebook como alternativa externa. |

### Comportamientos requeridos

- [ ] Recibir un estado actualizado sin cambiar manualmente el JSON ni reconstruir el frontend.
- [ ] Usar el mismo resultado para la pantalla Live y el icono del dock: rojo con pulso solamente en estado `live`.
- [ ] En estado `live`, recibir el ID del directo correspondiente y un video que permita reproducción integrada. No usar una grabación de muestra como directo real.
- [ ] En estado `offline`, mostrar el aviso de que no estamos transmitiendo y los horarios generales de Amistad.
- [ ] En estado `unknown`, distinguir la imposibilidad de consultar del resultado “no hay transmisión”.
- [ ] No determinar el estado por los horarios ni presentar información vencida como recién comprobada.
- [ ] Mantener los accesos externos disponibles como alternativa al reproductor.

**Destinos configurados:**

- YouTube: `https://www.youtube.com/@AmistadDeQueretaro/streams`.
- Facebook: `https://www.facebook.com/AmistadDeQueretaroAc`.

**Referencias del contrato actual:** `../data/live/current.json`, `../data/catalogs/live-states.json` y `../frontend/src/services/live.js`.

El campo actual `broadcastSchedule` no se usa para presentar un calendario de transmisiones. La pantalla necesita los horarios generales descritos en la sección 4.

## 3. Tarjeta de prédica y documento de Drive

### Información requerida

| Campo actual | Necesidad del frontend |
| --- | --- |
| `isLive` | Indicar si la prédica está en vivo; es independiente de la existencia de un documento. |
| `preacher` | Nombre de quien predica. El servicio admite `null` si no está disponible. |
| `title` | Título opcional del mensaje; admite `null`. Sin título, el nombre del predicador funciona como encabezado. |
| `outlineUrl` | Enlace HTTPS del documento en `drive.google.com` o `docs.google.com`; `null` si no está disponible. |

### Comportamientos requeridos

- [ ] Recibir el documento correspondiente al mensaje vigente sin editar el enlace del frontend en cada reunión.
- [ ] Poder abrir el documento con los permisos disponibles para los asistentes, sin necesitar credenciales internas del backend.
- [ ] Mostrar correctamente las variantes con título y sin título.
- [ ] Mantener inactivo el acceso al documento cuando no exista un enlace disponible.
- [ ] No presentar una prédica antigua como la actual si aún no hay documento vigente.
- [ ] Diferenciar “prédica en vivo” de “mensaje disponible” y de “transmisión activa”: no son necesariamente el mismo estado.
- [ ] Consumir datos reales sin activar las banderas de vista previa; `preview` debe quedar en `null` o ausente.

El frontend usa un botón que abre el documento original, **no un QR**.

**Pendiente de definición funcional:** cuándo sustituir el versículo por la tarjeta de prédica y cuándo volver a mostrar el versículo. No hay una regla de horario automático acordada todavía. Los modos actuales son `daily-verse` y `live-sermon`.

**Referencias:** `../data/scripture/daily-verses.json`, `../data/catalogs/home-content-modes.json` y `../frontend/src/services/sermon-card.js`.

## 4. Horarios generales y contenido de Inicio

- [ ] Recibir los horarios generales de Amistad con día, nombre de reunión y hora, conservando la estructura actual de los datos.
- [ ] Mantener separadas la primera y segunda reunión del domingo.
- [ ] Usar la misma información de horarios en Inicio y en Live para evitar diferencias entre pantallas.
- [ ] No etiquetar los horarios generales como horarios de transmisión.
- [ ] Recibir los contenidos de Inicio con campos equivalentes a los JSON actuales cuando se sustituyan los mocks.
- [ ] Distinguir información real de datos de muestra y permitir valores ausentes para imágenes, contactos y enlaces todavía no confirmados.

**Referencias:** `../data/home/`, `../data/scripture/` y `../frontend/src/services/gatherings.js`.

## 5. Condiciones de consumo

- [ ] Poder consultar la información desde la aplicación desplegada durante su uso, no solamente durante la generación del sitio.
- [ ] Recibir respuestas estructuradas compatibles con los servicios actuales; cualquier cambio de contrato debe acordarse con el frontend.
- [ ] Distinguir datos ausentes, ausencia confirmada y errores de consulta.
- [ ] Recibir enlaces HTTPS válidos, sin credenciales ni secretos internos en las respuestas.
- [ ] No requerir que el navegador conozca claves o tokens internos de YouTube o Drive.

Los textos de presentación, colores, animaciones y estados visuales permanecen en el frontend; no es necesario que el backend los determine.

## 6. Criterios de aceptación

- [ ] Al iniciar o terminar una transmisión real, pantalla e icono reflejan el mismo estado sin editar archivos locales.
- [ ] Sin transmisión se muestran el aviso y los horarios generales; ante un error no se afirma que estamos offline.
- [ ] El documento vigente abre correctamente, con o sin título del mensaje.
- [ ] La falta de documento no lleva a un enlace inventado ni a una prédica anterior presentada como actual.
- [ ] Los datos de producción no dependen de banderas de prueba ni del video grabado usado para la demostración.
