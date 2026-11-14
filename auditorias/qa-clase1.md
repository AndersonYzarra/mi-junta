# Auditoría QA del Spec Pack — Clase 1

Fecha: 14/11/2026
Agente: QA Senior / Abogado del Diablo (BMAD), prompt `prompts/clase1/05-qa.xml`

**Archivos auditados:**

| Archivo | Versión |
|---|---|
| spec-pack/00-constitucion.md | 1.2 |
| spec-pack/01-project-brief.md | 0.2 |
| spec-pack/02-alcance.md | 0.1 |
| spec-pack/03-reglas-de-negocio.md | 0.1 |
| spec-pack/04-glosario.md | 0.1 |

Además se leyó `spec-pack/05-preguntas-abiertas.md` v1.4, solo para no reportar como nuevos los temas que ya tienen una PREG abierta. Esos temas aparecen aparte en la sección 3.

**Criterio:** cada hallazgo señala un defecto y propone cómo corregirlo. Cuando la corrección exige una decisión de negocio, la sugerencia enumera las opciones o pide una PREG nueva. No decide por el equipo (PRINCIPIO-012 a).

---

## 1. Resumen

| Severidad | Cantidad |
|---|---|
| CRÍTICA | 5 |
| ALTA | 11 |
| MEDIA | 19 |
| BAJA | 6 |
| **Total** | **41** |

| ID | Sev. | Tipo | Tema |
|---|---|---|---|
| QA-01 | CRÍTICA | Contradicción | PRINCIPIO-006 impide al organizador ver lo que necesita para gestionar pagos |
| QA-02 | CRÍTICA | Faltante | Ciclo de vida de la junta y momento en que se generan rondas y cuotas |
| QA-03 | CRÍTICA | Faltante | Salida, retiro o reemplazo de un participante o del organizador |
| QA-04 | CRÍTICA | Faltante | Edición de una junta después de crearla |
| QA-05 | CRÍTICA | Contradicción / Faltante | Qué funciona sin conexión y qué pasa si el servidor rechaza un cambio sincronizado |
| QA-06 | ALTA | Ambigüedad | Lista de entrada del sorteo: orden, identidad y generador derivado |
| QA-07 | ALTA | Contradicción | "Junta al día": "antes de" vs. "a tiempo" (igual o anterior) |
| QA-08 | ALTA | Contradicción | Recordatorio previo filtra "Pendiente", los posteriores "no Pagada" |
| QA-09 | ALTA | Faltante | Datos de la cuenta, unicidad, verificación de correo y recuperación de contraseña |
| QA-10 | ALTA | Faltante | Ciclo del código de verificación (uso único, reenvío, activación) |
| QA-11 | ALTA | Contradicción | Código de invitación: "se rechaza mientras" vs. "se anula al llenarse" |
| QA-12 | ALTA | Ambigüedad / Glosario | "Ronda actual" y "próximo pago" sin definir |
| QA-13 | ALTA | Ambigüedad | "Acción de gestión" sin enumerar |
| QA-14 | ALTA | Contradicción | 02-alcance y 01-project-brief desactualizados frente a 03 y 05 |
| QA-15 | ALTA | Glosario | "Cuota" con dos significados y un solo identificador |
| QA-16 | ALTA | Faltante | Orden de turnos sin sorteo (F-10) incompleto |
| QA-17 | MEDIA | Faltante | Casos borde del registro de pagos |
| QA-18 | MEDIA | Faltante | Casos borde del pago informado (F-08) |
| QA-19 | MEDIA | Faltante / Formato | Casos borde y valores vagos de los recordatorios |
| QA-20 | MEDIA | Contradicción | El aviso previo por defecto (3) es inválido para "cada 2 días" y "cada 3 días" |
| QA-21 | MEDIA | Ambigüedad | "Fecha y hora en America/Lima" vs. `timestamptz`, y formato de hora |
| QA-22 | MEDIA | Ambigüedad | RN-090 a RN-093 hablan de "la interfaz": ¿incluyen correos y push? |
| QA-23 | MEDIA | Faltante | Bloqueo por intentos fallidos: qué pasa al terminar los 900 s |
| QA-24 | MEDIA | Faltante | Código de invitación: reutilización, fuerza bruta, código inexistente y concurrencia |
| QA-25 | MEDIA | Faltante | Quién puede auditar el sorteo |
| QA-26 | MEDIA | Faltante | Nueva versión de la política de privacidad |
| QA-27 | MEDIA | Contradicción | Reglas derivadas por el Business Analyst sin validación humana |
| QA-28 | MEDIA | Contradicción | IDs y encabezado de versión fuera de lo que fija PRINCIPIO-001 |
| QA-29 | MEDIA | Contradicción | `junta` como identificador en código frente a PRINCIPIO-002 |
| QA-30 | MEDIA | Ambigüedad | "Junta activa" y "junta finalizada" en los KPI |
| QA-31 | MEDIA | Glosario | Términos e identificadores usados pero no definidos |
| QA-32 | MEDIA | Faltante / Formato | Detalle del modo sin conexión |
| QA-33 | MEDIA | Faltante | Validaciones sin mensaje de error definido |
| QA-34 | MEDIA | Contradicción | Segundo factor: la constitución lo da como capacidad, el alcance lo deja fuera del MVP |
| QA-35 | MEDIA | Faltante | Edición de las reglas escritas (F-09) |
| QA-36 | BAJA | Formato | Sujetos y patrones EARS inconsistentes |
| QA-37 | BAJA | Inconsistencia | Datos de ejemplo que se contradicen entre reglas |
| QA-38 | BAJA | Glosario | Definiciones incompletas y términos "No usar" presentes |
| QA-39 | BAJA | Formato | Faltan ejemplos en los bordes y límites superiores |
| QA-40 | BAJA | Faltante | DNI solo peruano |
| QA-41 | BAJA | Formato | Dos formatos de fecha para las decisiones |

---

## 2. Hallazgos

### 2.1 CRÍTICAS

#### QA-01 · PRINCIPIO-006 impide al organizador ver lo que necesita para gestionar pagos
- **Severidad:** CRÍTICA
- **Tipo:** Contradicción
- **Ubicación:** 00-constitucion.md PRINCIPIO-006. Choca con 02-alcance.md F-04 y F-14 y con 03-reglas-de-negocio.md RN-022, RN-051, RN-052, RN-057, RN-059, RN-062 y RN-063.
- **Problema:** PRINCIPIO-006 dice que de los otros miembros un usuario, "ni siquiera el organizador", solo recibe cuatro datos: nombre, turno, estado en la ronda actual y fecha y estado del próximo pago. Pero el organizador necesita mucho más para gestionar:
  - marcar cuotas de cualquier ronda (RN-051 usa `POST /contributions/{id}/payment`, así que necesita los IDs de las cuotas de los demás);
  - desmarcar un pago de una ronda pasada (RN-057, RN-059);
  - ver la fecha de pago, la clasificación "a tiempo"/"atrasado" y el historial de correcciones (RN-058);
  - confirmar o rechazar pagos informados de cualquier ronda (RN-062, RN-063);
  - exportar el historial (F-14).

  Si el agente cumple PRINCIPIO-006 al pie de la letra, F-04 no se puede implementar. Si no lo cumple, rompe la constitución.
- **Sugerencia:** decidir con aprobación humana (cambia un principio, PRINCIPIO-012) cuál de estas opciones aplica:
  - a) separar en PRINCIPIO-006 los **datos personales** (celular, correo, DNI, fecha de nacimiento y foto, prohibidos para todos) de los **datos de la junta** (cuotas, pagos y correcciones de todas las rondas), que el organizador sí recibe;
  - b) mantener los cuatro datos y crear endpoints de gestión con su propio contrato.

  Después hay que escribir una RN que fije el contrato de lo que recibe el organizador, igual que RN-022 lo hace para un miembro.

