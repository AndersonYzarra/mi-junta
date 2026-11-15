# Auditoría Spec Finalizer del Spec Pack de Mi Junta

Versión: 1.0
Fecha: 15/11/2026
Estado: Borrador. Lo redactó el Agente Spec Finalizer (prompts/clase3/05-spec-finalizer.xml). Falta la revisión del Product Owner.

Fuente: los 11 archivos de `spec-pack/`, leídos completos: 00-constitucion.md v0.4, 01-project-brief.md v0.4, 02-alcance.md v0.4, 03-reglas-de-negocio.md v0.4, 04-glosario.md v0.4, 05-preguntas-abiertas.md v0.4, 06-user-stories.md v0.4, 07-architecture.md v0.4, 08-backlog.md v0.5, 09-ui-spec.md v1.1 y 10-validation-log.md v1.1. Esta auditoría no modificó ningún archivo de `spec-pack/` (PRINCIPIO-012 b).

**Cómo leer este reporte:**
- Cada hallazgo tiene un ID `SF-NN` y una severidad:
  - **Bloqueante:** un agente de IA no puede terminar una tarea o HU Must sin inventar un valor o un texto (PRINCIPIO-012 a).
  - **Alta:** el agente puede avanzar, pero lo más probable es que implemente algo incorrecto o inseguro.
  - **Media:** genera ambigüedad, retrabajo o una verificación incompleta.
  - **Baja:** inconsistencia de forma que no cambia el comportamiento.
- Cada hallazgo dice qué falta, dónde está el problema y dónde debería ir la corrección. Una corrección que cambia el sorteo, el cálculo de cuotas, el cifrado, la autenticación o los permisos queda marcada **[REQUIERE DECISIÓN]** (PRINCIPIO-012).
- Los conteos marcados "verificado" se obtuvieron con scripts sobre los archivos, no por lectura.

---

## Resumen ejecutivo

**Veredicto: listo con condiciones.** Un agente de IA puede empezar hoy la infraestructura, el dominio y la API del MVP (T-001 a T-017 y T-019 a T-027). **El MVP completo todavía no se puede implementar ni lanzar**: hay 3 bloqueantes y 4 hallazgos de severidad alta.

La base es sólida. La trazabilidad de reglas está completa y verificada, los criterios de aceptación usan valores concretos con los mismos datos de ejemplo, el algoritmo del sorteo trae un vector de prueba que se reprodujo de forma independiente, y el backlog no tiene ciclos. Los problemas están en los bordes del pipeline: textos que nadie aprobó, preguntas que se citan pero no se registraron, la UI Spec que el backlog no usa y un hueco de seguridad al cerrar sesión sin conexión.

### Puntaje (sección 9)

| Criterio | Puntaje | En una línea |
|---|---|---|
| Operatividad | **3 / 5** | Los módulos de dominio y la API se implementan sin preguntar. HU-011 y el lanzamiento del MVP están bloqueados por textos y decisiones pendientes |
| Utilidad | **4 / 5** | Criterios con valores exactos, datos de ejemplo únicos, vector de prueba y contratos con ejemplos. Falta descomponer HU-018, que el MVP necesita para salir al mercado |
| Orden | **4 / 5** | IDs sin huecos ni duplicados en RN, HU, P, T, API y ADR. Hay 9 PREG citadas que no existen y el backlog no cita las pantallas |
| **Promedio** | **3.7 / 5** | |

### Qué corregir antes de implementar el MVP

| ID | Severidad | Problema | Dónde se corrige |
|---|---|---|---|
| SF-01 | Bloqueante | El cuerpo del correo de recordatorio (RN-144, HU-011 Must) no tiene texto en 03 §2.9. T-018 no se puede terminar sin inventarlo, y 08 no la lista como bloqueada | 03 §2.9 (decisión del PO, PREG-075 propuesta) y tabla "Bloqueos externos" de 08 |
| SF-02 | Bloqueante | PREG-069 a PREG-077 se citan en 08, 09 y 10, pero 05 termina en PREG-068 | 05-preguntas-abiertas.md |
| SF-03 | Bloqueante (lanzamiento) | HU-018 bloquea el lanzamiento, pero no tiene tareas, su revisión QA está pendiente y PREG-071 sigue abierta | 05 (PREG-071), 06 (Revisión QA de HU-018) y 08 (descomponer HU-018 primero) |
| SF-04 | Alta (seguridad) | "Cerrar sesión" sin conexión borra el dispositivo, pero deja vigente la cookie de sesión. En un dispositivo compartido, la siguiente persona entra con la cuenta anterior apenas vuelva la red | 09 P-017, 07 §2.2 y API-005, 06 HU-015 y 08 T-021 **[REQUIERE DECISIÓN]** |
| SF-05 | Alta | RN-009 compara con la fecha de creación, pero su mensaje y el código `ROUND1_BEFORE_TODAY` de API-009 dicen "hoy". En la edición (T-011) las dos lecturas dan resultados distintos | 03 RN-009 y §2.9, 07 API-009 y API-010, 08 T-011 (PREG-073 propuesta) |
| SF-06 | Alta | 08 exige que cada texto salga de 03 §2.9 o se marque [REQUIERE DECISIÓN]. 09 adopta unos 100 textos [TEXTO UI] sin aprobar. El agente no sabe cuál de los dos documentos manda | Sección "Cómo leer" de 08, o pasar los textos de 09 §6 a 03 §2.9 |
| SF-07 | Alta | El backlog no cita 09 ni sus pantallas. Ninguna tarea construye el marco de la app, la navegación ni los tokens de diseño, y P-016 no tiene tarea propia | 08: campo "Pantallas" en T-020 a T-025 y una tarea nueva para la base de UI |

---

## 1. Trazabilidad completa

### 1.1 Regla → HU (verificado)

| Comprobación | Resultado |
|---|---|
| RN definidas en 03 | 212 (RN-001 a RN-212), sin huecos ni duplicados: 162 MUST y 50 SHOULD |
| RN con al menos una HU ("Reglas de negocio relacionadas" de 06) | **212 de 212** ✅ |
| RN citadas en al menos un criterio Dado/Cuando/Entonces de 06 | **212 de 212** ✅. Cumple PRINCIPIO-011 a nivel de especificación |
| RN MUST que solo aparecen en HU Should | 0 ✅ |
| RN SHOULD que aparecen en HU Must | 0 ✅ (PREG-066 se aplicó bien) |
| RN listadas en una HU sin que ningún criterio de esa HU las cite | 1: RN-188 en HU-003, que solo aparece en una nota. **SF-22** (Baja) |
| RN MUST citadas en al menos una tarea de 08 (con rangos "RN-002 a RN-012") | **162 de 162** ✅ |

