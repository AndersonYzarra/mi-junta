# Auditoría QA del Backlog — Clase 2

Versión: 1.0
Fecha: 14/11/2026
Agente: QA Architect Senior (Agente QA de Backlog, BMAD), prompt `prompts/clase2/05-qa-backlog.xml`

**Archivos auditados:**

| Archivo | Versión |
|---|---|
| spec-pack/02-alcance.md | 0.4 |
| spec-pack/03-reglas-de-negocio.md | 0.4 |
| spec-pack/06-user-stories.md | 0.4.1 |
| spec-pack/07-architecture.md | 0.5 |
| spec-pack/08-backlog.md | 0.3 |

Son las versiones que tenían los archivos al auditarlos. Después de las decisiones del equipo, el 14/11/2026, las cabeceras de los 9 archivos de spec-pack/ se unificaron en la versión 0.4.

También se leyeron `00-constitucion.md` v0.5 (versión al auditarla, hoy v0.4; obligatoria, CLAUDE.md) y, para resolver referencias, las definiciones de `04-glosario.md` que citan RN-077, RN-022, RN-114 y RN-071.

**Método:**
- **Contraste literal:** para cada una de las 18 HU se comparó cada ID del campo "Reglas de negocio relacionadas" con el texto EARS de esa RN en 03 y con los criterios que la citan. Son 284 pares HU–RN (184 en las 10 HU Must). Un par se da por bueno solo si el texto de la RN trata lo que el criterio afirma.
- **Cruces mecánicos:** con scripts sobre los archivos se compararon las RN citadas en los criterios con las del campo "Reglas relacionadas", las RN Must con las HU Must, y las RN con las citas de 07 (componentes de §2.2, tablas de §3.2 y contratos API) y de 08 (descripción y criterio de cada tarea, expandiendo rangos "RN-xxx a RN-yyy").
- **Regla de evidencia:** nada se da por cubierto si no se puede señalar con un ID. Cuando una tarea implementa un comportamiento sin citar su RN, se reporta igual.
- Ningún hallazgo inventa valores. Cuando la corrección es una decisión de negocio, se marca [REQUIERE DECISIÓN] y se propone una PREG con el siguiente número libre (PREG-055 en adelante) o una RN nueva (RN-212 en adelante).

---

## 1. Resumen ejecutivo

| Clasificación | Cantidad |
|---|---|
| Crítico (bloquea implementación) | 2 |
| Mayor (reduce calidad) | 12 |
| Sugerencia (mejora calidad) | 12 |
| **Total** | **26** |

**Veredicto:** el backlog **no puede empezar a implementarse** hasta resolver los 2 hallazgos críticos. Los dos son decisiones del Product Owner, no retrabajo: aprobar las herramientas que T-001 necesita y escribir los textos de los correos de cuenta. Los hallazgos mayores se pueden corregir en el mismo spec-pack antes de asignar cada tarea.

**Números de trazabilidad:**

| Verificación | Resultado |
|---|---|
| Pares HU–RN contrastados literalmente | 284. 277 correctos, 3 sin ningún criterio que los pruebe y 4 en los que la HU atribuye a la RN algo que su texto no dice (S-01, M-04) |
| RN Must (162) con al menos una HU Must | 157. RN-200 a RN-203 no tienen HU a propósito (escenarios técnicos, 06 §Cobertura). RN-142 solo está en una HU Should (M-11) |
| HU Must (10) con componente en 07 | 10 de 10 (07 §8.1) |
| Componentes de 07 §2.1 (13) con tareas | 12. `surveys` no tiene tareas porque solo sirve a HU-018 (Should), lo cual es correcto |
| RN Must citadas por al menos una tarea | 150 de 162. 7 se implementan o prueban sin citar su ID (S-02, M-02) y 5 no tienen ninguna tarea: RN-036, RN-037, RN-051, RN-142 y RN-200 (M-01, M-02, M-08, M-11) |
| Tareas que trazan a una HU | 22 de 25. T-001, T-002 y T-005 son de infraestructura y no son huérfanas (S-04) |
| Tareas huérfanas | 0 |
| Grafo de dependencias | Sin ciclos; cada tarea depende solo de números menores. La ruta crítica declarada (14 tareas, de 13.5 h a 27 h) se recalculó y es correcta. Hay 3 dependencias ocultas o invertidas (M-07) |
| Sumas del resumen de 08 | Correctas: 25 tareas, 18 L y 7 M, de 21.5 h a 43 h; conteos por tipo y por componente cuadran |
| Valores numéricos | Consistentes entre 00, 02, 03, 06, 07 y 08 (sección 4). Única discrepancia de semántica: RN-117 (M-05) |
| Stack contra la constitución | Next.js, TypeScript, PostgreSQL, versiones exactas, AES-256-GCM, Argon2id, TLS ≥ 1.2 y `nodemailer`: correcto. Faltan aprobar herramientas (C-01) y no hay componente que termine TLS (M-09) |
| Out-of-scope (NO-01 a NO-14) | Ninguna HU, contrato ni tarea lo toca |

**Lo más urgente:**
1. **C-01:** T-001, de la que dependen las otras 24 tareas, necesita un linter, una plataforma para el pipeline, un proveedor de cobertura y una forma de escribir los Gherkin que no están aprobados. El backlog solo reconoce que falta el escáner de secretos.
2. **C-02:** T-006 está bloqueada por los textos de los correos de verificación y recuperación, y T-007 depende de T-006. Según el propio backlog, 22 tareas quedan detenidas.
3. **M-01:** ninguna tarea asigna el pozo de cada ronda según el resultado del sorteo (RN-036, RN-037). Es una regla sobre dinero (PRINCIPIO-012 g).

---

## 2. Hallazgos

### 2.1 Críticos

#### C-01 · T-001 depende de herramientas que no están aprobadas, y el backlog solo reconoce una
- **Evidencia:**
  - T-001 (08-backlog.md, líneas 136-144) pide "el linter de la plantilla de Next.js" (ESLint con `eslint-config-next`), Vitest con umbrales de cobertura, "el pipeline" y un escáner de secretos. 07 §6.3 (líneas 1340-1357) no lista un linter, ni una plataforma de CI, ni un proveedor de cobertura, ni un escáner. 07 §6.1 sí exige el linter (líneas 1315 y 1324) y el escaneo (línea 1318).
  - Ningún archivo del spec-pack dice dónde corre el pipeline ni dónde se aloja el repositorio. Un CI alojado recibe el código del proyecto y es un servicio externo (PRINCIPIO-012 h).
  - Vitest calcula la cobertura con un paquete aparte (por ejemplo `@vitest/coverage-v8`), que tampoco figura en §6.3.
  - PRINCIPIO-011 y 08 (línea 13) piden que los tests de cada tarea sean "escenarios Gherkin". No hay un ejecutor de Gherkin aprobado (Cucumber o `playwright-bdd`), ni una convención escrita para escribirlos con Vitest y Playwright.
  - Hay que confirmar si la aprobación de "axe-core" incluye `@axe-core/playwright`, y si la de "Drizzle" incluye `drizzle-kit` para las migraciones.
- **Impacto:** T-001 es la única tarea sin dependencias y todas las demás dependen de ella. Su criterio de completitud ("el pipeline … falla con un `it.skip` y con una importación desde `domain` hacia `infrastructure`") exige justamente el linter y el CI. Un agente no puede agregarlos (PRINCIPIO-012 e), así que no puede cerrar T-001. Además, la convención Gherkin es parte de la definición de terminado de cada tarea de dominio.
- **Acción:**
  1. El Product Owner aprueba en 07 §6.3, con nombre exacto: el linter y su configuración, la plataforma del pipeline y el alojamiento del repositorio, el proveedor de cobertura, el escáner de secretos y, si hacen falta, `@axe-core/playwright` y `drizzle-kit`.
  2. Abrir **PREG-055 [REQUIERE DECISIÓN]**: cómo se escriben los escenarios Gherkin. Una opción sin dependencias es nombrar cada test `Escenario: RN-NNN …` con pasos `Dado / Cuando / Entonces` en Vitest y Playwright. La otra es aprobar un ejecutor.
  3. En 08, agregar estas aprobaciones a "Bloqueos externos" de T-001, junto al escáner que ya figura.

#### C-02 · Los textos de los correos de cuenta bloquean T-006 y, a través de T-007, toda la ruta crítica
- **Evidencia:** 08 (línea 126) marca [REQUIERE DECISIÓN] el asunto y el texto de los correos de verificación y recuperación, que no están en 03 §2.9 ni en los criterios de HU-001 y HU-002, y dice que eso bloquea T-006. T-007 depende de T-006 (línea 202), y de T-007 dependen todas las tareas desde T-008 hasta T-025.
- **Impacto:** según la propia regla del backlog (línea 15), T-006 no se puede cerrar sin esos textos, y con ella se detienen 22 de las 25 tareas, incluida toda la ruta crítica después de T-002. El backlog lo presenta como un bloqueo puntual de T-006, pero en realidad detiene todo el plan.
- **Acción (elegir una):**
  1. El Product Owner redacta el asunto y el cuerpo de los 2 correos en 03 §2.9, tratando de "usted" (RN-090) y con las fechas en DD/MM/AAAA (RN-092).
  2. O bien, redefinir T-006 para que la plantilla tome el texto del catálogo con una entrada [REQUIERE DECISIÓN]. El criterio de T-006 solo verifica el destinatario, el enlace y la configuración SMTP, así que se puede cumplir. El bloqueo pasa entonces de T-006 al lanzamiento de F-01, igual que la política de privacidad (08, línea 127).