#### QA-02 · No están definidos el ciclo de vida de la junta ni el momento en que se generan rondas y cuotas
- **Severidad:** CRÍTICA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-013, RN-042, RN-045, RN-068 a RN-071. 04-glosario.md (falta el término). Relacionado con PREG-029.
- **Problema:**
  - RN-013 crea "una ronda por cada participante" y RN-042 genera "en cada ronda una cuota para cada participante", pero ninguna regla dice **cuándo** pasa eso: al crear la junta, cuando se llena un cupo o al ejecutar el sorteo.
  - Si las cuotas se generan al crear la junta, no hay participante al que asignarlas (los cupos están vacíos) y RN-068 enviaría recordatorios a nadie.
  - Tampoco hay estados de la junta (por ejemplo: con cupos libres, completa, sorteada, en curso, terminada), aunque varias reglas dependen de ellos: RN-018, RN-019, RN-027, RN-028, RN-029 y KPI-06.

  PREG-029 cubre solo el caso de que la ronda 1 venza antes del sorteo. Este hallazgo es más amplio: afecta al módulo de cálculo de cuotas, que exige 100 % de cobertura (PRINCIPIO-011), y un agente tendría que inventar el momento de generación.
- **Sugerencia:**
  - Agregar a 04-glosario.md el término "Estado de la junta", con sus valores y transiciones (diagrama de estados en Mermaid, según PRINCIPIO-001).
  - Escribir una RN Event-driven que fije en qué evento se generan las rondas y las cuotas.
  - Resolver PREG-029 junto con esto, porque una de sus opciones ("no generar cuotas antes del sorteo") define justamente ese evento.

#### QA-03 · Falta definir qué pasa cuando un participante o el organizador sale de la junta o es reemplazado
- **Severidad:** CRÍTICA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-018, RN-019 (contraejemplo) y RN-027. 01-project-brief.md §1 ("No hay reglas escritas sobre … retiros"). 02-alcance.md F-09.
- **Problema:** el contraejemplo de RN-019 dice "un participante que ya salió de la junta vuelve a entrar", así que da por hecho que se puede salir. Ninguna regla dice:
  - si un participante puede salir antes del sorteo, o si el organizador puede quitarlo, y si con eso se libera el cupo;
  - qué pasa si sale **después** del sorteo: su turno, sus cuotas pendientes, el pozo que ya cobró y las rondas restantes;
  - qué pasa si el organizador deja la junta, cierra su cuenta o quiere transferir el rol;
  - si un participante puede borrar su cuenta mientras está en una junta en curso (relacionado con PREG-006).

  Esto afecta turnos y dinero, y PRINCIPIO-012 g prohíbe que un agente decida sobre dinero sin una regla escrita. F-09 deja los retiros como texto que la app no aplica, pero el sistema igual necesita saber qué hacer con el cupo y las cuotas.
- **Sugerencia:** abrir una PREG nueva (siguiente número libre: PREG-031) con estas opciones:
  - no se puede salir después del sorteo;
  - se puede salir antes del sorteo y el cupo se libera;
  - el organizador puede reemplazar a un participante, y el reemplazo queda como evento aparte (PRINCIPIO-008).

  Mientras se decide, eliminar del contraejemplo de RN-019 la suposición de que un participante puede salir.

#### QA-04 · Falta definir si se puede editar una junta después de crearla
- **Severidad:** CRÍTICA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-002 a RN-013, RN-041 y RN-043. 02-alcance.md F-02.
- **Problema:** todas las reglas de juntas validan la **creación**. Ninguna dice si el organizador puede cambiar después la cuota, la cantidad de participantes, la frecuencia, la fecha de la ronda 1, los días de aviso o su decisión de participar. Tampoco dice si las reglas cambian antes o después del sorteo, o después del primer pago.

  Algunos casos sin respuesta:
  - bajar la cantidad de participantes por debajo de los cupos ya ocupados;
  - cambiar la cuota cuando ya hay pagos registrados (cambia el pozo de RN-041);
  - que el organizador pase de no participar a participar cuando la junta ya está llena.

  Cambiar la cuota es una decisión sobre dinero (PRINCIPIO-012 g).
- **Sugerencia:** abrir una PREG para que el Product Owner decida qué campos se pueden editar y hasta qué estado de la junta (depende de QA-02). Después hay que escribir una RN Unwanted por cada campo que no se pueda editar.

#### QA-05 · No está definido qué funciona sin conexión ni qué pasa si el servidor rechaza un cambio sincronizado
- **Severidad:** CRÍTICA
- **Tipo:** Contradicción y regla faltante
- **Ubicación:** 02-alcance.md §5 ("Funciona sin conexión en todas las funcionalidades Must") y nota bajo la tabla Must. 03-reglas-de-negocio.md RN-016, RN-017, RN-018, RN-029, RN-054 y RN-087. 00-constitucion.md PRINCIPIO-009.
- **Problema:**
  - 02-alcance dice que todas las Must (F-01 a F-06) funcionan sin conexión, pero RN-029 prohíbe sortear (F-03) sin conexión. Además hay acciones que por su naturaleza necesitan al servidor:
    - crear una cuenta (F-01), porque el correo tiene que ser único y el consentimiento tiene que quedar registrado;
    - generar o regenerar un código único (RN-015, RN-016);
    - unirse con un código y comprobar los cupos (RN-018);
    - iniciar sesión.
  - RN-087 solo dice que los cambios se envían en orden. No dice qué pasa si el servidor **rechaza** un cambio hecho sin red, por ejemplo una cuota que otro dispositivo ya desmarcó, una cuota que dejó de existir o un usuario que perdió permisos. Tampoco dice qué ve el usuario en ese caso.
  - PREG-005 (conflictos) sigue abierta y bloquea el diseño de arquitectura de una condición que es Must.
- **Sugerencia:**
  - Escribir una RN, o una tabla en 03, que liste qué acciones están permitidas sin conexión y cuáles exigen conexión, igual que se hizo con RN-029.
  - Corregir la frase de 02-alcance §5.
  - Agregar a PREG-005 el caso "el servidor rechaza un cambio encolado" y qué se le muestra al usuario.

---

### 2.2 ALTAS

#### QA-06 · La lista de entrada del sorteo es ambigua y pone en riesgo que se pueda reproducir
- **Severidad:** ALTA
- **Tipo:** Ambigüedad
- **Ubicación:** 00-constitucion.md PRINCIPIO-008. 03-reglas-de-negocio.md RN-032, RN-033, RN-034 y RN-036. 04-glosario.md "Semilla" y "Registro del sorteo".
- **Problema:**
  - "La lista de participantes en el orden de entrada" no dice qué orden es: el orden en que se unieron, el orden alfabético o el ID de usuario. Fisher–Yates da resultados distintos con la misma semilla si cambia el orden de entrada.
  - Los ejemplos de RN-034 y RN-036 guardan **nombres** (`["Carmen","Lucía",…]`). Los nombres no son únicos: dos "Lucía" en la misma junta hacen imposible saber a quién le tocó cada turno.
  - RN-032 dice "con un generador derivado de la semilla", pero no dice cuál: la función de derivación y la forma de pasar de bytes a índices sin sesgo de módulo. Un auditor externo, o una reimplementación futura, no podría reproducir el sorteo solo con la semilla.
  - El valor `fisher-yates-v1` de `algorithm_version` no está definido en ninguna parte.
- **Sugerencia:**
  - Definir en una RN el criterio de orden de la lista de entrada y que los elementos sean identificadores de usuario únicos, no nombres.
  - Documentar el algoritmo completo de la versión 1 (derivación del generador y obtención de índices) en el spec-pack o en el diseño de arquitectura, con un vector de prueba (semilla, entrada y resultado esperado).
  - Como toca el sorteo, requiere aprobación humana (PRINCIPIO-012).

#### QA-07 · "Junta al día": el brief dice "antes de" y el glosario dice "a tiempo"
- **Severidad:** ALTA
- **Tipo:** Contradicción
- **Ubicación:** 01-project-brief.md §5 ("quedaron pagadas **antes de** su fecha de vencimiento") frente a 04-glosario.md "Junta al día en un mes" ("pagadas **a tiempo**") y 03-reglas-de-negocio.md RN-055 (el mismo día cuenta como a tiempo).
- **Problema:** con la definición del brief, una cuota pagada el mismo día del vencimiento no cuenta para KPI-03. Con la del glosario y RN-055, sí cuenta. Dos agentes calcularían KPI-03 de forma distinta.
- **Sugerencia:** alinear el texto del brief con la decisión ya tomada en PREG-020 ("igual o anterior"), por ejemplo reemplazando "antes de su fecha de vencimiento" por "a tiempo (RN-055)".

