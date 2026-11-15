# Auditoría Spec Finalizer del Spec Pack de Mi Junta: corrida 2

Versión: 2.0
Fecha: 15/11/2026
Estado: Borrador. Lo redactó el Agente Spec Finalizer (prompts/clase3/05-spec-finalizer.xml) después de aplicar las correcciones de la corrida 1. Falta la revisión del Product Owner.

Fuente: los 11 archivos de `spec-pack/` después de la ronda 1 de correcciones:
- 00-constitucion.md v0.4, 01-project-brief.md v0.4, 02-alcance.md v0.4 y 04-glosario.md v0.4, sin cambios;
- 03-reglas-de-negocio.md v0.5, 05-preguntas-abiertas.md v0.5, 06-user-stories.md v0.5, 07-architecture.md v0.5, 08-backlog.md v0.6, 09-ui-spec.md v1.2 y 10-validation-log.md v1.2.

Corrida anterior: auditorias/spec-finalizer.md (corrida 1). Esta corrida usa los mismos IDs `SF-NN` y las mismas severidades. Los hallazgos nuevos siguen desde SF-26.

**Criterio de clasificación** (pedido del usuario del 15/11/2026):

| Categoría | Severidades | Qué se hace |
|---|---|---|
| 🔴 Crítico | Bloqueante y Alta | Se corrige en el archivo |
| 🟡 Mayor | Media | Se registra como PREG-NNN en 05 |
| Menor | Baja | Se corrige si es trivial, o se documenta |

---

## Resumen ejecutivo

**Resultado: 2 hallazgos críticos nuevos.** Los 7 críticos de la corrida 1 quedaron cerrados, pero dos de sus correcciones introdujeron problemas nuevos: SF-26 (bloqueante) y SF-27 (alto). Se necesita una corrida 3.

| Criterio | Corrida 1 | Corrida 2 | Por qué cambió |
|---|---|---|---|
| Operatividad | 3 | **3** | Se cerraron SF-01 a SF-07, pero SF-26 deja T-031 imposible de terminar antes que T-021, que depende de ella |
| Utilidad | 4 | **4** | HU-018 tiene tareas y cada tarea de pantallas cita 09. SF-27 deja un criterio de HU-018 imposible de probar |
| Orden | 4 | **4** | 0 IDs citados sin definir, y el diagrama del backlog coincide con los campos. Siguen abiertas PREG-078 a PREG-083 |
| **Promedio** | 3.7 | **3.7** | |

---

## 1. Estado de los hallazgos de la corrida 1

