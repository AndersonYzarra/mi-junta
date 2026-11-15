# Reporte de validación de los prototipos de Mi Junta

Versión: 0.2
Fecha: 15/11/2026
Estado: Borrador del Agente Prototype Reviewer. Falta la validación humana.

La v0.2 agrega la sección 7 (iteración 1 del prototipo) y el score después de la iteración (sección 6). Las secciones 1 a 5 describen el prototipo **antes** de la iteración y se conservan como registro.

Fuente: spec-pack/06-user-stories.md, spec-pack/03-reglas-de-negocio.md v0.4, spec-pack/09-ui-spec.md v1.0 y auditorias/descripcion-prototipos.md (borrador sin validar). Para confirmar detalles se leyeron los HTML de `prototipos/` y `prototipos/assets/datos.js`. Formato pensado para copiarlo a spec-pack/10-validation-log.md.

**Alcance:** las 24 pantallas, de P-001 a P-024. Se revisan gaps funcionales, no la estética.

**Criterio:** una regla está "reflejada" si un elemento de la pantalla la muestra o la hace cumplir en algún estado del prototipo. También cuenta si solo aparece como texto explicativo (por ejemplo, RN-158 en P-005). Lo que solo dice la nota "Solo en el prototipo" no cuenta, porque esa nota no es parte de la app.

---

## 1. Cobertura de HUs

### HU Must (11)

| HU | Título | Pantallas | Cobertura | Qué falta |
|---|---|---|---|---|
| HU-001 | Crear cuenta y verificar el correo | P-001, P-002, P-006, P-007 | Completa | La vigencia del enlace de 86,400 s no se ve en P-002 (RN-152). No se valida el formato del correo |
| HU-002 | Iniciar sesión y recuperar el acceso | P-003, P-004, P-005, P-006 | Completa | El fin del bloqueo solo se simula (RN-160). El cierre de sesiones (RN-158, RN-159) y el guardado de la versión aceptada (RN-169) pasan en el servidor |
| HU-004 | Crear una junta | P-008, P-011 | Completa | La junta creada no se guarda: P-011 abre la Junta Familia |
| HU-014 | Ajustar la junta antes del orden | P-012, P-011 | Parcial | El cambio de estado "Abierta"/"Completa" no se refleja (RN-100, RN-101). El mensaje para quitar después del orden no aparece (RN-114) |
| HU-005 | Unirse con el código | P-009, P-010 | Completa | El cupo nuevo solo existe en memoria. "Junta llena" es simulado (RN-018) |
| HU-006 | Ejecutar el sorteo auditable | P-011, P-013 | Parcial | El aviso de sorteo sin conexión no aparece en ningún estado (RN-029). El sorteo exitoso solo se ve marcando una casilla de la nota y siempre abre el registro de la Junta Oficina |
| HU-008 | Registrar y desmarcar pagos | P-014, P-015 | Parcial | "Esta cuota no tiene un pago registrado." no aparece (RN-131). El paso a "Terminada" y de vuelta a "En curso" no se ve (RN-103, RN-104) |
| HU-015 | Pagos sin conexión | P-015, P-016, P-003, P-006, P-017 | Parcial | El envío automático al reconectar no se simula (RN-087). Con un rechazo sin revisar, C-03 oculta cuántos cambios faltan (RN-174). El borrado del dispositivo no se ve (RN-197) |
| HU-010 | Ver el estado compartido | P-010, P-007, P-013, P-020 | Completa | — |
| HU-011 | Recordatorios por correo | P-017, P-008 | Parcial | Solo están el interruptor (RN-187) y la ayuda de "Días de aviso previo". El correo de recordatorio no tiene texto en 03 §2.9 ni prototipo (RN-144) |
| HU-019 | Proteger los datos frente al equipo | — | Sin pantalla, por diseño | 09 §1.2 la deja como escenario técnico (PREG-055, PREG-068) |

### HU Should (8)

Las 8 tienen pantalla: HU-003 (P-021, P-022), HU-007 (P-019, P-020), HU-009 (P-018, P-015), HU-012 (interruptor en P-017), HU-013 (P-008, P-012, P-010), HU-016 (interruptor en P-017), HU-017 (P-023) y HU-018 (P-024). HU-012 y HU-016 solo tienen su preferencia: el push y el correo de cuotas vencidas no tienen prototipo.

---

## 2. Reglas de negocio

### Reflejadas en la UI

Las screen specs citan 158 RN. **139 se reflejan** en al menos una pantalla. Por grupo:

