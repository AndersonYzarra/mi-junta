# Plan de prototipos de Mi Junta

Fecha: 14/11/2026
Estado: Borrador

Fuente: spec-pack/09-ui-spec.md v1.0 (inventario §1.1, user flows §2 y screen specs §3) y spec-pack/03-reglas-de-negocio.md v0.4. Los prompts de cada pantalla están en `prompts/clase3/prototipos/P-XXX.xml` y salen de la plantilla `prompts/clase3/02-prototipo-visual.xml`.

**Cómo se armó:**
- **HUs:** el campo "HU" de la screen spec. (S) marca una HU Should dentro de una pantalla Must.
- **RN:** todas las RN que cita la screen spec de la pantalla en 09 §3. Cuando la screen spec remite a otra pantalla ("los mismos de P-021", "las mismas validaciones de P-008"), se suman las RN de lo que hereda (ver "Correcciones" en Alertas). Es la misma lista que reemplaza `{{REGLAS}}` en su prompt.
- **Flujo:** el primer flujo es el que agrupa la pantalla en su lote; entre paréntesis van los demás flujos de 09 §2 donde aparece.
- **Lotes:** hasta 5 pantallas por lote. Primero las Must agrupadas por flujo, después las Should. No hay pantallas Could: 09 §1.1 indica que F-12 a F-15 no tienen HU.

## Lotes

| Lote | Prioridad | Flujos | Pantallas |
|---|---|---|---|
| Lote 1 | Must | UF-01 Crear la cuenta y verificar el correo · UF-02 Iniciar sesión | P-003, P-001, P-002, P-006, P-007 |
| Lote 2 | Must | UF-03 Recuperar la contraseña · UF-12 Preferencias de notificación y cerrar sesión | P-004, P-005, P-017 |
| Lote 3 | Must | UF-04 Crear una junta · UF-06 Ajustar la junta · UF-07 Ejecutar el sorteo | P-008, P-011, P-012, P-013 |
| Lote 4 | Must | UF-05 Unirse a una junta · UF-09 Consultar el estado de la junta · UF-13 Salir de una junta | P-009, P-010 |
| Lote 5 | Must | UF-08 Registrar y desmarcar un pago | P-014, P-015, P-016 |
| Lote 6 | Should | UF-10 Informar y confirmar un pago · UF-11 Asignar el orden sin sorteo · UF-04 (encuesta) | P-018, P-019, P-020, P-024 |
| Lote 7 | Should | UF-14 Activar el segundo factor · UF-15 Borrar la cuenta · UF-02 (paso 3) | P-021, P-022, P-023 |

## Pantallas