### 2.2 Mayores

#### M-01 · Ninguna tarea asigna el turno ni el receptor del pozo según el resultado del sorteo (RN-036, RN-037)
- **Evidencia:** RN-036 ("asignar a cada participante como número de turno su posición en el resultado") y RN-037 ("el pozo de la ronda k al participante con el turno k") están en HU-006 (criterio de la línea 360: Pedro en el turno 2, Jorge en el turno 4) y en la tabla `rounds` de 07 §3.2 (línea 340, `pot_recipient_id`). T-014 (líneas 268-274) crea `rounds`, pero ni su descripción ni su criterio dicen cómo se llena `pot_recipient_id` ni prueban el turno de nadie. Ninguna otra tarea cita estas RN.
- **Impacto:** quién recibe el dinero de cada ronda es una decisión sobre dinero (PRINCIPIO-012 g). Si no está en la tarea, el agente puede dejarla vacía, y las vistas de T-016 y T-023 ("Su turno: 7") fallarían sin una causa clara. Además, dos RN Must quedarían sin escenario (PRINCIPIO-011).
- **Acción:** agregar a la descripción de T-014: "asigna `rounds.pot_recipient_id` de la ronda k al participante en la posición k de `result` (RN-036, RN-037)". Agregar a su criterio: "en la Junta Oficina, con `result` que empieza `["user_501","user_234","user_502","user_456",…]`, la ronda 2 tiene `pot_recipient_id = user_234` (Pedro) y la ronda 4 `user_456` (Jorge)".

#### M-02 · Criterios de completitud que no prueban criterios de las HU Must
- **Evidencia, por tarea:**
  - **T-015** (líneas 276-284): no menciona la autorización. Faltan HU-008 "Lucía … `POST /contributions/{id}/payment` … recibe `403`" (RN-051, RN-077) y "[NUEVO] Lucía intenta desmarcarla … recibe `403`". **RN-051 no la cita ninguna tarea.**
  - **T-012** (líneas 246-254): implementa API-014 "con los rechazos de RN-114 y RN-115". No cita RN-111 ni prueba que salir antes del orden libere el cupo y devuelva la junta de `full` a `open` (HU-005: "un familiar pulsa 'Salir de la junta' … vuelve a `open`", RN-111, RN-113, RN-101). Tampoco prueba "Este código no es válido." (RN-116, que no cita ninguna tarea).
  - **T-011** (líneas 236-244): no prueba que quitar a alguien en una junta `full` la devuelva a `open` (RN-101), ni el `409` de API-012 después de fijar el orden (RN-114, HU-014 [NUEVO] Negativo).
  - **T-014** (líneas 268-274): no prueba `ROUND1_DUE_DATE_PASSED` (RN-122, HU-006 "la ronda 1 … vence el 30/11/2026 y los cupos se llenan el 02/12/2026") ni que Jorge no tenga cuotas en la Junta Ventas (RN-044).
  - **T-016** (líneas 286-294): no prueba `next_due_date: null` y `next_status: null` en la ronda 10 (RN-119, HU-010).
  - **RN-041** (pozo = cuota × participantes): ninguna tarea la cita. Solo T-023 muestra "S/ 3,600.00" en pantalla, sin un test de dominio, aunque PRINCIPIO-011 pide 100 % de cobertura en el cálculo de cuotas.
- **Impacto:** una tarea puede darse por terminada sin cumplir criterios aprobados de su HU, y esas RN quedan sin escenario Gherkin que cite su ID.
- **Acción:** agregar a cada criterio de completitud el caso que falta, con los datos de la HU: T-015 (`403` de Lucía en API-017 y API-018); T-012 (salir de la Junta Familia con 12 de 12 cupos → 11 de 12 y `open`; `ZZZZ2222` → "Este código no es válido."); T-011 (quitar a alguien con 12 de 12 → `open`; quitar a Pedro en la Junta Oficina → `409`); T-014 (sortear el 02/12/2026 con la ronda 1 el 30/11/2026 → `409`; Junta Ventas sin cuotas de `user_456`); T-016 (Pedro en la ronda 10 → `null`); y T-003 o T-014 (pozo `30000 × 12 = 360000` y `1000 × 2 = 2000`, RN-041).

#### M-03 · HU-015 promete "desmarcar sin conexión", pero ningún criterio ni tarea lo prueba
- **Evidencia:** el título y la historia de HU-015 (líneas 472-476) dicen "Registrar y desmarcar pagos sin conexión", y RN-170 permite desmarcar sin conexión. Los 6 criterios (líneas 479-484) solo registran pagos. API-021 acepta `correct_payment` (07, línea 995), pero T-017 y T-020 solo prueban `register_payment`.
- **Impacto:** el tipo `correct_payment` del outbox y su conflicto ("se desmarca sin conexión un pago que otro dispositivo ya desmarcó", RN-131 con RN-171) quedan sin probar, y §2.9 no tiene un `{motivo}` para ese rechazo.
- **Acción:** agregar a HU-015 un criterio [NUEVO] **Positivo**: "Jorge desmarca sin conexión el pago de Lucía de la ronda 1 a las 18:45 del 28/11/2026; al reconectar, se guarda la corrección con `performed_at = "2026-11-28T18:45:00-05:00"` y la cuota vuelve a `pending`". Agregar también un criterio **Negativo** para el conflicto y pedir **[REQUIERE DECISIÓN]** el `{motivo}` en §2.9. Después, sumar `correct_payment` a los criterios de T-017 y T-020.

#### M-04 · HU-014 lista RN-101 sin probarla, y nadie define qué pasa si el organizador deja de participar
- **Evidencia:**
  - HU-014 lista RN-101 (línea 261), pero ninguno de sus 9 criterios pasa una junta de `full` a `open`. El único "quitar" ocurre en una junta "Abierta" con 9 de 12 cupos (línea 256).
  - RN-106 permite editar "su participación". API-010 (07, líneas 717-724) solo cubre el caso de pasar a participar (`NO_FREE_SLOT_FOR_ORGANIZER`, RN-109). Ninguna RN, contrato ni tarea dice qué pasa al pasar de "Sí participo" a "No participo": si se libera su cupo (`occupies_slot`), si la junta vuelve a `open` (RN-101) y cómo cambia la lista de entrada (RN-030, RN-123).
  - Subir `participant_count` en una junta `full` también debería devolverla a `open` (RN-101), pero no hay criterio ni prueba.
- **Impacto:** quién entra al sorteo y quién paga cuotas (RN-030, RN-044) depende de un caso que nadie especificó, y el agente tendría que decidirlo (PRINCIPIO-012 a y g).
- **Acción:** agregar a HU-014 dos criterios [NUEVO] **Borde**: quitar a un familiar de la Junta Familia con 12 de 12 cupos → 11 de 12 y `open`; y subir la cantidad de una junta `full` de 10 a 11 → `open`. Abrir **PREG-056 [REQUIERE DECISIÓN]** sobre el organizador que deja de participar antes del orden y, con la respuesta, escribir la RN-212 y su criterio.

#### M-05 · RN-117 dice "bloqueo posterior"; 07 y T-012 implementan una "ventana deslizante"
- **Evidencia:** RN-117 dice: "Si una cuenta ingresa 10 códigos inválidos en 3600 s, … DEBE rechazar sus intentos … **durante los 3600 segundos siguientes**". 07 §3.2 (`invite_code_attempts`, línea 332) dice "permite contar los códigos inválidos de los últimos 3600 s", y API-013 y T-012 (línea 253) hablan de "límite de 10 códigos inválidos en 3600 s".
- **Impacto:** las dos lecturas dan resultados distintos. Por ejemplo, con 9 inválidos a las 10:00 y el décimo a las 10:59: según RN-117 la cuenta queda bloqueada hasta las 11:59; con ventana deslizante, a las 11:00:01 queda 1 inválido en la última hora y la cuenta puede intentar. El criterio de HU-005 (10 inválidos entre las 10:00 y las 10:20, aceptado a las 11:21) da lo mismo con las dos lecturas, así que no detecta el error.
- **Acción:** el Product Owner confirma la lectura de RN-117 [REQUIERE DECISIÓN]. Después, 07 §3.2 y T-012 se alinean con ella, y se agrega a HU-005 un criterio **Borde** que distinga las dos lecturas, con los instantes del ejemplo de arriba.

#### M-06 · API-026 se contradice sobre volver a ejecutar el job, y T-019 elige una de las dos lecturas
- **Evidencia:** la tabla de API-026 (07, línea 1163) dice `409 JOB_ALREADY_RUNNING` cuando "ya hay una corrida para esa fecha". La línea 1165 dice que `UNIQUE (contribution_id, scheduled_on)` "impide duplicar si la corrida se repite", y la respuesta tiene el contador `already_sent`. T-019 (línea 324) espera que la segunda corrida del 27/11/2026 devuelva `already_sent = 1`, no `409`.
- **Impacto:** el criterio de T-019 contradice el contrato, y el agente no puede cumplir los dos.
- **Acción:** corregir la fila del `409` en 07: "Hay otra corrida **en curso** para esa fecha". Así se conserva el nombre del código, la idempotencia y el criterio de T-019.