#### QA-08 · El recordatorio previo filtra "Pendiente" y los posteriores filtran "no Pagada"
- **Severidad:** ALTA
- **Tipo:** Contradicción
- **Ubicación:** 03-reglas-de-negocio.md RN-068 ("cuota 'Pendiente'") frente a RN-069 y RN-070 ("no está en el estado 'Pagada'"). 04-glosario.md "Recordatorio" ("cuota no pagada"). PREG-030.
- **Problema:** una cuota "Por confirmar" **no** recibe el recordatorio previo (RN-068) pero **sí** recibe el del día del vencimiento y los posteriores (RN-069, RN-070). PREG-030 solo menciona RN-069 a RN-072 y no ve que RN-068 ya aplica el criterio contrario. El agente implementaría dos filtros distintos para el mismo concepto.
- **Sugerencia:** agregar RN-068 al contexto de PREG-030 y, cuando se resuelva, usar en RN-068 a RN-071 la misma condición de estado. Mientras tanto, aclarar en el glosario qué significa "no pagada".

#### QA-09 · Faltan los datos de la cuenta, la unicidad, la verificación del correo y la recuperación de la contraseña
- **Severidad:** ALTA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-074, RN-082 a RN-086 y RN-067. 00-constitucion.md PRINCIPIO-005. 02-alcance.md F-01.
- **Problema:**
  - RN-085 y RN-086 validan el formato del DNI y del celular, pero ninguna regla dice si son **obligatorios**, ni en qué momento se piden.
  - Tampoco se dice qué datos pide la cuenta. 05-preguntas-abiertas menciona nombre, DNI, celular, correo, foto y fecha de nacimiento, y RN-022 devuelve `name`, pero no se define qué nombre es (completo o un alias) ni su longitud.
  - No hay regla de **unicidad** del correo ni del DNI. El ejemplo de violación de PRINCIPIO-001 ("NO DEBE aceptar duplicados") da a entender que hay una.
  - No se verifica que el correo exista y sea del usuario, aunque los recordatorios (RN-067) y el segundo factor (RN-079) dependen de él (S-09).
  - No hay **recuperación** ni **cambio de contraseña**. RN-074 solo valida al crear la cuenta.
  - No están definidos el cierre de sesión ni la duración de la sesión.
- **Sugerencia:** crear una PREG con la lista de campos de la cuenta (obligatorio u opcional), la unicidad, la verificación del correo y el flujo de recuperación. Después, escribir una RN por cada decisión. Si se pide el DNI, revisar PREG-001.

#### QA-10 · Falta el ciclo completo del código de verificación
- **Severidad:** ALTA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-078 a RN-081. 02-alcance.md F-11.
- **Problema:** no se define:
  - si el código es de **un solo uso**: ¿un código ya usado vuelve a servir dentro de los 600 s?;
  - si se puede pedir un código nuevo, y si el anterior se anula al enviarlo;
  - si puede haber varios códigos vigentes a la vez;
  - qué pasa después de anular un código por 5 fallos (RN-081): ¿se pide otro? ¿hay un límite de envíos?;
  - si los fallos del código suman al bloqueo de RN-075;
  - cómo se activa el segundo factor (¿se confirma con un código?) y cómo se desactiva.
- **Sugerencia:** abrir una PREG de seguridad. Requiere aprobación humana porque toca autenticación (PRINCIPIO-012).

#### QA-11 · Código de invitación: RN-018 lo rechaza mientras la junta está llena, el glosario dice que se anula
- **Severidad:** ALTA
- **Tipo:** Contradicción
- **Ubicación:** 03-reglas-de-negocio.md RN-018 (State-driven: "Mientras la junta tenga todos sus cupos ocupados … rechazar") frente a 04-glosario.md "Código de invitación" ("Se anula al llenarse los cupos") y 03 §1 ("Sirve … hasta que se llenan los cupos").
- **Problema:** RN-018 describe un rechazo **temporal**: si se libera un cupo, el código vuelve a servir. El glosario describe una anulación **permanente**. Si alguien sale antes del sorteo (QA-03), el comportamiento cambia según el documento que lea el agente.
- **Sugerencia:** decidir si llenar los cupos anula el código o solo lo suspende, y usar el mismo verbo en RN-018, en el glosario y en 03 §1. Depende de QA-03.

#### QA-12 · "Ronda actual" y "próximo pago" no están definidos
- **Severidad:** ALTA
- **Tipo:** Ambigüedad / Inconsistencia de glosario
- **Ubicación:** 00-constitucion.md PRINCIPIO-006. 03-reglas-de-negocio.md RN-022. 04-glosario.md (faltan ambos términos).
- **Problema:**
  - No se define cuándo una ronda pasa a ser la "actual": al vencer la anterior, al pagarse todas sus cuotas o al entregarse el pozo. ¿Cuál es la ronda actual antes del sorteo o después de la última ronda?
  - "Próximo **pago**" usa "pago" en el sentido de "cuota", y el glosario lo prohíbe ("Cuota — No usar 'pago'").
  - No se dice qué se devuelve cuando un participante ya no tiene cuotas futuras, ni qué se devuelve de un organizador que no participa (no tiene turno ni cuotas). RN-022 exige devolver los cinco campos de "cada otro miembro", y el organizador es miembro.
- **Sugerencia:**
  - Agregar "Ronda actual" al glosario.
  - Cambiar "próximo pago" por "próxima cuota" en PRINCIPIO-006 y en RN-022. Este cambio requiere aprobación humana, aunque solo cambie el término y no el significado.
  - Escribir una RN para los casos sin próxima cuota y para el organizador que no participa.

#### QA-13 · "Acción de gestión" no está enumerada
- **Severidad:** ALTA
- **Tipo:** Ambigüedad
- **Ubicación:** 00-constitucion.md PRINCIPIO-006 ("acciones de gestión del organizador"). 03-reglas-de-negocio.md RN-077.
- **Problema:** RN-077 depende de una lista que no existe. RN-051 protege marcar un pago, pero no hay una regla de autorización explícita para:
  - desmarcar un pago (RN-057);
  - confirmar o rechazar un pago informado (RN-062, RN-063);
  - asignar el orden sin sorteo (RN-038);
  - escribir las reglas de la junta (RN-014);
  - ejecutar el sorteo.

  Un agente podría proteger solo los endpoints que aparecen en los ejemplos.
- **Sugerencia:** enumerar las acciones de gestión en el glosario o en la propia RN-077, y citar esa lista en los escenarios Gherkin de RN-077.

#### QA-14 · 02-alcance y 01-project-brief están desactualizados frente a 03 y 05
- **Severidad:** ALTA
- **Tipo:** Contradicción (PRINCIPIO-001: una sola fuente de verdad)
- **Ubicación:**
  - 02-alcance.md, línea "Fuente": cita el brief v0.1 y la constitución v1.1, cuando las vigentes son v0.2 y v1.2.
  - 02-alcance.md §7, "Valores que estas decisiones dejan pendientes": PREG-024, 025, 026 y 027 figuran como [REQUIERE DECISIÓN], pero ya están resueltas.
  - 02-alcance.md §5: "si se permite sortear sin conexión [REQUIERE DECISIÓN]", pero RN-029 ya lo decidió.
  - 02-alcance.md F-06 y §7.3: dicen que los recordatorios siguen "hasta que la cuota quede registrada como pagada", sin tope, cuando RN-071 fija un máximo de 5.
  - 02-alcance.md línea 5 y 01-project-brief.md línea 7: dicen que PREG-010 sigue abierta, y está resuelta.
  - 01-project-brief.md §2: "podría recibir algún beneficio (PREG-019)", y PREG-019 se resolvió con "ninguno".
  - 00-constitucion.md PRINCIPIO-003: la unidad mínima de monto sigue como [REQUIERE DECISIÓN], aunque PREG-002 ya se resolvió.
- **Problema:** un agente que lea solo 02-alcance creerá que estos valores no existen, o que los recordatorios no tienen límite.
- **Sugerencia:** publicar 02-alcance.md v0.2 y 01-project-brief.md v0.3 con las referencias actualizadas. El ajuste de PRINCIPIO-003 requiere aprobación humana.