| ID | Pantalla | Prioridad | HUs | RN | Flujo | Lote | Archivo HTML | Estado | Notas |
|---|---|---|---|---|---|---|---|---|---|
| P-003 | Iniciar sesión | Must | HU-002, HU-015 (RN-176) | RN-017, RN-075, RN-160, RN-161, RN-170, RN-176, RN-191 | UF-02 (también UF-01, UF-03, UF-05, UF-12, UF-15) | Lote 1 | prototipos/P-003-iniciar-sesion.html | Pendiente | Puerta de entrada de casi todos los flujos. Incluye el aviso de cambios pendientes con sesión vencida (RN-176). |
| P-001 | Crear cuenta | Must | HU-001 | RN-074, RN-085, RN-086, RN-088, RN-089, RN-146, RN-147, RN-148, RN-149, RN-150, RN-151, RN-170, RN-180, RN-181 | UF-01 (también UF-05) | Lote 1 | prototipos/P-001-crear-cuenta.html | Pendiente | "Crear cuenta" usa `disabled` real (C-04, excepción RN-089). Rótulo de consentimiento pendiente de revisión legal (PREG-069). |
| P-002 | Verificar correo | Must | HU-001 | RN-152, RN-154, RN-170 | UF-01 | Lote 1 | prototipos/P-002-verificar-correo.html | Pendiente | Verificación con botón, no al abrir el enlace (09 §7.2). |
| P-006 | Política de privacidad | Must | HU-001, HU-002 | RN-084, RN-168, RN-169, RN-170, RN-189, RN-197, RN-198 | UF-01 (también UF-02) | Lote 1 | prototipos/P-006-politica-privacidad.html | Pendiente | Dos modos: lectura y aceptación de versión nueva. El texto de la política es de relleno hasta que lo escriba el asesor legal (PREG-001). RN-197 y RN-198 heredadas de P-017 ("Cerrar sesión"). |
| P-007 | Mis juntas | Must | HU-010, HU-001, HU-004, HU-005, HU-018 (S) | RN-025, RN-153, RN-175 | UF-01 (también UF-02, UF-04, UF-09, UF-12, UF-13) | Lote 1 | prototipos/P-007-mis-juntas.html | Pendiente | Pantalla central: destino de UF-01 y UF-02 y origen de UF-04, UF-09 y UF-12. Estado vacío, aviso de correo sin verificar y modo sin conexión (C-02). |
| P-004 | Recuperar contraseña | Must | HU-002 | RN-155, RN-156, RN-170, RN-188 | UF-03 | Lote 2 | prototipos/P-004-recuperar-contrasena.html | Pendiente | Siempre muestra el mismo mensaje, exista o no el correo (RN-156). |
| P-005 | Nueva contraseña | Must | HU-002 | RN-074, RN-155, RN-157, RN-158, RN-170 | UF-03 | Lote 2 | prototipos/P-005-nueva-contrasena.html | Pendiente | Estado de enlace vencido o usado (RN-157). |
| P-017 | Mi cuenta | Must | HU-011, HU-002, HU-015, HU-012 (S), HU-016 (S), HU-003 (S), HU-017 (S) | RN-073, RN-159, RN-170, RN-187, RN-188, RN-197, RN-198, RN-208, RN-209 | UF-12 (también UF-14, UF-15) | Lote 2 | prototipos/P-017-mi-cuenta.html | Pendiente | Incluye controles Should (push, aviso de cuotas vencidas, segundo factor, borrar cuenta) marcados (S). Diálogo de cierre con cambios sin enviar (RN-198). |
| P-008 | Crear junta | Must | HU-004, HU-013 (S), HU-018 (S) | RN-001, RN-002, RN-003, RN-004, RN-005, RN-006, RN-007, RN-008, RN-009, RN-010, RN-011, RN-012, RN-015, RN-016, RN-041, RN-068, RN-096, RN-097, RN-098, RN-153, RN-170, RN-179 | UF-04 | Lote 3 | prototipos/P-008-crear-junta.html | Pendiente | Formulario más largo: 22 RN. Pozo por ronda calculado en vivo (RN-041). Campo "Reglas de la junta" es Should (HU-013). |
| P-011 | Junta: vista del organizador | Must | HU-014, HU-006, HU-010, HU-008, HU-005, HU-007 (S), HU-013 (S) | RN-013, RN-019, RN-020, RN-022, RN-025, RN-026, RN-027, RN-028, RN-029, RN-035, RN-037, RN-110, RN-114, RN-115, RN-119, RN-122, RN-125, RN-126, RN-129, RN-136, RN-170, RN-178 | UF-04 (también UF-06, UF-07, UF-08, UF-11) | Lote 3 | prototipos/P-011-junta-organizador.html | Pendiente | 2 wireframes en 09 (junta "Completa" y "En curso"). Comparte ruta con P-010 (ADR-009). Diálogo del sorteo (C-07). RN-022, RN-025, RN-026, RN-037 y RN-119 heredadas de P-010 ("Sus cuotas" y "Miembros"). |
| P-012 | Editar junta | Must | HU-014, HU-013 (S) | RN-002, RN-003, RN-004, RN-005, RN-006, RN-007, RN-008, RN-009, RN-010, RN-012, RN-041, RN-096, RN-097, RN-098, RN-100, RN-101, RN-106, RN-107, RN-108, RN-109, RN-110, RN-170, RN-179, RN-212 | UF-06 | Lote 3 | prototipos/P-012-editar-junta.html | Pendiente | Dos modos: antes de fijar el orden se cambia todo (RN-106); después, solo el nombre (RN-110). Wireframe de 09 del modo "después de fijar el orden". Validaciones y pozo heredados de P-008 (RN-107). |
| P-013 | Registro del sorteo | Must | HU-006 | RN-024, RN-033, RN-034, RN-035, RN-121, RN-123 | UF-07 (también UF-09) | Lote 3 | prototipos/P-013-registro-sorteo.html | Pendiente | Solo lectura. "Copiar datos del sorteo", sin verificador dentro de la app (09 §7.2). |
| P-009 | Unirse a una junta | Must | HU-005 | RN-017, RN-018, RN-019, RN-020, RN-021, RN-116, RN-117, RN-129, RN-153, RN-170, RN-190 | UF-05 | Lote 4 | prototipos/P-009-unirse-junta.html | Pendiente | Caso sin sesión: guarda el código y ofrece iniciar sesión o crear cuenta (RN-017). |
| P-010 | Junta: vista del participante | Must | HU-010, HU-005, HU-006, HU-013 (S), HU-009 (S), HU-007 (S) | RN-014, RN-022, RN-023, RN-025, RN-026, RN-037, RN-041, RN-061, RN-094, RN-095, RN-105, RN-111, RN-113, RN-114, RN-118, RN-119, RN-135, RN-170, RN-183 | UF-09 (también UF-05, UF-10, UF-13) | Lote 4 | prototipos/P-010-junta-participante.html | Pendiente | 3 wireframes en 09 (Resumen "En curso", Miembros, antes de fijar el orden). Solo datos de la junta permitidos para el participante (PRINCIPIO-006). |
| P-014 | Pagos de la junta | Must | HU-008, HU-015, HU-010, HU-009 (S) | RN-023, RN-105, RN-120, RN-130, RN-133, RN-136, RN-170, RN-178 | UF-08 (también UF-10) | Lote 5 | prototipos/P-014-pagos-junta.html | Pendiente | Tabla desde 1024 px y tarjetas por debajo (09 §7.2). Ancho máximo 1200 px (C-01). |
| P-015 | Detalle de la cuota | Must | HU-008, HU-015, HU-009 (S) | RN-052, RN-054, RN-055, RN-056, RN-057, RN-058, RN-062, RN-063, RN-103, RN-104, RN-130, RN-131, RN-132, RN-134, RN-138, RN-170, RN-173, RN-174, RN-194 | UF-08 (también UF-10) | Lote 5 | prototipos/P-015-detalle-cuota.html | Pendiente | 2 wireframes en 09 (cuota "Pendiente" y "Pagada" con corrección). Marca "Sin enviar" con cambio offline (RN-174). |
| P-016 | Cambios sin enviar | Must | HU-015, HU-009 (S) | RN-087, RN-170, RN-172, RN-173, RN-174, RN-176, RN-198 | UF-08 | Lote 5 | prototipos/P-016-cambios-sin-enviar.html | Pendiente | Muestra cambios rechazados al reconectar (RN-172). |
| P-018 | Informar mi pago | Should | HU-009 | RN-054, RN-060, RN-065, RN-132, RN-135, RN-136, RN-170 | UF-10 | Lote 6 | prototipos/P-018-informar-pago.html | Pendiente | Pasa la cuota a "Por confirmar". |
| P-019 | Asignar orden de turnos | Should | HU-007 | RN-030, RN-039, RN-122, RN-125, RN-126, RN-127, RN-128, RN-129, RN-170 | UF-11 | Lote 6 | prototipos/P-019-asignar-orden.html | Pendiente | Alternativa al sorteo (F-10). Diálogo de confirmación antes de guardar. |
| P-020 | Registro del orden asignado | Should | HU-007 | RN-093, RN-128, RN-177, RN-195 | UF-11 | Lote 6 | prototipos/P-020-registro-orden-asignado.html | Pendiente | Solo lectura. |
| P-024 | Encuesta de KPI-05 | Should | HU-018 | RN-206, RN-210, RN-211 | UF-04 | Lote 6 | prototipos/P-024-encuesta-kpi-05.html | Pendiente | No tiene ruta propia: es un diálogo sobre P-007 o P-011. Rango de las respuestas numéricas abierto (PREG-071, [REQUIERE DECISIÓN]). |
| P-021 | Segundo factor | Should | HU-003 | RN-079, RN-080, RN-081, RN-162, RN-163, RN-164, RN-165, RN-166, RN-167, RN-170 | UF-14 | Lote 7 | prototipos/P-021-segundo-factor.html | Pendiente | Código de 6 dígitos, 600 s, 5 intentos (PRINCIPIO-005). RN-165 agregada: "Activar segundo factor" envía el código. |
| P-022 | Código de verificación al iniciar sesión | Should | HU-003 | RN-078, RN-079, RN-080, RN-081, RN-162, RN-163, RN-164, RN-166, RN-170 | UF-02 | Lote 7 | prototipos/P-022-codigo-verificacion.html | Pendiente | Paso 3 de UF-02. Mensajes heredados de P-021, más RN-078 y RN-079 (inicio de sesión con segundo factor). RN-166 solo como fuente del texto "El código no es correcto…" (ver Alertas). |
| P-023 | Borrar mi cuenta | Should | HU-017 | RN-170, RN-182, RN-183, RN-184, RN-185, RN-186, RN-207 | UF-15 | Lote 7 | prototipos/P-023-borrar-cuenta.html | Pendiente | Rechazos por junta en curso (RN-182) o junta organizada sin orden fijado (RN-207). |