**Funcionalidades:** F-01 a F-11 y F-16 a F-18 tienen HU (06 "Cobertura"). F-12 a F-15 (Could) no tienen RN ni HU, y está justificado: escribirlas obligaría a inventar valores (PRINCIPIO-012 a). Ninguna HU, pantalla ni tarea toca NO-01 a NO-14.

### 1.2 HU → pantalla

09 §1.2 se comparó con las 19 HU de 06:

| Resultado | HU |
|---|---|
| Con pantalla | Las 18 HU con interacción del usuario |
| Sin pantalla, justificado | HU-019: sus criterios son escenarios técnicos (PREG-055, PREG-068) |
| Pantalla mínima, justificada | HU-011 y HU-016: el recordatorio y el aviso son correos. Solo P-017 maneja la preferencia |

Las 24 pantallas trazan a al menos una HU ✅. No hay pantallas Could.

### 1.3 Pantalla → tarea del backlog

08 no tiene un campo de pantalla. Solo T-029 nombra pantallas de 09 (P-002, P-006, P-007 y P-010). La relación de esta tabla se reconstruyó leyendo la descripción de cada tarea:

| Pantalla | Tareas | Cobertura | Qué falta |
|---|---|---|---|
| P-001 Crear cuenta | T-021, T-028 | ✅ | — |
| P-002 Verificar correo | T-021, T-029 | ✅ | — |
| P-003 Iniciar sesión | T-021, T-030 | ✅ | — |
| P-004 Recuperar contraseña | T-021 | ✅ | — |
| P-005 Nueva contraseña | T-021 | ✅ | — |
| P-006 Política de privacidad | T-021 | ⚠️ Parcial | El modo lectura y el pie "Usted aceptó la versión…" no aparecen en ningún criterio |
| P-007 Mis juntas | T-022, T-029 | ⚠️ Parcial | Los datos de cada tarjeta no salen de API-022 (SF-08) |
| P-008 Crear junta | T-022 | ✅ | El pozo calculado en el cliente (RN-041) no tiene criterio |
| P-009 Unirse | T-022 | ✅ | — |
| P-010 Vista del participante | T-023, T-022 (salir), T-029 | ✅ | — |
| P-011 Vista del organizador | T-022, T-023 | ✅ | "Copiar código" y el diálogo del sorteo no tienen criterio |
| P-012 Editar junta | T-022 | ⚠️ Parcial | El aviso no bloqueante de RN-122 (09 v1.1) no está en ningún criterio |
| P-013 Registro del sorteo | T-023 | ✅ | — |
| P-014 Pagos | T-023 | ✅ | — |
| P-015 Detalle de la cuota | T-023 | ⚠️ Parcial | El historial (RN-058, RN-120) no está en el criterio de T-023 |
| P-016 Cambios sin enviar | T-020 (contador), T-023 (mensaje de rechazo) | ⚠️ Parcial | Ninguna tarea construye la pantalla: "Por enviar", "Enviar ahora" ni "Entendido" |
| P-017 Mi cuenta | T-021 | ⚠️ Parcial | Solo la preferencia por correo y "Cerrar sesión". Faltan los datos de la cuenta y la versión de la política |
| P-018 a P-024 (Should) | — | ⏳ Próxima versión, desde T-031 | **P-024 bloquea el lanzamiento** (SF-03) |
| C-01 a C-10, tokens (09 §4) y navegación (09 §5) | — | ❌ Sin tarea | **SF-07** |

---

## 2. Consistencia de IDs

### 2.1 Familias de IDs (verificado)

| Familia | Definidos | Huecos o duplicados | Citados y no definidos |
|---|---|---|---|
| `PRINCIPIO-NNN` | 001 a 012 | No | — |
| `RN-NNN` | 001 a 212 | No | RN-213 en 03 §3, 08 T-028 y 10. Se cita como propuesta y es el siguiente ID libre ✅ |
| `HU-NNN` | 001 a 019 | No | — |
| `P-NNN` | 001 a 024 | No | — |
| `T-NNN` | 001 a 030 | No | T-031 en 08 y 10, como "desde T-031". Es una reserva, no un ID |
| `PREG-NNN` | 001 a 068 | No | **PREG-069 a PREG-077** (SF-02) |
| `API-NNN` | 001 a 035 | No | — |
| `ADR-NNN` | 001 a 009 | No | — |
| `F-NN`, `NO-NN`, `S-NN`, `R-NN`, `KPI-NN` | F-01 a F-18, NO-01 a NO-14, S-01 a S-15, R-01 a R-15, KPI-01 a KPI-06 | No | — |
| `UF-NN`, `C-NN` (09) | UF-01 a UF-15, C-01 a C-10 | No | Ver SF-25 |

Las RN de 03 no aparecen en orden numérico, porque se agrupan por categoría. Eso no viola PRINCIPIO-001, pero obliga a buscar cada ID en vez de recorrer el archivo.

### 2.2 Hallazgos

- **SF-02 (Bloqueante): preguntas citadas que no existen en 05.**
  - 09 §7.1 usa PREG-069 a PREG-072.
  - 10 propone PREG-073 a PREG-077.
  - 08 T-028 depende de PREG-076.
  - 05 termina en PREG-068.
  - Así, un agente no puede comprobar el estado de una pregunta que bloquea su tarea, y la numeración de 10 vale solo si 05 registra antes las de 09 (lo dice 10 §2).
  - **Corrección:** registrar en 05 v0.5, en este orden, PREG-069 a PREG-072 (las de 09 §7.1) y PREG-073 a PREG-077 (las de 10 §2), cada una con su estado: "Propuesta" para PREG-069, 070 y 072 (ver SF-09) y "Abierta" para las demás.