- **Validaciones con su mensaje exacto del catálogo (03 §2.9):** creación de cuenta (RN-074, RN-085, RN-086, RN-146, RN-147, RN-150, RN-151, RN-180, RN-181), creación y edición de la junta (RN-002 a RN-005, RN-007 a RN-012, RN-096, RN-097, RN-108, RN-109, RN-179), código de invitación (RN-017 a RN-021, RN-116, RN-117, RN-129, RN-190), pagos (RN-054, RN-130, RN-132, RN-135, RN-136), segundo factor (RN-080, RN-081, RN-162 a RN-164, RN-166, RN-167) y borrar la cuenta (RN-182, RN-207).
- **Estados y permisos:** RN-027, RN-110, RN-114 (salir), RN-115, RN-122, RN-125, RN-126, RN-153, RN-168, RN-024 (P-013) y RN-120 (P-014).
- **Datos visibles por rol:** RN-022, RN-023, RN-025, RN-026, RN-037, RN-041, RN-118, RN-119, RN-121, RN-123, RN-183 y RN-195.
- **Sin conexión:** RN-094, RN-095, RN-170 (C-04 en las 24 pantallas), RN-172 a RN-175 y RN-198.
- **Solo como texto explicativo:** RN-013, RN-033, RN-035, RN-068, RN-079, RN-128, RN-155 (P-004), RN-158, RN-183 a RN-186 y RN-188. El usuario lee la regla, pero la pantalla no la hace cumplir.

Además, 13 RN que ninguna screen spec cita **se ven** en los prototipos: RN-015 (código de 8 caracteres en P-011), RN-036 (turno = posición en P-013), RN-043 (misma cuota en todas las rondas), RN-044 (el organizador que no participa no tiene "Sus cuotas" en la Junta Ventas), RN-047, RN-049 y RN-050 (vencimientos calculados, como 28/02/2027), RN-053 y RN-059 (estado al registrar y al desmarcar en P-015), RN-090 a RN-092 (trato de "usted" y formatos S/ y DD/MM/AAAA), RN-099 ("Abierta" en la junta recién creada) y RN-112 ("Quitar" en P-011).

### Invisibles

**Citadas por una screen spec, pero que no se ven (19):**

| RN | Pantalla | Por qué no se ve |
|---|---|---|
| RN-001 | P-008 | Es la ausencia de un límite; solo la menciona la nota |
| RN-016 | P-008 | La unicidad del código se controla en el servidor |
| RN-029 | P-011 | No hay ningún estado con todos los cupos ocupados y sin conexión |
| RN-030 | P-019 | Ninguna junta sin orden tiene un organizador que no participa |
| RN-039 | P-019 | El diálogo no menciona la fecha y hora. Sí se ve en P-020 (RN-195) |
| RN-100, RN-101 | P-012 | El estado resultante solo está en la nota |
| RN-103, RN-104 | P-015 | El cambio de estado de la junta solo está en la nota |
| RN-131 | P-015 | El estado "Cambiada en otro dispositivo" usa una cuota "Pendiente" |
| RN-152 | P-002 | La vigencia solo está en el correo de la nota |
| RN-159 | P-017 | Es una regla del servidor |
| RN-160 | P-003 | El fin del bloqueo se simula con un botón de la nota |
| RN-169 | P-006 | Es una regla del servidor |
| RN-189 | P-006 | Es una regla del servidor |
| RN-194 | P-015 | No hay ninguna pantalla ni texto para el aviso al participante |
| RN-197 | P-006, P-017 | Solo hay un `sessionStorage.clear()` |
| RN-209 | P-017 | Es una regla del servidor |
| RN-211 | P-024 | "Cerrar sin responder" no se registra |

**De las HU Must, sin pantalla por naturaleza (no son un gap de UI):** sorteo y cálculo (RN-031, RN-032, RN-042, RN-045, RN-046, RN-048, RN-102, RN-124), envío de recordatorios (RN-066, RN-067, RN-069 a RN-072, RN-141, RN-143 a RN-145, RN-199), seguridad y servidor (RN-040, RN-051, RN-076, RN-077, RN-082, RN-083, RN-171, RN-192) y HU-019 (RN-200 a RN-203). Necesitan tests de servidor (PRINCIPIO-011), no prototipos.

---

## 3. Flujo de usuario

