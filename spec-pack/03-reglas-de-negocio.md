# Reglas de negocio de Mi Junta

Versión: 0.1

Fuente: 00-constitucion.md v1.2, 01-project-brief.md v0.2, 02-alcance.md v0.1 y las decisiones del Product Owner del 2026-11-14 (sección 1). Este catálogo cubre las funcionalidades Must (F-01 a F-06) y Should (F-07 a F-11) de 02-alcance.md. Las funcionalidades Could (F-12 a F-15) quedan para una versión posterior.

**Cómo leer este catálogo:**
- Cada regla tiene un solo DEBE / NO DEBE / PUEDE (PRINCIPIO-001) y necesita al menos un escenario Gherkin que cite su ID (PRINCIPIO-011).
- Los montos se escriben como `S/ 300.00` junto con su valor guardado en céntimos (`30000`), según PRINCIPIO-003.
- Las fechas de las reglas y los ejemplos van en ISO 8601 (`2026-11-30`, `2026-11-30T09:00:00-05:00`). Cuando un ejemplo cita lo que ve el usuario en pantalla, la fecha va entre comillas en DD/MM/AAAA ("30/11/2026").
- Los términos del dominio están definidos en 04-glosario.md.

| Patrón EARS | Plantilla |
|---|---|
| Ubiquitous | El sistema DEBE … (aplica siempre) |
| Event-driven | Cuando \<evento\>, el sistema DEBE … |
| State-driven | Mientras \<estado\>, el sistema DEBE … |
| Unwanted | Si \<situación no deseada\>, entonces el sistema DEBE … |
| Optional | Donde \<opción o configuración presente\>, el sistema DEBE … |

---

## 1. Decisiones del Product Owner del 2026-11-14

Estas decisiones dan los valores de las reglas. Las que cierran una pregunta abierta quedaron registradas en 05-preguntas-abiertas.md.

| Tema | Decisión | Pregunta |
|---|---|---|
| Unidad mínima de monto | S/ 0.10. El organizador ingresa la cuota y el pozo se calcula como cuota × participantes, así que no hay división ni redondeo | PREG-002 |
| Rango de la cuota | De S/ 10.00 a S/ 5,000.00 por participante | — |
| Beneficio del organizador | Ninguno en esta versión. Si participa, paga la misma cuota que los demás | PREG-019 |
| Cantidad de participantes | De 2 a 50. Hay una ronda por participante y cada uno recibe el pozo una sola vez | — |
| Calendario | Quincenal es cada 15 días. Si un mes no tiene el día de vencimiento, vence el último día de ese mes. "Cada N días" va de 1 a 60. La ronda 1 vence en la fecha de creación o después | PREG-027 |
| Código de invitación | 8 caracteres de `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`. Sirve para todo el grupo hasta que se llenan los cupos o se ejecuta el sorteo. El organizador puede regenerarlo, y entonces el código anterior deja de funcionar | PREG-024 |
| Sorteo | Solo con todos los cupos llenos, una sola vez por junta y con conexión. Después del sorteo nadie más se une | PREG-005 (en parte) |
| Pago a tiempo | Cuenta la fecha de pago que registra el organizador. Es a tiempo si es igual o anterior a la fecha de vencimiento. La fecha de pago no puede ser futura | PREG-020 |
| Corrección de un pago | El organizador puede desmarcar un pago. La corrección se guarda como un evento aparte y el registro original se conserva | — |
| Pago informado (F-08) | Si el organizador lo rechaza, la cuota vuelve a "Pendiente". Si no responde, sigue en "Por confirmar" sin plazo. No se adjunta evidencia | PREG-017 (en parte) |
| Aviso previo | De 1 a 7 días, con 3 por defecto, y siempre menos días que el periodo | PREG-025 |
| Recordatorios después del vencimiento | Cada 2 días, con un máximo de 5 envíos. Todos los recordatorios salen a las 09:00 America/Lima | PREG-026 |
| Contraseña | Mínimo 8 caracteres. Bloqueo de 900 s después de 5 intentos fallidos seguidos | — |
| Segundo factor | Código de 6 dígitos, válido por 600 s y anulado después de 5 intentos fallidos. Se aprobó el cambio en PRINCIPIO-005 | PREG-023 |
| DNI de los demás | No se muestra mientras PREG-003 siga abierta | PREG-003 (en parte) |
| Nombre del rol | "Organizador" | PREG-010 |

---

## 2. Catálogo de reglas

### 2.1 Juntas

---

**RN-001** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.1, PREG-013)

Patrón EARS: Ubiquitous

El sistema NO DEBE limitar la cantidad de juntas que gestiona un mismo organizador.

✅ **Ejemplo:** Jorge ya gestiona 2 juntas. Crea una tercera, "Junta Oficina 2027", y queda creada.

❌ **Contraejemplo:** el sistema muestra "Ya alcanzó el máximo de 2 juntas" y no crea la tercera.

---

**RN-002** | Categoría: Juntas | Prioridad: MUST | Fuente: Alcance (F-02)

Patrón EARS: Unwanted

Si al crear una junta falta el nombre, la cuota, la cantidad de participantes, la frecuencia, la fecha de vencimiento de la ronda 1, los días de aviso previo o la elección de si el organizador participa, entonces el sistema NO DEBE crear la junta.

✅ **Ejemplo:** Carmen completa "Junta Familia", S/ 300.00, 12 participantes, mensual, `2026-11-30`, 3 días de aviso y "Sí participo". La junta se crea.

❌ **Contraejemplo:** Carmen deja vacía la fecha de vencimiento de la ronda 1 y la junta "Junta Familia" se crea igual.

---

**RN-003** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Ubiquitous

El sistema DEBE aceptar como cuota solo un monto entre S/ 10.00 (`1000`) y S/ 5,000.00 (`500000`), ambos incluidos.

✅ **Ejemplo:** Jorge ingresa una cuota de S/ 1,000.00 y se guarda como `100000`.

❌ **Contraejemplo:** se acepta una cuota de S/ 6,000.00 (`600000`) o de S/ 5.00 (`500`).

---

**RN-004** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-002)

Patrón EARS: Unwanted

Si la cuota ingresada no es un múltiplo de S/ 0.10, entonces el sistema DEBE rechazarla.

✅ **Ejemplo:** la cuota S/ 20.80 (`2080`) se acepta.

❌ **Contraejemplo:** la cuota S/ 20.85 (`2085`) se acepta.

---

**RN-005** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Ubiquitous

El sistema DEBE aceptar como cantidad de participantes solo un número entero entre 2 y 50, ambos incluidos.

✅ **Ejemplo:** Carmen crea una junta de 12 participantes.

