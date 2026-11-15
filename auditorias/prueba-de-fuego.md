# Prueba de fuego — Spec Pack v0.1
| # | Pregunta | Resumen de la respuesta | ¿Correcta o inventada? | Hueco detectado | Corrección aplicada |
|---|----------|-------------------------|------------------------|-----------------|---------------------|
| 1 | ¿Qué hace el producto y para quién? | Es una app web (Next.js + PostgreSQL, funciona sin conexión) que registra los pagos de una junta pero no mueve dinero (PRINCIPIO-004). El MVP es F-01 a F-06. Es para el organizador, que hoy dedica de 8 a 16 h al mes y quiere bajarlas en ≥ 80 % (KPI-05), y para el participante, que quiere saber su turno y quién pagó. Perfil de 18 a 40 años. Se lanza para todos los segmentos, gratis y sin publicidad, como base para una futura línea de préstamos (NO-04). | **Correcta.** Coincide con 01-project-brief.md §1 a §4, 02-alcance.md §1 y §3, PRINCIPIO-004 y PRINCIPIO-009. | Ninguno. | No hace falta. |
| 2 | ¿Qué pasa si un participante no paga en la fecha? | La cuota sigue "Pendiente". Hay recordatorios antes del vencimiento, el día del vencimiento y hasta 5 después, cada 2 días, entre 09:00 y 09:15 (RN-066, RN-068 a RN-072). Se pausan si la cuota está "Por confirmar" (RN-140). Si paga tarde, el pago es "atrasado" (RN-056). La junta no pasa a "Terminada" (RN-103), nadie sale (RN-114) y no hay multas (NO-06). Marca como no especificado lo que pasa después del 5.º recordatorio, el aviso al organizador, el pozo incompleto y el caso de quien ya cobró y deja de pagar. | **Correcta.** Las RN citadas dicen lo que afirma el modelo, y lo que marcó como no especificado no está en el spec-pack. Un matiz: lo que pasa después del 5.º recordatorio sí está definido, porque no se envían más (RN-071). El hueco es que no hay ninguna otra acción. | (a) Una cuota puede quedar "Pendiente" sin plazo, por ejemplo si quien ya cobró deja de pagar. Entonces la junta queda "En curso" para siempre (RN-103) y no hay regla para el pozo incompleto. (b) El organizador no recibe ningún aviso de cuotas vencidas, solo de pagos informados (RN-139). | Se agregaron PREG-046 (a) y PREG-047 (b) a 05-preguntas-abiertas.md v1.6. |
| 3 | ¿Cómo se define el orden de turnos y se puede cambiar? | Se fija una sola vez (RN-125), con todos los cupos llenos, con conexión y con la ronda 1 sin vencer (RN-027, RN-029, RN-122, RN-126). Puede salir de un sorteo `fisher-yates-v1` con semilla CSPRNG de 256 bits y registro inmutable (RN-031, RN-034, RN-035, RN-123, RN-124) o de una asignación manual (F-10: RN-038, RN-039, RN-127, RN-128). No se puede cambiar: otro sorteo recibe 409 (RN-028), solo se edita el nombre (RN-110) y el cambio de turno es F-13, que no está en esta versión. | **Correcta.** Las RN, el 409 del ejemplo de RN-028 y la nota sobre F-13 de 04-glosario.md coinciden. | Ninguno nuevo. El cambio de turno ya está declarado como F-13 (Could) y NO-13. | No hace falta. |
| 4 | ¿Un organizador puede ver las juntas o participantes de otro organizador? | No. A quien no es miembro el sistema le responde 403 (RN-024), y no existe un rol global. Si se une a otra junta como participante, ve solo los cuatro datos permitidos de los demás (RN-022) y el registro del sorteo (RN-121), y nunca sus datos personales (RN-023, PRINCIPIO-006). Marca como no especificados un listado o búsqueda de juntas y el acceso del equipo de la empresa. | **Correcta.** El caso del organizador que se une a otra junta como participante es una inferencia válida, porque ninguna regla lo impide (F-02, RN-015 a RN-021). | (a) Ninguna regla dice si el equipo de la empresa puede ver los datos ni cómo se registra ese acceso. (b) El listado o búsqueda de juntas no es un hueco: solo se entra a una junta con su código (F-02) y RN-024 cubre el acceso. | Se agregó PREG-048 (a) a 05-preguntas-abiertas.md v1.6. Para (b), no hace falta. |
| 5 | ¿Qué tres funcionalidades añadirías? | (a) Un aviso al organizador de las cuotas vencidas. (b) Recordatorios por WhatsApp. (c) Multas automáticas por atraso. | **No inventada.** El modelo no presenta ninguna como parte del spec-pack. Clasifica bien (b) como NO-02 (PREG-014) y (c) como NO-06, y dice que (a) no está ni dentro ni fuera del alcance. La numeración "desde RN-178" coincide con 03-reglas-de-negocio.md §3. | (a) es el mismo hueco (b) de la pregunta 2. | (a) quedó registrada como PREG-047. (b) y (c) no se agregan porque están fuera del alcance. |