| Flujo | ¿Se completa? | Fricción o callejón |
|---|---|---|
| UF-01 Crear cuenta y verificar | Sí, con un salto | Después de P-001, P-007 muestra el aviso de correo sin verificar, pero desde el prototipo no hay forma de abrir P-002: en la app real se llega desde el correo |
| UF-02 Iniciar sesión | Sí | El recorrido de Jorge P-003 → P-022 → P-006 (aceptación) → P-007 funciona completo |
| UF-03 Recuperar la contraseña | Sí | — |
| UF-04 Crear una junta | Sí | Al crear se abre la Junta Familia, no la junta escrita en el formulario |
| UF-05 Unirse con el código | Sí | Sin sesión: P-009 → P-003/P-001 → P-009 reenvía el código solo |
| UF-06 Ajustar la junta | Sí | P-012 acepta una ronda 1 anterior a hoy y no lo avisa; el rechazo llega después, en P-011 (RN-122) |
| UF-07 Ejecutar el sorteo | Solo con ayuda de la nota | Todas las rondas 1 ya vencieron: el sorteo siempre falla con RN-122, salvo que se marque la casilla de la nota, y el éxito abre el sorteo de otra junta |
| UF-08 Registrar y desmarcar | Sí, con fricción | P-015 no vuelve a P-014 después de registrar, como pide 09 |
| UF-09 Consultar la junta | Sí | — |
| UF-10 Informar y confirmar | Sí, con fricción | Con conexión, después de informar, P-010 sigue mostrando "Pendiente": parece que el informe falló (RN-060) |
| UF-11 Asignar el orden | Solo con ayuda de la nota | Igual que UF-07: falla con RN-122 salvo con la casilla de la nota |
| UF-12 Preferencias y cerrar sesión | Sí | Las preferencias no se guardan entre pantallas |
| UF-13 Salir de una junta | Sí | P-010 (Junta Familia) → diálogo → P-007 sin la junta |
| UF-14 Segundo factor | Sí | No hay ningún aviso después de activar o desactivar |
| UF-15 Borrar la cuenta | Sí, con fricción | La contraseña se revisa después de confirmar el diálogo "Esta acción no se puede deshacer." |

**Callejones sin salida:** no se encontraron. Todos los rechazos tienen una salida: "Pedir otro enlace", "Pedir otro código", "Editar junta" dentro del diálogo de RN-122, "Ir a Mis juntas" en sin permiso y "Volver a la junta" en P-018. La única pantalla que obliga a decidir es P-006 en modo aceptación (aceptar o cerrar sesión), y así lo pide RN-168.

---

## 4. Observaciones

Severidad: **Alta** bloquea una HU Must o contradice una regla; **Media** deja una regla sin verificar o confunde al usuario; **Baja** es una mejora.

