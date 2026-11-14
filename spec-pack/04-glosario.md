# Glosario de Mi Junta

Versión: 0.2

Lenguaje ubicuo del proyecto. Todo el spec-pack, las HU, las pantallas y el código usan estos términos con este significado. La columna "Identificador en código" da el nombre en inglés que se usa en variables, tablas, columnas y rutas de API (PRINCIPIO-002). La única excepción es `junta`, que se usa tal cual. La columna "No usar" lista términos que no deben aparecer en su lugar.

**Convención de nombres:** las tablas van en plural y en `snake_case` (`juntas`, `contributions`, `payments`, `payment_corrections`, `draws`, `turn_assignments`). Las columnas y los campos de la API van en singular y en `snake_case`.

Fuente: 00-constitucion.md v1.3, 01-project-brief.md v0.3, 02-alcance.md v0.2 y 03-reglas-de-negocio.md v0.2.

---

## Términos

### Junta y participantes

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Junta** | Sistema de ahorro rotativo registrado en Mi Junta. Un grupo de participantes paga una cuota en cada ronda, y en cada ronda uno de ellos recibe el pozo. | `junta` (tabla `juntas`) | — |
| **Estado de la junta** | Etapa de la junta: "Abierta" (`open`) si tiene cupos libres y no fijó su orden de turnos; "Completa" (`full`) si no tiene cupos libres y no fijó su orden; "En curso" (`in_progress`) desde que se fija el orden de turnos; y "Terminada" (`finished`) cuando todas sus cuotas están "Pagada" (RN-099 a RN-104). | `junta_status` | "activa" como estado (ver "Junta activa"), "cerrada" |
| **Usuario** | Persona que tiene una cuenta en Mi Junta. | `user` | "cliente" |
| **Cuenta** | Registro de un usuario con su nombre, su correo verificado y su contraseña, y opcionalmente su DNI y su celular (RN-146 a RN-151). | `user` (tabla `users`) | "perfil" como sinónimo de cuenta |
| **Sesión** | Periodo en que un usuario tiene iniciada su cuenta en un dispositivo. Se cierra a los 30 días sin uso (RN-159). | `session` | — |
| **Organizador** | Usuario que crea una junta y la gestiona: comparte el código de invitación, fija el orden de turnos y registra los pagos. Puede ser también participante si así lo elige (RN-006). No puede dejar su junta (RN-115). | `organizer` | "administrador de la junta" (PREG-010, resuelta) |
| **Participante** | Miembro de una junta que ocupa un cupo, paga una cuota en cada ronda y recibe el pozo en la ronda de su turno. | `participant` | "socio", "jugador" |
| **Miembro** | Todo usuario que pertenece a una junta: sus participantes y su organizador, participe este o no. | `member` | "integrante" |
| **Cupo** | Lugar para un participante dentro de una junta. Una junta tiene tantos cupos como su cantidad de participantes (de 2 a 50, RN-005). | `slot` | "vacante" |
| **Dejar la junta** | Que un participante salga por su cuenta o que el organizador lo quite. Solo es posible antes de fijar el orden de turnos (RN-111 a RN-114). | `leave` / `remove_participant` | "renunciar", "expulsar" |
| **Código de invitación** | Código de 8 caracteres de `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` con el que un usuario con cuenta se une a una junta (RN-015). Se rechaza mientras la junta no tenga cupos libres (RN-018) y se anula para siempre al fijarse el orden de turnos o al regenerarse (RN-019, RN-020, RN-129). Ningún código se reutiliza (RN-016). | `invite_code` | "link", "contraseña de la junta" |
| **Acción de gestión** | Acción que solo puede hacer el organizador de la junta, validada en el servidor (RN-077): editar la junta, regenerar el código de invitación, quitar a un participante, ejecutar el sorteo, asignar el orden sin sorteo, registrar un pago, desmarcar un pago, confirmar o rechazar un pago informado y escribir las reglas de la junta. | `management_action` | — |
| **Reglas de la junta** | Texto libre y opcional de hasta 2,000 caracteres que escribe el organizador sobre atrasos, multas o retiros, visible para todos los miembros. Solo se edita antes de fijar el orden de turnos. La app no las aplica (F-09, RN-014, RN-110). | `junta_rules` | "reglamento" |