❌ **Contraejemplo:** se crea una junta de 51 participantes, o una de 1 participante.

---

**RN-006** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.5)

Patrón EARS: Optional

Donde el organizador eligió participar en la junta, el sistema DEBE contarlo como uno de los participantes.

✅ **Ejemplo:** Carmen participa en una junta de 12 participantes. Quedan 11 cupos para sus familiares.

❌ **Contraejemplo:** Carmen participa y el sistema abre 12 cupos para invitados, y la junta termina con 13 participantes.

---

**RN-007** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.4)

Patrón EARS: Ubiquitous

El sistema DEBE aceptar como frecuencia solo uno de estos valores: semanal, quincenal, mensual o cada N días.

✅ **Ejemplo:** Jorge elige "mensual".

❌ **Contraejemplo:** se guarda una junta con frecuencia "bimestral".

---

**RN-008** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-027)

Patrón EARS: Optional

Donde la frecuencia es cada N días, el sistema DEBE aceptar solo un N entero entre 1 y 60, ambos incluidos.

✅ **Ejemplo:** el organizador fija una frecuencia de cada 10 días.

❌ **Contraejemplo:** se acepta una frecuencia de cada 90 días, o de cada 0 días.

---

**RN-009** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-027)

Patrón EARS: Unwanted

Si la fecha de vencimiento de la ronda 1 es anterior a la fecha de creación de la junta en America/Lima, entonces el sistema DEBE rechazarla.

✅ **Ejemplo:** la junta se crea el `2026-11-14` con la ronda 1 venciendo el `2026-11-30`. También se acepta que la ronda 1 venza el mismo `2026-11-14`.

❌ **Contraejemplo:** la junta se crea el `2026-11-14` y se acepta que la ronda 1 venza el `2026-11-10`.

---

**RN-010** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-025)

Patrón EARS: Ubiquitous

El sistema DEBE aceptar como días de aviso previo solo un número entero entre 1 y 7, ambos incluidos.

✅ **Ejemplo:** Carmen fija 3 días de aviso previo.

❌ **Contraejemplo:** se aceptan 10 días, o 0 días.

---

**RN-011** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-025)

Patrón EARS: Event-driven

Cuando el organizador abre el formulario para crear una junta, el campo de días de aviso previo DEBE mostrar el valor 3.

✅ **Ejemplo:** Jorge abre "Crear junta" y el campo "Días de aviso previo" muestra 3.

❌ **Contraejemplo:** el campo aparece vacío, o con el valor 1.

---

**RN-012** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-025)

Patrón EARS: Unwanted

Si los días de aviso previo son iguales o mayores que la cantidad de días del periodo de la junta, entonces el sistema DEBE rechazarlos.

✅ **Ejemplo:** una junta semanal (periodo de 7 días) con 6 días de aviso previo se acepta.

❌ **Contraejemplo:** una junta de cada 5 días con 5 días de aviso previo se acepta.

---

**RN-013** | Categoría: Juntas | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Ubiquitous

El sistema DEBE crear una ronda por cada participante de la junta.

✅ **Ejemplo:** una junta de 12 participantes tiene las rondas 1 a 12.

❌ **Contraejemplo:** una junta de 12 participantes tiene 10 rondas.

---

**RN-014** | Categoría: Juntas | Prioridad: SHOULD | Fuente: Alcance (F-09)

Patrón EARS: Optional

Donde el organizador escribió las reglas de la junta, el sistema DEBE mostrarlas a todos los miembros de esa junta.

✅ **Ejemplo:** Jorge escribe "Quien no pueda pagar avisa al grupo antes de la fecha de vencimiento", y Lucía lo lee en la pantalla de la junta.

❌ **Contraejemplo:** Jorge guardó el texto "Quien no pueda pagar avisa al grupo antes de la fecha de vencimiento", pero `GET /juntas/{id}` le devuelve `junta_rules = null` a Lucía.

---

### 2.2 Participantes

---

**RN-015** | Categoría: Participantes | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-024)

Patrón EARS: Event-driven

Cuando se crea una junta, el sistema DEBE generarle un código de invitación de 8 caracteres tomados del conjunto `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`.

✅ **Ejemplo:** la junta "Junta Familia" recibe el código `K7MP4XR2`.

❌ **Contraejemplo:** se genera el código `K7M04XR1` (tiene `0` y `1`), o el código `K7MP4X` (6 caracteres).

---

**RN-016** | Categoría: Participantes | Prioridad: MUST | Fuente: Business Analyst, derivada de F-02

Patrón EARS: Unwanted

Si un código generado coincide con el código de invitación vigente de otra junta, entonces el sistema DEBE generar otro código.

✅ **Ejemplo:** sale `K7MP4XR2`, que ya usa la junta de Jorge, y el sistema genera `T9QW3HZ5` para la junta de Carmen.

❌ **Contraejemplo:** dos juntas tienen vigente el mismo código `K7MP4XR2`.

---

**RN-017** | Categoría: Participantes | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.2)

Patrón EARS: Unwanted

Si una persona sin sesión iniciada ingresa un código de invitación, entonces el sistema NO DEBE unirla a la junta.

✅ **Ejemplo:** Pedro, sin cuenta, ingresa `K7MP4XR2` y ve "Inicie sesión o cree su cuenta para unirse a la junta".

❌ **Contraejemplo:** Pedro, sin cuenta, ingresa `K7MP4XR2` y la junta pasa de 8 a 9 cupos ocupados, uno de ellos sin cuenta.

---

**RN-018** | Categoría: Participantes | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-024)

Patrón EARS: State-driven

Mientras la junta tenga todos sus cupos ocupados, el sistema DEBE rechazar su código de invitación.

✅ **Ejemplo:** la junta de Carmen tiene 12 de 12 cupos ocupados. Rosa ingresa `K7MP4XR2` y ve "Esta junta ya no tiene cupos disponibles".

❌ **Contraejemplo:** Rosa se une como participante número 13.

---

**RN-019** | Categoría: Participantes | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-024)

Patrón EARS: Event-driven

Cuando se ejecuta el sorteo de una junta, el sistema DEBE anular su código de invitación.

✅ **Ejemplo:** el sorteo se ejecuta el `2026-11-20T19:30:00-05:00`. Al día siguiente, alguien ingresa `K7MP4XR2` y el código ya no es válido.

❌ **Contraejemplo:** después del sorteo, un participante que ya salió de la junta vuelve a entrar con `K7MP4XR2`.

---

**RN-020** | Categoría: Participantes | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-024)

Patrón EARS: Event-driven

Cuando el organizador regenera el código de invitación, el sistema DEBE anular el código anterior.