| # | P-XXX | Observación | Tipo | Severidad | Acción sugerida | HU afectada |
|---|---|---|---|---|---|---|
| 1 | P-007, P-014, P-016 | C-03 de 09 reemplaza el contador por "Un cambio no se pudo guardar." cuando hay un rechazo sin revisar. Mientras tanto no se ve cuántos cambios faltan enviar, y RN-174 exige mostrarlo siempre | gap | Alta | Cambiar C-03 en 09 para mostrar los dos textos a la vez (rechazo y "{n} cambios sin enviar."). Requiere aprobación del PO | HU-015 |
| 2 | P-011 | "Necesita conexión a internet para ejecutar el sorteo." (RN-029) no aparece en ningún estado: sin conexión gana RN-027 o el botón ya no existe | gap | Alta | Agregar al prototipo un estado "Completa sin conexión" | HU-006 |
| 3 | P-011, P-019 | Todas las rondas 1 de datos.js ya vencieron: el sorteo y la asignación siempre fallan con RN-122, y el éxito solo se ve con una casilla de la nota | fricción | Alta | Agregar a datos.js una junta "Completa" con la ronda 1 posterior a hoy y sin orden fijado | HU-006, HU-007 |
| 4 | P-011 | Después del sorteo exitoso siempre se abre el registro de la Junta Oficina, no el de la junta sorteada | comprensión | Media | Que el éxito abra el registro de la junta de la URL | HU-006 |
| 5 | P-015 | "Esta cuota no tiene un pago registrado." (RN-131) no se puede ver: el estado de conflicto usa una cuota "Pendiente" | gap | Media | Que el estado "Cambiada en otro dispositivo" use una cuota "Pagada" y falle al desmarcar | HU-008, HU-015 |
| 6 | P-015, P-011 | El paso de la junta a "Terminada" y de vuelta a "En curso" (RN-103, RN-104) no se ve; 09 dice que P-011 lo refleja al volver | gap | Media | Agregar a P-015 un caso con la última cuota pendiente que, al registrarla, abra P-011 "Terminada" | HU-008 |
| 7 | P-012, P-011 | Bajar o subir la cantidad no cambia el estado "Completa"/"Abierta" en P-011 (RN-100, RN-101); solo lo dice la nota | gap | Media | Mostrar en P-011, al volver con `?aviso=guardado`, el estado nuevo calculado | HU-014 |
| 8 | P-012 | RN-009 compara con la fecha de creación de la junta, pero su mensaje dice "no puede ser anterior a hoy". En la edición, una fecha entre la creación y hoy se acepta, y una anterior a la creación muestra "anterior a hoy" | comprensión | Media | Proponer al PO otro texto para RN-009 en la edición, o validar contra hoy y unificar con RN-122. Nueva PREG en 05 | HU-014 |
| 9 | P-012 | Se puede guardar una ronda 1 ya vencida sin ningún aviso; el rechazo llega después en P-011 (RN-122) | fricción | Media | Proponer un aviso no bloqueante en P-012 con el texto de RN-122. Requiere texto en 09 §6 | HU-014, HU-006 |
| 10 | P-012 | El mensaje de RN-007 no puede aparecer en la edición: un grupo de opciones con valor no se puede desmarcar | comprensión | Baja | Anotar en 09 que RN-007 en P-012 solo aplica a peticiones directas a la API | HU-014 |
| 11 | P-011 | El mensaje de RN-114 para quitar participantes no aparece porque después del orden no hay "Quitar". Es correcto, pero la regla no se puede ver en la UI | comprensión | Baja | Cubrirla con un test de API (API-012), no con la UI | HU-014 |
| 12 | P-018, P-010 | Con conexión, después de informar el pago, P-010 sigue mostrando la cuota "Pendiente" junto al toast "Su pago quedó por confirmar." (RN-060) | fricción | Media | Que P-010 con `?aviso=informado` muestre la cuota "Por confirmar" | HU-009 |
| 13 | P-015, P-010 | Ninguna pantalla define cómo se entera el participante de que el organizador rechazó su pago (RN-194), ni cómo se entera el organizador de un pago informado (RN-139): no hay canal ni texto en 03 §2.9 | gap | Media | Proponer una PREG en 05: canal (correo o push) y texto de los avisos de RN-139 y RN-194 | HU-009 |
| 14 | P-017, P-008 | El correo de recordatorio no tiene texto en 03 §2.9 (RN-144 solo lista sus datos), así que HU-011 no se puede prototipar ni validar | gap | Alta | Proponer al PO el asunto y el cuerpo del recordatorio, y también el del aviso de cuotas vencidas (RN-196) | HU-011, HU-016 |
| 15 | P-016 | El envío automático al volver la conexión (RN-087) no se simula, y "Enviar ahora" siempre sale bien: no se ve un rechazo que no detiene los cambios siguientes (RN-171) | gap | Media | Agregar un estado "Reconectando" que envíe solo, con un cambio rechazado entre dos aceptados | HU-015 |
| 16 | P-006, P-017 | El borrado del dispositivo al cerrar sesión (RN-197) no se ve | gap | Baja | Que P-003 muestre, después de cerrar sesión, la ausencia del aviso de outbox (sin cambios guardados) | HU-015 |
| 17 | P-003 | El aviso de outbox no depende de qué cuenta inicia sesión (RN-176) | gap | Baja | Agregar un estado con otra cuenta en el que el aviso indique que los cambios no se envían con esa sesión. Requiere texto en 09 §6 | HU-015 |
| 18 | P-019 | El diálogo muestra al usuario "El código T9QW 3HZ5 dejará de servir (RN-129).": un ID de regla en un texto de la interfaz (PRINCIPIO-002) | gap | Media | Quitar "(RN-129)" del texto visible | HU-007 |
| 19 | P-024 | El error de una respuesta no entera muestra al usuario "[REQUIERE DECISIÓN] Texto pendiente…" | gap | Media | Decidir PREG-071 (rango, obligatoriedad y texto del error) antes de implementar | HU-018 |
| 20 | P-024 | "Cerrar sin responder" no se registra, así que no se puede comprobar que la encuesta no vuelva a aparecer (RN-210, RN-211). Ningún usuario de datos.js tiene la encuesta pendiente | gap | Baja | Guardar el cierre en sessionStorage y que P-007 no vuelva a abrir el diálogo | HU-018 |
| 21 | P-020 | Quien no es miembro empieza en "Error", pero si elige "Con datos" en el selector ve el registro completo. P-013 sí lo bloquea en todos los estados (RN-024, PRINCIPIO-006) | gap | Media | Bloquear todos los estados para quien no es miembro, como en P-013 | HU-007 |
| 22 | P-013 | En "Con datos", una junta sin sorteo (Junta Ventas) muestra el registro de la Junta Oficina | comprensión | Media | Que "Con datos" de una junta sin sorteo muestre el estado vacío | HU-006 |
| 23 | P-019 | No se puede probar que el organizador que no participa quede fuera de la lista (RN-030) | gap | Baja | Agregar a datos.js una junta sin orden con un organizador que no participa | HU-007, HU-014 |
| 24 | P-015 | Después de registrar, la pantalla no vuelve a P-014 como pide 09 | fricción | Baja | Volver a P-014 con el toast "Pago registrado." y la cuota actualizada | HU-008 |
| 25 | P-007 | En una junta "Terminada" de la que es participante, la tarjeta no muestra el rol. 09 lo pide pero no da el texto | comprensión | Baja | Proponer el texto en 09 §6 | HU-010 |
| 26 | P-001 | No se valida el formato del correo y 03 §2.9 no tiene un mensaje para eso | gap | Baja | Proponer una RN y su mensaje (siguiente ID libre, RN-213) | HU-001 |
| 27 | P-002 | La pantalla no dice hasta cuándo vale el enlace (RN-152); solo lo dice el correo | mejora | Baja | Evaluar si 09 agrega la vigencia en el estado de error de P-002 | HU-001 |
| 28 | P-023 | La contraseña se revisa después de confirmar "Esta acción no se puede deshacer.": el usuario confirma y después se entera de que la contraseña está mal | fricción | Baja | Proponer en 09 que el diálogo se abra solo después de que el servidor acepte la contraseña, o anotar el orden de API-033 | HU-017 |
| 29 | P-022 | El mensaje de código equivocado se ata a RN-166, que solo trata de la activación; ninguna RN cubre el código equivocado al iniciar sesión | gap | Baja | Resolver la propuesta del plan (nueva PREG en 05): atarlo a RN-078 o crear una RN | HU-003 |
| 30 | P-021 | No hay ningún aviso después de activar o desactivar el segundo factor; solo cambia "Estado:" | mejora | Baja | Proponer un toast C-08 en 09 §6 | HU-003 |
| 31 | P-006, P-010 | 09 no define el texto del error de red en esas pantallas; el prototipo usa el de RN-170, que habla de una acción y no de cargar datos | comprensión | Baja | Usar en 09 el texto de P-007 ("No pudimos cargar…") en todas las pantallas que cargan datos | HU-002, HU-010 |
| 32 | P-012 | El estado "Sin cupo para participar" (RN-109) es un supuesto: la Junta Familia tiene un cupo libre y Carmen ya participa | gap | Baja | Agregar a datos.js una junta "Completa" cuyo organizador no participa | HU-014 |

