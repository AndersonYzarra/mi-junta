# Preguntas abiertas

Versión: 1.0
Fecha: 15/11/2026
Estado: Aprobado

La v1.0 aprueba este documento, con la aprobación del usuario del 15/11/2026, junto con los otros 10 archivos del spec-pack. No cambia su contenido: solo cambia la cabecera.

La v0.5 registra las preguntas que 09-ui-spec.md §7.1 (PREG-069 a PREG-072) y 10-validation-log.md §2 (PREG-073 a PREG-077) citaban sin que existieran aquí, con la decisión que tomó el Agente Spec Finalizer el 15/11/2026 con la autorización del usuario para decidir por su cuenta (auditorias/spec-finalizer.md, "Decisiones del equipo"). También abre PREG-078 a PREG-083, una por cada hallazgo mayor de esa auditoría, que siguen abiertas.

Decisiones pendientes detectadas al redactar la constitución, el Project Brief y el alcance. Mientras una pregunta siga abierta, todo lo que dependa de ella se marca [REQUIERE DECISIÓN]. Una pregunta resuelta conserva su ID y lleva la línea "Estado: Resuelta" con la fecha y la decisión. Una pregunta con "Estado: Propuesta" tiene una respuesta redactada por un agente que no rige hasta que el Product Owner la apruebe (PRINCIPIO-012). Al aprobarla, "Propuesta" se cambia por "Resuelta".

**Alineación del 14/11/2026:** el Product Owner respondió todas las preguntas abiertas (03-reglas-de-negocio.md §1.3). Quedan abiertas a propósito PREG-011, PREG-014 y PREG-022, que no bloquean esta versión, y las nuevas PREG-049 a PREG-054, que salieron de esas respuestas y se resolvieron el mismo día en una segunda ronda. Las decisiones marcadas "provisional" las tomó el Product Owner y se confirman con el asesor legal.

**Auditoría QA del backlog del 14/11/2026:** auditorias/qa-clase2.md abrió PREG-055 a PREG-068, que se resolvieron el mismo día con la autorización del Product Owner (03-reglas-de-negocio.md §1.4). Cada hallazgo mayor tiene su pregunta:

| Hallazgo | Pregunta | Hallazgo | Pregunta |
|---|---|---|---|
| C-01 | PREG-055 (Gherkin; herramientas en 07-architecture.md §6.3) | M-06 | PREG-061 |
| C-02 | — (textos en 03-reglas-de-negocio.md §2.9) | M-07 | PREG-062 |
| M-01 | PREG-058 | M-08 | PREG-063 |
| M-02 | PREG-059 | M-09 | PREG-064 |
| M-03 | PREG-060 | M-10 | PREG-065 |
| M-04 | PREG-056 | M-11 | PREG-066 |
| M-05 | PREG-057 | M-12 | PREG-067 |
| Cierre: RN Must sin HU | PREG-068 | | |

---

### PREG-001: ¿Mi Junta debe cumplir la Ley N.° 29733 (Protección de Datos Personales) y su Reglamento, e inscribir su banco de datos ante la ANPD?
- Contexto: la app guarda nombre, DNI, celular, correo, foto y fecha de nacimiento de personas en Perú. Además se planea usar datos reales en desarrollo y pruebas. Si la ley aplica, eso puede exigir cambios en el consentimiento, la retención y el uso de datos reales.
- A quién preguntar: asesor legal del proyecto.
- Bloquea: PRINCIPIO-005, PRINCIPIO-007, el texto de la política de privacidad, el uso de datos reales en desarrollo, y PREG-006, PREG-007 y PREG-009.
- Plan de resolución: consulta legal antes de redactar las HU de registro y de consentimiento. Con la respuesta se actualizan 00-constitucion.md y 03-reglas-de-negocio.md.
- Actualización del 14/11/2026 (auditoría QA): preguntar también al asesor si se necesitan dos casillas separadas, una para la política y otra para las notificaciones (hoy es una sola, RN-082), y si se pueden seguir enviando recordatorios a un usuario que todavía no aceptó una versión nueva de la política (RN-168). La decisión de PREG-036 dejó de pedir la fecha de nacimiento y la foto (RN-149), lo que reduce los datos que cubre esta pregunta.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). Mi Junta cumple la Ley N.° 29733. Hay una sola casilla de consentimiento para la política y las notificaciones (RN-082). Los recordatorios siguen llegando aunque el usuario todavía no acepte una versión nueva de la política (RN-189). El texto de la política lo escribe el asesor legal y queda como entregable, no como pregunta: F-01 no sale al mercado sin él (02-alcance.md §5). Decisión provisional del Product Owner, a confirmar con el asesor legal.

### PREG-002: ¿Cuál es la unidad mínima de un monto (S/ 0.01 o S/ 0.10) y qué regla de redondeo se usa?
- Contexto: se indicó "hasta céntimos válidos en Perú, por ejemplo S/ 20.80". La moneda más pequeña en circulación es S/ 0.10, pero Yape y Plin aceptan S/ 0.01. Al dividir un pozo entre participantes puede sobrar una fracción, y hace falta saber a quién se le asigna.
- A quién preguntar: Product Owner.
- Bloquea: PRINCIPIO-003, las RN de cálculo de cuotas en 03-reglas-de-negocio.md y los tests al 100 % del módulo de cuotas (PRINCIPIO-011).
- Plan de resolución: decidir antes de escribir las RN de cuotas en 03-reglas-de-negocio.md y registrar ahí la unidad mínima y el redondeo.
- Estado: Resuelta el 14/11/2026. La unidad mínima de una cuota es S/ 0.10. El organizador ingresa la cuota y el pozo se calcula como cuota × participantes, así que no hay división ni redondeo (RN-004 y RN-041 de 03-reglas-de-negocio.md).

### PREG-003: ¿Un participante ve el DNI de los otros miembros: completo, parcialmente oculto o nada?
- Contexto: se indicó que un participante ve "solo el nombre y a lo mucho el DNI" de los demás. El DNI es un dato personal que va cifrado (PRINCIPIO-005).
- A quién preguntar: Product Owner, con visto bueno del asesor legal (relacionada con PREG-001).
- Bloquea: PRINCIPIO-006, la pantalla de lista de miembros y el contrato de la API de miembros.
- Plan de resolución: decidir antes de diseñar la pantalla de miembros en prototipos/. Las opciones son completo, parcialmente oculto (por ejemplo "****5678") o no visible.
- Avance del 14/11/2026: mientras esta pregunta siga abierta, el sistema no entrega a ningún usuario el DNI de otro miembro (RN-023 de 03-reglas-de-negocio.md). Sigue abierta la decisión definitiva.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). El DNI de los demás miembros nunca se muestra (RN-023, PRINCIPIO-006).

### PREG-004: ¿La foto de un miembro es visible para los demás miembros de la junta?
- Contexto: la foto es opcional. En la constitución quedó como privada, porque solo se mencionó el nombre y el DNI como datos visibles.
- A quién preguntar: Product Owner.
- Bloquea: PRINCIPIO-006 y la pantalla de lista de miembros.
- Plan de resolución: decidir junto con PREG-003 antes de diseñar la pantalla de miembros.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). La foto no se pide ni se guarda en esta versión (RN-149, NO-14), así que no hay foto que mostrar.

### PREG-005: ¿Cómo se resuelven los conflictos de cambios hechos sin conexión, y se permite sortear sin conexión?
- Contexto: la app debe funcionar sin red y sincronizar al reconectar (PRINCIPIO-009). Si dos personas cambian el mismo dato sin conexión, hace falta una regla para decidir cuál vale. Un sorteo hecho sin conexión podría chocar con el registro auditable (PRINCIPIO-008).
- A quién preguntar: Product Owner y arquitecto de software.
- Bloquea: PRINCIPIO-008, PRINCIPIO-009, las RN de sincronización en 03-reglas-de-negocio.md y el diseño de arquitectura.
- Plan de resolución: definir antes del diseño de arquitectura. Las opciones son que gane el servidor, que gane el último cambio o que haya revisión manual, y si el sorteo exige conexión.
- Avance del 14/11/2026: el sorteo exige conexión (RN-029 de 03-reglas-de-negocio.md). Sigue abierta la regla de resolución de conflictos.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Sin conexión solo se consulta y se registran, desmarcan, informan, confirman o rechazan pagos (RN-170). El servidor aplica los cambios en el orden en que se hicieron y rechaza el que ya no cumple las reglas, por ejemplo marcar una cuota que otro dispositivo ya marcó (RN-171). La app muestra el cambio rechazado y el motivo (RN-172), cuenta los cambios sin enviar (RN-174), guarda los datos de todas las juntas del usuario (RN-175) y conserva los cambios si la sesión venció (RN-176). El servidor guarda la hora en que se hizo cada cambio (RN-173).

### PREG-006: ¿Un participante puede pedir que se borren sus datos, o solo el organizador puede borrar la información de una junta?
- Contexto: se indicó que el organizador puede borrar los datos de la junta en cualquier momento o guardarlos para siempre. No se definió qué pasa cuando un participante quiere que se eliminen sus propios datos.
- A quién preguntar: asesor legal (relacionada con PREG-001) y Product Owner.
- Bloquea: las RN de retención y borrado en 03-reglas-de-negocio.md y 02-alcance.md.
- Plan de resolución: resolver después de PREG-001 y antes de escribir las RN de retención.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). El usuario puede borrar su cuenta si no es miembro de ninguna junta "En curso" (RN-182). En las juntas terminadas su nombre se muestra como "Participante eliminado" y sus cuotas y pagos se conservan (RN-183, RN-184). Se borran su nombre, correo, DNI, celular y contraseña (RN-185), y sale de las juntas "Abierta" o "Completa" en las que participa (RN-186). Funcionalidad F-17 (02-alcance.md). El caso del organizador sigue en PREG-049. Decisión provisional del Product Owner, a confirmar con el asesor legal.