### Rondas, turnos y sorteo

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Ronda** | Cada uno de los periodos de una junta. Tiene una fecha de vencimiento y un receptor del pozo. Una junta tiene una ronda por participante, y las rondas se crean al fijar el orden de turnos (RN-013). | `round` | "mes" (las rondas pueden ser semanales o quincenales), "vuelta" |
| **Ronda actual** | La ronda de número más bajo cuya fecha de vencimiento es igual o posterior a la fecha actual en America/Lima. Si todas las rondas ya vencieron, es la última. Antes de fijar el orden de turnos no hay ronda actual. | `current_round` | "ronda vigente" |
| **Turno** | Número de la ronda en que un participante recibe el pozo. Es su posición en el resultado del sorteo (RN-036), o la que asignó el organizador en el orden sin sorteo (F-10). | `turn_number` | "puesto" |
| **Receptor del pozo** | Participante cuyo turno coincide con el número de la ronda (RN-037). | `pot_recipient` | "ganador" |
| **Fijar el orden de turnos** | Evento que asigna los turnos de una junta, por sorteo (F-03) o por asignación manual (F-10). Pasa una sola vez por junta y exige todos los cupos llenos (RN-027, RN-125, RN-126). | `fix_turn_order` | — |
| **Sorteo** | Forma de fijar el orden de turnos que ejecuta el organizador, una sola vez por junta, con una semilla y el algoritmo `fisher-yates-v1` (PRINCIPIO-008, anexo A de 03). | `draw` | "rifa", "lotería" |
| **Asignación manual del orden** | Forma de fijar el orden de turnos en la que el organizador da a cada participante un turno distinto, por ejemplo según la necesidad (F-10, RN-127). Es inmutable (RN-128). | `turn_assignment` (tabla `turn_assignments`) | "orden a dedo" |
| **Lista de entrada** | Identificadores de usuario de los participantes, ordenados por el momento en que cada uno ocupó su cupo, que recibe el algoritmo del sorteo (RN-123). | `input` | "lista de nombres" |
| **Resultado del sorteo** | Lista de entrada reordenada por el algoritmo. La posición de cada participante, contando desde 1, es su turno (RN-036). | `result` | — |
| **Semilla** | Valor de 256 bits generado con un CSPRNG que, junto con la lista de entrada, determina el resultado del sorteo (RN-031). | `seed` | — |
| **Versión del algoritmo** | Nombre de la versión exacta del algoritmo con que se hizo un sorteo. Hoy solo existe `fisher-yates-v1` (anexo A de 03). | `algorithm_version` | — |
| **Registro del sorteo** | Registro inmutable de un sorteo: semilla, versión del algoritmo, lista de entrada, resultado, usuario que lo ejecutó (`executed_by`) y fecha y hora (`executed_at`) (RN-034, RN-035). Todo miembro lo puede ver (RN-121). | `draws` (tabla) | "log del sorteo" |
| **Cambio de turno** | Cambio de turno posterior a fijar el orden, que se guarda como un evento aparte (PRINCIPIO-008). Queda para F-13 (Could) y no está en esta versión. | `turn_change` | "reasignación" |

### Cuotas y pagos

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Monto de la cuota** | Monto que fija el organizador para la junta y que paga cada participante en cada ronda. Va de S/ 10.00 a S/ 5,000.00 y es múltiplo de S/ 0.10 (RN-003, RN-004). | `contribution_amount_cents` (columna de `juntas`) | "monto de la junta", "aporte" |
| **Cuota** | Obligación de un participante de pagar el monto de la cuota en una ronda. Tiene un estado. Se generan al fijar el orden de turnos (RN-042). | `contribution` (tabla `contributions`) | "pago" (el pago es el registro de que la cuota se pagó), "aporte" |
| **Estado de la cuota** | Situación de una cuota: "Pendiente" (`pending`) si no está pagada, "Por confirmar" (`awaiting_confirmation`) si el participante informó su pago y el organizador no respondió, y "Pagada" (`paid`) si el pago quedó registrado o confirmado. | `status` | "Cancelada" como sinónimo de "Pagada", "Rechazada" (el rechazo devuelve la cuota a "Pendiente", RN-063), "estado de pago" |
| **Próxima cuota** | Cuota de un participante en la ronda siguiente a la ronda actual. Si la ronda actual es la última, no hay próxima cuota (RN-119). | `next_due_date`, `next_status` | "próximo pago" |
| **Pozo** | Monto que recibe el receptor del pozo en una ronda. Es igual al monto de la cuota multiplicado por la cantidad de participantes (RN-041). | `pot` | "premio", "monto de la junta" |
| **Frecuencia** | Cada cuánto vencen las cuotas: semanal (7 días), quincenal (15 días), mensual (el mismo día de cada mes, o el último día si ese mes no lo tiene) o cada N días, con N de 2 a 60 (RN-007, RN-008, RN-049, RN-050). | `frequency` | "periodicidad" |
| **Periodo** | Cantidad de días entre el vencimiento de una ronda y el de la siguiente: 7 en semanal, 15 en quincenal, N en cada N días, y de 28 a 31 en mensual según el mes. Para validar el aviso previo, el periodo mensual se toma como 28 (RN-012). | `period_days` | — |
| **Fecha de vencimiento** | Último día, en America/Lima, en que un participante puede pagar la cuota de una ronda y que el pago siga contando como a tiempo. | `due_date` | "fecha límite", "deadline" |
| **Días de aviso previo** | Cuántos días antes de la fecha de vencimiento se envía el primer recordatorio. Va de 1 a 7, vale 3 por defecto y es menor que el periodo (RN-010 a RN-012, RN-098). | `reminder_lead_days` | "anticipación" |
| **Pago** | Registro de que un participante pagó una cuota fuera de la app (Yape, Plin, efectivo u otro medio). Lo hace el organizador, o lo confirma a partir de un pago informado. Mi Junta no mueve dinero (PRINCIPIO-004). | `payment` (tabla `payments`) | "cobro", "transferencia" |
| **Pago vigente** | Último pago de una cuota que no fue corregido. Es el que cuenta para el estado de la cuota y para KPI-03 y KPI-04. | — | — |
| **Fecha de pago** | Fecha en que se pagó una cuota, indicada por el organizador al registrar el pago o por el participante al informarlo. No puede ser posterior a la fecha actual ni anterior a la creación de la junta, en America/Lima (RN-052, RN-054, RN-132, RN-137). No se edita (RN-134). | `paid_on` | "fecha de registro" (es otro dato) |
| **Fecha de registro** | Fecha y hora en que el organizador registró el pago en la app. Puede ser posterior a la fecha de pago. | `recorded_at` | "fecha de pago" |
| **Pago a tiempo** | Pago cuya fecha de pago es igual o anterior a la fecha de vencimiento de la cuota (RN-055). | `is_on_time = true` | "pago puntual" |
| **Pago atrasado** | Pago cuya fecha de pago es posterior a la fecha de vencimiento de la cuota (RN-056). | `is_on_time = false` | "moroso" como nombre de una persona |
| **Pago informado** | Aviso que da un participante, con su fecha de pago, de que pagó su cuota. La cuota queda "Por confirmar" hasta que el organizador lo confirma o lo rechaza (F-08, RN-060 a RN-064, RN-135 a RN-139). | `reported_payment` | "autopago" |
| **Corrección de pago** | Evento que se guarda cuando el organizador desmarca un pago. Guarda la cuota, quién la hizo (`corrected_by`) y la fecha y hora (`corrected_at`), y conserva el pago original (RN-057, RN-058). | `payment_correction` (tabla `payment_corrections`) | "anulación", "borrado de pago" |
| **Céntimo** | Centésima parte de S/ 1. Es la unidad en que se guardan los montos, como número entero (PRINCIPIO-003). La unidad mínima de una cuota es S/ 0.10, es decir, 10 céntimos (RN-004). | `*_cents` (por ejemplo, `amount_cents`) | "decimal", "float" |

