# Proyecto Web — Iglesia

## 1. Descripción general

El proyecto consiste en desarrollar una plataforma web moderna para la iglesia, enfocada principalmente en ofrecer una experiencia:

- Funcional.
- Moderna.
- Intuitiva.
- Cómoda.
- Fácil de utilizar.
- Escalable.
- Visualmente atractiva.
- Optimizada principalmente para teléfonos móviles.

La plataforma tendrá como concepto principal una experiencia inspirada en los patrones de navegación y consumo de contenido de una **red social**, adaptada completamente al contexto y necesidades de la iglesia.

La primera fase estará enfocada exclusivamente en el **frontend y la experiencia visual**.

---

## 2. Objetivo del proyecto

Crear una plataforma web que permita a las personas **informarse, descubrir contenido y encontrar recursos de la iglesia de una manera natural y sencilla**.

La intención es alejarse de la experiencia tradicional de un sitio web institucional, donde el usuario debe recorrer menús y páginas para encontrar información.

En su lugar, la plataforma deberá presentar el contenido de una manera dinámica, visual y familiar.

El usuario deberá poder entrar al sitio y comenzar a explorar inmediatamente, sin necesitar conocer previamente la estructura de la página.

El objetivo principal es que la navegación se sienta cómoda y natural, permitiendo que una persona pueda encontrar contenido útil incluso cuando no sabe exactamente qué está buscando.

---

## 3. Alcance de la primera fase

La primera fase consistirá exclusivamente en desarrollar el frontend.

Se utilizará:

- React.
- Datos simulados.
- Componentes reutilizables.
- Diseño responsive.
- Arquitectura escalable.
- Animaciones.
- Recursos multimedia simulados.
- CleanCode
- Comentarios
- Buenas practicas

No existirá un backend real durante esta fase.

La aplicación deberá comportarse visualmente como un producto funcional, utilizando información almacenada localmente para simular el comportamiento que posteriormente tendrá con un backend.

---

## 4. Datos simulados

Los datos utilizados por la aplicación estarán almacenados dentro de:

```text
Data/
```

Esta carpeta representará temporalmente la fuente de información de la aplicación.

Conceptualmente:

```text
Primera fase

React
  ↓
Capa de datos
  ↓
Data/
```

En una fase posterior:

```text
React
  ↓
Capa de datos / servicios
  ↓
API
  ↓
Backend
  ↓
Base de datos
```

La arquitectura deberá permitir realizar esta transición sin tener que modificar significativamente los componentes visuales.

### Importante

Los componentes de React no deberán depender directamente de la estructura física de los archivos dentro de `Data/`.

Se deberá utilizar una capa intermedia para acceder a la información.

Por ejemplo:

```text
Componentes
     ↓
Servicios / repositorios
     ↓
Data simulada
```

Posteriormente:

```text
Componentes
     ↓
Servicios / repositorios
     ↓
API
```

Esto permitirá que la fuente de información pueda cambiar sin afectar directamente a la interfaz.

---

## 5. Concepto de red social

La plataforma **no será una red social**.

No tendrá como objetivo crear una comunidad digital basada en usuarios, seguidores o interacción entre personas.

La idea es utilizar los patrones de experiencia que las personas ya conocen de las redes sociales para construir una web más cómoda, intuitiva y natural.

La plataforma deberá dar la sensación de que el visitante está entrando directamente a un espacio de contenido que ya conoce y puede comenzar a utilizar inmediatamente.

Las principales referencias visuales y de experiencia serán:

- Instagram.
- LinkedIn.

Estas referencias se utilizarán únicamente como inspiración para UX/UI.

No se pretende copiar ninguna de estas plataformas.

---

## 6. Inspiración de Instagram

De Instagram se podrán tomar como referencia conceptos relacionados con la plataforma

Estos patrones deberán adaptarse completamente al contexto de la iglesia.

---

## 7. Inspiración de LinkedIn

De LinkedIn se podrán tomar como referencia conceptos relacionados con la plataforma

Estos patrones deberán utilizarse como referencia de experiencia y no como una copia visual.

---

## 8. Experiencia de usuario

La plataforma deberá sentirse como un espacio familiar y sencillo de utilizar.

El usuario no deberá necesitar comprender primero cómo funciona el sitio para comenzar a utilizarlo.

