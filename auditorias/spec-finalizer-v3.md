# Auditoría Spec Finalizer del Spec Pack de Mi Junta: corrida 3

Versión: 3.0
Fecha: 15/11/2026
Estado: Borrador. Lo redactó el Agente Spec Finalizer (prompts/clase3/05-spec-finalizer.xml) después de corregir los hallazgos críticos de la corrida 2. Falta la revisión del Product Owner.

Fuente: los 11 archivos de `spec-pack/`:
- 00-constitucion.md v0.4, 01-project-brief.md v0.4, 02-alcance.md v0.4 y 04-glosario.md v0.4;
- 03-reglas-de-negocio.md v0.5, 05-preguntas-abiertas.md v0.5, 06-user-stories.md v0.5 y 07-architecture.md v0.5;
- 08-backlog.md v0.6, 09-ui-spec.md v1.2 y 10-validation-log.md v1.2.

Corridas anteriores: auditorias/spec-finalizer.md (corrida 1, con "Decisiones del equipo") y auditorias/spec-finalizer-v2.md (corrida 2). Se usan los mismos IDs `SF-NN` y el mismo criterio:
- 🔴 **crítico:** Bloqueante o Alta. Se corrige en el archivo.
- 🟡 **mayor:** Media. Se registra como PREG en 05.
- **menor:** Baja.

---

## Resumen ejecutivo

**Resultado: 0 hallazgos críticos.** Los 7 críticos de la corrida 1 y los 2 de la corrida 2 están cerrados. Los 6 mayores están en 05 como PREG-078 a PREG-083, y quedan 2 menores documentados. **Veredicto: listo para implementar el MVP.** Las 33 tareas del backlog tienen todo lo que necesitan en el spec-pack y ninguna espera una decisión.

| Criterio | Corrida 1 | Corrida 2 | **Corrida 3** |
|---|---|---|---|
| Operatividad | 3 | 3 | **4** |
| Utilidad | 4 | 4 | **4** |
| Orden | 4 | 4 | **4** |
| **Promedio** | 3.7 | 3.7 | **4.0** |

| Hallazgos | Corrida 1 | Corrida 2 | Corrida 3 |
|---|---|---|---|
| 🔴 Críticos abiertos | 7 | 2 (nuevos) | **0** |
| 🟡 Mayores | 6 | 6, en 05 | 6, en 05 (PREG-078 a PREG-083) |
| Menores abiertos | 12 | 2 | 2 (SF-23, SF-28) |

---

## 1. Hallazgos de la corrida 2

| ID | Sev. | Estado | Evidencia |
|---|---|---|---|
| SF-26 | Bloqueante | ✅ Cerrado | El criterio de T-031 prueba la vuelta a la ruta pedida con una sesión creada por un arnés por la API, como T-020. Ya no depende de la pantalla de inicio de sesión de T-021. Lo que ve el usuario al volver desde P-003 queda en T-021 |
| SF-27 | Alta | ✅ Cerrado | El criterio [SF] de HU-018 parte de una junta creada con conexión y de la red cortada después. Cita RN-204 y RN-170, y HU-018 lista RN-170. T-033 prueba el mismo caso |
| SF-28 | Baja | Documentado | Dentro de PREG-080 |

**Hallazgos nuevos en esta corrida:** ninguno crítico ni mayor. Sobre los cambios de la corrida 2 se revisó:
- que ningún criterio nuevo contradiga RN-170;
- que ninguna tarea dependa de otra que todavía no se puede terminar;
- que los textos nuevos traten de "usted";
- que los IDs nuevos estén definidos.

---

## 2. Verificaciones (todas automáticas, sobre los archivos)