| ID | Sev. | Estado | Evidencia en esta corrida |
|---|---|---|---|
| SF-01 | Bloqueante | ✅ Cerrado | 03 §2.9 tiene el asunto (con "vence" y "venció"), el cuerpo y el push del recordatorio, y el aviso de RN-196. T-018 los cita en su descripción y su criterio |
| SF-02 | Bloqueante | ✅ Cerrado | 05 registra PREG-069 a PREG-077 (83 preguntas, sin huecos) |
| SF-03 | Bloqueante | ✅ Cerrado | PREG-071 resuelta (RN-214, RN-215). HU-018 tiene revisión QA y 3 criterios [SF], y T-032 y T-033 la implementan. Ver SF-27 |
| SF-04 | Alta | ✅ Cerrado | "Cerrar sesión" exige conexión en 07 §2.2 y API-005, en 09 UF-12 y P-017, en el criterio [SF] de HU-015 y en el criterio de T-021 |
| SF-05 | Alta | ✅ Cerrado | Mensaje y código `ROUND1_BEFORE_CREATION` alineados en 03, 06, 07 y 09. T-011 y HU-014 prueban la edición |
| SF-06 | Alta | ✅ Cerrado | Regla de precedencia en 08 "Cómo leer" y en 09. El test de tuteo de T-024 incluye 09 §6 |
| SF-07 | Alta | ✅ Cerrado | Campo "Pantallas" en 10 tareas. T-031 cubre C-01 y C-04 a C-10, los tokens y la navegación. P-016 y el historial de P-015 están en T-023. Ver SF-26 |
| SF-08 | Media | 🟡 PREG-078 | Abierta en 05 |
| SF-09 | Media | 🟡 PREG-079 | Abierta en 05. 09 §7.1 remite al estado de 05 |
| SF-10 | Media | 🟡 PREG-080 | Abierta en 05 |
| SF-12 | Media | 🟡 PREG-081 | Abierta en 05. T-031 ya prueba los 4 anchos para la base de UI |
| SF-13 | Media | 🟡 PREG-082 | Abierta en 05 |
| SF-14 | Media | 🟡 PREG-083 | Abierta en 05 |
| SF-11 | Baja | ✅ Corregido | El ejemplo de RN-164 dice "11 minutos" |
| SF-15 | Baja | ✅ Corregido | API-030 tiene `POST /two-factor/deactivation/code` |
| SF-16 | Baja | ✅ Corregido | `GET /me` entrega `overdue_notices_enabled` y `push_enabled` |
| SF-17 | Baja | ✅ Corregido | ADR-002 ya no cita PREG-008 como abierta |
| SF-18 | Baja | ✅ Corregido | `404` y `NOT_A_MEMBER` en 07 §4.1 |
| SF-19 | Baja | ✅ Corregido | `phone_blind_index UK` en el diagrama ER |
| SF-20 | Baja | ✅ Corregido | API-017 usa `paid_on` 2026-11-25, igual que API-018 y API-020. El wireframe de P-007 usa la Junta Oficina 2027 de Jorge |
| SF-21 | Baja | ✅ Corregido | 03 dice "F-07 a F-11 y F-16 a F-18" |
| SF-22 | Baja | ✅ Corregido | HU-003 tiene un criterio que cita RN-188 |
| SF-23 | Baja | Documentado | Cambiar PRINCIPIO-001 exige aprobación humana explícita de 00-constitucion.md (PRINCIPIO-012). No se tocó |
| SF-24 | Baja | ✅ Corregido | 09 §5.2 tiene las flechas de P-010 y P-018 hacia P-016 |
| SF-25 | Baja | ✅ Corregido | 07 §6.3 dice "auditorias/qa-clase2.md, hallazgo C-01". En 02, 03 y 05 el contexto ya nombraba la auditoría |

---

## 2. Hallazgos nuevos

| ID | Sev. | Hallazgo | Dónde | Corrección |
|---|---|---|---|---|
| SF-26 | **Bloqueante** | El criterio de T-031 exige que "al iniciar sesión, vuelve a la ruta pedida". La pantalla de inicio de sesión la construye T-021, que depende de T-031. Así, T-031 no se puede terminar, y T-021, T-022 y T-023 no pueden empezar | 08 T-031 | Probar la vuelta con una sesión creada por un arnés, igual que T-020, sin depender de la pantalla de T-021. Lo que vea el usuario al volver de P-003 se prueba en T-021 |
| SF-27 | **Alta** | El criterio [SF] de HU-018 empieza con "el navegador de Carmen está en modo 'Offline' al crear su primera junta". RN-170 prohíbe crear una junta sin conexión (también lo dice HU-004), así que el escenario Gherkin no se puede escribir (PRINCIPIO-011). Además cita RN-204, que no trata la conexión | 06 HU-018 | Partir de "Carmen creó su primera junta y perdió la conexión antes de ver la encuesta", y citar RN-204 y RN-170 |
| SF-28 | Baja | La definición de "Encuesta de KPI-05" de 04 cita RN-204 a RN-206 y RN-210 a RN-211, pero no RN-214 ni RN-215 | 04 | Se documenta dentro de PREG-080, que ya revisa el glosario. Cambiar 04 solo por esto no lo justifica |

---

## 3. Verificaciones repetidas