## Alertas

Revisión hecha el 14/11/2026 sobre spec-pack/09-ui-spec.md v1.0 y spec-pack/03-reglas-de-negocio.md v0.4.

### Pantallas sin screen spec o sin wireframe textual en 09

- **Ninguna.** Las 24 pantallas del inventario (P-001 a P-024) tienen screen spec en 09 §3 y al menos un wireframe de 360 px. P-010 tiene 3 wireframes, y P-011 y P-015 tienen 2 cada una.
- **Solo informativo:** ninguna screen spec trae un wireframe desde 768 px o 1024 px. Para desktop solo hay una descripción en texto ("Desde 768 px…"), así que el prototipo responsive interpreta esa descripción.

### Pantallas sin RN o sin HU

- **Ninguna pantalla está sin HU ni sin RN.**
- **5 pantallas remitían a otra pantalla sin citar sus RN.** Se corrigió en sus prompts (ver "Correcciones aplicadas").
- **P-024 · Encuesta de KPI-05** tiene RN y HU, pero el rango de sus dos respuestas numéricas sigue abierto (PREG-071, [REQUIERE DECISIÓN]). Mientras no se decida, el prototipo no pone rango ni hace obligatoria ninguna respuesta (09 §7.1).
- **Solo informativo:** HU-019 (Must) no tiene pantalla, y así está previsto en 09 §1.2 (escenarios técnicos, PREG-055).