| Sección del prompt | Comprobación | Resultado |
|---|---|---|
| 1. Trazabilidad | RN → HU ("Reglas de negocio relacionadas") | 215 de 215 ✅ |
| 1. Trazabilidad | RN → criterio Dado/Cuando/Entonces | 215 de 215 ✅ |
| 1. Trazabilidad | RN listadas en una HU sin criterio en esa HU | 0 ✅ |
| 1. Trazabilidad | RN MUST → tarea (con rangos) | 163 de 163 ✅ |
| 1. Trazabilidad | RN de HU-018 → tarea | 7 de 7 (T-032) ✅ |
| 1. Trazabilidad | HU → pantalla | 18 de 18 con interacción. HU-019 sin pantalla, justificada (escenarios técnicos) ✅ |
| 1. Trazabilidad | Pantalla Must → tarea, por ID en el campo "Pantallas" | P-001 a P-017 y P-024 ✅. P-018 a P-023 son Should y van desde T-034 |
| 1. Trazabilidad | Componentes, tokens y navegación de 09 → tarea | T-020 (C-02, C-03) y T-031 (C-01, C-04 a C-10, §4 y §5.3) ✅ |
| 2. IDs | IDs citados y no definidos en los 11 archivos | Ninguno. Solo las reservas RN-216 y T-034 ✅ |
| 2. IDs | Numeración | PRINCIPIO 001 a 012, RN 001 a 215, HU 001 a 019, P 001 a 024, T 001 a 033, PREG 001 a 083, API 001 a 035, ADR 001 a 009, sin huecos ni duplicados ✅ |
| 3. Constitución | Un DEBE / NO DEBE / PUEDE por regla | 215 de 215 ✅ |
| 3. Constitución | Palabras vagas de PRINCIPIO-001 | 0 ✅ |
| 3. Constitución | Tuteo en textos de usuario | 0, salvo el contraejemplo de RN-090 ✅ |
| 3. Constitución | Formato `# título` + `Versión:` | 11 de 11 ✅ |
| 5. Preguntas | [REQUIERE DECISIÓN] vigentes en 03, 06, 07, 08 y 09 | 0 ✅ |
| 5. Preguntas | Preguntas abiertas que bloquean el inicio de una tarea Must | 0 ✅ |
| 7. Backlog | Tareas con los 7 campos obligatorios | 33 de 33 ✅ |
| 7. Backlog | Grafo de dependencias | 64 aristas en los campos y 64 en el diagrama, idénticas y sin ciclos ✅ |
| 7. Backlog | Dependencias hacia un número mayor | 3 (T-021, T-022 y T-023 → T-031), permitidas desde 08 v0.6 "Cómo leer" ✅ |
| 8. UI Spec | Contrastes de 09 §4.1 | 13 de 13 recalculados y coinciden (corrida 1; 09 no cambió sus tokens) ✅ |
| 3. PRINCIPIO-008 | Vector del anexo A | Reproducido con una implementación independiente (corrida 1; el anexo no cambió) ✅ |

Un falso positivo conocido: el script de "criterio que cita una RN no listada" marca 7 RN en HU-008. Vienen del texto original de un criterio, citado dentro de su "Revisión QA" (v0.3.1), y no son criterios vigentes.

---

## 3. Revisión por sección

### 3.1 Constitución
Los 12 principios se cumplen en la especificación:
- **PRINCIPIO-005 y PRINCIPIO-006:** con SF-04 cerrado, ya no hay forma de que una sesión siga activa después de cerrarla.
- **PRINCIPIO-012:** las decisiones de las corridas 1 y 2 citan la autorización del usuario del 15/11/2026, y su confirmación por el Product Owner queda en PREG-079. No se modificó 00-constitucion.md, así que SF-23 sigue documentado.

### 3.2 Glosario
04 no cambió. Los identificadores que no coinciden con 07 y los términos sin definir (líder técnico, incidente, outbox, snapshot, ola y estados de envío) quedan en PREG-080, junto con SF-28. No bloquean: un agente sigue los nombres de 07, que es donde están las tablas y los contratos.