### PREG-007: ¿Habrá una edad mínima para crear una cuenta?
- Contexto: hoy no hay edad mínima, pero podría agregarse más adelante. La app ya guarda la fecha de nacimiento.
- A quién preguntar: asesor legal (relacionada con PREG-001) y Product Owner.
- Bloquea: las RN de registro en 03-reglas-de-negocio.md y PRINCIPIO-007.
- Plan de resolución: resolver después de PREG-001 y antes de escribir las HU de registro.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). La edad mínima es 18 años, confirmada con la casilla "Soy mayor de 18 años" al crear la cuenta, sin pedir la fecha de nacimiento (RN-181, RN-149). Decisión provisional del Product Owner, a confirmar con el asesor legal.

### PREG-008: ¿Se cifra también la fecha de nacimiento, y cómo se protegen los datos personales guardados en el dispositivo para el modo sin conexión?
- Contexto: PRINCIPIO-005 solo cifra el DNI y el celular. El modo sin conexión (PRINCIPIO-009) guarda datos en el navegador, fuera del cifrado del servidor.
- A quién preguntar: arquitecto de software o responsable de seguridad.
- Bloquea: PRINCIPIO-005 y PRINCIPIO-009.
- Plan de resolución: decidir en el diseño de arquitectura, junto con PREG-005.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). La fecha de nacimiento ya no se pide ni se guarda (RN-149), así que no hay nada que cifrar. Los datos que la app guarda en el dispositivo no se cifran aparte, porque no traen datos personales de otros miembros (RN-178, RN-023), y se borran al cerrar sesión, con un aviso si quedan cambios sin enviar (RN-197, RN-198). Dónde se guardan las claves de cifrado del servidor pasó a PREG-050.

### PREG-009: ¿El usuario puede retirar después su consentimiento para recibir notificaciones?
- Contexto: el consentimiento se acepta al crear la cuenta (PRINCIPIO-007). No se definió si se puede retirar ni qué pasa con los recordatorios de pago si se retira.
- A quién preguntar: Product Owner y asesor legal (relacionada con PREG-001).
- Bloquea: PRINCIPIO-007 y las RN de notificaciones en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de escribir las RN de recordatorios.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). El usuario puede desactivar y volver a activar los recordatorios por correo (RN-187, RN-067) y las notificaciones push (RN-073). El enlace de verificación, el de recuperación de contraseña y el código de verificación siempre se envían (RN-188). Decisión provisional del Product Owner, a confirmar con el asesor legal.

### PREG-010: ¿El rol que crea y gestiona la junta se llama "organizador" o "administrador de la junta"?
- Contexto: el contexto del proyecto dice "organizador" y las respuestas dicen "administrador de la junta". Un solo término evita ambigüedad en las reglas, las HU y las pantallas.
- A quién preguntar: Product Owner.
- Bloquea: 04-glosario.md, PRINCIPIO-006 y todas las HU que mencionen el rol.
- Plan de resolución: decidir antes de redactar 04-glosario.md y usar ese término en todo el spec-pack.
- Estado: Resuelta el 14/11/2026. El rol se llama "organizador" (04-glosario.md).

### PREG-011: ¿Cuál será el precio del plan VIP en S/ y cómo se cobrará sin violar PRINCIPIO-004?
- Contexto: el Product Owner propuso un plan VIP de unos US$ 1 al mes para gestionar varias juntas a la vez, y lo dejó para después del lanzamiento. PRINCIPIO-003 exige montos en S/. PRINCIPIO-004 prohíbe integrar pasarelas de pago, lo que hoy impide cobrar una suscripción dentro de la app.
- A quién preguntar: Product Owner.
- Bloquea: la sección 4 de 01-project-brief.md, PRINCIPIO-004 y cualquier HU del plan VIP.
- Plan de resolución: decidir después del lanzamiento. Si se decide cobrar dentro de la app, primero se propone un cambio a PRINCIPIO-004 que requiere aprobación humana (PRINCIPIO-012).
- Actualización del 14/11/2026: al resolver PREG-013, el lanzamiento permite varias juntas sin límite. Por eso el plan VIP ya no puede basarse en permitir más de una junta y necesita otra propuesta de valor, que también queda por decidir.
- Avance del 14/11/2026 (alineación de pendientes): se revisa después del lanzamiento. No bloquea ninguna funcionalidad de esta versión.

### PREG-012: ¿Cuál es la meta de usuarios registrados en los meses 1, 3 y 6?
- Contexto: el Product Owner fijó metas de juntas activas (10, 20 y 40), pero no de usuarios registrados. Con más de 10 participantes por junta, 40 juntas serían unos 400 usuarios, pero ese número es una estimación, no una meta aprobada.
- A quién preguntar: Product Owner.
- Bloquea: KPI-02 de 01-project-brief.md.
- Plan de resolución: decidir antes del lanzamiento y registrar la meta en 01-project-brief.md.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). KPI-02: 100 usuarios registrados al cierre del mes 1, 200 al cierre del mes 3 y 400 al cierre del mes 6 (01-project-brief.md §5).

### PREG-013: En el lanzamiento, ¿un organizador puede gestionar varias juntas a la vez o solo una?
- Contexto: la idea del plan VIP supone que el plan gratis permite una sola junta. Pero el plan VIP quedó para después del lanzamiento, y hoy un organizador administra 1 o 2 juntas a la vez.
- A quién preguntar: Product Owner.
- Bloquea: 02-alcance.md, las RN de creación de juntas en 03-reglas-de-negocio.md y PREG-011.
- Plan de resolución: decidir antes de redactar 02-alcance.md.
- Estado: Resuelta el 14/11/2026. En el lanzamiento, un organizador puede gestionar varias juntas a la vez, sin límite (F-02 de 02-alcance.md).

### PREG-014: ¿Cuándo y con qué condiciones se integrarán las notificaciones por WhatsApp?
- Contexto: los usuarios usan más WhatsApp que el correo (riesgo R-01 de 01-project-brief.md). El Product Owner decidió mantener PRINCIPIO-007 y ver WhatsApp como mejora después del lanzamiento. Los mensajes automáticos de WhatsApp Business tienen un costo por mensaje.
- A quién preguntar: Product Owner.
- Bloquea: PRINCIPIO-007 y las RN de notificaciones en 03-reglas-de-negocio.md.
- Plan de resolución: revisar con los resultados de KPI-05 y del supuesto S-03 a los 3 meses del lanzamiento. Si se aprueba, se propone el cambio a PRINCIPIO-007 con aprobación humana (PRINCIPIO-012).
- Avance del 14/11/2026 (alineación de pendientes): se revisa a los 3 meses del lanzamiento, como estaba previsto. No bloquea ninguna funcionalidad de esta versión.

### PREG-015: ¿Se usará el historial de pagos de Mi Junta para evaluar préstamos, y cómo se pedirá ese consentimiento?
- Contexto: el Product Owner planea una futura línea de préstamos conectada con Mi Junta y prefiere pedir el consentimiento para ese uso cuando exista la funcionalidad. La Ley N.° 29733 exige un consentimiento por cada finalidad. Falta definir si se podrán usar los datos registrados antes de ese consentimiento.
- A quién preguntar: asesor legal (relacionada con PREG-001) y Product Owner.
- Bloquea: PRINCIPIO-007, el texto de la política de privacidad y el riesgo R-07 de 01-project-brief.md.
- Plan de resolución: resolver junto con PREG-001 antes de publicar la política de privacidad del lanzamiento.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). El historial de pagos no se usa para evaluar créditos sin un consentimiento específico, y los pagos registrados antes de ese consentimiento nunca se usan para eso (RN-203). La línea de préstamos sigue fuera del alcance (NO-04). Decisión provisional del Product Owner, a confirmar con el asesor legal.

### PREG-016: ¿Qué reglas puede o debe definir el organizador al crear una junta?
- Contexto: hoy las juntas no tienen reglas escritas. El Product Owner indicó que el organizador debe definir las reglas al crear la junta. Faltan definir cuáles son (multas por atraso, días de tolerancia, retiro de un participante, reemplazos, garantías), si son obligatorias u opcionales, y si la app solo las muestra o también las aplica. PRINCIPIO-012 g) impide decidir sobre montos o multas sin una regla escrita.
- A quién preguntar: Product Owner.
- Bloquea: 02-alcance.md y las RN de creación de juntas, atrasos y retiros en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN de creación de juntas.
- Avance del 14/11/2026: en esta versión las reglas solo se registran como texto visible para todos los miembros (F-09 de 02-alcance.md), y la app no las aplica (NO-06). Siguen abiertas cuáles reglas se registran y si son obligatorias u opcionales.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Las reglas son un texto libre y opcional de hasta 2,000 caracteres, sin una lista fija de temas, y solo se editan antes de fijar el orden de turnos (RN-106, RN-110).

### PREG-017: Cuando un participante informa su pago, ¿qué pasa si el organizador lo rechaza o no responde?
- Contexto: el Product Owner indicó que un participante puede registrar su pago y que el organizador lo aprueba. Faltan definir el plazo para aprobar, qué pasa si se rechaza o no hay respuesta, si se adjunta una evidencia (por ejemplo, una captura de Yape) y con qué fecha queda registrado el pago.
- A quién preguntar: Product Owner.
- Bloquea: las RN de registro de pagos en 03-reglas-de-negocio.md, KPI-04 y PREG-020.
- Plan de resolución: decidir antes de redactar las RN de pagos.
- Avance del 14/11/2026: si el organizador rechaza el pago informado, la cuota vuelve a "Pendiente". Si no responde, la cuota sigue en "Por confirmar" sin plazo. No se adjunta evidencia (RN-063 a RN-065 de 03-reglas-de-negocio.md). Sigue abierta la fecha de pago que queda registrada.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). El participante indica la fecha de pago al informarlo, con los mismos límites que el organizador (RN-054, RN-132, RN-137). Al confirmarlo, el pago se registra con esa fecha (RN-138). Solo se informa una cuota "Pendiente" (RN-135). El organizador no informa sus propias cuotas, sino que las registra (RN-136), y recibe un aviso cada vez que un participante informa un pago (RN-139).

