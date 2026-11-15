# Historias de usuario de Mi Junta

Versión: 0.3.1
Fecha: 14/11/2026
Estado: Enriquecido por QA

Fuente: 01-project-brief.md v0.2 (PRD), 02-alcance.md v0.2, 03-reglas-de-negocio.md v0.2, 04-glosario.md v0.2 y 00-constitucion.md v0.3. Las redactó el Agente PO (prompts/clase2/01-product-owner.xml) y las enriqueció el Agente QA Funcional (prompts/clase2/02-qa-funcional.xml). Están pendientes de revisión del Product Owner.

**Cómo leer este documento:**
- Cada HU traza a una funcionalidad `F-NN` de 02-alcance.md y a las reglas `RN-NNN` de 03-reglas-de-negocio.md. Cada criterio de aceptación cita entre paréntesis las RN que verifica.
- Los criterios usan los datos de ejemplo de 03-reglas-de-negocio.md (Junta Familia, Junta Oficina, Junta Ventas, Carmen, Jorge, Lucía, Pedro, Marta, Rosa y Ana), para que los escenarios Gherkin no hereden contradicciones (PRINCIPIO-011).
- Las fechas van en DD/MM/AAAA y las horas en HH:MM de 24 horas, en America/Lima. Cuando un criterio necesita la precisión de segundos para probar un límite, el instante de prueba va en HH:MM:SS; eso no es un texto que vea el usuario (RN-177). Los valores guardados o de la API van entre comillas invertidas, en el formato en que se guardan (PRINCIPIO-003).
- Los textos entre comillas que ve el usuario son los del catálogo de mensajes (§2.9 de 03-reglas-de-negocio.md). Cuando el catálogo no tiene el texto de un rechazo, el criterio solo exige el rechazo y el texto queda en "Temas abiertos detectados".
- Una RN con fuente "Business Analyst" no se implementa hasta que el Product Owner la valide (PRINCIPIO-012 a). Las HU que dependen de alguna lo indican en sus notas.

**Marcas de la revisión QA (v0.3.1):**
- **[NUEVO]**: criterio que agregó el Agente QA. Lleva su tipo: **Positivo** (happy path), **Negativo** (dato inválido, sin conexión, sin permisos) o **Borde** (valor exactamente en el límite, lista vacía, concurrencia).
- **[CORREGIDO]**: criterio existente que el Agente QA reescribió porque contradecía los datos de ejemplo o no tenía valores concretos. El texto original y el motivo están en la "Revisión QA" de su HU, para que el Product Owner apruebe o revierta el cambio.
- Ninguna HU se eliminó, ningún ID cambió y ningún criterio nuevo usa un valor que no esté en el spec-pack (PRINCIPIO-012 a y c).
- Cada HU termina con una **Revisión QA**: resultado INVEST, valores concretos, conformidad con la constitución y cobertura positivo / negativo / borde.

---

## Resumen priorizado

| Orden | HU | Título | Prioridad | Funcionalidad | Épica | Depende de |
|---|---|---|---|---|---|---|
| 1 | HU-001 | Crear cuenta con consentimiento y verificar el correo | Must | F-01 | 1 | — |
| 2 | HU-002 | Iniciar sesión y recuperar el acceso a la cuenta | Must | F-01 | 1 | HU-001 |
| 3 | HU-004 | Crear una junta y ajustarla antes de fijar el orden de turnos | Must | F-02 | 2 | HU-001 |
| 4 | HU-005 | Unirse a una junta con su código de invitación | Must | F-02 | 2 | HU-001, HU-004 |
| 5 | HU-006 | Ejecutar el sorteo auditable de turnos | Must | F-03 | 3 | HU-005 |
| 6 | HU-008 | Registrar y desmarcar pagos de las cuotas | Must | F-04 | 4 | HU-006 |
| 7 | HU-010 | Ver el estado compartido de la junta | Must | F-05 | 5 | HU-006 |
| 8 | HU-011 | Recibir recordatorios de cuota por correo | Must | F-06 | 5 | HU-006 |
| 9 | HU-009 | Informar el pago de mi cuota | Should | F-08 | 4 | HU-008 |
| 10 | HU-012 | Recibir los recordatorios también como notificación push | Should | F-07 | 5 | HU-011 |
| 11 | HU-007 | Asignar el orden de turnos sin sorteo | Should | F-10 | 3 | HU-005 |
| 12 | HU-003 | Activar el segundo factor por correo | Should | F-11 | 1 | HU-002 |

Las 8 HU Must forman el MVP de 02-alcance.md §3 (F-01 a F-06). El orden de las Should sigue su impacto en los KPI: HU-009 reduce el trabajo del organizador (KPI-05), HU-012 mitiga R-01 y R-10 (KPI-04), HU-007 atiende PREG-018 y HU-003 es opcional para el usuario.

La revisión QA sugiere además HU-013 (F-09, Should), que cubre RN-014. Está al final, en "HUs sugeridas", y no entra a esta tabla hasta que el Product Owner la apruebe.

---

## Épica 1 · Cuenta y acceso

Funcionalidades: F-01 (Must) y F-11 (Should).

### HU-001: Crear cuenta con consentimiento y verificar el correo

**Prioridad:** Must

**Como** persona que fue invitada a una junta o que quiere organizar una, **quiero** crear mi cuenta con nombre, correo y contraseña aceptando la política de privacidad, y verificar mi correo, **para** poder crear una junta o unirme a una y recibir los recordatorios en un correo que sí reviso.

**Criterios de aceptación:**
- DADO QUE Lucía abre "Crear cuenta", CUANDO completa "Lucía Quispe", `lucia@example.com` y "Junta2026" sin marcar la casilla de consentimiento, ENTONCES la casilla aparece desmarcada (`checked = false`) y el botón "Crear cuenta" sigue con `disabled = true`. (RN-088, RN-089)
- DADO QUE llega una petición directa a `POST /accounts` con `consent = false`, CUANDO el servidor la procesa, ENTONCES no se crea ninguna cuenta. (RN-082)
- DADO QUE Lucía marcó la casilla y dejó vacíos el DNI y el celular, CUANDO pulsa "Crear cuenta" a las 10:32:05 del 14/11/2026, ENTONCES la cuenta se crea con `policy_version = "1.0"` y `consent_accepted_at = "2026-11-14T10:32:05-05:00"`, y a `lucia@example.com` llega un enlace de verificación que sirve hasta el 15/11/2026 10:32. (RN-146, RN-148, RN-083, RN-084, RN-152)
- DADO QUE el formulario recibe el nombre "L", la contraseña "abc123", el DNI `4567891A` o el celular `812345678`, CUANDO se pulsa "Crear cuenta", ENTONCES la cuenta no se crea y se muestra, según el caso, "Su nombre debe tener entre 2 y 80 caracteres.", "Su contraseña debe tener al menos 8 caracteres.", "Ingrese un DNI de 8 dígitos." o "Ingrese un celular de 9 dígitos que empiece con 9.". (RN-147, RN-074, RN-085, RN-086)
- DADO QUE ya existe la cuenta `lucia@example.com` con el DNI `45678912`, CUANDO alguien intenta crear una cuenta con `Lucia@Example.com`, o con otro correo y el DNI `45678912`, ENTONCES se rechaza con "Ya existe una cuenta con este correo. Inicie sesión o recupere su contraseña." o "Ya existe una cuenta con este DNI.". (RN-150, RN-151)
- DADO QUE Lucía todavía no abrió su enlace de verificación, CUANDO ingresa el código `M3QX7KPA` o pulsa "Crear junta", ENTONCES ve "Verifique su correo para crear una junta o unirse a una." y no ocupa ningún cupo. (RN-153)
- DADO QUE Lucía pidió un enlace de verificación nuevo, CUANDO abre el enlace anterior, ENTONCES ve "Este enlace ya se usó o venció. Pida uno nuevo.". (RN-154)
- DADO QUE se abre el formulario "Crear cuenta", CUANDO se revisan sus campos y la tabla `users`, ENTONCES no existen los campos "Fecha de nacimiento" ni "Foto", ni las columnas correspondientes. (RN-149)
- [NUEVO] **Positivo.** DADO QUE Lucía completó "Lucía Quispe", `lucia@example.com` y "Junta2026" con la casilla desmarcada, CUANDO marca la casilla de consentimiento, ENTONCES el botón "Crear cuenta" pasa a `disabled = false`; y si la vuelve a desmarcar, regresa a `disabled = true`. (RN-089, PRINCIPIO-007)
- [NUEVO] **Positivo.** DADO QUE Lucía creó su cuenta el 14/11/2026 a las 10:32:05 y no pidió otro enlace, CUANDO abre su enlace de verificación el 15/11/2026 a las 10:32:05, ENTONCES su correo queda verificado y al pulsar "Crear junta" ya no ve "Verifique su correo para crear una junta o unirse a una.". (RN-152, RN-153)
- [NUEVO] **Negativo.** DADO QUE Lucía marcó la casilla y completó "Lucía Quispe" y "Junta2026", CUANDO deja vacío el correo y pulsa "Crear cuenta", o una petición a `POST /accounts` llega sin nombre o sin contraseña, ENTONCES no se crea ninguna cuenta. (RN-146)
- [NUEVO] **Negativo.** DADO QUE el navegador de Lucía está en modo "Offline", CUANDO completa el formulario, marca la casilla y pulsa "Crear cuenta", ENTONCES ve "Necesita conexión a internet para hacer esto." y la app no guarda la cuenta para enviarla después. (RN-170)
- [NUEVO] **Borde.** DADO QUE Lucía creó su cuenta el 14/11/2026 a las 10:32:05, CUANDO abre su enlace de verificación el 15/11/2026 a las 10:32:06, ENTONCES ve "Este enlace ya se usó o venció. Pida uno nuevo." y su correo sigue sin verificar. (RN-152, RN-153)
- [NUEVO] **Borde.** DADO QUE Lucía marcó la casilla, CUANDO crea su cuenta con un nombre de 2 caracteres ("Lu") o de 80 caracteres, la contraseña "Junta202" (8 caracteres), el DNI `45678912` y el celular `987654321`, ENTONCES la cuenta se crea; con un nombre de 81 caracteres, la contraseña "Junta20" (7 caracteres), el DNI `4567891` (7 dígitos) o el celular `98765432` (8 dígitos), se rechaza con el mensaje de cada caso del criterio anterior. (RN-147, RN-074, RN-085, RN-086, RN-148)

**Reglas de negocio relacionadas:** RN-074, RN-082, RN-083, RN-084, RN-085, RN-086, RN-088, RN-089, RN-146, RN-147, RN-148, RN-149, RN-150, RN-151, RN-152, RN-153, RN-154, RN-170

**Notas:**
- F-01 no puede salir al mercado mientras PREG-001 (Ley N.° 29733) siga abierta, porque bloquea el texto de la política de privacidad (02-alcance.md §5).
- El DNI y el celular se cifran con AES-256-GCM y la contraseña se guarda con Argon2id o bcrypt (PRINCIPIO-005). La unicidad del DNI cifrado usa un valor derivado que se define en el diseño de arquitectura (RN-151).
- Crear la cuenta exige conexión (RN-170).
- Si se necesitan dos consentimientos separados (política y notificaciones) está [REQUIERE DECISIÓN] (PREG-001).
- El catálogo §2.9 no tiene el texto que se muestra cuando falta el correo, el nombre o la contraseña (RN-146). Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple I, N, V, E y T. **S ⚠️:** con 14 criterios, si la estimación no cabe en una iteración, se sugiere separar "verificar el correo" (RN-152 a RN-154) en una HU nueva con el siguiente ID libre.
- **Valores concretos:** los 8 criterios originales tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-007 (casilla desmarcada, versión y fecha y hora guardadas) y PRINCIPIO-003 (patrones de DNI y celular).
- **Cobertura:** positivo (crear la cuenta, habilitar el botón, verificar el correo), negativo (datos inválidos, duplicados, campos vacíos, sin conexión) y borde (enlace en el segundo 86,400 y en el 86,401, nombre de 2 y 80 caracteres, contraseña de 8).

---

### HU-002: Iniciar sesión y recuperar el acceso a la cuenta

**Prioridad:** Must

**Como** usuario con cuenta, **quiero** iniciar sesión con mi correo y contraseña, recuperar mi contraseña por correo si la olvido y aceptar las nuevas versiones de la política al volver, **para** entrar a mis juntas sin pedirle ayuda al organizador.