✅ **Ejemplo:** Carmen cambia `K7MP4XR2` por `T9QW3HZ5`. Pedro ingresa `K7MP4XR2` y ve "Este código ya no es válido".

❌ **Contraejemplo:** `K7MP4XR2` y `T9QW3HZ5` siguen sirviendo para unirse.

---

**RN-021** | Categoría: Participantes | Prioridad: MUST | Fuente: Business Analyst, derivada de F-02

Patrón EARS: Unwanted

Si un miembro de una junta ingresa el código de esa misma junta, entonces el sistema NO DEBE ocupar otro cupo con él.

✅ **Ejemplo:** Lucía, que ya está en la junta, vuelve a ingresar `K7MP4XR2`. La junta sigue con 8 de 12 cupos ocupados.

❌ **Contraejemplo:** la junta pasa de 8 a 9 cupos ocupados y Lucía aparece dos veces.

---

**RN-022** | Categoría: Participantes | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-006)

Patrón EARS: Ubiquitous

El sistema DEBE entregar de cada otro miembro de la junta solo su nombre, su número de turno, su estado de pago en la ronda actual, la fecha de su próximo pago y el estado de su próximo pago.

✅ **Ejemplo:** `GET /juntas/{id}/members` devuelve para Jorge `{"name":"Jorge","turn_number":4,"current_round_status":"paid","next_due_date":"2026-12-30","next_status":"pending"}`.

❌ **Contraejemplo:** la respuesta también incluye `"phone":"987654321"` y la interfaz solo lo oculta.

---

**RN-023** | Categoría: Participantes | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-003 sigue abierta)

Patrón EARS: Ubiquitous

El sistema NO DEBE entregar a ningún usuario el DNI de otro miembro.

✅ **Ejemplo:** Carmen, como organizadora, llama a `GET /juntas/{id}/members` y la respuesta no trae el campo `dni` en ninguno de sus 11 familiares.

❌ **Contraejemplo:** la lista muestra "DNI ****5678" para Lucía.

---

**RN-024** | Categoría: Participantes | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-006)

Patrón EARS: Unwanted

Si un usuario que no es miembro de una junta pide los datos de esa junta, entonces el sistema DEBE rechazar la solicitud.

✅ **Ejemplo:** Rosa, que no es miembro, llama a `GET /juntas/{id}/members` y recibe `403`.

❌ **Contraejemplo:** Rosa recibe `200` con los 12 miembros de la junta y sus estados de pago.

---

**RN-025** | Categoría: Participantes | Prioridad: MUST | Fuente: Alcance (F-05)

Patrón EARS: Ubiquitous

El sistema DEBE mostrar a cada participante su número de turno.

✅ **Ejemplo:** después del sorteo, Lucía abre la junta y ve "Su turno: 7".

❌ **Contraejemplo:** después del sorteo del `2026-11-20`, la pantalla de Lucía muestra "Su turno: —" y ella tiene que preguntarle a Jorge.

---

**RN-026** | Categoría: Participantes | Prioridad: MUST | Fuente: Alcance (F-05)

Patrón EARS: Ubiquitous

El sistema DEBE mostrar a cada participante el estado de cada una de sus cuotas.

✅ **Ejemplo:** Lucía ve la ronda 1 "Pagada", la ronda 2 "Pagada" y la ronda 3 "Pendiente".

❌ **Contraejemplo:** Lucía está en la ronda 3 y solo ve "Ronda 3: Pendiente", sin las rondas 1 y 2.

---

### 2.3 Sorteo

---

**RN-027** | Categoría: Sorteo | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: State-driven

Mientras la junta tenga al menos un cupo libre, el sistema NO DEBE permitir ejecutar el sorteo.

✅ **Ejemplo:** con 11 de 12 cupos ocupados, el botón "Ejecutar sorteo" está deshabilitado. Con 12 de 12, se habilita.

❌ **Contraejemplo:** Carmen ejecuta el sorteo con 11 de 12 cupos ocupados.

---

**RN-028** | Categoría: Sorteo | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Unwanted

Si la junta ya tiene un sorteo registrado, entonces el sistema DEBE rechazar otra ejecución del sorteo.

✅ **Ejemplo:** Jorge sorteó el `2026-11-20`. El `2026-11-21` envía `POST /juntas/{id}/draw` y recibe `409`.

❌ **Contraejemplo:** el `2026-11-21` Jorge sortea por segunda vez, recibe `201` y su turno pasa de 10 a 2.

---

**RN-029** | Categoría: Sorteo | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-005)

Patrón EARS: State-driven

Mientras el dispositivo del organizador no tenga conexión, la app NO DEBE permitir ejecutar el sorteo.

✅ **Ejemplo:** con el navegador en modo "Offline", Carmen ve "Necesita conexión a internet para ejecutar el sorteo".

❌ **Contraejemplo:** Carmen sortea en modo "Offline" a las `2026-11-20T19:30:00-05:00`, y el resultado llega al servidor cuando reconecta a las `2026-11-20T20:05:00-05:00`.

---

**RN-030** | Categoría: Sorteo | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.5)

Patrón EARS: Optional

Donde el organizador eligió no participar, el sistema NO DEBE incluirlo en la lista de entrada del sorteo.

✅ **Ejemplo:** Jorge no participa en una junta de 10. La lista de entrada tiene 10 personas y Jorge no está entre ellas.

❌ **Contraejemplo:** Jorge aparece en el resultado del sorteo con el turno 3.

---

**RN-031** | Categoría: Sorteo | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-008)

Patrón EARS: Event-driven

Cuando el organizador ejecuta el sorteo, el sistema DEBE generar una semilla de 256 bits con un generador criptográfico de números aleatorios (CSPRNG).

✅ **Ejemplo:** la semilla se obtiene con `crypto.randomBytes(32)` y vale `9f2c…e41a` (64 caracteres hexadecimales).

❌ **Contraejemplo:** la semilla sale de `Math.random()` o de la fecha actual.

---

**RN-032** | Categoría: Sorteo | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-008)

Patrón EARS: Ubiquitous

El sistema DEBE obtener el orden de turnos aplicando el algoritmo Fisher–Yates determinista a la lista de entrada con la semilla del sorteo.

✅ **Ejemplo:** la función `shuffle(input, seed)` implementa Fisher–Yates con un generador derivado de la semilla.

❌ **Contraejemplo:** el orden sale de `array.sort(() => Math.random() - 0.5)`.

---

**RN-033** | Categoría: Sorteo | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-008)

Patrón EARS: Event-driven

Cuando se vuelve a ejecutar el algoritmo con la semilla guardada y la misma lista de entrada, el sistema DEBE obtener el mismo orden de turnos.