#### M-07 · Dependencias invertidas u ocultas entre tareas
- **Evidencia:**
  - **T-007 → T-008:** T-007 (línea 203) implementa API-003, que exige sesión (07, línea 548), y el guardián `requireVerifiedEmail`. Pero el middleware que valida la sesión se construye en T-008 (línea 213).
  - **T-020 → T-021 y T-023:** el criterio de T-020 (línea 334) pide en Playwright "encolar 2 cambios `register_payment`" y "volver a iniciar sesión", pero la pantalla "Pagos" (T-023) y la de inicio de sesión (T-021) dependen de T-020.
  - **T-022 → T-021:** el criterio de T-022 (línea 354) dice que Ana "queda unida al iniciar sesión", pero T-022 depende solo de T-012 y T-020 (línea 352), no de T-021, que construye "Iniciar sesión".
- **Impacto:** al tomar una tarea, el agente encuentra que falta algo que se construye en otra tarea posterior o paralela, y la estimación y la ruta crítica quedan mal calculadas. Si se agrega T-021 como dependencia de T-022, el final pasa de la hora 27 a la 29.
- **Acción:** pasar el middleware de sesión de T-008 a T-007; reescribir el criterio de T-020 con un arnés (sesión creada por la API y cambios inyectados en el outbox) o mover esa parte del criterio a T-023; agregar T-021 a las dependencias de T-022 y recalcular la ruta crítica.

#### M-08 · Verificaciones exigidas por la constitución y por 07 §6.1 que ninguna tarea hace
- **Evidencia:**
  - **p95 ≤ 500 ms por endpoint** (PRINCIPIO-010; 02 §5, línea 102; 07 §6.1, línea 1323, "métrica de latencia por ruta con alerta sobre el p95"): ninguna tarea lo mide.
  - **Contraste ≥ 4.5:1, áreas táctiles ≥ 44 × 44 px y texto base ≥ 16 px** (PRINCIPIO-010): T-025 (línea 383) solo pide "0 violaciones de WCAG 2.2 nivel A" en axe-core. El contraste mínimo (criterio 1.4.3) es de nivel AA, el tamaño de 44 × 44 px (2.5.5) es de nivel AAA y el tamaño del texto no es un criterio WCAG, así que un análisis de nivel A no verifica ninguno de los tres.
  - **Test de tuteo (RN-090) y linter de nombres en inglés (PRINCIPIO-002):** 07 §6.1 (línea 1315) los pide, pero ninguna tarea los incluye.
  - **Escenarios técnicos de RN-200 y RN-201** (07 §6.1, línea 1318): T-024 solo cubre RN-202 y RN-203. T-002 crea `staff_access_log`, pero ninguna tarea construye el procedimiento que la escribe (07 §3.2, línea 366). RN-200 no la cita ninguna tarea.
- **Impacto:** estos mínimos no se verifican en el pipeline, y RN-200 y RN-201 quedan sin escenario que cite su ID (PRINCIPIO-011).
- **Acción:** agregar al criterio de T-025 las reglas de axe-core para contraste y tamaño de objetivo (o una revisión con valores medidos de 4.5:1, 44 × 44 px y 16 px) y una medición del p95 por ruta en el pipeline. Agregar a T-024 el test de tuteo y la regla de nombres. Agregar una tarea de operación, o un checklist versionado con escenarios Gherkin, para RN-200 y RN-201.

#### M-09 · Ningún componente termina TLS
- **Evidencia:** PRINCIPIO-005 exige TLS ≥ 1.2. 07 §4.1 (línea 409) exige HTTPS con redirección, y §6.4 (línea 1366) un certificado con renovación automática. T-002 (línea 154) levanta solo 3 contenedores (app, worker y PostgreSQL), y `next start` sirve HTTP. Ni 07 §2.1, ni §6.3, ni ninguna tarea tienen un proxy inverso, ni la herramienta que renueva el certificado.
- **Impacto:** el despliegue no puede cumplir PRINCIPIO-005. Además, la redirección a HTTPS de T-005 (línea 183), si queda detrás de un proxy sin leer `X-Forwarded-Proto`, puede redirigir en bucle.
- **Acción:** agregar a 07 §2.1 y §6.3 el componente de terminación TLS y su renovación de certificado, para aprobación (PRINCIPIO-012 e). Agregar a T-002 el cuarto contenedor y a T-005 la lectura de `X-Forwarded-Proto`.

#### M-10 · La trazabilidad de 07 se contradice entre secciones
- **Evidencia:**
  - El índice §4.2 traza API-010, API-011 y API-012 a HU-004 (líneas 451-453), pero su detalle y §8.1 los trazan a HU-014.
  - El índice traza API-021 a "HU-008, HU-009" (línea 462), pero su detalle (línea 948) y §8.1 dicen HU-015 y HU-009.
  - Los títulos §4.4 (línea 646) y §4.6 (línea 841) no nombran HU-014 ni HU-015.
  - §8.1 no lista `notifications` para HU-002, aunque esa HU envía el correo de recuperación (T-006).
  - `notifications` tiene listas de HU distintas en §2.1 y en §8.2.
  - En §8.2, `api` no incluye HU-015, aunque esa HU usa API-017, API-018 y API-021.
- **Impacto:** quien siga el índice para saber qué HU verifica cada contrato llega a la HU equivocada, porque la división de HU-004 y HU-008 no se propagó a todo el documento.
- **Acción:** corregir en 07 el índice §4.2 (API-010 a API-012 → HU-014; API-021 → HU-015, HU-009), los títulos §4.4 y §4.6, la fila de HU-002 en §8.1 y las listas de §2.1 y §8.2, para que coincidan con §8.1.

#### M-11 · RN y HU con prioridades que no coinciden
- **Evidencia:**
  - **RN-142** es MUST ("contar como un solo recordatorio el correo y la notificación push"), pero solo está en HU-012 (Should) y depende del push (F-07, Should). Ninguna HU Must ni ninguna tarea la cita.
  - **RN-204** es SHOULD (encuesta de KPI-05), pero está en "Reglas relacionadas" de HU-004 (Must, línea 227) sin ningún criterio. API-009, que es Must, devuelve `survey_pending` (07, línea 709), y el backlog lo deja para la próxima versión (T-010, línea 233).
- **Impacto:** el MVP tiene una RN Must sin escenario (PRINCIPIO-011), y una HU Must arrastra una RN Should.
- **Acción:** que el Product Owner pase RN-142 a SHOULD, o que se agregue a HU-011 un criterio que la pruebe con un solo canal. Sacar RN-204 de las "Reglas relacionadas" de HU-004 (ya está en HU-018) y marcar en API-009 el campo `survey_pending` como Should.

#### M-12 · El alcance pide F-18 lista para las primeras 10 juntas, y el backlog no la planifica antes del lanzamiento
- **Evidencia:** 02 §1 (línea 39) dice que F-18 "tiene que estar lista para medir la línea base de KPI-05 con las primeras 10 juntas", y 02 §3 lo repite. 08 la deja para "la próxima versión" (línea 394), sin ninguna dependencia con el lanzamiento.
- **Impacto:** si el MVP sale sin la encuesta, la línea base de esas 10 juntas ya no se puede medir.
- **Acción:** agregar a "Bloqueos externos" de 08: "Lanzamiento del MVP ← HU-018 descompuesta e implementada (T-026)". Otra opción es que el Product Owner acepte por escrito medir la línea base más tarde.

### 2.3 Sugerencias

#### S-01 · Criterios que atribuyen a una RN algo que su texto no dice
| HU y criterio | RN citada | Qué afirma el criterio | Qué dice la RN | Acción |
|---|---|---|---|---|
| HU-002, política 1.1 (línea 117) | RN-168, RN-169 | "se conserva el registro de la versión 1.0" | RN-169: "guardar esa versión y la fecha y hora". No dice que se conserve la anterior. ADR-003 (07, línea 1259) también se lo atribuye a RN-169 | Proponer RN-212 (o la siguiente libre): "El sistema NO DEBE borrar ni modificar una aceptación de la política ya guardada", y citarla aquí, en ADR-003 y en T-009 |
| HU-002, [NUEVO] Negativo (línea 119) | RN-075 | "no se abre ninguna sesión … y su contador de intentos fallidos sube en 1" | RN-075 solo bloquea tras 5 fallos. Ninguna RN dice que se rechace una contraseña incorrecta ni que se cuente el fallo | Proponer una RN para "credenciales incorrectas → rechazar y contar un fallo"; mientras tanto, §2.9 asigna el mensaje a RN-075 |
| HU-010, [NUEVO] Borde (línea 560) | RN-022 | cuándo cambia la ronda actual | RN-022 usa "ronda actual" pero no la define; la definición está en 04-glosario.md ("Ronda actual", PREG-039) | Citar "04-glosario.md, Ronda actual" junto a RN-022 |
| HU-016, [ALINEACIÓN] Borde (línea 664) | RN-071 | "el aviso … no cambia el contador de recordatorios de Pedro" | RN-071 solo fija el máximo de 5. Que el aviso no es un recordatorio sale de 04-glosario.md ("Recordatorio") | Citar el glosario |
| HU-004 (línea 227) | RN-204 | — (ningún criterio) | Encuesta, Should | Ver M-11 |
| HU-003 (línea 163) | RN-188 | — (solo una nota) | El código se envía aunque los recordatorios estén desactivados | Agregar un criterio **Positivo**: Jorge, con los recordatorios por correo desactivados, recibe `482915` al iniciar sesión |