**Criterios de aceptación:**
- DADO QUE la cuenta de Lucía acumula 5 intentos fallidos seguidos y el quinto es a las 10:00:00, CUANDO ingresa la contraseña correcta a las 10:14:59, ENTONCES se rechaza con "Demasiados intentos fallidos. Intente de nuevo en 15 minutos.", y a las 10:15:00 inicia sesión. (RN-075)
- DADO QUE la cuenta de Lucía está bloqueada hasta las 10:15:00, CUANDO intenta 3 veces más durante el bloqueo, ENTONCES los 3 intentos se rechazan sin contarse, el bloqueo termina igual a las 10:15:00 con el contador en 0, y un fallo a las 10:16:00 no vuelve a bloquear la cuenta. (RN-161, RN-160)
- DADO QUE Lucía falló 3 veces y entró en el cuarto intento, CUANDO después falla 2 veces, ENTONCES la cuenta no se bloquea. (RN-076)
- DADO QUE alguien pide recuperar la contraseña de `nadie@example.com` y de `lucia@example.com`, CUANDO envía cada solicitud, ENTONCES en los dos casos ve "Si el correo está registrado, le enviamos un enlace para recuperar su contraseña.". (RN-156)
- DADO QUE Lucía pide recuperar su contraseña a las 10:00:00, CUANDO abre el enlace a las 10:59 y escribe "abc123", ENTONCES se rechaza con "Su contraseña debe tener al menos 8 caracteres."; con "Junta2027" se cambia, y al abrir el mismo enlace otra vez, o después de las 11:00:00, ve "Este enlace ya se usó o venció. Pida uno nuevo.". (RN-155, RN-074, RN-157)
- DADO QUE Lucía tiene una sesión abierta en una computadora compartida, CUANDO cambia su contraseña desde su celular, ENTONCES la sesión de la computadora compartida se cierra. (RN-158)
- DADO QUE Pedro hizo su última petición al servidor el 01/12/2026, CUANDO abre la app el 05/01/2027, ENTONCES tiene que volver a iniciar sesión. (RN-159)
- DADO QUE el 01/03/2027 se publica la política 1.1 y Lucía aceptó la 1.0, CUANDO abre la app, ENTONCES ve la política 1.1 con la casilla desmarcada antes de ver sus juntas, y al aceptarla el 02/03/2027 a las 08:10 se guarda `policy_version = "1.1"` con `consent_accepted_at = "2027-03-02T08:10:00-05:00"` y se conserva el registro de la versión 1.0. (RN-168, RN-169)
- [NUEVO] **Positivo.** DADO QUE Lucía tiene la cuenta `lucia@example.com` con la contraseña "Junta2026", ya aceptó la política vigente y su contador de intentos fallidos está en 2, CUANDO inicia sesión con esos datos, ENTONCES entra y ve la Junta Oficina, y su contador vuelve a 0. (RN-076, RN-168)
- [NUEVO] **Negativo.** DADO QUE la contraseña de Lucía es "Junta2026", CUANDO inicia sesión con `lucia@example.com` y "Junta2025", ENTONCES no se abre ninguna sesión y su contador de intentos fallidos sube en 1. (RN-075)
- [NUEVO] **Negativo.** DADO QUE el navegador de Lucía está en modo "Offline" y no tiene sesión abierta, CUANDO pulsa "Iniciar sesión" o pide recuperar su contraseña, ENTONCES ve "Necesita conexión a internet para hacer esto.". (RN-170)
- [NUEVO] **Negativo.** DADO QUE el 01/03/2027 se publicó la política 1.1 y Lucía solo aceptó la 1.0, CUANDO abre la app y no marca la casilla de la política 1.1, ENTONCES no ve sus juntas y su última versión aceptada sigue siendo `policy_version = "1.0"`. (RN-168, RN-169)
- [NUEVO] **Borde.** DADO QUE la cuenta de Lucía acumula 4 intentos fallidos seguidos, CUANDO en el quinto intento ingresa la contraseña correcta, ENTONCES inicia sesión y la cuenta no se bloquea. (RN-075, RN-076)
- [NUEVO] **Borde.** DADO QUE Lucía pidió recuperar su contraseña a las 10:00:00, CUANDO abre el enlace a las 11:00:00 y escribe "Junta202" (8 caracteres), ENTONCES la contraseña se cambia. (RN-155, RN-074)
- [NUEVO] **Borde.** DADO QUE Pedro hizo su última petición al servidor el 01/12/2026 a las 10:00, CUANDO vuelve a la app el 30/12/2026 a las 09:59, ENTONCES su sesión sigue abierta; y si en cambio vuelve el 31/12/2026 a las 10:01, tiene que volver a iniciar sesión. (RN-159)

**Reglas de negocio relacionadas:** RN-074, RN-075, RN-076, RN-155, RN-156, RN-157, RN-158, RN-159, RN-160, RN-161, RN-168, RN-169, RN-170

**Notas:**
- RN-076 tiene fuente "Business Analyst" y espera la validación del Product Owner.
- El riesgo de que un tercero bloquee una cuenta con 5 intentos fallidos está aceptado en esta versión (R-13).
- Si se siguen enviando recordatorios mientras el usuario no acepta una versión nueva de la política está [REQUIERE DECISIÓN] (PREG-001, 03-reglas-de-negocio.md §3).
- El catálogo §2.9 no tiene el texto para una contraseña incorrecta, y ninguna RN dice si el inicio de sesión distingue mayúsculas en el correo (RN-150 solo aplica al crear la cuenta). Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple I, N, V, E y T. **S ⚠️:** con 15 criterios, si no cabe en una iteración, se sugiere separar "recuperar la contraseña" (RN-155 a RN-158) en una HU nueva con el siguiente ID libre.
- **Valores concretos:** el criterio de la computadora compartida (RN-158) no tiene horas, pero su resultado es verificable. Los demás tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-007 (versión nueva con casilla desmarcada y registro conservado).
- **Cobertura:** positivo (iniciar sesión, recuperar, aceptar la política nueva), negativo (contraseña incorrecta, sin conexión, política no aceptada, enlace usado) y borde (quinto intento correcto, enlace en el segundo 3600, contraseña de 8, sesión a 1 minuto de los 30 días).

---

### HU-003: Activar el segundo factor por correo

**Prioridad:** Should

**Como** usuario que quiere proteger su cuenta, **quiero** activar un código de verificación que llega a mi correo cada vez que inicio sesión, **para** que nadie entre a mis juntas solo con mi contraseña.

**Criterios de aceptación:**
- DADO QUE Jorge pulsa "Activar segundo factor", CUANDO recibe en su correo un código de 6 dígitos y lo ingresa, ENTONCES su cuenta queda con `two_factor_enabled = true`, y antes de ingresarlo sigue con `two_factor_enabled = false`. (RN-165, RN-166)
- DADO QUE Jorge activó el segundo factor el 14/11/2026, CUANDO el 15/11/2026 ingresa su contraseña correcta, ENTONCES recibe en su correo un código de 6 dígitos (por ejemplo `482915`) y `POST /sessions` no abre la sesión sin ese código. (RN-078, RN-079)
- DADO QUE el código se envió a las 10:00:00, CUANDO Jorge lo ingresa a las 10:10:00, ENTONCES se acepta; a las 10:10:01 se rechaza con "Este código ya no es válido. Pida uno nuevo.". (RN-080)
- DADO QUE Jorge ingresó 5 códigos equivocados, CUANDO en el sexto intento escribe `482915`, que era el correcto, ENTONCES se rechaza porque el código quedó anulado. (RN-081)
- DADO QUE Jorge entró con `482915` a las 10:02, CUANDO alguien vuelve a usar `482915` a las 10:05, ENTONCES se rechaza; y si Jorge pide otro código y recibe `730264`, `482915` deja de servir. (RN-162, RN-163)
- DADO QUE Jorge pidió 5 códigos entre las 10:00 y las 10:04, CUANDO pide el sexto a las 10:05, ENTONCES no se envía y ve "Ya pidió varios códigos. Intente de nuevo en 15 minutos.". (RN-164)
- DADO QUE Jorge tiene el segundo factor activo, CUANDO pide desactivarlo sin ingresar su contraseña y un código válido, ENTONCES se rechaza; con los dos, se desactiva. (RN-167)
- [NUEVO] **Negativo.** DADO QUE Jorge pulsó "Activar segundo factor" y recibió `482915`, CUANDO ingresa `111111`, ENTONCES se rechaza y su cuenta sigue con `two_factor_enabled = false`. (RN-166)
- [NUEVO] **Negativo.** DADO QUE Jorge activó el segundo factor, CUANDO inicia sesión con una contraseña incorrecta, ENTONCES no se le envía ningún código y no se abre la sesión. (RN-079, RN-078)
- [NUEVO] **Negativo.** DADO QUE el navegador de Jorge está en modo "Offline", CUANDO pulsa "Activar segundo factor", ENTONCES ve "Necesita conexión a internet para hacer esto." y no se envía ningún código. (RN-170)
- [NUEVO] **Borde.** DADO QUE el código `482915` se envió a las 10:00:00 y Jorge ingresó 4 códigos equivocados, CUANDO a las 10:05:00 ingresa `482915` en su quinto intento, ENTONCES inicia sesión. (RN-081, RN-080)
- [NUEVO] **Borde.** DADO QUE Jorge pidió un código a las 10:00, a las 10:01, a las 10:02, a las 10:03 y a las 10:04, y no pidió ningún otro, CUANDO pide uno nuevo a las 10:15:01, ENTONCES se envía, porque en los últimos 900 segundos solo pidió 4. (RN-164)

**Reglas de negocio relacionadas:** RN-078, RN-079, RN-080, RN-081, RN-162, RN-163, RN-164, RN-165, RN-166, RN-167, RN-170

**Notas:**
- PRINCIPIO-005 v0.2 lo exige desde que se publique F-11. El código va solo por correo, nunca por SMS (PRINCIPIO-007).
- Depende del servicio de correo transaccional, cuyo proveedor está [REQUIERE DECISIÓN] y requiere aprobación (PRINCIPIO-012 h).
- RN-164 no dice si un pedido rechazado cuenta para el límite de 5, y el mensaje "Intente de nuevo en 15 minutos" puede no coincidir con el momento en que vuelve a poder pedir. Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple los 6 criterios.
- **Valores concretos:** el criterio de desactivación (RN-167) no tiene horas ni códigos, pero su resultado es verificable. Los demás tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-005 (6 dígitos, 600 s, 5 intentos) y PRINCIPIO-007 (solo correo).
- **Cobertura:** positivo (activar, iniciar sesión con código), negativo (código equivocado, contraseña incorrecta, sin conexión, código usado o anulado) y borde (segundo 600, quinto intento correcto, ventana de 900 s).

---

## Épica 2 · Creación y conformación de la junta

Funcionalidad: F-02 (Must).

### HU-004: Crear una junta y ajustarla antes de fijar el orden de turnos

**Prioridad:** Must

**Como** organizador, **quiero** crear una junta con su nombre, cuota, cantidad de participantes, frecuencia, vencimiento de la ronda 1, días de aviso previo y si yo participo, y ajustarla mientras no se fije el orden de turnos, **para** dejar las condiciones claras desde el inicio sin llevarlas en un Excel.

