# Alcance de Mi Junta

Versión: 0.2
Fecha: 14/11/2026
Estado: Revisado

Fuente: 01-project-brief.md v0.2, 00-constitucion.md v0.2, 03-reglas-de-negocio.md v0.2, las decisiones del Product Owner del 14/11/2026 (sección 7) y las decisiones del Product Owner del 14/11/2026 sobre la auditoría QA (auditorias/qa-clase1.md). El rol que crea y gestiona la junta se llama "organizador" (PREG-010, resuelta).

**IDs de este documento:** `F-NN` identifica una funcionalidad dentro del alcance y `NO-NN` una funcionalidad fuera del alcance. Los supuestos siguen la serie `S-NN` de 01-project-brief.md.

---

## 1. In-scope

### Must have

| ID | Funcionalidad | Descripción | Prioridad | Trazabilidad |
|---|---|---|---|---|
| F-01 | Cuenta con consentimiento | El usuario crea su cuenta con nombre, correo y contraseña e inicia sesión solo después de aceptar la política de privacidad y el consentimiento para recibir notificaciones. Verifica su correo antes de crear una junta o unirse a una, y puede recuperar su contraseña por correo. | M | PRINCIPIO-005, PRINCIPIO-007, PREG-001, PREG-036, PREG-043 |
| F-02 | Crear junta e invitar por código | El organizador crea las juntas que necesite, sin límite, con nombre, cuota en S/, cantidad de participantes, frecuencia, fecha de vencimiento y días de aviso previo, elige si también participa, y comparte un código con el que cada invitado se une después de crear su cuenta. Antes de fijar el orden de turnos puede editar la junta y quitar participantes, y los participantes pueden salir. | M | PRINCIPIO-003, PREG-013, PREG-024, PREG-025, PREG-027, PREG-028, PREG-032, PREG-033, sección 7 |
| F-03 | Sorteo auditable | El organizador ejecuta el sorteo de turnos y el sistema guarda la semilla, la entrada, el resultado, quién lo ejecutó y cuándo, sin sobrescribirlo nunca. Todo miembro puede ver el registro y reproducirlo. Al sortear se crean las rondas y las cuotas. | M | PRINCIPIO-008, PREG-005, PREG-029, PREG-031, PREG-035 |
| F-04 | Registro de pagos | El organizador marca cada cuota como pagada con su fecha, y el dinero se mueve fuera de la app. | M | PRINCIPIO-004, S-02, PREG-020 |
| F-05 | Estado compartido de la junta | Cada miembro ve su propio turno y el estado de sus cuotas, y de los demás solo ve los cuatro datos permitidos: nombre, turno, estado de su cuota en la ronda actual y fecha y estado de su próxima cuota. El organizador ve además todas las cuotas y pagos de su junta, sin datos personales. | M | PRINCIPIO-006, PREG-003, PREG-004, PREG-034, PREG-039 |
| F-06 | Recordatorios por correo | El sistema envía a cada participante un correo antes del vencimiento (según los días de aviso que fijó el organizador), otro el día del vencimiento y hasta 5 después, cada 2 días, mientras su cuota siga "Pendiente". | M | PRINCIPIO-007, PREG-009, PREG-025, PREG-026, PREG-030, PREG-041, R-01, R-11, sección 7 |

> El funcionamiento sin conexión (PRINCIPIO-009), la accesibilidad y el rendimiento (PRINCIPIO-010) y la calidad verificada por tests (PRINCIPIO-011) no son funcionalidades aparte. Son condiciones que cumple cada funcionalidad Must. Sin conexión, todas las funcionalidades Must se pueden consultar, pero solo se permiten las acciones de RN-170: registrar, desmarcar, informar, confirmar o rechazar pagos.

### Should have

| ID | Funcionalidad | Descripción | Prioridad | Por qué no es Must | Trazabilidad |
|---|---|---|---|---|---|
| F-07 | Notificaciones push | El sistema envía los mismos recordatorios de F-06 como notificación push en los navegadores que lo permiten. | S | El correo ya cubre el canal mínimo. En iPhone el push solo funciona desde iOS 16.4 y con la app agregada a la pantalla de inicio. | PRINCIPIO-007, R-10 |
| F-08 | Pago informado por el participante | El participante informa que pagó, con su fecha de pago, y la cuota queda "Por confirmar" hasta que el organizador lo confirma o lo rechaza. El organizador recibe un aviso. | S | F-04 ya permite registrar todos los pagos. | PREG-017, PREG-020, PREG-030 |
| F-09 | Reglas escritas de la junta | Al crear la junta, o después mientras no se fije el orden de turnos, el organizador escribe sus reglas (atrasos, multas, retiros) como un texto de hasta 2,000 caracteres que todos los miembros pueden leer, y la app no las aplica. | S | Hoy las juntas funcionan sin reglas escritas. | PREG-016, PRINCIPIO-012 g |
| F-10 | Orden de turnos sin sorteo | En lugar del sorteo, el organizador asigna el orden de turnos a mano, por ejemplo según la necesidad, y queda un registro inmutable de quién lo decidió y cuándo. | S | El sorteo es el caso habitual. | PREG-018, PRINCIPIO-008 |
| F-11 | Segundo factor por correo | El usuario que lo desee activa un código enviado a su correo, y desde entonces no inicia sesión sin ese código. | S | Es opcional para el usuario, así que la junta funciona sin él. PRINCIPIO-005 v0.2 lo exige desde que se publique F-11. | PRINCIPIO-005, PREG-023, PREG-037 |