### 3.3 Preguntas abiertas
- **Abiertas a propósito:** PREG-011, PREG-014 y PREG-022. Quedan después del lanzamiento.
- **Mayores:** PREG-078 a PREG-083, cada una con a quién preguntar, qué bloquea y su plan de resolución. Las seis piden una decisión del PO o del líder técnico antes de una tarea concreta (T-017, T-022 o T-025) o antes de cerrar la v1.0. Ninguna impide empezar una tarea.
- **Validez:** las preguntas que se resolvieron con la autorización del usuario (PREG-069 a PREG-077) rigen hasta que el PO las revise (PREG-079).

### 3.4 Arquitectura
- Las 6 secciones están completas y las 9 ADR son coherentes entre sí y con 03.
- Los contratos de 07 v0.5 tienen el código, la RN y el mensaje de cada error nuevo.
- Queda PREG-078: API-022 no entrega los datos de la tarjeta de P-007. La app puede leerlos del snapshot (API-025), así que no bloquea.

### 3.5 Backlog
- 33 tareas: 31 Must y 2 Should. T-032 y T-033 son Should, pero el lanzamiento las necesita.
- 20 L y 13 M, de 26.5 h a 53 h.
- Ruta crítica de 16 tareas, de 15 h a 30 h.
- Cada tarea tiene estimación, prioridad, dependencias y un criterio verificable con datos de ejemplo.
- PREG-082 deja anotado el riesgo de que T-007 y T-021 a T-023 superen las 2 horas.

### 3.6 UI Spec
- Hay 15 flujos para las 24 pantallas. Cada pantalla tiene un wireframe textual a 360 px y sus estados, y no quedan textos pendientes.
- Los [TEXTO UI] rigen para la implementación, con el catálogo §2.9 como precedencia.
- Pendiente: la prueba de los prototipos en un navegador (PREG-083).

---

## 4. Score general

| Criterio | Puntaje | Justificación | Qué falta para el 5 |
|---|---|---|---|
| Operatividad | **4 / 5** | Las 33 tareas tienen en el spec-pack todo lo que necesitan: textos, reglas, contratos, pantallas y criterios. Ninguna está bloqueada, y el grafo no tiene ciclos ni dependencias imposibles | Resolver PREG-078 (API-022) y PREG-082 (tamaño de las tareas) |
| Utilidad | **4 / 5** | Un agente puede escribir los tests de cada RN con datos de ejemplo únicos, y el backlog lleva a las pantallas de 09. HU-018, necesaria para el lanzamiento, ya tiene tareas | Probar los prototipos en el navegador y que el PO revise 08, 09 y 10 (PREG-083) |
| Orden | **4 / 5** | IDs completos y sin huecos en 9 familias, trazabilidad RN → HU → API → tarea → pantalla verificada, y cada cambio registrado en la versión de su archivo y en 05 | Alinear el glosario con 07 (PREG-080) y proteger en PRINCIPIO-001 las familias API, ADR, UF y C (SF-23, con aprobación humana) |
| **Promedio** | **4.0 / 5** | | |

---

## 5. Checklist de cierre

| | Ítem | Estado | Evidencia |
|---|---|---|---|
| ✅ | Agente Spec Finalizer ejecutado | Cumplido | 3 corridas: auditorias/spec-finalizer.md, spec-finalizer-v2.md y spec-finalizer-v3.md |
| ✅ | 0 hallazgos críticos al final | Cumplido | Esta corrida, sección 1. Corrida 1: 7 críticos. Corrida 2: 2 nuevos. Corrida 3: 0 |
| ✅ | Hallazgos mayores documentados en 05 | Cumplido | PREG-078 (SF-08), PREG-079 (SF-09), PREG-080 (SF-10), PREG-081 (SF-12), PREG-082 (SF-13) y PREG-083 (SF-14), cada una con a quién preguntar y su plan de resolución |
| ✅ | Score de Operatividad de al menos 4/5 | Cumplido | 4 / 5 (sección 4) |
| ✅ | Trazabilidad end-to-end verificada | Cumplido | RN → HU → criterio → tarea → pantalla, con scripts sobre los archivos (sección 2): 215 de 215 RN con HU y criterio, 163 de 163 RN MUST con tarea, y 18 de 18 pantallas Must o de lanzamiento con tarea por ID |