### PREG-018: ¿Se puede asignar el orden de turnos sin sorteo, por ejemplo según la necesidad de los participantes?
- Contexto: el orden casi siempre se decide por sorteo, pero a veces se asigna a quien tiene más necesidad. PRINCIPIO-008 solo regula el sorteo. Si se permite asignar el orden a mano, hace falta definir quién lo decide y cómo se deja registro.
- A quién preguntar: Product Owner.
- Bloquea: PRINCIPIO-008 y las RN del sorteo y de los cambios de turno en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN del sorteo.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Sí se permite (F-10, Should). El orden manual y el sorteo se excluyen: cada junta fija su orden una sola vez (RN-125). Exige todos los cupos llenos (RN-126) y debe dar a cada participante un turno distinto de 1 a n (RN-127). Es inmutable (RN-128), anula el código de invitación (RN-129) y guarda quién lo asignó y cuándo (RN-038, RN-039).

### PREG-019: ¿El organizador recibe algún beneficio por organizar la junta?
- Contexto: el Product Owner indicó que organizar es voluntario, pero que el organizador podría recibir un beneficio, por ejemplo cobrar primero, quedarse con una comisión o no pagar una cuota. Cualquier beneficio en dinero cambia el cálculo de cuotas, y un agente de IA no puede decidirlo sin una regla escrita (PRINCIPIO-012 g).
- A quién preguntar: Product Owner.
- Bloquea: las RN de cálculo de cuotas y del sorteo en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN de cálculo de cuotas, junto con PREG-002.
- Estado: Resuelta el 14/11/2026. En esta versión el organizador no recibe ningún beneficio. Si participa, paga la misma cuota que los demás (RN-043 de 03-reglas-de-negocio.md).

### PREG-020: ¿Qué fecha cuenta para saber si un pago llegó "a tiempo", y el día de vencimiento cuenta como a tiempo?
- Contexto: KPI-03 y KPI-04 dependen de comparar la fecha de pago con la fecha de vencimiento. El pago puede tener varias fechas (cuando se hizo, cuando se registró en la app, cuando lo aprobó el organizador), y la definición acordada dice "antes de la fecha de vencimiento", sin aclarar si el mismo día cuenta.
- A quién preguntar: Product Owner.
- Bloquea: KPI-03 y KPI-04 de 01-project-brief.md y las RN de vencimiento en 03-reglas-de-negocio.md.
- Plan de resolución: decidir junto con PREG-017 antes de redactar las RN de pagos.
- Estado: Resuelta el 14/11/2026. Cuenta la fecha de pago que indica el organizador. El pago es a tiempo si esa fecha es igual o anterior a la fecha de vencimiento, así que el día del vencimiento cuenta como a tiempo. La fecha de pago no puede ser futura (RN-052 a RN-056 de 03-reglas-de-negocio.md).

### PREG-021: ¿Qué preguntas tendrá la encuesta de horas del organizador y cómo se aplicará?
- Contexto: KPI-05 se mide con una encuesta al organizador al empezar a usar la app y a los 3 meses. La línea base actual (8 a 16 horas al mes) viene de un solo entorno. Faltan definir las preguntas, el medio de envío y la cantidad mínima de respuestas para que el resultado sea válido. Si la encuesta usa un servicio externo, ese servicio necesita aprobación (PRINCIPIO-012 h).
- A quién preguntar: Product Owner.
- Bloquea: KPI-05 de 01-project-brief.md.
- Plan de resolución: definir la encuesta antes del lanzamiento, para medir la línea base con las primeras 10 juntas.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). La encuesta va dentro de la app, sin servicio externo, al crear la primera junta y a los 3 meses de la primera respuesta (RN-204, RN-205). Tiene 3 preguntas: horas al mes dedicadas a gestionar las juntas, recordatorios enviados a mano al mes y si reenvía por WhatsApp los recordatorios de Mi Junta (RN-206). KPI-05 solo se calcula con al menos 10 organizadores que respondieron las dos encuestas (01-project-brief.md §5). Funcionalidad F-18 (02-alcance.md).

### PREG-022: ¿Existen apps o servicios que ya resuelvan la organización de juntas en Perú?
- Contexto: el Product Owner no conoce competidores (supuesto S-07 de 01-project-brief.md). Si existen, la propuesta de valor debe diferenciarse de ellos.
- A quién preguntar: Agente Analyst, con una revisión de competidores validada por el Product Owner.
- Bloquea: la sección 3 de 01-project-brief.md.
- Plan de resolución: revisar las tiendas de apps y las soluciones locales antes de cerrar la versión 1.0 de 01-project-brief.md.
- Avance del 14/11/2026 (alineación de pendientes): queda como tarea de investigación del Agente Analyst. No bloquea ninguna funcionalidad de esta versión.

### PREG-023: ¿Cuántos dígitos tiene el código del segundo factor y cuánto tiempo es válido?
- Contexto: PRINCIPIO-005 permite activar un segundo factor con un código enviado al correo, pero no fija la longitud del código, su tiempo de validez ni cuántos intentos fallidos se permiten. Sin esos valores no se puede escribir un test que verifique el principio (PRINCIPIO-011).
- A quién preguntar: arquitecto de software o responsable de seguridad, con visto bueno del Product Owner.
- Bloquea: PRINCIPIO-005 y las RN de autenticación en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las HU de inicio de sesión y registrar los valores en PRINCIPIO-005, con aprobación humana (PRINCIPIO-012).
- Estado: Resuelta el 14/11/2026. El código tiene 6 dígitos, vale 600 segundos y se anula después de 5 intentos fallidos. Con aprobación humana se registró en PRINCIPIO-005 de 00-constitucion.md v0.2 (RN-079 a RN-081 de 03-reglas-de-negocio.md).

### PREG-024: ¿Qué formato tiene el código de invitación, cuánto tiempo es válido y cuántas veces se puede usar?
- Contexto: el Product Owner decidió que un invitado se une a la junta con un código y que para unirse necesita una cuenta (sección 7 de 02-alcance.md). No se definió la longitud ni los caracteres del código, si vence, si sirve para una sola persona o para todo el grupo, ni si el organizador puede anularlo. Sin esos valores no se puede escribir un test que lo verifique (PRINCIPIO-011).
- A quién preguntar: Product Owner, con visto bueno del arquitecto de software o del responsable de seguridad.
- Bloquea: F-02 de 02-alcance.md y las RN de invitación en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN de invitación.
- Estado: Resuelta el 14/11/2026. El código tiene 8 caracteres de `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` y sirve para todo el grupo hasta que se llenan los cupos o se ejecuta el sorteo. El organizador puede regenerarlo, y entonces el código anterior se anula (RN-015 a RN-021 de 03-reglas-de-negocio.md).
- Aclaración del 14/11/2026 (PREG-038): con los cupos llenos el código se rechaza, pero no se anula. Si se libera un cupo antes del sorteo, vuelve a servir (RN-018). Se anula para siempre al fijar el orden de turnos o al regenerarse.

### PREG-025: ¿Cuál es el mínimo y el máximo de días de aviso previo que el organizador puede fijar para los recordatorios?
- Contexto: el organizador fija al crear la junta cuántos días antes del vencimiento se envía el primer recordatorio (sección 7 de 02-alcance.md). No se definió el rango permitido ni el valor que aparece por defecto. En una junta semanal, el aviso previo no puede superar la duración del periodo.
- A quién preguntar: Product Owner.
- Bloquea: F-02 y F-06 de 02-alcance.md y las RN de recordatorios en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN de recordatorios, junto con PREG-026.
- Estado: Resuelta el 14/11/2026. De 1 a 7 días, con 3 días por defecto, y siempre menos días que el periodo (RN-010 a RN-012 de 03-reglas-de-negocio.md).

### PREG-026: Después del vencimiento, ¿cada cuánto se reenvía el recordatorio y hay un máximo de envíos?
- Contexto: el Product Owner decidió que después del vencimiento se siguen enviando recordatorios hasta que la cuota quede registrada como pagada (sección 7 de 02-alcance.md). No se definió la frecuencia de reenvío ni si hay un tope. Muchos envíos seguidos aumentan el riesgo de que los correos caigan en spam (R-11 de 01-project-brief.md) y pueden tensionar la relación con el participante.
- A quién preguntar: Product Owner.
- Bloquea: F-06 de 02-alcance.md y las RN de recordatorios en 03-reglas-de-negocio.md. Se relaciona con PREG-009.
- Plan de resolución: decidir antes de redactar las RN de recordatorios, junto con PREG-025.
- Estado: Resuelta el 14/11/2026. Después del vencimiento se reenvía cada 2 días, con un máximo de 5 envíos. Todos los recordatorios salen a las 09:00 America/Lima (RN-066, RN-070 y RN-071 de 03-reglas-de-negocio.md).

### PREG-027: ¿Cuál es el rango de la frecuencia "cada cierta cantidad de días", y cómo se calculan las fechas de vencimiento quincenales y mensuales?
- Contexto: las frecuencias permitidas son semanal, quincenal, mensual y cada cierta cantidad de días que define el organizador (sección 7 de 02-alcance.md). No se definió el mínimo ni el máximo de días. Tampoco se definió si "quincenal" significa cada 15 días o dos fechas fijas al mes, ni qué pasa con un vencimiento mensual fijado en un día 29, 30 o 31 en los meses que no lo tienen.
- A quién preguntar: Product Owner.
- Bloquea: F-02 de 02-alcance.md, las RN de cálculo de fechas de vencimiento en 03-reglas-de-negocio.md y los tests al 100 % del módulo de cuotas (PRINCIPIO-011).
- Plan de resolución: decidir antes de redactar las RN de cálculo de cuotas, junto con PREG-002.
- Estado: Resuelta el 14/11/2026. "Cada N días" va de 1 a 60. Quincenal es cada 15 días. El vencimiento mensual cae el mismo día de la ronda 1 y, si el mes no tiene ese día, el último día del mes. La ronda 1 vence en la fecha de creación o después (RN-008, RN-009 y RN-046 a RN-050 de 03-reglas-de-negocio.md).

### PREG-028: ¿Se permite la frecuencia "cada 1 día", y con qué días de aviso previo?
- Contexto: RN-008 de 03-reglas-de-negocio.md permite "cada N días" con N de 1 a 60. Pero RN-010 exige al menos 1 día de aviso previo y RN-012 exige que el aviso sea menor que el periodo. Con N = 1 ningún valor de aviso cumple las dos reglas, así que esa junta no se puede crear.
- A quién preguntar: Product Owner.
- Bloquea: RN-008, RN-010 y RN-012 de 03-reglas-de-negocio.md y el formulario de creación de juntas (F-02).
- Plan de resolución: decidir antes de redactar las HU de creación de juntas. Las opciones son subir el mínimo de N a 2, permitir 0 días de aviso cuando N = 1, o no enviar el aviso previo en esas juntas.
- Actualización del 14/11/2026 (auditoría QA): el mismo problema afecta al valor por defecto (3) cuando N = 2 o N = 3.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). N va de 2 a 60 (RN-008). Si al elegir la frecuencia los días de aviso no son menores que el periodo, pasan a periodo − 1 (RN-098).