- **SF-25 (Baja): un mismo prefijo con dos significados.** `C-01` y `C-02` son hallazgos de auditorias/qa-clase2.md en 02 §6, 03 §1.4, 05 y 07 §6.3. En 08 T-028 y en 09, `C-01` a `C-10` son componentes de la UI. Por ejemplo, 07 §6.3 dice "(C-01)" por un hallazgo, y 08 T-028 dice "(C-05)" por el campo de formulario. **Corrección:** citar los hallazgos con su archivo ("qa-clase2 C-01") en 02, 03, 05 y 07.
- **SF-23 (Baja):** PRINCIPIO-001 protege de la renumeración solo a PRINCIPIO, RN, HU, P, T, PREG, F, NO, S, R y KPI. Las familias API-NNN, ADR-NNN, UF-NN, C-NN y D-N se protegen por su cuenta en 07 §6.1 y 09 "Cómo leer", no por la constitución. **Corrección:** proponer el cambio a PRINCIPIO-001, que requiere aprobación humana (PRINCIPIO-012).
- **Versiones:** cada archivo cita como fuente la versión vigente de los demás, salvo 10, que cita 08 v0.4 aunque ya existe la v0.5. Esto es correcto, porque 10 la cita como el estado de partida.

---

## 3. Cobertura de la constitución

| Principio | Estado | Evidencia y hallazgos |
|---|---|---|
| PRINCIPIO-001 Fuente de verdad, formato e IDs | ✅ con observaciones | Los 11 archivos empiezan con `#` y `Versión:`. Las 212 reglas tienen exactamente un DEBE / NO DEBE / PUEDE (verificado). Ninguna de las palabras "rápido", "seguro", "fácil", "adecuado", "razonable" o "intuitivo" aparece fuera de la constitución (verificado). Los diagramas están en Mermaid. Ver SF-02, SF-23 y SF-25 |
| PRINCIPIO-002 Idioma | ✅ | Identificadores en inglés, salvo `junta`. El único tuteo en textos entre comillas es el contraejemplo de RN-090 (verificado). T-024 lo prueba |
| PRINCIPIO-003 Formatos de Perú | ✅ | Céntimos enteros, `date` y `timestamptz`, America/Lima y los patrones de DNI y celular. 03 usa ISO 8601 en sus fechas y lo declara en "Cómo leer" |
| PRINCIPIO-004 No mueve dinero | ✅ | Sin campos ni dependencias de pago. T-024 tiene un test de esquema |
| PRINCIPIO-005 Cifrado y credenciales | ⚠️ | ADR-005, ADR-006, T-004, T-027 y gitleaks lo cubren. **SF-04:** la sesión del servidor sigue vigente después de cerrar sesión sin conexión |
| PRINCIPIO-006 Datos según el rol | ✅ con SF-04 | ADR-009, las listas blancas por rol y los tests de contrato de T-024 lo cubren. Ninguna pantalla muestra datos personales de otros. SF-04 abre una forma de saltarse PRINCIPIO-006 en un dispositivo compartido |
| PRINCIPIO-007 Consentimiento y canales | ✅ | Una sola casilla, desmarcada, con versión y fecha y hora. Solo correo y push |
| PRINCIPIO-008 Sorteo auditable | ✅ | El vector del anexo A se reprodujo de forma independiente con Node.js y dio `["p05","p07","p02","p01","p08","p03","p09","p10","p04","p06"]`, el resultado esperado. Tablas solo de inserción con trigger y sin privilegios (ADR-003) |
| PRINCIPIO-009 Next.js y sin conexión | ⚠️ | ADR-002, T-017 y T-020 lo cubren. Ver SF-04, que nace en el modo sin conexión |
| PRINCIPIO-010 Responsive, accesible, rendimiento | ⚠️ | Los 13 contrastes de 09 §4.1 se recalcularon y coinciden. **SF-12:** T-025 revisa el scroll solo a 360 y 1440 px. La validación de los prototipos en un navegador sigue pendiente (10, fila 18) |
| PRINCIPIO-011 Tests | ✅ | Hay un escenario por RN en 06 (verificado), con la convención de PREG-055 y el script de T-001 |
| PRINCIPIO-012 Límites de los agentes | ⚠️ | **SF-09:** el Agente UI Designer marcó PREG-069, 070 y 072 como "Resuelta". Los demás cambios hechos por agentes citan la autorización del usuario o del PO |

---

## 4. Glosario

04 define bien el dominio. Términos como junta, cupo, ronda, ronda actual, turno, pozo, cuota, pago vigente o corrección tienen identificador en código y una lista "No usar". Una búsqueda de los términos "No usar" en 06, 07, 08 y 09 solo encontró usos técnicos ("perfil móvil", "lado del cliente", "alertas de caída") o el mismo listado de términos prohibidos de 09 C-06. No hay violaciones.

**SF-10 (Media): identificadores que no coinciden con 07.** Un agente que siga 04 ("Identificador en código") usará nombres que 07 no tiene:

| Término en 04 | Identificador en 04 | Lo que usa 07 |
|---|---|---|
| Cambio sin enviar | `pending_change` | outbox en IndexedDB, tabla `client_changes`, `client_change_id` |
| Estado de la junta | `junta_status` | columna `juntas.status` |
| Participante eliminado | `deleted_participant` | `users.deleted_at` y el nombre literal "Participante eliminado" |

**Corrección:** que 04 adopte los nombres de 07, o al revés. Lo decide el PO, porque 04 es la referencia de nombres de PRINCIPIO-002.

**Términos sin definir en 04** (se cuentan las apariciones fuera de 04):

| Término | Usos | Tipo | Dónde se usa |
|---|---|---|---|
| Líder técnico | 41 | Rol del dominio de seguridad | PRINCIPIO-005, RN-200 a RN-202, HU-019 |
| Incidente | 26 | Dominio de seguridad. No se define qué cuenta como incidente ni su formato (`INC-001` es un dato de prueba) | RN-200, RN-201, T-027 |
| Outbox / cola de cambios | 47 | Técnico, central para HU-015 | 07, 08, 09 |
| Snapshot | 45 | Técnico, central para HU-010 | 07, 08, 09 |
| Ola de la encuesta (`wave`: `initial`, `three_months`) | 7 | Dominio de F-18 | 07 API-034 |
| Estados de envío de un recordatorio (`accepted`, `failed`, `expired`) | 11 | Dominio de notificaciones: define cuándo cuenta para RN-071 | 07 §3.2, T-019 |
| Índice ciego | 9 | Técnico de seguridad | 07, T-004 |
| Suscripción push | — | Dominio de F-07 (tabla `push_subscriptions`) | 07 |
| Versión vigente de la política | — | Dominio de RN-168 (`is_current`) | 03, 07 |
| PWA, Service Worker, app shell, IndexedDB, worker, job, `proxy`, ETag, `Idempotency-Key`, EARS, Gherkin y "Escenario" | Muchos | Técnicos | 03, 07, 08, 09 |