**Criterios de aceptación:**
- DADO QUE Carmen abre "Crear junta", CUANDO se muestra el formulario, ENTONCES el campo "Días de aviso previo" muestra 3. (RN-011)
- DADO QUE el 14/11/2026 Carmen completa "Junta Familia", "300.00", 12 participantes, mensual, 30/11/2026, 3 días de aviso y "Sí participo", CUANDO pulsa "Crear junta", ENTONCES la junta se crea con `status = "open"`, cuota `30000`, Carmen ocupa 1 de los 12 cupos y la junta recibe un código de 8 caracteres de `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` que no se generó nunca antes, por ejemplo `K7MP4XR2`. (RN-002, RN-003, RN-005, RN-006, RN-007, RN-040, RN-096, RN-099, RN-015, RN-016)
- DADO QUE Jorge ya gestiona la Junta Oficina y la Junta Ventas, CUANDO crea "Junta Oficina 2027", ENTONCES la junta se crea. (RN-001)
- DADO QUE Carmen deja vacía la fecha de vencimiento de la ronda 1, CUANDO pulsa "Crear junta", ENTONCES la junta no se crea y ve "Complete los campos marcados.". (RN-002)
- DADO QUE Carmen ingresa la cuota "5.00", "6000.00", "20.85" o "300,50", CUANDO pulsa "Crear junta", ENTONCES la junta no se crea y ve "Ingrese una cuota entre S/ 10.00 y S/ 5,000.00." para las dos primeras, "La cuota debe ser múltiplo de S/ 0.10, por ejemplo S/ 20.80." para la tercera e "Ingrese el monto solo con números y un punto decimal, por ejemplo 1250.50." para la cuarta; "20.80" se acepta y se guarda `2080`. (RN-003, RN-004, RN-097, RN-040)
- DADO QUE el 14/11/2026 Carmen ingresa el nombre "J1", 1 o 51 participantes, "cada 1 días" o "cada 90 días", 0 u 8 días de aviso, o la ronda 1 el 10/11/2026, CUANDO pulsa "Crear junta", ENTONCES la junta no se crea y ve el mensaje de cada caso: "El nombre de la junta debe tener entre 3 y 60 caracteres.", "Ingrese entre 2 y 50 participantes.", "Ingrese un número de días entre 2 y 60.", "Ingrese entre 1 y 7 días de aviso previo." o "La fecha de vencimiento de la ronda 1 no puede ser anterior a hoy."; la ronda 1 el 14/11/2026 se acepta. (RN-096, RN-005, RN-008, RN-010, RN-009)
- DADO QUE el campo de aviso muestra 3, CUANDO Carmen elige "cada 2 días", ENTONCES el campo pasa a 1; y si después elige "cada 5 días" y escribe 5 días de aviso, se rechaza con "Los días de aviso previo deben ser menos que los días entre una cuota y la siguiente."; una junta semanal con 6 días de aviso se acepta. (RN-098, RN-012)
- DADO QUE la Junta Familia está "Abierta" con 9 cupos ocupados, CUANDO Carmen cambia la cuota a "350.00", ENTONCES se guarda `35000`; si la cambia a "6000.00" se rechaza; y si baja la cantidad a 8 participantes ve "La junta ya tiene 9 cupos ocupados. Ingrese al menos 9 participantes.". (RN-106, RN-107, RN-108)
- DADO QUE Jorge no participa en la Junta Ventas y tiene 10 de 10 cupos ocupados, CUANDO marca "Sí participo", ENTONCES ve "La junta no tiene cupos libres para que usted participe.". (RN-109)
- DADO QUE la Junta Familia todavía no fija su orden de turnos, CUANDO Carmen regenera el código `K7MP4XR2` y recibe `T9QW3HZ5`, o quita a una persona que se unió por error, ENTONCES `K7MP4XR2` deja de servir y el cupo de esa persona queda libre. (RN-020, RN-112, RN-113)
- DADO QUE la Junta Oficina ya fijó su orden de turnos, CUANDO Jorge cambia el nombre a "Junta Oficina 2026", ENTONCES se guarda; y si intenta cambiar la cuota a "1200.00" ve "La junta ya fijó su orden de turnos. Solo puede cambiar su nombre.". (RN-110)
- DADO QUE Lucía no es la organizadora de la Junta Oficina, CUANDO envía `POST /juntas/{id}/invite-code` o intenta editar la junta o quitar a un participante, ENTONCES recibe `403`. (RN-077)
- [NUEVO] **Positivo.** DADO QUE la Junta Familia está "Abierta" con 9 de 12 cupos ocupados, CUANDO Carmen quita a un familiar que se unió por error, ENTONCES la junta queda con 8 de 12 cupos y ese familiar recibe `403` al pedir `GET /juntas/{id}/members`. (RN-112, RN-113, RN-024)
- [NUEVO] **Negativo.** DADO QUE el navegador de Carmen está en modo "Offline", CUANDO completa el formulario de la Junta Familia y pulsa "Crear junta", ENTONCES ve "Necesita conexión a internet para hacer esto.", no se crea ninguna junta y no se genera ningún código. (RN-170)
- [NUEVO] **Negativo.** DADO QUE llega una petición para crear una junta con la frecuencia "bimestral", CUANDO el servidor la procesa, ENTONCES la junta no se crea. (RN-007)
- [NUEVO] **Negativo.** DADO QUE la Junta Familia ya recibió `K7MP4XR2`, CUANDO al crear la Junta Oficina el generador vuelve a producir `K7MP4XR2`, ENTONCES el sistema genera otro código, por ejemplo `M3QX7KPA`; y después de que Carmen regenera su código, `K7MP4XR2` no se entrega a ninguna otra junta. (RN-016)
- [NUEVO] **Negativo.** DADO QUE la Junta Oficina ya fijó su orden de turnos, CUANDO Jorge intenta quitar a Pedro, ENTONCES se rechaza y Pedro sigue siendo miembro con todas sus cuotas. (RN-114, RN-112)
- [NUEVO] **Borde.** DADO QUE el 14/11/2026 Carmen completa el formulario, CUANDO ingresa la cuota "10.00" o "5000.00", 2 o 50 participantes, "cada 2 días" con 1 día de aviso o "cada 60 días" con 7 días de aviso, o un nombre de 3 caracteres ("Fam") o de 60 caracteres, ENTONCES la junta se crea, y las cuotas se guardan como `1000` y `500000`. (RN-003, RN-005, RN-008, RN-010, RN-012, RN-096, RN-040)
- [NUEVO] **Borde.** DADO QUE Carmen ingresa la cuota "1000" o "1000.5", CUANDO pulsa "Crear junta", ENTONCES se guarda `100000` o `100050`; y con "1,000" o "20.805" ve "Ingrese el monto solo con números y un punto decimal, por ejemplo 1250.50.". (RN-097, RN-040)
- [NUEVO] **Borde.** DADO QUE la Junta Familia está "Abierta" con 9 cupos ocupados, CUANDO Carmen baja la cantidad de participantes a 9, ENTONCES el cambio se guarda y la junta pasa a `full`. (RN-108, RN-100)

**Reglas de negocio relacionadas:** RN-001, RN-002, RN-003, RN-004, RN-005, RN-006, RN-007, RN-008, RN-009, RN-010, RN-011, RN-012, RN-015, RN-016, RN-020, RN-024, RN-040, RN-077, RN-096, RN-097, RN-098, RN-099, RN-100, RN-106, RN-107, RN-108, RN-109, RN-110, RN-112, RN-113, RN-114, RN-170

**Notas:**
- RN-016 tiene fuente "Business Analyst" y espera la validación del Product Owner.
- Crear, editar la junta, regenerar el código y quitar participantes exigen conexión (RN-170).
- Las reglas escritas de la junta (F-09, Should) no forman parte de esta HU. Ver "HUs sugeridas" (HU-013).
- El código se comparte fuera de la app, por ejemplo por WhatsApp (S-15). La app no lo envía (PRINCIPIO-007).
- El catálogo §2.9 no tiene el texto para quitar a un participante después de fijar el orden ni para una frecuencia no permitida. Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple I, N, V, E y T. **S ❌:** con 20 criterios y 32 RN no cabe en una iteración. Corrección sugerida: dejar en HU-004 "Crear una junta" y pasar "Ajustar la junta antes de fijar el orden" (RN-106 a RN-110, RN-112, RN-113, RN-020) a una HU nueva, HU-014, porque HU-013 queda para F-09. Dividirla requiere aprobación del Product Owner (PRINCIPIO-012).
- **Valores concretos:** el criterio de regenerar el código o quitar a una persona no dice cuántos cupos quedan. El primer criterio [NUEVO] lo concreta (9 → 8 de 12).
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-003 (cuota en céntimos, mínimo S/ 0.10) y PRINCIPIO-006 (validación en el servidor).
- **Cobertura:** positivo (crear, editar, quitar), negativo (datos inválidos, sin conexión, sin permisos, código repetido, quitar después del orden) y borde (mínimos y máximos de cada campo, ronda 1 hoy, bajar la cantidad exactamente a los cupos ocupados).

---

### HU-005: Unirse a una junta con su código de invitación

**Prioridad:** Must

**Como** participante invitado, **quiero** unirme a la junta con el código de 8 caracteres que me compartió el organizador, y poder salir mientras no se haya fijado el orden de turnos, **para** ocupar mi cupo sin que el organizador me registre a mano.

**Criterios de aceptación:**
- DADO QUE la Junta Oficina tiene 8 de 10 cupos ocupados y Pedro tiene su correo verificado, CUANDO ingresa `M3QX7KPA`, ENTONCES pasa a ser miembro, la junta queda con 9 de 10 cupos y sigue "Abierta"; cuando se une el décimo participante, la junta pasa a `full`. (RN-100)
- DADO QUE Ana no tiene sesión iniciada, CUANDO ingresa `K7MP4XR2`, ENTONCES ve "Inicie sesión o cree su cuenta para unirse a la junta." y la cantidad de cupos ocupados no cambia. (RN-017)
- DADO QUE Rosa creó su cuenta pero todavía no abrió su enlace de verificación y la Junta Familia tiene 11 de 12 cupos ocupados, CUANDO ingresa `T9QW3HZ5`, ENTONCES ve "Verifique su correo para crear una junta o unirse a una." y la junta sigue con 11 de 12 cupos. (RN-153)
- DADO QUE la Junta Familia tiene 12 de 12 cupos ocupados, CUANDO Rosa ingresa su código, ENTONCES ve "Esta junta ya no tiene cupos disponibles."; y si dos personas ingresan el código al mismo tiempo por el último cupo libre, solo una se une. (RN-018)
- DADO QUE Lucía ya es miembro de la Junta Oficina, que tiene 8 de 10 cupos ocupados, CUANDO vuelve a ingresar `M3QX7KPA`, ENTONCES la junta sigue con 8 de 10 cupos y Lucía aparece una sola vez. (RN-021)
- DADO QUE Carmen regeneró `K7MP4XR2` por `T9QW3HZ5`, CUANDO Rosa ingresa `K7MP4XR2` o `ZZZZ2222`, ENTONCES ve "Este código ya no es válido." y "Este código no es válido." respectivamente. (RN-020, RN-116)
- DADO QUE entre las 10:00 y las 10:20 Rosa ingresó 10 códigos que no existen, CUANDO a las 10:25 ingresa `T9QW3HZ5`, ENTONCES se rechaza con "Demasiados códigos no válidos. Intente de nuevo en 1 hora."; a las 11:21 se acepta. (RN-117)
- DADO QUE la Junta Familia tiene 12 de 12 cupos y no fijó su orden de turnos, CUANDO un familiar pulsa "Salir de la junta", ENTONCES deja de ser miembro, la junta queda con 11 de 12 cupos y vuelve a `open`. (RN-111, RN-113, RN-101)
- DADO QUE la Junta Oficina ya fijó su orden de turnos, CUANDO Pedro pulsa "Salir de la junta", ENTONCES ve "La junta ya fijó su orden de turnos. Ya no es posible salir de ella." y sigue siendo miembro. (RN-114)
- DADO QUE Carmen es la organizadora de la Junta Familia, CUANDO pulsa "Salir de la junta", ENTONCES ve "Usted es la persona organizadora de esta junta y no puede salir de ella.". (RN-115)
- [NUEVO] **Negativo.** DADO QUE Rosa tiene su correo verificado y su navegador está en modo "Offline", CUANDO ingresa `T9QW3HZ5` o pulsa "Salir de la junta" en una junta de la que es miembro, ENTONCES ve "Necesita conexión a internet para hacer esto." y la cantidad de cupos ocupados no cambia. (RN-170)
- [NUEVO] **Negativo.** DADO QUE Jorge ejecutó el sorteo de la Junta Oficina el 20/11/2026, CUANDO el 21/11/2026 Rosa ingresa `M3QX7KPA`, ENTONCES ve "Este código ya no es válido." y la junta sigue con 10 de 10 cupos. (RN-019)
- [NUEVO] **Borde.** DADO QUE la Junta Familia tenía 12 de 12 cupos, un familiar salió antes del sorteo y quedó con 11 de 12, CUANDO Rosa, con su correo verificado, ingresa `T9QW3HZ5`, ENTONCES se une, la junta vuelve a 12 de 12 cupos y pasa a `full`. (RN-018, RN-113, RN-100)
- [NUEVO] **Borde.** DADO QUE entre las 10:00 y las 10:20 Rosa ingresó 9 códigos que no existen, CUANDO a las 10:25 ingresa `T9QW3HZ5` y la Junta Familia tiene un cupo libre, ENTONCES se une a la junta. (RN-117)

**Reglas de negocio relacionadas:** RN-017, RN-018, RN-019, RN-020, RN-021, RN-100, RN-101, RN-111, RN-113, RN-114, RN-115, RN-116, RN-117, RN-153, RN-170

