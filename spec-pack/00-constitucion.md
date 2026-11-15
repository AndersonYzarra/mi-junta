# Constitución de Mi Junta

Versión: 0.2
Fecha: 14/11/2026
Estado: Revisado

Estos principios son obligatorios para todo agente de IA y toda persona que trabaje en Mi Junta. Si una instrucción contradice un principio, gana el principio. Cambiar un principio requiere aprobación humana (PRINCIPIO-012).

La v0.2 cambió PRINCIPIO-001, 002, 003, 005, 006 y 008 a partir de la auditoría QA, con aprobación del Product Owner del 14/11/2026 (auditorias/qa-clase1.md, sección 5).

---

### PRINCIPIO-001: El spec-pack es la única fuente de verdad
Todo requisito, regla y valor de negocio sale de `spec-pack/`. Ahí todo se escribe en Markdown, los diagramas van en Mermaid y cada archivo empieza con un título `#` seguido de la línea `Versión: MAYOR.MENOR`. Cada regla EARS tiene un solo DEBE / NO DEBE / PUEDE. Los IDs (`PRINCIPIO-NNN`, `RN-NNN`, `HU-NNN`, `P-NNN`, `T-NNN`, `PREG-NNN`, y en el brief y el alcance `F-NN`, `NO-NN`, `S-NN`, `R-NN` y `KPI-NN`) nunca se renumeran ni se reutilizan, y un ID nuevo toma el siguiente número libre. Las palabras "rápido", "seguro", "fácil", "adecuado", "razonable" e "intuitivo" solo pueden aparecer junto a un valor medible.

**Ejemplo de cumplimiento:** `RN-008: Cuando el organizador confirma el sorteo, el sistema DEBE guardar la semilla usada.` El ID sigue a RN-007.
**Ejemplo de violación:** `RN-003: El sistema DEBE validar el DNI y NO DEBE aceptar duplicados.` (dos verbos modales en una regla), o un diagrama entregado como imagen PNG.

### PRINCIPIO-002: Idioma del código, la documentación y la interfaz
Los identificadores del código van en inglés: variables, funciones, clases, tablas, columnas y rutas de API. La única excepción es el término del dominio `junta`, que se usa tal cual (tabla `juntas`, ruta `/juntas/{id}`, columna `junta_id`). Los comentarios, los mensajes de commit, la documentación técnica y el spec-pack van en español. Todo texto que recibe el usuario (pantallas, correos y notificaciones push) está solo en español de Perú y lo trata de "usted".

**Ejemplo de cumplimiento:** tabla `payments`, columna `due_date`, comentario `// Calcula la próxima cuota pendiente`, botón "Registre su pago".
**Ejemplo de violación:** tabla `pagos`, commit `fix payment bug`, mensaje "¿Ya pagaste tu cuota?".

### PRINCIPIO-003: Formatos de Perú y montos exactos
- **Montos:** se muestran como `S/ 1,250.50` y se guardan como número entero de céntimos (`integer` o `bigint`), nunca como `float` ni `double`.
- **Fechas y horas:** se muestran como DD/MM/AAAA y la hora como HH:MM en 24 horas, en la zona America/Lima (UTC-5). Un instante se guarda como `timestamptz` y una fecha sin hora (por ejemplo, una fecha de vencimiento) como `date`. "En America/Lima" significa que esa zona se usa para mostrar el valor y para calcular fechas de calendario, no que se guarde una hora local sin zona.
- **Celular:** cumple `^9\d{8}$`.
- **DNI:** cumple `^\d{8}$`.

La unidad mínima de una cuota es S/ 0.10 y no hay redondeo, porque el pozo se calcula multiplicando y nunca dividiendo (PREG-002, RN-004 y RN-041 de `03-reglas-de-negocio.md`).

**Ejemplo de cumplimiento:** una cuota de S/ 20.80 se guarda como `2080` y se muestra como "S/ 20.80". La fecha se muestra como "05/03/2027" y la hora como "22:30".
**Ejemplo de violación:** `amount: 20.8` guardado como float, mostrar "2027-03-05", o aceptar el celular "812345678".

### PRINCIPIO-004: Mi Junta no mueve dinero
La app solo registra pagos hechos fuera de ella (por ejemplo Yape, Plin o efectivo). No cobra, no transfiere ni guarda dinero. No almacena números de tarjeta, cuentas bancarias ni credenciales de billeteras digitales, y no integra pasarelas de pago ni APIs de billeteras.