**Resultado:** las 5 respuestas son correctas y ninguna inventa datos. Se verificaron contra spec-pack/ todas las RN, NO, F y PREG que se citan. Los 3 huecos quedaron como preguntas abiertas (PREG-046 a PREG-048). No se escribieron RN nuevas, porque cada hueco necesita una decisión del Product Owner (PRINCIPIO-012 a).

## Checklist

- [x] Usaste un chat nuevo sin historial.
- [x] Pegaste el Spec Pack completo como contexto: auditorias/spec-pack-v0.1-completo.md (00 a 05). Las respuestas citan contenido de los seis archivos.
- [x] Hiciste las 5 preguntas.
- [x] Evaluaste cada respuesta como correcta o inventada.
- [x] Corregiste los huecos en los archivos: PREG-046, PREG-047 y PREG-048 en spec-pack/05-preguntas-abiertas.md v1.6.

## Anexo: respuesta completa del modelo

Respuestas basadas solo en el Spec Pack de Mi Junta
1. Qué hace el producto y para quién

Mi Junta es una app web (Next.js + PostgreSQL, funciona sin conexión) para organizar juntas: grupos de ahorro rotativo donde cada participante paga una cuota en cada ronda y en cada ronda uno de ellos recibe el pozo completo.

La app no mueve dinero (PRINCIPIO-004). Los pagos se hacen fuera de ella (Yape, Plin, efectivo) y la app solo los registra. Reemplaza la combinación actual de WhatsApp + Excel. En el MVP (F-01 a F-06) permite:

crear una cuenta aceptando la política de privacidad;
crear juntas e invitar a otros con un código;
sortear los turnos de forma auditable y reproducible;
que el organizador registre los pagos;
que todos vean un estado compartido de la junta, con visibilidad limitada;
enviar recordatorios automáticos por correo.

Para quién:

Organizador (usuario principal): hoy dedica 8 a 16 h al mes a cobrar, recordar y actualizar el Excel. Quiere menos horas, menos discusiones y verse más serio ante el grupo. La meta es reducir esas horas en ≥ 80 % (KPI-05).
Participante: quiere saber cuándo le toca, si su pago quedó registrado y quién falta pagar, sin preguntarle al organizador.
Perfil de ambos: 18 a 40 años, usan Yape y Plin, tienen celular propio.
Segmentos: familia y compañeros de trabajo (observados). Mercados, vecinos y emprendedores son un supuesto sin datos (S-08). El lanzamiento va para todos a la vez.

Modelo de negocio: gratis y sin publicidad. La meta es atraer usuarios para una futura línea de préstamos, que es un proyecto aparte (NO-04).

2. Qué pasa si un participante no paga en la fecha

Lo que sí está especificado:

Estado de la cuota: sigue "Pendiente". Nada la cambia automáticamente.
Recordatorios por correo (y push si F-07 está activo), siempre entre 09:00 y 09:15 hora de Lima (RN-066):
uno antes del vencimiento, según los días de aviso previo (RN-068);
uno el día del vencimiento (RN-069);
después, uno cada 2 días, con un máximo de 5 (RN-070, RN-071).
Fin de los recordatorios: se detienen si la cuota pasa a "Pagada" (RN-072). Se pausan si está "Por confirmar" (RN-140, solo con F-08).
Contenido del recordatorio: solo habla de la cuota de esa persona, sin datos de otros (RN-145).
Si paga después: el organizador registra la fecha real de pago y el pago queda clasificado como "atrasado" (RN-056). Eso afecta KPI-03 y KPI-04.
Lo que ven los demás:
El organizador ve el estado de todas las cuotas y pagos (RN-120).
Los demás miembros ven el estado de la cuota de ese participante en la ronda actual y el de su próxima cuota (RN-022).
Cierre de la junta: no pasa a "Terminada" mientras quede alguna cuota sin pagar (RN-103).
Salir para no pagar: no es posible después del sorteo (RN-114).
Lo que la app no hace: no calcula multas, intereses ni penalidades (NO-06). Las reglas escritas de la junta (F-09) son solo texto visible que la app no aplica.

Lo que NO está especificado:

Qué pasa después del 5.º recordatorio post-vencimiento. No hay más acciones automáticas definidas.
Si el organizador recibe algún aviso de cuotas vencidas. Solo recibe avisos de pagos informados (RN-139).
Qué pasa con el pozo de esa ronda si falta una cuota: si se entrega incompleto, si se espera o quién cubre la diferencia. Registrar préstamos entre participantes está fuera de alcance (NO-10).
Qué pasa si alguien que ya cobró su turno deja de pagar definitivamente. El brief dice que no se reportaron casos, pero no hay ninguna regla para eso.
3. Cómo se define el orden de turnos y si se puede cambiar