**Corrección:** agregar a 04 los términos del dominio (líder técnico, incidente, ola, estados de envío, suscripción push y versión vigente) y una sección "Términos técnicos" con los demás, cada uno con su identificador en código.

---

## 5. Preguntas abiertas

| Grupo | Preguntas | ¿Bloquea la implementación? |
|---|---|---|
| Abiertas a propósito en 05 | PREG-011 (plan VIP), PREG-014 (WhatsApp), PREG-022 (competidores) | No: quedan después del lanzamiento o fuera del alcance (NO-02, NO-03) |
| Abierta en 09 §7.1, no registrada en 05 | PREG-071 (rango y obligatoriedad de las respuestas de la encuesta) | **Sí, el lanzamiento:** HU-018 bloquea el MVP (02 §3, 08 "Bloqueos externos") |
| Propuestas en 10 §2, no registradas en 05 | PREG-075 (cuerpo del recordatorio y textos de RN-144 y RN-196) | **Sí: T-018 y HU-011 (Must)**. SF-01 |
| | PREG-073 (RN-009 en la edición) | **Sí, en parte: T-011** (Must). SF-05 |
| | PREG-076 (formato del correo y RN-213) | Sí: T-028 (Must, ya marcada como bloqueada) |
| | PREG-074 (textos de RN-139 y RN-194) | No en el MVP: HU-009 es Should |
| | PREG-077 (RN del código equivocado al iniciar sesión) | No en el MVP: HU-003 es Should |
| "Resueltas" en 09 por un agente | PREG-069, PREG-070, PREG-072 | No bloquean, pero no rigen todavía (SF-09) |
| Entregables legales | Texto de la política (PREG-001) y confirmación de las decisiones provisionales | No bloquean el desarrollo. Bloquean el lanzamiento de F-01 (02 §5) |
| Textos pendientes de 09 §6 | Rol en una junta "Terminada", vigencia del enlace en P-002, error al cargar datos y aviso de cambios de otra cuenta | Sí: T-029 y T-030, ya marcadas como bloqueadas en 08 |

- **SF-01 (Bloqueante): el recordatorio no tiene cuerpo.**
  - 03 §2.9 no tiene el texto del recordatorio, porque RN-144 solo lista sus datos.
  - El asunto existe solo como ejemplo de RN-144 y en el criterio de T-018.
  - T-018 pide "agregar la plantilla", así que el agente tendría que redactar el cuerpo (PRINCIPIO-012 a).
  - 08 "Bloqueos externos" dice que "solo T-028, T-029 y T-030 quedan bloqueadas", así que **omite T-018**.
  - Lo mismo pasa con el aviso de cuotas vencidas (RN-196, Should), que solo tiene el texto de su ejemplo.
  - **Corrección:** que el PO decida PREG-075. Después, agregar a 03 §2.9 las filas "RN-144 · Recordatorio: asunto" y "RN-144 · Recordatorio: cuerpo", y una para RN-196, y sumar T-018 a la tabla de bloqueos de 08.
- **SF-09 (Media): 09 marca preguntas como resueltas sin el PO.** 09 §7.1 marca PREG-069, 070 y 072 como "Resuelta por el Agente UI Designer". 05 dice que la respuesta de un agente queda "Propuesta" y no rige hasta que la apruebe el PO. **Corrección:** registrarlas en 05 con "Estado: Propuesta" y cambiar 09 §7.1 a "Propuesta".

---

## 6. Calidad del documento de arquitectura (07)

### 6.1 Las 6 secciones

| Sección | Estado | Observación |
|---|---|---|
| 1. Overview | ✅ Completa | Descripción, diagrama Mermaid con todos los componentes y los principios de diseño D-1 a D-8 |
| 2. Componentes | ✅ Completa | 14 componentes con responsabilidad, tecnología y HU, y el detalle de cada uno |
| 3. Modelo de datos | ✅ Completa | Diagrama ER de 24 tablas (verificado), atributos, invariantes, reglas de cálculo y notas de seguridad |
| 4. API Contracts | ✅ con huecos | 35 contratos con request, response y tabla de errores con RN y mensaje. Ver SF-08, SF-15, SF-16 y SF-18 |
| 5. ADRs | ✅ Completa | 9 ADR con contexto, decisión, alternativas y consecuencias, todas aceptadas. Las 4 marcadas 🔒 tienen la aprobación explícita que exige PRINCIPIO-012 |
| 6. Restricciones técnicas | ✅ Completa | Cómo se cumple cada principio, contexto peruano, dependencias aprobadas y operación del servidor |

Las secciones 7 (temas abiertos) y 8 (trazabilidad HU → componentes → contratos) son extra y están al día. §8.1 coincide con 06 y con 09 §1.2.

### 6.2 Coherencia de las ADR

Las 9 ADR son coherentes entre sí y con la constitución:
- ADR-001 (monolito) permite las transacciones únicas que piden ADR-004 (sorteo) y ADR-003 (hechos solo de inserción).
- ADR-002 (snapshot y outbox) depende de ADR-009 (proyección por rol) para no guardar datos personales en el dispositivo.
- ADR-007 (job diario) es coherente con RN-066, RN-141 y R-15.

Hay una sola contradicción:
- **SF-17 (Baja):** las consecuencias de ADR-002 dicen "La protección de los datos en el dispositivo sigue abierta (PREG-008)", pero PREG-008 está resuelta (05) y la misma 07 §3.5 lo dice. **Corrección:** quitar esa frase de ADR-002.

### 6.3 Hallazgos en los contratos

- **SF-04 (Alta, seguridad): la sesión queda vigente después de cerrar sesión sin conexión.**
  - 09 P-017 dice que, sin conexión, "Cerrar sesión" funciona y borra los datos del dispositivo, y que "la sesión del servidor vence sola a los 30 días sin peticiones".
  - La cookie `session` es `HttpOnly` (ADR-006), así que la app no la puede borrar. API-005 no se llama sin red.
  - Resultado: en una computadora compartida, la siguiente persona abre la app con conexión y el navegador envía la cookie anterior. Entra a las juntas de la otra cuenta, que el servidor sigue considerando válidas.
  - HU-015 solo prueba el caso en modo "Offline" (RN-197) y no este.
  - **Corrección [REQUIERE DECISIÓN], porque toca la autenticación:** elegir entre (a) mostrar "Cerrar sesión" sin conexión como C-04 con el mensaje de RN-170, o (b) guardar un indicador de "cierre pendiente" y llamar a API-005 antes de cualquier otra petición al volver la red. Agregar un criterio a HU-015 y a T-021.
