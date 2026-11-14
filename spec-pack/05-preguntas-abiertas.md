# Preguntas abiertas

Versión: 1.4

Decisiones pendientes detectadas al redactar la constitución, el Project Brief y el alcance. Mientras una pregunta siga abierta, todo lo que dependa de ella se marca [REQUIERE DECISIÓN]. Una pregunta resuelta conserva su ID y lleva la línea "Estado: Resuelta" con la fecha y la decisión.

---

### PREG-001: ¿Mi Junta debe cumplir la Ley N.° 29733 (Protección de Datos Personales) y su Reglamento, e inscribir su banco de datos ante la ANPD?
- Contexto: la app guarda nombre, DNI, celular, correo, foto y fecha de nacimiento de personas en Perú. Además se planea usar datos reales en desarrollo y pruebas. Si la ley aplica, eso puede exigir cambios en el consentimiento, la retención y el uso de datos reales.
- A quién preguntar: asesor legal del proyecto.
- Bloquea: PRINCIPIO-005, PRINCIPIO-007, el texto de la política de privacidad, el uso de datos reales en desarrollo, y PREG-006, PREG-007 y PREG-009.
- Plan de resolución: consulta legal antes de redactar las HU de registro y de consentimiento. Con la respuesta se actualizan 00-constitucion.md y 03-reglas-de-negocio.md.

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

### PREG-004: ¿La foto de un miembro es visible para los demás miembros de la junta?
- Contexto: la foto es opcional. En la constitución quedó como privada, porque solo se mencionó el nombre y el DNI como datos visibles.
- A quién preguntar: Product Owner.
- Bloquea: PRINCIPIO-006 y la pantalla de lista de miembros.
- Plan de resolución: decidir junto con PREG-003 antes de diseñar la pantalla de miembros.

### PREG-005: ¿Cómo se resuelven los conflictos de cambios hechos sin conexión, y se permite sortear sin conexión?
- Contexto: la app debe funcionar sin red y sincronizar al reconectar (PRINCIPIO-009). Si dos personas cambian el mismo dato sin conexión, hace falta una regla para decidir cuál vale. Un sorteo hecho sin conexión podría chocar con el registro auditable (PRINCIPIO-008).
- A quién preguntar: Product Owner y arquitecto de software.
- Bloquea: PRINCIPIO-008, PRINCIPIO-009, las RN de sincronización en 03-reglas-de-negocio.md y el diseño de arquitectura.
- Plan de resolución: definir antes del diseño de arquitectura. Las opciones son que gane el servidor, que gane el último cambio o que haya revisión manual, y si el sorteo exige conexión.
- Avance del 14/11/2026: el sorteo exige conexión (RN-029 de 03-reglas-de-negocio.md). Sigue abierta la regla de resolución de conflictos.

### PREG-006: ¿Un participante puede pedir que se borren sus datos, o solo el organizador puede borrar la información de una junta?
- Contexto: se indicó que el organizador puede borrar los datos de la junta en cualquier momento o guardarlos para siempre. No se definió qué pasa cuando un participante quiere que se eliminen sus propios datos.
- A quién preguntar: asesor legal (relacionada con PREG-001) y Product Owner.
- Bloquea: las RN de retención y borrado en 03-reglas-de-negocio.md y 02-alcance.md.
- Plan de resolución: resolver después de PREG-001 y antes de escribir las RN de retención.

### PREG-007: ¿Habrá una edad mínima para crear una cuenta?
- Contexto: hoy no hay edad mínima, pero podría agregarse más adelante. La app ya guarda la fecha de nacimiento.
- A quién preguntar: asesor legal (relacionada con PREG-001) y Product Owner.
- Bloquea: las RN de registro en 03-reglas-de-negocio.md y PRINCIPIO-007.
- Plan de resolución: resolver después de PREG-001 y antes de escribir las HU de registro.

### PREG-008: ¿Se cifra también la fecha de nacimiento, y cómo se protegen los datos personales guardados en el dispositivo para el modo sin conexión?
- Contexto: PRINCIPIO-005 solo cifra el DNI y el celular. El modo sin conexión (PRINCIPIO-009) guarda datos en el navegador, fuera del cifrado del servidor.
- A quién preguntar: arquitecto de software o responsable de seguridad.
- Bloquea: PRINCIPIO-005 y PRINCIPIO-009.
- Plan de resolución: decidir en el diseño de arquitectura, junto con PREG-005.