✅ **Ejemplo:** un test lee la semilla y la entrada del sorteo del `2026-11-20`, ejecuta de nuevo `shuffle` y obtiene `[Lucía, Pedro, Jorge, …]`, igual que el resultado guardado.

❌ **Contraejemplo:** con la misma semilla y la misma entrada, la segunda ejecución da `[Pedro, Lucía, Jorge, …]`.

---

**RN-034** | Categoría: Sorteo | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-008)

Patrón EARS: Event-driven

Cuando el organizador ejecuta el sorteo, el sistema DEBE guardar el registro del sorteo con la semilla, la versión del algoritmo, la lista de participantes en el orden de entrada, el resultado, el usuario que lo ejecutó y la fecha y hora en America/Lima.

✅ **Ejemplo:** se guarda `{"seed":"9f2c…e41a","algorithm_version":"fisher-yates-v1","input":["Carmen","Lucía",…],"result":["Lucía","Pedro",…],"executed_by":"user_123","executed_at":"2026-11-20T19:30:12-05:00"}`.

❌ **Contraejemplo:** solo se guarda `{"result":["Lucía","Pedro",…],"executed_at":"2026-11-20T19:30:12-05:00"}`, sin `seed` ni `input`.

---

**RN-035** | Categoría: Sorteo | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-008)

Patrón EARS: Ubiquitous

El sistema NO DEBE modificar un registro de sorteo ya guardado.

✅ **Ejemplo:** un cambio de turno posterior se guarda como un evento aparte y el registro del sorteo del `2026-11-20` sigue igual.

❌ **Contraejemplo:** se ejecuta `UPDATE draws SET result = …` sobre el sorteo del `2026-11-20`.

---

**RN-036** | Categoría: Sorteo | Prioridad: MUST | Fuente: Business Analyst, derivada de PRINCIPIO-008 y F-03

Patrón EARS: Ubiquitous

El sistema DEBE asignar a cada participante como número de turno su posición en el resultado del sorteo.

✅ **Ejemplo:** el resultado es `[Lucía, Pedro, Jorge, …]`. Lucía tiene el turno 1, Pedro el 2 y Jorge el 3.

❌ **Contraejemplo:** Lucía sale primera en el resultado y la app le muestra el turno 5.

---

**RN-037** | Categoría: Sorteo | Prioridad: MUST | Fuente: Business Analyst, derivada de 01-project-brief.md §1

Patrón EARS: Ubiquitous

El sistema DEBE asignar el pozo de la ronda k al participante con el turno k.

✅ **Ejemplo:** Pedro tiene el turno 2 y es quien recibe el pozo de la ronda 2, que vence el `2026-12-30`.

❌ **Contraejemplo:** Pedro tiene el turno 2 y la app lo muestra como receptor de la ronda 3.

---

**RN-038** | Categoría: Sorteo | Prioridad: SHOULD | Fuente: Alcance (F-10)

Patrón EARS: Optional

Donde el organizador asigna el orden de turnos sin sorteo, el sistema DEBE guardar el usuario que asignó el orden.

✅ **Ejemplo:** Jorge asigna el turno 1 a Lucía por necesidad, y se guarda `assigned_by = "user_456"` (Jorge).

❌ **Contraejemplo:** se guarda el orden `["Lucía","Pedro",…]` con `assigned_by = null`.

---

**RN-039** | Categoría: Sorteo | Prioridad: SHOULD | Fuente: Alcance (F-10)

Patrón EARS: Optional

Donde el organizador asigna el orden de turnos sin sorteo, el sistema DEBE guardar la fecha y hora de la asignación en America/Lima.

✅ **Ejemplo:** se guarda `assigned_at = "2026-11-20T19:45:03-05:00"`.

❌ **Contraejemplo:** se guarda el orden `["Lucía","Pedro",…]` con `assigned_at = null`.

---

### 2.4 Cuotas y Pagos

---

**RN-040** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-003)

Patrón EARS: Ubiquitous

El sistema DEBE guardar cada monto como un número entero de céntimos.

✅ **Ejemplo:** la cuota S/ 300.00 se guarda como `30000` en una columna `bigint`.

❌ **Contraejemplo:** se guarda `amount = 300.0` en una columna `double precision`.

---

**RN-041** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-002)

Patrón EARS: Ubiquitous

El sistema DEBE calcular el pozo de cada ronda multiplicando la cuota por la cantidad de participantes.

✅ **Ejemplo:** `30000 × 12 = 360000`, y la app muestra un pozo de "S/ 3,600.00".

❌ **Contraejemplo:** el organizador escribe a mano un pozo de S/ 3,500.00 en una junta de 12 participantes con cuota de S/ 300.00.

---

**RN-042** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-002, S-14)

Patrón EARS: Ubiquitous

El sistema DEBE generar en cada ronda una cuota para cada participante, incluido el que recibe el pozo de esa ronda.

✅ **Ejemplo:** en la ronda 2 de una junta de 12, Pedro recibe el pozo y también tiene su cuota de S/ 300.00. La ronda tiene 12 cuotas.

❌ **Contraejemplo:** la ronda 2 tiene 11 cuotas porque a Pedro no se le genera la suya.

---

**RN-043** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-019, S-14)

Patrón EARS: Ubiquitous

El sistema DEBE asignar a todas las cuotas de una junta el monto de cuota que fijó el organizador.

✅ **Ejemplo:** Carmen participa y su cuota es de S/ 300.00 (`30000`), igual que la de sus 11 familiares.

❌ **Contraejemplo:** la cuota de Carmen es de S/ 0.00 por ser la organizadora.

---

**RN-044** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.5)

Patrón EARS: Optional

Donde el organizador eligió no participar, el sistema NO DEBE generarle cuotas.

✅ **Ejemplo:** Jorge no participa en una junta de 10, y cada ronda tiene 10 cuotas, ninguna a su nombre.

❌ **Contraejemplo:** a Jorge le llega un recordatorio de una cuota de S/ 1,000.00.

---

**RN-045** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Business Analyst, derivada de F-04

Patrón EARS: Event-driven

Cuando el sistema genera una cuota, DEBE asignarle el estado "Pendiente".

✅ **Ejemplo:** al crear las 12 rondas, cada cuota nueva queda con `status = "pending"`.

❌ **Contraejemplo:** una cuota nueva queda con `status = "paid"` o sin estado.

---

**RN-046** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.4)

Patrón EARS: Optional

Donde la frecuencia es semanal, el sistema DEBE fijar el vencimiento de cada ronda 7 días después del vencimiento de la ronda anterior.