---

## 5. Decisiones

### Antes de implementar (requieren al Product Owner, PRINCIPIO-012)

1. **C-03 y RN-174 (obs. 1):** decidir cómo C-03 muestra a la vez un rechazo sin revisar y la cantidad de cambios sin enviar.
2. **Textos que faltan en 03 §2.9 (obs. 13 y 14):** asunto y cuerpo del recordatorio (RN-144), del aviso de cuotas vencidas (RN-196) y de los avisos de RN-139 y RN-194. Hay que definir el canal y el texto. Sin esto, HU-011 (Must) no se puede validar con el usuario.
3. **PREG-071 (obs. 19):** rango, obligatoriedad y mensaje de error de las respuestas numéricas de la encuesta.
4. **RN-009 en la edición (obs. 8 y 9):** decidir si la ronda 1 se compara con la creación o con hoy al editar, y si P-012 avisa antes de guardar una ronda 1 vencida.
5. **Trazabilidad del código equivocado al iniciar sesión (obs. 29)** y **formato del correo en P-001 (obs. 26):** abrir las PREG en 05-preguntas-abiertas.md con el siguiente número libre (PREG-073, si 09 §7.1 ya reservó PREG-069 a PREG-072).
6. **Textos de 09 §6 (obs. 25, 30 y 31):** rol en una junta "Terminada", aviso tras activar o desactivar el segundo factor y error de red al cargar datos.

### Ajustes al prototipo (no tocan spec-pack/)

7. Agregar a datos.js una junta "Completa", con la ronda 1 posterior a hoy y sin orden fijado, y otra con un organizador que no participa (obs. 3, 23 y 32). Con eso se pueden ver RN-029, RN-030 y RN-109 y se completan UF-07 y UF-11 sin la nota.
8. Quitar "(RN-129)" del diálogo de P-019 (obs. 18) y bloquear todos los estados de P-020 para quien no es miembro (obs. 21).
9. Corregir el destino del sorteo exitoso (obs. 4) y el estado "Con datos" de P-013 sin sorteo (obs. 22).
10. Hacer visibles RN-131, RN-103 y RN-104 en P-015 y el estado nuevo en P-011 (obs. 5, 6 y 7).
11. Simular el envío automático con un rechazo intermedio en P-016 (obs. 15) y mostrar "Por confirmar" en P-010 después de informar con conexión (obs. 12).