**Notas:**
- RN-021 tiene fuente "Business Analyst" y espera la validación del Product Owner.
- La cuenta necesita el correo verificado para unirse (RN-153). HU-001 verifica la misma regla al crear una junta.
- Unirse y salir exigen conexión (RN-170).
- Salir después del sorteo, reemplazar a un participante o transferir el rol de organizador están fuera del alcance (NO-13).
- RN-117 no dice si un código anulado (por ejemplo `K7MP4XR2`) cuenta como código inválido para el límite de 10, ni si el código se acepta en minúsculas (`t9qw3hz5`). Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple N, V, E, S y T. **I ⚠️:** necesita una junta creada (HU-004). Se prueba de forma aislada con la Junta Familia y la Junta Oficina como datos de prueba.
- **Valores concretos:** los 10 criterios originales tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-007 (el código se comparte fuera de la app).
- **Cobertura:** positivo (unirse, salir antes del orden), negativo (sin sesión, sin verificar, junta llena, código anulado o inexistente, sin conexión, después del sorteo) y borde (último cupo, concurrencia por el último cupo, código que vuelve a servir al liberarse un cupo, 9 y 10 códigos inválidos).

---

## Épica 3 · Orden de turnos

Funcionalidades: F-03 (Must) y F-10 (Should).

### HU-006: Ejecutar el sorteo auditable de turnos

**Prioridad:** Must

**Como** organizador, **quiero** ejecutar el sorteo de turnos cuando se llenan los cupos y que quede un registro que cualquier miembro puede reproducir, **para** que nadie discuta después el orden ni desconfíe de mí.

**Criterios de aceptación:**
- DADO QUE la Junta Familia tiene 11 de 12 cupos ocupados, CUANDO Carmen abre la junta, ENTONCES el botón "Ejecutar sorteo" está deshabilitado; con 12 de 12 se habilita. (RN-027)
- DADO QUE el navegador de Carmen está en modo "Offline", CUANDO pulsa "Ejecutar sorteo", ENTONCES ve "Necesita conexión a internet para ejecutar el sorteo." y no se guarda ningún sorteo. (RN-029)
- DADO QUE la ronda 1 de la Junta Familia vence el 30/11/2026 y los cupos se llenan el 02/12/2026, CUANDO Carmen intenta sortear ese día, ENTONCES ve "La fecha de vencimiento de la ronda 1 ya pasó. Cámbiela antes de fijar el orden de turnos."; si cambia la fecha al 15/12/2026, el sorteo se ejecuta. (RN-122)
- DADO QUE la Junta Oficina tiene 10 de 10 cupos, CUANDO Jorge ejecuta el sorteo el 20/11/2026 a las 19:30:12, ENTONCES se guarda `{"seed":"<64 caracteres hexadecimales de un CSPRNG>","algorithm_version":"fisher-yates-v1","input":["user_456","user_789","user_234",…],"result":["user_501","user_234","user_502","user_456",…],"executed_by":"user_456","executed_at":"2026-11-20T19:30:12-05:00"}`, con la entrada ordenada por el momento en que cada uno ocupó su cupo. (RN-031, RN-032, RN-034, RN-123)
- DADO QUE el resultado empieza con `["user_501","user_234","user_502","user_456",…]`, CUANDO Pedro y Jorge abren la junta, ENTONCES Pedro tiene el turno 2 y recibe el pozo de la ronda 2, y Jorge tiene el turno 4. (RN-036, RN-037)
- DADO QUE el sorteo de la Junta Oficina se ejecutó, CUANDO se revisa la junta, ENTONCES está en `in_progress`, tiene las rondas 1 a 10 con 10 cuotas de `100000` cada una, incluida la de quien recibe el pozo, todas en `pending`, con vencimientos 30/11/2026, 30/12/2026, 30/01/2027 y 28/02/2027 para las rondas 1 a 4, y el código `M3QX7KPA` ya no es válido. (RN-102, RN-013, RN-042, RN-043, RN-045, RN-049, RN-050, RN-019)
- DADO QUE la Junta Familia tiene cuota `30000` y 12 participantes, CUANDO Carmen ejecuta el sorteo, ENTONCES cada ronda queda con un pozo de `360000`, que la app muestra como "S/ 3,600.00". (RN-041, RN-091)
- DADO QUE Jorge no participa en la Junta Ventas, quincenal con la ronda 1 el 01/12/2026, CUANDO ejecuta el sorteo, ENTONCES la lista de entrada tiene 10 identificadores sin `user_456`, ninguna cuota está a su nombre y las rondas 2 y 3 vencen el 16/12/2026 y el 31/12/2026. (RN-030, RN-044, RN-047)
- DADO QUE una junta semanal tiene la ronda 1 el 05/12/2026 y otra de cada 10 días tiene la ronda 1 el 01/12/2026, CUANDO se fija su orden de turnos, ENTONCES sus rondas 2 vencen el 12/12/2026 y el 11/12/2026. (RN-046, RN-048)
- DADO QUE la Junta Oficina se sorteó el 20/11/2026, CUANDO Jorge envía `POST /juntas/{id}/draw` el 21/11/2026, ENTONCES recibe `409` y el registro del sorteo sigue igual. (RN-028, RN-035)
- DADO QUE la implementación recibe la semilla `000102…1e1f` y la entrada `["p01",…,"p10"]` del vector de prueba del anexo A, CUANDO ejecuta `fisher-yates-v1`, ENTONCES devuelve `["p05","p07","p02","p01","p08","p03","p09","p10","p04","p06"]`. (RN-124)
- DADO QUE Lucía es miembro de la Junta Oficina, CUANDO abre "Ver sorteo", ENTONCES ve la semilla, la versión del algoritmo, la lista de entrada con los nombres en su orden y el resultado, y al reproducirlo con el anexo A obtiene el mismo orden de turnos. (RN-121, RN-033)
- [NUEVO] **Negativo.** DADO QUE la Junta Oficina tiene 10 de 10 cupos y todavía no se sorteó, CUANDO Lucía, que no es la organizadora, envía `POST /juntas/{id}/draw`, ENTONCES recibe `403`, no se guarda ningún sorteo y la junta sigue en `full`. (RN-077)
- [NUEVO] **Negativo.** DADO QUE Rosa no es miembro de la Junta Oficina, CUANDO intenta abrir su registro del sorteo, ENTONCES recibe `403`. (RN-024)
- [NUEVO] **Borde.** DADO QUE la Junta Familia tiene 12 de 12 cupos, CUANDO Carmen pulsa "Ejecutar sorteo" al mismo tiempo en dos pestañas, ENTONCES se guarda un solo registro de sorteo, una sola serie de rondas y cuotas, y la otra petición recibe `409`. (RN-028, RN-035, RN-013)
- [NUEVO] **Borde.** DADO QUE la ronda 1 de la Junta Familia vence el 30/11/2026 y los cupos se llenan ese mismo día, CUANDO Carmen ejecuta el sorteo el 30/11/2026, ENTONCES el sorteo se ejecuta. (RN-122)
- [NUEVO] **Borde.** DADO QUE una junta de prueba de 2 participantes con cuota `1000` tiene 2 de 2 cupos, CUANDO su organizador ejecuta el sorteo, ENTONCES la junta queda con 2 rondas de 2 cuotas de `1000` cada una, un pozo de `2000` que la app muestra como "S/ 20.00", y un resultado que contiene los mismos 2 identificadores de la lista de entrada. (RN-005, RN-013, RN-041, RN-042, RN-124)
- [NUEVO] **Borde.** DADO QUE una junta mensual tiene la ronda 1 el 31/01/2027 y otra la tiene el 31/01/2028, CUANDO se fija su orden de turnos, ENTONCES la primera tiene las rondas 2, 3 y 4 el 28/02/2027, el 31/03/2027 y el 30/04/2027, y la segunda tiene la ronda 2 el 29/02/2028. (RN-049, RN-050)

**Reglas de negocio relacionadas:** RN-005, RN-013, RN-019, RN-024, RN-027, RN-028, RN-029, RN-030, RN-031, RN-032, RN-033, RN-034, RN-035, RN-036, RN-037, RN-041, RN-042, RN-043, RN-044, RN-045, RN-046, RN-047, RN-048, RN-049, RN-050, RN-077, RN-091, RN-102, RN-121, RN-122, RN-123, RN-124

**Notas:**
- RN-036, RN-037 y RN-045 tienen fuente "Business Analyst" y esperan la validación del Product Owner.
- Los módulos de sorteo y de cálculo de cuotas necesitan 100 % de cobertura de líneas y ramas (PRINCIPIO-011). Los criterios de borde de 2 participantes y de fin de mes ayudan a cubrir esas ramas.
- Cualquier cambio al algoritmo requiere aprobación humana y otro valor de `algorithm_version` (PRINCIPIO-012, anexo A).
- Atiende la desconfianza por el orden del sorteo del brief (§1) y el supuesto S-12.

**Revisión QA:**
- **INVEST:** cumple N, V, E y T. **I ⚠️:** necesita una junta con los cupos llenos. **S ⚠️:** incluye la generación de rondas y cuotas porque ocurre en el mismo evento (RN-013, RN-042); el vector de prueba del anexo A reduce la incertidumbre de la estimación.
- **Valores concretos:** la semilla del criterio de RN-034 es un marcador porque sale de un CSPRNG; se verifica su formato (64 caracteres hexadecimales) y que el registro se pueda reproducir. Los demás tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-008 (CSPRNG de 256 bits, Fisher–Yates versionado, registro inmutable y verificable por todo miembro).
- **Cobertura:** positivo (sortear y generar rondas y cuotas), negativo (cupos libres, sin conexión, ronda 1 vencida, segundo sorteo, sin permisos, no miembro) y borde (doble pulsación, ronda 1 hoy, junta de 2 participantes, fin de mes y año bisiesto).

---

### HU-007: Asignar el orden de turnos sin sorteo

**Prioridad:** Should

**Como** organizador, **quiero** asignar a mano el turno de cada participante, por ejemplo según su necesidad, y que quede registrado quién lo decidió y cuándo, **para** reflejar en la app cómo mi grupo acordó el orden cuando no lo sortea.

**Criterios de aceptación:**
- DADO QUE la Junta Ventas tiene 9 de 10 cupos ocupados, CUANDO Jorge abre la junta, ENTONCES la opción "Asignar orden" está deshabilitada. (RN-126)
- DADO QUE la Junta Ventas tiene 10 de 10 cupos, CUANDO Jorge asigna los turnos 1 a 10 sin repetir, con Marta en el turno 1, el 20/11/2026 a las 19:45:03, ENTONCES se guarda la asignación con `assigned_by = "user_456"` y `assigned_at = "2026-11-20T19:45:03-05:00"`, la junta pasa a `in_progress` con 10 rondas de 10 cuotas cada una y `W8RT5NHC` deja de ser válido. (RN-038, RN-039, RN-102, RN-013, RN-042, RN-129)
- DADO QUE Jorge asigna el turno 1 a Marta y a otro participante y nadie queda con el turno 10, CUANDO guarda la asignación, ENTONCES se rechaza con "Asigne a cada participante un turno distinto, del 1 al 10.". (RN-127)
- DADO QUE la Junta Ventas ya tiene su orden asignado a mano, o la Junta Oficina ya se sorteó, CUANDO Jorge intenta ejecutar un sorteo o asignar el orden otra vez, ENTONCES recibe `409` con "Esta junta ya tiene su orden de turnos.". (RN-125)
- [CORREGIDO] DADO QUE la asignación de la Junta Ventas del 20/11/2026 está guardada, CUANDO una operación de la API o de la base de datos intenta cambiar su resultado, por ejemplo `UPDATE turn_assignments SET result = …`, ENTONCES el registro sigue igual, con Marta en el turno 1, `assigned_by = "user_456"` y `assigned_at = "2026-11-20T19:45:03-05:00"`. (RN-128)
- DADO QUE la ronda 1 de la Junta Ventas vence el 01/12/2026, CUANDO Jorge intenta asignar el orden el 02/12/2026, ENTONCES ve "La fecha de vencimiento de la ronda 1 ya pasó. Cámbiela antes de fijar el orden de turnos.". (RN-122)
- [NUEVO] **Positivo.** DADO QUE Jorge asignó a Marta el turno 1 de la Junta Ventas, que tiene cuota `50000` y 10 participantes, CUANDO Marta abre la junta, ENTONCES ve "Su turno: 1" y es quien recibe el pozo de la ronda 1, de `500000`, que la app muestra como "S/ 5,000.00". (RN-025, RN-037, RN-041, RN-091)
- [NUEVO] **Negativo.** DADO QUE la Junta Ventas tiene 10 de 10 cupos, CUANDO Marta, que no es la organizadora, envía una asignación del orden, ENTONCES recibe `403` y no se guarda ninguna asignación. (RN-077)
- [NUEVO] **Negativo.** DADO QUE el navegador de Jorge está en modo "Offline", CUANDO intenta asignar el orden de la Junta Ventas, ENTONCES ve "Necesita conexión a internet para hacer esto." y no se guarda ninguna asignación. (RN-170)
- [NUEVO] **Negativo.** DADO QUE Jorge asignó el orden de la Junta Ventas el 20/11/2026, CUANDO el 21/11/2026 Rosa ingresa `W8RT5NHC`, ENTONCES ve "Este código ya no es válido.". (RN-129)
- [NUEVO] **Borde.** DADO QUE la Junta Ventas tiene 10 de 10 cupos, CUANDO Jorge guarda una asignación con turnos solo para 9 participantes, o con un participante en el turno 11, ENTONCES se rechaza con "Asigne a cada participante un turno distinto, del 1 al 10.". (RN-127)
- [NUEVO] **Borde.** DADO QUE la ronda 1 de la Junta Ventas vence el 01/12/2026, CUANDO Jorge asigna el orden el 01/12/2026, ENTONCES la asignación se guarda. (RN-122)

