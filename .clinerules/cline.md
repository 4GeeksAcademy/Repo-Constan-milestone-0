# .clinerules — Configuración para Cline

Este archivo le indica a Cline que lea `AGENTS.md` en la raíz del repositorio para obtener el contexto y las reglas del proyecto.

## Reglas para Cline
1. Antes de cualquier acción, leer `AGENTS.md` (raíz del repo).
2. Leer `memory-bank/progress.md` para conocer el estado del trabajo previo.
3. Todas las operaciones deben quedarse dentro de este repositorio.
4. La web pública va en `uis/website/` y es solo HTML + Tailwind + JavaScript: nada de React ni de crear proyectos nuevos con npm.
5. `BRIEFING.md` es el briefing oficial del hito: se lee, nunca se modifica. Textos, campos y validaciones salen de ahí, sin inventar.
6. Al terminar una tarea, escribir en `memory-bank/progress.md` lo realizado y los próximos pasos.

## Archivo de referencia
- [`../AGENTS.md`](./../AGENTS.md) — reglas y contexto compartido por ambos agentes.