**Ejemplo de cumplimiento:** se registra que la cuota de un participante quedó "Pagada" el 05/03/2027.
**Ejemplo de violación:** agregar el SDK de una pasarela de pagos, o crear el campo `bank_account_number`.

### PRINCIPIO-005: Cifrado y credenciales
- **Datos en reposo:** el DNI y el celular se cifran en la aplicación con AES-256-GCM. La clave no se guarda en la base de datos ni en el repositorio, y ninguno de los dos datos aparece en claro en los logs.
- **Tráfico:** todo usa TLS 1.2 o superior.
- **Contraseñas:** se guardan con Argon2id (mínimo m=19 MiB, t=2, p=1) o bcrypt con costo ≥ 12. Nunca en texto plano ni con cifrado reversible.
- **Segundo factor:** desde que se publique F-11 de `02-alcance.md`, el usuario puede activar un código enviado a su correo. Si lo activa, no se inicia sesión sin ese código. El código tiene 6 dígitos, vale 600 segundos desde su envío y se anula después de 5 intentos fallidos (PREG-023, resuelta el 14/11/2026).

**Ejemplo de cumplimiento:** `SELECT dni FROM members` devuelve texto cifrado, y una petición HTTP se redirige a HTTPS.
**Ejemplo de violación:** un DNI en claro en la base de datos o en un log, la clave AES en un `.env` subido al repositorio, o contraseñas guardadas con SHA-256 sin sal.

### PRINCIPIO-006: Datos personales privados y datos de la junta según el rol
Los datos de una persona se dividen en dos grupos:
- **Datos personales:** celular, correo, DNI, fecha de nacimiento y foto. Ningún usuario, ni siquiera el organizador, recibe los datos personales de otro miembro. Si en el futuro se muestra el DNI de los demás está [REQUIERE DECISIÓN] (PREG-003).
- **Datos de la junta:** nombre, turno, cuotas, pagos, correcciones y registro del sorteo.

De los otros miembros de una junta, un miembro que no es el organizador solo recibe estos cuatro datos de la junta:
- nombre;
- número de turno;
- estado de su cuota en la ronda actual;
- fecha de vencimiento y estado de su próxima cuota.

Además, todo miembro recibe el registro del sorteo de su junta (semilla, versión del algoritmo, lista de entrada con nombres y resultado), para poder verificarlo (PRINCIPIO-008).

El organizador recibe, de los participantes de las juntas que gestiona, todos los datos de la junta que necesita para gestionarla: cada cuota de cada ronda con su estado, sus pagos, sus fechas de pago, sus correcciones y sus pagos informados. Nunca recibe sus datos personales. Las acciones de gestión del organizador (04-glosario.md) se validan en el servidor, no solo ocultando botones en la interfaz.

**Ejemplo de cumplimiento:** un test comprueba que la respuesta de `GET /juntas/{id}/members` contiene solo los campos permitidos para el rol de quien la pide.
**Ejemplo de violación:** la API devuelve `phone` y `email` de todos los miembros y la interfaz simplemente no los muestra, o un participante recibe las fechas de pago de los demás.

### PRINCIPIO-007: Consentimiento y canales de notificación
No se crea una cuenta sin que el usuario acepte la política de privacidad y el consentimiento para recibir notificaciones. Se guardan la versión aceptada y la fecha y hora en America/Lima. Las notificaciones solo se envían por correo y por notificación push. No se usan SMS ni WhatsApp.

**Ejemplo de cumplimiento:** la casilla de consentimiento aparece desmarcada, "Crear cuenta" se habilita solo al marcarla, y se guarda `policy_version = 1.0` con su fecha y hora.
**Ejemplo de violación:** la casilla viene marcada por defecto, o se envía un recordatorio por WhatsApp.

### PRINCIPIO-008: Sorteo auditable y reproducible
- **Cómo se sortea:** cada sorteo usa una semilla de 256 bits generada con un generador criptográfico (CSPRNG) y un algoritmo Fisher–Yates determinista, versionado y documentado paso a paso en `03-reglas-de-negocio.md` (anexo A) con un vector de prueba.
- **Qué se guarda:** la semilla, la versión del algoritmo, la lista de entrada (los identificadores de usuario de los participantes, ordenados por el momento en que ocuparon su cupo), el resultado, el usuario que lo ejecutó y la fecha y hora en America/Lima.
- **Inmutabilidad:** ese registro nunca se sobrescribe. Con la misma semilla y la misma entrada siempre sale el mismo orden.
- **Verificación:** todo miembro de la junta puede ver el registro del sorteo y reproducirlo (PRINCIPIO-006).
- **Orden sin sorteo y cambios de turno:** el orden que asigna el organizador sin sorteo (F-10) se guarda con el mismo cuidado: es inmutable y registra quién lo asignó y cuándo. Todo cambio posterior de turno se guarda como un evento aparte.