#### QA-15 · "Cuota" tiene dos significados y un solo identificador
- **Severidad:** ALTA
- **Tipo:** Inconsistencia de glosario
- **Ubicación:** 04-glosario.md "Cuota" (`contribution`). 03-reglas-de-negocio.md RN-003, RN-004 y RN-043 (monto configurado) frente a RN-042, RN-045, RN-051 y RN-060 (obligación de un participante en una ronda, con estado).
- **Problema:** "cuota" es a la vez el **monto que fija el organizador** en la junta ("la cuota es S/ 300.00") y el **registro por participante y ronda** con estado ("la cuota de Lucía pasa a `paid`"). El glosario da un solo identificador, `contribution`, así que el modelo de datos queda ambiguo. ¿Cómo se llama la columna del monto en la tabla de juntas?
- **Sugerencia:** separar en el glosario los dos conceptos, por ejemplo "monto de la cuota" (columna de la junta, en céntimos) y "cuota" (`contribution`). Los nombres finales los decide el equipo.

#### QA-16 · El orden de turnos sin sorteo (F-10) está incompleto
- **Severidad:** ALTA
- **Tipo:** Regla faltante y debilidad de formato
- **Ubicación:** 03-reglas-de-negocio.md RN-038 y RN-039. 02-alcance.md F-10. 04-glosario.md "Turno". PREG-018 (no figura como resuelta en 05).
- **Problema:**
  - No se valida que la asignación sea una permutación completa: cada participante con un solo turno, de 1 a n, sin turnos repetidos ni vacíos.
  - No se dice si el orden manual y el sorteo se excluyen entre sí. RN-028 solo bloquea un segundo **sorteo**.
  - No se dice si la asignación manual también exige todos los cupos llenos (RN-027), si anula el código de invitación (RN-019 solo habla del sorteo) ni si es inmutable y se registra igual que un sorteo (PRINCIPIO-008 solo cubre el sorteo).
  - RN-038 y RN-039 usan el patrón Optional para describir un evento ("Donde el organizador asigna"). Encaja mejor el patrón Event-driven ("Cuando el organizador asigna …").
  - 05-preguntas-abiertas no registra PREG-018 como resuelta, aunque 03 ya escribe reglas para F-10.
- **Sugerencia:** cerrar PREG-018 con estas decisiones y reescribir RN-038 y RN-039 con el patrón Event-driven. El orden de turnos decide quién cobra primero, así que es una decisión sobre dinero (PRINCIPIO-012 g).

---

### 2.3 MEDIAS

#### QA-17 · Faltan casos borde del registro de pagos
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-051 a RN-059.
- **Problema:** no se define:
  - qué pasa al marcar como pagada una cuota que ya está "Pagada";
  - qué pasa al desmarcar una cuota que no está pagada;
  - un **límite inferior** para la fecha de pago: RN-054 solo prohíbe fechas futuras, así que se acepta una fecha anterior a la creación de la junta;
  - si se pueden registrar pagos adelantados de rondas futuras;
  - si se puede editar la fecha de pago sin desmarcar el pago;
  - si la clasificación "a tiempo"/"atrasado" se recalcula después de desmarcar y volver a marcar;
  - qué pasa si el organizador marca directamente como pagada una cuota que está "Por confirmar".
- **Sugerencia:** enumerar estos casos en una PREG y escribir una RN Unwanted por cada decisión.

#### QA-18 · Faltan casos borde del pago informado (F-08)
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-060 a RN-065.
- **Problema:**
  - RN-060 no dice desde qué estado se puede informar un pago: ¿también una cuota "Pagada" o de una ronda futura?
  - No se avisa al organizador de que hay pagos por confirmar. Como RN-064 no tiene plazo, una cuota puede quedar "Por confirmar" para siempre sin que él lo sepa.
  - No se dice qué pasa cuando el organizador participa: ¿informa su propio pago y lo confirma él mismo?
  - El ejemplo de RN-065 ("solo tiene el botón") puede chocar con la fecha de pago que falta decidir en PREG-017.
- **Sugerencia:** agregar estos casos a PREG-017.

#### QA-19 · Recordatorios: faltan casos borde y hay valores vagos
- **Severidad:** MEDIA
- **Tipo:** Regla faltante y debilidad de formato
- **Ubicación:** 03-reglas-de-negocio.md RN-066 a RN-073.
- **Problema:**
  - Falta qué pasa si el día del aviso previo ya pasó cuando se crea la junta o cuando el participante se une. Por ejemplo, la ronda 1 vence en 2 días y el aviso es de 3 (RN-009 lo permite).
  - Falta qué pasa si la junta se crea el día del vencimiento después de las 09:00 (RN-069).
  - RN-071 dice "ya **recibió** 5 recordatorios". No queda claro si un correo rebotado cuenta, ni si un correo más un push cuentan como uno o como dos (RN-073).
  - RN-066 ("a las 09:00") no tiene tolerancia medible: ¿09:00:00 exacto? ¿un margen de minutos?
  - No se define el contenido del recordatorio ni qué datos de otros miembros puede llevar (PRINCIPIO-006).
- **Sugerencia:** fijar la tolerancia de envío como valor medible, definir que el contador de RN-071 cuenta envíos y no entregas (o al revés, según decida el equipo), y abrir una PREG para el contenido del recordatorio.

#### QA-20 · El aviso previo por defecto (3) es inválido para "cada 2 días" y "cada 3 días"
- **Severidad:** MEDIA
- **Tipo:** Contradicción
- **Ubicación:** 03-reglas-de-negocio.md RN-011 frente a RN-012. PREG-028.
- **Problema:** PREG-028 solo cubre N = 1. Con N = 2 o N = 3, el valor por defecto 3 incumple RN-012 (el aviso tiene que ser menor que el periodo), y el formulario nace con un error. No se define si el valor por defecto se ajusta o si se muestra un error.
- **Sugerencia:** ampliar PREG-028 a N ≤ 3.

#### QA-21 · "Fecha y hora en America/Lima" frente a `timestamptz`, y formato de hora sin definir
- **Severidad:** MEDIA
- **Tipo:** Ambigüedad
- **Ubicación:** 00-constitucion.md PRINCIPIO-003, PRINCIPIO-007 y PRINCIPIO-008. 03-reglas-de-negocio.md RN-034, RN-039, RN-057, RN-084, RN-093 y RN-095.
- **Problema:**
  - `timestamptz` guarda un instante absoluto, no una zona horaria. "Guardar la fecha y hora en America/Lima" se puede leer como "guardar una hora local sin zona", o como "guardar texto con `-05:00`".
  - PRINCIPIO-003 solo fija el formato de la fecha (DD/MM/AAAA). Los ejemplos de RN-093 y RN-095 muestran la hora como "22:30" (24 h, sin segundos), pero ningún principio ni regla lo fija.
- **Sugerencia:** aclarar que se guarda el instante en `timestamptz` y que America/Lima solo aplica al mostrarlo. Fijar el formato de la hora en pantalla en PRINCIPIO-003, con aprobación humana.

#### QA-22 · RN-090 a RN-093 hablan de "la interfaz": ¿incluyen correos y push?
- **Severidad:** MEDIA
- **Tipo:** Ambigüedad
- **Ubicación:** 03-reglas-de-negocio.md RN-090 a RN-093. 00-constitucion.md PRINCIPIO-002.
- **Problema:** los recordatorios por correo y por push no son "la interfaz". Un agente podría escribirlos tuteando al usuario, o con fechas ISO o montos sin formato.
- **Sugerencia:** decidir si las reglas de formato y trato aplican a todo texto que recibe el usuario (pantallas, correos y push), y ajustar el sujeto de esas RN.

#### QA-23 · Bloqueo por intentos fallidos: falta qué pasa al terminar los 900 s
- **Severidad:** MEDIA
- **Tipo:** Regla faltante y ambigüedad
- **Ubicación:** 03-reglas-de-negocio.md RN-075 y RN-076.
- **Problema:**
  - No se dice si el contador vuelve a 0 al terminar el bloqueo: si no vuelve, un solo fallo más bloquearía la cuenta otra vez.
  - No se dice si los intentos hechos durante el bloqueo cuentan, ni qué mensaje ve el usuario.
  - El contraejemplo de RN-076 ("se sumaron los 3 fallos de ayer y los 2 de hoy") sugiere que el contador se reinicia cada día, algo que la regla no dice. Sin un acierto en medio, esos 5 fallos **sí** deberían bloquear según RN-075.
  - Cualquiera que conozca el correo de otra persona puede bloquear su cuenta. Es un riesgo a evaluar, no una regla.
- **Sugerencia:** reescribir el contraejemplo de RN-076 para que no hable de días, y decidir qué pasa con el contador al terminar el bloqueo. Toca autenticación, así que requiere aprobación humana.