**Reglas de negocio relacionadas:** RN-013, RN-025, RN-037, RN-038, RN-039, RN-041, RN-042, RN-077, RN-091, RN-102, RN-122, RN-125, RN-126, RN-127, RN-128, RN-129, RN-170

**Notas:**
- Asignar el orden exige conexión (RN-170 no la incluye entre las acciones sin conexión).
- PRINCIPIO-006 y RN-121 solo dicen que todo miembro ve el registro del sorteo. Si los miembros también ven el registro de la asignación manual (quién y cuándo) está [REQUIERE DECISIÓN]. Se propone agregarlo a 05-preguntas-abiertas.md.
- Los cambios de turno posteriores quedan para F-13 (Could), y mover turnos después de fijarlos está fuera del alcance (NO-13).
- RN-037 tiene fuente "Business Analyst" y espera la validación del Product Owner.

**Revisión QA:**
- **INVEST:** cumple N, V, E, S y T. **I ⚠️:** comparte con HU-006 la generación de rondas y cuotas. Tiene un tema abierto sobre quién ve la asignación.
- **Valores concretos:** el criterio de RN-128 decía "cualquier proceso intenta modificarla", sin una acción concreta que probar. **[CORREGIDO]**. Texto original: "DADO QUE la asignación de la Junta Ventas del 20/11/2026 está guardada, CUANDO cualquier proceso intenta modificarla, ENTONCES el registro sigue igual. (RN-128)". El texto nuevo usa la operación del contraejemplo de RN-128 y los valores guardados del segundo criterio.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-008 (orden sin sorteo inmutable, con quién y cuándo).
- **Cobertura:** positivo (asignar, ver el turno y el pozo), negativo (cupos libres, turnos repetidos, orden ya fijado, sin permisos, sin conexión, código anulado) y borde (permutación incompleta o turno fuera de rango, ronda 1 hoy).

---

## Épica 4 · Pagos

Funcionalidades: F-04 (Must) y F-08 (Should).

### HU-008: Registrar y desmarcar pagos de las cuotas

**Prioridad:** Must

**Como** organizador, **quiero** marcar cada cuota como pagada con la fecha en que me pagaron por Yape, Plin o en efectivo, y desmarcarla si me equivoqué, también sin conexión, **para** llevar la cuenta de la junta en la app en lugar de un Excel que solo veo yo.

**Criterios de aceptación:**
- DADO QUE la cuota de Lucía de la ronda 1 vence el 30/11/2026 y está "Pendiente", CUANDO el 28/11/2026 Jorge la registra con fecha de pago 28/11/2026, ENTONCES se guarda `paid_on = 2026-11-28`, la cuota pasa a `paid` y el pago queda "a tiempo". (RN-052, RN-053, RN-055)
- DADO QUE la cuota de Pedro de la ronda 1 vence el 30/11/2026, CUANDO Jorge la registra con fecha de pago 02/12/2026, ENTONCES el pago queda "atrasado". (RN-056)
- DADO QUE hoy es 28/11/2026 y la Junta Oficina se creó el 14/11/2026, CUANDO Jorge indica la fecha de pago 30/11/2026 o 01/01/2025, ENTONCES se rechaza con "La fecha de pago no puede ser posterior a hoy." o "La fecha de pago no puede ser anterior a la creación de la junta."; 14/11/2026 se acepta. (RN-054, RN-132)
- DADO QUE Lucía no es la organizadora, CUANDO envía `POST /contributions/{id}/payment`, ENTONCES recibe `403` y la cuota no cambia. (RN-051, RN-077)
- DADO QUE la cuota de Lucía de la ronda 1 ya está "Pagada", CUANDO Jorge intenta registrarla otra vez, ENTONCES ve "Esta cuota ya no está pendiente.". (RN-130)
- DADO QUE el 28/11/2026 Lucía le pagó a Jorge por adelantado su cuota de la ronda 2, que vence el 30/12/2026, CUANDO Jorge la registra, ENTONCES se acepta y queda "a tiempo". (RN-133)
- DADO QUE Jorge se equivocó de fecha en el pago de Lucía, CUANDO lo desmarca el 02/12/2026 a las 08:15:40, ENTONCES la cuota vuelve a `pending`, se guarda `{"contribution_id":"c_789","corrected_by":"user_456","corrected_at":"2026-12-02T08:15:40-05:00"}`, el historial conserva el pago original y la fecha de pago no se puede editar con `PATCH /payments/{id}`. (RN-057, RN-058, RN-059, RN-134)
- DADO QUE la cuota de Pedro está "Pendiente", CUANDO Jorge intenta desmarcarla, ENTONCES ve "Esta cuota no tiene un pago registrado." y no se guarda ninguna corrección. (RN-131)
- DADO QUE solo queda pendiente una cuota de la ronda 10 de la Junta Oficina, CUANDO Jorge la registra, ENTONCES la junta pasa a `finished`; y si después desmarca ese pago, vuelve a `in_progress`. (RN-103, RN-104)
- [CORREGIDO] DADO QUE el 28/11/2026 la tablet de Jorge no tiene conexión, CUANDO registra el pago de Lucía a las 18:40 y el de Pedro a las 18:42, e intenta cambiar el nombre de la Junta Oficina, ENTONCES ve "2 cambios sin enviar." y la opción de cambiar el nombre está deshabilitada con "Necesita conexión a internet para hacer esto."; al reconectar, el servidor recibe primero el pago de Lucía y lo guarda con `performed_at = "2026-11-28T18:40:00-05:00"`. (RN-170, RN-174, RN-087, RN-173)
- DADO QUE a las 18:40 Jorge registró sin conexión en su tablet el pago de Lucía y a las 18:50 lo registró desde su celular con conexión, CUANDO la tablet reconecta a las 19:00, ENTONCES el cambio de la tablet se rechaza y la tablet muestra "No se pudo guardar un cambio hecho sin conexión: el pago de Lucía de la ronda 1 ya estaba registrado.". (RN-171, RN-172)
- DADO QUE Jorge registró un pago sin conexión y su sesión venció, CUANDO reconecta, ENTONCES la app conserva el pago y lo envía después de que Jorge vuelve a iniciar sesión. (RN-176)
- [NUEVO] **Positivo.** DADO QUE el 02/12/2026 Jorge desmarcó el pago de Lucía de la ronda 1, que tenía una fecha equivocada, CUANDO lo vuelve a registrar con fecha de pago 28/11/2026, ENTONCES la cuota pasa a `paid`, el pago queda "a tiempo" y el historial muestra el pago original, la corrección del 02/12/2026 y el pago nuevo. (RN-134, RN-058, RN-052, RN-055)
- [NUEVO] **Negativo.** DADO QUE la cuota de Pedro de la ronda 1 está "Pagada", CUANDO Lucía, que no es la organizadora, intenta desmarcarla, ENTONCES recibe `403`, la cuota sigue en `paid` y no se guarda ninguna corrección. (RN-077)
- [NUEVO] **Borde.** DADO QUE hoy es 02/12/2026 y dos cuotas "Pendiente" de la ronda 1 de la Junta Oficina vencieron el 30/11/2026, CUANDO Jorge registra una con fecha de pago 30/11/2026 y la otra con fecha de pago 01/12/2026, ENTONCES la primera queda "a tiempo" y la segunda "atrasado". (RN-055, RN-056)
- [NUEVO] **Borde.** DADO QUE la Junta Familia está "Abierta" con 11 de 12 cupos ocupados, CUANDO Carmen abre "Pagos", ENTONCES no hay ninguna cuota para registrar, porque las cuotas no existen antes de fijar el orden de turnos. (RN-105)

**Reglas de negocio relacionadas:** RN-051, RN-052, RN-053, RN-054, RN-055, RN-056, RN-057, RN-058, RN-059, RN-077, RN-087, RN-103, RN-104, RN-105, RN-130, RN-131, RN-132, RN-133, RN-134, RN-170, RN-171, RN-172, RN-173, RN-174, RN-176

**Notas:**
- La app no mueve dinero: solo registra pagos hechos fuera de ella (PRINCIPIO-004, NO-01).
- Los pagos que registra esta HU alimentan KPI-01, KPI-03 y KPI-04, y su uso valida S-02 y S-13 (R-03).
- El funcionamiento sin conexión no es una funcionalidad aparte (02-alcance.md §1). Se verifica aquí porque registrar y desmarcar pagos son acciones que RN-170 permite sin conexión, y R-12 describe el choque entre dos dispositivos.
- El texto que ve el organizador en "Pagos" cuando todavía no hay cuotas no está en el catálogo §2.9; se define en el diseño, sin agregar reglas.

**Revisión QA:**
- **INVEST:** cumple I (con datos de prueba), N, V y E. **S ❌:** con 16 criterios, el registro sin conexión (RN-087, RN-170 a RN-176) no cabe con el registro en línea en una iteración. Corrección sugerida (ya prevista en v0.3.0): dividirla en "registro en línea" y "registro sin conexión", con el siguiente ID libre para la segunda. **T:** se corrigió un criterio contradictorio (ver abajo).
- **Valores concretos:** el criterio de RN-176 no tiene horas, pero su resultado es verificable. Los demás tienen valores concretos.
- **Constitución y datos de ejemplo:** el criterio sin conexión pedía pulsar "Regenerar código" en una junta que ya fijó su orden de turnos, pero ese código ya está anulado (RN-019, RN-129) y la acción no existe en ese estado; el Gherkin heredaría una contradicción (PRINCIPIO-011). **[CORREGIDO]** con una acción que sí existe después del sorteo y que RN-170 no permite sin conexión: cambiar el nombre de la junta (RN-110). También se agregó la fecha 28/11/2026 que pide el `performed_at`. Texto original: "DADO QUE la tablet de Jorge no tiene conexión, CUANDO registra el pago de Lucía a las 18:40 y el de Pedro a las 18:42 y pulsa "Regenerar código", ENTONCES ve "2 cambios sin enviar" y el botón "Regenerar código" está deshabilitado con "Necesita conexión a internet para hacer esto."; al reconectar, el servidor recibe primero el pago de Lucía y lo guarda con `performed_at = "2026-11-28T18:40:00-05:00"`. (RN-170, RN-174, RN-087, RN-173)". Cumple PRINCIPIO-004 y PRINCIPIO-009.
- **Cobertura:** positivo (registrar, adelantar, desmarcar y volver a registrar), negativo (fecha futura o anterior a la junta, sin permisos, cuota no pendiente, desmarcar sin pago, choque entre dispositivos) y borde (fecha de pago igual al vencimiento y un día después, última cuota que termina la junta, junta sin cuotas).

---

### HU-009: Informar el pago de mi cuota

**Prioridad:** Should

**Como** participante, **quiero** informar en la app que ya pagué mi cuota, con la fecha en que la pagué, **para** que el organizador solo tenga que confirmarlo y dejen de llegarme recordatorios mientras lo revisa.