#### S-02 · RN que se implementan o prueban sin citar su ID
- En 08: RN-025 y RN-026 (T-023, "Su turno: 7" y el estado de cada ronda), RN-030 (T-014, "la entrada no incluye a Jorge") y RN-035 (T-014, "un `UPDATE draws` … falla") se prueban sin citar su ID.
- En 07: RN-025, RN-026, RN-030 y RN-088 no se citan en ninguna parte, aunque API-023 entrega `me.turn_number` y `me.contributions`, y API-001 se apoya en la casilla desmarcada.
- **Acción:** agregar los IDs a esas tareas y a API-001, API-015 y API-023, para que el escenario Gherkin pueda citarlos (PRINCIPIO-011).

#### S-03 · La regla de textos del backlog es más estrecha de lo que el backlog aplica
- **Evidencia:** 08 (línea 15) dice que los textos salen de §2.9 y que, si no están, se marca [REQUIERE DECISIÓN]. Sin embargo, T-018 (asunto del recordatorio), T-020 ("Sin conexión. Última sincronización: …") y T-023 ("Su turno: 7") usan textos de los criterios de 06 o de API-026, sin esa marca, mientras que T-006 sí la usa. Además, T-023 no incluye el texto de RN-105 ("Su turno y sus cuotas aparecerán cuando se fije el orden de turnos.", HU-010), y el texto de "Pagos" sin cuotas (nota de HU-008, línea 461) no está en ninguna parte.
- **Acción:** reescribir la regla: "los textos salen de §2.9 o de los criterios aprobados de 06". Agregar a T-023 el texto de RN-105 y marcar [REQUIERE DECISIÓN] el de "Pagos" vacío.

#### S-04 · Trazabilidad backward incompleta en 08
- T-021 implementa los criterios de HU-015 sobre cerrar sesión (RN-197, RN-198), pero su "HU relacionada" (línea 338) no incluye HU-015, y la tabla de cobertura tampoco lista T-021 para HU-015 (línea 80).
- T-001, T-002 y T-005 dicen solo "Infraestructura". Pueden trazar a lo que habilitan: T-002 a RN-201 y ADR-003; T-005 a PRINCIPIO-005, PRINCIPIO-006 y RN-077.
- **Acción:** completar esos campos en 08.

#### S-05 · El modelo de datos referencia tablas que el MVP no crea
- `payments.reported_payment_id` es una FK a `reported_payments` (07, líneas 291 y 347), pero 08 deja esa tabla para la próxima versión (línea 390). Tampoco se dice si T-007 crea `users.two_factor_enabled` y `users.overdue_notices_enabled`, que son columnas de HU-003 y HU-016.
- **Acción:** indicar en T-015 que la columna se crea sin FK y que la FK se agrega con HU-009, o crear `reported_payments` vacía en T-015. Para las columnas de `users`, indicar en T-007 si se crean ahora.

#### S-06 · No está definida la respuesta de API-021 para los 3 tipos del pago informado en el MVP
- T-017 (línea 303) dice que `report_payment`, `confirm_reported_payment` y `reject_reported_payment` "se conectan cuando se implemente HU-009", pero no dice qué responde API-021 mientras tanto. RN-170 los permite, así que `CHANGE_TYPE_NOT_ALLOWED_OFFLINE` no aplica.
- **Acción:** [REQUIERE DECISIÓN] definir un código para un tipo aceptado que todavía no tiene caso de uso, o excluirlos explícitamente hasta HU-009.

#### S-07 · Tareas que probablemente superan las 2 h
- T-007 (5 tablas, 3 endpoints, un guardián, cifrado y sesión), T-023 (4 pantallas, outbox y diseño a 360 px) y T-025 (recorrido E2E completo, axe-core, Lighthouse, scroll a 360 y 1440 px y presupuesto de JavaScript) concentran mucho trabajo para el tope de 2 h de 08 (línea 10).
- **Acción:** partir T-007 en "cuenta y consentimiento" y "verificación del correo"; T-023 en "sorteo y estado" y "pagos"; T-025 en "E2E" y "presupuestos de calidad en el pipeline". Usar los siguientes IDs libres (T-034 en adelante, después de los de las HU Should) o renumerar antes de asignar, ya que todavía son un borrador.

#### S-08 · Un criterio de T-015 mezcla dos valores de "hoy"
- T-015 (línea 284) registra el pago de Pedro con `paid_on` 02/12/2026, que solo es válido si `todayInLima()` ≥ 02/12/2026. En el mismo criterio fija "hoy 28/11/2026".
- **Acción:** indicar la fecha inyectada en cada caso.

#### S-09 · Los navegadores mínimos no se prueban
- 02 §5 (línea 108) fija Chrome para Android, Samsung Internet, Edge, Firefox y Safari desde iOS 16.4. T-025 no dice en qué motores corre Playwright.
- **Acción:** agregar a T-025 los proyectos Chromium, Firefox y WebKit, y anotar que Samsung Internet y Safari para iPhone se verifican a mano antes del lanzamiento.

#### S-10 · Error ortográfico en un texto que ve el usuario
- "Confírmelo o **recházelo** en Mi Junta" debería ser "**rechácelo**" (imperativo de "rechazar" con "usted"). Aparece en 03-reglas-de-negocio.md (línea 1528), 06-user-stories.md (línea 508) y 07-architecture.md (línea 1180).
- **Acción:** corregirlo en los 3 archivos antes de descomponer HU-009.

#### S-11 · Referencias desactualizadas
- 07 §2.1 (línea 98) dice que `crypto` lee las claves "desde el gestor de secretos", pero PREG-050 decidió variables de entorno, como dice §2.2 (línea 138).
- ADR-005 solo describe el índice ciego del DNI; §3.5 tiene también el del celular (RN-180). El diagrama ER no marca `phone_blind_index` como `UK`.
- Encabezados "Fuente" con versiones viejas: 06 cita 02 v0.2, 03 v0.2 y 00 v0.3; 07 cita 00 v0.4, 02 v0.3, 03 v0.3 y 06 v0.4.0; 08 no cita la versión de 03; 02 cita 03 v0.2.
- 03 (línea 7) dice que cubre "F-07 a F-11", pero también tiene las reglas de F-16 a F-18.
- **Acción:** actualizar esas líneas. No cambian ninguna regla.

#### S-12 · El cálculo de `{n}` en RN-164 admite dos resultados (HU-003)
- §2.9 (línea 2716) define `{n}` como los minutos, redondeados hacia arriba, "que faltan para que el pedido más antiguo … salga de esa ventana". El criterio de HU-003 (línea 154) dice que el pedido de las 10:00:00 "sale de la ventana … a las 10:15:00" y espera 11 minutos a las 10:05. Hasta las 10:15:00 faltan 10 minutos; solo da 11 si se cuenta hasta las 10:15:01, que es cuando el usuario puede volver a pedir.
- **Acción:** antes de descomponer HU-003, fijar en §2.9 el instante de referencia (10:15:01, "desde cuándo se puede volver a pedir") y ajustar el texto del criterio.

---

## 3. Matriz de trazabilidad

Estado **vigente**, después de las decisiones del equipo (sección "Decisiones del equipo", al final): 03-reglas-de-negocio.md v0.4, 06-user-stories.md v0.4, 07-architecture.md v0.4 y 08-backlog.md v0.4. Las tablas se generaron con scripts sobre esos archivos; cada celda sale de una cita literal del ID. El estado al momento de la auditoría está en las secciones 1 y 2.

### 3.1 HU Must → RN → componentes → contratos → tareas

| HU | F | RN relacionadas | Componentes (07 §8.1) | Contratos | Tareas (08) | Estado |
|---|---|---|---|---|---|---|
| HU-001 | F-01 | 20 | `pwa`, `api`, `identity`, `crypto`, `notifications` | API-001 a API-003 | T-004, T-006, T-007, T-021, T-024, T-025 | ✅ |
| HU-002 | F-01 | 14 | `pwa`, `api`, `identity`, `notifications` | API-004 a API-008 | T-006, T-007, T-008, T-009, T-021, T-025 | ✅ |
| HU-004 | F-02 | 20 | `pwa`, `api`, `juntas`, `turn-order` | API-009 | T-003, T-010, T-022, T-025 | ✅ |
| HU-014 | F-02 | 17 | `pwa`, `api`, `juntas` | API-010 a API-012 | T-011, T-022, T-025 | ✅ |
| HU-005 | F-02 | 17 | `pwa`, `api`, `juntas` | API-013, API-014 | T-012, T-022, T-025 | ✅ |
| HU-006 | F-03 | 32 | `pwa`, `api`, `turn-order`, `junta-views` | API-015, API-016 | T-003, T-013, T-014, T-023, T-025 | ✅ |
| HU-008 | F-04 | 18 | `pwa`, `api`, `payments`, `junta-views` | API-017 a API-020 | T-015, T-016, T-023, T-025 | ✅ |
| HU-015 | F-04 | 13 | `pwa`, `sync`, `payments` | API-017, API-018, API-021 | T-017, T-020, T-021, T-023, T-025 | ✅ |
| HU-010 | F-05 | 17 | `pwa`, `api`, `junta-views`, `sync` | API-020, API-022 a API-025 | T-016, T-017, T-020, T-023, T-024, T-025 | ✅ |
| HU-011 | F-06 | 22 | `pwa`, `api`, `scheduler`, `notifications`, `identity` | API-026, API-032 | T-009, T-018, T-019, T-021, T-025 | ✅ |
| HU-019 | F-01, F-04 | 4 | `crypto`, `junta-views`, PostgreSQL y operación | — (escenarios técnicos) | T-004 (RN-202), T-024 (RN-202, RN-203), T-027 (RN-200, RN-201) | ✅ |

