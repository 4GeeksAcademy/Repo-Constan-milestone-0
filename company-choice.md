# Elección de empresa — Brasaland

## Empresa elegida
**Brasaland** — cadena de restaurantes de cocina a la brasa, 14 locales en Colombia (Medellín) y Estados Unidos (Florida), ~115 empleados, ~6 millones de USD de facturación anual.

## Motivo de la elección

Brasaland ofrece un dominio universalmente comprensible (restaurantes) pero con complejidad multipaís real: 14 locales propios en Colombia (Medellín) y Estados Unidos (Florida), dos monedas (COP y USD) y dos idiomas (español e inglés). Fundada en 2008, factura alrededor de 6 millones de USD anuales y emplea a unas 115 personas. El negocio gestiona toda su operación con herramientas diseñadas para un solo restaurante local: POS diferentes en cada país sin integración, pedidos de materia prima por WhatsApp sin datos de inventario, informes PDF semanales que llegan los martes, y un programa de fidelización con tarjetas físicas de sellos que los clientes pierden constantemente. Esto permite construir proyectos de IA con impacto inmediato y visible para un dueño de negocio no técnico, desde un dashboard ejecutivo con ventas en USD y COP hasta un asistente de consultas en lenguaje natural. Además, la empresa tiene áreas claramente diferenciadas con problemas concretos que pueden automatizarse: Tecnología (sin API, sin telemetría), Dirección Ejecutiva (decisiones por intuición y llamadas), y Marketing (casi ningún dato sobre clientes).

## Departamentos con problemas interesantes identificados

### 1. Tecnología — Nicolás Park (CTO, Medellín)
- Stack mínimo: web estática, app obsoleta, POS diferente en cada país sin integración.
- No hay API interna, ni datos consolidados, ni telemetría.
- Mandato: construir la plataforma digital de Brasaland desde casi cero.
**Por qué me interesa:** Sin API ni datos consolidados no se puede construir nada de lo demás, y es donde empieza todo.

### 2. Dirección Ejecutiva — Mariana Restrepo (CEO)
- Decisiones basadas en llamadas telefónicas, informes PDF semanales (martes) e intuición.
- No puede responder en tiempo real: "¿cuánto vendimos esta semana en Florida?" o "¿qué local tiene el ticket medio más alto este mes?"
- Necesita un dashboard ejecutivo con ventas totales en USD y COP, un asistente de IA en lenguaje natural y un informe semanal automatizado (lunes 7:00 a.m.).
**Por qué me interesa:** La CEO toma decisiones a ciegas con informes PDF los martes, y un dashboard en tiempo real cambiaría totalmente cómo gobierna el negocio.

### 3. Marketing y Experiencia Digital — Camila Ospina
- Casi ningún dato sobre quiénes son los clientes de Brasaland.
- Programa de fidelización con tarjetas físicas de sellos que los clientes pierden constantemente.
- Necesita una app de fidelización y pedidos, un CRM de clientes y un motor de personalización.
**Por qué me interesa:** Sin datos de clientes no hay fidelización posible, y es un problema directo de experiencia de usuario que la IA puede resolver.

## Reto de automatización / IA

**Asistente de IA ejecutivo para consultas de ventas en lenguaje natural.** El agente permitiría a la CEO preguntar en español o inglés sobre ventas, ticket medio y desempeño por local, obteniendo respuestas en tiempo real a partir de datos consolidados. También incluiría la generación automática del informe semanal enviado cada lunes a las 7:00 a.m.

---

## Mi idea de Agente de IA

**Qué haría el agente:** Sería un asistente ejecutivo al que la CEO (Mariana Restrepo) puede consultar en lenguaje natural (español o inglés) sobre el estado del negocio en tiempo real. Por ejemplo, podría responder preguntas como "¿cuánto vendimos esta semana en Florida?", "¿qué local tiene el ticket medio más alto este mes?" o "¿cuál es el total de ventas de la cadena en USD y COP?". También generaría automáticamente un informe semanal cada lunes a las 7:00 a.m. y lo enviaría a la dirección ejecutiva.

**Qué información necesitaría:** Acceso a los datos consolidados de ventas de los 14 locales (fecha, monto, moneda, medio de pago, ticket medio, local_id). Todo esto provendría de la API central de Brasaland y del pipeline de datos que alimente los dashboards de operaciones.

**Qué produciría o activaría:** Respuestas en lenguaje natural a preguntas de negocio, un informe semanal automatizado (lunes 7:00 a.m.) con ventas totales por país y local y alertas cuando un local tenga un desempeño fuera de lo esperado.

---


_Archivo requerido por el Milestone 0 — 4Geeks Academy AI Engineering_