- **SF-05 (Alta): RN-009 tiene dos lecturas.**
  - El texto de RN-009 compara la ronda 1 con la **fecha de creación** de la junta.
  - El mensaje de 03 §2.9 dice "no puede ser anterior a **hoy**".
  - API-009 usa el código `ROUND1_BEFORE_TODAY` ("Ronda 1 antes de hoy").
  - 09 P-012 permite guardar, al editar, una fecha entre la creación y hoy.
  - Al crear, las dos lecturas coinciden. Al editar (API-010, T-011, "mismas validaciones de API-009"), un agente puede implementar cualquiera de las dos.
  - **Corrección:** que el PO decida PREG-073, que se alineen el código y el mensaje de API-009 y API-010, y que T-011 sume el caso "la ronda 1 entre `created_on` y hoy".
- **SF-08 (Media): API-022 no trae los datos de las tarjetas de P-007.**
  - API-022 devuelve `id`, `name`, `status`, `role`, `is_participant`, `turn_number` y `current_round`.
  - La tarjeta de P-007 también muestra "{ocupados} de {total} cupos" y "Su cuota: [estado]" de la ronda actual.
  - Esos datos solo se pueden reconstruir desde API-025.
  - **Corrección:** agregar a API-022 `occupied_slots`, `participant_count` y `current_round_status` (de la cuota propia) y probarlos en T-016 o T-022.
- **SF-15 (Baja, Should): falta una ruta para pedir el código de desactivación.** P-021 tiene el botón "Enviar código" para desactivar el segundo factor. API-030 no tiene una ruta para eso: `POST /two-factor/verification-codes` exige el `challenge_id` del inicio de sesión. **Corrección:** agregar la ruta a API-030 al descomponer HU-003.
- **SF-16 (Baja):** el ejemplo de `GET /me` (API-008) no trae `overdue_notices_enabled` ni `push_enabled`, que P-017 necesita para mostrar el estado de cada interruptor. Solo están en la respuesta de API-032.
- **SF-18 (Baja): códigos de estado incompletos.** La lista de §4.1 no incluye `404`, que usan API-016 y API-035. El `403` de quien no es miembro (RN-024) no tiene `code`, a diferencia de `NOT_ORGANIZER`, y T-011, T-016 y T-024 lo prueban sin un código fijo. **Corrección:** agregar `404` y un código como `NOT_A_MEMBER` en §4.1.
- **SF-19 (Baja):** en el diagrama ER, `phone_blind_index` no lleva `UK`, pero §3.2 y §3.5 dicen `UNIQUE` (RN-180).
- **SF-20 (Baja): ejemplos que se contradicen.**
  - En API-017, `p_1001` tiene `paid_on = 2026-11-28`, y en el historial de API-020 tiene `2026-11-25`.
  - El wireframe de P-007 muestra la Junta Familia (de Carmen) junto a las juntas de Jorge, que según los datos de ejemplo de 03 no es miembro de ella.
  - Los escenarios Gherkin que copien estos ejemplos heredan la contradicción (PRINCIPIO-011).

---

## 7. Calidad del backlog (08)

| Criterio | Resultado |
|---|---|
| Campos obligatorios | Las 30 tareas tienen HU, componente, prioridad, tamaño, dependencias, descripción y criterio de completitud (verificado) ✅ |
| Estimación | Todas tienen tamaño: 18 L y 12 M, de 24 h a 48 h. Los conteos del resumen coinciden con las tareas (verificado) ✅ |
| Prioridad | Las 30 son Must ✅. T-028, T-029 y T-030 son Must pero están bloqueadas, así que hoy se pueden empezar 27, o 26 por SF-01 |
| Dependencias | Ninguna tarea depende de una de número mayor o igual (verificado). El grafo no tiene ciclos y el diagrama coincide con los campos ✅ |
| Criterios verificables | Todos tienen valores concretos y casos de los datos de ejemplo ✅ |
| Atomicidad | ⚠️ Ver SF-13 |
| Cobertura de pantallas | ❌ Ver SF-07 |
| Bloqueos declarados | ⚠️ Faltan T-018 (SF-01) y T-011 (SF-05) |

- **SF-07 (Alta): el backlog no usa la UI Spec.**
  - T-020 a T-023 se escribieron en 08 v0.4, antes de que existiera 09, y no citan ninguna pantalla ni componente.
  - Un agente que implemente T-021 a T-023 solo con 08 no tiene por qué leer los wireframes, los estados ni los tokens de 09.
  - Ninguna tarea construye la base común: C-01 (marco, encabezado y barra inferior), C-04, C-05, C-06, C-07, C-08 y C-10, los tokens de 09 §4 y las reglas de navegación de 09 §5.3.
  - **Corrección:**
    - (a) agregar a T-020 a T-025 el campo "Pantallas: P-NNN, C-NN (09-ui-spec.md)" y la frase "según los estados y el wireframe de 09";
    - (b) crear una tarea "Base de UI: tokens de 09 §4 y componentes C-01 a C-10", con el siguiente ID libre, de la que dependan T-021 a T-023, y actualizar la frase "desde T-031";
    - (c) agregar a T-023 la pantalla P-016 con "Enviar ahora" y "Entendido", y el historial de P-015.
- **SF-13 (Media): tareas L demasiado grandes.**
  - T-007 junta 5 migraciones, el middleware de sesión, 3 endpoints y un guardián.
  - T-021 junta 7 pantallas y el cierre de sesión. T-022 junta 6 pantallas y T-023 junta 5 pantallas más el modo sin conexión.
  - Es probable que superen las 2 horas que promete 08.
  - **Corrección:** dividirlas por pantalla o por endpoint, con IDs nuevos y sin renumerar los existentes.
- **SF-12 (Media):** T-025 revisa el scroll horizontal "a 360 px y a 1440 px", y T-023 solo a 360 px. 09 §4.7 y 10 (fila 18) piden 360, 768, 1024 y 1440 px. **Corrección:** agregar 768 y 1024 px a T-025.
- **SF-03 (Bloqueante del lanzamiento): HU-018 sin tareas.**
  - 02 §3 y 08 "Bloqueos externos" dicen que el MVP no sale al mercado sin HU-018.
  - HU-018 no tiene tareas, su revisión QA está pendiente (06) y PREG-071 está abierta.
  - **Corrección:** decidir PREG-071, completar la revisión QA de HU-018 en 06 y descomponer HU-018 antes que las otras Should, que es el orden que 08 ya propone.