#### QA-24 · Código de invitación: reutilización, fuerza bruta, código inexistente y concurrencia
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-015 a RN-021.
- **Problema:**
  - RN-016 solo evita repetir códigos **vigentes**. Un código anulado de la junta A puede salir otra vez para la junta B, y un invitado con el mensaje viejo de A terminaría en B.
  - No hay mensaje para un código que no existe.
  - No hay límite de intentos para adivinar códigos.
  - No se define qué pasa si dos personas intentan ocupar el último cupo al mismo tiempo. RN-018 fija el resultado, pero no hay un escenario que lo pruebe.
- **Sugerencia:**
  - Decidir si los códigos anulados se pueden reutilizar.
  - Fijar un límite de intentos medible. Es un valor nuevo, así que va como [REQUIERE DECISIÓN].
  - Agregar un escenario Gherkin de concurrencia para RN-018.

#### QA-25 · No se define quién puede auditar el sorteo
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 00-constitucion.md PRINCIPIO-008 ("auditable"). 01-project-brief.md, Persona 2 ("que nadie pueda discutirlo"). 03-reglas-de-negocio.md RN-034.
- **Problema:** ninguna regla dice si los participantes pueden ver la semilla, la lista de entrada y el resultado para comprobar el sorteo. Además, la lista de entrada incluye a los demás miembros, así que también hay que revisar PRINCIPIO-006. Sin acceso, el sorteo solo es auditable para el equipo técnico, y S-12 pierde sustento.
- **Sugerencia:** abrir una PREG que decida qué datos del registro del sorteo ve cada rol.

#### QA-26 · Falta qué pasa cuando cambia la versión de la política de privacidad
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-082 a RN-084. 00-constitucion.md PRINCIPIO-007.
- **Problema:**
  - No se dice si, al publicar la versión 1.1 de la política, los usuarios existentes tienen que volver a aceptarla.
  - Una sola casilla cubre dos finalidades (la política y las notificaciones). 05 recuerda que la Ley N.° 29733 pide un consentimiento por finalidad (PREG-015).
- **Sugerencia:** agregar ambos puntos a PREG-001.

#### QA-27 · Reglas derivadas por el Business Analyst sin validación humana
- **Severidad:** MEDIA
- **Tipo:** Contradicción con PRINCIPIO-012 a
- **Ubicación:** 03-reglas-de-negocio.md RN-016, RN-021, RN-036, RN-037, RN-045, RN-061 y RN-076 ("Fuente: Business Analyst, derivada de …").
- **Problema:** PRINCIPIO-012 a prohíbe que un agente invente reglas. Estas siete reglas las dedujo un agente y nada indica que el Product Owner las haya validado. RN-037 (quién recibe el pozo) y RN-036 (cómo se asigna el turno) deciden sobre dinero (PRINCIPIO-012 g).
- **Sugerencia:** que el Product Owner revise estas siete reglas y que su campo "Fuente" registre la aprobación con fecha.

#### QA-28 · IDs y encabezado de versión fuera de lo que fija PRINCIPIO-001
- **Severidad:** MEDIA
- **Tipo:** Contradicción y debilidad de formato
- **Ubicación:** 00-constitucion.md PRINCIPIO-001. 01-project-brief.md (S-NN, R-NN, KPI-NN). 02-alcance.md (F-NN, NO-NN).
- **Problema:**
  - PRINCIPIO-001 enumera los prefijos permitidos (`PRINCIPIO`, `RN`, `HU`, `P`, `T`, `PREG`, todos con 3 dígitos). El spec-pack usa además `F-NN`, `NO-NN`, `S-NN`, `R-NN` y `KPI-NN`, con 2 dígitos, que no están protegidos por la regla de no renumerar.
  - PRINCIPIO-001 exige que cada archivo **empiece** con la línea `Versión:`, pero todos empiezan con un título `#` y ponen la versión en la línea 3.
- **Sugerencia:** con aprobación humana, agregar esos prefijos a PRINCIPIO-001 y ajustar la regla del encabezado (por ejemplo, "la primera línea después del título"), o bien corregir los archivos.

#### QA-29 · `junta` como identificador en código frente a PRINCIPIO-002
- **Severidad:** MEDIA
- **Tipo:** Contradicción
- **Ubicación:** 00-constitucion.md PRINCIPIO-002 y el ejemplo de PRINCIPIO-006 (`/juntas/{id}`). 04-glosario.md (`junta`, `junta_rules`). 03-reglas-de-negocio.md RN-014, RN-024 y RN-028.
- **Problema:** PRINCIPIO-002 exige identificadores en inglés, incluidas las rutas de API. `junta` y `/juntas` están en español, y la propia constitución los usa. Es una excepción que nadie declaró, así que un agente podría "corregirla" a `group` o `rosca`, o aplicar la misma excepción a otros términos.
- **Sugerencia:** declarar en PRINCIPIO-002 que `junta` es una excepción explícita como término del dominio (con aprobación humana), o cambiar el identificador.

#### QA-30 · "Junta activa" y "junta finalizada" en los KPI
- **Severidad:** MEDIA
- **Tipo:** Ambigüedad
- **Ubicación:** 01-project-brief.md §5 (KPI-01 y KPI-06). 04-glosario.md "Junta activa".
- **Problema:**
  - "Todos los pagos de la primera cuota" mezcla dos términos del glosario. Lo correcto sería "todas las cuotas de la ronda 1 están 'Pagada'".
  - No se dice si una junta deja de estar activa cuando se desmarca un pago de la ronda 1, ni si una junta terminada sigue contando como activa en KPI-01.
  - "Completaron su última ronda" (KPI-06) no está definido: ¿todas las cuotas pagadas? ¿el pozo entregado (F-12, Could)?
  - La justificación de KPI-06 ("antes de ese plazo no hay juntas mensuales terminadas") es falsa con RN-005: una junta mensual de 2 participantes termina en 2 meses.
  - El identificador `is_active` sugiere un campo guardado, cuando es una métrica.
- **Sugerencia:** redefinir los términos con el vocabulario del glosario, agregar "Junta finalizada" y corregir la justificación de KPI-06.

#### QA-31 · Términos e identificadores usados pero no definidos en el glosario
- **Severidad:** MEDIA
- **Tipo:** Inconsistencia de glosario
- **Ubicación:** 04-glosario.md frente a 00, 02 y 03.
- **Problema:**
  - **Términos sin definir:** "lista de entrada" (RN-030, RN-032, RN-033), "resultado del sorteo", "cambio de turno" (PRINCIPIO-008, RN-035, F-13), "cuenta", "usuario", "sesión", "receptor del pozo" (RN-037), "estado de pago" (PRINCIPIO-006, RN-022, que el glosario llama "estado de la cuota"), "fecha de registro" (solo aparece en "No usar") y "hora original" (RN-087).
  - **Identificadores de los ejemplos que no están en el glosario:** `current_round_status`, `next_due_date`, `next_status`, `executed_by`, `executed_at`, `algorithm_version`, `assigned_by` y `assigned_at`.
  - **Convención de nombres de tablas sin fijar:** `draws` (plural) frente a `payment_correction` (singular) y la tabla `payment_corrections` de RN-057.
- **Sugerencia:** agregar estos términos al glosario y fijar la convención de nombres de tablas (singular o plural).

#### QA-32 · Falta detalle del modo sin conexión
- **Severidad:** MEDIA
- **Tipo:** Regla faltante y debilidad de formato
- **Ubicación:** 03-reglas-de-negocio.md RN-087, RN-094 y RN-095.
- **Problema:**
  - No se define qué datos se guardan en el dispositivo: ¿todas las juntas o solo las que se abrieron?
  - No se define si se muestra que hay cambios pendientes de enviar.
  - El ejemplo de RN-087 exige que los cambios lleguen "cada uno con su hora original", pero el texto de la regla no lo pide. Un requisito solo en el ejemplo no genera un escenario propio.
  - La protección de los datos guardados en el dispositivo depende de PREG-008.
- **Sugerencia:** pasar "hora original" a una RN propia (Event-driven) y abrir una PREG sobre qué datos se guardan en el dispositivo y cómo se indican los cambios pendientes.

#### QA-33 · Validaciones sin mensaje de error definido
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-002 a RN-005, RN-008 a RN-010, RN-012, RN-054, RN-074, RN-085 y RN-086.
- **Problema:**
  - RN-017, RN-018, RN-020 y RN-029 fijan el texto exacto que ve el usuario, pero las demás validaciones no. El agente inventaría los mensajes, y PRINCIPIO-002 exige "usted".
  - No se define el formato de entrada de los montos: si "300,50" con coma decimal se rechaza o se interpreta.
  - Tampoco se define la longitud del nombre de la junta.
