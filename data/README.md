# Datos locales de ADQ

Esta carpeta contendrá los datos simulados usados durante la primera fase del frontend.

Los componentes de interfaz no deben importar directamente estos archivos. El frontend debe acceder a ellos mediante la capa de servicios/repositorios de `frontend/src/services/`, de manera que posteriormente se pueda conectar una API sin reescribir la UI.

## Versículo y tarjeta de prédica

`scripture/daily-verses.json` se consume mediante `frontend/src/services/daily-verse.js`. `mode: "daily-verse"` conserva el versículo NVI; `mode: "live-sermon"` muestra `SermonCard.astro` en su lugar. No existe todavía cambio automático por horario ni conexión con Drive/Go.

El catálogo `data/catalogs/home-content-modes.json` define los modos y las variantes de prueba, cada uno con su descripción. `frontend/src/services/home-content-modes.js` lo consume y lo usan los servicios de versículo y prédica para resolver/validar la configuración; no es solo documentación ni un bloque de comentarios. La selección activa sigue en `scripture/daily-verses.json`.

Dentro de `liveSermon`, cambiar **una sola bandera** `preview` para probar:

| `preview` | Variante |
| --- | --- |
| `"live-title"` | En vivo, título y nombre |
| `"live-name"` | En vivo, solo nombre |
| `"available-title"` | Mensaje disponible, título y nombre |
| `"available-name"` | Mensaje disponible, solo nombre |
| `null` | Datos reales: respeta `isLive`, `title`, `preacher` y `outlineUrl` |

La configuración actual es `live-title` para visualizar el diseño. El nombre y título son datos de muestra. Las banderas de simulación no muestran etiquetas de prueba en la tarjeta. Si `outlineUrl` es `null`, el botón permanece inactivo, sin aviso visible de enlace pendiente; conserva una etiqueta accesible que indica que el documento no está disponible. No se inventa un documento público. Para volver al versículo, cambiar `mode` a `daily-verse`.

El contrato previsto para la API usa `isLive` (booleano), `preacher` (nombre opcional), `title` (título opcional) y `outlineUrl` (enlace HTTPS de `docs.google.com` o `drive.google.com`, o `null`). Desactivar `preview` al conectar datos reales. `frontend/src/services/sermon-card.js` normaliza ese objeto; cuando no hay título, el nombre ocupa el encabezado, sin espacios vacíos. Si no hay nombre ni título, muestra “Mensaje de la reunión”. Sin enlace ni directo, el estado real es “Mensaje”, no “Mensaje disponible”. Go podrá obtener el título del nombre del archivo; el predicador requiere un campo explícito o una convención acordada. Las credenciales de Google nunca van en el frontend.

La tarjeta de reuniones usa `home/gatherings.json`, donde `sunday.meetings` contiene una lista de reuniones con `name` y `time`; `additional` sigue el mismo formato y agrega `day`. La ubicación y el contacto se consultan mediante `frontend/src/services/gatherings.js`. Mientras `location.googleMapsUrl` sea `null`, la URL de Maps se genera a partir de `location.address`; el domicilio actual es ficticio y solo sirve como ejemplo. Al sustituir los datos, actualiza dirección y enlace si se dispone del destino real, establece `isSample` de nivel superior y `location.isSample` a `false`, y `contact.isSample` a `false` para habilitar los enlaces `tel:` / `mailto:`. Las etiquetas de muestra no se muestran en pantalla; los datos actuales no son información real. La tarjeta de Grupos Pequeños usa `home/small-groups.json` para el título y la URL que se carga dentro del modal. El iframe se crea solo cuando se abre el modal para no cargar otro sitio junto con la pantalla inicial. La imagen local está en `frontend/src/img/`; reemplázala desde esa carpeta cuando cambie la temporada o el diseño. El contenido, filtros e inscripciones siguen siendo responsabilidad de `https://grupospequenos.adq.mx/`; si se extraen componentes o una API del proyecto original, se puede sustituir el iframe más adelante sin cambiar la tarjeta.