Las observaciones 1, 2, 3 y 14 son de severidad Alta: conviene cerrarlas antes de pasar a implementación.

---

## 6. Score de completitud

| Medida | Antes de la iteración | Después de la iteración 1 | Cálculo después |
|---|---|---|---|
| HU Must con pantalla | **90.9 %** | **90.9 %** | 10 de 11. HU-019 no tiene pantalla, por diseño |
| HU Must con su flujo completo en el prototipo | **45.5 %** (5 de 11) | **81.8 %** | 9 de 11: se suman HU-006, HU-008, HU-014 y HU-015. Sigue parcial HU-011 (falta el texto del correo, obs. #14) y HU-019 no tiene UI |
| HU Should con pantalla | **100 %** | **100 %** | 8 de 8. HU-012 y HU-016 solo tienen su preferencia |
| RN citadas por las screen specs que se reflejan | **88.0 %** (139 de 158) | **94.3 %** | 149 de 158 |
| Pares pantalla–RN del plan que se reflejan en su pantalla | **88.7 %** (212 de 239) | **93.3 %** | 223 de 239 (auditorias/descripcion-prototipos.md) |
| RN de las HU Must que se reflejan | **71.6 %** (116 de 162) | **80.2 %** | 130 de 162. De las 32 que faltan, 28 son de servidor, cálculo, recordatorios o seguridad (sección 2) |
| RN del catálogo que se reflejan | **71.7 %** (152 de 212) | **78.8 %** | 167 de 212 |

**RN citadas que todavía no se ven (9):** RN-001 y RN-016 (P-008), RN-039 (P-019; se ve en P-020), RN-152 (P-002), RN-159 y RN-209 (P-017), RN-160 (P-003), RN-189 (P-006) y RN-194 (P-015). Son reglas de servidor, la ausencia de un límite (RN-001), una regla que se ve en otra pantalla (RN-039) o reglas que necesitan un texto que no existe (obs. #13, #27).

**Lectura antes de la iteración:** la UI cubría casi todas las reglas que las screen specs piden mostrar. Lo que faltaba se concentraba en tres lugares: los datos de ejemplo (no permitían ver RN-029, RN-030, RN-109 ni un sorteo exitoso), los textos que no existen en 03 §2.9 (recordatorios y avisos de HU-011, HU-009 y HU-016) y la regla de C-03 frente a RN-174.

**Lectura después de la iteración 1:** el primer y el tercer grupo quedaron resueltos en el prototipo (sección 7). Lo que queda pendiente necesita una decisión del Product Owner en spec-pack/, sobre todo los textos de los correos y avisos (obs. #13 y #14).

**Limitaciones de este reporte:** se apoya en auditorias/descripcion-prototipos.md, que todavía no tiene validación humana. Las 14 RN "reflejadas sin cita" (las 13 de la sección 2 más RN-015) y los cambios de la iteración 1 se verificaron leyendo el código y con una simulación en Node (sección 7), no probando en un navegador. Ningún prototipo se probó a 768 px ni a 1024 px.

---

## 7. Iteración 1 del prototipo

Fecha: 15/11/2026. La hizo el agente con la autorización del usuario para resolver las observaciones y decidir por su cuenta. Solo cambió `prototipos/` (HTML y `assets/datos.js`), auditorias/descripcion-prototipos.md y auditorias/plan-prototipos.md ("Iterado: obs #N" en Notas). **No se modificó spec-pack/:** las observaciones que piden un texto, una regla o una pregunta nueva quedan para el Product Owner, porque la constitución no deja que un agente invente reglas ni cambie su significado (PRINCIPIO-012 a; CLAUDE.md, "Fuente de verdad").

### Decisión de diseño de la iteración

**Cambios de la sesión del prototipo (`MiJunta.store` en datos.js).** Lo que una pantalla guarda queda en sessionStorage y datos.js lo aplica al cargar, antes de calcular las rondas y las cuotas. Así una pantalla ve lo que guardó otra, como si viniera del servidor. Cubre unirse, salir, quitar, editar la junta, regenerar el código, fijar el orden, registrar, desmarcar, informar, confirmar o rechazar pagos, aceptar la política, cerrar sesión y cerrar la encuesta.

Con esta capa no hizo falta agregar juntas nuevas a datos.js. Agregarlas habría cambiado P-007, P-014, P-023 y otras pantallas que ya estaban validadas. En cambio, los casos que faltaban se recorren con los datos de siempre:

- **Sorteo exitoso (UF-05 → UF-06 → UF-07):** Lucía se une a la Junta Familia con T9QW3HZ5 en P-009 (12 de 12, "Completa"). Carmen cambia la ronda 1 a una fecha futura en P-012. Después ejecuta el sorteo en P-011, que abre el registro de esa junta en P-013.
- **RN-030 y RN-109:** Carmen guarda "No participo" con 11 participantes en P-012, y Lucía se une en P-009 (11 de 11). Ahora P-019 y el sorteo no incluyen a Carmen. Si Carmen vuelve a "Sí participo", ve el mensaje de RN-109.
- **RN-103 y RN-104:** en la cuota de la Junta Amigas en P-015, desmarcar el pago devuelve la junta a "En curso", y registrarlo otra vez la deja "Terminada".

El índice tiene el botón "Restablecer los datos de ejemplo" para volver a empezar.

**Sorteo con el algoritmo del anexo A.** P-011 ejecuta `fisher-yates-v1` tal como lo define el anexo A de 03 (RN-124), con HMAC-SHA256 de Web Crypto y una semilla de 256 bits de `crypto.getRandomValues` (RN-031). La implementación de `MiJunta.fisherYatesV1` se verificó en Node con dos pruebas:
- el vector de prueba del anexo A da `p05,p07,p02,p01,p08,p03,p09,p10,p04,p06`, el resultado esperado;
- la semilla y la lista de entrada de la Junta Oficina en datos.js dan su resultado guardado.

No cambia el algoritmo ni ninguna regla del sorteo. Si el navegador no tiene Web Crypto, P-011 muestra el registro de ejemplo de la Junta Oficina.

### Estado de cada observación

| # | P-XXX | Estado | Qué se hizo o por qué no |
|---|---|---|---|
| 1 | P-007, P-014, P-016 | Resuelta en el prototipo · Pendiente del PO en 09 | `getSyncIndicator` muestra los dos textos del catálogo: "Un cambio no se pudo guardar. 1 cambio sin enviar." (RN-174). Falta actualizar C-03 en 09 §3.0 para que coincida |
| 2 | P-011 | Resuelta | Estado nuevo "Completa sin conexión": se ve "Necesita conexión a internet para ejecutar el sorteo." (RN-029) |
| 3 | P-011, P-019, P-009, P-010 | Resuelta | Unirse, editar y fijar el orden quedan guardados. El sorteo y la asignación salen bien recorriendo el flujo, sin casillas. La casilla de la nota ahora guarda la ronda 1 en 30/01/2027 |
| 4 | P-011, P-013 | Resuelta | Sorteo real de la junta con fisher-yates-v1. P-013 muestra el registro de esa junta |
| 5 | P-015 | Resuelta | Estado nuevo "Desmarcada en otro dispositivo" con una cuota "Pagada": se ve "Esta cuota no tiene un pago registrado." (RN-131) |
| 6 | P-015, P-011, P-007 | Resuelta | `refreshJuntaStatus` aplica RN-103 y RN-104 después de cada cambio, y P-011 y P-007 muestran el estado nuevo |
| 7 | P-012, P-011 | Resuelta | Guardar aplica los datos, el estado "Abierta"/"Completa" y el cupo del organizador (RN-100, RN-101, RN-212) |
| 8 | P-012 | Pendiente del PO | El texto de RN-009 está en 03 §2.9; cambiarlo cambia el catálogo. Se propone una PREG en 05 (PREG-073 o el siguiente libre) |
| 9 | P-012 | Resuelta | Aviso no bloqueante debajo de la ronda 1 con el texto exacto de RN-122. No se agregó ningún texto nuevo |
| 10 | P-012 | Sin cambio (decisión) | Es correcto que el mensaje no aparezca: un grupo de opciones con valor no se puede desmarcar. En la edición, RN-007 se prueba con una petición directa a API-010 |
| 11 | P-011 | Sin cambio (decisión) | "Quitar" no existe después del orden, así que RN-114 (quitar) se prueba con un test de API-012 |
| 12 | P-018, P-010, P-014, P-015 | Resuelta | Informar con conexión deja la cuota "Por confirmar" en todas las pantallas. Sin conexión, P-010 marca esa misma cuota con "Sin enviar" |
| 13 | P-015, P-010 | Pendiente del PO | Faltan el canal y el texto de los avisos de RN-139 y RN-194; no se inventan |
| 14 | P-017, P-008 | Pendiente del PO | Falta el texto del correo de recordatorio (RN-144) y del aviso de cuotas vencidas (RN-196). HU-011 sigue parcial |
| 15 | P-016 | Resuelta | Estado nuevo "Vuelve la conexión": 3 cambios que se envían solos en orden. El del medio se rechaza con el texto de RN-172 y los demás se guardan (RN-087, RN-171) |
| 16 | P-006, P-017, P-023, P-003 | Resuelta | Cerrar sesión o borrar la cuenta llama a `clearDevice`: P-003, P-016 y C-03 ya no muestran los cambios sin enviar (RN-197). También se guarda la versión aceptada de la política (RN-169) |
| 17 | P-003 | Pendiente del PO | Para avisar que los cambios no se envían con otra cuenta hace falta un texto nuevo en 09 §6 |
| 18 | P-019 | Resuelta | Se quitó "(RN-129)" del texto visible del diálogo |
| 19 | P-024 | Pendiente del PO | El mensaje de error depende de PREG-071 (rango y obligatoriedad). Se deja el marcador [REQUIERE DECISIÓN] para que no se olvide |
| 20 | P-024 | Resuelta | "Cerrar sin responder" queda registrado y la pantalla abre en "Cerrada" (RN-210, RN-211) |
| 21 | P-020 | Resuelta | Quien no es miembro ve "No tiene acceso a esta junta." en todos los estados |
| 22 | P-013 | Resuelta | En una junta sin sorteo, "Con datos" muestra el caso vacío |
| 23 | P-019, P-011 | Resuelta | Se prueba con el flujo de RN-030 descrito arriba |
| 24 | P-015, P-014 | Resuelta | Con conexión, registrar vuelve a P-014 con el toast "Pago registrado." y la cuota ya pagada |
| 25 | P-007 | Pendiente del PO | Hace falta el texto del rol en 09 §6 |
| 26 | P-001 | Pendiente del PO | Hace falta una RN nueva (RN-213) con su mensaje |
| 27 | P-002 | Pendiente del PO | Hace falta un texto nuevo en 09 §6 |
| 28 | P-023 | Sin cambio (decisión) | API-033 recibe la contraseña y la confirmación en una sola llamada, así que no se puede validar la contraseña antes del diálogo sin cambiar la API (07). Queda como posible mejora para el PO |
| 29 | P-022 | Pendiente del PO | Es la PREG ya propuesta en el plan (Alertas) |
| 30 | P-021 | Pendiente del PO | Hace falta el texto del toast en 09 §6 |
| 31 | P-006, P-010 | Pendiente del PO | Hace falta un texto de error de carga general en 09 §6 |
| 32 | P-012 | Resuelta | RN-109 se ve con el flujo descrito arriba. El estado "Sin cupo para participar" sigue para verlo directo |

**Resumen:** 18 resueltas en el prototipo, 3 sin cambio por decisión y 11 pendientes del Product Owner. De las 4 de severidad Alta, quedan resueltas #1 (en el prototipo), #2 y #3. Sigue abierta #14, que bloquea validar HU-011.

### Verificación de la iteración

- Los scripts de las 25 páginas y de datos.js pasan una revisión de sintaxis en Node.
- En Node, con un sessionStorage de prueba y recargando datos.js entre pasos, se verificó:
  - Lucía se une: la Junta Familia pasa a 12 de 12 "Completa".
  - El sorteo da 12 rondas desde el 30/01/2027, anula el código ("Este código ya no es válido.") y asigna el turno de Lucía.
  - En la Junta Amigas, desmarcar la deja "En curso" y registrar la deja "Terminada".
  - C-03 muestra "Un cambio no se pudo guardar. 1 cambio sin enviar.".
  - Después de cerrar sesión, Jorge tiene 0 cambios sin enviar.
  - "Restablecer" vuelve a los datos de ejemplo.
- No se probó en un navegador. Falta abrir los prototipos y recorrer los flujos de la sección "Decisión de diseño" antes de validar.

### Lista de revisión

- [x] **Reporte de validación con cobertura de HUs y reglas:** secciones 1, 2 y 6, con los valores de antes y de después de la iteración.
- [x] **Observaciones clasificadas por tipo y severidad:** sección 4, con 32 observaciones. Por tipo: 18 gap, 7 comprensión, 5 fricción y 2 mejora. Por severidad: 4 Alta, 13 Media y 15 Baja. Cada una trazada a una HU y a una RN o pantalla.
- [x] **Al menos 1 iteración del prototipo incorporada:** esta sección. Son 18 observaciones resueltas en 17 pantallas, con los ✅/❌ actualizados en auditorias/descripcion-prototipos.md y "Iterado: obs #N" en auditorias/plan-prototipos.md.
