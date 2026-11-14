# Glosario de Mi Junta

Versión: 0.1

Lenguaje ubicuo del proyecto. Todo el spec-pack, las HU, las pantallas y el código usan estos términos con este significado. La columna "Identificador en código" da el nombre en inglés que se usa en variables, tablas, columnas y rutas de API (PRINCIPIO-002). La columna "No usar" lista términos que no deben aparecer en su lugar.

Fuente: 00-constitucion.md v1.2, 01-project-brief.md v0.2, 02-alcance.md v0.1 y 03-reglas-de-negocio.md v0.1.

---

## Términos

| Término | Definición | Identificador en código | No usar |
|---|---|---|---|
| **Junta** | Sistema de ahorro rotativo registrado en Mi Junta. Un grupo de participantes paga una cuota en cada ronda, y en cada ronda uno de ellos recibe el pozo. | `junta` | — |
| **Organizador** | Usuario que crea una junta y la gestiona: comparte el código de invitación, ejecuta el sorteo y registra los pagos. Puede ser también participante si así lo elige al crearla (RN-006). | `organizer` | "administrador de la junta" (PREG-010, resuelta) |
| **Participante** | Miembro de una junta que paga una cuota en cada ronda, entra al sorteo y recibe el pozo en la ronda de su turno. | `participant` | "socio", "jugador" |
| **Miembro** | Todo usuario que pertenece a una junta: sus participantes y su organizador, participe este o no. | `member` | "integrante" |
| **Cupo** | Lugar para un participante dentro de una junta. Una junta tiene tantos cupos como su cantidad de participantes (de 2 a 50, RN-005). | `slot` | "vacante" |
| **Código de invitación** | Código de 8 caracteres de `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` con el que un usuario con cuenta se une a una junta (RN-015). Se anula al llenarse los cupos, al ejecutarse el sorteo o al regenerarse. | `invite_code` | "link", "contraseña de la junta" |
| **Cuota** | Monto que un participante debe pagar en una ronda. Es igual para todos los participantes de la junta, va de S/ 10.00 a S/ 5,000.00 y es múltiplo de S/ 0.10 (RN-003, RN-004, RN-043). | `contribution` | "pago" (el pago es el registro de que la cuota se pagó), "aporte" |
| **Pozo** | Monto que recibe un participante en una ronda. Es igual a la cuota multiplicada por la cantidad de participantes (RN-041). | `pot` | "premio", "monto de la junta" |
| **Ronda** | Cada uno de los periodos de una junta. Tiene una fecha de vencimiento y un participante que recibe el pozo. Una junta tiene una ronda por participante (RN-013). | `round` | "mes" (las rondas pueden ser semanales o quincenales), "vuelta" |
| **Turno** | Número de la ronda en que un participante recibe el pozo. Es su posición en el resultado del sorteo (RN-036), o la que asignó el organizador en el orden sin sorteo (F-10). | `turn_number` | "puesto" |
| **Frecuencia** | Cada cuánto vencen las cuotas: semanal (7 días), quincenal (15 días), mensual (el mismo día de cada mes) o cada N días, con N de 1 a 60 (RN-007, RN-008). | `frequency` | "periodicidad" |
| **Periodo** | Cantidad de días entre el vencimiento de una ronda y el de la siguiente: 7 en semanal, 15 en quincenal, N en cada N días y de 28 a 31 en mensual, según el mes. | `period_days` | — |
| **Fecha de vencimiento** | Último día, en America/Lima, en que un participante puede pagar la cuota de una ronda y que el pago siga contando como a tiempo. | `due_date` | "fecha límite", "deadline" |
| **Días de aviso previo** | Cuántos días antes de la fecha de vencimiento se envía el primer recordatorio. Va de 1 a 7, vale 3 por defecto y es menor que el periodo (RN-010 a RN-012). | `reminder_lead_days` | "anticipación" |
| **Recordatorio** | Mensaje que el sistema envía a un participante sobre una cuota no pagada, por correo y, si lo activó, por notificación push. Sale a las 09:00 America/Lima (RN-066). | `reminder` | "alerta", "cobranza" |
| **Sorteo** | Proceso que ejecuta el organizador, una sola vez por junta, para fijar el orden de turnos con una semilla y el algoritmo Fisher–Yates determinista (PRINCIPIO-008). | `draw` | "rifa", "lotería" |
| **Semilla** | Valor de 256 bits generado con un CSPRNG que, junto con la lista de entrada, determina el resultado del sorteo (RN-031). | `seed` | — |
| **Registro del sorteo** | Registro inmutable de un sorteo: semilla, versión del algoritmo, lista de entrada, resultado, usuario que lo ejecutó y fecha y hora en America/Lima (RN-034, RN-035). | `draws` (tabla) | "log del sorteo" |
| **Estado de la cuota** | Situación de una cuota: "Pendiente" (`pending`) si no está pagada, "Por confirmar" (`awaiting_confirmation`) si el participante informó su pago y el organizador no respondió, y "Pagada" (`paid`) si el pago quedó registrado o confirmado. | `status` | "Cancelada" como sinónimo de "Pagada", "Rechazada" (el rechazo devuelve la cuota a "Pendiente", RN-063) |
| **Pago** | Registro que hace el organizador de que un participante pagó una cuota fuera de la app (Yape, Plin, efectivo u otro medio). Mi Junta no mueve dinero (PRINCIPIO-004). | `payment` | "cobro", "transferencia" |
| **Fecha de pago** | Fecha en que se pagó una cuota, indicada por el organizador al registrar el pago. No puede ser posterior a la fecha actual en America/Lima (RN-052, RN-054). | `paid_on` | "fecha de registro" (es otro dato) |
| **Pago a tiempo** | Pago cuya fecha de pago es igual o anterior a la fecha de vencimiento de la cuota (RN-055). | `is_on_time = true` | "pago puntual" |
| **Pago atrasado** | Pago cuya fecha de pago es posterior a la fecha de vencimiento de la cuota (RN-056). | `is_on_time = false` | "moroso" como nombre de una persona |
| **Pago informado** | Aviso que da un participante de que pagó su cuota, que queda "Por confirmar" hasta que el organizador lo confirma o lo rechaza (F-08, RN-060 a RN-064). | `reported_payment` | "autopago" |
| **Corrección de pago** | Evento que se guarda cuando el organizador desmarca un pago. Guarda la cuota, quién la hizo y la fecha y hora, y conserva el pago original (RN-057, RN-058). | `payment_correction` | "anulación", "borrado de pago" |
| **Reglas de la junta** | Texto que escribe el organizador sobre atrasos, multas o retiros, visible para todos los miembros. La app no las aplica (F-09, RN-014). | `junta_rules` | "reglamento" |
| **Consentimiento** | Aceptación de la política de privacidad y del envío de notificaciones, obligatoria para crear una cuenta. Se guardan la versión y la fecha y hora (RN-082 a RN-084). | `consent`, `policy_version`, `consent_accepted_at` | "términos y condiciones" |
| **Segundo factor** | Verificación opcional al iniciar sesión con un código de verificación enviado al correo (F-11, RN-078). | `two_factor` | "2FA" en la interfaz |
| **Código de verificación** | Código de 6 dígitos del segundo factor. Vale 600 segundos y se anula después de 5 intentos fallidos (RN-079 a RN-081). | `verification_code` | "token", "PIN" |
| **Última sincronización** | Fecha y hora en que la app recibió por última vez los datos del servidor. Se muestra mientras no hay conexión (RN-095). | `last_synced_at` | — |
| **Junta activa** | Junta que tiene registrados como pagados todos los pagos de la primera cuota (01-project-brief.md §5). | `is_active` | — |
| **Junta al día en un mes** | Junta activa en la que todas las cuotas que vencían en ese mes calendario quedaron pagadas a tiempo (01-project-brief.md §5). | — | — |
| **Céntimo** | Centésima parte de S/ 1. Es la unidad en que se guardan los montos, como número entero (PRINCIPIO-003). La unidad mínima de una cuota es S/ 0.10, es decir, 10 céntimos (RN-004). | `*_cents` (por ejemplo, `amount_cents`) | "decimal", "float" |
