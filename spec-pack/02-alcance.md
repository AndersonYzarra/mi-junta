# Alcance de Mi Junta

Versión: 0.5
Fecha: 14/11/2026
Estado: Revisado

La v0.5 incorpora las decisiones del 14/11/2026 sobre la auditoría QA del backlog (auditorias/qa-clase2.md), tomadas con autorización del Product Owner: F-18 sale junto con el MVP, y se aprobaron las herramientas del pipeline y el `proxy` de TLS (sección 6).

Fuente: 01-project-brief.md v0.2, 00-constitucion.md v0.2, 03-reglas-de-negocio.md v0.2, las decisiones del Product Owner del 14/11/2026 (sección 7) y las decisiones del Product Owner del 14/11/2026 sobre la auditoría QA (auditorias/qa-clase1.md) y sobre la alineación de pendientes (sección 7 y 03-reglas-de-negocio.md v0.3 §1.3). El rol que crea y gestiona la junta se llama "organizador" (PREG-010, resuelta).

**IDs de este documento:** `F-NN` identifica una funcionalidad dentro del alcance y `NO-NN` una funcionalidad fuera del alcance. Los supuestos siguen la serie `S-NN` de 01-project-brief.md.

---

## 1. In-scope

### Must have

| ID | Funcionalidad | Descripción | Prioridad | Trazabilidad |
|---|---|---|---|---|
| F-01 | Cuenta con consentimiento | El usuario crea su cuenta con nombre, correo y contraseña e inicia sesión solo después de aceptar la política de privacidad y el consentimiento para recibir notificaciones y de confirmar que es mayor de 18 años. Verifica su correo antes de crear una junta o unirse a una, y puede recuperar su contraseña por correo. | M | PRINCIPIO-005, PRINCIPIO-007, PREG-001, PREG-007, PREG-036, PREG-043 |
| F-02 | Crear junta e invitar por código | El organizador crea las juntas que necesite, sin límite, con nombre, cuota en S/, cantidad de participantes, frecuencia, fecha de vencimiento y días de aviso previo, elige si también participa, y comparte un código con el que cada invitado se une después de crear su cuenta. Antes de fijar el orden de turnos puede editar la junta y quitar participantes, y los participantes pueden salir. | M | PRINCIPIO-003, PREG-013, PREG-024, PREG-025, PREG-027, PREG-028, PREG-032, PREG-033, sección 7 |
| F-03 | Sorteo auditable | El organizador ejecuta el sorteo de turnos y el sistema guarda la semilla, la entrada, el resultado, quién lo ejecutó y cuándo, sin sobrescribirlo nunca. Todo miembro puede ver el registro y reproducirlo. Al sortear se crean las rondas y las cuotas. | M | PRINCIPIO-008, PREG-005, PREG-029, PREG-031, PREG-035 |
| F-04 | Registro de pagos | El organizador marca cada cuota como pagada con su fecha, y el dinero se mueve fuera de la app. | M | PRINCIPIO-004, S-02, PREG-020 |
| F-05 | Estado compartido de la junta | Cada miembro ve su propio turno y el estado de sus cuotas, y de los demás solo ve los cuatro datos permitidos: nombre, turno, estado de su cuota en la ronda actual y fecha y estado de su próxima cuota. El organizador ve además todas las cuotas y pagos de su junta, sin datos personales. | M | PRINCIPIO-006, PREG-003, PREG-004, PREG-034, PREG-039 |
| F-06 | Recordatorios por correo | El sistema envía a cada participante un correo antes del vencimiento (según los días de aviso que fijó el organizador), otro el día del vencimiento y hasta 5 después, cada 2 días, mientras su cuota siga "Pendiente". El participante puede desactivar y volver a activar estos correos. | M | PRINCIPIO-007, PREG-001, PREG-009, PREG-025, PREG-026, PREG-030, PREG-041, R-01, R-11, sección 7 |

> El funcionamiento sin conexión (PRINCIPIO-009), la accesibilidad y el rendimiento (PRINCIPIO-010) y la calidad verificada por tests (PRINCIPIO-011) no son funcionalidades aparte. Son condiciones que cumple cada funcionalidad Must. Sin conexión, todas las funcionalidades Must se pueden consultar, pero solo se permiten las acciones de RN-170: registrar, desmarcar, informar, confirmar o rechazar pagos.