- **Sugerencia:** agregar un catálogo de mensajes de error, o un texto por regla, y decidir el formato de entrada de los montos.

#### QA-34 · Segundo factor: la constitución lo da como capacidad, el alcance lo deja fuera del MVP
- **Severidad:** MEDIA
- **Tipo:** Contradicción
- **Ubicación:** 00-constitucion.md PRINCIPIO-005 ("el usuario puede activar un código"). 02-alcance.md F-11 (Should) y §3 ("no hay segundo factor").
- **Problema:** la constitución afirma que el usuario **puede** activar el segundo factor, y el MVP sale sin esa opción. Un agente que audite el MVP contra la constitución lo marcaría como incumplimiento.
- **Sugerencia:** aclarar en PRINCIPIO-005 que el segundo factor aplica desde que se publique F-11, o subir F-11 a Must. Ambos cambios requieren aprobación humana.

#### QA-35 · Falta si se pueden editar las reglas escritas de la junta (F-09)
- **Severidad:** MEDIA
- **Tipo:** Regla faltante
- **Ubicación:** 03-reglas-de-negocio.md RN-014. 02-alcance.md F-09 ("al crear la junta").
- **Problema:** no se define si el organizador puede editar las reglas después de crear la junta, o después del sorteo, ni si se guarda el historial de cambios para que nadie las "discuta después" (Persona 2). Tampoco se fija una longitud máxima.
- **Sugerencia:** agregar estos puntos a PREG-016.

---

### 2.4 BAJAS

#### QA-36 · Sujetos y patrones EARS inconsistentes
- **Severidad:** BAJA
- **Tipo:** Debilidad de formato
- **Ubicación:** 03-reglas-de-negocio.md RN-011, RN-013, RN-029, RN-033, RN-042, RN-045, RN-065, RN-077, RN-087 y RN-088 a RN-095.
- **Problema:**
  - El sujeto cambia de una regla a otra: "el sistema", "la app", "el servidor", "la interfaz", "el campo", "el formulario", "la casilla". La plantilla EARS de 03 usa siempre "el sistema", así que no queda claro dónde se hace cumplir cada regla.
  - RN-088 ("al abrir el formulario") esconde un evento dentro del patrón Ubiquitous.
  - RN-013 y RN-042 usan el patrón Ubiquitous para algo que ocurre en un evento (ver QA-02).
  - RN-033 describe una propiedad que se prueba, no un evento del sistema.
  - RN-045 omite el sujeto después de la coma.
  - RN-002 junta 7 condiciones en una sola regla. Cumple el "un solo DEBE", pero pide 7 escenarios.
- **Sugerencia:** normalizar el sujeto, o explicar en "Cómo leer este catálogo" cuándo se usa "la app" (cliente) y cuándo "el servidor". Revisar el patrón de cada regla citada.

#### QA-37 · Datos de ejemplo que se contradicen entre reglas
- **Severidad:** BAJA
- **Tipo:** Inconsistencia
- **Ubicación:** 03-reglas-de-negocio.md y 01-project-brief.md.
- **Problema:**
  - `K7MP4XR2` es el código de la junta de Carmen en RN-015 y RN-020, pero de la junta de Jorge en RN-016.
  - Lucía tiene el turno 7 en RN-025 y RN-094, y el turno 1 en RN-036.
  - Lucía participa en la junta de **su trabajo** (Persona 3), cuyo organizador es Jorge, pero en RN-052 y RN-087 es Carmen quien registra sus pagos.
  - El brief dice "1 junta de 12 familiares" y las RN-006, RN-023 y RN-043 hablan de Carmen y "sus 11 familiares".
- **Problema de fondo:** cuando un agente genere los escenarios Gherkin, va a heredar estas contradicciones.
- **Sugerencia:** fijar un conjunto de datos de ejemplo (juntas, miembros, códigos y turnos) y usarlo igual en todas las reglas.

#### QA-38 · Definiciones incompletas y términos "No usar" presentes
- **Severidad:** BAJA
- **Tipo:** Inconsistencia de glosario
- **Ubicación:** 04-glosario.md y 01-project-brief.md.
- **Problema:**
  - "Frecuencia" dice "mensual (el mismo día de cada mes)" y omite la regla del último día (RN-050).
  - "Periodo" mensual varía de 28 a 31 días, así que RN-012 queda indefinida para mensual. Es inofensivo, porque el aviso máximo es 7.
  - El brief usa "monto de la junta" (§1, fila Cuota) y "Cobro" (fila de la tabla), que están en "No usar".
- **Sugerencia:** completar las definiciones y reemplazar esos términos en el brief.

#### QA-39 · Faltan ejemplos en los bordes y límites superiores
- **Severidad:** BAJA
- **Tipo:** Debilidad de formato
- **Ubicación:** 03-reglas-de-negocio.md RN-009, RN-049 y RN-080.
- **Problema:**
  - RN-080 no tiene ejemplo en el borde exacto de 600 s ("más de 600" implica que a los 600 s se acepta).
  - RN-049 y RN-050 no tienen un ejemplo de año bisiesto (por ejemplo, 2028-02-29).
  - RN-009 no tiene límite superior para la fecha de la ronda 1.
  - No se dice si los vencimientos que caen en feriados o fines de semana se corren.
- **Sugerencia:** agregar esos ejemplos y, si el equipo lo decide, un límite superior para la fecha de la ronda 1, marcado como [REQUIERE DECISIÓN].

#### QA-40 · DNI solo peruano
- **Severidad:** BAJA
- **Tipo:** Regla faltante
- **Ubicación:** 00-constitucion.md PRINCIPIO-003. 03-reglas-de-negocio.md RN-085.
- **Problema:** `^\d{8}$` excluye a quien tiene carné de extranjería. No está claro si es una decisión tomada o un olvido, sobre todo porque el lanzamiento es "para todos los segmentos".
- **Sugerencia:** confirmar con el Product Owner. Si se acepta otro documento, hay que cambiar la constitución con aprobación humana.

#### QA-41 · Dos formatos de fecha para las decisiones
- **Severidad:** BAJA
- **Tipo:** Debilidad de formato
- **Ubicación:** 03-reglas-de-negocio.md ("2026-11-14") frente a 02-alcance.md y 05-preguntas-abiertas.md ("14/11/2026").
- **Problema:** 03 explica su propia convención (ISO 8601), pero los demás archivos usan otra para el mismo dato.
- **Sugerencia:** fijar una sola convención para las fechas de redacción en todos los archivos del spec-pack.

---

## 3. Temas ya identificados como pendientes

No se cuentan como hallazgos nuevos porque ya tienen una PREG o un [REQUIERE DECISIÓN]. Siguen bloqueando que un agente pueda implementar:

| Tema | Referencia | Bloquea |
|---|---|---|
| Cumplimiento de la Ley N.° 29733 y texto de la política | PREG-001 | Salida al mercado de F-01 |
| DNI y foto de los demás | PREG-003, PREG-004 | Contrato final de `GET /juntas/{id}/members` |
| Conflictos de cambios sin conexión | PREG-005 | Arquitectura y una condición Must (ver QA-05) |
| Cifrado en el dispositivo y de la fecha de nacimiento | PREG-008 | Modo sin conexión |
| Retiro del consentimiento | PREG-009 | Recordatorios |
| Contenido de las reglas escritas | PREG-016 | F-09 |
| Fecha de un pago informado | PREG-017 | F-08 y KPI-04 |
| Frecuencia de cada 1 día | PREG-028 | Formulario de creación (ver QA-20) |
| Vencimiento antes del sorteo | PREG-029 | Cálculo de cuotas (ver QA-02) |
| Recordatorios de cuotas "Por confirmar" | PREG-030 | F-08 (ver QA-08) |
| Versiones exactas, hosting, proveedor de correo, gestor de secretos y navegadores mínimos | PRINCIPIO-009, 02-alcance §6 | Inicio del desarrollo |
| Escenarios Gherkin de las 95 RN | PRINCIPIO-011 | Integración de código. Es esperado en esta etapa |

---

## 4. Puntaje de madurez

**Puntaje: 3 de 5. Base sólida, pero todavía no está lista para agentes.**

