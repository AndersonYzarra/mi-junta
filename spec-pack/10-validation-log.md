# Validation log de Mi Junta

Versión: 1.0
Fecha: 15/11/2026
Estado: Aprobado

La v1.0 aprueba este documento, con la aprobación del usuario del 15/11/2026, junto con los otros 10 archivos del spec-pack. No cambia su contenido: solo cambia la cabecera y las fuentes, que ahora citan la v1.0 de cada archivo. Esta aprobación reinicia la numeración en 1.0. Las notas de historia de este y de los demás archivos que citan 10-validation-log.md v1.0, v1.1 o v1.2 se refieren a los borradores anteriores a esta aprobación.

Fuente: auditorias/prototype-review.md v0.2 (reporte del Agente Prototype Reviewer, con la iteración 1 del prototipo), 00-constitucion.md v1.0, 03-reglas-de-negocio.md v1.0, 04-glosario.md v1.0, 08-backlog.md v1.0 y 09-ui-spec.md v1.0. Lo redactó el Agente Consolidador de Validación (prompts/clase3/04-consolidador.xml).

La v1.1 cierra el estado de cada observación y registra lo que se aplicó al consolidar, con la autorización del usuario del 15/11/2026: las filas 1, 10, 19 y 34 a 36, en prototipos/ y en 09-ui-spec.md v1.1, y las tareas ⏳ BACKLOG T-028 a T-030 en 08-backlog.md v0.5.

---

## Fuentes consolidadas

| Fuente | Archivo | Observaciones |
|---|---|---|
| Compañero | auditorias/feedback-companero.md (no existe) | Ninguna. El prompt indica "NO hay feedback de compañero" |
| Agente Reviewer | auditorias/prototype-review.md v0.2 | Las 32 de su sección 4, más 4 que el reporte menciona en las secciones 1, 3, 6 y 7 sin darles una fila en la sección 4 |
| Propia | auditorias/observaciones-propias.md (no existe) | Ninguna. El prompt indica "NO hay observaciones propias" |

**Cómo se consolidó:**
- **Trazabilidad:** la columna "Fuente" da el número de la observación en la sección 4 del reporte ("obs. #N") o la sección de donde sale la fila.
- **Duplicados:** como hay una sola fuente, no hubo filas de dos fuentes para combinar. Dentro del reporte, las fricciones de la sección 3 (flujos UF-NN) y los faltantes de la sección 1 (HU) que repiten una observación de la sección 4 se combinaron en esa fila, y se citan en "Fuente".
- **Filas 18 y 34 a 36:** salen de las secciones 3, 6 y 7 del reporte. El reporte no les da tipo ni severidad, así que el consolidador los asignó con el criterio del reporte. Para las filas 34 a 36 se comprobó en `prototipos/` que la iteración 1 no las resolvió.
- **Severidad (criterio del reporte):** **Alta** bloquea una HU Must o contradice una regla, **Media** deja una regla sin verificar o confunde al usuario y **Baja** es una mejora.
- **Orden:** primero las de severidad Alta, después Media y al final Baja. Con la misma severidad, siguen el orden del reporte.

---

## 1. Tabla de observaciones