### PREG-009: ¿El usuario puede retirar después su consentimiento para recibir notificaciones?
- Contexto: el consentimiento se acepta al crear la cuenta (PRINCIPIO-007). No se definió si se puede retirar ni qué pasa con los recordatorios de pago si se retira.
- A quién preguntar: Product Owner y asesor legal (relacionada con PREG-001).
- Bloquea: PRINCIPIO-007 y las RN de notificaciones en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de escribir las RN de recordatorios.

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

### PREG-012: ¿Cuál es la meta de usuarios registrados en los meses 1, 3 y 6?
- Contexto: el Product Owner fijó metas de juntas activas (10, 20 y 40), pero no de usuarios registrados. Con más de 10 participantes por junta, 40 juntas serían unos 400 usuarios, pero ese número es una estimación, no una meta aprobada.
- A quién preguntar: Product Owner.
- Bloquea: KPI-02 de 01-project-brief.md.
- Plan de resolución: decidir antes del lanzamiento y registrar la meta en 01-project-brief.md.

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

### PREG-015: ¿Se usará el historial de pagos de Mi Junta para evaluar préstamos, y cómo se pedirá ese consentimiento?
- Contexto: el Product Owner planea una futura línea de préstamos conectada con Mi Junta y prefiere pedir el consentimiento para ese uso cuando exista la funcionalidad. La Ley N.° 29733 exige un consentimiento por cada finalidad. Falta definir si se podrán usar los datos registrados antes de ese consentimiento.
- A quién preguntar: asesor legal (relacionada con PREG-001) y Product Owner.
- Bloquea: PRINCIPIO-007, el texto de la política de privacidad y el riesgo R-07 de 01-project-brief.md.
- Plan de resolución: resolver junto con PREG-001 antes de publicar la política de privacidad del lanzamiento.

### PREG-016: ¿Qué reglas puede o debe definir el organizador al crear una junta?
- Contexto: hoy las juntas no tienen reglas escritas. El Product Owner indicó que el organizador debe definir las reglas al crear la junta. Faltan definir cuáles son (multas por atraso, días de tolerancia, retiro de un participante, reemplazos, garantías), si son obligatorias u opcionales, y si la app solo las muestra o también las aplica. PRINCIPIO-012 g) impide decidir sobre montos o multas sin una regla escrita.
- A quién preguntar: Product Owner.
- Bloquea: 02-alcance.md y las RN de creación de juntas, atrasos y retiros en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN de creación de juntas.
- Avance del 14/11/2026: en esta versión las reglas solo se registran como texto visible para todos los miembros (F-09 de 02-alcance.md), y la app no las aplica (NO-06). Siguen abiertas cuáles reglas se registran y si son obligatorias u opcionales.

### PREG-017: Cuando un participante informa su pago, ¿qué pasa si el organizador lo rechaza o no responde?
- Contexto: el Product Owner indicó que un participante puede registrar su pago y que el organizador lo aprueba. Faltan definir el plazo para aprobar, qué pasa si se rechaza o no hay respuesta, si se adjunta una evidencia (por ejemplo, una captura de Yape) y con qué fecha queda registrado el pago.
- A quién preguntar: Product Owner.
- Bloquea: las RN de registro de pagos en 03-reglas-de-negocio.md, KPI-04 y PREG-020.
- Plan de resolución: decidir antes de redactar las RN de pagos.
- Avance del 14/11/2026: si el organizador rechaza el pago informado, la cuota vuelve a "Pendiente". Si no responde, la cuota sigue en "Por confirmar" sin plazo. No se adjunta evidencia (RN-063 a RN-065 de 03-reglas-de-negocio.md). Sigue abierta la fecha de pago que queda registrada.

### PREG-018: ¿Se puede asignar el orden de turnos sin sorteo, por ejemplo según la necesidad de los participantes?
- Contexto: el orden casi siempre se decide por sorteo, pero a veces se asigna a quien tiene más necesidad. PRINCIPIO-008 solo regula el sorteo. Si se permite asignar el orden a mano, hace falta definir quién lo decide y cómo se deja registro.
- A quién preguntar: Product Owner.
- Bloquea: PRINCIPIO-008 y las RN del sorteo y de los cambios de turno en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN del sorteo.

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