### PREG-029: ¿Qué pasa si llega la fecha de vencimiento de la ronda 1 y la junta todavía tiene cupos libres o no hizo el sorteo?
- Contexto: RN-009 permite que la ronda 1 venza el mismo día en que se crea la junta, y RN-027 solo permite sortear con todos los cupos llenos. Por eso una cuota puede vencer antes de que se sepa quién recibe el pozo, y los recordatorios de F-06 saldrían para una junta incompleta.
- A quién preguntar: Product Owner.
- Bloquea: RN-009, RN-027 y RN-068 a RN-071 de 03-reglas-de-negocio.md, y las HU de creación de juntas y de sorteo.
- Plan de resolución: decidir antes de redactar las HU del sorteo. Las opciones son correr las fechas de vencimiento hasta el sorteo, no generar cuotas ni recordatorios antes del sorteo, o exigir una distancia mínima entre la creación y la ronda 1.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). No se generan cuotas ni recordatorios antes de fijar el orden de turnos (RN-105, RN-042). Si al fijarlo la ronda 1 ya venció, se rechaza y el organizador cambia la fecha (RN-122, RN-106). Los recordatorios cuyo momento ya pasó no se envían (RN-141).

### PREG-030: ¿Una cuota "Por confirmar" debe seguir recibiendo recordatorios?
- Contexto: F-06 envía recordatorios hasta que la cuota quede registrada como pagada. Con F-08, una cuota que el participante ya informó queda "Por confirmar" y no "Pagada", así que según RN-069 y RN-070 seguiría recibiendo recordatorios aunque el participante ya pagó. Esto puede tensionar la relación con el grupo (R-09) y aumentar el riesgo de spam (R-11).
- A quién preguntar: Product Owner.
- Bloquea: RN-069 a RN-072 de 03-reglas-de-negocio.md y la HU de pago informado (F-08).
- Plan de resolución: decidir antes de redactar las HU de F-08. Las opciones son seguir enviando recordatorios, pausarlos mientras la cuota esté "Por confirmar", o enviar el recordatorio al organizador para que confirme.
- Actualización del 14/11/2026 (auditoría QA): RN-068 ya filtraba por "Pendiente" y RN-069 y RN-070 por "no Pagada". La decisión tiene que unificar las tres.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Los recordatorios se pausan mientras la cuota esté "Por confirmar" (RN-140), y RN-068 a RN-070 aplican solo a cuotas "Pendiente". Si el organizador rechaza el pago, los recordatorios siguen según el calendario de RN-070 y cuentan para el máximo de RN-071. Además, el organizador recibe un aviso al momento (RN-139).

### PREG-031: ¿Qué estados tiene una junta y cuándo se generan sus rondas y cuotas?
- Contexto: RN-013 y RN-042 creaban rondas y cuotas sin decir en qué momento, y ninguna regla definía los estados de la junta, aunque RN-018, RN-027 y KPI-06 dependen de ellos (QA-02).
- A quién preguntar: Product Owner.
- Bloquea: el módulo de cálculo de cuotas (PRINCIPIO-011), las HU de creación de juntas y de sorteo, y KPI-01 y KPI-06.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Estados "Abierta", "Completa", "En curso" y "Terminada", con el diagrama de la sección 2.1 de 03 (RN-099 a RN-104). Las rondas y las cuotas se generan al fijar el orden de turnos (RN-013, RN-042, RN-105).

### PREG-032: ¿Un participante puede salir de una junta, o el organizador quitarlo?
- Contexto: el contraejemplo de RN-019 daba por hecho que un participante podía salir, pero ninguna regla lo definía (QA-03). Afecta turnos y dinero (PRINCIPIO-012 g).
- A quién preguntar: Product Owner.
- Bloquea: RN-018, las HU de participantes y F-13.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU de participantes.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Antes de fijar el orden de turnos, un participante puede salir y el organizador puede quitarlo, y el cupo se libera (RN-111 a RN-113). Después nadie sale (RN-114). El organizador no puede dejar su junta ni transferir el rol (RN-115). Reemplazar participantes y cambiar turnos queda fuera de esta versión (NO-13 de 02-alcance.md).

### PREG-033: ¿Qué datos de una junta se pueden editar después de crearla?
- Contexto: todas las reglas validaban solo la creación (QA-04). Cambiar la cuota es una decisión sobre dinero (PRINCIPIO-012 g).
- A quién preguntar: Product Owner.
- Bloquea: las HU de edición de juntas.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Antes de fijar el orden de turnos se edita todo con las mismas validaciones de la creación (RN-106, RN-107), sin bajar la cantidad de participantes por debajo de los cupos ocupados (RN-108) y sin que el organizador pase a participar si no hay cupo (RN-109). Después solo se edita el nombre (RN-110).

### PREG-034: ¿Qué datos de la junta recibe el organizador, y quién puede ver el registro del sorteo?
- Contexto: una versión anterior de PRINCIPIO-006 limitaba también al organizador a cuatro datos de los demás, y así no podía gestionar pagos (QA-01). Tampoco se definía quién puede verificar el sorteo (QA-25).
- A quién preguntar: Product Owner. Cambia la constitución, así que requiere aprobación humana (PRINCIPIO-012).
- Bloquea: F-04, F-05, F-08, F-14 y el contrato de la API de miembros.
- Plan de resolución: aprobar o cambiar PRINCIPIO-006 y PRINCIPIO-008 de 00-constitucion.md v0.2.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). PRINCIPIO-006 separa los datos personales, que nadie recibe de otro miembro, de los datos de la junta. El organizador recibe todas las cuotas y pagos de su junta (RN-120). Todo miembro ve el registro del sorteo para reproducirlo (RN-121).

### PREG-035: ¿Cómo se arma la lista de entrada del sorteo y qué generador se deriva de la semilla?
- Contexto: "orden de entrada" no estaba definido, los ejemplos guardaban nombres que se pueden repetir, y el generador derivado de la semilla no estaba especificado, así que no se podía reproducir el sorteo fuera del sistema (QA-06).
- A quién preguntar: Product Owner y arquitecto de software. Cambia el sorteo, así que requiere aprobación humana (PRINCIPIO-012).
- Bloquea: F-03 y los tests al 100 % del módulo de sorteo (PRINCIPIO-011).
- Plan de resolución: aprobar o cambiar el anexo A de 03-reglas-de-negocio.md.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). La lista de entrada son los identificadores de usuario ordenados por el momento en que cada uno ocupó su cupo (RN-123). El algoritmo `fisher-yates-v1` usa HMAC-SHA256 sobre la semilla y muestreo por rechazo, con un vector de prueba (RN-124, anexo A).

### PREG-036: ¿Qué datos pide la cuenta y cómo se verifican y recuperan?
- Contexto: RN-085 y RN-086 validaban un DNI y un celular que ninguna regla pedía. Faltaban la unicidad, la verificación del correo, la recuperación de la contraseña y la duración de la sesión (QA-09).
- A quién preguntar: Product Owner y responsable de seguridad. Toca la autenticación, así que requiere aprobación humana (PRINCIPIO-012). Relacionada con PREG-001.
- Bloquea: F-01 y las HU de registro y de inicio de sesión.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU de registro.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Obligatorios: nombre de 2 a 80 caracteres, correo y contraseña (RN-146, RN-147). DNI y celular opcionales (RN-148). La fecha de nacimiento y la foto no se piden (RN-149, NO-14). El correo y el DNI son únicos (RN-150, RN-151). El correo se verifica con un enlace de 86,400 s antes de crear una junta o unirse a una (RN-152 a RN-154). La contraseña se recupera con un enlace de un solo uso de 3600 s, que no revela si el correo existe (RN-155 a RN-157). Cambiarla cierra las demás sesiones (RN-158), y una sesión se cierra a los 30 días sin uso (RN-159).

### PREG-037: ¿Cómo funciona el ciclo completo del código de verificación?
- Contexto: PREG-023 fijó la longitud, la vigencia y los intentos, pero no si el código es de un solo uso, cómo se reenvía ni cómo se activa y desactiva el segundo factor (QA-10).
- A quién preguntar: responsable de seguridad, con visto bueno del Product Owner. Toca la autenticación (PRINCIPIO-012).
- Bloquea: F-11.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU de F-11.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Un solo uso (RN-162). Un código nuevo anula el anterior (RN-163). Máximo 5 códigos cada 900 s (RN-164). La activación se confirma con un código (RN-165, RN-166), y la desactivación pide la contraseña y un código (RN-167).

### PREG-038: ¿Se pueden reutilizar los códigos de invitación, y cómo se evita que se adivinen?
- Contexto: RN-016 solo evitaba repetir códigos vigentes, así que un código anulado podía volver a salir en otra junta. Tampoco había un límite de intentos ni un mensaje para un código inexistente (QA-24).
- A quién preguntar: Product Owner y responsable de seguridad.
- Bloquea: las HU de invitación.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU de invitación.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Ningún código se reutiliza nunca (RN-016). Un código inexistente se rechaza (RN-116). Una cuenta con 10 códigos inválidos en 3600 s no puede unirse a una junta durante los 3600 s siguientes (RN-117). Además, RN-018 rechaza el código mientras no haya cupos, pero no lo anula: si se libera un cupo, el código vuelve a servir.

### PREG-039: ¿Qué es la "ronda actual" y qué se muestra de quien no tiene próxima cuota?
- Contexto: PRINCIPIO-006 y RN-022 usaban "ronda actual" y "próximo pago" sin definirlos, y no decían qué entregar de un organizador que no participa (QA-12).
- A quién preguntar: Product Owner.
- Bloquea: F-05 y el contrato de la API de miembros.
- Plan de resolución: aprobar o cambiar las definiciones de 04-glosario.md.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Ronda actual: la de número más bajo que vence hoy o después. Si todas vencieron, la última. Próxima cuota: la de la ronda siguiente a la actual (04-glosario.md). Si no hay próxima cuota, sus campos van vacíos (RN-119). Del organizador que no participa solo se entrega el nombre y el rol (RN-118).