### RN citadas que no existen en 03

- **Ninguna.** Las 24 screen specs citan 156 RN distintas, y todas están definidas en 03-reglas-de-negocio.md (RN-001 a RN-212). Con las correcciones, los 24 prompts citan 158 RN distintas (se suman RN-078 y RN-165), y todas existen en 03.
- El tema de cada RN se verificó solo para las RN agregadas en las correcciones. Las demás se copiaron tal como las cita 09.

### Correcciones aplicadas

Las decidió el agente el 14/11/2026, con autorización del usuario. Solo cambian la línea `{{REGLAS}}` de 5 prompts y esta tabla. No se modificó `spec-pack/`.

| Pantalla | Qué decía 09 | RN agregadas al prompt | Por qué |
|---|---|---|---|
| P-006 | "Cerrar sesión" con "las mismas reglas de P-017" | RN-197, RN-198 | Son las reglas de cerrar sesión en P-017: borrar los datos del dispositivo y avisar si hay cambios sin enviar. RN-159 no se agregó porque es del servidor y no se ve en la pantalla |
| P-011 | "Sus cuotas" y "Miembros" "igual que P-010" | RN-022, RN-025, RN-026, RN-037, RN-119 | Son las RN que P-010 cita en esas dos secciones: turno propio, cuotas propias, fecha en que recibe el pozo, datos visibles de cada miembro y última ronda sin próxima cuota |
| P-012 | "Las mismas validaciones de P-008" (RN-107) y "los mismos campos de P-008" | RN-002 a RN-010, RN-012, RN-041, RN-096, RN-097, RN-098, RN-179 | Son las validaciones de P-008 para los campos que RN-106 deja editar, más el pozo calculado (RN-041). No se agregaron RN-001, RN-011, RN-015, RN-016, RN-068 ni RN-153: tratan del límite de juntas, el valor inicial del formulario, el código de invitación, el envío de recordatorios y el correo sin verificar, que no son validaciones de la edición |
| P-021 | "Activar segundo factor" envía un código, sin citar RN | RN-165 | RN-165 es la regla de enviar el código al pedir la activación |
| P-022 | "Los mismos mensajes de P-021" y "campo igual que en P-021" | RN-078, RN-079, RN-080, RN-081, RN-162, RN-163, RN-164, RN-166 | RN-080, RN-081, RN-162, RN-163, RN-164 y RN-166 son las fuentes de esos mensajes en el catálogo de 03 §2.9. RN-078 (no iniciar sesión sin código) y RN-079 (enviar el código al iniciar sesión) son el propósito mismo de la pantalla. RN-193 no se agregó porque solo cambia cómo cuenta el servidor los pedidos de código |

### Propuestas para el Product Owner

Requieren editar `spec-pack/`, así que no se aplicaron (PRINCIPIO-012 b):

- **Citar las RN heredadas en las screen specs** de P-006, P-011, P-012, P-021 y P-022 en 09, para que 09 y los prompts coincidan.
- **Trazabilidad del mensaje "El código no es correcto. Revíselo e intente de nuevo."** El catálogo de 03 §2.9 lo ata a RN-166, que solo trata de la activación del segundo factor. P-022 usa el mismo mensaje al iniciar sesión, y ninguna RN cubre el código equivocado en el inicio de sesión. Se propone una pregunta nueva en 05-preguntas-abiertas.md: ¿se ata el mensaje también a RN-078, o se crea una RN para el código equivocado al iniciar sesión?