### PREG-022: ¿Existen apps o servicios que ya resuelvan la organización de juntas en Perú?
- Contexto: el Product Owner no conoce competidores (supuesto S-07 de 01-project-brief.md). Si existen, la propuesta de valor debe diferenciarse de ellos.
- A quién preguntar: Agente Analyst, con una revisión de competidores validada por el Product Owner.
- Bloquea: la sección 3 de 01-project-brief.md.
- Plan de resolución: revisar las tiendas de apps y las soluciones locales antes de cerrar la versión 1.0 de 01-project-brief.md.

### PREG-023: ¿Cuántos dígitos tiene el código del segundo factor y cuánto tiempo es válido?
- Contexto: PRINCIPIO-005 permite activar un segundo factor con un código enviado al correo, pero no fija la longitud del código, su tiempo de validez ni cuántos intentos fallidos se permiten. Sin esos valores no se puede escribir un test que verifique el principio (PRINCIPIO-011).
- A quién preguntar: arquitecto de software o responsable de seguridad, con visto bueno del Product Owner.
- Bloquea: PRINCIPIO-005 y las RN de autenticación en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las HU de inicio de sesión y registrar los valores en PRINCIPIO-005, con aprobación humana (PRINCIPIO-012).
- Estado: Resuelta el 14/11/2026. El código tiene 6 dígitos, vale 600 segundos y se anula después de 5 intentos fallidos. Con aprobación humana se registró en PRINCIPIO-005 de 00-constitucion.md v1.2 (RN-079 a RN-081 de 03-reglas-de-negocio.md).

### PREG-024: ¿Qué formato tiene el código de invitación, cuánto tiempo es válido y cuántas veces se puede usar?
- Contexto: el Product Owner decidió que un invitado se une a la junta con un código y que para unirse necesita una cuenta (sección 7 de 02-alcance.md). No se definió la longitud ni los caracteres del código, si vence, si sirve para una sola persona o para todo el grupo, ni si el organizador puede anularlo. Sin esos valores no se puede escribir un test que lo verifique (PRINCIPIO-011).
- A quién preguntar: Product Owner, con visto bueno del arquitecto de software o del responsable de seguridad.
- Bloquea: F-02 de 02-alcance.md y las RN de invitación en 03-reglas-de-negocio.md.
- Plan de resolución: decidir antes de redactar las RN de invitación.
- Estado: Resuelta el 14/11/2026. El código tiene 8 caracteres de `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` y sirve para todo el grupo hasta que se llenan los cupos o se ejecuta el sorteo. El organizador puede regenerarlo, y entonces el código anterior se anula (RN-015 a RN-021 de 03-reglas-de-negocio.md).

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

### PREG-029: ¿Qué pasa si llega la fecha de vencimiento de la ronda 1 y la junta todavía tiene cupos libres o no hizo el sorteo?
- Contexto: RN-009 permite que la ronda 1 venza el mismo día en que se crea la junta, y RN-027 solo permite sortear con todos los cupos llenos. Por eso una cuota puede vencer antes de que se sepa quién recibe el pozo, y los recordatorios de F-06 saldrían para una junta incompleta.
- A quién preguntar: Product Owner.
- Bloquea: RN-009, RN-027 y RN-068 a RN-071 de 03-reglas-de-negocio.md, y las HU de creación de juntas y de sorteo.
- Plan de resolución: decidir antes de redactar las HU del sorteo. Las opciones son correr las fechas de vencimiento hasta el sorteo, no generar cuotas ni recordatorios antes del sorteo, o exigir una distancia mínima entre la creación y la ronda 1.

### PREG-030: ¿Una cuota "Por confirmar" debe seguir recibiendo recordatorios?
- Contexto: F-06 envía recordatorios hasta que la cuota quede registrada como pagada. Con F-08, una cuota que el participante ya informó queda "Por confirmar" y no "Pagada", así que según RN-069 y RN-070 seguiría recibiendo recordatorios aunque el participante ya pagó. Esto puede tensionar la relación con el grupo (R-09) y aumentar el riesgo de spam (R-11).
- A quién preguntar: Product Owner.
- Bloquea: RN-069 a RN-072 de 03-reglas-de-negocio.md y la HU de pago informado (F-08).
- Plan de resolución: decidir antes de redactar las HU de F-08. Las opciones son seguir enviando recordatorios, pausarlos mientras la cuota esté "Por confirmar", o enviar el recordatorio al organizador para que confirme.