✅ **Ejemplo:** la ronda 1 vence el `2026-12-05` y la ronda 2 el `2026-12-12`.

❌ **Contraejemplo:** la ronda 2 vence el `2026-12-14`.

---

**RN-047** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-027)

Patrón EARS: Optional

Donde la frecuencia es quincenal, el sistema DEBE fijar el vencimiento de cada ronda 15 días después del vencimiento de la ronda anterior.

✅ **Ejemplo:** la ronda 1 vence el `2026-12-01`, la ronda 2 el `2026-12-16` y la ronda 3 el `2026-12-31`.

❌ **Contraejemplo:** la ronda 2 vence el `2026-12-15` porque se usan fechas fijas los días 1 y 15.

---

**RN-048** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-027)

Patrón EARS: Optional

Donde la frecuencia es cada N días, el sistema DEBE fijar el vencimiento de cada ronda N días después del vencimiento de la ronda anterior.

✅ **Ejemplo:** con N = 10, la ronda 1 vence el `2026-12-01` y la ronda 2 el `2026-12-11`.

❌ **Contraejemplo:** con N = 10, la ronda 2 vence el `2026-12-10`.

---

**RN-049** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-027)

Patrón EARS: Optional

Donde la frecuencia es mensual, el sistema DEBE fijar el vencimiento de la ronda k en el mismo día del mes que la ronda 1, k − 1 meses después.

✅ **Ejemplo:** la ronda 1 vence el `2027-01-15`, la ronda 2 el `2027-02-15` y la ronda 3 el `2027-03-15`.

❌ **Contraejemplo:** la ronda 2 vence el `2027-02-14` porque se sumaron 30 días.

---

**RN-050** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-027)

Patrón EARS: Unwanted

Si el mes de una ronda mensual no tiene el día del mes de la ronda 1, entonces el sistema DEBE fijar el vencimiento en el último día de ese mes.

✅ **Ejemplo:** la ronda 1 vence el `2027-01-31`, la ronda 2 el `2027-02-28`, la ronda 3 el `2027-03-31` y la ronda 4 el `2027-04-30`.

❌ **Contraejemplo:** la ronda 2 vence el `2027-03-03`, o la ronda 3 vence el `2027-03-28` porque se tomó el día de la ronda 2.

---

**RN-051** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Alcance (F-04), Constitución (PRINCIPIO-006)

Patrón EARS: Unwanted

Si un usuario que no es el organizador de la junta intenta marcar una cuota como pagada, entonces el sistema DEBE rechazar la acción.

✅ **Ejemplo:** Lucía envía `POST /contributions/{id}/payment` y recibe `403`.

❌ **Contraejemplo:** el botón está oculto para Lucía, pero `POST /contributions/{id}/payment` responde `200` y la cuota pasa a `paid`.

---

**RN-052** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Alcance (F-04)

Patrón EARS: Event-driven

Cuando el organizador marca una cuota como pagada, el sistema DEBE guardar la fecha de pago que él indica.

✅ **Ejemplo:** Carmen marca la cuota de Lucía con fecha de pago `2026-11-28` y se guarda `paid_on = 2026-11-28`.

❌ **Contraejemplo:** se guarda la fecha en que Carmen hizo el registro, `2026-12-01`, en lugar de la fecha que indicó.

---

**RN-053** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Alcance (F-04)

Patrón EARS: Event-driven

Cuando el organizador marca una cuota como pagada, el sistema DEBE cambiar el estado de esa cuota a "Pagada".

✅ **Ejemplo:** la cuota de Lucía pasa de `pending` a `paid`.

❌ **Contraejemplo:** la cuota sigue en `pending` después del registro.

---

**RN-054** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-020)

Patrón EARS: Unwanted

Si la fecha de pago indicada es posterior a la fecha actual en America/Lima, entonces el sistema DEBE rechazar el registro del pago.

✅ **Ejemplo:** el `2026-11-28`, Carmen indica la fecha de pago `2026-11-28` y se acepta.

❌ **Contraejemplo:** el `2026-11-28`, se acepta un pago con fecha `2026-11-30`.

---

**RN-055** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-020)

Patrón EARS: Event-driven

Cuando se registra un pago con fecha de pago igual o anterior a la fecha de vencimiento de la cuota, el sistema DEBE clasificarlo como "a tiempo".

✅ **Ejemplo:** la cuota vence el `2026-11-30` y la fecha de pago es `2026-11-30`. El pago queda "a tiempo".

❌ **Contraejemplo:** el mismo pago queda "atrasado" porque Carmen lo registró el `2026-12-01`.

---

**RN-056** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-020)

Patrón EARS: Event-driven

Cuando se registra un pago con fecha de pago posterior a la fecha de vencimiento de la cuota, el sistema DEBE clasificarlo como "atrasado".

✅ **Ejemplo:** la cuota vence el `2026-11-30` y la fecha de pago es `2026-12-02`. El pago queda "atrasado".

❌ **Contraejemplo:** el pago con fecha `2026-12-02` queda "a tiempo".

---

**RN-057** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Event-driven

Cuando el organizador desmarca un pago, el sistema DEBE guardar un evento de corrección con la cuota, el usuario que la hizo y la fecha y hora en America/Lima.

✅ **Ejemplo:** se guarda `{"contribution_id":"c_789","corrected_by":"user_123","corrected_at":"2026-12-02T08:15:40-05:00"}`.

❌ **Contraejemplo:** el `2026-12-02` la cuota `c_789` vuelve a `pending`, y la tabla `payment_corrections` sigue con 0 filas para esa cuota.

---

**RN-058** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Ubiquitous

El sistema NO DEBE borrar el registro original de un pago corregido.

✅ **Ejemplo:** después de la corrección, el historial muestra el pago del `2026-11-28` y, debajo, la corrección del `2026-12-02`.

❌ **Contraejemplo:** se ejecuta `DELETE FROM payments WHERE id = …` al desmarcar.

---

**RN-059** | Categoría: Cuotas y Pagos | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Event-driven

Cuando el organizador desmarca un pago, el sistema DEBE devolver la cuota al estado "Pendiente".

✅ **Ejemplo:** la cuota de Lucía pasa de `paid` a `pending`.

❌ **Contraejemplo:** la cuota sigue en `paid` después de la corrección.

---

**RN-060** | Categoría: Cuotas y Pagos | Prioridad: SHOULD | Fuente: Alcance (F-08)

Patrón EARS: Event-driven

Cuando un participante informa el pago de una de sus cuotas, el sistema DEBE cambiar el estado de esa cuota a "Por confirmar".