---

## 8. Calidad de la UI Spec (09)

| Criterio | Resultado |
|---|---|
| Inventario | 24 pantallas con actor, HU, prioridad y ruta ✅ |
| Flujos | 15 flujos que cubren todas las HU con pantalla, con pasos alternativos entre corchetes ✅ |
| Screen specs | Cada pantalla tiene propósito, API, comportamiento sin conexión, datos, acciones con su condición, RN con el texto del catálogo y estados ✅ |
| Wireframes textuales | Las 24 pantallas tienen un wireframe a 360 px con anotaciones de accesibilidad (`autocomplete`, `inputmode`, roles ARIA, tamaños). Los anchos de 768 y 1024 px se describen solo con texto. P-014 en tabla desde 1024 px no tiene wireframe ⚠️ |
| Design tokens | Colores, tipografía, espaciado, anchos, tamaños, íconos y cómo verificarlos. Los 13 contrastes declarados se recalcularon con la fórmula de WCAG y coinciden ✅ |
| Mapa de navegación | Árbol, diagrama Mermaid y reglas ✅. SF-24 |
| Textos | Los textos del catálogo se citan con su RN. Los textos propios se marcan [TEXTO UI] y se reúnen en §6 ✅. SF-06 |

- **SF-06 (Alta): dos reglas sobre los textos.**
  - 08 dice: "Los textos que ve el usuario salen del catálogo §2.9 de 03-reglas-de-negocio.md. Si una tarea necesita un texto que no está ahí, se marca [REQUIERE DECISIÓN]".
  - 09 §6 "adopta" unos 100 textos [TEXTO UI] (títulos, estados vacíos, diálogos y toasts) que el PO no aprobó, y dice que pasarlos a §2.9 lo decide el PO.
  - Un agente que siga 08 tiene que bloquear casi todas las pantallas. Uno que siga 09 usa textos sin aprobar.
  - El test de tuteo de T-024 solo revisa "el catálogo de mensajes y las plantillas de correo", no esos textos.
  - **Corrección (decisión del PO):**
    - o agregar a 08 "Cómo leer" que los [TEXTO UI] de 09 §6 rigen para las pantallas hasta que se pasen a §2.9;
    - o aprobar 09 §6 y pasarlo a 03 §2.9.
    - En los dos casos, ampliar el test de tuteo de T-024 a los textos de 09 §6.
- **SF-04:** ver §6.3. Nace en 09 P-017.
- **SF-24 (Baja):** en el diagrama de 09 §5.2, P-016 solo se alcanza desde P-014 y P-015. C-03 la hace accesible desde cualquier pantalla, incluida P-010 para el participante que informó un pago sin conexión (Should).
- **SF-14 (Media): estados en borrador.**
  - 09 v1.1, 08 v0.5 y 10 v1.1 están en "Borrador" y esperan la revisión del PO.
  - La validación de los prototipos en un navegador a 360, 768, 1024 y 1440 px no se hizo (10, fila 18).
  - Mientras tanto, el Spec Pack no es una v1.0 aprobada: 7 archivos están en "Revisado" y 3 en "Borrador".

---

## 9. Score general

Los tres criterios del módulo no están definidos en `spec-pack/`. Esta auditoría los aplica así:
- **Operatividad:** ¿un agente de IA puede implementar el MVP solo con el Spec Pack, sin preguntar ni inventar?
- **Utilidad:** ¿el contenido reduce la incertidumbre de implementar y probar?
- **Orden:** ¿la estructura, los IDs y la trazabilidad dejan encontrar y verificar cada pieza?

| Criterio | Puntaje | Justificación | Qué falta para subir un punto |
|---|---|---|---|
| Operatividad | **3 / 5** | **A favor:** 27 tareas ejecutables con criterios precisos; contratos con ejemplos JSON; mensajes exactos en §2.9; vector de prueba. **En contra:** T-018 (HU-011, Must) necesita un texto que no existe (SF-01); el lanzamiento depende de HU-018 sin tareas (SF-03); la regla de textos se contradice entre 08 y 09 (SF-06); RN-009 tiene dos lecturas en la edición (SF-05); el cierre de sesión sin conexión es inseguro (SF-04) | Resolver SF-01, SF-03, SF-05 y SF-06 |
| Utilidad | **4 / 5** | **A favor:** datos de ejemplo únicos y coherentes en 03, 06, 07, 08 y 09; casos borde explícitos (fin de mes, año bisiesto, segundo 86,400, último cupo concurrente); riesgos con su mitigación; ADR con alternativas. **En contra:** la UI Spec no llega al backlog (SF-07) y faltan tareas para la medición de KPI-05 (HU-018) | Resolver SF-07 y descomponer HU-018 |
| Orden | **4 / 5** | **A favor:** IDs sin huecos ni duplicados en 9 familias; trazabilidad RN → HU → API completa y verificada; versiones y fuentes citadas en cada archivo; un log de cambios en cada versión. **En contra:** 9 PREG citadas y no registradas (SF-02); el prefijo C-NN con dos significados (SF-25); el backlog no cita pantallas (SF-07); identificadores del glosario que no coinciden con 07 (SF-10) | Resolver SF-02, SF-10 y SF-25 |
| **Promedio** | **3.7 / 5** | | Con los 3 bloqueantes y los 4 hallazgos altos resueltos, la estimación es de 4.5 |

---

## 10. Lista consolidada de hallazgos

Ordenada por severidad. "Archivo a corregir" indica dónde debería quedar la corrección. Esta auditoría no la aplicó.