**Criterios de aceptación:**
- DADO QUE la cuota de Lucía de la ronda 3 vence el 30/01/2027 y está "Pendiente", CUANDO el 28/01/2027 a las 20:10 pulsa "Informar mi pago" con fecha de pago 28/01/2027, ENTONCES la cuota pasa a `awaiting_confirmation`, se guarda `reported_paid_on = 2027-01-28` y en ese momento Jorge recibe el correo "Lucía informó el pago de su cuota de la ronda 3 de la Junta Oficina. Confírmelo o recházelo en Mi Junta". (RN-060, RN-137, RN-139)
- DADO QUE Lucía abre "Informar mi pago", CUANDO revisa el formulario o la API recibe un archivo, ENTONCES el formulario solo tiene el campo "Fecha de pago" y el botón "Informar pago", y la API no guarda ningún archivo. (RN-065)
- DADO QUE Lucía informó su pago con fecha 28/01/2027, CUANDO Jorge lo confirma el 03/02/2027, ENTONCES la cuota pasa a `paid` con `paid_on = 2027-01-28` y el pago queda "a tiempo". (RN-062, RN-138)
- DADO QUE la cuota de Lucía está "Por confirmar", CUANDO Jorge rechaza el pago informado, ENTONCES la cuota vuelve a `pending`; y si Jorge no responde, el 10/03/2027 sigue en `awaiting_confirmation`. (RN-063, RN-064)
- DADO QUE Lucía es participante de la Junta Oficina, CUANDO envía `POST /contributions/{id_de_Pedro}/report`, intenta informar su cuota "Pagada" de la ronda 1 o indica el 28/01/2027 una fecha de pago 30/01/2027, ENTONCES recibe `403`, "Esta cuota ya no está pendiente." o "La fecha de pago no puede ser posterior a hoy.", respectivamente. (RN-061, RN-135, RN-054)
- DADO QUE la Junta Oficina se creó el 14/11/2026, CUANDO Lucía informa el pago de su cuota de la ronda 3 con fecha de pago 10/11/2026, ENTONCES se rechaza con "La fecha de pago no puede ser anterior a la creación de la junta."; con fecha 14/11/2026 se acepta. (RN-132)
- DADO QUE Jorge participa en la Junta Oficina, CUANDO intenta informar el pago de su propia cuota, ENTONCES "Informar mi pago" no está disponible para él y la API responde "Registre su propio pago con la opción 'Registrar pago'.". (RN-136)
- DADO QUE la cuota de Lucía venció el 30/11/2026 y ella la informó el 01/12/2026, CUANDO llega el 02/12/2026, ENTONCES no sale ningún recordatorio; y si Jorge la rechaza el 03/12/2026, el recordatorio del 04/12/2026 sí sale y cuenta para el máximo de 5. (RN-140)
- [NUEVO] **Positivo.** DADO QUE Jorge rechazó el 03/02/2027 el pago que Lucía informó para su ronda 3, CUANDO Lucía lo vuelve a informar con fecha de pago 29/01/2027, ENTONCES la cuota vuelve a `awaiting_confirmation` con `reported_paid_on = 2027-01-29` y Jorge recibe otro aviso. (RN-063, RN-060, RN-137, RN-139)
- [NUEVO] **Negativo.** DADO QUE la cuota de Lucía de la ronda 3 está "Por confirmar", CUANDO Jorge intenta registrarla con "Registrar pago", ENTONCES ve "Esta cuota ya no está pendiente." y la cuota sigue en `awaiting_confirmation` hasta que él la confirme o la rechace. (RN-130)
- [NUEVO] **Negativo.** DADO QUE la cuota de Lucía de la ronda 3 está "Por confirmar", CUANDO Lucía, que no es la organizadora, intenta confirmar su propio pago informado, ENTONCES recibe `403` y la cuota sigue en `awaiting_confirmation`. (RN-077)
- [NUEVO] **Negativo.** DADO QUE el 28/01/2027 a las 20:10 Lucía informó sin conexión el pago de su ronda 3 y a las 20:15 Jorge registró ese mismo pago desde su celular con conexión, CUANDO el dispositivo de Lucía reconecta a las 20:30, ENTONCES el servidor rechaza el pago informado porque la cuota ya no está "Pendiente", y la app de Lucía muestra qué cambio se rechazó y por qué. (RN-135, RN-171, RN-172)
- [NUEVO] **Borde.** DADO QUE la cuota de Lucía de la ronda 3 vence el 30/01/2027, CUANDO el 30/01/2027 la informa con fecha de pago 30/01/2027 y Jorge la confirma, ENTONCES el informe se acepta y el pago queda "a tiempo". (RN-054, RN-055, RN-138)
- [NUEVO] **Borde.** DADO QUE la cuota de Lucía de la ronda 3 vence el 30/01/2027, CUANDO el 01/02/2027 la informa con fecha de pago 31/01/2027 y Jorge la confirma, ENTONCES se guarda `paid_on = 2027-01-31` y el pago queda "atrasado". (RN-056, RN-138)

**Reglas de negocio relacionadas:** RN-054, RN-055, RN-056, RN-060, RN-061, RN-062, RN-063, RN-064, RN-065, RN-077, RN-130, RN-132, RN-135, RN-136, RN-137, RN-138, RN-139, RN-140, RN-171, RN-172

**Notas:**
- RN-061 tiene fuente "Business Analyst" y espera la validación del Product Owner.
- La fecha de pago informada tampoco puede ser anterior a la creación de la junta. Así lo dice 04-glosario.md ("Fecha de pago"), pero el texto de RN-132 no menciona el pago informado. Su aclaración está pendiente del Product Owner (ver "Temas abiertos detectados").
- Informar, confirmar y rechazar un pago se permiten sin conexión (RN-170). Con esta HU, el choque de R-12 también puede ocurrir entre el organizador y un participante.
- Una cuota "Por confirmar" no tiene plazo. Si conviene uno está fuera de esta versión (PREG-017, decisión del 14/11/2026).
- El `{motivo}` del mensaje de RN-172 para un pago informado rechazado al sincronizar no está definido, y ninguna RN dice si se avisa al participante cuando el organizador rechaza su pago. Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple N, V, E, S y T. **I ⚠️:** extiende los estados de la cuota de HU-008 con "Por confirmar".
- **Valores concretos:** el criterio de rechazo (RN-063) no tiene fecha de rechazo, pero su resultado es verificable. Los demás tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-004 (sin archivos ni datos de billeteras) y PRINCIPIO-006 (confirmar es una acción de gestión validada en el servidor).
- **Cobertura:** positivo (informar, confirmar, volver a informar después de un rechazo), negativo (cuota de otro, cuota no pendiente, fecha futura o anterior a la junta, organizador que informa o registra sobre "Por confirmar", participante que confirma, choque sin conexión) y borde (fecha igual al vencimiento, un día después, sin respuesta del organizador).

---

## Épica 5 · Seguimiento y recordatorios

Funcionalidades: F-05 (Must), F-06 (Must) y F-07 (Should).

### HU-010: Ver el estado compartido de la junta

**Prioridad:** Must

**Como** participante, **quiero** ver en cualquier momento mi turno, el estado de mis cuotas y quién falta pagar, también sin conexión, **para** no tener que preguntarle al organizador "¿cuándo me toca?" ni "¿ya registró mi pago?".

**Criterios de aceptación:**
- DADO QUE el 20/01/2027 la ronda actual de la Junta Oficina es la 3, CUANDO Lucía abre la junta, ENTONCES ve "Su turno: 7" y sus rondas 1 "Pagada", 2 "Pagada" y 3 "Pendiente". (RN-025, RN-026)
- DADO QUE el 25/11/2026 la ronda actual es la 1, CUANDO Lucía pide `GET /juntas/{id}/members`, ENTONCES recibe para Jorge solo `{"name":"Jorge","turn_number":4,"current_round_status":"paid","next_due_date":"2026-12-30","next_status":"pending"}`, sin `phone`, `email`, `dni` ni `paid_on`, y la pantalla muestra la fecha como "30/12/2026". (RN-022, RN-023, RN-092)
- DADO QUE Jorge no participa en la Junta Ventas, CUANDO Marta pide los miembros, ENTONCES recibe para Jorge solo `{"name":"Jorge","role":"organizer"}`. (RN-118)
- DADO QUE la ronda actual de la Junta Oficina es la 10, CUANDO Lucía pide los miembros, ENTONCES recibe para Pedro `"next_due_date":null,"next_status":null`. (RN-119)
- DADO QUE Jorge es el organizador de la Junta Oficina, CUANDO abre "Pagos", ENTONCES ve cada cuota de cada ronda con el nombre del participante, la ronda, el estado, la fecha de pago (por ejemplo "28/11/2026"), "a tiempo" o "atrasado" y sus correcciones, y ningún campo `dni`. (RN-120, RN-023)
- DADO QUE Rosa no es miembro de la Junta Familia, CUANDO pide `GET /juntas/{id}/members`, ENTONCES recibe `403`. (RN-024)
- DADO QUE la última sincronización de Lucía fue el 20/01/2027 a las 18:45, CUANDO abre la app en modo "Offline", ENTONCES ve "Sin conexión. Última sincronización: 20/01/2027 18:45", "Su turno: 7" y su ronda 3 "Pendiente"; y Jorge, sin conexión, ve la Junta Oficina y la Junta Ventas aunque ayer solo abrió la Junta Oficina. (RN-094, RN-095, RN-175, RN-093, RN-177)
- DADO QUE cualquier pantalla de la junta muestra un texto al usuario, CUANDO se revisa, ENTONCES lo trata de "usted" (por ejemplo "Su turno: 7"), nunca de "tú". (RN-090)
- [NUEVO] **Negativo.** DADO QUE Jorge es el organizador de la Junta Oficina y Lucía registró el celular `987654321`, CUANDO Jorge pide `GET /juntas/{id}/members` o abre "Pagos", ENTONCES ninguna respuesta trae `phone`, `email` ni `dni` de Lucía ni de ningún otro participante. (RN-023, PRINCIPIO-006)
- [NUEVO] **Borde.** DADO QUE la ronda 1 de la Junta Oficina vence el 30/11/2026 y la ronda 2 el 30/12/2026, CUANDO Lucía pide los miembros el 30/11/2026 y otra vez el 01/12/2026, ENTONCES el 30/11/2026 recibe para Jorge `"next_due_date":"2026-12-30"`, porque la ronda actual todavía es la 1, y el 01/12/2026 recibe `"next_due_date":"2027-01-30"`, porque la ronda actual pasó a ser la 2. (RN-022)
- [NUEVO] **Borde.** DADO QUE la Junta Familia está "Abierta" con 11 de 12 cupos ocupados, CUANDO un familiar abre la junta, ENTONCES no ve ninguna cuota ni ronda actual, porque las cuotas no existen antes de fijar el orden de turnos. (RN-105)
- [NUEVO] **Borde.** DADO QUE la última sincronización de Lucía se guardó como `2026-12-01T03:30:00Z`, CUANDO abre la app en modo "Offline", ENTONCES ve "Sin conexión. Última sincronización: 30/11/2026 22:30", con la fecha y la hora de America/Lima y no las de UTC. (RN-093, RN-095, RN-177)

**Reglas de negocio relacionadas:** RN-022, RN-023, RN-024, RN-025, RN-026, RN-090, RN-092, RN-093, RN-094, RN-095, RN-105, RN-118, RN-119, RN-120, RN-175, RN-177

**Notas:**
- "Quién falta pagar" es el estado de la cuota de la ronda actual de cada miembro (RN-022). La ronda actual y la próxima cuota se definen en 04-glosario.md (PREG-039).
- El DNI de los demás no se muestra mientras PREG-003 siga abierta (RN-023).
- Cómo se protegen los datos que la app guarda en el dispositivo está [REQUIERE DECISIÓN] (PREG-008).
- Cada pantalla cumple PRINCIPIO-010 (360 px a 1440 px sin scroll horizontal, WCAG 2.2 nivel A, LCP ≤ 2.5 s). Valida S-11 y mitiga R-09.
- Qué textos ve un miembro antes de fijar el orden de turnos (turno y cuotas todavía inexistentes) no está en el catálogo §2.9. Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple N, V, E, S y T. **I ⚠️:** necesita cuotas generadas (HU-006). Se prueba con los datos de ejemplo de 03-reglas-de-negocio.md.
- **Valores concretos:** el criterio de "usted" (RN-090) da un ejemplo en lugar de una lista de textos; se verifica junto con cada pantalla. Los demás tienen valores concretos.
- **Constitución:** **incompleto frente a PRINCIPIO-006.** El criterio del organizador solo excluía el campo `dni`, pero PRINCIPIO-006 dice que el organizador nunca recibe datos personales (celular, correo, DNI). El criterio [NUEVO] **Negativo** lo cubre. No hay una RN que diga esto para el organizador; ver "Temas abiertos detectados".
- **Cobertura:** positivo (turno, cuotas, miembros, pagos del organizador, consulta sin conexión), negativo (no miembro, datos personales del organizador) y borde (cambio de ronda actual en el día del vencimiento, ronda 10 sin próxima cuota, junta sin cuotas, hora que cambia de día entre UTC y Lima).

---

### HU-011: Recibir recordatorios de cuota por correo

**Prioridad:** Must