La tarjeta de Amigo Tez usa `home/amigotez.json` y `frontend/src/services/amigotez.js` para su resumen, visita y lista de donativos en especie. `joinUrl` se mantiene en `null` hasta que haya un enlace oficial de WhatsApp; el botón de unión queda inactivo mientras tanto. Los donativos descritos se entregan presencialmente en la iglesia. El logo y la foto horizontal son espacios reservados, sin imágenes generadas. La tarjeta de Lunes de oración utiliza `home/prayer-announcement.json` mediante `frontend/src/services/prayer-announcement.js`. La composición no tiene enlaces ni modal; `image` está en `null` hasta que se agregue una fotografía, así que muestra un espacio visual neutro reemplazable por una imagen real. La tarjeta del Grupo de jóvenes lee `home/youth-announcement.json` desde `frontend/src/services/youth-announcement.js`; tiene marco blanco tipo foto instantánea, título con estilo manuscrito arriba, carrusel de tres espacios de imagen y un pie blanco con los puntos, día y horario. Avanza cada cinco segundos. No tiene modal ni navegación. Las fotos pueden agregarse en `frontend/public/images/youth/` y referenciarse en `images[].src` como `/images/youth/nombre.webp`.

## Estado de la pestaña Live

- `live/current.json` simula la respuesta que entregará Go: `status`, `provider`, `checkedAt`, `video`, `links` y `broadcastSchedule`. No contiene credenciales ni hace consultas externas.
- `catalogs/live-states.json` define los estados **`live`**, **`offline`** y **`unknown`**, sus descripciones, etiquetas y las reglas de jugador/horarios/icono. El catálogo se consume realmente desde `frontend/src/services/live.js`, no se duplica como condiciones de presentación.
- Para probar, cambiar `status` en `live/current.json`: `live` prepara reproductor e icono rojo con pulso; `offline` prepara el mensaje sin transmisión y horarios; `unknown` indica que no pudo comprobarse el estado. Un estado no reconocido cae en `unknown`.
- `video.id` será el ID del video activo de YouTube y `video.title` es opcional. Sin un ID válido no se genera iframe aunque el estado sea `live`. No se insertan videos ajenos para simular una transmisión.
- `links.youtube` y `links.facebook` permanecen en `null` hasta confirmar el canal, la página y/o los enlaces de la transmisión. `checkedAt` será la fecha ISO de la última comprobación del backend.
- Por elección del usuario, la pantalla sin transmisión muestra los **horarios generales de Amistad**, reutilizados de `home/gatherings.json` mediante `getGatherings()`, no horarios de transmisión. `broadcastSchedule` queda reservado para una posible ampliación de la API, pero la pantalla no lo consume ni infiere estado en vivo a partir de las reuniones.
- `getLiveContent()` devuelve el mock normalizado. `getLiveContent(respuestaDeGo)` usa el mismo contrato sin importar JSON directamente desde componentes. La pantalla y el dock deberán consumir el mismo resultado.
- La pantalla está en `/live/`, implementada con `LiveScreen.astro`. Menú y Live del dock son enlaces reales entre Inicio y Live. Ambos usan `getLiveContent()` para el estado del icono; `SiteBehavior.astro` comparte búsqueda y comportamiento del header/dock. El estado `offline` está activo como simulación. `live` muestra el reproductor y el icono rojo con pulso; `unknown` conserva una vista de error distinta.
- Los enlaces son los proporcionados por el usuario: `https://www.youtube.com/@AmistadDeQueretaro/streams` y `https://www.facebook.com/AmistadDeQueretaroAc`. El ID `U2_KymVaL5U` corresponde al video grabado incluido en el contexto del canal y sirve **solo para probar el reproductor**; no demuestra que exista un directo activo. Go deberá sustituirlo por el video confirmado, junto con `status`, título y enlaces específicos si existen. No se ha conectado la API de YouTube ni verificado una emisión actual.

## Usuario: plan semanal y áreas de servicio

La página `/usuario/` es un espacio público de recursos, sin login ni perfil personal ficticio. `user/resources.json` se consume mediante `frontend/src/services/user-resources.js`. Incluye una publicación del plan semanal como imagen y las áreas Multimedia, Edecanes, Alabanza, Limpieza y Transmisión, con desplegables accesibles.