### Should have

| ID | Funcionalidad | Descripción | Prioridad | Por qué no es Must | Trazabilidad |
|---|---|---|---|---|---|
| F-07 | Notificaciones push | El sistema envía los mismos recordatorios de F-06 como notificación push en los navegadores que lo permiten. | S | El correo ya cubre el canal mínimo. En iPhone el push solo funciona desde iOS 16.4 y con la app agregada a la pantalla de inicio. | PRINCIPIO-007, R-10 |
| F-08 | Pago informado por el participante | El participante informa que pagó, con su fecha de pago, y la cuota queda "Por confirmar" hasta que el organizador lo confirma o lo rechaza. El organizador recibe un aviso, y el participante recibe otro si su pago informado se rechaza. | S | F-04 ya permite registrar todos los pagos. | PREG-017, PREG-020, PREG-030 |
| F-09 | Reglas escritas de la junta | Al crear la junta, o después mientras no se fije el orden de turnos, el organizador escribe sus reglas (atrasos, multas, retiros) como un texto de hasta 2,000 caracteres que todos los miembros pueden leer, y la app no las aplica. | S | Hoy las juntas funcionan sin reglas escritas. | PREG-016, PRINCIPIO-012 g |
| F-10 | Orden de turnos sin sorteo | En lugar del sorteo, el organizador asigna el orden de turnos a mano, por ejemplo según la necesidad, y queda un registro inmutable de quién lo decidió y cuándo, que todos los miembros pueden ver. | S | El sorteo es el caso habitual. | PREG-018, PRINCIPIO-008 |
| F-11 | Segundo factor por correo | El usuario que lo desee activa un código enviado a su correo, y desde entonces no inicia sesión sin ese código. | S | Es opcional para el usuario, así que la junta funciona sin él. PRINCIPIO-005 v0.2 lo exige desde que se publique F-11. | PRINCIPIO-005, PREG-023, PREG-037 |
| F-16 | Aviso de cuotas vencidas al organizador | El día siguiente al vencimiento de una ronda con cuotas "Pendiente", el organizador recibe un correo por junta, entre las 09:00 y las 09:15, con el nombre de cada participante que falta pagar. El organizador puede desactivar y volver a activar este aviso. | S | El participante ya recibe sus recordatorios (F-06) y el organizador ya ve las cuotas pendientes en la app (F-05). | PREG-047, PREG-053, KPI-05 |
| F-17 | Borrar la cuenta | El usuario borra su cuenta si no es miembro de ninguna junta "En curso" ni organiza una junta "Abierta" o "Completa". Sale de sus juntas "Abierta" o "Completa", y en las terminadas su nombre se muestra como "Participante eliminado" con sus pagos conservados. | S | Las juntas funcionan sin esta opción. Antes de salir al mercado se confirma con el asesor legal si la Ley N.° 29733 la exige desde el lanzamiento. | PREG-001, PREG-006, PREG-049 |
| F-18 | Encuesta de KPI-05 | Al crear su primera junta, y otra vez a los 3 meses de responder, el organizador ve dentro de la app una encuesta de 3 preguntas sobre las horas que dedica y los recordatorios que envía a mano. Puede cerrarla sin responder. | S | La junta funciona sin ella, pero tiene que estar lista para medir la línea base de KPI-05 con las primeras 10 juntas. | PREG-021, PREG-054, KPI-05 |

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
| NO-08 | Ver el celular, el correo, la fecha de nacimiento o la foto de otros miembros | PRINCIPIO-006 limita lo que se ve de los demás a cuatro datos. El DNI de los demás nunca se muestra (PREG-003) y esta versión no pide la foto (PREG-004, RN-149). Mostrar cualquiera de ellos requeriría cambiar PRINCIPIO-006 con aprobación humana (PRINCIPIO-012). |
| NO-09 | Chat o mensajería entre miembros | El brief no lo pide, y agrega datos personales y moderación de contenido que el spec-pack no cubre. |
| NO-10 | Registrar préstamos o garantías entre participantes | Es una operación de dinero sin regla escrita (PRINCIPIO-012 g) y se acerca a la línea de préstamos (NO-04). |
| NO-11 | Validar el DNI con RENIEC u otro servicio de identidad | Solo se valida el formato `^\d{8}$` (PRINCIPIO-003). Un servicio externo requiere aprobación (PRINCIPIO-012 h) y el brief no lo pide. |
| NO-12 | Otros idiomas u otras monedas | PRINCIPIO-002 fija el español de Perú y PRINCIPIO-003 fija los montos en S/. |
| NO-13 | Salir de una junta después de fijar el orden de turnos, reemplazar a un participante o transferir el rol de organizador | Mover turnos o deudas después del sorteo es una decisión sobre dinero sin regla escrita (PRINCIPIO-012 g). Los cambios de turno quedan para F-13 (PREG-032). |
| NO-14 | Pedir o guardar la fecha de nacimiento o la foto del usuario | Ninguna funcionalidad de esta versión las usa, y guardarlas suma datos personales sin necesidad (PREG-001, PREG-004, PREG-007). |

