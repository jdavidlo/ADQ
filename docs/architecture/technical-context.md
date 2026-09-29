# Contexto técnico del proyecto ADQ

> Documento de contexto para desarrolladores y asistentes de IA. Mantenerlo actualizado cuando se confirmen decisiones de arquitectura, tecnologías o estructura.

## Estado

- **Etapa:** estructura inicial creada; todavía no se ha implementado la interfaz del producto.
- **Idea y alcance funcional:** [`../idea.md`](../idea.md).
- **Decisiones de stack acordadas:** Astro + React + TypeScript.
- **Backend:** fuera del alcance de la primera fase. Está previsto que pueda desarrollarse después en Go; es una posibilidad acordada, no un backend existente ni un contrato de API definido.

## Objetivo del producto

Plataforma web de información y recursos de una iglesia, mobile-first, responsive, accesible y centrada en descubrir contenido. Puede tomar patrones de navegación familiares de redes sociales, pero **no es una red social** y no contempla cuentas, seguidores ni mensajes privados.

La primera fase construirá la experiencia frontend usando datos simulados. Consulta `idea.md` para el alcance completo y los requisitos del producto.

## Stack acordado

- **Astro:** estructura de páginas y generación estática del contenido público.
- **React:** componentes interactivos puntuales, integrados como islas cuando corresponda; no asumir que toda la web será una SPA.
- **TypeScript:** tipado estático para componentes, modelos y servicios.
- **Salida inicial:** archivos estáticos que puedan publicarse en el document root de HostGator. El build se ejecuta durante desarrollo/despliegue; no se debe asumir que HostGator ejecutará el servidor Astro/Node en producción.
- **Backend futuro posible:** API independiente en Go, consumida por HTTP/JSON. Rutas, esquemas, autenticación (si alguna vez aplica), manejo de errores y CORS aún no están definidos.

La generación estática entrega contenido en HTML y encaja con un hosting de archivos estáticos; Astro permite usar componentes React con hidratación selectiva. Esto favorece el descubrimiento de contenido, rendimiento móvil y compatibilidad con rastreadores sin depender de JavaScript cliente para mostrar todo el contenido.

## Arquitectura prevista

```text
Primera fase
Páginas Astro / componentes React
              ↓
      servicios o repositorios
              ↓
       datos simulados en data/

Fase futura
Páginas Astro / componentes React
              ↓
      servicios o repositorios
              ↓ HTTP/JSON
          API en Go
              ↓
       backend / base de datos
```

Los componentes de interfaz no deben importar ni conocer directamente la forma de los archivos fuente de `data/`. Mantener modelos y acceso a datos detrás de una capa de servicios/repositorios para permitir sustituir la fuente local por la API sin reescribir la UI.

## Herramientas de trabajo

- **ECC (Everything Claude Code):** se encontró instalado localmente en la máquina, versión 2.2.1, con perfil `minimal` para `hermes-home`. Se aplicarán sus prácticas pertinentes de planificación, pruebas y revisión durante el desarrollo, sin copiar su instalación global al repositorio ni activar todos sus módulos sin necesidad.
- **CodeGraph:** CLI 1.6.0 disponible. Su índice está inicializado en `frontend/.codegraph/` y actualmente cubre el código de `frontend/` (no `data/` ni `docs/`). Comandos de mantenimiento y consulta desde la raíz del repositorio:

```bash
codegraph status frontend
codegraph sync frontend
codegraph explore --path frontend "pregunta sobre un símbolo o flujo"
```

Usar CodeGraph antes de búsquedas textuales cuando se necesite explorar o localizar código indexado; después de cambios relevantes, sincronizar el índice. No mover ni reinstalar ECC en otro perfil de Hermes sin autorización.

## Estructura inicial creada

```text
ADQ/
├── data/
│   └── README.md
├── docs/
│   ├── architecture/
│   │   └── technical-context.md
│   └── idea.md
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── features/
    │   ├── layouts/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   └── types/
    ├── astro.config.mjs
    ├── package.json
    └── tsconfig.json
```

La estructura de carpetas es un punto de partida; crear carpetas o módulos de dominio adicionales cuando las pantallas y recursos visuales definan una necesidad real.

## Carpetas del proyecto

- `docs/`: documentación Markdown. Este archivo registra el contexto técnico; `docs/idea.md` define visión y alcance.
- `data/`: datos simulados utilizados en la primera fase. No guardar secretos aquí ni tratar estos archivos como una base de datos productiva.
- `frontend/`: aplicación Astro, React y TypeScript.
- `backend/`: carpeta actualmente presente en el repositorio, pero fuera del alcance autorizado para esta fase; no modificarla salvo indicación explícita.

## Reglas para futuras contribuciones y asistentes de IA

1. Leer primero `docs/idea.md` y este documento antes de proponer cambios de arquitectura.
2. Respetar la separación entre interfaz, lógica, servicios y fuente de datos.
3. Revisar dependencias según [`dependency-security.md`](dependency-security.md) antes de agregarlas o actualizarlas.
4. No agregar backend, base de datos, autenticación ni funcionalidades sociales durante la primera fase.
5. Mantener el contenido público importante disponible en el HTML generado; no depender exclusivamente de renderizado cliente para que sea descubrible.
6. Usar React para interacciones que lo justifiquen, no hidratar toda la página por defecto.
7. Diseñar mobile-first, con accesibilidad, rendimiento y preferencia de movimiento reducido considerados desde el inicio.
8. No asumir detalles no acordados de la futura API de Go ni inventar endpoints o contratos.
9. Antes de cambiar el destino estático o agregar renderizado en servidor, verificar las capacidades del hosting objetivo.
10. Mantener este documento y la documentación relacionada actualizados cuando se aprueben nuevas decisiones.

## Hosting y notas de despliegue

El objetivo inicial indicado es HostGator Business. La documentación de HostGator describe `public_html` como el document root del dominio principal y actualmente lista Node.js como no compatible con Shared/Reseller. Por ello, la estrategia acordada evita requerir un proceso Node en producción: generar archivos estáticos y desplegar el resultado. Confirmar las capacidades exactas del plan/cuenta con HostGator antes del despliegue, pues los productos y configuraciones pueden variar.

El backend futuro en Go se alojaría por separado; no se asume que HostGator aloje ese servicio.

## SEO y descubrimiento

- El SEO se trabaja con fundamentos convencionales: contenido útil, páginas públicas rastreables, enlaces internos, metadatos por página, estructura semántica y buen rendimiento.
- No asumir que existe una optimización especial o un marcado especial que garantice inclusión en respuestas de IA.
- Priorizar HTML generado para el contenido público y validar las páginas desplegadas con herramientas de inspección de buscadores.

## Fuentes técnicas consultadas

- [Astro: Islands architecture](https://docs.astro.build/en/concepts/islands/)
- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [HostGator: Compatible technologies](https://www.hostgator.com/help/article/hg-compatible-technologies)
- [HostGator: public_html](https://www.hostgator.com/help/article/public-html-folder)