✅ **Ejemplo:** Lucía pulsa "Informar mi pago" en su cuota de la ronda 3 y la cuota pasa a `awaiting_confirmation`.

❌ **Contraejemplo:** la cuota pasa directo a `paid` sin que Jorge la confirme.

---

**RN-061** | Categoría: Cuotas y Pagos | Prioridad: SHOULD | Fuente: Business Analyst, derivada de F-08

Patrón EARS: Unwanted

Si un participante intenta informar el pago de una cuota de otro participante, entonces el sistema DEBE rechazar la acción.

✅ **Ejemplo:** Lucía envía `POST /contributions/{id_de_Pedro}/report` y recibe `403`.

❌ **Contraejemplo:** Lucía envía `POST /contributions/{id_de_Pedro}/report`, recibe `200` y la cuota de Pedro pasa a `awaiting_confirmation`.

---

**RN-062** | Categoría: Cuotas y Pagos | Prioridad: SHOULD | Fuente: Alcance (F-08)

Patrón EARS: Event-driven

Cuando el organizador confirma un pago informado, el sistema DEBE cambiar el estado de la cuota a "Pagada".

✅ **Ejemplo:** Jorge confirma el pago que informó Lucía y la cuota pasa de `awaiting_confirmation` a `paid`.

❌ **Contraejemplo:** la cuota sigue en `awaiting_confirmation` después de la confirmación.

---

**RN-063** | Categoría: Cuotas y Pagos | Prioridad: SHOULD | Fuente: Product Owner (2026-11-14, PREG-017)

Patrón EARS: Event-driven

Cuando el organizador rechaza un pago informado, el sistema DEBE devolver la cuota al estado "Pendiente".

✅ **Ejemplo:** Jorge rechaza el pago que informó Lucía y la cuota pasa de `awaiting_confirmation` a `pending`.

❌ **Contraejemplo:** la cuota queda en un estado `rejected` que no existe en el glosario, o pasa a `paid`.

---

**RN-064** | Categoría: Cuotas y Pagos | Prioridad: SHOULD | Fuente: Product Owner (2026-11-14, PREG-017)

Patrón EARS: State-driven

Mientras el organizador no responda a un pago informado, el sistema DEBE mantener la cuota en el estado "Por confirmar".

✅ **Ejemplo:** Lucía informó su pago el `2026-11-28`. El `2027-01-10` Jorge todavía no responde y la cuota sigue en `awaiting_confirmation`.

❌ **Contraejemplo:** el `2026-12-05` la cuota pasa sola a `paid` o a `pending` porque se cumplió un plazo.

---

**RN-065** | Categoría: Cuotas y Pagos | Prioridad: SHOULD | Fuente: Product Owner (2026-11-14, PREG-017)

Patrón EARS: Ubiquitous

El formulario para informar un pago NO DEBE incluir un campo para adjuntar archivos.

✅ **Ejemplo:** el formulario "Informar mi pago" solo tiene el botón "Informar pago".

❌ **Contraejemplo:** el formulario pide "Adjunte la captura de su Yape".

---

### 2.5 Notificaciones

---

**RN-066** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-026)

Patrón EARS: Ubiquitous

El sistema DEBE enviar cada recordatorio a las 09:00 en America/Lima.

✅ **Ejemplo:** el recordatorio del `2026-11-27` sale a las `2026-11-27T09:00:00-05:00`.

❌ **Contraejemplo:** el recordatorio sale a las `2026-11-27T09:00:00Z` (04:00 en Lima).

---

**RN-067** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Alcance (F-06), Constitución (PRINCIPIO-007)

Patrón EARS: Ubiquitous

El sistema DEBE enviar cada recordatorio al correo de la cuenta del participante.

✅ **Ejemplo:** Lucía creó su cuenta con `lucia@example.com`, y el recordatorio del `2026-11-27` llega a `lucia@example.com`.

❌ **Contraejemplo:** el recordatorio de Lucía del `2026-11-27` se envía a `jorge@example.com` para que Jorge se lo reenvíe.

---

**RN-068** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.3, PREG-025)

Patrón EARS: Event-driven

Cuando faltan para el vencimiento de una cuota "Pendiente" tantos días como los días de aviso previo de la junta, el sistema DEBE enviar un recordatorio al participante de esa cuota.

✅ **Ejemplo:** con 3 días de aviso, una cuota que vence el `2026-11-30` genera un recordatorio el `2026-11-27`.

❌ **Contraejemplo:** el primer recordatorio sale el `2026-11-29`, o la cuota ya está "Pagada" el `2026-11-25` y el recordatorio sale igual el `2026-11-27`.

---

**RN-069** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Product Owner (02-alcance.md §7.3)

Patrón EARS: Event-driven

Cuando llega la fecha de vencimiento de una cuota que no está en el estado "Pagada", el sistema DEBE enviar un recordatorio al participante de esa cuota.

✅ **Ejemplo:** la cuota de Pedro vence el `2026-11-30` y sigue "Pendiente". El `2026-11-30` Pedro recibe un recordatorio.

❌ **Contraejemplo:** el `2026-11-30` no sale ningún recordatorio para la cuota "Pendiente" de Pedro.

---

**RN-070** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-026)

Patrón EARS: State-driven

Mientras una cuota vencida no esté en el estado "Pagada", el sistema DEBE enviar un recordatorio al participante cada 2 días contados desde la fecha de vencimiento.

✅ **Ejemplo:** la cuota vence el `2026-11-30` y sigue sin pagar. Salen recordatorios el `2026-12-02`, el `2026-12-04`, el `2026-12-06`, el `2026-12-08` y el `2026-12-10`.

❌ **Contraejemplo:** salen recordatorios todos los días desde el `2026-12-01`.

---

**RN-071** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Product Owner (2026-11-14, PREG-026)

Patrón EARS: Unwanted

Si una cuota ya recibió 5 recordatorios después de su fecha de vencimiento, entonces el sistema NO DEBE enviar más recordatorios de esa cuota.

✅ **Ejemplo:** el último recordatorio de la cuota que venció el `2026-11-30` sale el `2026-12-10`, y el `2026-12-12` no sale ninguno.

❌ **Contraejemplo:** el `2026-12-12` sale un sexto recordatorio posterior al vencimiento.

---

**RN-072** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Alcance (F-06)

Patrón EARS: Unwanted

Si una cuota está en el estado "Pagada", entonces el sistema NO DEBE enviar recordatorios de esa cuota.

✅ **Ejemplo:** Carmen registra el pago de Pedro el `2026-12-03`, y el recordatorio del `2026-12-04` ya no sale.

❌ **Contraejemplo:** Pedro recibe el `2026-12-04` "Su cuota está vencida" aunque su cuota ya figura como "Pagada".