### Could have

| ID | Funcionalidad | Descripción | Prioridad | Por qué no es Must | Trazabilidad |
|---|---|---|---|---|---|
| F-12 | Entrega del pozo | El organizador marca que entregó el pozo de la ronda a quien le tocaba. | C | F-05 ya muestra cuándo se completaron los pagos de la ronda. | PRINCIPIO-004 |
| F-13 | Cambio de turno | El organizador registra un cambio de turno como un evento aparte del sorteo. | C | El brief no lo menciona como problema. | PRINCIPIO-008 |
| F-14 | Exportar historial | El organizador descarga el historial de pagos y turnos en una hoja de cálculo que solo contiene los campos permitidos. | C | Reemplaza al Excel, pero la junta funciona sin esto. | PRINCIPIO-006 |
| F-15 | Cerrar y borrar una junta | El organizador cierra una junta terminada y decide si guarda o borra sus datos. | C | Cerrar una junta no es necesario para que funcione, y las reglas de borrado dependen de preguntas legales abiertas. | PREG-001, PREG-006 |

---

## 2. Out-of-scope

Todas las funcionalidades de esta sección tienen prioridad W (Won't) en esta versión.

| ID | Funcionalidad | Razón |
|---|---|---|
| NO-01 | Cobrar, transferir o guardar dinero, o integrar Yape, Plin, pasarelas de pago o bancos | PRINCIPIO-004: la app solo registra pagos hechos fuera de ella. |
| NO-02 | Notificaciones por WhatsApp o SMS | PRINCIPIO-007 solo permite correo y push. La integración con WhatsApp se revisa a los 3 meses del lanzamiento (PREG-014). |
| NO-03 | Plan VIP o cualquier suscripción de pago | Queda para después del lanzamiento, y cobrar dentro de la app choca con PRINCIPIO-004 (PREG-011). Como el lanzamiento no limita la cantidad de juntas (sección 7), el plan VIP necesitará otra propuesta de valor. |
| NO-04 | Línea de préstamos o evaluación crediticia con el historial de pagos | Es un proyecto aparte, puede requerir autorización de la SBS y necesita un consentimiento propio (PREG-015, R-07). |
| NO-05 | Publicidad | El modelo de negocio del lanzamiento es gratis y sin publicidad (sección 4 de 01-project-brief.md). |
| NO-06 | Calcular o cobrar automáticamente multas, intereses o penalidades | Un agente de IA no decide sobre dinero sin una regla escrita (PRINCIPIO-012 g, PREG-016) y la app no mueve dinero (PRINCIPIO-004). F-09 solo muestra las reglas como texto. |
| NO-07 | Apps nativas en App Store o Google Play | PRINCIPIO-009 define una app web. |
| NO-08 | Ver el celular, el correo, la fecha de nacimiento o la foto de otros miembros | PRINCIPIO-006 limita lo que se ve de los demás a cuatro datos. La foto está excluida mientras PREG-004 siga abierta, y hacerla visible requeriría cambiar PRINCIPIO-006 con aprobación humana (PRINCIPIO-012). |
| NO-09 | Chat o mensajería entre miembros | El brief no lo pide, y agrega datos personales y moderación de contenido que el spec-pack no cubre. |
| NO-10 | Registrar préstamos o garantías entre participantes | Es una operación de dinero sin regla escrita (PRINCIPIO-012 g) y se acerca a la línea de préstamos (NO-04). |
| NO-11 | Validar el DNI con RENIEC u otro servicio de identidad | Solo se valida el formato `^\d{8}$` (PRINCIPIO-003). Un servicio externo requiere aprobación (PRINCIPIO-012 h) y el brief no lo pide. |
| NO-12 | Otros idiomas u otras monedas | PRINCIPIO-002 fija el español de Perú y PRINCIPIO-003 fija los montos en S/. |
| NO-13 | Salir de una junta después de fijar el orden de turnos, reemplazar a un participante o transferir el rol de organizador | Mover turnos o deudas después del sorteo es una decisión sobre dinero sin regla escrita (PRINCIPIO-012 g). Los cambios de turno quedan para F-13 (PREG-032). |
| NO-14 | Pedir o guardar la fecha de nacimiento o la foto del usuario | Ninguna funcionalidad de esta versión las usa, y guardarlas suma datos personales sin necesidad (PREG-001, PREG-004, PREG-007). |

---

## 3. MVP (Minimum Viable Product)

El MVP está formado por F-01 a F-06. Con solo eso, una organizadora como Carmen crea su cuenta aceptando la política de privacidad. Crea una o varias juntas con la cuota en S/, la cantidad de participantes, la frecuencia (semanal, quincenal, mensual o cada cierta cantidad de días), la fecha de vencimiento y los días de aviso previo, y decide si ella también participa. Después comparte el código de la junta con sus familiares, que crean su cuenta y se unen con ese código. Cuando se llenan los cupos, ejecuta el sorteo, que queda registrado y que cualquier miembro puede reproducir con su semilla. En cada ronda recibe las cuotas fuera de la app (Yape, Plin o efectivo) y las marca como pagadas. Mientras tanto, la app envía a cada participante un correo antes del vencimiento, otro ese mismo día y hasta 5 después mientras no pague, en lugar de los 30 a 40 mensajes de WhatsApp que hoy envía ella. Una participante como Lucía abre la app, incluso sin conexión, y ve su turno, si su pago quedó registrado y quién falta pagar, sin preguntarle a nadie. Hay cosas que el MVP no hace: el participante no informa su propio pago, no hay notificaciones push, no hay segundo factor, el orden de turnos siempre sale del sorteo y las reglas de la junta se siguen acordando fuera de la app. Aun así, con los pagos que registra F-04 ya se pueden medir KPI-01, KPI-03 y KPI-04, y KPI-05 depende sobre todo de F-06.

---

## 4. Supuestos

Siguen vigentes los supuestos S-01 a S-08 de 01-project-brief.md. Estos supuestos nuevos dependen del alcance:

| ID | Supuesto | Cómo validarlo |
|---|---|---|
| S-09 | Cada participante tiene un correo propio que revisa, porque la cuenta y los recordatorios del MVP dependen del correo | Porcentaje de invitados con correo en las primeras 10 juntas, y tasa de entrega de correos (R-11) |
| S-10 | Los recordatorios automáticos por correo reemplazan la mayoría de los 3 a 4 recordatorios manuales que hoy recibe cada participante | Encuesta de KPI-05 |
| S-11 | Ver el estado de pagos compartido reduce la confusión sobre quién pagó y la desconfianza en el Excel del organizador | Encuesta de KPI-05 |
| S-12 | Un sorteo registrado y reproducible reduce las discusiones por el orden de turnos | Encuesta de KPI-05 |
| S-13 | En el MVP el organizador acepta registrar él mismo todos los pagos, sin que el participante los informe (F-08 es Should) | Medición de S-02 |
| S-14 | En cada junta todos los participantes pagan la misma cuota y hay un solo pozo por ronda | Revisión de las primeras 10 juntas |
| S-15 | El organizador comparte el código de invitación por sus propios medios (por ejemplo, WhatsApp), sin que la app lo envíe | Porcentaje de invitados que se unen con el código, medido junto con S-01 |

---

## 5. Restricciones

### Técnicas
- La app es web, hecha con Next.js y TypeScript sobre PostgreSQL, con versiones exactas en `package.json` y en el lockfile (PRINCIPIO-009).
- Sin conexión, todas las funcionalidades Must se pueden consultar y solo se permiten las acciones de pagos de RN-170. El sorteo exige conexión (RN-029). Al sincronizar, el servidor aplica los cambios en orden y rechaza el que ya no cumple las reglas, y la app muestra el rechazo (RN-171, RN-172, PREG-005).
- Cada pantalla funciona sin scroll horizontal entre 360 px y 1440 px, cumple WCAG 2.2 nivel A y los límites de Lighthouse, y cada endpoint responde en ≤ 500 ms en el percentil 95 (PRINCIPIO-010).
- La cobertura de tests es ≥ 80 % de líneas en todo el código y del 100 % de líneas y ramas en los módulos de sorteo y de cálculo de cuotas (PRINCIPIO-011).
- El DNI y el celular se cifran con AES-256-GCM, las contraseñas se guardan con Argon2id o bcrypt y todo el tráfico usa TLS 1.2 o superior (PRINCIPIO-005).
- Los montos se guardan en céntimos y las fechas se muestran en DD/MM/AAAA en America/Lima (PRINCIPIO-003).
- Las notificaciones solo van por correo y push (PRINCIPIO-007). En iPhone, el push solo llega desde iOS 16.4 y con la app agregada a la pantalla de inicio (R-10).

### Legales
- El cumplimiento de la Ley N.° 29733 está pendiente (PREG-001). Esa respuesta bloquea el texto de la política de privacidad, así que F-01 no puede salir al mercado mientras PREG-001 siga abierta.
- Se guardan la versión de la política aceptada y la fecha y hora de la aceptación (PRINCIPIO-007).
- La app no mueve dinero (PRINCIPIO-004). Lo que podría requerir autorización de la SBS queda fuera del alcance (NO-04).

### De recursos
- Todo el producto está a cargo de 1 líder técnico asistido por IA (R-08).
- No hay fecha límite de lanzamiento. Los costos los asume la empresa, sin un tope mensual definido.
- La adquisición de usuarios depende de la red propia de familia y trabajo, de redes sociales y de la recomendación boca a boca.
- Cada dependencia nueva y cada servicio externo requieren aprobación humana (PRINCIPIO-012 e y h).

---

## 6. Dependencias

| Dependencia | Para qué se usa | Estado |
|---|---|---|
| Servicio de correo transaccional | F-06 y F-11 | Proveedor [REQUIERE DECISIÓN]. Requiere aprobación (PRINCIPIO-012 h). Riesgo de spam (R-11) |
| Servicios de Web Push de los navegadores (Google, Apple, Mozilla) | F-07 | Se necesita después del MVP |
| Hosting para Next.js y PostgreSQL administrado | Todas las funcionalidades | [REQUIERE DECISIÓN] |
| Dominio y certificado TLS | PRINCIPIO-005 | Pendiente |
| Gestor de secretos para la clave AES, fuera de la base de datos y del repositorio | PRINCIPIO-005 | [REQUIERE DECISIÓN] (PREG-008) |
| Tareas programadas que se ejecutan en hora de America/Lima | F-06 | Se define en el diseño de arquitectura |
| Navegador con Service Worker y almacenamiento local | Funcionamiento sin conexión (PRINCIPIO-009) | Navegadores mínimos [REQUIERE DECISIÓN] |
| Yape, Plin y efectivo, sin integración | Los pagos ocurren fuera de la app (S-02) | Dependencia de negocio |
| Asesor legal | PREG-001 | Pendiente |
| Encuesta a organizadores, al empezar a usar la app y a los 3 meses | Medir KPI-05 y validar S-03, S-04, S-10, S-11 y S-12 | Preguntas y medio de envío [REQUIERE DECISIÓN] (PREG-021). Si usa un servicio externo, requiere aprobación (PRINCIPIO-012 h) |
| axe-core, Lighthouse y un framework de tests en CI | PRINCIPIO-010 y PRINCIPIO-011 | Requiere aprobación (PRINCIPIO-012 e) |

---

## 7. Decisiones del Product Owner para este alcance

Tomadas el 14/11/2026:

1. **Cantidad de juntas (resuelve PREG-013):** en el lanzamiento, un organizador puede gestionar varias juntas a la vez, sin límite.
2. **Invitación:** el invitado se une a la junta con un código, y para unirse debe tener una cuenta.
3. **Recordatorios:** se envían antes del vencimiento, según los días de aviso que el organizador fija al crear la junta. También se envía uno el día del vencimiento y otros después, hasta que la cuota quede registrada como pagada.
4. **Frecuencias de cuota:** semanal, quincenal, mensual, o cada cierta cantidad de días que define el organizador.
5. **Organizador participante:** el organizador decide al crear la junta si también participa, es decir, si paga cuota y entra al sorteo.
6. **Segundo factor:** pasa a Should (F-11) porque es opcional para el usuario.
7. **Reglas de la junta:** en esta versión solo se registran como texto visible (F-09). Aplicarlas automáticamente queda fuera del alcance (NO-06).

### Valores que estas decisiones dejaban pendientes
Todos quedaron resueltos el 14/11/2026, y sus valores están en 03-reglas-de-negocio.md §1.1:
- Formato, vigencia y cantidad de usos del código de invitación: PREG-024 (RN-015 a RN-021).
- Valores mínimo y máximo de los días de aviso previo: PREG-025 (RN-010 a RN-012).
- Cada cuánto se envía un recordatorio después del vencimiento, y si hay un máximo de envíos: PREG-026 (RN-066, RN-070 y RN-071). Por eso el punto 3 de arriba ("hasta que la cuota quede registrada como pagada") tiene un tope de 5 envíos después del vencimiento.
- Valores mínimo y máximo de la frecuencia "cada cierta cantidad de días", y cómo se calculan los vencimientos quincenales y mensuales: PREG-027 (RN-008 y RN-046 a RN-050). PREG-028 subió después el mínimo de N a 2.