La experiencia ideal será:

```text
Entrar
  ↓
Encontrar contenido inmediatamente
  ↓
Explorar
  ↓
Descubrir recursos
  ↓
Informarse
  ↓
Encontrar algo útil
  ↓
Continuar explorando
```

En lugar de una experiencia tradicional:

```text
Entrar
  ↓
Leer un menú
  ↓
Buscar una sección
  ↓
Entrar a una página
  ↓
Buscar información
```

La plataforma deberá priorizar el contenido y su descubrimiento.

---

## 9. Objetivo de navegación

La navegación deberá ser:

- Natural.
- Familiar.
- Visual.
- Predecible.
- Sencilla.
- Descubrible.
- Consistente.

El usuario no deberá necesitar conocer la estructura interna del sitio para encontrar información.

Las diferentes secciones deberán estar relacionadas entre sí para facilitar el descubrimiento de contenido.

Por ejemplo:

```text
Publicación
    ↓
Evento
    ↓
Recurso relacionado
    ↓
Predicación
    ↓
Otro contenido
```

La plataforma deberá funcionar como un **ecosistema de contenido**, en lugar de ser únicamente un conjunto de páginas independientes.

---

## 10. Contenido

La plataforma estará enfocada en presentar información y recursos de la iglesia.

El contenido podrá incluir:

- Publicaciones.
- Avisos.
- Eventos.
- Actividades.
- Predicaciones.
- Estudios.
- Recursos.
- Fotografías.
- Videos.
- Materiales.
- Información de ministerios.
- Información general de la iglesia.
- Contenido destacado.
- Noticias o comunicados.
- Recursos recomendados.

La estructura exacta y prioridad de cada tipo de contenido se definirá durante la etapa de planificación y diseño.

---

## 11. Adaptación de patrones de red social

Los conceptos de las redes sociales deberán transformarse para cumplir una función informativa.

### Feed

No representará publicaciones personales.

Representará contenido de la iglesia como:

- Avisos.
- Publicaciones.
- Eventos.
- Recursos.
- Contenido multimedia.
- Información relevante.

### Notificaciones

No representarán mensajes entre usuarios.

Podrán utilizarse para:

- Eventos próximos.
- Nuevos recursos.
- Nuevas predicaciones.
- Avisos importantes.
- Actividades.
- Recordatorios.
- Contenido relevante.

### Mensajes

No existirán mensajes privados entre usuarios.

El concepto podrá utilizarse visualmente para representar información o comunicaciones relevantes de la iglesia cuando tenga sentido.


### Explorar

Podrá utilizarse para descubrir:

- Predicaciones.
- Estudios.
- Recursos.
- Eventos.
- Actividades.
- Contenido multimedia.
- Información de la iglesia.

---

## 12. Ausencia de usuarios y cuentas

La plataforma **no contempla un sistema de usuarios**.

No existirán:

- Registro.
- Inicio de sesión.
- Contraseñas.
- Cuentas personales.
- Perfiles personales.
- Seguidores.
- Amigos.
- Mensajes privados.
- Interacciones entre usuarios.
- Sistema de autenticación.

La sensación de estar dentro de un espacio personal deberá conseguirse mediante la experiencia de navegación y la forma en que se organiza el contenido.

El visitante deberá sentir que el sitio está listo para él desde el momento en que entra.

---

## 13. Descubrimiento de contenido

Uno de los objetivos principales de la plataforma será facilitar el descubrimiento.

El usuario no necesariamente deberá saber qué está buscando antes de entrar.

La interfaz deberá permitir que pueda explorar y encontrar contenido relevante de manera natural.

Por ejemplo, una persona podría entrar buscando un evento y terminar encontrando:

```text
Evento
  ↓
Ministerio relacionado
  ↓
Recurso
  ↓
Predicación
  ↓
Estudio
```

La navegación deberá generar conexiones naturales entre diferentes tipos de contenido.

---

## 14. Mobile-first

El desarrollo será **mobile-first**.

La prioridad será:

```text
Móvil
  ↓
Tablet
  ↓
Desktop
```

La versión móvil no deberá ser simplemente una versión reducida de escritorio.

La experiencia deberá diseñarse primero considerando:

- Pantallas pequeñas.
- Navegación con una mano.
- Botones táctiles.
- Lectura rápida.
- Scroll vertical.
- Contenido multimedia.
- Rendimiento.
- Conectividad variable.

Posteriormente se adaptará la interfaz a pantallas más grandes.

---

## 15. Responsive design

La aplicación deberá funcionar correctamente en:

- Teléfonos.
- Tablets.
- Laptops.
- Monitores de escritorio.

El diseño deberá adaptarse progresivamente a diferentes tamaños de pantalla.

No deberá depender de dimensiones específicas de un dispositivo.

---

## 16. Facilidad de uso

La plataforma deberá poder ser utilizada por personas de diferentes edades y niveles de experiencia tecnológica.

Se deberá priorizar:

- Navegación sencilla.
- Jerarquía visual clara.
- Tipografía legible.
- Botones fáciles de identificar.
- Iconos comprensibles.
- Mensajes claros.
- Pocos pasos para realizar acciones.
- Estados visuales claros.
- Consistencia entre las diferentes secciones.

La interfaz deberá evitar complejidad innecesaria.

El usuario deberá poder comprender rápidamente:

1. Dónde está.
2. Qué información está viendo.
3. Qué puede hacer.
4. Cómo regresar.
5. Cómo continuar explorando.

---

## 17. Animaciones

La aplicación deberá utilizar animaciones para mejorar la experiencia de usuario.

Se podrán utilizar para:

- Transiciones.
- Navegación.
- Aparición de contenido.
- Interacciones.
- Modales.
- Tarjetas.
- Feed.
- Estados de carga.
- Feedback de acciones.

Las animaciones deberán ser:

- Fluidas.
- Consistentes.
- Sutiles cuando sea necesario.
- Optimizadas para dispositivos móviles.

No deberán utilizarse animaciones únicamente por motivos decorativos si perjudican:

- Rendimiento.
- Accesibilidad.
- Legibilidad.
- Usabilidad.

También deberá contemplarse la preferencia de usuarios que reduzcan el movimiento.

---

## 18. Accesibilidad

La accesibilidad deberá considerarse desde la primera fase.

Se deberá prestar atención a:

- Contraste.
- Tamaño de texto.
- Áreas táctiles.
- Navegación.
- Estados de foco.
- Textos alternativos.
- Jerarquía semántica.
- Lectores de pantalla cuando corresponda.
- Reducción de movimiento.

La accesibilidad no deberá tratarse como una característica que se agrega al final.

---

## 19. Arquitectura escalable

Aunque la primera fase solamente contempla el frontend, la estructura deberá permitir agregar nuevas funcionalidades posteriormente.

Se deberá evitar construir páginas aisladas con lógica y datos mezclados.

La arquitectura deberá favorecer:

```text
UI
 ↓
Componentes
 ↓
Lógica de presentación
 ↓
Servicios
 ↓
Fuente de datos
```

Esto permitirá que la aplicación pueda evolucionar progresivamente.

---

## 20. Separación de responsabilidades

Se deberá mantener una separación clara entre:

### UI

Responsable de representar visualmente la información.

### Componentes

Elementos reutilizables de la interfaz.

### Lógica

Comportamiento y procesamiento necesario para la aplicación.

### Servicios

Obtención y transformación de información.

### Datos

Información simulada utilizada durante esta primera fase.

Esta separación deberá facilitar la futura conexión con el backend.

---

## 21. Hosting

El frontend será alojado inicialmente en **HostGator**, utilizando el plan de negocio disponible.

Por esta razón, las decisiones relacionadas con el frontend y despliegue deberán considerar las características del entorno de hosting.

El backend será alojado posteriormente en un servidor independiente.

Arquitectura prevista:

```text
                 Usuario
                    │
                    ▼
             ┌─────────────┐
             │  Frontend   │
             │    React    │
             │  HostGator  │
             └──────┬──────┘
                    │
               API futura
                    │
                    ▼
             ┌─────────────┐
             │   Backend   │
             │   Servidor  │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │ Base datos  │
             └─────────────┘
```

Durante la primera fase:

```text
Frontend
   ↓
Data/
```

---

## 22. Rendimiento

Debido a que la prioridad serán los dispositivos móviles, el rendimiento deberá considerarse desde el inicio.