---

**RN-073** | Categoría: Notificaciones | Prioridad: SHOULD | Fuente: Alcance (F-07)

Patrón EARS: Optional

Donde el participante activó las notificaciones push en su navegador, el sistema DEBE enviarle cada recordatorio también como notificación push.

✅ **Ejemplo:** Lucía activó el push en Chrome para Android. El `2026-11-27` a las 09:00 recibe el correo y la notificación push.

❌ **Contraejemplo:** Lucía activó el push, y el `2026-11-27` a las 09:00 solo recibe el correo.

---

### 2.6 Seguridad

---

**RN-074** | Categoría: Seguridad | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Unwanted

Si la contraseña ingresada al crear la cuenta tiene menos de 8 caracteres, entonces el sistema DEBE rechazar la creación de la cuenta.

✅ **Ejemplo:** la contraseña "Junta2026" (9 caracteres) se acepta.

❌ **Contraejemplo:** la contraseña "abc123" (6 caracteres) se acepta.

---

**RN-075** | Categoría: Seguridad | Prioridad: MUST | Fuente: Product Owner (2026-11-14)

Patrón EARS: Unwanted

Si una cuenta acumula 5 intentos fallidos de inicio de sesión seguidos, entonces el sistema DEBE bloquear el inicio de sesión de esa cuenta durante 900 segundos.

✅ **Ejemplo:** el quinto intento fallido es a las `10:00:00`. A las `10:14:59` la contraseña correcta se rechaza, y a las `10:15:00` se acepta.

❌ **Contraejemplo:** a las `10:01:00` un sexto intento con la contraseña correcta inicia sesión.

---

**RN-076** | Categoría: Seguridad | Prioridad: MUST | Fuente: Business Analyst, derivada de RN-075

Patrón EARS: Event-driven

Cuando un usuario inicia sesión con éxito, el sistema DEBE reiniciar a 0 el contador de intentos fallidos de esa cuenta.

✅ **Ejemplo:** Lucía falla 3 veces, entra en el cuarto intento y el contador vuelve a 0. Después falla 2 veces y la cuenta no se bloquea.

❌ **Contraejemplo:** la cuenta se bloquea porque se sumaron los 3 fallos de ayer y los 2 de hoy.

---

**RN-077** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-006)

Patrón EARS: Ubiquitous

El servidor DEBE comprobar que el usuario es el organizador de la junta antes de ejecutar una acción de gestión de esa junta.

✅ **Ejemplo:** Lucía envía `POST /juntas/{id}/invite-code` para regenerar el código y recibe `403`.

❌ **Contraejemplo:** la interfaz oculta el botón "Regenerar código" a Lucía, pero `POST /juntas/{id}/invite-code` responde `200` y el código cambia de `K7MP4XR2` a `T9QW3HZ5`.

---

**RN-078** | Categoría: Seguridad | Prioridad: SHOULD | Fuente: Constitución (PRINCIPIO-005), Alcance (F-11)

Patrón EARS: Optional

Donde el usuario activó el segundo factor, el sistema NO DEBE iniciar su sesión sin un código de verificación válido.

✅ **Ejemplo:** Jorge activó el segundo factor el `2026-11-14`. El `2026-11-15` ingresa su contraseña correcta y la app le pide el código de 6 dígitos antes de entrar.

❌ **Contraejemplo:** el `2026-11-15` Jorge, con el segundo factor activado, ingresa solo su contraseña y `POST /sessions` responde `200` sin pedirle el código.

---

**RN-079** | Categoría: Seguridad | Prioridad: SHOULD | Fuente: Constitución (PRINCIPIO-005), Product Owner (2026-11-14, PREG-023)

Patrón EARS: Event-driven

Cuando un usuario con el segundo factor activado ingresa su contraseña correcta, el sistema DEBE enviar a su correo un código de verificación de 6 dígitos.

✅ **Ejemplo:** Jorge recibe en su correo el código `482915`.

❌ **Contraejemplo:** Jorge recibe un código de 4 dígitos, `4829`, o lo recibe por SMS.

---

**RN-080** | Categoría: Seguridad | Prioridad: SHOULD | Fuente: Constitución (PRINCIPIO-005), Product Owner (2026-11-14, PREG-023)

Patrón EARS: Unwanted

Si pasaron más de 600 segundos desde el envío de un código de verificación, entonces el sistema DEBE rechazar ese código.

✅ **Ejemplo:** el código sale a las `10:00:00`. Se acepta a las `10:09:58` y se rechaza a las `10:10:01`.

❌ **Contraejemplo:** el código enviado a las `10:00:00` se acepta a las `10:25:00`.

---

**RN-081** | Categoría: Seguridad | Prioridad: SHOULD | Fuente: Constitución (PRINCIPIO-005), Product Owner (2026-11-14, PREG-023)

Patrón EARS: Unwanted

Si un código de verificación acumula 5 intentos fallidos, entonces el sistema DEBE anular ese código.

✅ **Ejemplo:** Jorge ingresa 5 códigos equivocados. En el sexto intento escribe `482915`, que era el correcto, y se rechaza porque el código está anulado.

❌ **Contraejemplo:** en el sexto intento `482915` se acepta y Jorge inicia sesión.

---

### 2.7 Datos

---

**RN-082** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-007), Alcance (F-01)

Patrón EARS: Unwanted

Si el usuario no marcó la casilla de aceptación de la política de privacidad y del consentimiento para recibir notificaciones, entonces el sistema NO DEBE crear su cuenta.

✅ **Ejemplo:** Lucía marca la casilla, pulsa "Crear cuenta" y la cuenta se crea.

❌ **Contraejemplo:** una petición directa a `POST /accounts` con `consent = false` crea la cuenta.

---

**RN-083** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-007)

Patrón EARS: Event-driven

Cuando se crea una cuenta, el sistema DEBE guardar la versión de la política de privacidad que aceptó el usuario.

✅ **Ejemplo:** se guarda `policy_version = "1.0"`.

❌ **Contraejemplo:** la cuenta se crea sin `policy_version`.

---

**RN-084** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-007)

Patrón EARS: Event-driven

Cuando se crea una cuenta, el sistema DEBE guardar la fecha y hora de la aceptación del consentimiento en America/Lima.

✅ **Ejemplo:** se guarda `consent_accepted_at = "2026-11-14T10:32:05-05:00"`.

❌ **Contraejemplo:** solo se guarda la fecha `2026-11-14`, sin la hora.

---

**RN-085** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-003)

Patrón EARS: Unwanted

Si el DNI ingresado no cumple el patrón `^\d{8}$`, entonces el sistema DEBE rechazarlo.

