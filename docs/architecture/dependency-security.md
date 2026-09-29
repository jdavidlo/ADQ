# Política de seguridad de dependencias

## Regla

No agregar dependencias solo porque una IA las sugiera o porque sean populares. Antes de incorporar o actualizar un paquete, revisar su nombre exacto, repositorio/fuente oficial, mantenedores, actividad reciente, dependencias transitivas y avisos de seguridad conocidos. Ante una alerta creíble de malware, paquete comprometido, typosquatting o comportamiento sospechoso, no instalarlo hasta investigar y resolver la alerta.

## Verificaciones del frontend

Desde `frontend/`, ejecutar:

```bash
npm ci
npm run security:check
npm run build
```

`security:check` ejecuta `npm audit --audit-level=low` y `npm audit signatures`. Revisar el diff de `package.json` y `package-lock.json` después de cada cambio de dependencias. Mantener `package-lock.json` versionado y preferir `npm ci` para instalaciones reproducibles en lugar de instalar versiones sueltas.

Las firmas y attestations verificadas ayudan a comprobar el origen e integridad del paquete; **no prueban que el código sea benigno**. `npm audit` informa vulnerabilidades conocidas en las fuentes que consulta, pero no detecta todo malware ni amenazas recién publicadas. Antes de añadir un paquete nuevo, revisar también sus avisos recientes y reportes de seguridad confiables; evitar el paquete o pedir revisión si la evidencia no es clara.

## Prácticas de instalación

- Preferir paquetes oficiales, necesarios y con superficie pequeña; evitar duplicar funciones que ya ofrece el stack.
- No desactivar verificaciones de TLS, integridad o firmas para hacer que una instalación pase.
- Examinar scripts de instalación (`preinstall`, `install`, `postinstall`) y limitar su ejecución cuando sea compatible con el proyecto.
- No ejecutar comandos remotos de instalación ni código copiado de issues o páginas no verificadas.
- No subir credenciales, tokens ni secretos al frontend ni a `data/`.
- Si una verificación falla, detener la incorporación; registrar el paquete, versión, aviso, evaluación y decisión en la documentación del proyecto.

## Estado de la verificación inicial

En el scaffold inicial, una instalación limpia mediante `npm ci` terminó correctamente y el registro de npm reportó **0 vulnerabilidades conocidas**. La comprobación de firmas sobre los paquetes instalados informó firmas válidas. Estos resultados describen esa ejecución y ese lockfile; no son garantía permanente ni certificación de ausencia de malware. Repetir los chequeos al cambiar dependencias y antes de desplegar.