Las 8 HU Should (HU-003, HU-007, HU-009, HU-012, HU-013, HU-016, HU-017 y HU-018) trazan a sus componentes y contratos en 07 §8.1, y a la sección "Pendiente para la próxima versión" de 08 (desde T-028). Sus 50 RN SHOULD (incluida RN-142, que pasó a SHOULD) no tienen tareas en esta versión, como declara 08.

### 3.2 RN Must → HU → componente o contrato de 07 → tabla de 07 → tarea de 08

Las 162 RN Must de 03 v0.4: sale RN-142, que pasó a SHOULD, y entra RN-212. "(S)" marca una HU Should, que aparece además de la HU Must. Ninguna fila tiene huecos.

| RN | HU | Componente o contrato (07) | Tabla (07 §3.2) | Tarea (08) | Estado |
|---|---|---|---|---|---|
| RN-001 | HU-004 | API-009 | — | T-010 | ✅ |
| RN-002 | HU-004, HU-013(S) | juntas, API-009 | juntas | T-010 | ✅ |
| RN-003 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-004 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-005 | HU-004, HU-006 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-006 | HU-004 | juntas, API-009 | juntas, memberships | T-010 | ✅ |
| RN-007 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-008 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-009 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-010 | HU-004, HU-011 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-011 | HU-004 | juntas | juntas | T-010, T-022 | ✅ |
| RN-012 | HU-004 | juntas, turn-order, API-009 | juntas | T-003, T-010 | ✅ |
| RN-013 | HU-006, HU-007(S) | turn-order, API-015, API-029 | rounds | T-014 | ✅ |
| RN-096 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-097 | HU-004 | juntas, API-009 | — | T-003, T-010 | ✅ |
| RN-098 | HU-004 | turn-order, API-009 | — | T-022 | ✅ |
| RN-099 | HU-004 | juntas, API-009 | juntas | T-010 | ✅ |
| RN-100 | HU-014, HU-005 | juntas, API-010, API-013 | juntas | T-012 | ✅ |
| RN-101 | HU-017(S), HU-014, HU-005 | juntas, API-010, API-012, API-014 | juntas | T-011, T-012 | ✅ |
| RN-102 | HU-006, HU-007(S) | juntas, turn-order, API-015, API-029 | juntas | T-014 | ✅ |
| RN-103 | HU-017(S), HU-008 | juntas, payments, API-017 | juntas | T-015 | ✅ |
| RN-104 | HU-008 | juntas, payments, API-018 | juntas | T-015 | ✅ |
| RN-105 | HU-008, HU-010, HU-011 | API-020, API-023, API-024 | juntas | T-016, T-023 | ✅ |
| RN-106 | HU-014, HU-013(S) | juntas, API-010 | juntas | T-011 | ✅ |
| RN-107 | HU-014 | juntas, API-010 | juntas | T-011 | ✅ |
| RN-108 | HU-014 | juntas, API-010 | juntas | T-011 | ✅ |
| RN-109 | HU-014 | juntas, API-010 | juntas | T-011 | ✅ |
| RN-110 | HU-014, HU-013(S) | juntas, API-010 | juntas | T-011 | ✅ |
| RN-212 | HU-014 | juntas, API-010 | — | T-011 | ✅ Nueva (M-04, PREG-056) |
| RN-015 | HU-004 | juntas, API-009 | invite_codes | T-010 | ✅ |
| RN-016 | HU-004 | juntas, API-009, API-011 | invite_codes | T-010 | ✅ |
| RN-017 | HU-005 | API-013 | — | T-012 | ✅ |
| RN-018 | HU-005 | juntas, API-013 | — | T-012 | ✅ |
| RN-019 | HU-005, HU-006 | turn-order, API-011, API-013, API-015 | invite_codes | T-014 | ✅ |
| RN-020 | HU-014, HU-005 | API-011, API-013 | invite_codes | T-011 | ✅ |
| RN-021 | HU-005 | API-013 | memberships | T-012 | ✅ |
| RN-022 | HU-010 | junta-views, API-024 | — | T-016, T-024 | ✅ |
| RN-023 | HU-010 | junta-views, API-020, API-024 | — | T-016, T-024 | ✅ |
| RN-024 | HU-014, HU-006, HU-010 | api, API-012, API-016, API-023, API-024, API-035 | — | T-011 | ✅ |
| RN-025 | HU-007(S), HU-010 | junta-views | — | T-016, T-023 | ✅ |
| RN-026 | HU-010 | junta-views | — | T-016, T-023 | ✅ |
| RN-111 | HU-005 | API-014 | memberships | T-012 | ✅ |
| RN-112 | HU-014 | API-012 | memberships | T-011 | ✅ |
| RN-113 | HU-017(S), HU-014, HU-005 | API-012, API-014 | memberships | T-011, T-012 | ✅ |
| RN-114 | HU-014, HU-005 | API-012, API-014 | memberships | T-011, T-012 | ✅ |
| RN-115 | HU-017(S), HU-005 | API-012, API-014 | memberships | T-011, T-012 | ✅ |
| RN-116 | HU-005 | API-013 | invite_code_attempts | T-012 | ✅ |
| RN-117 | HU-005 | juntas, API-013 | invite_code_attempts | T-012 | ✅ Aclarada (M-05, PREG-057) |
| RN-118 | HU-010 | junta-views, API-024 | — | T-016, T-024 | ✅ |
| RN-119 | HU-010 | junta-views, API-024 | — | T-016 | ✅ |
| RN-120 | HU-010 | junta-views, API-020 | — | T-016 | ✅ |
| RN-121 | HU-006 | API-016 | — | T-014, T-023 | ✅ |
| RN-178 | HU-010, HU-016(S) | API-024 | — | T-016, T-024 | ✅ |
| RN-190 | HU-005 | juntas, API-013 | — | T-012 | ✅ |
| RN-192 | HU-005 | juntas, API-013 | invite_code_attempts | T-012 | ✅ |
| RN-027 | HU-006 | turn-order, API-015 | — | T-014, T-023 | ✅ |
| RN-028 | HU-006 | turn-order, API-015 | — | T-014 | ✅ |
| RN-029 | HU-006 | pwa, API-015 | — | T-023 | ✅ |
| RN-030 | HU-014, HU-006 | turn-order | — | T-014 | ✅ |
| RN-031 | HU-006 | turn-order, API-015 | draws | T-014 | ✅ |
| RN-032 | HU-006 | API-015 | draws | T-014 | ✅ |
| RN-033 | HU-006 | API-015 | draws | T-014 | ✅ |
| RN-034 | HU-006 | turn-order, API-015 | draws | T-014 | ✅ |
| RN-035 | HU-006 | PostgreSQL y operación, turn-order, API-015 | draws | T-014 | ✅ |
| RN-036 | HU-006 | turn-order | rounds | T-014 | ✅ |
| RN-037 | HU-006, HU-007(S) | turn-order | rounds | T-014 | ✅ |
| RN-122 | HU-006, HU-007(S), HU-011 | turn-order, API-015, API-029 | — | T-014 | ✅ |
| RN-123 | HU-006 | juntas, turn-order, API-015 | draws, memberships | T-014 | ✅ |
| RN-124 | HU-006 | turn-order, API-015 | draws | T-013 | ✅ |
| RN-040 | HU-004 | juntas | — | T-003 | ✅ |
| RN-041 | HU-006, HU-007(S) | junta-views | rounds | T-003 | ✅ |
| RN-042 | HU-006, HU-007(S) | turn-order, API-015, API-029 | contributions | T-014 | ✅ |
| RN-043 | HU-006 | turn-order, API-015 | contributions | T-014 | ✅ |
| RN-044 | HU-014, HU-006 | turn-order, API-015 | contributions | T-014 | ✅ |
| RN-045 | HU-006 | turn-order, API-015 | contributions | T-014 | ✅ |
| RN-046 | HU-006 | turn-order, API-015 | rounds | T-003, T-014 | ✅ |
| RN-047 | HU-006 | turn-order, API-015 | rounds | T-003, T-014 | ✅ |
| RN-048 | HU-006 | turn-order, API-015 | rounds | T-003, T-014 | ✅ |
| RN-049 | HU-006 | turn-order, API-015 | rounds | T-003, T-014 | ✅ |
| RN-050 | HU-006 | turn-order, API-015 | rounds | T-003, T-014 | ✅ |
| RN-051 | HU-008 | API-017 | — | T-015 | ✅ |
| RN-052 | HU-008 | API-017 | payments | T-015 | ✅ |
| RN-053 | HU-008 | API-017 | contributions | T-015 | ✅ |
| RN-054 | HU-008, HU-009(S) | payments, API-017, API-027 | — | T-015 | ✅ |
| RN-055 | HU-008, HU-009(S) | payments, API-017, API-028 | payments | T-015 | ✅ |
| RN-056 | HU-008, HU-009(S) | payments, API-017, API-028 | payments | T-015 | ✅ |
| RN-057 | HU-008, HU-015 | payments, API-018 | payment_corrections | T-015 | ✅ |
| RN-058 | HU-008, HU-015 | PostgreSQL y operación, payments, API-018 | payment_corrections | T-015 | ✅ |
| RN-059 | HU-008, HU-015 | payments, API-018 | contributions | T-015 | ✅ |
| RN-130 | HU-008, HU-009(S) | payments, API-017, API-021 | — | T-015 | ✅ |
| RN-131 | HU-008, HU-015 | payments, API-018, API-021 | — | T-015 | ✅ |
| RN-132 | HU-008, HU-009(S) | payments, API-017, API-027 | — | T-015 | ✅ |
| RN-133 | HU-008, HU-011 | payments, API-017 | payments | T-015 | ✅ |
| RN-134 | HU-008 | PostgreSQL y operación, payments, API-018, API-019 | payments | T-015 | ✅ |
| RN-066 | HU-011, HU-012(S) | notifications, scheduler, API-026 | reminders | T-019 | ✅ |
| RN-067 | HU-011, HU-012(S), HU-016(S) | API-026 | reminders | T-018 | ✅ |
| RN-068 | HU-011 | API-026 | reminders | T-018 | ✅ |
| RN-069 | HU-011 | API-026 | reminders | T-018 | ✅ |
| RN-070 | HU-011, HU-012(S), HU-016(S) | API-026 | reminders | T-018 | ✅ |
| RN-071 | HU-011, HU-012(S), HU-016(S) | API-026 | reminders | T-018 | ✅ |
| RN-072 | HU-011, HU-012(S) | API-026 | reminders | T-018 | ✅ |
| RN-141 | HU-011 | API-026 | reminders | T-018 | ✅ |
| RN-143 | HU-011, HU-012(S) | notifications, scheduler, API-026 | reminders | T-018, T-019 | ✅ |
| RN-144 | HU-011, HU-012(S) | notifications, scheduler, API-026 | — | T-018 | ✅ |
| RN-145 | HU-011, HU-012(S) | notifications, scheduler, API-026 | — | T-018 | ✅ |
| RN-187 | HU-011 | identity, notifications, scheduler, API-026, API-032 | users | T-009, T-018, T-021 | ✅ |
| RN-188 | HU-003(S), HU-011 | notifications, scheduler, API-030, API-032 | — | T-006 | ✅ |
| RN-189 | HU-011 | API-008 | — | T-018 | ✅ |
| RN-199 | HU-011 | notifications, scheduler, API-026 | — | T-019 | ✅ |
| RN-074 | HU-001, HU-002 | API-001, API-007 | — | T-007 | ✅ |
| RN-075 | HU-002, HU-017(S) | identity, API-004 | users | T-008 | ✅ |
| RN-076 | HU-002 | identity, API-004 | — | T-008 | ✅ |
| RN-077 | HU-014, HU-013(S), HU-006, HU-007(S), HU-008, HU-009(S) | api, API-010, API-011, API-012, API-015, API-017, API-018, API-028, API-029 | — | T-011, T-015 | ✅ |
| RN-146 | HU-001 | identity, API-001 | users | T-007 | ✅ |
| RN-147 | HU-001 | identity, API-001 | users | T-007 | ✅ |
| RN-148 | HU-001 | identity, API-001 | users | T-007 | ✅ |
| RN-149 | HU-001 | identity | users | T-007, T-021, T-024 | ✅ |
| RN-150 | HU-001 | identity, API-001 | users | T-007 | ✅ |
| RN-151 | HU-001 | crypto, identity, API-001 | users | T-007 | ✅ |
| RN-152 | HU-001 | identity, notifications, scheduler, API-001, API-002 | email_tokens | T-006, T-007 | ✅ |
| RN-153 | HU-001, HU-005 | identity, API-009, API-013 | — | T-007, T-012 | ✅ |
| RN-154 | HU-001 | identity, API-002, API-003 | email_tokens | T-007 | ✅ |
| RN-155 | HU-002 | identity, notifications, scheduler, API-006, API-007 | email_tokens | T-006, T-009 | ✅ |
| RN-156 | HU-002 | identity, API-006 | — | T-009 | ✅ |
| RN-157 | HU-002 | identity, API-007 | email_tokens | T-009 | ✅ |
| RN-158 | HU-002 | identity, API-007 | sessions | T-009 | ✅ |
| RN-159 | HU-002 | identity | sessions | T-007 | ✅ |
| RN-160 | HU-002 | identity, API-004 | — | T-008 | ✅ |
| RN-161 | HU-002 | identity, API-004 | — | T-008 | ✅ |
| RN-180 | HU-001 | identity, API-001 | users | T-007 | ✅ |
| RN-181 | HU-001 | identity, API-001 | users | T-007, T-021 | ✅ |
| RN-191 | HU-002 | identity, API-004 | — | T-008 | ✅ |
| RN-200 | HU-019 | PostgreSQL y operación | staff_access_log | T-027 | ✅ |
| RN-201 | HU-019 | PostgreSQL y operación | staff_access_log | T-002, T-027 | ✅ |
| RN-202 | HU-019 | crypto | — | T-004, T-024, T-027 | ✅ |
| RN-082 | HU-001 | identity, API-001 | consents | T-007 | ✅ |
| RN-083 | HU-001 | identity, API-001 | consents | T-007 | ✅ |
| RN-084 | HU-001 | identity, API-001 | consents | T-007 | ✅ |
| RN-085 | HU-001 | API-001 | — | T-007 | ✅ |
| RN-086 | HU-001 | API-001 | — | T-007 | ✅ |
| RN-087 | HU-015 | pwa, sync, API-021 | — | T-017, T-020 | ✅ |
| RN-168 | HU-002 | identity, API-004, API-008 | privacy_policy_versions | T-009, T-021 | ✅ |
| RN-169 | HU-002 | identity, API-008 | consents | T-009 | ✅ |
| RN-170 | HU-001, HU-002, HU-003(S), HU-017(S), HU-004, HU-014, HU-005, HU-013(S), HU-007(S), HU-015 | pwa, API-021, API-029 | — | T-017, T-020, T-023 | ✅ |
| RN-171 | HU-015, HU-009(S) | sync, API-021 | client_changes | T-017 | ✅ |
| RN-172 | HU-015, HU-009(S) | API-021 | client_changes | T-017, T-023 | ✅ |
| RN-173 | HU-015 | sync, API-017 | client_changes, payments | T-017 | ✅ |
| RN-174 | HU-015 | pwa | — | T-020 | ✅ |
| RN-175 | HU-010 | pwa, sync, API-025 | — | T-017 | ✅ |
| RN-176 | HU-015 | pwa, API-021 | — | T-020 | ✅ |
| RN-197 | HU-015 | pwa | — | T-021 | ✅ |
| RN-198 | HU-015 | pwa | — | T-021 | ✅ |
| RN-203 | HU-019 | junta-views | — | T-024 | ✅ |
| RN-088 | HU-001 | pwa | — | T-021 | ✅ |
| RN-089 | HU-001 | pwa, API-001 | — | T-021 | ✅ |
| RN-090 | HU-010, HU-011, HU-012(S), HU-016(S) | notifications, scheduler, API-026 | — | T-006, T-018, T-024 | ✅ |
| RN-091 | HU-006, HU-007(S), HU-011, HU-012(S) | pwa, API-026 | — | T-003 | ✅ |
| RN-092 | HU-010, HU-011, HU-012(S), HU-016(S) | pwa, API-026 | — | T-003, T-006 | ✅ |
| RN-093 | HU-007(S), HU-010 | pwa, API-025 | — | T-003, T-006, T-020 | ✅ |
| RN-094 | HU-010 | pwa, API-025 | — | T-020 | ✅ |
| RN-095 | HU-010 | pwa, API-025 | — | T-020 | ✅ |
| RN-177 | HU-007(S), HU-010 | pwa | — | T-003, T-006, T-020 | ✅ |