### PREG-040: ¿Qué casos borde se aceptan al registrar y corregir pagos?
- Contexto: no estaba definido qué pasa al marcar una cuota ya pagada, al desmarcar una no pagada, con fechas de pago muy antiguas, con pagos adelantados ni al corregir una fecha (QA-17).
- A quién preguntar: Product Owner.
- Bloquea: F-04 y KPI-03 y KPI-04.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU de pagos.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Solo se registra un pago en una cuota "Pendiente" (RN-130) y solo se desmarca una cuota "Pagada" (RN-131). La fecha de pago no puede ser anterior a la creación de la junta (RN-132). Se permiten pagos de rondas futuras (RN-133). La fecha de pago no se edita: se desmarca y se vuelve a registrar (RN-134).

### PREG-041: ¿Con qué tolerancia, conteo y contenido salen los recordatorios?
- Contexto: "a las 09:00" no tenía una tolerancia que se pudiera medir. Tampoco estaba definido si un rebote o un push cuentan para el máximo de 5, qué pasa con un recordatorio cuyo momento ya pasó, ni qué dice el mensaje (QA-19).
- A quién preguntar: Product Owner.
- Bloquea: F-06 y F-07.
- Plan de resolución: aprobar o cambiar la propuesta antes de redactar las HU de recordatorios.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Salen entre las 09:00:00 y las 09:15:00 (RN-066). No se envía un recordatorio cuyo momento ya pasó (RN-141). Un correo y su push cuentan como uno (RN-142), y un recordatorio cuenta como enviado cuando el proveedor lo acepta (RN-143). El mensaje lleva la junta, la ronda, el monto y el vencimiento (RN-144), sin datos de otros miembros (RN-145).

### PREG-042: ¿Qué pasa con el contador de intentos fallidos al terminar el bloqueo?
- Contexto: RN-075 no decía si el contador vuelve a 0 al terminar el bloqueo ni si los intentos durante el bloqueo cuentan. El contraejemplo de RN-076 sugería un reinicio diario (QA-23).
- A quién preguntar: responsable de seguridad. Toca la autenticación (PRINCIPIO-012).
- Bloquea: las HU de inicio de sesión.
- Plan de resolución: aprobar o cambiar la propuesta.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Al terminar el bloqueo el contador vuelve a 0 (RN-160). Durante el bloqueo los intentos se rechazan sin contarse (RN-161). El riesgo de que alguien bloquee una cuenta ajena se acepta y queda como R-13 en 01-project-brief.md.

### PREG-043: ¿Qué pasa cuando se publica una versión nueva de la política de privacidad?
- Contexto: RN-083 guarda la versión aceptada al crear la cuenta, pero no estaba definido qué pasa con los usuarios existentes cuando cambia la política (QA-26).
- A quién preguntar: Product Owner y asesor legal (relacionada con PREG-001).
- Bloquea: F-01.
- Plan de resolución: aprobar o cambiar la propuesta junto con PREG-001.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). El usuario acepta la versión nueva antes de volver a ver sus juntas (RN-168), y se guarda cada versión aceptada con su fecha y hora (RN-169). Si se siguen enviando recordatorios mientras no la acepta queda en PREG-001.

### PREG-044: ¿Qué formatos y textos se usan en la entrada de datos y en los mensajes?
- Contexto: faltaban la longitud del nombre de la junta, el formato de entrada de los montos, el formato de la hora y los mensajes de error. Tampoco estaba claro si "usted" y los formatos de Perú aplican a correos y push (QA-21, QA-22, QA-33).
- A quién preguntar: Product Owner. El formato de la hora y el alcance a correos y push cambian PRINCIPIO-002 y PRINCIPIO-003 (PRINCIPIO-012).
- Bloquea: los prototipos de prototipos/ y las HU con formularios.
- Plan de resolución: aprobar o cambiar la propuesta antes de diseñar los prototipos.
- Estado: Resuelta el 14/11/2026, con la decisión que propuso la auditoría QA y aprobó el Product Owner (auditorias/qa-clase1.md). Nombre de la junta de 3 a 60 caracteres (RN-096). El monto se ingresa solo con dígitos y punto decimal (RN-097). Hora en HH:MM de 24 horas (RN-177). "Usted", S/ y DD/MM/AAAA también en correos y push (RN-090 a RN-093). Catálogo de mensajes en la sección 2.9 de 03.

### PREG-045: ¿Una persona extranjera, con carné de extranjería en lugar de DNI, puede registrar su documento?
- Contexto: PRINCIPIO-003 y RN-085 solo aceptan el DNI peruano (`^\d{8}$`). Desde la v0.2 de 03-reglas-de-negocio.md el DNI es opcional (RN-148), así que una persona extranjera puede crear su cuenta sin documento, pero no puede registrar su carné de extranjería. El lanzamiento es para todos los segmentos (01-project-brief.md §2) (QA-40).
- A quién preguntar: Product Owner, con visto bueno del asesor legal (relacionada con PREG-001).
- Bloquea: RN-085, RN-148 y RN-151 de 03-reglas-de-negocio.md, y PRINCIPIO-003 si se acepta otro documento.
- Plan de resolución: decidir antes de redactar las HU de registro. Las opciones son mantener solo el DNI, o aceptar también el carné de extranjería con su propio formato, lo que requiere cambiar PRINCIPIO-003 con aprobación humana (PRINCIPIO-012).
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). En esta versión solo se acepta el DNI (RN-085). Como el DNI es opcional (RN-148), una persona extranjera crea su cuenta sin documento. PRINCIPIO-003 no cambia.

### PREG-046: ¿Qué pasa con una junta en la que una cuota queda "Pendiente" sin plazo, por ejemplo cuando un participante que ya recibió el pozo deja de pagar?
- Contexto: después del 5.º recordatorio posterior al vencimiento, el sistema no envía más (RN-071) y no hay ninguna otra acción definida, así que la cuota sigue "Pendiente" sin límite. Nadie puede salir de la junta ni ser reemplazado después de fijar el orden de turnos (RN-114, NO-13), y la junta no pasa a "Terminada" mientras quede una cuota sin pagar (RN-103). Por eso esa junta queda "En curso" para siempre y cuenta en contra de KPI-06. Tampoco está definido qué muestra la app sobre el pozo de una ronda que tiene cuotas pendientes. El brief no reporta casos de alguien que cobra su turno y deja de pagar (01-project-brief.md §1), pero no hay ninguna regla para ese caso. Cubrir la diferencia con multas o préstamos está fuera del alcance (NO-06, NO-10), y un agente no puede decidirlo sin una regla escrita (PRINCIPIO-012 g). Detectada en la prueba de fuego (auditorias/prueba-de-fuego.md, pregunta 2).
- A quién preguntar: Product Owner.
- Bloquea: RN-103, KPI-06, F-15 y las HU de seguimiento de pagos (F-04 y F-05).
- Plan de resolución: decidir antes de redactar las HU de F-04 y F-05. Las opciones son dejar la junta "En curso" sin plazo, permitir que el organizador cierre la junta con cuotas pendientes (relacionada con F-15), o agregar un estado de cuota para las que el grupo da por perdidas.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). Una junta con una cuota impaga sigue "En curso" sin plazo (RN-103). Se revisa cuando se trabaje F-15 (Cerrar y borrar una junta).

### PREG-047: ¿El organizador recibe un aviso cuando una cuota vence sin pagarse?
- Contexto: los recordatorios solo llegan al participante de la cuota (RN-068 a RN-070), y el organizador solo recibe un aviso cuando un participante informa un pago (RN-139). Para saber quién no pagó, el organizador tiene que abrir la app y revisar las cuotas (RN-120). El problema más grave del organizador es el tiempo que dedica a cobrar y recordar (01-project-brief.md §1, KPI-05). Ninguna funcionalidad de 02-alcance.md lo incluye ni lo excluye. Propuesta en la prueba de fuego (auditorias/prueba-de-fuego.md, preguntas 2 y 5).
- A quién preguntar: Product Owner.
- Bloquea: F-06, F-07 y la medición de KPI-05, si se aprueba.
- Plan de resolución: decidir antes de redactar las HU de F-06. Las opciones son no enviar ningún aviso, enviar un aviso por cada cuota vencida, o enviar un resumen por junta. Si se aprueba, también hay que decidir cuándo y cada cuánto se envía, y si cuenta para el máximo de RN-071. Las RN nuevas toman el siguiente número libre.
- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). Sí, como funcionalidad nueva F-16 (Should): el día siguiente al vencimiento de una ronda con cuotas "Pendiente", el organizador recibe un correo por junta, entre las 09:00 y las 09:15, con el nombre de cada participante que falta pagar (RN-196). No cuenta para el máximo de RN-071, porque no es un recordatorio al participante.

### PREG-048: ¿Quién del equipo de Mi Junta puede acceder a los datos de las juntas y de los usuarios, y cómo se registra ese acceso?
- Contexto: PRINCIPIO-006 define qué recibe cada usuario según su rol, y RN-024 rechaza a quien no es miembro de la junta. Pero ninguna regla dice si alguien del equipo de la empresa (soporte, operación o acceso directo a la base de datos) puede ver juntas, cuotas o datos personales, ni si ese acceso queda registrado. La Ley N.° 29733 podría exigir controles sobre ese acceso (PREG-001). Detectada en la prueba de fuego (auditorias/prueba-de-fuego.md, pregunta 4).
- A quién preguntar: Product Owner, responsable de seguridad y asesor legal (relacionada con PREG-001). Toca los permisos, así que requiere aprobación humana (PRINCIPIO-012).
- Bloquea: PRINCIPIO-005, PRINCIPIO-006 y el diseño de arquitectura.
- Plan de resolución: resolver junto con PREG-001 y PREG-008 antes del diseño de arquitectura.