✅ **Ejemplo:** el DNI `45678912` se acepta.

❌ **Contraejemplo:** se aceptan los DNI `4567891A` o `4567891`.

---

**RN-086** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-003)

Patrón EARS: Unwanted

Si el celular ingresado no cumple el patrón `^9\d{8}$`, entonces el sistema DEBE rechazarlo.

✅ **Ejemplo:** el celular `987654321` se acepta.

❌ **Contraejemplo:** se acepta el celular `812345678`.

---

**RN-087** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-009)

Patrón EARS: Event-driven

Cuando el dispositivo recupera la conexión, la app DEBE enviar al servidor los cambios guardados sin conexión en el orden en que se hicieron.

✅ **Ejemplo:** sin red, Carmen registra el pago de Lucía a las `18:40` y el de Pedro a las `18:42`. Al reconectar, el servidor recibe primero el de Lucía y después el de Pedro, cada uno con su hora original.

❌ **Contraejemplo:** el servidor recibe primero el pago de Pedro de las `18:42` y después el de Lucía de las `18:40`, o el pago de Lucía de las `18:40` se pierde.

---

### 2.8 UX

---

**RN-088** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-007)

Patrón EARS: Ubiquitous

La casilla de consentimiento DEBE aparecer desmarcada al abrir el formulario de creación de cuenta.

✅ **Ejemplo:** Lucía abre "Crear cuenta" y la casilla aparece con `checked = false`.

❌ **Contraejemplo:** la casilla aparece con `checked = true` al abrir el formulario.

---

**RN-089** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-007)

Patrón EARS: State-driven

Mientras la casilla de consentimiento esté desmarcada, el botón "Crear cuenta" DEBE estar deshabilitado.

✅ **Ejemplo:** Lucía completa su nombre, su correo y la contraseña "Junta2026" sin marcar la casilla, y el botón "Crear cuenta" sigue con `disabled = true`.

❌ **Contraejemplo:** con la casilla en `checked = false`, el botón "Crear cuenta" tiene `disabled = false`.

---

**RN-090** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-002)

Patrón EARS: Ubiquitous

La interfaz DEBE tratar al usuario de "usted".

✅ **Ejemplo:** "Registre su pago" o "Su turno: 7".

❌ **Contraejemplo:** "¿Ya pagaste tu cuota?".

---

**RN-091** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-003)

Patrón EARS: Ubiquitous

La interfaz DEBE mostrar cada monto con el formato `S/ 1,250.50`.

✅ **Ejemplo:** el valor guardado `360000` se muestra como "S/ 3,600.00".

❌ **Contraejemplo:** se muestra "3600", "S/3600.0" o "PEN 3,600.00".

---

**RN-092** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-003)

Patrón EARS: Ubiquitous

La interfaz DEBE mostrar cada fecha con el formato DD/MM/AAAA.

✅ **Ejemplo:** la fecha `2026-11-30` se muestra como "30/11/2026".

❌ **Contraejemplo:** se muestra "2026-11-30" o "11/30/2026".

---

**RN-093** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-003)

Patrón EARS: Ubiquitous

La interfaz DEBE mostrar cada fecha y hora convertida a la zona America/Lima.

✅ **Ejemplo:** el valor `2026-12-01T03:30:00Z` se muestra como "30/11/2026 22:30".

❌ **Contraejemplo:** el mismo valor se muestra como "01/12/2026 03:30".

---

**RN-094** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-009)

Patrón EARS: State-driven

Mientras el dispositivo no tenga conexión, la app DEBE mostrar los últimos datos sincronizados.

✅ **Ejemplo:** la última sincronización fue el `2026-11-14T18:45:00-05:00`. Lucía abre la app en modo "Offline" y ve "Su turno: 7" y su ronda 3 "Pendiente", tal como estaban a esa hora.

❌ **Contraejemplo:** la app muestra la pantalla de error del navegador "Sin conexión a internet".

---

**RN-095** | Categoría: UX | Prioridad: MUST | Fuente: Constitución (PRINCIPIO-009)

Patrón EARS: State-driven

Mientras el dispositivo no tenga conexión, la app DEBE mostrar la fecha y hora de la última sincronización.

✅ **Ejemplo:** la app muestra "Sin conexión. Última sincronización: 14/11/2026 18:45".

❌ **Contraejemplo:** la última sincronización fue el `2026-11-14T18:45:00-05:00`, y en modo "Offline" la app muestra los datos sin el texto "Última sincronización: 14/11/2026 18:45".

---

## 3. Temas pendientes

Estas reglas no se escribieron, o se escribieron solo en parte, porque falta una decisión. Cuando se resuelvan, las RN nuevas toman el siguiente número libre (RN-096 en adelante).

| Tema | Qué falta decidir | Estado |
|---|---|---|
| Conflictos de cambios sin conexión | Qué cambio vale si el mismo dato se modifica sin red desde dos dispositivos | [REQUIERE DECISIÓN] (PREG-005). Solo está decidido que el sorteo exige conexión (RN-029) |
| Retiro del consentimiento | Si el usuario puede retirarlo y qué pasa con sus recordatorios | [REQUIERE DECISIÓN] (PREG-009) |
| Fecha de un pago informado | Qué fecha de pago queda registrada cuando el participante informa su pago (F-08) | [REQUIERE DECISIÓN] (PREG-017) |
| DNI de los demás | Decisión definitiva entre completo, parcialmente oculto o no visible. Mientras tanto aplica RN-023 | [REQUIERE DECISIÓN] (PREG-003) |
| Contenido de las reglas escritas | Qué reglas registra el organizador y si son obligatorias | [REQUIERE DECISIÓN] (PREG-016) |
| Política de privacidad | Texto y requisitos de la Ley N.° 29733 | [REQUIERE DECISIÓN] (PREG-001) |
| Frecuencia de cada 1 día | RN-008 permite N = 1, pero con RN-010 (aviso mínimo de 1 día) y RN-012 (aviso menor que el periodo) no se puede crear esa junta | [REQUIERE DECISIÓN] (PREG-028) |
| Vencimiento antes del sorteo | Qué pasa si llega la fecha de vencimiento de la ronda 1 y la junta todavía tiene cupos libres o no hizo el sorteo (RN-009 y RN-027 lo permiten) | [REQUIERE DECISIÓN] (PREG-029) |
| Recordatorios de cuotas "Por confirmar" | Según F-06, RN-069 y RN-070, una cuota "Por confirmar" sigue recibiendo recordatorios porque no está "Pagada". Falta confirmar que ese es el comportamiento deseado | [REQUIERE DECISIÓN] (PREG-030) |