**Como** participante, **quiero** recibir en mi correo un recordatorio antes del vencimiento de mi cuota, otro el día del vencimiento y otros después mientras no pague, **para** no depender de los mensajes de WhatsApp del organizador.

**Criterios de aceptación:**
- DADO QUE la Junta Oficina tiene 3 días de aviso previo y la cuota de Pedro de la ronda 1 vence el 30/11/2026 y está "Pendiente", CUANDO llega el 27/11/2026, ENTONCES entre las 09:00:00 y las 09:15:00 en America/Lima sale un correo al correo de la cuenta de Pedro con "Junta Oficina: su cuota de la ronda 1, de S/ 1,000.00, vence el 30/11/2026". (RN-068, RN-066, RN-067, RN-144, RN-090, RN-091, RN-092)
- DADO QUE la cuota de Pedro sigue "Pendiente", CUANDO llegan el 30/11/2026 y los días siguientes, ENTONCES recibe un recordatorio el 30/11/2026 y otros el 02/12, el 04/12, el 06/12, el 08/12 y el 10/12/2026, y el 12/12/2026 no sale ninguno. (RN-069, RN-070, RN-071)
- DADO QUE Jorge registró el pago de Pedro el 03/12/2026, CUANDO llega el 04/12/2026, ENTONCES no sale el recordatorio de esa cuota. (RN-072)
- DADO QUE Carmen sortea la Junta Familia el 14/12/2026 a las 19:30 con la ronda 1 el 15/12/2026 y 3 días de aviso, CUANDO se generan las cuotas, ENTONCES no sale el aviso previo que tocaba el 12/12/2026, y el recordatorio del día del vencimiento sale el 15/12/2026 entre las 09:00 y las 09:15. (RN-141)
- DADO QUE el correo del 02/12/2026 para Pedro rebota porque su buzón está lleno, CUANDO el servicio de correo lo aceptó, ENTONCES el contador de recordatorios posteriores al vencimiento sube a 1 y el sistema no reintenta ese recordatorio. (RN-143)
- DADO QUE Lucía y Jorge ya pagaron la ronda 1, CUANDO sale el recordatorio de Pedro, ENTONCES el mensaje solo habla de la cuota de Pedro y no menciona a ningún otro miembro. (RN-145)
- DADO QUE la Junta Familia tiene 11 de 12 cupos y no fijó su orden de turnos el 30/11/2026, CUANDO llega el 27/11/2026 o el 30/11/2026, ENTONCES no existe ninguna cuota de esa junta y no sale ningún recordatorio. (RN-105)
- [NUEVO] **Negativo.** DADO QUE el 28/11/2026 Jorge registró el pago adelantado de la cuota de Lucía de la ronda 2, que vence el 30/12/2026, CUANDO llegan el 27/12/2026 y el 30/12/2026, ENTONCES no sale ningún recordatorio de esa cuota. (RN-068, RN-072, RN-133)
- [NUEVO] **Negativo.** DADO QUE toca el aviso previo de Pedro del 27/11/2026, CUANDO se revisa el instante de envío guardado, ENTONCES está entre `2026-11-27T09:00:00-05:00` y `2026-11-27T09:15:00-05:00`, y no es `2026-11-27T09:00:00Z` (04:00 en Lima) ni las 09:40 en Lima. (RN-066)
- [NUEVO] **Borde.** DADO QUE Carmen sortea la Junta Familia el 30/11/2026 a las 19:30 con la ronda 1 el 30/11/2026 y 3 días de aviso, CUANDO se generan las cuotas y la cuota de un familiar sigue "Pendiente", ENTONCES no sale el aviso previo del 27/11/2026 ni el recordatorio del 30/11/2026, y su primer recordatorio sale el 02/12/2026 entre las 09:00 y las 09:15. (RN-141, RN-122, RN-070)
- [NUEVO] **Borde.** DADO QUE una junta tiene 7 días de aviso previo y una cuota "Pendiente" que vence el 30/11/2026, CUANDO llega el 23/11/2026, ENTONCES sale el aviso previo; con 1 día de aviso, sale el 29/11/2026. (RN-068, RN-010)

**Reglas de negocio relacionadas:** RN-010, RN-066, RN-067, RN-068, RN-069, RN-070, RN-071, RN-072, RN-090, RN-091, RN-092, RN-105, RN-122, RN-133, RN-141, RN-143, RN-144, RN-145

**Notas:**
- Reemplaza los 30 a 40 mensajes de WhatsApp al mes del organizador (brief §1) y es la HU de la que más depende KPI-05. Valida S-03, S-09 y S-10, y está expuesta a R-01 y R-11.
- Depende del servicio de correo transaccional ([REQUIERE DECISIÓN], PRINCIPIO-012 h) y de tareas programadas en hora de America/Lima (02-alcance.md §6).
- Las cuotas "Por confirmar" no reciben recordatorios (RN-140), lo que se verifica en HU-009 porque ese estado solo existe con F-08.
- El organizador que no participa no recibe recordatorios porque no tiene cuotas (RN-044). Se verifica en HU-006.
- Si el usuario puede retirar el consentimiento y qué pasa con sus recordatorios está [REQUIERE DECISIÓN] (PREG-009).
- Ninguna RN dice qué hace el sistema si el servicio de correo no acepta el mensaje (por ejemplo, porque no responde) entre las 09:00 y las 09:15. Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple I (con cuotas como datos de prueba), N, V, S y T. **E ⚠️:** la estimación depende de elegir el proveedor de correo y el mecanismo de tareas programadas ([REQUIERE DECISIÓN]).
- **Valores concretos:** los 7 criterios originales tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-002 ("usted"), PRINCIPIO-003 (formato del monto y la fecha), PRINCIPIO-006 (sin datos de otros miembros) y PRINCIPIO-007 (solo correo).
- **Cobertura:** positivo (aviso previo, día del vencimiento, recordatorios posteriores), negativo (cuota pagada o adelantada, junta sin orden, envío fuera de la ventana o en UTC) y borde (quinto y sexto recordatorio posterior, sorteo el mismo día del vencimiento, aviso previo de 1 y de 7 días, rebote aceptado por el proveedor).

---

### HU-012: Recibir los recordatorios también como notificación push

**Prioridad:** Should

**Como** participante que usa más el celular que el correo, **quiero** recibir cada recordatorio también como notificación push en mi navegador, **para** enterarme del vencimiento aunque no abra mi correo.

**Criterios de aceptación:**
- DADO QUE Lucía activó las notificaciones push en Chrome para Android y su cuota de la ronda 1 vence el 30/11/2026 con 3 días de aviso, CUANDO llega el 27/11/2026, ENTONCES entre las 09:00 y las 09:15 recibe el correo y la notificación push con "Junta Oficina: su cuota de la ronda 1, de S/ 1,000.00, vence el 30/11/2026". (RN-073, RN-066, RN-144, RN-090, RN-091, RN-092)
- DADO QUE el 02/12/2026 Lucía recibe el correo y el push del mismo recordatorio, CUANDO se actualiza el contador de recordatorios posteriores al vencimiento, ENTONCES sube de 0 a 1. (RN-142)
- DADO QUE Pedro no activó las notificaciones push, CUANDO sale su recordatorio del 27/11/2026, ENTONCES solo lo recibe por correo. (RN-073, RN-067)
- DADO QUE Lucía activó el push y Pedro todavía no paga la ronda 1, CUANDO sale su notificación push del 27/11/2026, ENTONCES solo habla de la cuota de Lucía de la ronda 1 y no menciona a Pedro, a Jorge ni a ningún otro miembro de la Junta Oficina. (RN-145)
- [NUEVO] **Negativo.** DADO QUE Lucía activó el push y Jorge registró el pago de su cuota de la ronda 1 el 03/12/2026, CUANDO llega el 04/12/2026, ENTONCES no recibe ni el correo ni la notificación push de esa cuota. (RN-072, RN-073)
- [NUEVO] **Negativo.** DADO QUE Pedro no activó el push y registró el celular `987654321` en su cuenta, CUANDO sale su recordatorio del 27/11/2026, ENTONCES no recibe ningún SMS ni mensaje de WhatsApp, solo el correo. (RN-067, PRINCIPIO-007)
- [NUEVO] **Borde.** DADO QUE Lucía activó el push y su cuota de la ronda 1, que venció el 30/11/2026, sigue "Pendiente", CUANDO llegan el 02/12, el 04/12, el 06/12, el 08/12, el 10/12 y el 12/12/2026, ENTONCES recibe correo y push en cada uno de los 5 primeros días, el contador llega a 5 y el 12/12/2026 no recibe ni correo ni push. (RN-142, RN-071, RN-070)

**Reglas de negocio relacionadas:** RN-066, RN-067, RN-070, RN-071, RN-072, RN-073, RN-090, RN-091, RN-092, RN-142, RN-144, RN-145

**Notas:**
- En iPhone el push solo llega desde iOS 16.4 y con la app agregada a la pantalla de inicio; si no, solo llega el correo (R-10). Mitiga R-01.
- Depende de los servicios de Web Push de los navegadores (02-alcance.md §6).
- 04-glosario.md también envía por push el aviso al organizador de HU-009 cuando lo activó. Ninguna RN define cómo el usuario activa o desactiva el push en la app; ese flujo se define en el diseño, sin agregar valores nuevos.
- RN-143 solo dice cuándo cuenta como enviado el correo. Si el push se entrega pero el servicio de correo no acepta el mensaje, no está definido si cuenta para el máximo de 5. Ver "Temas abiertos detectados".

**Revisión QA:**
- **INVEST:** cumple I (reutiliza HU-011), N, V, S y T. **E ⚠️:** la estimación depende de los navegadores mínimos ([REQUIERE DECISIÓN], 02-alcance.md §6).
- **Valores concretos:** los 4 criterios originales tienen valores concretos.
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-007 (solo correo y push, nunca SMS ni WhatsApp) y PRINCIPIO-006.
- **Cobertura:** positivo (correo y push del mismo recordatorio), negativo (sin push activado, cuota pagada, ningún SMS ni WhatsApp) y borde (correo más push cuentan como uno, máximo de 5 con los dos canales).

---

## Verificación INVEST

✅ cumple · ⚠️ cumple con una observación · ❌ no cumple, con corrección sugerida

| HU | I | N | V | E | S | T | Observación (revisión QA v0.3.1) |
|---|---|---|---|---|---|---|---|
| HU-001 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | Es la base de las demás HU. Con 14 criterios, si no cabe, se separa "verificar el correo" (RN-152 a RN-154). |
| HU-002 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | Se prueba con una cuenta creada como dato de prueba. Con 15 criterios, si no cabe, se separa "recuperar la contraseña" (RN-155 a RN-158). |
| HU-003 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Opcional para el usuario. Se puede publicar en cualquier momento después de HU-002. |
| HU-004 | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | 20 criterios y 32 RN. Corrección sugerida: dividir en "Crear una junta" (HU-004) y "Ajustar la junta antes de fijar el orden" (HU-014, RN-106 a RN-110, RN-112, RN-113, RN-020). Requiere aprobación del Product Owner. |
| HU-005 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una junta creada (HU-004). Se prueba de forma aislada con la Junta Familia y la Junta Oficina como datos de prueba. |
| HU-006 | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | Necesita una junta con los cupos llenos. Incluye la generación de rondas y cuotas porque ocurre en el mismo evento (RN-013, RN-042); el vector de prueba del anexo A reduce la incertidumbre de la estimación. |
| HU-007 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Comparte con HU-006 la generación de rondas y cuotas. Tiene un tema abierto sobre quién ve la asignación. El criterio de RN-128 se corrigió para que sea comprobable. |
| HU-008 | ⚠️ | ✅ | ✅ | ✅ | ❌ | ✅ | Necesita cuotas generadas (HU-006). Corrección sugerida: dividir en "registro en línea" y "registro sin conexión" (RN-087, RN-170 a RN-176). El criterio sin conexión se corrigió porque usaba una acción que no existe después del sorteo. |
| HU-009 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Extiende los estados de la cuota de HU-008 con "Por confirmar". |
| HU-010 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita cuotas generadas (HU-006). Se prueba con los datos de ejemplo de 03-reglas-de-negocio.md. Se completó la exclusión de datos personales para el organizador (PRINCIPIO-006). |
| HU-011 | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | La estimación depende de elegir el proveedor de correo y el mecanismo de tareas programadas ([REQUIERE DECISIÓN]). |
| HU-012 | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | Reutiliza la programación de HU-011. La estimación depende de los navegadores mínimos ([REQUIERE DECISIÓN], 02-alcance.md §6). |