| ID | Severidad | Hallazgo | Archivo a corregir | Corrección sugerida |
|---|---|---|---|---|
| SF-01 | Bloqueante | El recordatorio (RN-144) no tiene cuerpo en §2.9. T-018 no figura como bloqueada | 03 §2.9, 08 | PO decide PREG-075. Agregar las filas del recordatorio y de RN-196 a §2.9 y T-018 a "Bloqueos externos" |
| SF-02 | Bloqueante | PREG-069 a PREG-077 citadas y no registradas | 05 | Registrarlas con su estado, en el orden de 10 §2 |
| SF-03 | Bloqueante (lanzamiento) | HU-018 sin tareas, sin revisión QA y con PREG-071 abierta | 05, 06, 08 | Decidir PREG-071, revisar HU-018 y descomponerla primero |
| SF-04 | Alta | Cerrar sesión sin conexión deja la sesión del servidor vigente | 07 §2.2 y API-005, 09 P-017, 06 HU-015, 08 T-021 | **[REQUIERE DECISIÓN]** Deshabilitar sin red, o encolar API-005 antes de cualquier otra petición |
| SF-05 | Alta | RN-009 "creación" frente a "hoy" en la edición | 03, 07 API-009 y API-010, 08 T-011 | PO decide PREG-073; alinear el código y el mensaje; agregar el caso a T-011 |
| SF-06 | Alta | 08 y 09 tienen reglas distintas para los textos de la interfaz | 08 "Cómo leer" o 03 §2.9 | Regla de precedencia o aprobación de 09 §6; ampliar el test de tuteo |
| SF-07 | Alta | El backlog no cita 09. Sin tarea para la base de UI ni para P-016 | 08 | Campo "Pantallas", tarea nueva de la base de UI, ampliar T-023 |
| SF-08 | Media | API-022 no trae los datos de las tarjetas de P-007 | 07 API-022, 08 | Agregar `occupied_slots`, `participant_count` y `current_round_status` |
| SF-09 | Media | 09 da por resueltas PREG-069, 070 y 072 | 05, 09 §7.1 | Pasarlas a "Propuesta" |
| SF-10 | Media | Identificadores de 04 distintos de 07, y términos sin definir | 04 | Alinear los identificadores y agregar los términos de §4 |
| SF-12 | Media | T-025 revisa solo 360 y 1440 px | 08 T-025 | Agregar 768 y 1024 px |
| SF-13 | Media | T-007 y T-021 a T-023 probablemente superan 2 h | 08 | Dividirlas con IDs nuevos |
| SF-14 | Media | 08, 09 y 10 en borrador; prototipos sin probar en un navegador | 08, 09, 10 | Revisión del PO y la validación de la fila 18 |
| SF-11 | Baja | El ejemplo de RN-164 dice "15 minutos" fijo; §2.9 usa `{n}` (11 en HU-003) | 03 RN-164 | Cambiar el ejemplo a "en 11 minutos", como en HU-003 |
| SF-15 | Baja | API-030 sin ruta para el código de desactivación | 07 API-030 | Agregarla al descomponer HU-003 |
| SF-16 | Baja | `GET /me` sin `overdue_notices_enabled` ni `push_enabled` | 07 API-008 | Agregarlos al ejemplo |
| SF-17 | Baja | ADR-002 dice que PREG-008 sigue abierta | 07 ADR-002 | Quitar la frase |
| SF-18 | Baja | Falta `404` en §4.1, y el `403` de no miembro no tiene `code` | 07 §4.1 | Agregar `404` y un código como `NOT_A_MEMBER` |
| SF-19 | Baja | `phone_blind_index` sin `UK` en el diagrama ER | 07 §3.1 | Agregar `UK` |
| SF-20 | Baja | Ejemplos contradictorios: `p_1001` y el wireframe de P-007 | 07 API-020, 09 P-007 | Usar `paid_on` 2026-11-28 en los dos ejemplos y solo juntas de Jorge |
| SF-21 | Baja | 03 dice que cubre F-01 a F-11, pero también tiene las reglas de F-16 a F-18 | 03, línea "Fuente" | Cambiar a "F-01 a F-11 y F-16 a F-18" |
| SF-22 | Baja | RN-188 está en las reglas de HU-003 sin un criterio que la cite | 06 HU-003 | Agregar un criterio: el código llega con los recordatorios desactivados |
| SF-23 | Baja | PRINCIPIO-001 no protege las familias API, ADR, UF, C ni D | 00 | Proponer el cambio con aprobación humana |
| SF-24 | Baja | El diagrama de navegación no muestra P-016 desde C-03 global | 09 §5.2 | Agregar las flechas desde P-010 y P-018 |
| SF-25 | Baja | "C-NN" es a la vez un hallazgo de QA y un componente de la UI | 02, 03, 05, 07 | Citar los hallazgos como "qa-clase2 C-01" |

**Totales:** 25 hallazgos: 3 bloqueantes, 4 altos, 6 medios y 12 bajos.

---

## Anexo. Verificaciones automáticas hechas

| Verificación | Método | Resultado |
|---|---|---|
| Numeración de las RN | Lista de los encabezados `**RN-NNN**` de 03 | 212, sin huecos ni duplicados |
| Un verbo modal por regla | Conteo de DEBE/PUEDE en el enunciado de cada regla | 212 de 212 con exactamente 1 |
| RN → HU | Cruce con "Reglas de negocio relacionadas" de 06 | 212 de 212 |
| RN → criterio | Cruce con las líneas "DADO QUE" de 06 | 212 de 212 |
| Prioridad de RN y de HU | Cruce de las dos prioridades | Sin conflictos |
| RN MUST → tarea | Cruce con 08, expandiendo rangos | 162 de 162 |
| IDs citados y no definidos | Cruce de cada familia en los 11 archivos | Solo RN-213, T-031 y PREG-069 a PREG-077 |
| Dependencias del backlog | Ninguna dependencia hacia un número mayor o igual | 0 casos |
| Campos de cada tarea | Los 7 campos de "Cómo leer" de 08 | 30 de 30 completas |
| Vector del anexo A | Implementación independiente en Node.js (HMAC-SHA256 y muestreo por rechazo) | Coincide con el resultado esperado |
| Contrastes de 09 §4.1 | Fórmula de luminancia relativa de WCAG 2.2, 13 pares | Los 13 coinciden con lo declarado |
| Palabras vagas de PRINCIPIO-001 | Búsqueda en 01 a 10 | 0 apariciones |
| Tuteo en textos entre comillas | Búsqueda de "tú", "tu", "te", "tienes", "puedes" y "pagaste" | Solo el contraejemplo de RN-090 |

---

## Decisiones del equipo

Las tomó el Agente Spec Finalizer el 15/11/2026, con la autorización del usuario para decidir por su cuenta.

**Cómo se aplicaron:**
- **🔴 Crítico** (Bloqueante o Alta): se corrigió en el archivo.
- **🟡 Mayor** (Media): se registró como PREG-NNN en 05-preguntas-abiertas.md, con a quién preguntar y su plan de resolución.
- **Menor** (Baja): se corrigió si era trivial.

El Product Owner puede revertir cualquiera de estas decisiones, y su confirmación queda en PREG-079. Se volvió a correr el Finalizer hasta llegar a 0 críticos: auditorias/spec-finalizer-v2.md encontró 2 críticos nuevos (SF-26 y SF-27), y auditorias/spec-finalizer-v3.md cerró con 0.