- Estado: Resuelta el 14/11/2026 por el Product Owner (alineación de pendientes, 03-reglas-de-negocio.md §1.3). Solo el líder técnico accede a los datos de producción, y solo para resolver un incidente (RN-200). Cada acceso se registra con quién, cuándo y el incidente (RN-201). Nadie puede descifrar a mano el DNI ni el celular (RN-202). Decisión provisional del Product Owner, a confirmar con el asesor legal.

### PREG-049: ¿Qué pasa con una junta "Abierta" o "Completa" si su organizador borra su cuenta?
- Contexto: el usuario puede borrar su cuenta si no es miembro de una junta "En curso" (RN-182). Un participante sale de sus juntas "Abierta" o "Completa" al borrarla (RN-186), pero el organizador no puede dejar su junta (RN-115) ni transferir el rol (NO-13). Detectada en la alineación de pendientes del 14/11/2026.
- A quién preguntar: Product Owner.
- Bloquea: F-17 (02-alcance.md) y HU-017.
- Plan de resolución: decidir antes de implementar F-17. Las opciones son impedir que el organizador borre su cuenta mientras tenga juntas sin terminar, o borrar esas juntas avisando a sus participantes.
- Estado: Resuelta el 14/11/2026 por el Product Owner (segunda ronda de la alineación). El organizador de una junta "Abierta" o "Completa" no puede borrar su cuenta (RN-207), porque no puede dejar su junta (RN-115).

### PREG-050: ¿Dónde se guardan las claves de cifrado en el servidor dedicado?
- Contexto: el Product Owner decidió alojar la app en un servidor dedicado en la nube, bajo control total de la empresa (07-architecture.md). PRINCIPIO-005 exige que la clave AES no esté en la base de datos ni en el repositorio. Antes esto dependía de PREG-008, que se resolvió sobre los datos del dispositivo.
- A quién preguntar: líder técnico, con aprobación del Product Owner (cambia el cifrado, PRINCIPIO-012).
- Bloquea: PRINCIPIO-005, ADR-005 de 07-architecture.md y la dependencia "Gestor de secretos" de 02-alcance.md §6.
- Plan de resolución: decidir al preparar el servidor. Las opciones son un gestor de secretos instalado en el servidor, el servicio de claves del proveedor de nube o un archivo fuera del repositorio legible solo por el proceso de la app.
- Estado: Resuelta el 14/11/2026 por el Product Owner (segunda ronda de la alineación). Las claves se entregan como variables de entorno a los contenedores Docker en los que corre todo, desde un archivo `.env` que solo existe en el servidor y nunca en el repositorio (PRINCIPIO-005 v0.4, ADR-005 de 07-architecture.md).

### PREG-051: ¿Qué proveedor y qué región tendrá el servidor dedicado?
- Contexto: el p95 de ≤ 500 ms de PRINCIPIO-010 se mide desde Perú. Un servidor lejos de Lima suma latencia en cada petición, sobre todo con redes móviles lentas.
- A quién preguntar: Product Owner y líder técnico.
- Bloquea: la dependencia "Hosting" de 02-alcance.md §6 y ADR-001 de 07-architecture.md.
- Plan de resolución: decidir al preparar el servidor, eligiendo la región más cercana a Lima que ofrezca el proveedor.
- Estado: Resuelta el 14/11/2026 por el Product Owner (segunda ronda de la alineación). El servidor es dedicado, de la empresa, y está en Perú.

### PREG-052: ¿El SMTP es un servidor de correo propio o un servicio externo de envío por SMTP?
- Contexto: el Product Owner decidió enviar los correos por SMTP. Un servidor propio evita un servicio externo, pero sus correos caen en spam con más frecuencia si la dirección IP no tiene reputación (R-11). Un servicio externo de envío por SMTP requiere aprobación (PRINCIPIO-012 h).
- A quién preguntar: Product Owner y líder técnico.
- Bloquea: F-06, F-11, F-16 y la dependencia "Servicio de correo" de 02-alcance.md §6.
- Plan de resolución: decidir antes de implementar F-06. En los dos casos el dominio se configura con SPF, DKIM y DMARC.
- Estado: Resuelta el 14/11/2026 por el Product Owner (segunda ronda de la alineación). Los correos se envían con la librería `nodemailer` por el SMTP de Microsoft 365, `smtp.office365.com`. El Product Owner aprobó la dependencia y el servicio (PRINCIPIO-012 e y h). Los límites de envío del buzón quedan como riesgo R-15 (01-project-brief.md).

### PREG-053: ¿El organizador puede desactivar el aviso de cuotas vencidas?
- Contexto: el participante puede desactivar sus recordatorios por correo (RN-187). F-16 agrega un correo al organizador el día siguiente al vencimiento de una ronda con cuotas pendientes (RN-196), pero no es un recordatorio y ninguna regla dice si se puede desactivar. Detectada al redactar HU-016 el 14/11/2026.
- A quién preguntar: Product Owner.
- Bloquea: HU-016.
- Plan de resolución: decidir antes de implementar F-16. Las opciones son que se pueda desactivar con la misma preferencia de RN-187, con una preferencia propia, o que no se pueda desactivar.
- Estado: Resuelta el 14/11/2026 por el Product Owner (segunda ronda de la alineación). Sí. El organizador puede desactivar y volver a activar el aviso, con una preferencia propia, distinta de la de sus recordatorios (RN-208, RN-209).

### PREG-054: ¿El organizador puede cerrar la encuesta de KPI-05 sin responderla?
- Contexto: la app muestra la encuesta al crear la primera junta y a los 3 meses de responderla (RN-204, RN-205). Si el organizador la cierra sin responder, no hay fecha desde la cual contar los 3 meses, y KPI-05 pierde esa respuesta. Detectada al redactar HU-018 el 14/11/2026.
- A quién preguntar: Product Owner.
- Bloquea: HU-018 y la medición de KPI-05.
- Plan de resolución: decidir antes de implementar F-18. Las opciones son que la encuesta sea obligatoria, que se pueda posponer y se vuelva a mostrar al día siguiente, o que se pueda cerrar sin volver a mostrarla.
- Estado: Resuelta el 14/11/2026 por el Product Owner (segunda ronda de la alineación). Sí. El organizador puede cerrar la encuesta sin responderla (RN-210); esa encuesta no se le vuelve a mostrar (RN-211), y la de los 3 meses se cuenta desde que respondió o cerró la primera (RN-205).

### PREG-055: ¿Cómo se escriben y ejecutan los escenarios Gherkin que exige PRINCIPIO-011?
- Contexto: PRINCIPIO-011 pide al menos un escenario Gherkin (Dado / Cuando / Entonces) por RN, y 08-backlog.md pide que los tests de cada tarea sean escenarios Gherkin. Ninguna dependencia aprobada ejecuta archivos `.feature`. Detectada en auditorias/qa-clase2.md (C-01).
- A quién preguntar: Product Owner y líder técnico.
- Bloquea: la definición de terminado de cada tarea de dominio de 08-backlog.md.
- Plan de resolución: elegir entre aprobar un ejecutor de Gherkin o escribir los escenarios con Vitest y Playwright.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner (03-reglas-de-negocio.md §1.4). Sin ejecutor nuevo. Cada test de Vitest o Playwright se llama `Escenario: RN-NNN <descripción>` (o `Escenario: PRINCIPIO-NNN …` para un escenario técnico), y su cuerpo marca los pasos con los comentarios `// Dado`, `// Cuando` y `// Entonces`. Un script del pipeline, sin dependencias, falla si un test no sigue ese formato (07-architecture.md §6.1, T-001).

### PREG-056: ¿Qué pasa con el cupo del organizador si deja de participar antes de fijar el orden de turnos?
- Contexto: RN-106 permite que el organizador edite "su participación" antes del sorteo, y RN-109 cubre el caso de pasar a participar. Ninguna regla dice qué pasa al pasar de "Sí participo" a "No participo": si se libera su cupo, si la junta vuelve a "Abierta" y si sigue en la lista de entrada del sorteo (RN-030, RN-123). Detectada en auditorias/qa-clase2.md (M-04).
- A quién preguntar: Product Owner.
- Bloquea: HU-014 y T-011.
- Plan de resolución: decidir antes de implementar API-010.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. Se libera su cupo (RN-212). Si la junta estaba "Completa", vuelve a "Abierta" (RN-101), y al fijar el orden el organizador no entra en la lista de entrada (RN-030) ni recibe cuotas (RN-044). Si después vuelve a "Sí participo", ocupa un cupo solo si hay uno libre (RN-109), y para la lista de entrada cuenta el momento en que lo volvió a ocupar (RN-123).

### PREG-057: ¿Desde cuándo se cuentan los 3600 segundos del bloqueo de RN-117?
- Contexto: RN-117 rechaza los intentos de unirse "durante los 3600 segundos siguientes" a 10 códigos inválidos, pero 07-architecture.md y T-012 describían una ventana deslizante de los últimos 3600 s. Con 9 códigos inválidos a las 10:00 y el décimo a las 10:59, una lectura bloquea hasta las 11:59 y la otra deja intentar desde las 11:00:01. Detectada en auditorias/qa-clase2.md (M-05).
- A quién preguntar: Product Owner.
- Bloquea: HU-005, API-013 y T-012.
- Plan de resolución: confirmar la lectura antes de implementar API-013.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. Vale el texto de RN-117: el bloqueo dura 3600 s desde el décimo código inválido de los últimos 3600 s. Los intentos rechazados durante el bloqueo no se validan y no cuentan como inválidos. RN-117 lleva un ejemplo nuevo con estos instantes.

### PREG-058: ¿Qué tarea asigna el turno y el receptor del pozo de cada ronda según el resultado del sorteo?
- Contexto: RN-036 y RN-037 definen el turno y quién recibe el pozo de cada ronda, y 07-architecture.md guarda `rounds.pot_recipient_id`, pero ninguna tarea de 08-backlog.md lo describía ni lo probaba. Es una decisión sobre dinero (PRINCIPIO-012 g). Detectada en auditorias/qa-clase2.md (M-01).
- A quién preguntar: Product Owner y líder técnico.
- Bloquea: HU-006, T-014, T-016 y T-023.
- Plan de resolución: asignarlo a la tarea del sorteo y agregar su prueba.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. `fixTurnOrder` asigna `pot_recipient_id` de la ronda k al participante en la posición k de `result` y arma la entrada sin el organizador que no participa (RN-030). T-014 lo prueba con una semilla inyectada (07-architecture.md §2.2).