Se deberá prestar atención a:

- Tamaño de imágenes.
- Carga de recursos.
- Cantidad de JavaScript.
- Animaciones.
- Lazy loading.
- Renderizado.
- Fuentes.
- Videos.
- Recursos multimedia.

La experiencia deberá mantenerse fluida en dispositivos móviles de diferentes capacidades.

---

## 23. Identidad visual

La identidad visual definitiva de la iglesia se definirá durante una etapa posterior.

En esta fase se establecerá primero:

- Sistema visual.
- Jerarquía.
- Componentes.
- Espaciados.
- Tipografía.
- Comportamiento responsive.
- Interacciones.
- Animaciones.

Las decisiones de colores, iconografía, branding y elementos específicos deberán poder modificarse sin tener que reconstruir toda la aplicación.

---

## 24. Referencias visuales

Las principales referencias serán:

- Instagram.
- LinkedIn.

Las referencias específicas mediante capturas, imágenes o ejemplos serán incorporadas durante el desarrollo de cada sección.

Las referencias deberán utilizarse para analizar:

- UX.
- UI.
- Navegación.
- Distribución.
- Interacciones.
- Patrones conocidos.
- Jerarquía de contenido.

No deberán utilizarse para copiar directamente diseños, componentes o identidad visual.

---

## 25. Primera fase — Resultado esperado

Al finalizar la primera fase deberá existir una aplicación frontend navegable que:

- Utilice React.
- Funcione principalmente en móvil.
- Sea responsive.
- Utilice datos simulados desde `Data/`.
- Simule el comportamiento de una aplicación real mediante datos locales.
- Tenga una experiencia inspirada en redes sociales.
- No requiera usuarios ni autenticación.
- Utilice componentes reutilizables.
- Tenga animaciones.
- Mantenga una estructura escalable.
- Sea visualmente consistente.
- Facilite el descubrimiento de contenido.
- Esté preparada para conectar posteriormente con un backend.

La aplicación deberá sentirse como un producto funcional, aunque los datos y ciertas funcionalidades sean simulados.

---

## 26. Fuera del alcance de la primera fase

No se desarrollará inicialmente:

- Backend.
- Base de datos real.
- Autenticación.
- Registro de usuarios.
- Inicio de sesión.
- Cuentas personales.
- Perfiles personales.
- Seguidores.
- Amigos.
- Mensajería privada.
- API productiva.
- Panel administrativo.
- Gestión real de contenido.
- Notificaciones mediante servicios externos.
- Integraciones externas.

Estas funcionalidades no forman parte del concepto actual de la plataforma y no deberán incorporarse únicamente por intentar convertirla en una red social tradicional.

---

## 27. Principios del proyecto

El desarrollo deberá seguir estos principios:

1. **Mobile-first**
2. **Experiencia sencilla**
3. **Navegación natural**
4. **Descubrimiento de contenido**
5. **Componentización**
6. **Reutilización**
7. **Escalabilidad**
8. **Separación de responsabilidades**
9. **Accesibilidad**
10. **Buen rendimiento**
11. **Diseño moderno**
12. **Consistencia visual**
13. **Código mantenible**
14. **Preparación para backend**
15. **Contenido como elemento principal**

---

## 28. Visión a futuro

La primera fase representa únicamente la base visual y arquitectónica del proyecto.

La visión a largo plazo es convertir la plataforma en un **punto central de información y recursos de la iglesia**.

La plataforma deberá permitir que las personas puedan:

- Informarse.
- Descubrir eventos.
- Encontrar recursos.
- Consultar predicaciones.
- Encontrar estudios.
- Conocer actividades.
- Explorar contenido multimedia.
- Encontrar información de ministerios.
- Recibir avisos relevantes.
- Descubrir contenido relacionado.
- Mantenerse conectadas con las actividades de la iglesia.

El objetivo no será crear una red social.

El objetivo será **hacer que la información y los recursos de la iglesia sean tan fáciles y naturales de consumir como lo es navegar una red social que el usuario ya conoce**.

Las decisiones tomadas durante la primera fase deberán evitar bloquear futuras posibilidades.

La prioridad inicial será construir una **base sólida, escalable, mantenible y visualmente atractiva** sobre la cual puedan desarrollarse las siguientes fases del proyecto.