**A favor:**
- La constitución tiene valores medibles y ejemplos de cumplimiento y de violación.
- Las 95 RN tienen un solo verbo modal, valores concretos, ejemplos y contraejemplos verificables, y trazabilidad a su fuente.
- No hay palabras vagas prohibidas sin un valor medible.
- Los pendientes están marcados con [REQUIERE DECISIÓN] en vez de inventarse.
- El dinero está bien modelado: céntimos enteros, sin división ni redondeo.

**En contra:**
- Hay una contradicción de nivel constitucional que bloquea F-04 (QA-01).
- No hay un ciclo de vida de la junta ni un momento definido para generar las cuotas (QA-02). Ese módulo exige 100 % de cobertura.
- Faltan reglas que tocan dinero y turnos: salida de participantes, edición de la junta y orden manual (QA-03, QA-04, QA-16).
- No está claro qué funciona sin conexión (QA-05).
- 02-alcance y 01-project-brief están desactualizados, y eso rompe la fuente única de verdad (QA-14).

**Para llegar a 4:** resolver las 5 CRÍTICAS, alinear 01 y 02 con 03 (QA-14) y unificar los términos del glosario (QA-12, QA-15).

**Para llegar a 5:** cerrar las ALTAS y las PREG que bloquean el MVP (PREG-001, PREG-005 y PREG-029) y escribir los escenarios Gherkin de cada RN.

---

## 5. Correcciones aplicadas (14/11/2026)

El Agente QA aplicó correcciones con criterio propio, a pedido del usuario. **El Product Owner aprobó todas el 14/11/2026** (PRINCIPIO-012), incluida la constitución v1.3. En el spec-pack se reconocen por "Product Owner a propuesta QA" en las RN y por "Estado: Resuelta … auditoría QA" en las PREG. Las 7 reglas con fuente "Business Analyst" (QA-27) siguen pendientes de validación una por una.

**Versiones nuevas:** 00-constitucion.md 1.3 (borrador), 01-project-brief.md 0.3, 02-alcance.md 0.2, 03-reglas-de-negocio.md 0.2, 04-glosario.md 0.2 y 05-preguntas-abiertas.md 1.5. Se agregaron las reglas RN-096 a RN-177 y las preguntas PREG-031 a PREG-044.

Las filas marcadas con ⚖️ cambian la constitución o tocan el sorteo, la autenticación, los permisos o el dinero, y quedaron cubiertas por esa aprobación explícita.

| Hallazgo | Decisión tomada | Dónde |
|---|---|---|
| QA-01 ⚖️ | PRINCIPIO-006 separa los datos personales (nadie los recibe de otro miembro) de los datos de la junta. El organizador recibe todas las cuotas y pagos de su junta | PRINCIPIO-006, RN-022, RN-120, PREG-034 |
| QA-02 ⚖️ | Estados Abierta → Completa → En curso → Terminada. Las rondas y las cuotas se generan al fijar el orden de turnos | RN-013, RN-042, RN-099 a RN-105, PREG-031, PREG-029 |
| QA-03 ⚖️ | Antes del sorteo se puede salir de la junta o quitar a alguien. Después, no. El organizador no deja su junta | RN-111 a RN-115, NO-13, PREG-032 |
| QA-04 ⚖️ | Antes del sorteo se edita todo. Después, solo el nombre | RN-106 a RN-110, PREG-033 |
| QA-05 | Sin red solo se consulta y se gestionan pagos. El servidor rechaza los cambios que ya no son válidos y la app lo muestra | RN-170 a RN-176, PREG-005 |
| QA-06 ⚖️ | Entrada con identificadores de usuario por orden de ocupación del cupo. `fisher-yates-v1` con HMAC-SHA256 y muestreo por rechazo, con un vector de prueba | PRINCIPIO-008, RN-123, RN-124, anexo A, PREG-035 |
| QA-07 | "Junta al día" usa "a tiempo" (RN-055) | 01 §5 |
| QA-08 | Los recordatorios aplican solo a cuotas "Pendiente" y se pausan en "Por confirmar" | RN-069, RN-070, RN-140, PREG-030 |
| QA-09 ⚖️ | Nombre, correo y contraseña obligatorios. DNI y celular opcionales. Sin fecha de nacimiento ni foto. Correo verificado. Recuperación de contraseña. Sesión de 30 días | RN-074, RN-146 a RN-159, NO-14, PREG-036 |
| QA-10 ⚖️ | Código de un solo uso, el nuevo anula al anterior, máximo 5 cada 900 s, activación y desactivación con código | RN-162 a RN-167, PREG-037 |
| QA-11 | RN-018 rechaza el código de forma temporal. El glosario y 03 §1.1 se alinean | 04, 03 §1.1 |
| QA-12 | Se definen "Ronda actual" y "Próxima cuota", y el caso del organizador que no participa | PRINCIPIO-006, RN-022, RN-118, RN-119, PREG-039 |
| QA-13 | Se enumeran las acciones de gestión en el glosario | RN-077, 04 |
| QA-14 | Se actualizan las versiones y las referencias de 01 y 02, y la unidad mínima en PRINCIPIO-003 | 00, 01, 02 |
| QA-15 | Se separan "Monto de la cuota" (`contribution_amount_cents`) y "Cuota" (`contribution`) | 04, RN-003, RN-004 |
| QA-16 ⚖️ | El orden manual excluye al sorteo, exige los cupos llenos, es una permutación, es inmutable y anula el código | RN-038, RN-039, RN-125 a RN-129, PREG-018 |
| QA-17 ⚖️ | Solo se registra una cuota "Pendiente" y solo se desmarca una "Pagada". Fecha de pago desde la creación de la junta. Se permiten adelantos. La fecha no se edita | RN-130 a RN-134, PREG-040 |
| QA-18 | El participante indica la fecha de pago. El organizador no informa sus propias cuotas y recibe un aviso | RN-054, RN-065, RN-135 a RN-139, PREG-017 |
| QA-19 | Ventana de 09:00 a 09:15. No se envían recordatorios cuyo momento ya pasó. Correo más push cuenta como uno. Contenido mínimo | RN-066, RN-141 a RN-145, PREG-041 |
| QA-20 | N de 2 a 60. El aviso se ajusta a periodo − 1 | RN-008, RN-098, PREG-028 |
| QA-21 ⚖️ | Instantes en `timestamptz` y America/Lima solo para mostrar y calcular. Hora en HH:MM de 24 h | PRINCIPIO-003, RN-177 |
| QA-22 ⚖️ | "Usted" y formatos de Perú también en correos y push | PRINCIPIO-002, RN-090 a RN-093 |
| QA-23 ⚖️ | El contador vuelve a 0 al terminar el bloqueo, y los intentos durante el bloqueo no cuentan. Se acepta el riesgo R-13 | RN-076, RN-160, RN-161, PREG-042 |
| QA-24 | Los códigos nunca se reutilizan. Un código inexistente se rechaza. Límite de 10 inválidos por hora. Ejemplo de concurrencia | RN-016, RN-018, RN-116, RN-117, PREG-038 |
| QA-25 ⚖️ | Todo miembro ve el registro del sorteo y lo puede reproducir | PRINCIPIO-006, PRINCIPIO-008, RN-121 |
| QA-26 | Una política nueva se acepta antes de ver las juntas. Las casillas separadas quedan para el asesor legal | RN-168, RN-169, PREG-043, PREG-001 |
| QA-27 | Las reglas del Business Analyst quedan sujetas a validación del Product Owner | 03 "Cómo leer" |
| QA-28 ⚖️ | PRINCIPIO-001 reconoce F, NO, S, R y KPI, y el título antes de la línea de versión | PRINCIPIO-001 |
| QA-29 ⚖️ | `junta` es una excepción declarada a los identificadores en inglés | PRINCIPIO-002, 04 |
| QA-30 | Se redefinen "Junta activa" y "Junta terminada", y se corrige la justificación de KPI-06 | 01 §5, 04 |
| QA-31 | Se agregan 20 términos al glosario y la convención de nombres de tablas | 04 |
| QA-32 | La hora del dispositivo pasa a una RN propia. Se agregan el contador de cambios sin enviar y el guardado de todas las juntas | RN-087, RN-173 a RN-175 |
| QA-33 | Catálogo de mensajes, nombre de junta de 3 a 60 caracteres y formato de entrada de montos | 03 §2.9, RN-096, RN-097, PREG-044 |
| QA-34 ⚖️ | PRINCIPIO-005 aplica el segundo factor desde que se publique F-11 | PRINCIPIO-005 |
| QA-35 | Reglas de la junta: texto opcional de hasta 2,000 caracteres, editable solo antes del sorteo | RN-106, RN-110, PREG-016 |
| QA-36 | Se normalizan los sujetos y los patrones EARS | 03 "Cómo leer", RN-011, RN-045, RN-065, RN-088 |
| QA-37 | Un solo conjunto de datos de ejemplo | 03 "Datos de ejemplo", 01 Persona 1 |
| QA-38 | Se corrigen las definiciones de frecuencia y periodo, y "monto de la junta" y "cobro" en el brief | 04, 01, RN-012 |
| QA-39 | Ejemplos de borde de 600 s y de año bisiesto | RN-050, RN-080 |
| QA-40 | Se mantiene el DNI de 8 dígitos, que ahora es opcional (RN-148). La decisión sobre el carné de extranjería pasa a PREG-045 | 05 |
| QA-41 | 03 mantiene ISO 8601, y su sección "Cómo leer" explica la convención frente a los demás archivos | 03 "Cómo leer" |