### 3.3 Componentes → tareas

| Componente (07 §2.1) | HU Must que implementa | Tareas (08) | Estado |
|---|---|---|---|
| `pwa` | Las 10 HU Must con pantallas (HU-019 no tiene) | T-020, T-021, T-022, T-023, T-025 | ✅ |
| `api` | Las 11 | T-005, T-008, T-011, T-026 | ✅ |
| `identity` | HU-001, HU-002, HU-011 | T-007, T-008, T-009 | ✅ |
| `crypto` | HU-001, HU-019 | T-004 | ✅ |
| `juntas` | HU-004, HU-005, HU-014 | T-010, T-011, T-012 | ✅ |
| `turn-order` | HU-004, HU-006 | T-003, T-013, T-014 | ✅ |
| `payments` | HU-008, HU-015 | T-015 | ✅ |
| `sync` | HU-010, HU-015 | T-017 | ✅ |
| `junta-views` | HU-006, HU-008, HU-010, HU-019 | T-014, T-016, T-024 | ✅ |
| `notifications` | HU-001, HU-002, HU-011 | T-006, T-018 | ✅ |
| `scheduler` | HU-011 | T-019 | ✅ |
| `surveys` | Ninguna (solo HU-018, Should) | — (desde T-028; bloquea el lanzamiento) | ✅ Correcto para esta versión |
| PostgreSQL y operación | Las 11, en especial HU-019 | T-002, T-027 y las migraciones de cada tarea | ✅ |
| `proxy` | Las 11 (PRINCIPIO-005) | T-002 | ✅ |