**Negociable:** ninguna HU fija pantallas, endpoints ni tecnología más allá de lo que ya exigen las RN y la constitución. **Testable:** después de las dos correcciones, cada criterio tiene valores concretos (montos, fechas, horas, cupos, códigos y mensajes exactos) y se puede escribir como escenario Gherkin que cite sus RN (PRINCIPIO-011). Las 12 HU terminan con al menos un criterio positivo, uno negativo y uno de borde.

---

## Cobertura

### Funcionalidades de 02-alcance.md

| Funcionalidad | Prioridad | HU |
|---|---|---|
| F-01 Cuenta con consentimiento | M | HU-001, HU-002 |
| F-02 Crear junta e invitar por código | M | HU-004, HU-005 |
| F-03 Sorteo auditable | M | HU-006 |
| F-04 Registro de pagos | M | HU-008 |
| F-05 Estado compartido de la junta | M | HU-010 |
| F-06 Recordatorios por correo | M | HU-011 |
| F-07 Notificaciones push | S | HU-012 |
| F-08 Pago informado por el participante | S | HU-009 |
| F-09 Reglas escritas de la junta | S | HU-013 (sugerida, ver "HUs sugeridas") |
| F-10 Orden de turnos sin sorteo | S | HU-007 |
| F-11 Segundo factor por correo | S | HU-003 |
| F-12 a F-15 | C | Sin HU |
| NO-01 a NO-14 | W | Sin HU: están fuera del alcance |

- **F-09:** el prompt del Agente PO limitó esa entrega a 12 HU. La revisión QA propone HU-013 al final de este documento, para que RN-014 tenga una HU y un escenario Gherkin (PRINCIPIO-011).
- **F-12 a F-15:** 03-reglas-de-negocio.md todavía no tiene reglas para las funcionalidades Could, así que escribir sus criterios obligaría a inventar valores (PRINCIPIO-012 a).

### Reglas de 03-reglas-de-negocio.md

Las 177 reglas, de RN-001 a RN-177, están trazadas a al menos una de las 12 HU, excepto **RN-014** (F-09), que solo tiene la HU sugerida HU-013.

La revisión QA encontró además estas reglas que tenían HU pero ningún criterio de su tipo, y que ahora lo tienen:

| RN | Qué faltaba | HU y criterio [NUEVO] |
|---|---|---|
| RN-007 | Ningún criterio probaba una frecuencia no permitida | HU-004, frecuencia "bimestral" |
| RN-016 | Solo se afirmaba "no se generó nunca antes", sin el caso de colisión | HU-004, colisión con `K7MP4XR2` |
| RN-018 | Faltaba que el código vuelva a servir al liberarse un cupo | HU-005, borde del cupo liberado |
| RN-050 | Solo se probaba febrero desde el día 30; faltaban el día 31 y el año bisiesto | HU-006, fin de mes |
| RN-122 | Solo se probaba la ronda 1 vencida; faltaba la ronda 1 que vence hoy | HU-006 y HU-007 |
| RN-146 | Ningún criterio dejaba vacío un dato obligatorio de la cuenta | HU-001 |
| RN-166 | Faltaba la activación con un código equivocado | HU-003 |
| RN-170 | Solo se probaba sin conexión en HU-008 y en el sorteo; faltaban la cuenta, el inicio de sesión, el segundo factor, la junta, unirse y la asignación | HU-001, HU-002, HU-003, HU-004, HU-005, HU-007 |
| RN-077 | Faltaban el sorteo, desmarcar y confirmar un pago informado hechos por quien no es el organizador | HU-006, HU-007, HU-008, HU-009 |

---

## Temas abiertos detectados

| Tema | HU | Propuesta |
|---|---|---|
| Si los miembros ven el registro de la asignación manual del orden (quién y cuándo), como ven el del sorteo (RN-121) | HU-007 | Agregar una PREG nueva a 05-preguntas-abiertas.md |
| Si RN-132 (fecha de pago anterior a la creación de la junta) aplica también al pago informado. Hoy solo lo dice 04-glosario.md, mientras que RN-054 lo dice en su propio texto | HU-009 | Que el Product Owner apruebe aclarar la redacción de RN-132, como se hizo con RN-054 (PRINCIPIO-012) |
| Reglas con fuente "Business Analyst" pendientes de validar: RN-016, RN-021, RN-036, RN-037, RN-045, RN-061 y RN-076 | HU-002, HU-004, HU-005, HU-006, HU-007, HU-009 | Validación del Product Owner antes de implementarlas (PRINCIPIO-012 a) |
| Texto de la política, consentimientos separados y recordatorios mientras no se acepta una versión nueva | HU-001, HU-002 | Sigue en PREG-001 |
| Retiro del consentimiento y sus efectos en los recordatorios | HU-011 | Sigue en PREG-009 |
| Protección de los datos guardados en el dispositivo | HU-010 | Sigue en PREG-008 |
| **[QA]** Faltan textos en el catálogo §2.9 para: dato obligatorio vacío al crear la cuenta (RN-146), contraseña incorrecta (RN-075), código de verificación equivocado que todavía no vence (RN-166), frecuencia no permitida (RN-007), quitar a un participante después de fijar el orden (RN-114) y reglas de la junta demasiado largas (F-09) | HU-001, HU-002, HU-003, HU-004, HU-013 | Que el Product Owner apruebe los textos y se agreguen a §2.9 (PRINCIPIO-012 a) |
| **[QA]** RN-164 no dice si un pedido de código rechazado cuenta para el límite de 5 en 900 s. Además, el mensaje "Intente de nuevo en 15 minutos" no coincide con una ventana móvil: con pedidos de las 10:00 a las 10:04, se vuelve a poder pedir a las 10:15:01, no a las 10:20 | HU-003 | Agregar una PREG nueva |
| **[QA]** RN-117 no dice si un código anulado (por ejemplo `K7MP4XR2`) cuenta como código inválido para el límite de 10 en 3600 s | HU-005 | Agregar una PREG nueva |
| **[QA]** Ninguna RN dice si el código de invitación se acepta en minúsculas (`t9qw3hz5`) o con espacios alrededor | HU-005 | Agregar una PREG nueva |
| **[QA]** Ninguna RN dice si el inicio de sesión distingue mayúsculas en el correo. RN-150 trata `Lucia@Example.com` como el mismo correo solo al crear la cuenta | HU-002 | Agregar una PREG nueva |
| **[QA]** El mensaje "{n} cambios sin enviar." de RN-174 queda como "1 cambios sin enviar." cuando hay un solo cambio | HU-008, HU-009 | Que el Product Owner apruebe una forma en singular en §2.9 |
| **[QA]** El `{motivo}` del mensaje de RN-172 solo está escrito para un pago duplicado. Falta para un pago informado que el servidor rechaza al sincronizar porque la cuota ya no está "Pendiente" | HU-009 | Agregar el texto a §2.9 con aprobación del Product Owner |
| **[QA]** Ninguna RN dice si se avisa al participante cuando el organizador rechaza su pago informado | HU-009 | Agregar una PREG nueva |
| **[QA]** Ninguna RN dice qué hace el sistema si el servicio de correo no acepta un recordatorio (por ejemplo, porque no responde) entre las 09:00 y las 09:15: si reintenta, hasta cuándo, y si cuenta para el máximo de 5. Tampoco qué pasa si el push se entrega y el correo no | HU-011, HU-012 | Agregar una PREG nueva |
| **[QA]** Qué textos ve un miembro antes de fijar el orden de turnos, cuando todavía no tiene turno ni cuotas, y qué campos trae `GET /juntas/{id}/members` en ese estado | HU-008, HU-010 | Definirlo en el diseño si no requiere valores nuevos; si los requiere, agregar una PREG nueva |
| **[QA]** PRINCIPIO-006 dice que el organizador nunca recibe el celular ni el correo de los participantes, pero ninguna RN lo dice (RN-023 solo trata el DNI y RN-022 solo al miembro que no es el organizador). Sin una RN, PRINCIPIO-011 no exige su escenario Gherkin | HU-010 | Que el Product Owner apruebe una RN nueva (RN-178 o el siguiente número libre) |
| **[QA]** El límite de 2,000 caracteres de las reglas de la junta está en la decisión de PREG-016, en 02-alcance.md (F-09) y en 04-glosario.md, pero no en ninguna RN | HU-013 | Que el Product Owner apruebe una RN nueva con el siguiente número libre, junto con su mensaje de §2.9 |

Las PREG nuevas toman el siguiente ID libre de 05-preguntas-abiertas.md, hoy PREG-049. Esta revisión no modifica ese archivo (PRINCIPIO-012 b).

---

## HUs sugeridas

La revisión QA encontró una sola RN sin HU: **RN-014** (F-09). Se propone esta HU. Todos sus criterios son nuevos. No entra al resumen priorizado hasta que el Product Owner la apruebe.

### HU-013: Escribir las reglas de la junta para que todos las lean

**Prioridad:** Should

**Como** organizador, **quiero** escribir las reglas de mi junta (atrasos, multas o retiros) como un texto que todos los miembros puedan leer, y cambiarlo mientras no se fije el orden de turnos, **para** que nadie diga después que no conocía las condiciones.

**Criterios de aceptación:**
- [NUEVO] **Positivo.** DADO QUE Jorge creó la Junta Oficina con el texto "Quien no pueda pagar avisa al grupo antes de la fecha de vencimiento" en "Reglas de la junta", CUANDO Lucía abre la Junta Oficina, ENTONCES lee ese texto, y `GET /juntas/{id}` le devuelve `junta_rules` con ese mismo texto. (RN-014)
- [NUEVO] **Positivo.** DADO QUE la Junta Familia está "Abierta", CUANDO Carmen cambia el texto de sus reglas y lo guarda, ENTONCES los miembros leen el texto nuevo. (RN-106, RN-014)
- [NUEVO] **Negativo.** DADO QUE la Junta Oficina ya fijó su orden de turnos, CUANDO Jorge intenta cambiar el texto de sus reglas, ENTONCES ve "La junta ya fijó su orden de turnos. Solo puede cambiar su nombre." y el texto sigue igual. (RN-110)
- [NUEVO] **Negativo.** DADO QUE Lucía no es la organizadora de la Junta Oficina, CUANDO envía una petición para cambiar `junta_rules`, ENTONCES recibe `403` y el texto sigue igual. (RN-077)
- [NUEVO] **Negativo.** DADO QUE el navegador de Carmen está en modo "Offline", CUANDO intenta guardar las reglas de la Junta Familia, ENTONCES ve "Necesita conexión a internet para hacer esto.". (RN-170)
- [NUEVO] **Negativo.** DADO QUE Jorge escribió en las reglas una multa por atraso, CUANDO un pago de la Junta Oficina queda "atrasado", ENTONCES la app solo muestra el texto y no cambia ningún monto ni genera ningún cobro. (F-09, PRINCIPIO-004, PRINCIPIO-012 g)
- [NUEVO] **Borde.** DADO QUE Carmen deja vacío el campo "Reglas de la junta", CUANDO completa los demás datos de la Junta Familia y pulsa "Crear junta", ENTONCES la junta se crea, porque las reglas no están entre los datos obligatorios. (RN-002, RN-014)
- [NUEVO] **Borde.** DADO QUE Carmen escribe unas reglas de 2,000 caracteres, CUANDO las guarda, ENTONCES se aceptan; con 2,001 caracteres se rechazan. [REQUIERE DECISIÓN]: el límite no tiene RN ni mensaje en §2.9 (ver "Temas abiertos detectados"). (F-09)

**Reglas de negocio relacionadas:** RN-002, RN-014, RN-077, RN-106, RN-110, RN-170

**Notas:**
- Funcionalidad F-09 (Should), épica 2. Depende de HU-004.
- La app no aplica las reglas: no calcula multas ni cambia montos (04-glosario.md, "Reglas de la junta"). Cualquier regla que mueva dinero queda fuera del alcance (PRINCIPIO-004, PRINCIPIO-012 g).
- El criterio del límite de 2,000 caracteres no se puede implementar hasta que el Product Owner apruebe su RN y su mensaje (PRINCIPIO-012 a).

**Revisión QA:**
- **INVEST:** cumple I (solo depende de HU-004), N, V, E, S y T, salvo el criterio del límite, que queda [REQUIERE DECISIÓN].
- **Constitución:** sin contradicciones. Cumple PRINCIPIO-004 y PRINCIPIO-006 (escribir las reglas es una acción de gestión).
- **Cobertura:** positivo (escribir y leer, editar antes del orden), negativo (editar después del orden, sin permisos, sin conexión, la app no aplica multas) y borde (reglas vacías, 2,000 y 2,001 caracteres).