### Notificaciones

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Recordatorio** | Mensaje que el sistema envía a un participante sobre una cuota en el estado "Pendiente", por correo y, si lo activó, por notificación push. Un correo y su push cuentan como un recordatorio (RN-142). Sale entre las 09:00 y las 09:15 en America/Lima (RN-066). | `reminder` | "alerta", "cobranza" |
| **Aviso al organizador** | Mensaje que el sistema envía al organizador en el momento en que un participante informa un pago, por correo y, si lo activó, por notificación push (RN-139). | `organizer_notice` | "recordatorio" (es otro mensaje) |

### Seguridad y datos

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Datos personales** | Celular, correo, DNI, fecha de nacimiento y foto de una persona. Ningún usuario recibe los datos personales de otro miembro (PRINCIPIO-006). | — | — |
| **Datos de la junta** | Nombre, turno, cuotas, pagos, correcciones y registro del sorteo. Lo que recibe cada rol depende de PRINCIPIO-006 (RN-022, RN-120, RN-121). | — | — |
| **Consentimiento** | Aceptación de la política de privacidad y del envío de notificaciones, obligatoria para crear una cuenta. Se guardan la versión y la fecha y hora, también en cada versión nueva que el usuario acepta (RN-082 a RN-084, RN-168, RN-169). | `consent`, `policy_version`, `consent_accepted_at` | "términos y condiciones" |
| **Correo verificado** | Correo de una cuenta que el usuario confirmó abriendo el enlace de verificación (RN-152). | `email_verified_at` | — |
| **Segundo factor** | Verificación opcional al iniciar sesión con un código de verificación enviado al correo (F-11, RN-078, RN-165 a RN-167). | `two_factor` | "2FA" en la interfaz |
| **Código de verificación** | Código de 6 dígitos y de un solo uso del segundo factor. Vale 600 segundos y se anula después de 5 intentos fallidos o al enviarse uno nuevo (RN-079 a RN-081, RN-162, RN-163). | `verification_code` | "token", "PIN" |
| **Última sincronización** | Fecha y hora en que la app recibió por última vez los datos del servidor. Se muestra mientras no hay conexión (RN-095). | `last_synced_at` | — |
| **Cambio sin enviar** | Cambio que el usuario hizo sin conexión y que la app todavía no envió al servidor (RN-170 a RN-174, RN-176). Se guarda con la fecha y hora en que se hizo. | `pending_change`, `performed_at` | — |

### Métricas

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Junta activa** | Junta "En curso" en la que todas las cuotas de la ronda 1 están "Pagada" (01-project-brief.md §5). Es una métrica, no un estado guardado. | — | — |
| **Junta al día en un mes** | Junta activa en la que todas las cuotas que vencían en ese mes calendario quedaron pagadas a tiempo (01-project-brief.md §5). | — | — |
| **Junta terminada** | Junta en el estado "Terminada" (01-project-brief.md §5, KPI-06). | — | "junta finalizada" |