---

## 3. MVP (Minimum Viable Product)

El MVP está formado por F-01 a F-06. Con solo eso, una organizadora como Carmen crea su cuenta aceptando la política de privacidad. Crea una o varias juntas con la cuota en S/, la cantidad de participantes, la frecuencia (semanal, quincenal, mensual o cada cierta cantidad de días), la fecha de vencimiento y los días de aviso previo, y decide si ella también participa. Después comparte el código de la junta con sus familiares, que crean su cuenta y se unen con ese código. Cuando se llenan los cupos, ejecuta el sorteo, que queda registrado y que cualquier miembro puede reproducir con su semilla. En cada ronda recibe las cuotas fuera de la app (Yape, Plin o efectivo) y las marca como pagadas. Mientras tanto, la app envía a cada participante un correo antes del vencimiento, otro ese mismo día y hasta 5 después mientras no pague, en lugar de los 30 a 40 mensajes de WhatsApp que hoy envía ella. Una participante como Lucía abre la app, incluso sin conexión, y ve su turno, si su pago quedó registrado y quién falta pagar, sin preguntarle a nadie. Hay cosas que el MVP no hace: el participante no informa su propio pago, no hay notificaciones push, no hay segundo factor, el orden de turnos siempre sale del sorteo y las reglas de la junta se siguen acordando fuera de la app. Aun así, con los pagos que registra F-04 ya se pueden medir KPI-01, KPI-03 y KPI-04, y KPI-05 depende sobre todo de F-06 y de la encuesta de F-18. F-18 sigue siendo Should, pero el MVP no sale al mercado sin ella, para medir la línea base de KPI-05 con las primeras 10 juntas (decisión del 14/11/2026, auditorias/qa-clase2.md M-12).

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
- La app se aloja en un servidor dedicado de la empresa, ubicado en Perú, y corre en contenedores Docker. Los correos se envían con `nodemailer` por `smtp.office365.com` (07-architecture.md).
- Navegadores mínimos: las 2 últimas versiones mayores de Chrome para Android, Samsung Internet, Edge y Firefox, y Safari en iPhone desde iOS 16.4.
- El JavaScript de cada pantalla pesa como máximo 170 KB comprimido, pensando en celulares Android de gama baja.

### Legales
- Mi Junta cumple la Ley N.° 29733 (PREG-001, resuelta el 14/11/2026 como decisión provisional del Product Owner). El texto de la política de privacidad lo escribe el asesor legal, y F-01 no puede salir al mercado sin ese texto.
- Las decisiones sobre la edad mínima, el borrado de la cuenta, el retiro del consentimiento, los datos para préstamos y el acceso del equipo son provisionales hasta que las confirme el asesor legal (05-preguntas-abiertas.md).
- Se guardan la versión de la política aceptada y la fecha y hora de la aceptación (PRINCIPIO-007).
- La app no mueve dinero (PRINCIPIO-004). Lo que podría requerir autorización de la SBS queda fuera del alcance (NO-04).

### De recursos
- Todo el producto está a cargo de 1 líder técnico asistido por IA (R-08), que también opera el servidor dedicado (R-14).
- No hay fecha límite de lanzamiento. Los costos los asume la empresa, sin un tope mensual definido.
- La adquisición de usuarios depende de la red propia de familia y trabajo, de redes sociales y de la recomendación boca a boca.
- Cada dependencia nueva y cada servicio externo requieren aprobación humana (PRINCIPIO-012 e y h).