### 3.4 Tareas → HU (trazabilidad backward)

| Tarea | HU relacionada (08) | Componente principal |
|---|---|---|
| T-001 | Infraestructura | Monolito modular (ADR-001): `pwa`, `api` y worker del `scheduler` |
| T-002 | Infraestructura | PostgreSQL y `proxy` |
| T-003 | HU-004, HU-006 | `turn-order` (submódulo `calendar`) y módulos compartidos `clock` y `format` |
| T-004 | HU-001, HU-019 (RN-202) | `crypto` |
| T-005 | Infraestructura | `api` |
| T-006 | HU-001, HU-002 | `notifications` |
| T-007 | HU-001 (y HU-002 para el vencimiento de la sesión) | `identity` y `api` |
| T-008 | HU-002 | `identity` y `api` |
| T-009 | HU-002, HU-011 | `identity` |
| T-010 | HU-004 | `juntas` |
| T-011 | HU-014 | `juntas` y `api` (guardián `requireJuntaRole`) |
| T-012 | HU-005 | `juntas` |
| T-013 | HU-006 | `turn-order` (submódulo `draw-engine`) |
| T-014 | HU-006 | `turn-order` (caso de uso `fixTurnOrder`) y `junta-views` (registro del sorteo) |
| T-015 | HU-008 | `payments` |
| T-016 | HU-010, HU-008 | `junta-views` |
| T-017 | HU-015, HU-010 | `sync` |
| T-018 | HU-011 | `notifications` |
| T-019 | HU-011 | `scheduler` (worker) y `notifications` |
| T-020 | HU-010, HU-015 | `pwa` (Service Worker e IndexedDB) |
| T-021 | HU-001, HU-002, HU-011, HU-015 (cerrar sesión con cambios sin enviar) | `pwa` |
| T-022 | HU-004, HU-014, HU-005 | `pwa` |
| T-023 | HU-006, HU-008, HU-010, HU-015 | `pwa` |
| T-024 | HU-010, HU-001, HU-019 (RN-202, RN-203) | `junta-views` y `api` |
| T-025 | HU-001, HU-002, HU-004, HU-014, HU-005, HU-006, HU-008, HU-015, HU-010, HU-011 (HU-019 no tiene pantallas) | `pwa` (con `api` y `scheduler`) |
| T-026 | Todas las HU Must (PRINCIPIO-010) | `api` |
| T-027 | HU-019 (RN-200, RN-201) | PostgreSQL (`staff_access_log`) y operación del servidor |

No hay tareas huérfanas: las 24 tareas con HU trazan a HU Must existentes, y T-001, T-002 y T-005 (infraestructura) habilitan componentes de 07 §2.1.

---

## 4. Verificaciones sin hallazgos

Se revisaron y no tienen defectos:

- **Valores numéricos,** iguales en 00, 02, 03, 06, 07 y 08: cuota de `1000` a `500000` céntimos y múltiplo de 10; de 2 a 50 participantes; N de 2 a 60; aviso de 1 a 7 días, 3 por defecto y 28 días para la frecuencia mensual; nombre de la junta de 3 a 60 caracteres y del usuario de 2 a 80; contraseña de 8 o más; bloqueo de 900 s tras 5 fallos; enlaces de 86,400 s y 3600 s; sesión de 2,592,000 s; código de 8 caracteres del alfabeto de 32; 10 códigos inválidos en 3600 s; recordatorios de 09:00:00 a 09:15:00, cada 2 días, máximo 5; reglas de hasta 2,000 caracteres; Argon2id con m = 19 MiB, t = 2, p = 1; 170 KB de JavaScript; LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms; cobertura ≥ 80 % y 100 %.
- **Fechas de los criterios de las tareas,** recalculadas: mensual desde el 31/01/2027 (28/02, 31/03, 30/04), bisiesto 29/02/2028, quincenal 16/12 y 31/12/2026, semanal 12/12/2026, cada 10 días 11/12/2026, `2026-12-01T03:30:00Z` = "30/11/2026 22:30", sesión abierta el 30/12/2026 09:59 y cerrada el 31/12/2026 10:01, y recordatorios de Pedro del 27/11 al 10/12/2026.
- **Datos de ejemplo:** el resultado del sorteo de la Junta Oficina da a Pedro el turno 2 y a Jorge el 4; el pozo de la Junta Familia es `360000` y el de la Junta Oficina `1000000`.
- **Constitución:** el stack respeta PRINCIPIO-009 (Next.js, TypeScript, PostgreSQL, versiones exactas), PRINCIPIO-005 (AES-256-GCM en la app, índice ciego, Argon2id, claves en `.env` fuera del repositorio), PRINCIPIO-008 (CSPRNG de 32 bytes, `fisher-yates-v1`, registro solo de inserción), PRINCIPIO-006 (proyección por rol con lista blanca y tests de contrato), PRINCIPIO-007 (solo correo y push) y PRINCIPIO-012 (las ADR con 🔒 tienen aprobación explícita).
- **Referencias del glosario:** RN-077 remite a la lista "Acción de gestión" de 04-glosario.md, que incluye todas las acciones que las HU protegen con `403`. RN-114 ("deje la junta") cubre también quitar a un participante, porque 04-glosario.md define "Dejar la junta" como salir o ser quitado.
- **Out-of-scope:** ningún criterio, contrato ni tarea toca NO-01 a NO-14. T-024 incluso agrega un test de esquema contra cuentas bancarias, tarjetas y credenciales de billetera.
- **Resumen de 08:** las sumas por prioridad, tipo, componente y tamaño cuadran, y el grafo Mermaid coincide con las dependencias declaradas.

---

## Decisiones del equipo

Tomadas el 14/11/2026 para resolver los 2 hallazgos críticos y los 12 mayores, con la autorización explícita del Product Owner para modificar el spec-pack (PRINCIPIO-012). Las redactó el Agente QA de backlog y quedaron marcadas como derivadas en 03-reglas-de-negocio.md §1.4, para que el Product Owner pueda revertirlas. `00-constitucion.md` no cambió. Las 12 sugerencias quedan abiertas.

Versiones resultantes: los 9 archivos de spec-pack/ quedaron en la versión 0.4, con estado "Revisado" (cabeceras unificadas el 14/11/2026).