| # | Comprobación | Corrida 1 | Corrida 2 |
|---|---|---|---|
| 1 | Trazabilidad RN → HU | 212 de 212 | **215 de 215** (RN-213 a RN-215 nuevas) |
| 1 | RN → criterio Dado/Cuando/Entonces | 212 de 212 | **215 de 215** |
| 1 | RN listadas en una HU sin criterio en esa HU | 1 (RN-188 en HU-003) | **0** |
| 1 | RN MUST → tarea (con rangos) | 162 de 162 | **163 de 163** |
| 1 | RN SHOULD de HU-018 → tarea | 0 de 5 | **7 de 7** (T-032) |
| 1 | HU con pantalla | 18 + HU-019 justificada | Igual |
| 1 | Pantallas Must → tarea por ID | Solo 4 de 17 citadas por ID | **17 de 17**, y P-024. Sin tarea: P-018 a P-023 (Should, desde T-034) |
| 2 | IDs citados y no definidos | RN-213, T-031, PREG-069 a PREG-077 | **Ninguno**. Solo las reservas RN-216 y T-034 |
| 2 | PREG | 001 a 068 | **001 a 083**, sin huecos |
| 2 | Tareas | 30 | **33**, con los 7 campos obligatorios |
| 2 | Aristas del grafo del backlog | — | **64 en los campos y 64 en el diagrama**, idénticas y sin ciclos |
| 2 | Dependencias hacia un número mayor | 0 | 3 (T-021, T-022 y T-023 → T-031), permitidas desde 08 v0.6 "Cómo leer" |
| 3 | Un modal por regla EARS | 212 de 212 | **215 de 215** |
| 3 | Palabras vagas de PRINCIPIO-001 | 0 | 0 |
| 3 | Tuteo en textos de usuario | Solo el contraejemplo de RN-090 | Igual. Los demás resultados son la lista de palabras del test de T-024 y de HU-010 |
| 5 | [REQUIERE DECISIÓN] vigentes en 03, 06, 07, 08 y 09 | 5 (P-024 ×2, T-028, T-029, T-030) | **0**. Solo quedan menciones de la regla y del historial de versiones |
| 5 | Preguntas abiertas que bloquean una tarea Must | PREG-075, PREG-073, PREG-076 y los textos de T-029 y T-030 | **0**. PREG-078 a PREG-083 son mayores y ninguna impide empezar una tarea |

---

## 4. Revisión por sección

### 4.1 Constitución
Sin cambios frente a la corrida 1, salvo:
- **PRINCIPIO-005 y PRINCIPIO-006:** SF-04 está cerrado, sin cambiar ninguna RN, porque cerrar sesión ya no estaba entre las acciones de RN-170.
- **PRINCIPIO-011:** SF-27 deja un criterio que no se puede escribir como escenario.
- **PRINCIPIO-012:** las decisiones de la ronda 1 citan la autorización del usuario, y su validez definitiva queda en PREG-079.

### 4.2 Glosario
Ver PREG-080 y SF-28. 04 no cambió.

### 4.3 Preguntas abiertas
- Abiertas a propósito: PREG-011, PREG-014 y PREG-022.
- Abiertas por hallazgos mayores: PREG-078 a PREG-083, cada una con a quién preguntar, qué bloquea y su plan de resolución.
- Ninguna bloquea el inicio de una tarea Must.

### 4.4 Arquitectura
- Las 6 secciones siguen completas.
- Los contratos nuevos o cambiados son coherentes con 03: `EMAIL_FORMAT`, `ROUND1_BEFORE_CREATION`, los errores de API-034, la ruta de desactivación de API-030, `NOT_A_MEMBER` y API-005 con conexión obligatoria.
- ADR-002 y ADR-008 ya no se contradicen con 03 ni con 05.
- Sigue abierta PREG-078 (API-022).

### 4.5 Backlog
- 33 tareas: 20 L y 13 M, de 26.5 h a 53 h. Ruta crítica de 16 tareas, de 15 h a 30 h.
- Ninguna tarea está bloqueada por una decisión pendiente.
- SF-26 deja a T-031 en un bloqueo circular.

### 4.6 UI Spec
- Los textos que esperaban T-029, T-030 y P-021 ya están en §6 y en sus pantallas.
- P-024 ya no tiene [REQUIERE DECISIÓN].
- P-017 cumple RN-170.

---

## 5. Score

| Criterio | Puntaje | Justificación |
|---|---|---|
| Operatividad | **3 / 5** | Un bloqueante (SF-26) en la base de UI de la que dependen todas las pantallas del MVP |
| Utilidad | **4 / 5** | Un criterio de una HU que bloquea el lanzamiento no se puede probar (SF-27) |
| Orden | **4 / 5** | IDs y grafo consistentes. Quedan 6 preguntas mayores abiertas |

**Siguiente paso:** corregir SF-26 y SF-27 y correr la corrida 3.