**Siguen abiertas, porque no le corresponden a un agente:** PREG-001 (legal), PREG-003, PREG-004, PREG-006, PREG-007, PREG-008, PREG-009, PREG-011, PREG-012, PREG-014, PREG-015, PREG-021, PREG-022 y PREG-045.

---

## Decisiones del equipo

El Product Owner aprobó estas decisiones el 14/11/2026. "CORREGIDO" significa que el spec-pack ya refleja la decisión. "PREGUNTA ABIERTA" significa que el tema quedó en 05-preguntas-abiertas.md, con el formato PREG-NNN, para que lo decida el equipo.

**Archivos:** 00 = 00-constitucion.md v1.3 · 01 = 01-project-brief.md v0.3 · 02 = 02-alcance.md v0.2 · 03 = 03-reglas-de-negocio.md v0.2 · 04 = 04-glosario.md v0.2 · 05 = 05-preguntas-abiertas.md v1.5.

**Sobre las versiones:** el paso pedía subir cada cabecera a "Versión 0.1.1". No se aplicó, porque PRINCIPIO-001 exige el formato `Versión: MAYOR.MENOR` y la constitución gana sobre cualquier instrucción. En su lugar, cada archivo modificado subió su número MENOR.

| Hallazgo | Decisión | Archivo |
|---|---|---|
| QA-01 | CORREGIDO: PRINCIPIO-006 separa los datos personales de los datos de la junta, y el organizador recibe todas las cuotas de su junta (PREG-034) | 00, 03, 04, 05 |
| QA-02 | CORREGIDO: estados de la junta, y rondas y cuotas generadas al fijar el orden de turnos (PREG-031, PREG-029) | 01, 03, 04, 05 |
| QA-03 | CORREGIDO: se puede dejar la junta solo antes del sorteo, y se agrega NO-13 (PREG-032) | 02, 03, 04, 05 |
| QA-04 | CORREGIDO: la junta se edita antes del sorteo, y después solo el nombre (PREG-033) | 02, 03, 05 |
| QA-05 | CORREGIDO: acciones permitidas sin conexión, y rechazo de un cambio no válido al sincronizar (PREG-005) | 01, 02, 03, 05 |
| QA-06 | CORREGIDO: lista de entrada con identificadores de usuario, y algoritmo `fisher-yates-v1` con vector de prueba (PREG-035) | 00, 03, 04, 05 |
| QA-07 | CORREGIDO: "junta al día" usa "a tiempo" (RN-055) | 01 |
| QA-08 | CORREGIDO: los recordatorios aplican solo a cuotas "Pendiente" y se pausan en "Por confirmar" (PREG-030) | 03, 04, 05 |
| QA-09 | CORREGIDO: datos de la cuenta, unicidad, verificación del correo, recuperación de la contraseña y sesión (PREG-036) | 02, 03, 04, 05 |
| QA-10 | CORREGIDO: ciclo completo del código de verificación (PREG-037) | 03, 04, 05 |
| QA-11 | CORREGIDO: RN-018 rechaza el código de forma temporal, y el glosario queda alineado (PREG-038) | 03, 04, 05 |
| QA-12 | CORREGIDO: se definen "ronda actual" y "próxima cuota" (PREG-039) | 00, 03, 04, 05 |
| QA-13 | CORREGIDO: se enumeran las acciones de gestión | 03, 04 |
| QA-14 | CORREGIDO: se actualizan las versiones y las referencias entre archivos | 00, 01, 02 |
| QA-15 | CORREGIDO: se separan "monto de la cuota" y "cuota" | 03, 04 |
| QA-16 | CORREGIDO: reglas del orden de turnos sin sorteo (PREG-018) | 02, 03, 04, 05 |
| QA-17 | CORREGIDO: casos borde del registro y la corrección de pagos (PREG-040) | 03, 05 |
| QA-18 | CORREGIDO: fecha del pago informado y aviso al organizador (PREG-017) | 02, 03, 04, 05 |
| QA-19 | CORREGIDO: ventana de envío, conteo y contenido de los recordatorios (PREG-041) | 02, 03, 04, 05 |
| QA-20 | CORREGIDO: N de 2 a 60, y ajuste automático del aviso previo (PREG-028) | 03, 04, 05 |
| QA-21 | CORREGIDO: instantes en `timestamptz` y hora en HH:MM de 24 h | 00, 03 |
| QA-22 | CORREGIDO: "usted" y formatos de Perú también en correos y push | 00, 03 |
| QA-23 | CORREGIDO: el contador vuelve a 0 al terminar el bloqueo, y se registra el riesgo R-13 (PREG-042) | 01, 03, 05 |
| QA-24 | CORREGIDO: los códigos no se reutilizan, se rechaza un código inexistente y hay un límite de intentos (PREG-038) | 03, 04, 05 |
| QA-25 | CORREGIDO: todo miembro ve el registro del sorteo y lo puede reproducir | 00, 03 |
| QA-26 | CORREGIDO: una versión nueva de la política se acepta antes de ver las juntas (PREG-043). Si hacen falta dos casillas de consentimiento queda como PREGUNTA ABIERTA en PREG-001 | 03, 05 |
| QA-27 | CORREGIDO: las reglas con fuente "Business Analyst" quedan marcadas para que el Product Owner las valide | 03 |
| QA-28 | CORREGIDO: prefijos de IDs y encabezado de versión en PRINCIPIO-001 | 00 |
| QA-29 | CORREGIDO: se declara `junta` como excepción a los identificadores en inglés | 00, 04 |
| QA-30 | CORREGIDO: se redefinen "junta activa" y "junta terminada", y se corrige la justificación de KPI-06 | 01, 04 |
| QA-31 | CORREGIDO: 20 términos nuevos en el glosario y una convención de nombres de tablas | 04 |
| QA-32 | CORREGIDO: hora del dispositivo, contador de cambios sin enviar y guardado de todas las juntas | 03 |
| QA-33 | CORREGIDO: catálogo de mensajes y formatos de entrada (PREG-044) | 03, 05 |
| QA-34 | CORREGIDO: el segundo factor rige desde que se publique F-11 | 00, 02 |
| QA-35 | CORREGIDO: las reglas escritas se editan solo antes del sorteo (PREG-016) | 02, 03, 05 |
| QA-36 | CORREGIDO: sujetos y patrones EARS normalizados | 03 |
| QA-37 | CORREGIDO: un solo conjunto de datos de ejemplo | 01, 03 |
| QA-38 | CORREGIDO: definiciones completas y sin términos de "No usar" | 01, 03, 04 |
| QA-39 | CORREGIDO: ejemplos de borde (600 s y año bisiesto) | 03 |
| QA-40 | PREGUNTA ABIERTA: si se acepta el carné de extranjería (PREG-045) | 05 |
| QA-41 | CORREGIDO: la convención de fechas de 03 queda explicada frente a los demás archivos | 03 |

**Criterio del conteo:** se cuentan como ambigüedades encontradas los 41 hallazgos de esta auditoría. Una ambigüedad está resuelta cuando quedó corregida en el spec-pack. Las que pasaron a una pregunta abierta no se cuentan como resueltas.

# ambigüedades encontradas: 41
# ambigüedades resueltas: 40