### PREG-059: ¿Los criterios de completitud de las tareas deben cubrir todos los criterios de sus HU Must?
- Contexto: varias tareas se podían cerrar sin probar criterios aprobados de su HU: el `403` de quien no es organizador al registrar o desmarcar un pago (RN-051), salir de una junta antes del orden (RN-111, RN-113, RN-101), el código inexistente (RN-116), la ronda 1 vencida al sortear (RN-122), la próxima cuota vacía en la ronda 10 (RN-119) y el cálculo del pozo (RN-041). Detectada en auditorias/qa-clase2.md (M-02).
- A quién preguntar: líder técnico.
- Bloquea: T-003, T-011, T-012, T-014, T-015, T-016 y T-023.
- Plan de resolución: agregar cada caso al criterio de su tarea.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. Sí. 08-backlog.md v0.4 agrega los casos con los datos de ejemplo de cada HU, y cada RN Must queda citada por al menos una tarea.

### PREG-060: ¿Cómo se prueba desmarcar un pago sin conexión, y qué ve el usuario si el servidor lo rechaza?
- Contexto: HU-015 promete "registrar y desmarcar pagos sin conexión" y RN-170 permite desmarcar sin red, pero ningún criterio ni tarea probaba el tipo `correct_payment`, y §2.9 no tenía el `{motivo}` de su rechazo. Detectada en auditorias/qa-clase2.md (M-03).
- A quién preguntar: Product Owner.
- Bloquea: HU-015, T-017, T-020 y T-023.
- Plan de resolución: agregar criterios a HU-015 y el texto del rechazo a §2.9.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. HU-015 suma un criterio Positivo y uno Negativo [QA2]. El `{motivo}` es "el pago de {nombre} de la ronda {n} ya no estaba registrado" (03-reglas-de-negocio.md §2.9, derivado), y T-017, T-020 y T-023 lo prueban.

### PREG-061: ¿API-026 rechaza una corrida repetida del job del mismo día o la procesa de forma idempotente?
- Contexto: API-026 decía `409 JOB_ALREADY_RUNNING` "si ya hay una corrida para esa fecha", pero también que la restricción única "impide duplicar si la corrida se repite", y T-019 esperaba `already_sent = 1` en la segunda corrida. Detectada en auditorias/qa-clase2.md (M-06).
- A quién preguntar: líder técnico.
- Bloquea: T-019.
- Plan de resolución: definir un solo comportamiento en el contrato.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. `409` solo mientras otra corrida de esa fecha está en curso; una corrida repetida después de terminar responde `202` y cuenta en `already_sent` lo que ya se envió (07-architecture.md, API-026).

### PREG-062: ¿Qué tarea construye el middleware de sesión y en qué orden van las pantallas?
- Contexto: T-007 usaba la sesión antes de que T-008 construyera el middleware; el criterio de T-020 necesitaba pantallas de T-021 y T-023, y el de T-022 necesitaba el inicio de sesión de T-021 sin depender de ella. Detectada en auditorias/qa-clase2.md (M-07).
- A quién preguntar: líder técnico.
- Bloquea: T-007, T-008, T-020, T-022 y la ruta crítica.
- Plan de resolución: reordenar las tareas sin crear ciclos.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. El middleware y el cierre de sesión por inactividad (RN-159) pasan a T-007; T-020 se prueba con un arnés; T-022 depende de T-021. La ruta crítica pasa a 15 tareas, de 14.5 h a 29 h (08-backlog.md v0.4).

### PREG-063: ¿Qué tareas verifican el p95, el contraste, el tamaño de los controles y del texto, el tuteo y el acceso del equipo?
- Contexto: PRINCIPIO-010 fija p95 ≤ 500 ms, contraste ≥ 4.5:1, áreas táctiles ≥ 44 × 44 px y texto ≥ 16 px; 07-architecture.md §6.1 pide un test de tuteo (RN-090), un linter de nombres y escenarios de RN-200 y RN-201. Ninguna tarea los verificaba, y un análisis de axe-core de nivel A no revisa el contraste ni el tamaño. Detectada en auditorias/qa-clase2.md (M-08).
- A quién preguntar: líder técnico.
- Bloquea: el cumplimiento de PRINCIPIO-002, PRINCIPIO-010 y PRINCIPIO-011.
- Plan de resolución: agregarlos a tareas existentes o crear tareas nuevas.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. T-025 suma la regla `color-contrast` y la medición de 44 × 44 px y 16 px; T-024 suma los tests de tuteo y de nombres; las tareas nuevas T-026 (p95 por ruta) y T-027 (script de acceso con `staff_access_log`) cubren el resto.

### PREG-064: ¿Qué componente termina TLS y renueva el certificado del dominio?
- Contexto: PRINCIPIO-005 exige TLS 1.2 o superior, pero el despliegue solo tenía la app, el worker y PostgreSQL, y `next start` sirve HTTP. Detectada en auditorias/qa-clase2.md (M-09).
- A quién preguntar: Product Owner y líder técnico (dependencia y servicio externo, PRINCIPIO-012 e y h).
- Bloquea: el despliegue y T-002.
- Plan de resolución: elegir un proxy inverso y aprobarlo.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. Un componente `proxy` con Caddy y certificados de Let's Encrypt, en su propio contenedor y único con puertos expuestos (07-architecture.md §2.1 y §6.3; T-002 y T-005).

### PREG-065: ¿Qué HU verifica cada contrato después de dividir HU-004 y HU-008?
- Contexto: 07-architecture.md trazaba API-010 a API-012 a HU-004 y API-021 a HU-008 en su índice, aunque el detalle y §8.1 decían HU-014 y HU-015; además, las listas de HU de `notifications` y `api` no coincidían entre secciones. Detectada en auditorias/qa-clase2.md (M-10).
- A quién preguntar: líder técnico.
- Bloquea: la trazabilidad de HU-014 y HU-015.
- Plan de resolución: alinear todas las secciones con §8.1.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. API-010 a API-012 trazan a HU-014 y API-021 a HU-015 y HU-009. Se corrigieron §2.1, §4.2, §4.4, §4.6, §8.1 y §8.2 de 07-architecture.md, y T-021 traza también a HU-015.

### PREG-066: ¿RN-142 es Must aunque solo aplique con el push, y RN-204 debe estar en una HU Must?
- Contexto: RN-142 (correo y push cuentan como un recordatorio) era MUST, pero solo aplica con F-07 (Should). RN-204 (encuesta) es SHOULD y estaba en HU-004, que es Must. Detectada en auditorias/qa-clase2.md (M-11).
- A quién preguntar: Product Owner.
- Bloquea: la priorización del MVP.
- Plan de resolución: alinear la prioridad de cada regla con la de su HU.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. RN-142 pasa a SHOULD sin cambiar su significado; RN-204 sale de HU-004 y queda en HU-018, y el campo `survey_pending` de API-009 queda marcado Should.

### PREG-067: ¿El MVP puede salir al mercado sin la encuesta de F-18?
- Contexto: 02-alcance.md dice que F-18 tiene que estar lista para medir la línea base de KPI-05 con las primeras 10 juntas, pero 08-backlog.md la dejaba para la próxima versión sin relación con el lanzamiento. Detectada en auditorias/qa-clase2.md (M-12).
- A quién preguntar: Product Owner.
- Bloquea: la medición de KPI-05.
- Plan de resolución: decidir si F-18 bloquea el lanzamiento.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. No. F-18 sigue siendo Should, pero el MVP no sale al mercado sin ella (02-alcance.md §3); figura como bloqueo del lanzamiento en 08-backlog.md.

### PREG-068: ¿Qué HU cubre RN-200 a RN-203, que son Must y no tienen interacción del usuario?
- Contexto: RN-200 a RN-203 (acceso del equipo a producción, registro del acceso, nada de descifrado a mano y nada de usar pagos para créditos) eran las únicas reglas Must sin HU; solo tenían escenarios técnicos. Detectada en el cierre de auditorias/qa-clase2.md.
- A quién preguntar: Product Owner.
- Bloquea: la trazabilidad regla → HU de todas las RN Must.
- Plan de resolución: crear una HU con esos escenarios o aceptar la excepción.
- Estado: Resuelta el 14/11/2026 con autorización del Product Owner. Se crea HU-019 (Must, F-01 y F-04), cuyos criterios son escenarios técnicos que prueban T-004, T-024 y T-027.

### PREG-069: ¿Cuál es el texto exacto de la casilla de consentimiento de P-001 y de la casilla de aceptación de una versión nueva en P-006?
- Contexto: RN-082 y RN-168 exigen las casillas, pero ningún texto del catálogo §2.9 las rotula. Detectada en 09-ui-spec.md §7.1.
- A quién preguntar: Product Owner, con revisión del asesor legal (relacionada con PREG-001).
- Bloquea: P-001, P-006 y T-021.
- Plan de resolución: adoptar los rótulos de 09 y revisarlos junto con el texto de la política.
- Estado: Resuelta el 15/11/2026 con autorización del usuario (auditorias/spec-finalizer.md). "Acepto la política de privacidad y recibir notificaciones por correo y push." y "Acepto la política de privacidad, versión {versión}." (09 §6). El asesor legal los revisa junto con el texto de la política (PREG-001).

### PREG-070: ¿Qué mensaje ve el usuario si escribe mal su contraseña al borrar su cuenta?
- Contexto: API-033 responde `401 INVALID_CREDENTIALS`, y el texto de RN-075 habla del correo, que P-023 no pide. Detectada en 09-ui-spec.md §7.1.
- A quién preguntar: Product Owner.
- Bloquea: P-023 (HU-017, Should).
- Plan de resolución: adoptar un texto de interfaz.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. "La contraseña no es correcta." (09 §6).