`weeklyPlan.image.src` es `null` hasta recibir la imagen real: se muestra un placeholder neutro y el acceso a la imagen completa queda inactivo. Guardar el archivo, por ejemplo, en `frontend/public/resources/weekly-plan/plan.webp` y configurar `/resources/weekly-plan/plan.webp` más su texto alternativo. La imagen se muestra completa, sin recorte. No se inventan lecturas, fechas ni una imagen generada.

Cada área tiene `id`, `name`, `description` y `resources`: una lista de objetos con `title` y `url`. Las listas actuales están vacías. Para archivos locales usar `frontend/public/resources/` y rutas públicas `/resources/...`; también se admiten enlaces HTTPS. El servicio rechaza protocolos inseguros y URLs con credenciales. No se generan archivos, inscripciones, contactos o descargas ficticias.

## Página Información

`information/current.json` contiene los textos de `/informacion/`: presentación, primera visita y preguntas frecuentes. Se consume mediante `frontend/src/services/information.js`; los horarios se reutilizan de `home/gatherings.json`, sin duplicarlos. El dock enlaza a la nueva página.

La página se enfoca en personas que buscan una iglesia cristiana, conozcan o no a Cristo, y destaca únicamente las dos reuniones del domingo. La dirección y los contactos no se publican mientras sus respectivos `isSample` sean `true`; esas secciones permanecen ocultas, sin avisos pendientes ni enlaces de muestra. Sustituir los datos y confirmar las banderas antes de habilitarlos. No se han confirmado políticas de registro ni atención infantil: no se inventan esas respuestas. Las preguntas y respuestas aparecen abiertas en una lista editorial, sin enlaces individuales ni tarjetas; su contenido está incluido en el HTML estático, junto con título y descripción propios. Hay un único bloque de WhatsApp: `information/current.json` configura `whatsapp.number` (dígitos internacionales), `displayNumber`, `message`, `confirmed` e `isSample`. El número actual es de muestra y el botón está inactivo. Para habilitarlo, sustituir el número, confirmar que recibe WhatsApp y configurar `confirmed: true`, `isSample: false`. El servicio valida el formato y codifica el mensaje antes de generar el enlace.

## Mujeres, hombres y colegio

`home/community-announcements.json` contiene el texto y las referencias de imagen de las tres tarjetas nuevas, consumidas mediante `frontend/src/services/community-announcements.js`.

- **Mujeres:** composición editorial con fotografía en arco, sin navegación ni modal.
- **Hombres:** bloque tipográfico verde con título grande y horario al pie; sin foto, navegación ni modal.
- Los horarios se reutilizan de `home/gatherings.json`, buscando por `meetingName`, para mantener una sola fuente. Las imágenes permanecen en `null` hasta recibir fotografías; pueden guardarse en `frontend/public/images/community/` y referenciarse con `/images/community/nombre.webp`.
- **Colegio Renaissance:** banner sencillo con nombre y descripción a la izquierda, logo a la derecha y un único botón “Solicitar información >” debajo. Sin encabezado de inscripciones, enlace secundario ni modal. `college.logo` permanece en `null` hasta recibir el archivo real; se puede guardar en `frontend/public/images/college/` y referenciar con `/images/college/logo.webp`.
- `college.whatsappNumber` permanece en `null` y `whatsappConfirmed` en `false`. El botón dirige a `websiteUrl` mientras no exista un número confirmado. Para habilitar WhatsApp, configurar el número internacional completo, solo dígitos (por ejemplo, prefijo 52 seguido del número mexicano), marcar `whatsappConfirmed: true` y revisar `message`. No asumir que el teléfono del sitio sea un WhatsApp de admisiones.
- Los componentes se llaman `WomenAnnouncementCard.astro`, `MenAnnouncementCard.astro` y `CollegeAnnouncementCard.astro`; sus estilos están en `frontend/src/styles/community-announcements.css`.

La presentación de pastores vive en `home/pastors.json` y se consume desde `frontend/src/services/pastors.js`. No agregar datos de producción, credenciales ni secretos aquí.
