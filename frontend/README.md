# Frontend de ADQ

Aplicación pública de la plataforma de la iglesia. El stack acordado es **Astro + React + TypeScript** con generación estática para el despliegue inicial en HostGator.

## Requisitos

- Node.js LTS compatible con Astro.
- npm.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run security:check
```

`security:check` revisa avisos conocidos y firmas del registro npm. Revisa también [`../docs/architecture/dependency-security.md`](../docs/architecture/dependency-security.md) antes de agregar o actualizar paquetes.

El comando `build` genera el sitio estático en `dist/`. Desplegar el contenido generado, no el código fuente ni `node_modules`, en el document root correspondiente del hosting.

## Organización de `src/`

- `assets/`: recursos que procesa el build.
- `components/`: componentes compartidos y de interfaz.
- `features/`: funcionalidades organizadas por dominio cuando se definan.
- `layouts/`: estructuras reutilizables de página.
- `pages/`: rutas públicas de Astro.
- `services/`: acceso a datos y futura integración HTTP con la API.
- `styles/`: estilos globales y tokens visuales.
- `types/`: tipos compartidos.

Mantener los componentes desacoplados de la forma física de los datos en `../data/`. No crear módulos vacíos de features ni contratos de API hasta que se definan los requisitos correspondientes.

Consulta [`../docs/idea.md`](../docs/idea.md) para el alcance del producto y [`../docs/architecture/technical-context.md`](../docs/architecture/technical-context.md) para las decisiones técnicas.