| Hallazgo | Decisión | Archivo |
|---|---|---|
| 🔴 SF-01 Recordatorio sin texto (RN-144) | Asunto con "vence" o "venció", cuerpo y push del recordatorio. El aviso de cuotas vencidas usa el texto del ejemplo de RN-196, con un asunto propio. T-018 cita los textos, y PREG-075 queda resuelta | 03 §1.5 y §2.9, 08 T-018, 05 PREG-075 |
| 🔴 SF-02 PREG-069 a PREG-077 sin registrar | Registradas con su contexto y su decisión. PREG-074 adopta los textos de RN-139 y RN-194. PREG-076 crea RN-213 (formato del correo). PREG-077 ata el código equivocado a RN-078, sin RN nueva | 05, 03 §2.9 y RN-213, 06 HU-001 y HU-003, 07 API-001, 08 T-028, 09 P-001 y P-022 |
| 🔴 SF-03 HU-018 sin tareas ni validación | RN-214 (enteros desde 0, sin máximo) y RN-215 (las 3 respuestas obligatorias). Revisión QA de HU-018 con criterios [SF], y tareas T-032 (módulo `surveys`) y T-033 (P-024) | 03, 05 PREG-071, 06 HU-018, 07 API-034, 08, 09 P-024 |
| 🔴 SF-04 Cerrar sesión sin conexión dejaba la sesión vigente | "Cerrar sesión" exige conexión, porque no está entre las acciones de RN-170. El dispositivo se borra solo después de que API-005 responda. No cambia ninguna RN | 07 §2.2 y API-005, 09 UF-12 y P-017, 06 HU-015, 08 T-021 |
| 🔴 SF-05 RN-009 con dos lecturas en la edición | Se mantiene la comparación con la fecha de creación. Cambian el mensaje y el código a `ROUND1_BEFORE_CREATION`. T-011 y HU-014 prueban la edición | 03 §2.9, 05 PREG-073, 06 HU-004 y HU-014, 07 API-009, API-010 y ADR-008, 08 T-011, 09 P-008 |
| 🔴 SF-06 08 y 09 con reglas distintas para los textos | Precedencia: catálogo §2.9, después [TEXTO UI] de 09 §6, y [REQUIERE DECISIÓN] solo si el texto no está en ninguno. El test de tuteo de T-024 incluye 09 §6 | 08 "Cómo leer" y T-024, 09 "Cómo leer" y §6 |
| 🔴 SF-07 El backlog no usaba la UI Spec | Campo "Pantallas" en las tareas de interfaz. Tarea nueva T-031 para la base de UI. T-023 suma P-016 y el historial de P-015, T-021 suma P-006 y P-017, y T-022 suma el aviso de P-012. Los textos de T-029 y T-030 pasan a 09 §6 | 08, 09 §6, 10 §4 |
| 🟡 SF-08 API-022 sin los datos de P-007 | Pregunta al líder técnico antes de T-022 | 05 PREG-078 |
| 🟡 SF-09 Agentes que marcan preguntas como resueltas | Pregunta al PO sobre la validez de las autorizaciones generales. 09 §7.1 remite al estado de 05 | 05 PREG-079, 09 §7.1 |
| 🟡 SF-10 Glosario no alineado con 07 | Pregunta al PO y al líder técnico antes de T-017 | 05 PREG-080 |
| 🟡 SF-12 Anchos verificados en T-025 | Pregunta al líder técnico antes de T-025. T-031 ya prueba los 4 anchos | 05 PREG-081 |
| 🟡 SF-13 Tareas L demasiado grandes | Medir la primera y dividir las demás si hace falta | 05 PREG-082 |
| 🟡 SF-14 08, 09 y 10 en borrador; prototipos sin probar | Revisión del PO y prueba del usuario en el navegador antes de T-020 | 05 PREG-083, 08 "Bloqueos externos" |
| SF-11 Ejemplo de RN-164 | "11 minutos" | 03 RN-164 |
| SF-15 Sin ruta para el código de desactivación | `POST /two-factor/deactivation/code` | 07 API-030, 09 P-021 |
| SF-16 `GET /me` incompleto | Agrega `overdue_notices_enabled` y `push_enabled` | 07 API-008 |
| SF-17 ADR-002 citaba PREG-008 como abierta | Frase corregida | 07 ADR-002 |
| SF-18 Sin `404` ni código para el no miembro | `404` en §4.1 y `403 NOT_A_MEMBER` | 07 §4.1, 09 P-010 |
| SF-19 `phone_blind_index` sin `UK` | `UK` en el diagrama ER | 07 §3.1 |
| SF-20 Ejemplos que se contradecían | API-017 con `paid_on` 2026-11-25. El wireframe de P-007 usa la Junta Oficina 2027 | 07 API-017, 09 P-007 |
| SF-21 Alcance de 03 desactualizado | "F-07 a F-11 y F-16 a F-18" | 03 |
| SF-22 RN-188 sin criterio en HU-003 | Criterio [SF] | 06 HU-003 |
| SF-23 PRINCIPIO-001 no protege API, ADR, UF ni C | Sin cambio. Cambiar 00-constitucion.md exige aprobación humana explícita (PRINCIPIO-012) | — (documentado) |
| SF-24 P-016 sin flechas en el diagrama de navegación | Flechas desde P-010 y P-018, y hacia P-010 | 09 §5.2 |
| SF-25 Prefijo C-NN con dos significados | "auditorias/qa-clase2.md, hallazgo C-01" en 07 §6.3 | 07 §6.3 |
| 🔴 SF-26 (corrida 2) Bloqueo circular entre T-031 y T-021 | T-031 prueba la vuelta a la ruta pedida con una sesión creada por un arnés | 08 T-031 |
| 🔴 SF-27 (corrida 2) Criterio de HU-018 que contradecía RN-170 | Parte de una junta creada con conexión y de la red cortada después. Cita RN-170 | 06 HU-018, 08 T-033 |
| SF-28 (corrida 2) Glosario sin RN-214 ni RN-215 | Se resuelve junto con PREG-080 | 05 PREG-080 |

**Versiones de los archivos modificados:** 03 v0.5, 05 v0.5, 06 v0.5, 07 v0.5, 08 v0.6, 09 v1.2 y 10 v1.2. No se modificaron 00, 01, 02 ni 04.
