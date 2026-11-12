# AGENTS.md — Reglas y contexto del proyecto

## Ámbito de trabajo
- **Carpeta permitida:** la raíz de este repositorio y todo su contenido.
- **Prohibido:** tocar cualquier archivo o carpeta fuera de este repositorio.

## Propósito
Este monorepo es la base del proyecto transversal de **AI Engineering (4Geeks Academy)**. Cada agente que trabaje aquí debe leer este archivo antes de actuar y dejar constancia de su trabajo en `memory-bank/progress.md`.

## Cómo se coordinan los dos agentes
Ambas IAs comparten el mismo espacio y leen los mismos archivos. No se necesita un framework externo para el M0: la coordinación se hace a través de archivos en el repositorio.

### Flujo de trabajo
1. **Al empezar:** leer `AGENTS.md` y `memory-bank/progress.md`.
2. **Durante el trabajo:** dejar decisiones, contexto y resultados en archivos del repo (no solo en la conversación).
3. **Al terminar:** escribir en `memory-bank/progress.md` lo que se ha hecho, qué quedó pendiente y qué debe hacer el siguiente agente.
4. **El siguiente agente:** empieza leyendo `memory-bank/progress.md` para continuar sin perder contexto.

## Estructura de carpetas (resumen)
| Carpeta | Qué contiene |
|---------|--------------|
| `uis/` | Frontends (webs, dashboards, backoffice) |
| `services/` | APIs y servicios de backend |
| `data/raw/` | Datos de entrada sin procesar |
| `data/process/` | Datos limpios / intermedios |
| `data/pipelines/` | ETL / ELT |
| `data/eval/` | Conjuntos de evaluación y métricas |
| `agents/` | Agentes de IA (incluye `_template/`) |
| `skills/` | Capacidades reutilizables de agente |
| `mcps/` | Servidores MCP para herramientas externas |
| `workflows/` | Flujos n8n / automatización |
| `packages/` | Librerías compartidas |
| `shared/` | Schemas, plantillas, assets sueltos |
| `docs/` | Documentación de arquitectura y decisiones |
| `infra/` | Docker, despliegue, configuración cloud |
| `scripts/` | Scripts de ayuda |
| `internal/` | CLIs y herramientas internas del equipo |

## Reglas de estilo y convención
- Cada nueva app, servicio, agent o pipeline lleva su propia subcarpeta + un `README.md` explicativo.
- No se acumula todo en la raíz.
- Los nombres de archivo y carpetas en minúsculas, sin espacios, separando con guiones o guiones bajos.
- Documentar en `AGENTS.md` cualquier cambio importante de reglas o contexto.

## Archivos clave para la memoria compartida
- `AGENTS.md` — este archivo. Reglas y contexto del proyecto.
- `memory-bank/progress.md` — bitácora de progreso. Cada agente escribe aquí al finalizar su turno.
- `CONTEXT.md` — contexto de negocio de la empresa asignada (Brasaland).
- `BRIEFING.md` — briefing oficial del hito "Sitio web público" de Brasaland (landing, campos del formulario y validaciones). **No se modifica.**
- `company-choice.md` — registro de la decisión de empresa y justificación del Milestone 0.

---

> Este archivo es el único punto de partida obligatorio para cualquier agente que entre en el repositorio. Si algo cambia en las reglas, actualiza este archivo primero.