| # | P-XXX | Observación | Fuente | Tipo | Severidad | Acción sugerida | HU afectada |
|---|---|---|---|---|---|---|---|
| 1 | P-007, P-014, P-016 | Si hay un rechazo sin revisar, C-03 de 09 cambia el contador por "Un cambio no se pudo guardar.". Mientras tanto no se ve cuántos cambios faltan enviar, y RN-174 exige mostrarlo siempre | Agente Reviewer (obs. #1; §1 HU-015) | gap | Alta | Cambiar C-03 en 09 §3.0 para que muestre los dos textos a la vez, como ya hace el prototipo. Requiere aprobación del PO | HU-015 (RN-174) |
| 2 | P-011 | "Necesita conexión a internet para ejecutar el sorteo." no aparece en ningún estado: sin conexión gana RN-027, o el botón ya no existe | Agente Reviewer (obs. #2; §1 HU-006) | gap | Alta | Agregar al prototipo el estado "Completa sin conexión" | HU-006 (RN-029) |
| 3 | P-011, P-019 | Todas las rondas 1 de datos.js ya vencieron. El sorteo y la asignación siempre fallan con RN-122, y el éxito solo se ve marcando una casilla de la nota | Agente Reviewer (obs. #3; §3 UF-07 y UF-11) | fricción | Alta | Permitir recorrer el sorteo exitoso con los datos de ejemplo, sin la casilla de la nota | HU-006, HU-007 (RN-122) |
| 4 | P-017, P-008 | El correo de recordatorio no tiene texto en 03 §2.9, porque RN-144 solo lista sus datos. Por eso HU-011 no se puede prototipar ni validar. Tampoco tiene texto el aviso de cuotas vencidas | Agente Reviewer (obs. #14; §1 HU-011) | gap | Alta | Proponer al PO el cuerpo del recordatorio y pasar a 03 §2.9 el asunto y el aviso de cuotas vencidas, que ya aparecen en los ejemplos de RN-144 y RN-196 | HU-011, HU-016 (RN-144, RN-196) |
| 5 | P-011 | Después del sorteo exitoso siempre se abre el registro de la Junta Oficina, no el de la junta sorteada | Agente Reviewer (obs. #4) | comprensión | Media | Que el éxito abra el registro de la junta de la URL | HU-006 (RN-124) |
| 6 | P-015 | No se puede ver "Esta cuota no tiene un pago registrado.": el estado de conflicto usa una cuota "Pendiente" | Agente Reviewer (obs. #5) | gap | Media | Que el estado "Cambiada en otro dispositivo" use una cuota "Pagada" y falle al desmarcar | HU-008, HU-015 (RN-131) |
| 7 | P-015, P-011 | No se ve el paso de la junta a "Terminada" ni la vuelta a "En curso". 09 dice que P-011 lo refleja al volver | Agente Reviewer (obs. #6; §1 HU-008) | gap | Media | Agregar a P-015 un caso con la última cuota pendiente que, al registrarla, abra P-011 en "Terminada" | HU-008 (RN-103, RN-104) |
| 8 | P-012, P-011 | Bajar o subir la cantidad de participantes no cambia el estado "Completa"/"Abierta" en P-011; solo lo dice la nota | Agente Reviewer (obs. #7; §1 HU-014) | gap | Media | Mostrar en P-011, al volver con `?aviso=guardado`, el estado nuevo calculado | HU-014 (RN-100, RN-101) |
| 9 | P-012 | RN-009 compara con la fecha de creación de la junta, pero su mensaje dice "no puede ser anterior a hoy". Al editar, una fecha entre la creación y hoy se acepta, y una anterior a la creación muestra "anterior a hoy" | Agente Reviewer (obs. #8) | comprensión | Media | Pedir al PO que decida otro texto para RN-009 en la edición, o validar contra hoy y unificar con RN-122. Abrir una PREG en 05 | HU-014 (RN-009, RN-122) |
| 10 | P-012 | Se puede guardar una ronda 1 ya vencida sin ningún aviso; el rechazo llega después, en P-011 | Agente Reviewer (obs. #9; §3 UF-06) | fricción | Media | Mostrar en P-012 un aviso no bloqueante con el texto de RN-122 | HU-014, HU-006 (RN-122) |
| 11 | P-018, P-010 | Con conexión, después de informar el pago, P-010 sigue mostrando la cuota "Pendiente" junto al toast "Su pago quedó por confirmar." | Agente Reviewer (obs. #12; §3 UF-10) | fricción | Media | Que P-010 con `?aviso=informado` muestre la cuota "Por confirmar" | HU-009 (RN-060) |
| 12 | P-015, P-010 | Ninguna pantalla define cómo se entera el participante de que el organizador rechazó su pago, ni cómo se entera el organizador de un pago informado. No hay canal ni texto en 03 §2.9 | Agente Reviewer (obs. #13) | gap | Media | Abrir una PREG en 05 para que el PO adopte como textos del catálogo los ejemplos de RN-139 y RN-194, que ya dan el canal y el texto, o redacte otros | HU-009 (RN-139, RN-194) |
| 13 | P-016 | El envío automático al volver la conexión no se simula, y "Enviar ahora" siempre sale bien. No se ve que un rechazo no detiene los cambios siguientes | Agente Reviewer (obs. #15; §1 HU-015) | gap | Media | Agregar un estado "Reconectando" que envíe solo, con un cambio rechazado entre dos aceptados | HU-015 (RN-087, RN-171) |
| 14 | P-019 | El diálogo muestra al usuario "El código T9QW 3HZ5 dejará de servir (RN-129).", es decir, un ID de regla en un texto de la interfaz | Agente Reviewer (obs. #18) | gap | Media | Quitar "(RN-129)" del texto visible | HU-007 (RN-129, PRINCIPIO-002) |
| 15 | P-024 | El error de una respuesta que no es un número entero muestra al usuario "[REQUIERE DECISIÓN] Texto pendiente…" | Agente Reviewer (obs. #19) | gap | Media | Decidir PREG-071 (rango, obligatoriedad y texto del error) antes de implementar | HU-018 (RN-206, PREG-071) |
| 16 | P-020 | Quien no es miembro empieza en "Error", pero si elige "Con datos" en el selector ve el registro completo. P-013 sí lo bloquea en todos los estados | Agente Reviewer (obs. #21) | gap | Media | Bloquear todos los estados para quien no es miembro, como en P-013 | HU-007 (RN-024, PRINCIPIO-006) |
| 17 | P-013 | En "Con datos", una junta sin sorteo (Junta Ventas) muestra el registro de la Junta Oficina | Agente Reviewer (obs. #22) | comprensión | Media | Que "Con datos" muestre el caso vacío en una junta sin sorteo | HU-006 (RN-121) |
| 18 | P-001 a P-024 | Los cambios de la iteración 1 se verificaron leyendo el código y con una simulación en Node, no en un navegador. Ningún prototipo se probó a 768 px ni a 1024 px | Agente Reviewer (§6 "Limitaciones" y §7 "Verificación") | gap | Media | Abrir los prototipos en un navegador, recorrer los flujos de §7 ("Decisión de diseño") y revisar cada pantalla a 360, 768, 1024 y 1440 px | Todas las HU con pantalla (PRINCIPIO-010) |
| 19 | P-012 | El mensaje de RN-007 no puede aparecer en la edición, porque un grupo de opciones que ya tiene un valor no se puede desmarcar | Agente Reviewer (obs. #10) | comprensión | Baja | Anotar en 09 que, en P-012, RN-007 solo se aplica a peticiones directas a la API | HU-014 (RN-007) |
| 20 | P-011 | El mensaje de RN-114 para quitar participantes no aparece, porque después de fijar el orden no hay "Quitar". Es correcto, pero la regla no se puede ver en la UI | Agente Reviewer (obs. #11; §1 HU-014) | comprensión | Baja | Cubrirla con un test de API-012, no con la UI | HU-014 (RN-114) |
| 21 | P-006, P-017 | No se ve que al cerrar sesión se borren del dispositivo los datos del usuario | Agente Reviewer (obs. #16; §1 HU-015) | gap | Baja | Que P-003, después de cerrar sesión, ya no muestre el aviso de cambios sin enviar | HU-015 (RN-197) |
| 22 | P-003 | El aviso de cambios sin enviar no depende de qué cuenta inicia sesión | Agente Reviewer (obs. #17) | gap | Baja | Agregar un estado con otra cuenta en el que el aviso diga que los cambios no se envían con esa sesión. Requiere un texto en 09 §6 | HU-015 (RN-176) |
| 23 | P-024 | "Cerrar sin responder" no se registra, así que no se puede comprobar que la encuesta no vuelva a aparecer. Ningún usuario de datos.js tiene la encuesta pendiente | Agente Reviewer (obs. #20) | gap | Baja | Guardar el cierre en sessionStorage y que P-007 no vuelva a abrir el diálogo | HU-018 (RN-210, RN-211) |
| 24 | P-019 | No se puede probar que el organizador que no participa quede fuera de la lista | Agente Reviewer (obs. #23) | gap | Baja | Permitir recorrer una junta sin orden con un organizador que no participa | HU-007, HU-014 (RN-030) |
| 25 | P-015 | Después de registrar, la pantalla no vuelve a P-014, como pide 09 | Agente Reviewer (obs. #24; §3 UF-08) | fricción | Baja | Volver a P-014 con el toast "Pago registrado." y la cuota actualizada | HU-008 (RN-053) |
| 26 | P-007 | La tarjeta de una junta "Terminada" de la que el usuario es participante no muestra su rol. 09 lo pide, pero no da el texto | Agente Reviewer (obs. #25) | comprensión | Baja | Proponer el texto en 09 §6 | HU-010 |
| 27 | P-001 | No se valida el formato del correo, y 03 §2.9 no tiene un mensaje para eso | Agente Reviewer (obs. #26; §1 HU-001) | gap | Baja | Proponer una RN nueva con su mensaje (RN-213, el siguiente ID libre de 03) | HU-001 (RN-213 propuesta) |
| 28 | P-002 | La pantalla no dice hasta cuándo vale el enlace; solo lo dice el correo | Agente Reviewer (obs. #27; §1 HU-001) | mejora | Baja | Evaluar si 09 agrega la vigencia al estado de error de P-002 | HU-001 (RN-152) |
| 29 | P-023 | La contraseña se revisa después de confirmar "Esta acción no se puede deshacer.": el usuario confirma y recién después se entera de que la contraseña está mal | Agente Reviewer (obs. #28; §3 UF-15) | fricción | Baja | Proponer en 09 que el diálogo se abra solo después de que el servidor acepte la contraseña, o anotar el orden de API-033 | HU-017 (RN-182, API-033) |
| 30 | P-022 | El mensaje de código equivocado se ata a RN-166, que solo trata de la activación. Ninguna RN cubre el código equivocado al iniciar sesión | Agente Reviewer (obs. #29) | gap | Baja | Abrir una PREG en 05: atar el mensaje a RN-078 o crear una RN | HU-003 (RN-166, RN-078) |
| 31 | P-021 | No hay ningún aviso después de activar o desactivar el segundo factor; solo cambia "Estado:" | Agente Reviewer (obs. #30; §3 UF-14) | mejora | Baja | Proponer un toast C-08 en 09 §6 | HU-003 |
| 32 | P-006, P-010 | 09 no define el texto del error de red en esas pantallas. El prototipo usa el de RN-170, que habla de una acción y no de cargar datos | Agente Reviewer (obs. #31) | comprensión | Baja | Usar en 09 el texto de P-007 ("No pudimos cargar…") en todas las pantallas que cargan datos | HU-002, HU-010 (RN-170) |
| 33 | P-012 | El estado "Sin cupo para participar" es un supuesto: la Junta Familia tiene un cupo libre y Carmen ya participa | Agente Reviewer (obs. #32) | gap | Baja | Permitir ver el caso con una junta "Completa" cuyo organizador no participa | HU-014 (RN-109) |
| 34 | P-008, P-011 | La junta creada no se guarda: al crear se abre la Junta Familia, no la junta escrita en el formulario | Agente Reviewer (§1 HU-004; §3 UF-04) | comprensión | Baja | Guardar la junta creada en `MiJunta.store` y abrir P-011 con esa junta | HU-004 (RN-099) |
| 35 | P-017 | Las preferencias de notificación no se guardan entre pantallas | Agente Reviewer (§3 UF-12) | fricción | Baja | Guardar las preferencias en `MiJunta.store`, como los demás cambios de la sesión del prototipo | HU-011 (RN-187) |
| 36 | P-001, P-002, P-007 | Después de P-001, P-007 muestra el aviso de correo sin verificar, pero desde el recorrido no hay forma de abrir P-002 (en la app real se llega desde el correo). Hoy solo se abre desde el índice | Agente Reviewer (§3 UF-01) | comprensión | Baja | Agregar en la nota de P-007 un enlace "Abrir el enlace del correo (P-002)" | HU-001 (RN-152, RN-153) |

**Totales:** 36 observaciones. Por tipo: 19 gap, 9 comprensión, 6 fricción y 2 mejora. Por severidad: 4 Alta, 14 Media y 18 Baja.

---

## 2. Decisiones tomadas

**Estados:**
- **✅ APLICADA (iteración Paso 5):** se aplicó en la iteración 1 del prototipo (auditorias/prototype-review.md §7).
- **✅ APLICADA (consolidación):** se aplicó al consolidar este log, el 15/11/2026, con la autorización del usuario para decidir por su cuenta. Tocó prototipos/, 09-ui-spec.md v1.1 y 08-backlog.md v0.5.
- **⏳ PENDIENTE:** es importante y necesita más trabajo o una decisión del Product Owner (PRINCIPIO-012) antes de implementar.
- **⏳ BACKLOG (T-NNN):** es una mejora futura, con su tarea en 08-backlog.md v0.5. Las tareas nuevas siguen a T-027, la última tarea de 08 v0.4.

| # | Obs. de origen | Estado | Detalle |
|---|---|---|---|
| 1 | #1 | ✅ APLICADA (iteración Paso 5 y consolidación) | En el prototipo, `getSyncIndicator` muestra "Un cambio no se pudo guardar. 1 cambio sin enviar.". En la consolidación, C-03 de 09 §3.0 y su fila de 09 §6 pasan a pedir los dos textos a la vez (RN-174). Se cambió 09 y no 03: el cambio hace que 09 cumpla una RN que ya existía, sin cambiar su significado |
| 2 | #2 | ✅ APLICADA (iteración Paso 5) | Estado nuevo "Completa sin conexión" en P-011. 09 ya lo pedía en P-011, "Sin conexión" |
| 3 | #3 | ✅ APLICADA (iteración Paso 5) | `MiJunta.store` guarda unirse, editar y fijar el orden. El sorteo y la asignación salen bien recorriendo el flujo, sin las casillas de la nota |
| 4 | #14 | ⏳ PENDIENTE | Decisión del PO (propuesta: PREG-075). Sin estos textos, HU-011 (Must) no se puede validar con el usuario. **Nota del consolidador:** 03 ya trae parte del texto en los ejemplos de sus reglas, aunque no en el catálogo §2.9. El ejemplo de RN-144 y el criterio de T-018 dan el asunto ("Junta Oficina: su cuota de la ronda 3, de S/ 1,000.00, vence el 30/01/2027"), y el ejemplo de RN-196 da el texto del aviso de cuotas vencidas. Falta el cuerpo del recordatorio, y que el PO pase los tres textos a §2.9 |
| 5 | #4 | ✅ APLICADA (iteración Paso 5) | P-011 ejecuta `fisher-yates-v1` con la junta de la URL, y P-013 muestra su registro |
| 6 | #5 | ✅ APLICADA (iteración Paso 5) | Estado nuevo "Desmarcada en otro dispositivo" con una cuota "Pagada". 09 P-015 ya tenía el mensaje de RN-131 |
| 7 | #6 | ✅ APLICADA (iteración Paso 5) | `refreshJuntaStatus` aplica RN-103 y RN-104, y P-011 y P-007 muestran el estado nuevo |
| 8 | #7 | ✅ APLICADA (iteración Paso 5) | Al guardar en P-012 se aplican los datos, el estado y el cupo del organizador (RN-100, RN-101, RN-212) |
| 9 | #8 | ⏳ PENDIENTE | Decisión del PO (propuesta: PREG-073). Cambiar el texto de RN-009 cambia el catálogo de 03 §2.9 |
| 10 | #9 | ✅ APLICADA (iteración Paso 5 y consolidación) | En el prototipo, el aviso no bloqueante con el texto exacto de RN-122 se agregó en el Paso 5. En la consolidación, la screen spec de P-012 en 09 describe el aviso y suma el estado "con la ronda 1 vencida". No se agregó ningún texto nuevo |
| 11 | #12 | ✅ APLICADA (iteración Paso 5) | Informar con conexión deja la cuota "Por confirmar" en P-010, P-014 y P-015 |
| 12 | #13 | ⏳ PENDIENTE | Decisión del PO (propuesta: PREG-074). **Nota del consolidador:** el canal y un texto ya están en los ejemplos de 03, aunque no en el catálogo §2.9. RN-139 va por correo ("Lucía informó el pago de su cuota de la ronda 3 de la Junta Oficina. Confírmelo o recházelo en Mi Junta"). RN-194 va por correo y, si el usuario lo activó, por push; así lo confirma también el término "Aviso de pago rechazado" de 04. Falta que el PO los adopte como textos del catálogo. HU-009 es Should: conviene decidirlo antes de descomponerla |
| 13 | #15 | ✅ APLICADA (iteración Paso 5) | Estado nuevo "Vuelve la conexión": 3 cambios se envían solos y en orden, y el del medio se rechaza con el texto de RN-172 |
| 14 | #18 | ✅ APLICADA (iteración Paso 5) | Se quitó "(RN-129)" del texto visible. En 09, el texto del diálogo ya no lo tenía |
| 15 | #19 | ⏳ PENDIENTE | Decidir PREG-071 (09 §7.1). Bloquea el lanzamiento, porque HU-018 bloquea el MVP (08, "Bloqueos externos") |
| 16 | #21 | ✅ APLICADA (iteración Paso 5) | Quien no es miembro ve "No tiene acceso a esta junta." en todos los estados de P-020 |
| 17 | #22 | ✅ APLICADA (iteración Paso 5) | En una junta sin sorteo, "Con datos" muestra el caso vacío |
| 18 | §6, §7 | ⏳ PENDIENTE | Validación humana en el navegador antes de cerrar este log: los flujos de la iteración 1, los cambios de la consolidación (filas 34 a 36) y los anchos de PRINCIPIO-010. La hace el usuario, no el agente |
| 19 | #10 | ✅ APLICADA (consolidación) | 09 P-012 anota que el mensaje de RN-007 no puede aparecer en la pantalla. El criterio de T-011 en 08 suma una petición directa a API-010 con la frecuencia "bimestral", que recibe `422` con el mensaje de RN-007. No se creó ningún ID |
| 20 | #11 | ✅ APLICADA (iteración Paso 5): sin cambio, por decisión | Ya la cubre el criterio de T-011 ("en una junta `in_progress` … quitar a Pedro reciben `409` `TURN_ORDER_FIXED`") |
| 21 | #16 | ✅ APLICADA (iteración Paso 5) | Cerrar sesión o borrar la cuenta llama a `clearDevice` (RN-197). También se guarda la versión aceptada de la política (RN-169) |
| 22 | #17 | ⏳ BACKLOG (T-030) | Espera que el PO apruebe el texto del aviso en 09 §6 |
| 23 | #20 | ✅ APLICADA (iteración Paso 5) | "Cerrar sin responder" queda registrado y la pantalla abre en "Cerrada" |
| 24 | #23 | ✅ APLICADA (iteración Paso 5) | Se prueba con el flujo de RN-030 de §7: Carmen guarda "No participo" y Lucía se une |
| 25 | #24 | ✅ APLICADA (iteración Paso 5) | Con conexión, registrar vuelve a P-014 con el toast "Pago registrado." |
| 26 | #25 | ⏳ BACKLOG (T-029) | Espera el texto del rol en 09 §6 |
| 27 | #26 | ⏳ BACKLOG (T-028) | Espera la decisión del PO (propuesta: PREG-076) y la RN-213 que salga de ella |
| 28 | #27 | ⏳ BACKLOG (T-029) | Espera el texto de la vigencia en 09 §6 |
| 29 | #28 | ⏳ BACKLOG (descomposición de HU-017, desde T-031) | La iteración no lo cambió, por decisión: API-033 recibe la contraseña y la confirmación en una sola llamada. Cambiarlo toca 07 y la autenticación. No tiene un ID propio porque dependería de tareas de HU-017 que todavía no existen, y 08 pide que cada tarea dependa solo de números menores |
| 30 | #29 | ⏳ BACKLOG (descomposición de HU-003, desde T-031) | Espera la decisión del PO (propuesta: PREG-077). Sin un ID propio, por el mismo motivo que la fila 29 |
| 31 | #30 | ⏳ BACKLOG (descomposición de HU-003, desde T-031) | Espera el texto del toast en 09 §6. Sin un ID propio, por el mismo motivo que la fila 29 |
| 32 | #31 | ⏳ BACKLOG (T-029) | Espera el texto de error de carga en 09 §6 |
| 33 | #32 | ✅ APLICADA (iteración Paso 5) | RN-109 se ve con el flujo de §7. El estado "Sin cupo para participar" se conserva para verlo directo |
| 34 | §1, §3 UF-04 | ✅ APLICADA (consolidación) | P-008 guarda la junta creada en `MiJunta.store` (`addJunta`), con la membresía del organizador (RN-006) y un código de 8 caracteres (RN-015, RN-016), y abre P-011 de esa junta, o P-024 si es la primera junta. 09 P-008 ya lo pedía ("`201`: abre P-011") |
| 35 | §3 UF-12 | ✅ APLICADA (consolidación) | P-017 guarda cada preferencia con `MiJunta.store.patchUser`, y las demás pantallas la leen al cargar |
| 36 | §3 UF-01 | ✅ APLICADA (consolidación) | La nota de P-007 tiene el enlace "Abrir el enlace del correo (P-002)" cuando Rosa tiene el correo sin verificar. Además, verificar en P-002 guarda `emailVerifiedAt`, así que el recorrido sigue a P-008 sin el rechazo de RN-153 |

**Resumen:** de las 36 filas:
- **23 aplicadas:**
  - 19 en la iteración del Paso 5. Una de ellas, la fila 20, quedó sin cambio por decisión.
  - 4 en la consolidación: 19, 34, 35 y 36.
  - Las filas 1 y 10 también se completaron en 09 durante la consolidación.
- **5 pendientes:** 4, 9, 12, 15 y 18.
- **8 en el backlog:** 22, 26, 27, 28 y 32, con T-028 a T-030, y 29, 30 y 31, que se incluyen al descomponer HU-003 y HU-017.

### Qué falta antes de implementar

1. **Fila 4 (Alta, HU-011 Must):** que el PO decida el cuerpo del recordatorio y pase a 03 §2.9 los textos de RN-144 y RN-196. Es la única observación Alta que sigue abierta.
2. **Fila 18:** probar en un navegador la iteración 1 y la consolidación, a 360, 768, 1024 y 1440 px.
3. **Filas 9, 12 y 15 (Media):** abrir PREG-073 y PREG-074 y decidir PREG-071.
4. **Revisión del PO de 09 v1.1 y 08 v0.5:** los cambios de la consolidación quedan en borrador hasta entonces.

### Preguntas que se proponen para 05-preguntas-abiertas.md

09 §7.1 ya usa PREG-069 a PREG-072, que todavía no están registradas en 05. Los números siguientes son una propuesta y valen si 05 registra esas cuatro primero. Este paso no modificó 05.

| PREG propuesta | Pregunta | Fila |
|---|---|---|
| PREG-073 | Al editar la junta, ¿la ronda 1 se compara con la fecha de creación o con hoy, y qué texto muestra RN-009? | 9 |
| PREG-074 | ¿Se adoptan como textos del catálogo §2.9 los ejemplos de RN-139 (por correo) y RN-194 (por correo y push), o se redactan otros? | 12 |
| PREG-075 | ¿Cuál es el cuerpo del correo de recordatorio (RN-144), y se adoptan como textos del catálogo el asunto de su ejemplo y el texto del ejemplo de RN-196? | 4 |
| PREG-076 | ¿Se valida el formato del correo en "Crear cuenta", con qué regla y con qué mensaje? (crearía RN-213) | 27 |
| PREG-077 | ¿Qué RN cubre el código de segundo factor equivocado al iniciar sesión: RN-078 o una RN nueva? | 30 |

### Tareas agregadas a 08-backlog.md v0.5

Siguen a T-027 y cada una depende solo de tareas con un número menor. Las HU Should se descomponen desde T-031.

| ID | Tarea | HU | Tamaño | Dependencias | Bloqueo | Filas |
|---|---|---|---|---|---|---|
| T-028 | Validar el formato del correo al crear la cuenta | HU-001 | M | T-007, T-021 | PREG-076 y RN-213 | 27 |
| T-029 | Mostrar los textos nuevos de 09 §6 en la verificación del correo, Mis juntas y los errores de carga | HU-001, HU-002, HU-010 | M | T-021, T-022, T-023 | Textos de 09 §6 | 26, 28, 32 |
| T-030 | Avisar en "Iniciar sesión" de quién son los cambios sin enviar | HU-015 | M | T-020, T-021 | Texto de 09 §6 | 22 |

---

## 3. Archivos actualizados

### En la iteración del Paso 5

| Archivo | Cambio | Filas |
|---|---|---|
| prototipos/*.html (17 pantallas) y prototipos/assets/datos.js | `MiJunta.store`, `fisherYatesV1`, `refreshJuntaStatus`, `clearDevice` y los estados nuevos | 1 a 3, 5 a 8, 10, 11, 13, 14, 16, 17, 21, 23 a 25, 33 |
| auditorias/descripcion-prototipos.md | ✅/❌ actualizados | Las mismas |
| auditorias/plan-prototipos.md | "Iterado: obs #N" en Notas | Las mismas |

### En la consolidación (15/11/2026)

| Archivo | Cambio | Filas |
|---|---|---|
| prototipos/assets/datos.js | `newJuntas` en la sesión del prototipo y `MiJunta.store.addJunta` | 34 |
| prototipos/P-008-crear-junta.html | Guarda la junta creada con su membresía y su código, y abre esa junta | 34 |
| prototipos/P-017-mi-cuenta.html | Guarda las preferencias con `patchUser` | 35 |
| prototipos/P-007-mis-juntas.html | Enlace a P-002 en la nota del prototipo | 36 |
| prototipos/P-002-verificar-correo.html | Verificar guarda `emailVerifiedAt` | 36 |
| spec-pack/09-ui-spec.md (v1.0 → v1.1) | C-03 con el rechazo y el contador. P-012 con el aviso de RN-122, la nota de RN-007 y el estado nuevo. Fila de C-03 en §6 | 1, 10, 19 |
| spec-pack/08-backlog.md (v0.4 → v0.5) | T-028 a T-030 con su formato completo, el caso de RN-007 en el criterio de T-011, "desde T-031" para las HU Should, y el resumen, la ruta crítica, el diagrama y los bloqueos actualizados | 19, 22, 26 a 32 |
| spec-pack/10-validation-log.md (v1.0 → v1.1) | Este log | Todas |

**spec-pack/04-glosario.md:** no cambió. Ninguna observación aplicada cambia ni agrega un término. Los estados nuevos del prototipo, como "Completa sin conexión" o "Vuelve la conexión", son estados de pantalla, no términos del dominio.

Los scripts de las 25 páginas y de datos.js pasan una revisión de sintaxis en Node. En Node, con un sessionStorage de prueba y recargando datos.js, se verificó que:
- una junta creada sigue ahí después de recargar, "Abierta", con 1 cupo ocupado y su código vigente;
- una preferencia guardada se lee desde otra carga;
- "Restablecer" borra ambas cosas.

No se probó en un navegador (fila 18).

### Pendientes de una decisión del Product Owner

| Archivo | Cambio | Filas |
|---|---|---|
| spec-pack/03-reglas-de-negocio.md | §2.9: cuerpo del recordatorio y textos de RN-144, RN-196, RN-139 y RN-194; otro texto de RN-009 en la edición, si se decide; RN-213 nueva con su mensaje; RN del código equivocado al iniciar sesión, si PREG-077 no lo ata a RN-078 | 4, 9, 12, 27, 30 |
| spec-pack/05-preguntas-abiertas.md | Registrar PREG-069 a PREG-072 (09 §7.1) y abrir PREG-073 a PREG-077 | 4, 9, 12, 27, 30 |
| spec-pack/09-ui-spec.md | En §6: el aviso de cambios de otra cuenta en P-003, el rol en una junta "Terminada", la vigencia en P-002, el toast del segundo factor y el error de carga general. En P-023, el orden del diálogo, si se acepta la fila 29 | 22, 26, 28, 29, 31, 32 |
| spec-pack/07-architecture.md | API-033 en dos pasos, solo si el PO acepta la fila 29 al descomponer HU-017 | 29 |

---

## 4. Seguimiento del 15/11/2026 (Agente Spec Finalizer)

La v1.2 registra qué filas cerró la auditoría auditorias/spec-finalizer.md, con la autorización del usuario para decidir por su cuenta. Las decisiones están en 03-reglas-de-negocio.md v0.5 §1.5 y en 05-preguntas-abiertas.md v0.5, y el Product Owner puede revertirlas (PREG-079). Las tablas de las secciones 1 a 3 no cambian.

| Fila | Estado nuevo | Cómo se cerró |
|---|---|---|
| 4 | ✅ CERRADA | PREG-075: asunto y cuerpo del recordatorio y texto del aviso de cuotas vencidas en 03 §2.9. T-018 los usa |
| 9 | ✅ CERRADA | PREG-073: RN-009 compara con la creación, su mensaje y el código `ROUND1_BEFORE_CREATION` dicen lo mismo, y T-011 lo prueba |
| 12 | ✅ CERRADA | PREG-074: los textos de RN-139 y RN-194 pasan a 03 §2.9 |
| 15 | ✅ CERRADA | PREG-071: RN-214 y RN-215. HU-018 se descompone en T-032 y T-033 |
| 22 | ✅ CERRADA | Texto del aviso de otra cuenta en 09 v1.2 §6. T-030 ya no está bloqueada |
| 26, 28, 32 | ✅ CERRADAS | Textos del rol en una junta "Terminada", de la vigencia del enlace y del error de carga en 09 v1.2 §6. T-029 ya no está bloqueada |
| 27 | ✅ CERRADA | PREG-076: RN-213 con su mensaje. T-028 ya no está bloqueada |
| 30 | ✅ CERRADA | PREG-077: el mensaje queda atado a RN-078 y RN-166, sin RN nueva |
| 31 | ✅ CERRADA | Toasts "Segundo factor activado." y "Segundo factor desactivado." en 09 v1.2 §6 |
| 18 | ⏳ PENDIENTE | La prueba en el navegador sigue a cargo del usuario (PREG-083) |
| 29 | ⏳ BACKLOG | Se decide al descomponer HU-017, desde T-034 |