| Hallazgo | Decisión | Archivo |
|---|---|---|
| C-01 · Herramientas de T-001 sin aprobar | Se aprueban ESLint con `eslint-config-next` (solo reglas del núcleo), `@vitest/coverage-v8`, gitleaks, `drizzle-kit`, `@axe-core/playwright`, `@lhci/cli`, y GitHub con GitHub Actions como alojamiento del repositorio (donde ya está) y del pipeline. Este último no recibe datos de producción ni el `.env`. Gherkin sin ejecutor (PREG-055): cada test se llama `Escenario: RN-NNN …` y marca `// Dado`, `// Cuando` y `// Entonces`, y un script sin dependencias lo verifica en el pipeline. Se quita el bloqueo de T-001 | 07-architecture.md §6.1 y §6.3; 02-alcance.md §6; 05-preguntas-abiertas.md (PREG-055); 08-backlog.md (T-001, "Cómo leer", "Bloqueos externos") |
| C-02 · Textos de los correos de cuenta | Se agregan a §2.9 el asunto y el cuerpo del correo de verificación ("Mi Junta: verifique su correo") y del de recuperación ("Mi Junta: recupere su contraseña"), con `{nombre}`, `{enlace}`, `{fecha}` y `{hora}`. Se quita el [REQUIERE DECISIÓN] de T-006, cuyo criterio ahora verifica el asunto y el vencimiento "hasta el 15/11/2026 a las 10:32" | 03-reglas-de-negocio.md §1.4 y §2.9; 07-architecture.md §2.2 (`notifications`); 08-backlog.md (T-006, "Bloqueos externos") |
| M-01 · Turno y pozo sin tarea (RN-036, RN-037) | `fixTurnOrder` asigna `pot_recipient_id` de la ronda k al participante en la posición k de `result`, y arma la entrada sin el organizador que no participa (RN-030). T-014 lo describe y lo prueba con una semilla inyectada | 07-architecture.md §2.2 (`turn-order`); 08-backlog.md (T-014) |
| M-02 · Criterios de completitud incompletos | Se agregan los casos que faltaban: `403` de Lucía en API-017 y API-018 (T-015, RN-051); salida antes del orden con `full` → `open`, "Este código no es válido." y `409` después del orden (T-012, RN-111, RN-113, RN-101, RN-116, RN-114); quitar en `full` → `open` y `409` después del orden (T-011); `ROUND1_DUE_DATE_PASSED` y Junta Ventas sin cuotas de Jorge (T-014, RN-122, RN-044); `null` en la ronda 10 (T-016, RN-119); `potCents` con 100 % de cobertura (T-003, RN-041); RN-025, RN-026 y RN-105 en T-016 y T-023 | 08-backlog.md (T-003, T-011, T-012, T-014, T-015, T-016, T-023) |
| M-03 · Desmarcar sin conexión sin probar | HU-015 suma un criterio [QA2] Positivo (desmarcar sin conexión a las 18:45, con `performed_at`) y uno [QA2] Negativo (choque entre dispositivos). §2.9 suma el `{motivo}` "el pago de {nombre} de la ronda {n} ya no estaba registrado". T-017, T-020 y T-023 prueban `correct_payment` | 06-user-stories.md (HU-015); 03-reglas-de-negocio.md §2.9; 07-architecture.md (API-021); 08-backlog.md (T-017, T-020, T-023) |
| M-04 · RN-101 sin criterio y organizador que deja de participar | Nueva RN-212 (MUST): al pasar a "No participo" en una junta "Abierta" o "Completa", se libera el cupo del organizador (PREG-056). HU-014 suma 3 criterios [QA2]: quitar en "Completa" → `open`, subir a 13 participantes → `open`, y Carmen en "No participo" → `open`, fuera de la lista de entrada y sin cuotas. API-010 y T-011 lo implementan | 03-reglas-de-negocio.md (§1.4, RN-212); 05-preguntas-abiertas.md (PREG-056); 06-user-stories.md (HU-014); 07-architecture.md (§2.2 `juntas`, API-010); 08-backlog.md (T-011, T-022) |
| M-05 · RN-117: bloqueo posterior o ventana deslizante | Vale el texto de RN-117 (PREG-057): el décimo código inválido de los últimos 3600 s bloquea durante 3600 s, guardado en `users.invite_blocked_until`, y los intentos durante el bloqueo no se validan ni se cuentan. RN-117 suma un ejemplo y HU-005 un criterio [QA2] Borde (décimo a las 10:59:00 → `429` a las 11:30, se une a las 11:59:00) | 03-reglas-de-negocio.md (RN-117); 05-preguntas-abiertas.md (PREG-057); 06-user-stories.md (HU-005); 07-architecture.md (§2.2, §3.1, §3.2, API-013); 08-backlog.md (T-012) |
| M-06 · API-026 contradictoria | `409 JOB_ALREADY_RUNNING` solo cuando hay otra corrida **en curso**; una corrida repetida después de terminar responde `202` con `already_sent`. T-019 prueba los dos casos | 07-architecture.md (API-026); 08-backlog.md (T-019) |
| M-07 · Dependencias invertidas u ocultas | El middleware de sesión y el vencimiento de 30 días pasan de T-008 a T-007; T-020 se prueba con un arnés (sesión por API y cambios en el outbox); T-022 depende de T-021. La ruta crítica pasa a 15 tareas (14.5 h a 29 h), ahora por T-020 → T-021 → T-022 → T-025, y se verificó con un script | 08-backlog.md (T-007, T-008, T-020, T-022, "Ruta crítica", Mermaid) |
| M-08 · Verificaciones de la constitución sin tarea | T-025 suma axe-core con `color-contrast` (≥ 4.5:1) y una medición de 44 × 44 px y de 16 px. Nueva T-026 (M): p95 ≤ 500 ms por ruta Must en el pipeline y duración por petición en el log. T-024 suma el test de tuteo (RN-090) y el de nombres `snake_case` ASCII (PRINCIPIO-002). Nueva T-027 (M): script de acceso a producción que escribe `staff_access_log` y configuración de SSH versionada, con escenarios de RN-200 y RN-201 | 07-architecture.md §6.1 y §6.4; 08-backlog.md (T-024, T-025, T-026, T-027, resumen: 27 tareas, de 22.5 h a 45 h) |
| M-09 · Sin terminación TLS | Nuevo componente `proxy` con Caddy y Let's Encrypt, en su propio contenedor y único con puertos expuestos (80 y 443): termina TLS ≥ 1.2, redirige a HTTPS y renueva el certificado. La app solo confía en `X-Forwarded-Proto` del `proxy` | 07-architecture.md (§1.2, §2.1, §4.1, ADR-001, §6.1, §6.3, §6.4, §8.2); 02-alcance.md §6; 08-backlog.md (T-002, T-005, "Bloqueos externos") |
| M-10 · Trazabilidad de 07 contradictoria | Índice §4.2: API-010 a API-012 → HU-014 y API-021 → HU-015, HU-009. Títulos §4.4 y §4.6 con HU-014 y HU-015. §8.1: `notifications` en HU-002, y `pwa` y `api` en HU-011. §2.1 y §8.2: la misma lista de HU para `notifications`, y `api` en HU-001 a HU-018. T-021 traza también a HU-015 | 07-architecture.md (§2.1, §4.2, §4.4, §4.6, §8.1, §8.2); 08-backlog.md (T-021, cobertura de HU-015) |
| M-11 · Prioridades que no coinciden | RN-142 pasa de MUST a SHOULD, sin cambiar su significado, porque solo aplica con el push (F-07). RN-204 sale de las "Reglas relacionadas" de HU-004 (sigue en HU-018), y `survey_pending` de API-009 queda marcado Should | 03-reglas-de-negocio.md (§1.4, RN-142); 06-user-stories.md (HU-004); 07-architecture.md (§2.2, API-009); 08-backlog.md ("Pendiente", HU-012 y HU-018) |
| M-12 · F-18 fuera del plan de lanzamiento | F-18 sigue siendo Should, pero el MVP no sale al mercado sin ella. Se agrega como bloqueo del lanzamiento en 08 | 02-alcance.md §3; 08-backlog.md ("Bloqueos externos", "Pendiente") |
| Cierre · Mayores sin documentar en 05 | Cada hallazgo mayor tiene su PREG resuelta: M-04 y M-05 en PREG-056 y PREG-057, y los otros 10 en PREG-058 a PREG-067. 05 tiene además una tabla que relaciona cada hallazgo con su PREG | 05-preguntas-abiertas.md (PREG-058 a PREG-068) |
| Cierre · RN-200 a RN-203 sin HU | Nueva HU-019 (Must, F-01 y F-04): "Proteger mis datos frente al equipo y a usos no consentidos", con 6 criterios [QA2] que son escenarios técnicos (PREG-068). T-004, T-024 y T-027 trazan a ella | 06-user-stories.md (HU-019, resumen, INVEST, cobertura); 07-architecture.md §8.1 y §8.2; 08-backlog.md (cobertura, T-004, T-024, T-027) |
| Cierre · RN Must sin componente en 07 | 07 §2.2 cita ahora RN-025, RN-026, RN-041 y RN-203 (`junta-views`), RN-088 (`pwa`), RN-040 (`juntas`) y RN-202 (`crypto`), y tiene las subsecciones nuevas `proxy` y "PostgreSQL y operación" (RN-035, RN-200, RN-201). §2.1 corrige "gestor de secretos" por variables de entorno (PREG-050, PRINCIPIO-005) | 07-architecture.md §2.1 y §2.2 |

**Comprobación después de los cambios** (con los mismos scripts de la auditoría):
- Las 162 RN Must de 03 v0.4 (sale RN-142 y entra RN-212) tienen al menos una HU Must, un componente o contrato en 07 y una tarea en 08 (sección 3.2, sin huecos).
- Ninguna HU Must lista una RN sin criterio. Solo queda RN-188 en HU-003, que es Should y corresponde a la sugerencia S-01.
- La ruta crítica recalculada coincide con la declarada en 08 (15 tareas, 29 h en el máximo), y ninguna dependencia apunta a una tarea con número mayor.

## Verificación de cierre

| Criterio | Resultado | Evidencia |
|---|---|---|
| Todos los hallazgos críticos resueltos (cero abiertos) | ✅ 0 abiertos | C-01: herramientas aprobadas en 07 §6.3 y convención Gherkin en PREG-055; T-001 sin bloqueos. C-02: textos en 03 §2.9; T-006 sin [REQUIERE DECISIÓN]. "Bloqueos externos" de 08 no bloquea ninguna tarea del agente |
| Hallazgos mayores documentados en 05 | ✅ 12 de 12 | Tabla de hallazgos y PREG al inicio de 05; M-04 → PREG-056, M-05 → PREG-057, y M-01 a M-03 y M-06 a M-12 → PREG-058 a PREG-067, todas "Resuelta" |
| Matriz de trazabilidad completa | ✅ | Sección 3: 11 HU Must (3.1), 162 RN Must sin celdas vacías (3.2), 14 componentes (3.3) y 27 tareas sin huérfanas (3.4) |
| El stack de 07 respeta la constitución | ✅ | PRINCIPIO-009: Next.js, TypeScript y PostgreSQL con versiones exactas. PRINCIPIO-005: AES-256-GCM en la app, claves en `.env` (§2.1 corregida), Argon2id, TLS ≥ 1.2 en el `proxy`. PRINCIPIO-004: sin pasarelas. PRINCIPIO-007: solo correo y push. PRINCIPIO-008: `node:crypto` y `fisher-yates-v1`. PRINCIPIO-012 e y h: cada dependencia y servicio que nombran las tareas está aprobado en §6.3, y el cron del worker es el del sistema operativo, no una dependencia nueva |
| Todas las reglas Must tienen HU, componente y tareas | ✅ 162 de 162 | Sección 3.2. RN-200 a RN-203 quedan cubiertas por HU-019 (PREG-068) |

Siguen abiertas las 12 sugerencias (S-01 a S-12), que no bloquean la implementación.