### PREG-071: ¿Qué rango aceptan las dos respuestas numéricas de la encuesta de KPI-05, y son obligatorias las 3 respuestas?
- Contexto: RN-206 fija las 3 preguntas, pero no su validación. HU-018 bloquea el lanzamiento del MVP (02-alcance.md §3). Detectada en 09-ui-spec.md §7.1.
- A quién preguntar: Product Owner.
- Bloquea: HU-018, P-024 y el lanzamiento.
- Plan de resolución: decidir el rango y la obligatoriedad, y escribir las RN.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. Enteros desde 0, sin máximo (RN-214), y las 3 respuestas obligatorias para enviar la encuesta (RN-215). Cerrarla sin responder sigue disponible (RN-210).

### PREG-072: ¿Qué mensaje ve el usuario si escribe una fecha que no existe o que no tiene el formato DD/MM/AAAA?
- Contexto: el catálogo solo tiene el caso del campo vacío (RN-002). Detectada en 09-ui-spec.md §7.1.
- A quién preguntar: Product Owner.
- Bloquea: P-008, P-012, P-015 y P-018.
- Plan de resolución: adoptar un texto de interfaz.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. "Ingrese la fecha con el formato DD/MM/AAAA, por ejemplo 30/11/2026." (09 C-05).

### PREG-073: Al editar la junta, ¿la ronda 1 se compara con la fecha de creación o con hoy, y qué texto muestra RN-009?
- Contexto: RN-009 compara con la fecha de creación, pero su mensaje decía "no puede ser anterior a hoy" y API-009 usaba el código `ROUND1_BEFORE_TODAY`. Al editar, las dos lecturas dan resultados distintos. Detectada en 10-validation-log.md fila 9 y en auditorias/spec-finalizer.md (SF-05).
- A quién preguntar: Product Owner.
- Bloquea: T-011, API-010 y P-012.
- Plan de resolución: elegir una lectura y alinear la regla, el mensaje, el contrato y la tarea.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. Se mantiene RN-009: se compara con la fecha de creación. El mensaje pasa a "La fecha de vencimiento de la ronda 1 no puede ser anterior a la fecha de creación de la junta." y el código a `ROUND1_BEFORE_CREATION`. Una ronda 1 entre la creación y hoy se guarda, y RN-122 impide fijar el orden hasta cambiarla (03-reglas-de-negocio.md §1.5).

### PREG-074: ¿Se adoptan como textos del catálogo §2.9 los ejemplos de RN-139 y RN-194?
- Contexto: el aviso al organizador de un pago informado (RN-139) y el aviso de pago rechazado (RN-194) solo tenían texto en sus ejemplos. Detectada en 10-validation-log.md fila 12.
- A quién preguntar: Product Owner.
- Bloquea: HU-009 (Should).
- Plan de resolución: pasar los textos al catálogo.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. Se adoptan los ejemplos como cuerpo del correo y del push, con un asunto propio (03 §2.9 y §1.5).

### PREG-075: ¿Cuál es el cuerpo del correo de recordatorio (RN-144), y se adoptan como textos del catálogo el asunto de su ejemplo y el texto del ejemplo de RN-196?
- Contexto: RN-144 solo lista los datos del recordatorio, así que T-018 (HU-011, Must) no se podía terminar sin inventar el texto (PRINCIPIO-012 a). Detectada en 10-validation-log.md fila 4 y en auditorias/spec-finalizer.md (SF-01).
- A quién preguntar: Product Owner.
- Bloquea: T-018, HU-011 y HU-016.
- Plan de resolución: redactar los textos en el estilo de los correos de la cuenta y pasarlos a §2.9.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. Asunto y cuerpo del recordatorio, con "vence" o "venció" según el momento; el asunto también es el texto del push. El aviso de cuotas vencidas usa el texto del ejemplo de RN-196, con un asunto propio (03 §2.9 y §1.5).

### PREG-076: ¿Se valida el formato del correo en "Crear cuenta", con qué regla y con qué mensaje?
- Contexto: P-001 no validaba el formato del correo, y §2.9 no tenía un mensaje para eso. T-028 esperaba esta decisión. Detectada en 10-validation-log.md fila 27.
- A quién preguntar: Product Owner y líder técnico.
- Bloquea: T-028 y HU-001.
- Plan de resolución: escribir RN-213 con su mensaje.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. RN-213: el correo cumple `^[^\s@]+@[^\s@]+\.[^\s@]+$`, con el mensaje "Ingrese un correo válido, por ejemplo lucia@example.com.".

### PREG-077: ¿Qué RN cubre el código de segundo factor equivocado al iniciar sesión: RN-078 o una RN nueva?
- Contexto: P-022 ataba el mensaje de código equivocado a RN-166, que solo trata de la activación. Detectada en 10-validation-log.md fila 30.
- A quién preguntar: Product Owner y responsable de seguridad.
- Bloquea: P-022 y la descomposición de HU-003 (Should).
- Plan de resolución: atar el mensaje a una regla existente o crear una.
- Estado: Resuelta el 15/11/2026 con autorización del usuario. Lo cubre RN-078: sin un código válido no se abre la sesión. El mensaje "El código no es correcto. Revíselo e intente de nuevo." queda atado a RN-166 y RN-078 en §2.9. No se crea ninguna RN.

### PREG-078: ¿Qué datos de cada junta entrega API-022 para las tarjetas de "Mis juntas"?
- Contexto: P-007 muestra en cada tarjeta "{ocupados} de {total} cupos" y "Su cuota: [estado]" de la ronda actual, pero API-022 solo entrega `id`, `name`, `status`, `role`, `is_participant`, `turn_number` y `current_round`. Hoy la app tendría que leer esos datos del snapshot (API-025) o pedir API-023 por cada junta. Detectada en auditorias/spec-finalizer.md (SF-08, mayor).
- A quién preguntar: líder técnico, con visto bueno del Product Owner (cambia un contrato de 07-architecture.md).
- Bloquea: el criterio completo de P-007 en T-022 y T-029. No bloquea el resto del MVP.
- Plan de resolución: decidir antes de implementar T-022 si API-022 suma `occupied_slots`, `participant_count` y `current_round_status` (de la cuota propia), y actualizar API-022, T-016 y T-022 con su caso de prueba.

### PREG-079: ¿Un agente de IA puede marcar una pregunta como "Resuelta" con una autorización general del usuario, o solo como "Propuesta"?
- Contexto: este archivo dice que la respuesta de un agente queda "Propuesta" hasta que el Product Owner la apruebe. 09-ui-spec.md §7.1 marcó PREG-069, 070 y 072 como "Resuelta por el Agente UI Designer", y la v0.5 de este archivo resolvió PREG-069 a PREG-077 con la autorización del usuario del 15/11/2026. Detectada en auditorias/spec-finalizer.md (SF-09, mayor).
- A quién preguntar: Product Owner. Toca los límites de los agentes, así que su respuesta puede requerir un cambio a PRINCIPIO-012 con aprobación humana.
- Bloquea: la validez definitiva de PREG-069 a PREG-077 y de 03-reglas-de-negocio.md §1.5.
- Plan de resolución: el Product Owner revisa PREG-069 a PREG-077 y confirma o revierte cada una. Después decide si las autorizaciones generales valen como aprobación y, si es así, se agrega a PRINCIPIO-012.

### PREG-080: ¿Qué identificador en código usan "Cambio sin enviar", "Estado de la junta" y "Participante eliminado", y qué términos faltan en el glosario?
- Contexto: 04-glosario.md da `pending_change`, `junta_status` y `deleted_participant`, pero 07-architecture.md usa el outbox con `client_change_id` y la tabla `client_changes`, la columna `juntas.status` y `users.deleted_at`. Además, 04 no define términos que se usan más de 20 veces: líder técnico, incidente, outbox, snapshot, ola de la encuesta (`wave`) y los estados de envío de un recordatorio (`accepted`, `failed`, `expired`). Detectada en auditorias/spec-finalizer.md (SF-10, mayor).
- A quién preguntar: Product Owner y líder técnico.
- Bloquea: la nomenclatura de T-017, T-019 y T-020. Mientras tanto, un agente sigue 07.
- Plan de resolución: elegir un nombre por término, actualizar 04 o 07, y agregar a 04 los términos del dominio y una sección de términos técnicos antes de implementar T-017.

### PREG-081: ¿En qué anchos verifica el pipeline que no haya scroll horizontal?
- Contexto: PRINCIPIO-010 exige 360 a 1440 px. T-025 revisa solo 360 y 1440 px y T-023 solo 360 px, mientras que 09-ui-spec.md §4.7 y 10-validation-log.md fila 18 piden 360, 768, 1024 y 1440 px, que son los cortes de diseño. Detectada en auditorias/spec-finalizer.md (SF-12, mayor).
- A quién preguntar: líder técnico.
- Bloquea: el criterio de T-025.
- Plan de resolución: decidir antes de implementar T-025 si se agregan 768 y 1024 px, y actualizar su criterio.

### PREG-082: ¿Se dividen T-007, T-021, T-022 y T-023 para que cada una quepa en 2 horas?
- Contexto: 08-backlog.md promete que cada tarea se completa en menos de 2 horas. T-007 junta 5 migraciones, el middleware de sesión, 3 endpoints y un guardián, y T-021 a T-023 juntan de 5 a 7 pantallas cada una. Detectada en auditorias/spec-finalizer.md (SF-13, mayor).
- A quién preguntar: líder técnico.
- Bloquea: la estimación de la ruta crítica (08, "Ruta crítica").
- Plan de resolución: medir la primera de ellas al implementarla; si supera 2 horas, dividir las demás por pantalla o por endpoint con IDs nuevos, sin renumerar.

### PREG-083: ¿Quién revisa 08-backlog.md, 09-ui-spec.md y 10-validation-log.md, y quién prueba los prototipos en un navegador?
- Contexto: 08 v0.6, 09 v1.2 y 10 v1.2 están en "Borrador", y la validación de los prototipos a 360, 768, 1024 y 1440 px en un navegador sigue pendiente (10-validation-log.md fila 18). Los demás archivos están en "Revisado". Detectada en auditorias/spec-finalizer.md (SF-14, mayor).
- A quién preguntar: Product Owner (revisión) y usuario (prueba en el navegador).
- Bloquea: cerrar el Spec Pack como v1.0 aprobada. No bloquea empezar T-001 a T-019.
- Plan de resolución: el Product Owner revisa los tres archivos y el usuario recorre los flujos de 09 §2 en un navegador antes de implementar T-020.