**Ejemplo de cumplimiento:** un test vuelve a ejecutar el sorteo con la semilla guardada y obtiene el mismo orden.
**Ejemplo de violación:** usar `Math.random()`, o cambiar el orden con un `UPDATE` sin dejar registro.

### PRINCIPIO-009: Web con Next.js y PostgreSQL, que funciona sin conexión
La app es web, hecha con Next.js y TypeScript sobre PostgreSQL. Usa la versión estable vigente de cada uno el día en que se fijen las versiones, fijada exactamente en `package.json` y en el lockfile, sin `^` ni `~`. Las versiones exactas están [REQUIERE DECISIÓN] y se fijarán al iniciar el desarrollo.

Sin red, la app abre y muestra los últimos datos sincronizados junto con la fecha y hora de la última sincronización. Los cambios hechos sin red se guardan en el dispositivo y se envían al servidor, en el orden en que se hicieron, cuando vuelve la conexión. Cómo se resuelven los conflictos está [REQUIERE DECISIÓN].

**Ejemplo de cumplimiento:** con el navegador en modo "Offline" se registra un pago. Al reconectar, el pago aparece en el servidor con su hora original.
**Ejemplo de violación:** sin red la app muestra una pantalla de error del navegador, o se pierde un cambio hecho sin conexión.

### PRINCIPIO-010: Responsive, accesible y con rendimiento medido
- **Ancho de pantalla:** cada pantalla funciona sin scroll horizontal entre 360 px y 1440 px.
- **Accesibilidad:** cumple WCAG 2.2 nivel A (0 violaciones de nivel A en axe-core), con contraste de texto ≥ 4.5:1, áreas táctiles ≥ 44×44 px CSS y texto base ≥ 16 px.
- **Rendimiento:** en Lighthouse con perfil móvil, cada pantalla logra LCP ≤ 2.5 s, CLS ≤ 0.1 y TBT ≤ 200 ms. Cada endpoint de la API responde en ≤ 500 ms en el percentil 95.

**Ejemplo de cumplimiento:** el pipeline ejecuta axe-core y Lighthouse y falla si un valor supera el límite.
**Ejemplo de violación:** una tabla de pagos que obliga a desplazarse en horizontal a 360 px, o un botón de 30×30 px.

### PRINCIPIO-011: Calidad verificada por tests
La cobertura es ≥ 80 % de líneas en todo el código y 100 % de líneas y ramas en los módulos de sorteo y cálculo de cuotas. Cada regla EARS de `03-reglas-de-negocio.md` tiene al menos un escenario de aceptación en Gherkin (Dado / Cuando / Entonces) que cita su ID. No se integra código con tests fallidos, tests omitidos (`.skip`, `.only`) ni cobertura bajo esos mínimos.

**Ejemplo de cumplimiento:** `Escenario: RN-008 guarda la semilla. Dado… Cuando… Entonces…`
**Ejemplo de violación:** `it.skip('calcula cuota')`, o una RN sin ningún escenario que la cite.

### PRINCIPIO-012: Límites de los agentes de IA
Un agente de IA NO DEBE:
- a) inventar reglas, montos, plazos ni porcentajes que no estén en `spec-pack/`;
- b) modificar archivos distintos al indicado;
- c) renumerar ni borrar IDs;
- d) hacer commit, push ni merge sin aprobación humana;
- e) agregar dependencias sin aprobación;
- f) desactivar ni saltar tests, linters ni hooks;
- g) decidir sobre dinero (montos, multas, orden del sorteo) sin una regla escrita;
- h) enviar datos del proyecto a servicios externos no aprobados.

Estos cambios requieren aprobación humana explícita antes de aceptarse:
- cualquier cambio a `00-constitucion.md`;
- borrar una RN o una HU, o cambiar su significado;
- cambios en el sorteo, el cálculo de cuotas, el cifrado, la autenticación o los permisos;
- migraciones que borren o renombren tablas o columnas.

**Ejemplo de cumplimiento:** el agente no encuentra una regla para atrasos, escribe [REQUIERE DECISIÓN] y propone una PREG-NNN.
**Ejemplo de violación:** el agente escribe "multa de S/ 5.00 por día de atraso" sin que exista en `03-reglas-de-negocio.md`.