---

## 6. Dependencias

| Dependencia | Para qué se usa | Estado |
|---|---|---|
| Envío de correo con `nodemailer` por `smtp.office365.com` (Microsoft 365) | F-01, F-06, F-08, F-11 y F-16 | Decidido (PREG-052). Microsoft 365 es un servicio externo aprobado por el Product Owner el 14/11/2026 (PRINCIPIO-012 h). Riesgos de spam y de límites de envío (R-11, R-15) |
| Servicios de Web Push de los navegadores (Google, Apple, Mozilla) | F-07 | Se necesita después del MVP |
| Servidor dedicado de la empresa en Perú, con Next.js, el worker y PostgreSQL en contenedores Docker | Todas las funcionalidades | Decidido (PREG-051) |
| Dominio y certificado TLS | PRINCIPIO-005 | Dominio pendiente. El certificado lo obtiene y renueva el `proxy` (Caddy con Let's Encrypt), aprobado el 14/11/2026 (07-architecture.md §6.3) |
| Claves de cifrado fuera de la base de datos y del repositorio | PRINCIPIO-005 | Decidido: variables de entorno de los contenedores, desde un `.env` que solo existe en el servidor (PREG-050) |
| Tareas programadas que se ejecutan en hora de America/Lima | F-06 y F-16 | Definidas: un worker en el servidor dedicado (07-architecture.md, ADR-007) |
| Navegador con Service Worker y almacenamiento local | Funcionamiento sin conexión (PRINCIPIO-009) | Navegadores mínimos definidos (sección 5) |
| Yape, Plin y efectivo, sin integración | Los pagos ocurren fuera de la app (S-02) | Dependencia de negocio |
| Asesor legal | Texto de la política de privacidad y confirmación de las decisiones provisionales | Pendiente |
| Encuesta a organizadores, al crear la primera junta y a los 3 meses | Medir KPI-05 y validar S-03, S-04, S-10, S-11 y S-12 | Decidida: dentro de la app, sin servicio externo (F-18, PREG-021) |
| axe-core, Lighthouse CI, Vitest y Playwright | PRINCIPIO-010 y PRINCIPIO-011 | Aprobadas el 14/11/2026 (07-architecture.md §6.3) |
| ESLint, `@vitest/coverage-v8`, gitleaks, `drizzle-kit`, GitHub y GitHub Actions | Pipeline, cobertura, escaneo de secretos y migraciones (PRINCIPIO-005, PRINCIPIO-009, PRINCIPIO-011) | Aprobadas el 14/11/2026 (07-architecture.md §6.3, auditorias/qa-clase2.md C-01) |

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

### Decisiones del Product Owner del 14/11/2026 sobre la alineación de pendientes

1. **Funcionalidades nuevas:** F-16 (aviso de cuotas vencidas al organizador, PREG-047), F-17 (borrar la cuenta, PREG-006) y F-18 (encuesta de KPI-05, PREG-021), las tres Should.
2. **Cambios a funcionalidades existentes:** F-01 pide confirmar la mayoría de edad (PREG-007); F-06 permite desactivar los correos de recordatorio (PREG-009); F-08 avisa al participante cuando se rechaza su pago informado; en F-10 todos los miembros ven el registro de la asignación.
3. **Infraestructura:** servidor dedicado en la nube bajo control de la empresa, correo por SMTP, versiones exactas al iniciar el desarrollo, navegadores mínimos y presupuesto de JavaScript de la sección 5.
4. **Pendientes que dejó esta alineación:** se resolvieron el mismo día (punto 5).
5. **Segunda ronda del 14/11/2026:** el organizador de una junta "Abierta" o "Completa" no puede borrar su cuenta (PREG-049); las claves van en el `.env` del servidor, que corre todo en contenedores Docker (PREG-050); el servidor dedicado está en Perú (PREG-051); los correos salen con `nodemailer` por `smtp.office365.com` (PREG-052); el organizador puede desactivar el aviso de cuotas vencidas (PREG-053) y puede cerrar la encuesta sin responderla (PREG-054). Se aprobó la dependencia `nodemailer`.