Cómo se define: el orden se fija una sola vez por junta (RN-125) y requiere:

todos los cupos llenos (RN-027, RN-126);
conexión a internet (RN-029);
que la fecha de vencimiento de la ronda 1 no haya pasado (RN-122).

Hay dos formas de fijarlo:

Sorteo (F-03, Must):
Se genera una semilla de 256 bits con un generador criptográfico (RN-031).
La lista de entrada son los IDs de los participantes, ordenados por el momento en que ocuparon su cupo (RN-123).
Se aplica el algoritmo fisher-yates-v1 con HMAC-SHA256 y muestreo por rechazo, definido en el anexo A con un vector de prueba (RN-124).
Se guarda un registro inmutable con semilla, versión del algoritmo, entrada, resultado, quién lo ejecutó y cuándo (RN-034, RN-035).
Todo miembro puede ver ese registro y reproducir el sorteo (RN-121).
Asignación manual (F-10, Should, fuera del MVP): el organizador da a cada participante un turno distinto de 1 a n, por ejemplo según la necesidad (RN-127). También es inmutable y guarda quién lo asignó y cuándo (RN-038, RN-039, RN-128).

En ambos casos, el turno de cada participante es su posición en el orden, y en la ronda k cobra quien tiene el turno k (RN-036, RN-037). Si el organizador no participa, no entra a la lista (RN-030).

¿Se puede cambiar después? En esta versión, no:

No se puede volver a sortear: la API responde 409 (RN-028).
No se puede asignar un orden manual encima del sorteo (RN-125).
Después de fijar el orden, solo se puede editar el nombre de la junta (RN-110).
Nadie puede salir ni ser reemplazado (RN-114, NO-13).

PRINCIPIO-008 prevé que un cambio de turno futuro se guardaría como un evento aparte, sin tocar el registro original. Pero esa funcionalidad es F-13 (Could), que el glosario marca como "no está en esta versión", y no existe ninguna regla RN que diga cómo funcionaría.

4. ¿Un organizador puede ver las juntas o participantes de otro organizador?

Como organizador, no. Si un usuario que no es miembro de una junta pide sus datos, el sistema responde 403 (RN-024). PRINCIPIO-006 solo da al organizador acceso a los datos de las juntas que gestiona. No existe ningún rol global, de administrador o co-organizador con visibilidad sobre juntas ajenas.

Matiz: nada en el spec prohíbe que un organizador sea participante en la junta de otro. Por ejemplo, podría unirse con el código antes del sorteo. En ese caso vería esa junta con los permisos de un participante común:

de cada otro miembro, solo nombre, turno, estado de la cuota de la ronda actual, y fecha y estado de su próxima cuota (RN-022);
además, el registro del sorteo (RN-121).

En ningún caso vería los datos personales de nadie: celular, correo, DNI (PRINCIPIO-006, RN-023).

No especificado:

Si existe algún listado o búsqueda de juntas. No se menciona.
Qué ve el equipo de la empresa. No hay reglas sobre acceso interno.
5. Tres funcionalidades que añadiría

a) Resumen de cuotas vencidas para el organizador. Un correo o push que le diga al organizador qué cuotas siguen pendientes después del vencimiento.

Por qué: ataca directamente el dolor principal (horas persiguiendo pagos, KPI-05). Hoy solo recibe avisos de pagos informados (RN-139).
Encaje con el spec: respeta PRINCIPIO-006, porque el organizador ya puede ver esos datos (RN-120), y PRINCIPIO-007, porque usa correo y push.
¿Out-of-scope? No aparece ni dentro ni fuera del alcance. Habría que definir con el Product Owner cuándo y cada cuánto se envía (PRINCIPIO-012 a), y crear reglas nuevas desde RN-178.

b) Recordatorios por WhatsApp.

Por qué: el brief reconoce que los usuarios usan más WhatsApp que el correo (R-01, S-03).
¿Out-of-scope? Sí, es NO-02. Exigiría cambiar PRINCIPIO-007 con aprobación humana, y su revisión está prevista a los 3 meses del lanzamiento (PREG-014).

c) Multas automáticas por atraso según las reglas de la junta.

Por qué: los grupos de trabajo como el de Jorge quieren reglas claras que nadie discuta.
¿Out-of-scope? Sí, es NO-06. La app no mueve dinero (PRINCIPIO-004) y un agente no decide montos sin una regla escrita (PRINCIPIO-012 g). Hoy F-09 solo permite mostrar esas reglas como texto.

En resumen, dos de las tres (b y c) ya están explícitamente fuera de alcance. Solo la (a) es nueva y compatible con los principios actuales.
