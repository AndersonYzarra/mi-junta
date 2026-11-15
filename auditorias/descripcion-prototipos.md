Borrador generado por agente — Validado por: (pendiente)

# Descripción de los prototipos de Mi Junta

Fecha: 15/11/2026
Fuente: el código de cada HTML de `prototipos/` (con `assets/datos.js`, `assets/estados.js` y `assets/estilos.css`), comparado con auditorias/plan-prototipos.md, spec-pack/09-ui-spec.md v1.0 y spec-pack/03-reglas-de-negocio.md v0.4. Orden: el de la tabla "Pantallas" del plan.

**Criterio:**
- ✅ solo si hay un elemento o una lógica concreta del HTML que cumple la regla y se ve en la pantalla, en alguno de sus estados o al usarla. Se nombra el elemento (id, texto o estado).
- ❌ si la regla del plan no se ve en la pantalla, o si falta un elemento de la screen spec. Lo que solo aparece en la nota "Solo en el prototipo" (`.proto-note`) cuenta como ❌, porque esa nota no es parte de la app.
- "Estados que funcionan" son las opciones del selector "Estado:" que inserta `estados.js`, más los estados propios de cada pantalla.

**Iteración 1 (15/11/2026):** las líneas que dicen "iteración 1, obs. #N" cambiaron con las correcciones de auditorias/prototype-review.md §7. Desde esta iteración, lo que se guarda en una pantalla (unirse, salir, quitar, editar, regenerar el código, fijar el orden, registrar o informar un pago, aceptar la política, cerrar sesión) se ve en las demás mientras la pestaña siga abierta (`MiJunta.store` en datos.js). El índice tiene "Restablecer los datos de ejemplo".

=== P-003 · Iniciar sesión === (Must · HU-002, HU-015)
- Encabezado C-01 solo con "Mi Junta" (lleva a P-003), sin enlaces ni barra inferior, porque no hay sesión.
- Barra C-02 "Sin conexión. Última sincronización: 29/12/2026 18:30" en el estado "Sin conexión".
- Tarjeta con: aviso de outbox "Tiene 1 cambio sin enviar. Inicie sesión para enviarlos." (`#aviso-outbox`), aviso de código guardado (`#aviso-codigo`), aviso "Su contraseña se cambió. Inicie sesión con la nueva." (`?aviso=contrasena`) y aviso "Su cuenta fue borrada." (`?aviso=cuenta-borrada`, viene de P-023).
- h1 "Iniciar sesión", resumen de error con `role="alert"` y foco, campo "Correo" (`type="email"`), campo "Contraseña" con botón "Mostrar contraseña" (`aria-pressed`).
- Enlace "¿Olvidó su contraseña?" (P-004), botón principal "Iniciar sesión", separador "o" y botón secundario "Crear cuenta" (P-001; conserva `?codigo=`).
- Al entrar: Lucía va a P-007, Jorge a P-022 (segundo factor), Rosa a P-007 sin verificar; con `?codigo=` va a P-009.
- Nota del prototipo con las cuentas de prueba (contraseña Junta2026), el contador de intentos fallidos y el botón "Simular que pasaron los 15 minutos del bloqueo".
- Estados que funcionan: Con datos (correo de Jorge y aviso de outbox) · Vacío (inicial) · Error (resumen con RN-075) · Loading (botón con carga y `disabled`) · Bloqueada (resumen con RN-161) · Sin conexión · Con avisos (código guardado y contraseña cambiada).
✅ Aviso de código guardado con el texto "Inicie sesión o cree su cuenta para unirse a la junta.", y después de iniciar sesión pasa a P-009 con el código sin unirse antes (RN-017)
✅ "El correo o la contraseña no son correctos." en el resumen, sin decir cuál dato falló; al 5.º fallo seguido de la misma cuenta se bloquea (`failures[k] >= 5`) (RN-075)
✅ Con la cuenta bloqueada, el resumen muestra "Demasiados intentos fallidos. Intente de nuevo en 15 minutos." y el intento no suma al contador (RN-161)
✅ "Iniciar sesión" sin conexión queda con `aria-disabled="true"`, muestra "Necesita conexión a internet para hacer esto." debajo y lleva el foco al motivo sin enviar (RN-170)
✅ Aviso "Tiene 1 cambio sin enviar. Inicie sesión para enviarlos." en los estados Con datos y Con avisos (RN-176)
✅ El correo se compara en minúsculas (`key()`), así que "Lucia@Example.com" con la contraseña correcta entra (RN-191)
✅ Después de cerrar sesión en P-006, P-017 o P-023, el aviso "Tiene 1 cambio sin enviar." ya no aparece, porque el dispositivo ya no guarda esos cambios; la nota lo explica (RN-197; iteración 1, obs. #16)
❌ El fin del bloqueo y el contador en 0 solo se ven con el botón de la nota del prototipo; la pantalla no muestra cuándo termina el bloqueo (RN-160)
❌ No se ve que los cambios se envíen después de iniciar sesión ni que no se envíen si entra otra cuenta: el aviso de outbox no depende de la cuenta que inicia sesión (RN-176)

=== P-001 · Crear cuenta === (Must · HU-001)
- Encabezado C-01 solo con "Mi Junta" (lleva a P-003), sin navegación.
- Barra C-02 en el estado "Sin conexión".
- h1 "Crear cuenta" con el texto "Con su cuenta podrá crear juntas o unirse a una con su código."
- Aviso con el texto de RN-017 si llega con `?codigo=` (viene de P-009).
- Resumen de errores (`role="alert"`) con cada error como enlace al campo.
- Formulario: "Nombre" (`maxlength="80"`), "Correo" (`type="email"`), "Contraseña" con la ayuda "Al menos 8 caracteres." y botón "Mostrar contraseña", "DNI (opcional)" (`maxlength="8"`, numérico), "Celular (opcional)" (`maxlength="9"`, numérico).
- Casilla "Acepto la política de privacidad y recibir notificaciones por correo y push." con enlace a P-006 (guarda lo escrito en sessionStorage y lo repone al volver) y casilla "Soy mayor de 18 años".
- Botón principal "Crear cuenta" y enlace "Ya tengo una cuenta" (P-003, conserva el código).
- Al crear: abre P-007 con la cuenta de Rosa (sin verificar), o P-009 si había código.
- Nota del prototipo con los datos de Lucía para probar duplicados y la frase "No existen los campos 'Fecha de nacimiento' ni 'Foto' (RN-149)".
- Estados que funcionan: Con datos (datos de Ana, casillas desmarcadas) · Vacío (inicial) · Error (nombre corto, correo repetido, contraseña corta, DNI y celular mal escritos, sin la casilla de edad) · Loading (botón con carga y `disabled`) · Sin conexión.
✅ "Su contraseña debe tener al menos 8 caracteres." al salir del campo y al enviar (RN-074)
✅ "Ingrese un DNI de 8 dígitos." si el DNI escrito no tiene 8 dígitos (RN-085)
✅ "Ingrese un celular de 9 dígitos que empiece con 9." si el celular no cumple el patrón (RN-086)
✅ Las dos casillas no traen `checked` y cada cambio de estado las desmarca (RN-088)
✅ "Crear cuenta" tiene `disabled` real hasta marcar el consentimiento (`syncButton()`) (RN-089)
✅ "Complete su nombre, su correo y su contraseña." en el resumen si falta alguno de los tres (RN-146)
✅ "Su nombre debe tener entre 2 y 80 caracteres." con un nombre de 1 carácter (estado Error) (RN-147)
✅ Rótulos "DNI (opcional)" y "Celular (opcional)"; solo se validan si tienen texto (RN-148)
✅ El formulario no tiene campos de fecha de nacimiento ni de foto (RN-149)
✅ "Ya existe una cuenta con este correo. Inicie sesión o recupere su contraseña." con "LUCIA@example.com", sin distinguir mayúsculas (estado Error) (RN-150)
✅ "Ya existe una cuenta con este DNI." al escribir 45879213 (DNI de Lucía) (RN-151)
✅ Sin conexión, al pulsar "Crear cuenta" aparece "Necesita conexión a internet para hacer esto." debajo del botón y no se crea la cuenta (RN-170)
✅ "Ya existe una cuenta con este celular." al escribir 987654321 (celular de Lucía) (RN-180)
✅ "Confirme que es mayor de 18 años para crear su cuenta." debajo de la casilla y en el resumen (RN-181)
❌ No se valida el formato del correo: cualquier texto pasa (no hay un texto del catálogo para eso)
❌ Si faltan nombre, correo o contraseña, los campos vacíos quedan con `aria-invalid` pero sin mensaje debajo de cada uno; el resumen solo tiene un enlace, al primer campo vacío (C-05)

=== P-002 · Verificar correo === (Must · HU-001)
- Encabezado C-01 solo con "Mi Junta" (lleva a P-007 con sesión o a P-003 con `?sesion=no`).
- Barra C-02 en el estado "Sin conexión".
- Bloque inicial: h1 "Verifique su correo", texto "Pulse el botón para terminar de crear su cuenta." y botón principal "Verificar mi correo". La verificación se hace al pulsar, no al abrir.
- Éxito: aviso "Su correo quedó verificado." (`role="status"`) y botón "Ir a Mis juntas" (P-007 de Rosa con `&verificado=1`).
- Error: aviso con `role="alert"` y el texto de RN-154, y botón secundario "Pedir un enlace nuevo"; al pulsarlo aparece "Le enviamos un enlace nuevo a su correo.". Sin sesión, el botón es un enlace a P-003.
- Nota del prototipo con el asunto y el cuerpo del correo de verificación de Rosa.
- Estados que funcionan: Con datos (inicial) · Vacío (igual que Error) · Error · Loading (botón con carga) · Éxito · Sin conexión. `?token=usado` lleva a Error al pulsar el botón.
✅ "Verificar mi correo" sin conexión queda con `aria-disabled="true"` y el motivo "Necesita conexión a internet para hacer esto." (RN-170)
✅ Error "Este enlace ya se usó o venció. Pida uno nuevo." (`#texto-error`) (RN-154)
❌ La vigencia de 86,400 s del enlace solo se ve en el correo de la nota del prototipo (RN-152)
❌ Que el enlace nuevo anula el anterior solo lo dice la nota del prototipo (`#nota-anulado`) (RN-154)

=== P-006 · Política de privacidad === (Must · HU-001, HU-002)
- Encabezado C-01: "Mi Junta"; con sesión y en modo lectura, enlaces "Mis juntas", "Unirse" y "Mi cuenta" (activo) y barra inferior. En modo aceptación y sin sesión no hay navegación.
- Barra C-02 en el estado "Sin conexión".
- Modo lectura: enlace de vuelta con el nombre del destino ("Mi cuenta", o "Crear cuenta" si viene de P-001 o sin sesión), h1 "Política de privacidad", "Versión 1.0", aviso "Borrador" con texto de relleno y 5 secciones h2 (datos que se guardan, protección, quién ve los datos, notificaciones, Mi Junta no mueve dinero). Pie "Usted aceptó la versión 1.0 el {fecha} a las {hora}.".
- Modo aceptación (`?modo=aceptacion`, cuenta de Jorge): "Versión 1.1", texto "Actualizamos la política. Léala y acéptela para ver sus juntas.", el mismo texto de la política, casilla "Acepto la política de privacidad, versión 1.1.", botón principal "Aceptar y continuar" (abre P-007) y botón secundario "Cerrar sesión".
- Diálogo C-07 "Cerrar sesión" con botón "Cerrar sesión" (peligro) y "Cancelar".
- Nota del prototipo: enlace al modo aceptación, y en ese modo el texto sobre RN-168, RN-169 y RN-189.
- Estados que funcionan: Con datos (lectura con sesión) · Vacío (lectura sin sesión, sin pie) · Error (lectura: alerta "Necesita conexión a internet para hacer esto." con "Intentar de nuevo"; aceptación: el mismo texto debajo de los botones) · Loading (esqueleto C-10) · Sin conexión. El modo se elige con `?modo=`.
✅ Pie "Usted aceptó la versión 1.0 el … a las …" con la fecha y la hora de la aceptación (`#pie-aceptada`) (RN-084)
✅ En modo aceptación la casilla aparece desmarcada, no hay enlaces a "Mis juntas" y solo se sale con "Aceptar y continuar" o "Cerrar sesión" (RN-168)
✅ Sin conexión, "Aceptar y continuar" queda como C-04 con "Necesita conexión a internet para hacer esto." (`#motivo-aceptar`) y no envía (RN-170)
✅ "Cerrar sesión" con 1 cambio sin enviar (Jorge) abre el diálogo "Hay cambios sin enviar (1). Si cierra sesión ahora, se perderán." (RN-198)
✅ "Aceptar y continuar" guarda la versión 1.1 con su fecha y hora: P-017 muestra "Versión 1.1, aceptada el 29/12/2026 a las 18:50", la lectura muestra "Versión 1.1" y el siguiente inicio de sesión de Jorge ya no pide aceptarla (RN-169; iteración 1, junto con obs. #16)
❌ Que el outbox y los recordatorios siguen mientras no acepte solo lo dice la nota del prototipo (RN-189)
✅ "Cerrar sesión" borra del dispositivo los cambios sin enviar (`MiJunta.store.clearDevice`): después P-003 ya no muestra el aviso de outbox, P-016 queda en "No tiene cambios sin enviar." y C-03 desaparece (RN-197; iteración 1, obs. #16)
❌ La screen spec pide un enlace "Volver" en modo lectura; el prototipo muestra el nombre del destino ("Mi cuenta" o "Crear cuenta")

=== P-007 · Mis juntas === (Must · HU-010, HU-001, HU-004, HU-005, HU-018 (S))
- Encabezado C-01 con "Mi Junta" y los enlaces "Mis juntas" (activo), "Unirse" y "Mi cuenta"; barra inferior con los mismos tres.
- Barra C-02 en "Sin conexión" e indicador C-03 con enlace "Ver" (P-016). Para Jorge sale en rojo: "Un cambio no se pudo guardar. 1 cambio sin enviar." (iteración 1, obs. #1).
- Aviso de correo sin verificar con el texto de RN-153 y botón de texto "Pedir otro enlace" (al pulsarlo: "Le enviamos un enlace nuevo a su correo.").
- h1 "Mis juntas", botón principal "Crear junta" (P-008) y secundario "Unirse con un código" (P-009).
- Lista de tarjetas-enlace (a P-011 si organiza, a P-010 si participa), ordenada "En curso", después "Abierta"/"Completa", al final "Terminada", y por nombre. Cada tarjeta: nombre, etiqueta C-06 del estado y, según el caso, "Usted organiza esta junta", "Usted organiza esta junta y no participa · Ronda actual: n", "{ocupados} de {total} cupos", "Su turno: n · Ronda actual: n" y "Su cuota: [estado]".
- Toast C-08 "Salió de la {junta}." (vuelve de P-010) o "Gracias por responder." (vuelve de P-024), que se cierra a los 6 s o con "Cerrar".
- Nota del prototipo con enlaces para ver la pantalla como Jorge, Lucía, el usuario con una junta terminada, Carmen y Rosa.
- Estados que funcionan: Con datos · Vacío ("Todavía no tiene juntas. Cree una o únase con el código que le compartió el organizador.") · Error ("No pudimos cargar sus juntas. Revise su conexión e intente de nuevo." y "Intentar de nuevo") · Loading (3 tarjetas C-10) · Sin conexión · Correo sin verificar.
✅ "Su turno: 4 · Ronda actual: 2" en la tarjeta de la Junta Oficina de Jorge (RN-025)
✅ Con el correo sin verificar, el aviso muestra "Verifique su correo para crear una junta o unirse a una." y "Crear junta" no abre P-008: muestra el mismo texto debajo de los botones (`#error-crear`) (RN-153)
✅ Sin conexión se ven todas las juntas de la lista (`data-estado="con-datos sin-conexion …"`) junto con C-02 (RN-175)
❌ La encuesta de KPI-05 (diálogo P-024) no aparece en esta pantalla (HU-018)
❌ En una junta "Terminada" de la que es participante, la tarjeta no muestra el rol; solo el organizador ve "Usted organiza esta junta" (screen spec de P-007)
✅ Con un rechazo sin revisar, C-03 muestra el rechazo y también la cantidad: "Un cambio no se pudo guardar. 1 cambio sin enviar." (Jorge) (RN-174; iteración 1, obs. #1)

=== P-004 · Recuperar contraseña === (Must · HU-002)
- Encabezado C-01 solo con "Mi Junta" (lleva a P-003), sin navegación.
- Barra C-02 en el estado "Sin conexión".
- h1 "Recuperar contraseña", texto "Le enviaremos un enlace a su correo. El enlace sirve por 1 hora.", campo "Correo" (`type="email"`) y botón principal "Enviar enlace" (`disabled` mientras el campo está vacío).
- Después de enviar se ocultan el campo y el botón, y queda el aviso con `role="status"` y el texto de RN-156.
- Enlace "Volver a iniciar sesión" (P-003), siempre visible.
- Nota del prototipo con correos de prueba y, después de enviar, el asunto y el cuerpo del correo de recuperación (o "Este correo no tiene cuenta en Mi Junta…").
- Estados que funcionan: Con datos (enviado, correo de Lucía) · Vacío (inicial) · Error (enviado con un correo sin cuenta: el mismo aviso) · Loading (botón con carga) · Sin conexión.
✅ Texto "El enlace sirve por 1 hora." en la pantalla (RN-155)
✅ "Si el correo está registrado, le enviamos un enlace para recuperar su contraseña." igual para lucia@example.com y para ana.salinas@example.com (estados Con datos y Error) (RN-156)
✅ Sin conexión, "Enviar enlace" queda con `aria-disabled="true"` y "Necesita conexión a internet para hacer esto." debajo, y no envía (RN-170)
❌ Que el enlace llega aunque se hayan desactivado los recordatorios solo lo dice la nota del prototipo (RN-188)

=== P-005 · Nueva contraseña === (Must · HU-002)
- Encabezado C-01 solo con "Mi Junta" (lleva a P-003), sin navegación.
- Barra C-02 en el estado "Sin conexión".
- h1 "Nueva contraseña", campo "Nueva contraseña" con la ayuda "Al menos 8 caracteres." y botón "Mostrar contraseña" (`aria-pressed`).
- Texto "Al cambiarla, se cerrará su sesión en los demás dispositivos." y botón principal "Cambiar contraseña" (`disabled` mientras el campo está vacío). Con éxito abre P-003 con `?aviso=contrasena`.
- Estado de enlace vencido: alerta con `role="alert"` y botón secundario "Pedir otro enlace" (P-004).
- Enlace "Volver a iniciar sesión" (P-003). No está en la screen spec.
- Nota del prototipo con el correo de recuperación de Lucía y la explicación de `?token=usado`.
- Estados que funcionan: Con datos (contraseña escrita) · Vacío (inicial) · Error (contraseña "clave" con el error de RN-074) · Loading (botón con carga) · Enlace vencido · Sin conexión.
✅ "Su contraseña debe tener al menos 8 caracteres." debajo del campo; el formulario sigue disponible para corregirla (RN-074)
✅ Estado "Enlace vencido" con "Este enlace ya se usó o venció. Pida uno nuevo." y "Pedir otro enlace"; con `?token=usado` se llega ahí al enviar (RN-157)
✅ Texto "Al cambiarla, se cerrará su sesión en los demás dispositivos." (RN-158)
✅ Sin conexión, "Cambiar contraseña" queda con `aria-disabled="true"` y el motivo de RN-170 debajo (RN-170)
❌ La vigencia de 3600 s del enlace solo se ve en el correo de la nota del prototipo; la pantalla no la controla (RN-155)
❌ No se ve que se cierren las demás sesiones; solo lo dice el texto de ayuda (RN-158)

=== P-017 · Mi cuenta === (Must · HU-011, HU-002, HU-015, HU-012 (S), HU-016 (S), HU-003 (S), HU-017 (S))
- Encabezado C-01 con "Mis juntas", "Unirse" y "Mi cuenta" (activo); barra inferior con los mismos tres.
- Barra C-02 en "Sin conexión" e indicador C-03 con "Ver" (P-016) si la cuenta tiene cambios o rechazos.
- h1 "Mi cuenta", nombre y correo propios. No muestra DNI ni celular.
- Sección "Notificaciones" (h2) con 3 interruptores `role="switch"` y `aria-checked`: "Recordatorios por correo" (con la ayuda de 09 y "Los correos de su cuenta le llegarán igual."), "Notificaciones push en este dispositivo" y "Aviso de cuotas vencidas" (solo si organiza una junta). No hay interruptor para SMS ni WhatsApp.
- Sección "Seguridad y privacidad" (h2): fila-enlace "Segundo factor" con "Activado" o "Desactivado" (P-021) y fila-enlace "Política de privacidad" con "Versión 1.0, aceptada el {fecha} a las {hora}" (P-006).
- Botón secundario "Cerrar sesión" y botón de texto rojo "Borrar mi cuenta" (P-023).
- Diálogo C-07 "Cerrar sesión" con "Cerrar sesión" (peligro) y "Cancelar".
- Nota del prototipo sobre el permiso del push, RN-159 y RN-197, y enlaces para ver la cuenta de Jorge, Lucía o Rosa.
- Estados que funcionan: Con datos · Vacío (cuenta de Rosa, sin juntas ni aviso de cuotas vencidas) · Error (interruptor de correo con el error "Necesita conexión a internet para hacer esto.") · Loading (esqueleto C-10) · Guardando (interruptor con carga) · Sin conexión · Push en iPhone (interruptor C-04 con el texto de iOS 16.4) · Cerrar con cambios (diálogo abierto).
✅ "Notificaciones push en este dispositivo" se activa y desactiva al pulsarlo (`#sw-push`); el permiso del navegador se da por hecho (RN-073)
✅ Sin conexión, los 3 interruptores, "Segundo factor" y "Borrar mi cuenta" quedan con `aria-disabled="true"` y "Necesita conexión a internet para hacer esto."; "Cerrar sesión" sigue funcionando (RN-170)
✅ "Recordatorios por correo" se desactiva y se vuelve a activar (`#sw-correo`) (RN-187)
✅ La ayuda dice "Los correos de su cuenta le llegarán igual." (RN-188)
✅ "Cerrar sesión" con cambios sin enviar abre el diálogo "Hay cambios sin enviar (1). Si cierra sesión ahora, se perderán." (Jorge) (RN-198)
✅ "Aviso de cuotas vencidas" solo aparece si la cuenta organiza una junta, y se desactiva y activa (`#fila-vencidas`, `#sw-vencidas`) (RN-208)
❌ El cierre de la sesión del servidor a los 30 días solo lo dice la nota del prototipo (RN-159)
✅ "Cerrar sesión" borra del dispositivo los cambios sin enviar: P-003 ya no muestra el aviso de outbox y P-016 queda vacío (`MiJunta.store.clearDevice`) (RN-197; iteración 1, obs. #16)
❌ No se ve que el aviso de cuotas vencidas deje de enviarse al desactivarlo (RN-209)
❌ No se ve el envío del push ni el pedido de permiso del navegador (RN-073)
❌ Las preferencias cambiadas no se guardan: al recargar o cambiar de estado vuelven a los valores de datos.js

=== P-008 · Crear junta === (Must · HU-004, HU-013 (S), HU-018 (S))
- Encabezado C-01 con "Mis juntas" (activo), "Unirse" y "Mi cuenta"; barra inferior. Barra C-02 en "Sin conexión" e indicador C-03 si la cuenta tiene cambios.
- Enlace de regreso "Mis juntas", h1 "Crear junta" y resumen de errores (`role="alert"`) con enlaces a los campos.
- Formulario: "Nombre de la junta" (`maxlength="60"`); "Cuota" con la ayuda "Lo que paga cada participante en cada ronda.", prefijo "S/" y placeholder "300.00"; "Cantidad de participantes" con botones "−" y "+"; caja "Pozo por ronda: S/ …" (`aria-live="polite"`).
- Grupo "Frecuencia" (`fieldset`/`legend`): "Semanal", "Quincenal", "Mensual", "Cada cierta cantidad de días"; con la 4.ª aparece "Cada cuántos días".
- "Vencimiento de la ronda 1" con la ayuda "Formato DD/MM/AAAA", placeholder "DD/MM/AAAA" y botón "Abrir calendario" (selector nativo).
- "Días de aviso previo" con "−" y "+" y la ayuda "El primer recordatorio llega por correo esa cantidad de días antes del vencimiento."
- Grupo "¿Usted participa?": "Sí participo" (ayuda "Paga cuota y entra al sorteo.") y "No participo".
- "Reglas de la junta (opcional)" con la ayuda "Todos los miembros podrán leerlas. Mi Junta no las aplica ni calcula multas." y contador "{n} / 2,000".
- Botón principal "Crear junta" y secundario "Cancelar" (P-007). Al crear abre P-011 (Junta Familia, `?aviso=creada`) o, si es su primera junta, P-024.
- Nota del prototipo: no hay límite de juntas, el código lo genera el servidor, y enlaces para ver la pantalla como Jorge, Lucía o Rosa.
- Estados que funcionan: Con datos (valores de la Junta Familia, ronda 1 el 30/01/2027) · Vacío (inicial, aviso en 3) · Error (todos los campos con error) · Loading (esqueleto C-10) · Sin conexión · Correo sin verificar · Primera junta.
✅ "Complete los campos marcados." en el resumen y debajo de cada campo vacío (RN-002)
✅ "Ingrese una cuota entre S/ 10.00 y S/ 5,000.00." al escribir una cuota fuera de rango (RN-003)
✅ "La cuota debe ser múltiplo de S/ 0.10, por ejemplo S/ 20.80." con 20.85 (estado Error) (RN-004)
✅ "Ingrese entre 2 y 50 participantes." con 51 (estado Error) (RN-005)
✅ Las 4 opciones de frecuencia; sin elegir ninguna, el grupo muestra "Elija una frecuencia: semanal, quincenal, mensual o cada cierta cantidad de días." (RN-007)
✅ "Ingrese un número de días entre 2 y 60." con 1 día (estado Error) (RN-008)
✅ "La fecha de vencimiento de la ronda 1 no puede ser anterior a hoy." con 30/11/2026 (estado Error; hoy es 29/12/2026) (RN-009)
✅ "Ingrese entre 1 y 7 días de aviso previo." con 8 (estado Error) (RN-010)
✅ "Días de aviso previo" empieza en 3 en el estado Vacío (RN-011)
✅ "Los días de aviso previo deben ser menos que los días entre una cuota y la siguiente." al escribir un aviso igual o mayor que el periodo (RN-012)
✅ "Pozo por ronda: S/ 3,600.00" con S/ 300.00 y 12 participantes, solo cuando los dos campos son válidos (`updatePot()`) (RN-041)
✅ Ayuda de "Días de aviso previo" que explica el primer recordatorio; el envío no se ve (RN-068)
✅ "El nombre de la junta debe tener entre 3 y 60 caracteres." con "JF" (estado Error) (RN-096)
✅ "Ingrese el monto solo con números y un punto decimal, por ejemplo 1250.50." al escribir, por ejemplo, "300,00" (RN-097)
✅ Al elegir una frecuencia con periodo igual o menor que el aviso, el aviso pasa a periodo − 1 y se anuncia "Días de aviso previo: {n}" (`#anuncio-aviso`) (RN-098)
✅ Estado "Correo sin verificar": el resumen muestra "Verifique su correo para crear una junta o unirse a una." y no se crea la junta (RN-153)
✅ Sin conexión, "Crear junta" queda con `aria-disabled="true"` y "Necesita conexión a internet para hacer esto.", y no envía (RN-170)
✅ "Las reglas de la junta pueden tener hasta 2,000 caracteres." con 2,014 caracteres, y el contador "2,014 / 2,000" (estado Error) (RN-179)
✅ Si es su primera junta (o en el estado "Primera junta"), al crear se abre P-024 (HU-018)
❌ No hay nada en la pantalla que muestre que no hay límite de juntas; solo lo dice la nota del prototipo (RN-001)
❌ No se ve que el organizador que elige "Sí participo" cuente como uno de los participantes; solo la ayuda "Paga cuota y entra al sorteo." (RN-006)
❌ El código de invitación (8 caracteres, nunca repetido) no se ve en esta pantalla; solo lo menciona la nota del prototipo (RN-015, RN-016)
❌ datos.js no guarda la junta creada: P-011 abre la Junta Familia, no lo que se escribió en el formulario

=== P-011 · Junta: vista del organizador === (Must · HU-014, HU-006, HU-010, HU-008, HU-005, HU-007 (S), HU-013 (S))
- Encabezado C-01 con "Mis juntas" (activo), "Unirse" y "Mi cuenta"; barra inferior. C-02 en "Sin conexión"; C-03 en rojo para Jorge.
- Enlace "Mis juntas", h1 con el nombre de la junta, etiqueta C-06 del estado y, antes del orden, "{ocupados} de {total} cupos" con `<progress>`.
- Pestañas C-09 (`nav` "Secciones de la junta"): "Resumen", "Miembros", "Turnos" y, después del orden, "Pagos" (P-014). "Turnos" lleva a P-013 o P-020; antes del orden muestra el texto de RN-105.
- Antes del orden (Junta Familia, estados Vacío y Completa): tarjeta "Código de invitación" con el código en dos grupos de 4 (`aria-label` deletreado), "Compártalo por sus propios medios, por ejemplo por WhatsApp. Mi Junta no lo envía.", "Copiar código" (toast "Código copiado.") y "Regenerar código"; sección "Fijar el orden de turnos" con "Ejecutar sorteo" y "Asignar orden" (P-019); "Miembros (n)" con "Usted, organizador" y "Quitar" en cada fila ajena.
- Después del orden (Junta Oficina, Con datos): tarjeta "Ronda actual: 2 de 10" con vencimiento, pozo, "Recibe el pozo: {nombre} (turno 2)", "{pagadas} de {total} cuotas pagadas" con barra, lista "Faltan pagar" con etiquetas y botón "Ver pagos" (P-014); tarjeta "Su turno: 4" con "Recibe el pozo en la ronda 4, que vence el …" y lista "Sus cuotas" (cada fila abre P-015, sin "Informar mi pago").
- Pestaña "Miembros" después del orden: cada fila con turno, nombre, "Ronda n: [estado]" y "Próxima: {fecha} [estado]" o "—"; el organizador que no participa sale solo con la etiqueta "Organizador".
- Columna lateral: "Condiciones de la junta" (desplegable con cuota, pozo, participantes, frecuencia, ronda 1, aviso y "Usted participa"), "Reglas de la junta" (texto, o "Todavía no escribió reglas para esta junta." con "Escribir reglas"), "Editar junta" (o "Editar junta (solo el nombre)") y "Salir de la junta" como C-04.
- Diálogos C-07: sorteo, regenerar código y quitar participante. Toasts: "Junta creada. Comparta el código con sus invitados.", "Cambios guardados.", "Gracias por responder.".
- Nota del prototipo con enlaces a las otras juntas y a la vista sin permiso, y dos casillas: "Simular que la ronda 1 ya se cambió al 30/01/2027 en "Editar junta"" y "Simular que otro dispositivo ya fijó el orden (RN-125)", y el camino completo sin casillas: Lucía se une en P-009, Carmen cambia la ronda 1 en P-012 y sortea aquí (iteración 1, obs. #3).
- Estados que funcionan: Con datos · Vacío (junta recién creada, solo el organizador) · Error (diálogo del sorteo con el rechazo de RN-122) · Loading (esqueleto C-10) · Completa (12 de 12; Ana Salinas se simula solo si falta un cupo) · Completa sin conexión (iteración 1, obs. #2) · Sin conexión · Sin permiso ("No tiene acceso a esta junta.").
✅ Texto del diálogo "Se crearán las {n} rondas con sus cuotas"; la creación de las rondas no se ve (RN-013)
✅ El diálogo avisa que "el código de invitación dejará de servir", y después del orden la tarjeta del código ya no aparece (RN-019)
✅ "Regenerar código" abre "¿Regenerar el código?" / "El código T9QW3HZ5 dejará de servir…" y, al confirmar, la tarjeta muestra un código nuevo (RN-020)
✅ La pestaña "Miembros" muestra de cada miembro solo turno, nombre, estado de la ronda actual y fecha y estado de la próxima cuota (RN-022)
✅ "Su turno: 4" en la tarjeta del organizador que participa (RN-025)
✅ "Sus cuotas" lista cada ronda con su etiqueta de estado (RN-026)
✅ Con cupos libres, "Ejecutar sorteo" queda como C-04 con "La junta todavía tiene cupos libres. Fije el orden de turnos cuando estén todos ocupados." (Junta Familia, Vacío) (RN-027)
✅ "Ejecutar sorteo" del diálogo pasa a `disabled` con carga al pulsarlo, y después del orden ya no aparece el botón (RN-028)
✅ "El sorteo se hace una sola vez y su resultado no se puede cambiar." en el diálogo (RN-035)
✅ "Recibe el pozo: {nombre} (turno 2)" en la ronda actual y "Recibe el pozo en la ronda 4, que vence el …" en la tarjeta del turno (RN-037)
✅ Después del orden el botón dice "Editar junta (solo el nombre)" (RN-110)
✅ "Salir de la junta" es C-04 con "Usted es la persona organizadora de esta junta y no puede salir de ella." y no llama a la API (RN-115)
✅ En la pestaña "Miembros" de la Junta Amigas (Terminada), "Próxima:" muestra "—" con el texto oculto "Sin próxima cuota" (RN-119)
✅ Estado Error: el diálogo muestra "La fecha de vencimiento de la ronda 1 ya pasó. Cámbiela antes de fijar el orden de turnos." con el enlace "Editar junta" (RN-122)
✅ Con la casilla de la nota marcada, el diálogo muestra "Esta junta ya tiene su orden de turnos." y al cerrarlo recarga la junta (RN-125)
✅ Con cupos libres, "Asignar orden" queda como C-04 con el mismo texto de RN-027 (RN-126)
✅ En la Junta Ventas (orden asignado sin sorteo) tampoco se muestra el código (RN-129)
✅ "Sus cuotas" no tiene "Informar mi pago": cada cuota abre P-015 (RN-136)
✅ Sin conexión, "Regenerar código", "Editar junta", "Quitar" y "Asignar orden" quedan como C-04 con "Necesita conexión a internet para hacer esto."; "Copiar código" sigue funcionando (RN-170)
✅ Las listas de miembros solo muestran nombres: no hay correo, celular ni DNI; que el servidor no los entregue no se puede ver (RN-178)
✅ Estado "Completa sin conexión": "Ejecutar sorteo" queda como C-04 con "Necesita conexión a internet para ejecutar el sorteo." (RN-029; iteración 1, obs. #2)
❌ El mensaje "La junta ya fijó su orden de turnos. Ya no es posible quitar participantes." no se ve, porque después del orden "Quitar" no aparece (RN-114)
✅ El sorteo exitoso genera una semilla de 256 bits (`crypto.getRandomValues`), mezcla con fisher-yates-v1 del anexo A (verificado con su vector de prueba) la lista de entrada de esta junta, ordenada por el momento en que cada uno ocupó su cupo, guarda el registro y abre P-013 de esta junta; la junta pasa a "En curso" y el código deja de servir en P-009 (RN-019, RN-031, RN-032, RN-034, RN-102, RN-123, RN-124; iteración 1, obs. #4)
✅ Con los 12 cupos ocupados en P-009 y la ronda 1 cambiada en P-012, el sorteo sale bien sin usar las casillas de la nota (RN-122; iteración 1, obs. #3)
✅ Si Carmen guardó "No participo" en P-012, no entra en la lista de entrada del sorteo (RN-030; iteración 1, obs. #23)
✅ El código regenerado y los participantes quitados quedan guardados en la pestaña: P-009 rechaza el código anterior con "Este código ya no es válido." y el cupo quitado queda libre en P-007 y P-012 (RN-020, RN-112, RN-113; iteración 1, obs. #3)

=== P-012 · Editar junta === (Must · HU-014, HU-013 (S))
- Encabezado C-01 con "Mis juntas" (activo), "Unirse" y "Mi cuenta"; barra inferior. C-02 en "Sin conexión" y C-03 si la cuenta tiene cambios.
- Enlace de regreso con el nombre de la junta (P-011), h1 "Editar junta" y resumen de errores (`role="alert"`).
- Antes del orden (por defecto, Junta Familia): los mismos campos de P-008 con los valores actuales; "Cantidad de participantes" con la ayuda "Hoy hay 11 cupos ocupados."; "No participo" con la ayuda "Si deja de participar, su cupo quedará libre."; caja del pozo y contador de reglas.
- Después del orden (`?junta=junta_oficina`): aviso con el texto de RN-110, solo el campo "Nombre de la junta" y los demás datos como texto (Cuota, Participantes, Frecuencia, Ronda 1, Aviso previo, Usted participa, Reglas de la junta).
- Botón principal "Guardar cambios" (vuelve a P-011 con `?aviso=guardado`) y secundario "Cancelar" (P-011).
- Nota del prototipo con el estado de la junta, el estado que tendría al guardar, el aviso de la ronda 1 vencida y enlaces a los dos modos.
- Estados que funcionan: Con datos · Vacío (junta sin reglas escritas) · Error (antes del orden: nombre "JF", cuota "1,000", 9 participantes, cada 61 días, fecha 31/02/2027, aviso 0; después del orden: nombre "JO") · Loading (esqueleto C-10) · Sin cupo para participar (solo antes del orden) · Sin conexión · Sin permiso ("No tiene acceso a esta junta.").
✅ Al borrar un campo obligatorio y guardar: "Complete los campos marcados." (RN-002)
✅ "Ingrese una cuota entre S/ 10.00 y S/ 5,000.00." con una cuota fuera de rango (RN-003)
✅ "La cuota debe ser múltiplo de S/ 0.10, por ejemplo S/ 20.80." con una cuota como 20.85 (RN-004)
✅ "Ingrese entre 2 y 50 participantes." con 51 o con 1 (RN-005)
✅ Grupo "¿Usted participa?" con "Sí participo" y "No participo", cargado con la participación actual (RN-006)
✅ Las 4 opciones de frecuencia, con la actual marcada (RN-007)
✅ "Ingrese un número de días entre 2 y 60." con 61 (estado Error) (RN-008)
✅ La ronda 1 se compara con la creación de la junta (14/11/2026): una fecha anterior muestra "La fecha de vencimiento de la ronda 1 no puede ser anterior a hoy." (RN-009)
✅ "Ingrese entre 1 y 7 días de aviso previo." con 0 (estado Error) (RN-010)
✅ "Los días de aviso previo deben ser menos que los días entre una cuota y la siguiente." con un aviso igual o mayor que el periodo (RN-012)
✅ Caja "Pozo por ronda: S/ 3,600.00" calculada en vivo (RN-041)
✅ "El nombre de la junta debe tener entre 3 y 60 caracteres." con "JF" o "JO" (estado Error) (RN-096)
✅ "Ingrese el monto solo con números y un punto decimal, por ejemplo 1250.50." con "1,000" (estado Error) (RN-097)
✅ Al elegir una frecuencia con periodo igual o menor que el aviso, el aviso pasa a periodo − 1 y se anuncia (RN-098)
✅ Antes del orden se pueden cambiar todos los campos, incluidas las reglas (`#campos-editables`) (RN-106)
✅ Los campos usan las mismas validaciones y los mismos textos que P-008 (`M.validate`) (RN-107)
✅ "La junta ya tiene 11 cupos ocupados. Ingrese al menos 11 participantes." con 9 participantes (estado Error) (RN-108)
✅ Estado "Sin cupo para participar": "La junta no tiene cupos libres para que usted participe." (RN-109)
✅ Después del orden: aviso "La junta ya fijó su orden de turnos. Solo puede cambiar su nombre." y los demás datos como texto (RN-110)
✅ Sin conexión, "Guardar cambios" queda como C-04 con "Necesita conexión a internet para hacer esto." (RN-170)
✅ "Las reglas de la junta pueden tener hasta 2,000 caracteres." y el contador "{n} / 2,000" al pasar el límite (RN-179)
✅ Ayuda "Si deja de participar, su cupo quedará libre."; con "No participo", el mínimo de RN-108 baja en 1 (RN-212)
✅ Con una ronda 1 anterior a hoy, debajo de la fecha aparece el aviso "La fecha de vencimiento de la ronda 1 ya pasó. Cámbiela antes de fijar el orden de turnos." sin impedir guardar (RN-122; iteración 1, obs. #9)
❌ "Elija una frecuencia…" no puede aparecer: la junta siempre trae una frecuencia marcada y un grupo de opciones no se puede desmarcar (RN-007). Decisión (iteración 1, obs. #10): no se cambia; en la edición, RN-007 solo aplica a una petición directa a la API
✅ Al guardar, la junta queda "Completa" o "Abierta" según sus cupos, y P-011, P-007 y P-010 lo muestran (RN-100, RN-101; iteración 1, obs. #7)
✅ Al guardar "No participo", el cupo de Carmen queda libre: P-011 muestra un cupo ocupado menos y Carmen ya no sale en la lista de P-019 ni en la entrada del sorteo (RN-212; iteración 1, obs. #7)
✅ RN-109 también se ve sin el supuesto: Carmen guarda "No participo" con 11 participantes, Lucía se une en P-009 (11 de 11) y, al volver a "Sí participo", aparece "La junta no tiene cupos libres para que usted participe." (RN-109; iteración 1, obs. #32)
✅ Los cambios guardados se ven en P-011 (con el toast "Cambios guardados."), P-007 y P-010 mientras la pestaña siga abierta (iteración 1, obs. #7)

=== P-013 · Registro del sorteo === (Must · HU-006)
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión" y C-03 si la cuenta tiene cambios.
- Enlace de regreso con el nombre de la junta (P-011 si organiza, P-010 si participa).
- h1 "Sorteo de turnos" y "Ejecutado por Jorge Mendoza el 20/11/2026 a las 19:30".
- "Orden de turnos" (h2): lista numerada con turno y nombre; la fila propia lleva "(usted)" y va resaltada.
- "Datos para verificar el sorteo" (h2): texto "Con la semilla, la versión del algoritmo y la lista de entrada, cualquier persona obtiene el mismo orden de turnos.", "Versión del algoritmo: fisher-yates-v1", "Semilla" en bloques (`code.seed`), desplegables "Lista de entrada (10)" (con "En el orden en que cada uno ocupó su cupo.") y "Resultado (10)".
- Botón secundario "Copiar datos del sorteo" (toast "Datos copiados."). Toast "Sorteo guardado." al llegar desde P-011.
- No hay ningún botón que cambie el registro.
- Nota del prototipo con enlaces para ver el sorteo como Jorge, Pedro, Rosa (no es miembro) y la Junta Ventas (sin sorteo).
- Estados que funcionan: Con datos (Lucía) · Vacío (junta sin sorteo: "Este orden lo asignó el organizador, sin sorteo." con "Ver orden de turnos" a P-020, o el texto de RN-105) · Error (sin permiso: "No tiene acceso a esta junta.") · Loading (esqueleto C-10) · Sin conexión.
✅ Quien no es miembro (Rosa) ve solo "No tiene acceso a esta junta." en todos los estados (RN-024)
✅ Texto "Con la semilla, la versión del algoritmo y la lista de entrada, cualquier persona obtiene el mismo orden de turnos." (RN-033)
✅ El registro muestra semilla, versión del algoritmo, lista de entrada, resultado, quién lo ejecutó y la fecha y hora (RN-034)
✅ La pantalla es de solo lectura: la única acción es "Copiar datos del sorteo" (RN-035)
✅ Todo miembro ve la semilla, la versión, la lista de entrada con nombres en su orden y el resultado (RN-121)
✅ "Lista de entrada" en el orden en que cada uno ocupó su cupo, con la frase "En el orden en que cada uno ocupó su cupo." (RN-123)
❌ La pantalla no permite reproducir el sorteo; solo copia los datos para verificarlo fuera de la app (RN-033)
✅ Después de sortear en P-011, se ve el registro de esa junta (por ejemplo, "Ejecutado por Carmen Mamani el 29/12/2026 a las 18:50", con su semilla y su lista de entrada) (RN-034, RN-121; iteración 1, obs. #4)
✅ En "Con datos" de una junta sin sorteo (por ejemplo, Junta Ventas) se ve el caso vacío, no el registro de otra junta (iteración 1, obs. #22)

=== P-009 · Unirse a una junta === (Must · HU-005)
- Encabezado C-01: con sesión, enlaces "Mis juntas", "Unirse" (activo) y "Mi cuenta" y barra inferior; sin sesión, solo "Mi Junta" (lleva a P-003). Barra C-02 en "Sin conexión".
- h1 "Unirse a una junta", campo "Código de invitación" con la ayuda "Son 8 letras y números. Se lo comparte el organizador." (`autocapitalize="characters"`, `autocomplete="off"`, `spellcheck="false"`, clase `code-input`, `maxlength="16"`).
- Botón principal "Unirse" (`disabled` mientras el campo está vacío). Los errores van debajo del campo y el código escrito se conserva.
- Sin sesión: aviso con `role="alert"`, el texto de RN-017 y los botones "Iniciar sesión" (P-003) y "Crear cuenta" (P-001), que llevan el código guardado en `?codigo=`.
- Al unirse abre P-010 con el toast "Se unió a la {junta}."; si ya es miembro, abre P-010 sin mensaje. Si llega con `?codigo=` y sesión, reenvía el código solo.
- Nota del prototipo con 4 códigos de prueba, el contador de códigos no válidos ("… de 10") y el botón "Simular que pasó 1 hora".
- Estados que funcionan: Con datos (Lucía con el código T9QW3HZ5) · Vacío (campo vacío) · Error (K7MP4XR2 con "Este código ya no es válido.") · Loading (esqueleto C-10) · Sin sesión · Correo sin verificar · Junta llena · Demasiados códigos · Sin conexión.
✅ Sin sesión, al pulsar "Unirse" aparece "Inicie sesión o cree su cuenta para unirse a la junta." con los dos botones, y no se une (RN-017)
✅ Estado "Junta llena": "Esta junta ya no tiene cupos disponibles." (RN-018)
✅ M3QX7KPA (anulado por el sorteo de la Junta Oficina): "Este código ya no es válido." (RN-019)
✅ K7MP4XR2 (anulado al regenerarlo): "Este código ya no es válido." (estado Error) (RN-020)
✅ Con `?usuario=user_124` (ya es miembro de la Junta Familia), T9QW3HZ5 abre P-010 sin error y sin ocupar otro cupo (RN-021)
✅ H2RZ8QWN: "Este código no es válido." (RN-116)
✅ Al 10.º código inexistente, o en el estado "Demasiados códigos": "Demasiados códigos no válidos. Intente de nuevo en 1 hora." (RN-117)
✅ W8RT5NHC (Junta Ventas, anulado al asignar el orden a mano): "Este código ya no es válido." (RN-129)
✅ Estado "Correo sin verificar": "Verifique su correo para crear una junta o unirse a una." debajo del campo (RN-153)
✅ Sin conexión, "Unirse" queda con `aria-disabled="true"` y "Necesita conexión a internet para hacer esto." (RN-170)
✅ "t9qw 3hz5" (minúsculas y espacio) se acepta: se quitan los espacios y se pasa a mayúsculas antes de validar (`normalizeInviteCode`) (RN-190)
❌ El fin de la hora de bloqueo solo se simula con el botón de la nota del prototipo, y el contador de códigos no válidos solo está en la nota (RN-117)
❌ El estado "Junta llena" es simulado: ninguna junta de datos.js está llena con un código vigente (RN-018)
✅ Al unirse, el cupo queda guardado en la pestaña: con Lucía, la Junta Familia pasa a 12 de 12 "Completa" en P-007, P-011 y P-012 (RN-100; iteración 1, obs. #3)

=== P-010 · Junta: vista del participante === (Must · HU-010, HU-005, HU-006, HU-013 (S), HU-009 (S), HU-007 (S))
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión" y C-03 "1 cambio sin enviar." con "Ver" en "Cambio sin enviar".
- Enlace "Mis juntas", h1 con el nombre de la junta y "[estado] · Organiza: {nombre}" (antes del orden, también "{ocupados} de {total} cupos").
- Pestañas C-09: "Resumen", "Miembros" y "Turnos" (lleva a P-013 o P-020; antes del orden muestra el texto de RN-105).
- "Resumen" después del orden: tarjeta destacada "Su turno: 7" con "Recibe el pozo en la ronda 7, que vence el 30/05/2027."; tarjeta "Ronda actual: 2 de 10" con vencimiento, "Pozo: S/ 10,000.00", "Recibe el pozo: {nombre} (turno 2)", "Su cuota: [estado]", "Informar mi pago" (si está "Pendiente") y "Ver sorteo ›" o "Ver orden de turnos ›"; lista "Sus cuotas" con la ronda actual resaltada y "Informar mi pago" en cada cuota "Pendiente"; desplegables "Condiciones de la junta" y "Reglas de la junta".
- "Resumen" antes del orden (estado Vacío): aviso de RN-105, condiciones y reglas.
- "Miembros": "Ronda actual: n", "Faltan pagar la ronda n: x" y una fila por miembro con turno, nombre, "(usted)", "Ronda n: [estado]" y "Próxima: {fecha} [estado]" o "—". Antes del orden, solo nombres y la etiqueta "Organizador".
- Botón de texto rojo "Salir de la junta" al final de "Resumen" (no aparece en una junta "Terminada"), con el diálogo C-07 "¿Salir de la {junta}?".
- Toasts: "Se unió a la {junta}." (viene de P-009) y "Su pago quedó por confirmar." (viene de P-018).
- Nota del prototipo con enlaces a otras juntas y pestañas (Junta Ventas, Junta Amigas, Junta Familia).
- Estados que funcionan: Con datos (Lucía en la Junta Oficina) · Vacío (Junta Familia antes del orden, vista por Teresa Mamani) · Error ("Necesita conexión a internet para hacer esto." con "Intentar de nuevo") · Loading (esqueleto C-10) · Sin conexión · Cambio sin enviar · Sin permiso ("No tiene acceso a esta junta." y "Ir a Mis juntas"). El organizador que abre esta página pasa a P-011.
✅ "Reglas de la junta" muestra el texto con saltos de línea, o "El organizador no escribió reglas para esta junta." (Junta Ventas) (RN-014)
✅ "Miembros" muestra de cada otro miembro solo nombre, turno, estado de la ronda actual y fecha y estado de la próxima cuota (RN-022)
✅ Ninguna pestaña muestra DNI, correo ni celular de otros miembros; que el servidor no los entregue no se puede ver (RN-023)
✅ "Su turno: 7" en la tarjeta destacada (RN-025)
✅ "Sus cuotas" con "Ronda n · Vence {fecha}" y la etiqueta de estado de cada una (RN-026)
✅ "Recibe el pozo en la ronda 7, que vence el 30/05/2027." y "Recibe el pozo: {nombre} (turno 2)" (RN-037)
✅ "Pozo: S/ 10,000.00" y "Pozo por ronda" en las condiciones (RN-041)
✅ "Informar mi pago" solo aparece en las cuotas propias; las filas de "Miembros" no lo tienen (RN-061)
✅ Sin conexión se ve toda la junta (`data-estado="… sin-conexion …"`) (RN-094)
✅ Barra "Sin conexión. Última sincronización: 29/12/2026 18:30" (RN-095)
✅ Antes del orden: "Su turno y sus cuotas aparecerán cuando se fije el orden de turnos." (RN-105)
✅ Antes del orden, "Salir de la junta" abre "¿Salir de la Junta Familia?" con "Su cupo quedará libre y necesitará un código nuevo para volver a unirse." (RN-111)
✅ Al confirmar la salida abre P-007, que ya no muestra esa junta y dice "Salió de la Junta Familia."; el cupo libre queda guardado y una junta "Completa" vuelve a "Abierta" (RN-113, RN-101; iteración 1)
✅ Después de informar con conexión en P-018, la cuota se ve "Por confirmar" (RN-060; iteración 1, obs. #12)
✅ Con el orden fijado, "Salir de la junta" muestra "La junta ya fijó su orden de turnos. Ya no es posible salir de ella." debajo, sin diálogo (RN-114)
✅ En "Miembros" de la Junta Ventas, Jorge (no participa) sale solo con su nombre y la etiqueta "Organizador" (RN-118)
✅ En "Miembros" de la Junta Amigas, "Próxima:" muestra "—" con el texto oculto "Sin próxima cuota" (RN-119)
✅ "Informar mi pago" solo aparece en cuotas "Pendiente" (`reportButton()`) (RN-135)
✅ Sin conexión, "Salir de la junta" queda como C-04 con "Necesita conexión a internet para hacer esto."; "Informar mi pago" sigue disponible (RN-170)
✅ En "Miembros" de la Junta Amigas aparece "Participante eliminado" (RN-183)
❌ El estado "Cambio sin enviar" sigue siendo simulado: marca como "Por confirmar · Sin enviar" la cuota que viene de P-018 (o la de la ronda siguiente), sin un cambio en el outbox de datos.js
❌ Antes del orden, "Miembros" muestra la etiqueta "Organizador" junto al nombre; la screen spec pide solo los nombres
❌ 09 no define el error de red; el prototipo usa el texto de RN-170

=== P-014 · Pagos de la junta === (Must · HU-008, HU-015, HU-010, HU-009 (S))
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión" y C-03 (para Jorge, en rojo: "Un cambio no se pudo guardar. 1 cambio sin enviar.").
- Enlace de regreso con el nombre de la junta (P-011) y h1 "Pagos".
- Selector "Ronda" con "Ronda {n} · vence {fecha}" para todas las rondas (por defecto, la actual). Resumen: "Pozo: S/ …", "Recibe el pozo: {nombre completo}", "{pagadas} de {total} cuotas pagadas" y barra `<progress>`.
- Filtros de alternancia "Todas", "Pendiente", "Por confirmar" y "Pagada" (`aria-pressed`) y contador "{n} cuotas" (`aria-live="polite"`). Sin resultados: "No hay cuotas con este estado en la ronda {n}.".
- Por debajo de 1024 px, tarjetas: nombre (con "(usted)" en la cuota propia), etiquetas de estado y "Sin enviar", "Pagó el {fecha} · a tiempo/atrasado" o "Informó que pagó el {fecha}", "Corregido", y los botones "Registrar pago" (Pendiente) o "Revisar" (Por confirmar). La tarjeta "Pagada" es toda un enlace a P-015.
- Desde 1024 px, tabla con `<caption>` "Cuotas de la ronda {n}" y columnas Participante · Estado · Fecha de pago · A tiempo · Correcciones · Acción (`scope="col"`).
- Nota del prototipo: nunca se muestran correo, celular ni DNI; enlaces a la Junta Ventas, la Junta Familia y a la vista de Lucía (sin permiso).
- Estados que funcionan: Con datos (Junta Oficina, ronda 2) · Vacío ("Las cuotas aparecerán cuando se fije el orden de turnos.") · Error (sin permiso: "No tiene acceso a esta junta.") · Loading (esqueleto C-10) · Sin conexión.
✅ Las tarjetas y la tabla solo muestran el nombre de cada participante, sin correo, celular ni DNI; que el servidor no los entregue no se puede ver (RN-023, RN-178)
✅ Junta Familia (sin orden): "Las cuotas aparecerán cuando se fije el orden de turnos." (RN-105)
✅ Cada cuota con nombre, ronda (selector), estado, fecha de pago, "a tiempo" o "atrasado" y "Corregido"; quien no es organizador (Lucía) ve "No tiene acceso a esta junta." (RN-120)
✅ "Registrar pago" solo aparece en las cuotas "Pendiente" (`actionHtml()`) (RN-130)
✅ El selector deja elegir cualquier ronda; en la ronda 3, Gabriela Torres ya aparece "Pagada" (RN-133)
✅ La cuota propia de Jorge aparece como "Jorge Mendoza (usted)" con "Registrar pago" si está pendiente (RN-136)
✅ Sin conexión, "Registrar pago", "Revisar" y los enlaces siguen disponibles, sin C-04 (RN-170)
✅ La cuota de Karina Rojas (ronda 2) con un cambio en el outbox lleva la etiqueta "Sin enviar" (HU-015)
✅ Con un rechazo sin revisar, C-03 muestra también "1 cambio sin enviar." (RN-174; iteración 1, obs. #1)
✅ Al volver de registrar un pago en P-015 aparece el toast "Pago registrado." y la cuota ya figura "Pagada" con "a tiempo" o "atrasado" (iteración 1, obs. #24)
❌ La URL usa `?ronda=`; la ruta de la screen spec usa `?round={n}`

=== P-015 · Detalle de la cuota === (Must · HU-008, HU-015, HU-009 (S))
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión" y C-03, que suma los cambios hechos en esta pantalla sin conexión.
- Enlace "Pagos" (P-014 con la ronda de la cuota), h1 "{nombre} · Ronda {n}", "Vence el {fecha}", "Cuota: S/ …" con la etiqueta de estado (y "Sin enviar"), "Pagó el {fecha} · a tiempo/atrasado" y "Se enviará cuando vuelva la conexión." si hay un cambio sin enviar.
- Aviso fijo "El dinero se paga fuera de Mi Junta, por ejemplo por Yape, Plin o en efectivo. Aquí solo se registra.".
- "Pendiente": campo "Fecha de pago" (ayuda "Formato DD/MM/AAAA", valor inicial hoy, botón "Abrir calendario") y botón principal "Registrar pago" (con conexión vuelve a P-014 con el toast "Pago registrado."; sin conexión se queda aquí con "Sin enviar"; iteración 1, obs. #24).
- "Pagada": botón secundario "Desmarcar pago" con el diálogo C-07 "¿Desmarcar este pago?".
- "Por confirmar": "Confirmar pago" y "Rechazar pago" (diálogo "¿Rechazar el pago informado?").
- "Historial" (h2): eventos en orden ("Pago registrado · fecha de pago … · registrado el … por …", "Pago desmarcado el … por …", "Pago informado por … · fecha de pago …", "Confirmado el …", "Rechazado el …"), o "Todavía no hay pagos registrados.".
- Alerta de conflicto (`role="alert"`) para los estados "Registrada en otro dispositivo" y "Desmarcada en otro dispositivo".
- Nota del prototipo: los cambios hechos con conexión quedan guardados en la pestaña, el camino para ver RN-103 y RN-104 en la Junta Amigas, y enlaces a otras cuotas (con cambio sin enviar, atrasada, ronda futura, cuota propia, junta terminada).
- Estados que funcionan: Con datos (Lucía, ronda 1, "Pagada" con corrección) · Vacío (Silvia Flores, ronda 2, sin pagos) · Error (fecha 31/12/2026 con el error de RN-054) · Loading (esqueleto C-10) · Pendiente (Pedro, pago informado y rechazado) · Pagada · Por confirmar (Lucía, ronda 2) · Sin conexión · Registrada en otro dispositivo · Desmarcada en otro dispositivo (iteración 1, obs. #5) · Sin permiso.
✅ Al registrar, la fecha indicada aparece en "Pagó el …" y en el historial (RN-052)
✅ "La fecha de pago no puede ser posterior a hoy." con 31/12/2026 (estado Error) (RN-054)
✅ "a tiempo" si la fecha es igual o anterior al vencimiento (RN-055)
✅ "atrasado" si la fecha es posterior al vencimiento (por ejemplo, la cuota de Víctor Chávez, ronda 1) (RN-056)
✅ "Pago desmarcado el 02/12/2026 08:15 por Jorge Mendoza" en el historial de la cuota de Lucía (RN-057)
✅ El historial conserva el pago original después de la corrección, y el diálogo lo dice (RN-058)
✅ "Confirmar pago" deja la cuota "Pagada" (RN-062)
✅ "Rechazar pago" la devuelve a "Pendiente" y agrega "Rechazado el …" al historial (RN-063)
✅ Estado "Registrada en otro dispositivo": al registrar aparece "Esta cuota ya no está pendiente."; y una cuota "Por confirmar" no muestra "Registrar pago" (RN-130)
✅ "La fecha de pago no puede ser anterior a la creación de la junta." con una fecha anterior al 15/11/2026 (RN-132)
✅ No hay ningún control para cambiar la fecha de un pago; el diálogo dice "Para cambiar la fecha, desmarque y vuelva a registrar." (RN-134)
✅ Confirmar usa la fecha que informó el participante ("Pagó el 28/12/2026") (RN-138)
✅ Sin conexión, registrar, desmarcar, confirmar y rechazar funcionan; la cuota muestra el estado nuevo con "Sin enviar" (RN-170)
✅ El cambio sin conexión queda en el historial con su fecha y hora y la etiqueta "Sin enviar" (RN-173)
✅ C-03 cuenta los cambios: con uno hecho aquí sin conexión, "2 cambios sin enviar." (RN-174)
✅ Estado "Desmarcada en otro dispositivo" (Víctor Chávez, ronda 2, "Pagada"): al desmarcar aparece "Esta cuota no tiene un pago registrado." (RN-131; iteración 1, obs. #5)
✅ En la cuota de la Junta Amigas, desmarcar el pago devuelve la junta a "En curso" y registrarlo otra vez la deja "Terminada"; P-011 y P-007 muestran el estado nuevo (RN-103, RN-104; iteración 1, obs. #6)
❌ El aviso al participante al rechazar su pago no se ve; solo lo dice el diálogo ("… recibirá un aviso.") (RN-194)
✅ Con conexión, después de registrar vuelve a P-014 con el toast "Pago registrado.", como pide la screen spec (iteración 1, obs. #24)

=== P-016 · Cambios sin enviar === (Must · HU-015, HU-009 (S))
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión".
- Enlace "Mis juntas", h1 "Cambios sin enviar", contador C-03 "1 cambio sin enviar." (`role="status"`) y, sin conexión, "Se enviarán solos cuando vuelva la conexión.".
- "Por enviar" (h2): lista numerada con el tipo ("1. Pago registrado"), "{junta} · {nombre} · ronda {n}" y "Hecho el {fecha} {hora}". Botón principal "Enviar ahora".
- "No se pudieron guardar" (h2): tarjeta por rechazo con el texto de RN-172 (`role="alert"`), "{tipo} · {junta} · hecho el {fecha} {hora}", enlace "Ver cuota" (P-015 o P-010) y botón "Entendido" (lo saca de la lista y apaga el C-03 rojo en las demás pantallas).
- Nota del prototipo sobre RN-198, RN-176 y que un rechazo no detiene los demás cambios.
- Estados que funcionan: Con datos (1 por enviar y 1 rechazo de Jorge) · Vacío ("No tiene cambios sin enviar.") · Error (solo la lista de rechazos) · Loading (enviando: botón y lista con `aria-busy`) · Sin conexión · Vuelve la conexión (3 cambios que se envían solos; iteración 1, obs. #15).
✅ "Por enviar" ordena los cambios por la hora en que se hicieron y "Enviar ahora" los manda todos (RN-087)
✅ Sin conexión, "Enviar ahora" queda como C-04 con "Necesita conexión a internet para hacer esto." (RN-170)
✅ "No se pudo guardar un cambio hecho sin conexión: el pago de Hugo Ríos de la ronda 2 ya estaba registrado." (RN-172)
✅ "Hecho el 29/12/2026 18:40" en cada cambio (RN-173)
✅ "1 cambio sin enviar." arriba de la lista (RN-174)
✅ Estado "Vuelve la conexión": la app envía sola los 3 cambios, en el orden en que se hicieron, sin pulsar "Enviar ahora" (RN-087; iteración 1, obs. #15)
✅ En "Vuelve la conexión", el cambio del medio se rechaza con "No se pudo guardar un cambio hecho sin conexión: el pago de Milagros Soto de la ronda 2 ya no estaba registrado." y los otros dos se guardan igual: un rechazo no detiene a los demás (RN-171, RN-172; iteración 1, obs. #15)
❌ Que los cambios se conservan con la sesión vencida solo lo dice la nota del prototipo (RN-176)
❌ El aviso al cerrar sesión con cambios no está en esta pantalla; solo lo menciona la nota (RN-198)
❌ "Enviar ahora" sigue simulando que el servidor aplica todo; el rechazo intermedio se ve en "Vuelve la conexión"
❌ "Entendido" solo dura en esta pestaña del navegador (sessionStorage)

=== P-018 · Informar mi pago === (Should · HU-009)
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión"; C-03 aparece al informar sin conexión.
- Enlace de regreso con el nombre de la junta (P-010), h1 "Informar mi pago", "Junta Oficina · Ronda 3", "Cuota: S/ 1,000.00" con la etiqueta de estado y "Vence el 30/01/2027".
- Texto "Informe su pago solo después de pagar al organizador. Su cuota quedará Por confirmar hasta que él o ella lo revise.".
- Único campo "Fecha de pago" (ayuda "Formato DD/MM/AAAA", valor inicial hoy, botón "Abrir calendario"). No hay campo de archivo.
- Botón principal "Informar pago" (vuelve a P-010 con el toast "Su pago quedó por confirmar.") y secundario "Cancelar" (P-010).
- Resumen de error (`role="alert"`) para los rechazos del servidor.
- Nota del prototipo sobre RN-132 y RN-054, y enlaces para probar la cuota "Por confirmar" de Lucía y la cuota propia de Jorge.
- Estados que funcionan: Con datos (Lucía, ronda 3) · Vacío (cuota que ya no está pendiente: aviso de RN-135 y "Volver a la junta") · Error (fecha 31/12/2026) · Loading (esqueleto C-10) · Sin conexión · Organizador (rechazo de RN-136).
✅ "La fecha de pago no puede ser posterior a hoy." con 31/12/2026 (estado Error) (RN-054)
✅ Sin conexión, al informar la etiqueta pasa a "Por confirmar" con "Sin enviar" y P-010 se abre en el estado "Cambio sin enviar" (RN-060)
✅ El formulario solo tiene el campo "Fecha de pago": no hay campo de archivo ni de comprobante (RN-065)
✅ "La fecha de pago no puede ser anterior a la creación de la junta." con una fecha anterior al 15/11/2026 (RN-132)
✅ Estado Vacío, o al informar la cuota "Por confirmar" de Lucía (ronda 2): "Esta cuota ya no está pendiente." (RN-135)
✅ Estado "Organizador": "Registre su propio pago con la opción 'Registrar pago'." en el resumen (RN-136)
✅ Sin conexión, "Informar pago" funciona y C-03 muestra "1 cambio sin enviar." (RN-170)
✅ Con conexión, la cuota queda "Por confirmar" en P-010, y P-014 y P-015 se la muestran a Jorge con "Informó que pagó el {fecha}" (RN-060; iteración 1, obs. #12)
❌ Lo que se informa sin conexión no entra al outbox de datos.js: P-010 marca esa misma cuota con el estado simulado "Cambio sin enviar"

=== P-019 · Asignar orden de turnos === (Should · HU-007)
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión".
- Enlace de regreso con el nombre de la junta, h1 "Asignar orden de turnos" y la ayuda "Elija un turno distinto para cada participante. El orden no se podrá cambiar después.".
- "{n} de {total} cupos ocupados" y la lista de participantes en el orden en que se unieron, cada uno con un `<select>` "Turno" (rótulo oculto "Turno de {nombre}", opciones "—" y 1 a n). La fila propia lleva "(usted)" y Ana Salinas lleva "(simulado)".
- Botón principal "Guardar orden" y secundario "Cancelar" (P-011).
- Diálogo C-07 "¿Guardar este orden de turnos?" con el texto de 09, la línea "El código T9QW 3HZ5 dejará de servir (RN-129)." y, si falla, el error con el enlace "Editar junta". Con éxito abre P-020.
- Nota del prototipo sobre el cupo simulado, la ronda 1 vencida, la casilla "Simular que Carmen ya cambió la ronda 1…" y enlaces a la Junta Ventas y a la vista de Lucía.
- Estados que funcionan: Con datos (orden válido cargado) · Vacío (selectores en "—") · Error (turno repetido y uno vacío) · Loading (diálogo enviando) · Cupos libres · Ya tiene orden · Sin conexión · Sin permiso.
✅ Al confirmar, el diálogo muestra "La fecha de vencimiento de la ronda 1 ya pasó. Cámbiela antes de fijar el orden de turnos." con "Editar junta" (Junta Familia) (RN-122)
✅ Estado "Ya tiene orden" (Junta Ventas): "Esta junta ya tiene su orden de turnos." con "Ver el orden de turnos" (RN-125)
✅ Estado "Cupos libres": "Guardar orden" como C-04 con "La junta todavía tiene cupos libres. Fije el orden de turnos cuando estén todos ocupados." (RN-126)
✅ Estado Error: "Asigne a cada participante un turno distinto, del 1 al 12." en el resumen y debajo de cada selector con problema (RN-127)
✅ El diálogo y la ayuda dicen que el orden "no se podrá cambiar" (RN-128)
✅ El diálogo avisa que el código de invitación dejará de servir y muestra el código (RN-129)
✅ Sin conexión, "Guardar orden" queda como C-04 con "Necesita conexión a internet para hacer esto." (RN-170)
✅ Si Carmen guarda "No participo" y 11 participantes en P-012 y Lucía se une en P-009, la lista tiene 11 participantes y Carmen no está (RN-030; iteración 1, obs. #23)
❌ Esta pantalla no muestra la fecha y hora de la asignación; solo el diálogo dice "Quedará registrado a su nombre". La fecha y la hora se ven en P-020 (RN-039)
✅ La línea del diálogo dice "El código T9QW 3HZ5 dejará de servir.", sin el ID de la regla (RN-129; iteración 1, obs. #18)
✅ El orden guardado queda en la pestaña: P-020 lo muestra, la junta pasa a "En curso" en P-007 y P-011 y el código deja de servir en P-009 (RN-102, RN-129; iteración 1, obs. #3)

=== P-020 · Registro del orden asignado === (Should · HU-007)
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión".
- Enlace de regreso con el nombre de la junta (P-011 si organiza, P-010 si participa) y h1 "Orden de turnos".
- Texto "Este orden lo asignó el organizador, sin sorteo.", "Asignado por Jorge Mendoza el 20/11/2026 a las 19:45" y lista numerada de turno y nombre, con "(usted)" en la fila propia (Marta Huamán).
- No hay ningún botón que cambie el registro. Si la junta se ordenó con sorteo, la página abre P-013.
- Nota del prototipo con enlaces para ver la pantalla como Marta, Jorge, Marta en la Junta Amigas y Lucía (no es miembro).
- Estados que funcionan: Con datos (Junta Ventas) · Vacío (texto de RN-105) · Error (sin permiso: "No tiene acceso a esta junta.") · Loading (esqueleto C-10) · Sin conexión. Si P-019 guardó un orden en esta pestaña, lo muestra (MiJunta.store).
✅ "Asignado por Jorge Mendoza el 20/11/2026 a las 19:45", en la hora de America/Lima (RN-093)
✅ La pantalla es de solo lectura: no hay acciones sobre el registro (RN-128)
✅ La hora se muestra como HH:MM en 24 horas ("19:45") (RN-177)
✅ Todo miembro ve el resultado, quién lo asignó y la fecha y hora (RN-195)
✅ Quien no es miembro (Lucía) ve solo "No tiene acceso a esta junta." en todos los estados, como en P-013 (RN-024; iteración 1, obs. #21)
❌ El orden que guarda P-019 dura mientras la pestaña siga abierta; no queda en datos.js

=== P-024 · Encuesta de KPI-05 === (Should · HU-018)
- No tiene ruta propia: es un diálogo sobre un fondo simplificado de P-011 (nombre de la junta, estado, cupos y código) o de P-007 (`?desde=P-007`, lista de juntas), con enlaces a la pantalla completa. Fondo atenuado y foco atrapado a mano (no usa `showModal`).
- Diálogo: título "Una encuesta de 3 preguntas", botón de cierre "Cerrar sin responder" (ícono ✕) y el texto "Nos ayuda a medir si Mi Junta le ahorra tiempo.".
- Preguntas: "¿Cuántas horas al mes dedica a gestionar sus juntas?" y "¿Cuántos recordatorios envía a mano al mes?" (`inputmode="numeric"`, sin rango) y "¿Reenvía por WhatsApp los recordatorios de Mi Junta?" con "Sí" / "No".
- Botón principal "Enviar respuestas" (vuelve con el toast "Gracias por responder.") y secundario "Cerrar sin responder". `Esc` también cierra sin responder.
- Nota del prototipo con el momento que se simula, el aviso [REQUIERE DECISIÓN] de PREG-071 y el botón "Abrir la encuesta otra vez".
- Estados que funcionan: Con datos (respuestas de Jorge) · Vacío (abierta, sin respuestas) · Error (2.5 horas) · Loading (esqueleto dentro del diálogo) · Enviando · Cerrada · Sin conexión (el diálogo no se abre). Si ya se cerró sin responder en esta pestaña, la pantalla abre en "Cerrada".
✅ La encuesta tiene solo las 3 preguntas de la regla y no pide celular, correo ni datos de otros miembros (RN-206)
✅ "Cerrar sin responder" (botón y ✕) cierra la encuesta y vuelve a P-011 o P-007 (RN-210)
✅ "Cerrar sin responder" queda registrado en la pestaña: al volver a abrir la pantalla, empieza en "Cerrada" y la encuesta no se muestra otra vez (RN-210, RN-211; iteración 1, obs. #20)
❌ El error de respuesta no entera muestra al usuario el texto "[REQUIERE DECISIÓN] Texto pendiente para una respuesta que no es un número entero (PREG-071)." (estado Error). Sigue pendiente del PO (obs. #19): no hay un texto aprobado
❌ El rango de las respuestas numéricas y si son obligatorias siguen sin decidir (PREG-071); el prototipo no pone rango ni obligatoriedad
❌ Nadie en datos.js tiene la encuesta pendiente: se simula la de Carmen

=== P-021 · Segundo factor === (Should · HU-003)
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión".
- Enlace "Mi cuenta", h1 "Segundo factor", "Estado: Desactivado" o "Estado: Activado" (`role="status"`) y el texto "Cada vez que inicie sesión, le enviaremos a su correo un código de 6 dígitos que vale 10 minutos.".
- Desactivado: botón principal "Activar segundo factor".
- Código enviado: aviso "Le enviamos un código a lucia@example.com.", campo "Código de verificación" (`inputmode="numeric"`, `autocomplete="one-time-code"`, `maxlength="6"`), botón "Confirmar código" y botón de texto "Pedir otro código".
- Activado: h2 "Desactivar segundo factor", campos "Contraseña" (con "Mostrar contraseña") y "Código de verificación", botones "Enviar código" y "Desactivar segundo factor" (`disabled` mientras falte alguno de los dos).
- Nota del prototipo con el código vigente, los códigos que ya no sirven, los contadores de intentos y pedidos, la contraseña de prueba y el botón "Simular que pasaron 10 minutos".
- Estados que funcionan: Con datos (código enviado) · Vacío (desactivado, sin código) · Error (código 111111) · Loading (confirmando) · Límite de pedidos · Activado · Desactivando · Sin conexión.
✅ "Activar segundo factor" envía el código y muestra "Le enviamos un código a lucia@example.com." con el campo (RN-165)
✅ El texto de la pantalla dice que el código tiene 6 dígitos y llega al correo en cada inicio de sesión (RN-079)
✅ Después de "Simular que pasaron 10 minutos", el código vigente da "Este código ya no es válido. Pida uno nuevo." (RN-080)
✅ Con 5 intentos fallidos el código se anula y el siguiente intento da "Este código ya no es válido. Pida uno nuevo." (RN-081)
✅ Un código ya usado (el de la activación, al desactivar) da "Este código ya no es válido. Pida uno nuevo." (RN-162)
✅ Después de "Pedir otro código", el código anterior da "Este código ya no es válido. Pida uno nuevo." (RN-163)
✅ Estado "Límite de pedidos": "Ya pidió varios códigos. Intente de nuevo en {n} minutos." (RN-164)
✅ El código correcto deja "Estado: Activado"; uno equivocado da "El código no es correcto. Revíselo e intente de nuevo." (estado Error) (RN-166)
✅ "Desactivar segundo factor" queda `disabled` sin contraseña o sin código; con la contraseña mal escrita, "La contraseña no es correcta." (RN-167)
✅ Sin conexión, todos los botones quedan como C-04 con "Necesita conexión a internet para hacer esto." (RN-170)
❌ La pantalla no muestra cuánto le queda al código: la vigencia y los contadores de intentos y pedidos solo están en la nota, y el paso del tiempo se simula con un botón (RN-080, RN-081, RN-164)
❌ No hay ningún aviso después de activar o desactivar: solo cambia el texto del estado
❌ "La contraseña no es correcta." viene de P-023; 09 no define ese texto para P-021 (PREG-070)

=== P-022 · Código de verificación al iniciar sesión === (Should · HU-003)
- Encabezado C-01 solo con "Mi Junta" (lleva a P-003), sin navegación. C-02 en "Sin conexión".
- h1 "Código de verificación" y "Le enviamos un código de 6 dígitos a su correo. Vale hasta las 19:00." (`aria-live`).
- Alerta con el texto de RN-080 en el estado "Código vencido o anulado".
- Campo "Código de verificación" (`inputmode="numeric"`, `autocomplete="one-time-code"`, `maxlength="6"`), botón principal "Entrar", botón de texto "Pedir otro código" y enlace "Volver a iniciar sesión" (P-003, conserva el código de invitación).
- Con el código correcto, Jorge pasa a P-006 en modo aceptación (como desde P-003).
- Nota del prototipo con el código vigente, los que ya no sirven (361507 usado), los contadores, RN-078, RN-080 y RN-081 y el botón "Simular que pasaron 10 minutos".
- Estados que funcionan: Con datos (código escrito) · Vacío (campo vacío) · Error (código 111111) · Loading (botón "Entrar" con carga) · Código vencido o anulado · Límite de pedidos · Sin conexión.
✅ Solo se entra con un código válido: "Entrar" revisa el código y cualquier otro valor deja la pantalla con un error (RN-078)
✅ "Le enviamos un código de 6 dígitos a su correo. Vale hasta las 19:00." al abrir la pantalla (RN-079)
✅ Estado "Código vencido o anulado": "Este código ya no es válido. Pida uno nuevo." en la alerta y al pulsar "Entrar" (RN-080)
✅ Con 5 intentos fallidos el código se anula y el siguiente da "Este código ya no es válido. Pida uno nuevo." (RN-081)
✅ 361507 (ya usado) da "Este código ya no es válido. Pida uno nuevo." (RN-162)
✅ Después de "Pedir otro código", el anterior da el mismo mensaje y "Vale hasta las…" se actualiza (RN-163)
✅ Estado "Límite de pedidos": "Ya pidió varios códigos. Intente de nuevo en {n} minutos." (RN-164)
✅ Un código equivocado da "El código no es correcto. Revíselo e intente de nuevo." (estado Error) (RN-166)
✅ Sin conexión, "Entrar" y "Pedir otro código" quedan como C-04 con "Necesita conexión a internet para hacer esto." (RN-170)
❌ RN-166 trata de la activación del segundo factor, no del inicio de sesión: el mensaje de código equivocado no tiene una RN propia en esta pantalla (ver Alertas del plan) (RN-166)
❌ Los contadores de intentos y pedidos solo están en la nota del prototipo, y el vencimiento se simula con un botón (RN-080, RN-081, RN-164)

=== P-023 · Borrar mi cuenta === (Should · HU-017)
- Encabezado C-01 con navegación y barra inferior. C-02 en "Sin conexión".
- Enlace "Mi cuenta", h1 "Borrar mi cuenta" y alerta de rechazo (`role="alert"`) en los estados de rechazo.
- Tarjeta con fondo rojo claro y 4 puntos: "Se borrarán su nombre, su correo, su contraseña, su DNI y su celular.", "Saldrá de las juntas que todavía no fijaron su orden de turnos.", "En las juntas terminadas, sus pagos se conservan a nombre de "Participante eliminado"." y "No podrá borrarla si es miembro de una junta en curso o si organiza una junta que todavía no fija su orden de turnos.".
- Campo "Contraseña" con "Mostrar contraseña", botón rojo "Borrar mi cuenta" y secundario "Cancelar" (P-017).
- Diálogo C-07 "¿Borrar su cuenta?" / "Esta acción no se puede deshacer." con "Borrar mi cuenta" y "Cancelar". La contraseña se revisa después de confirmar. Con éxito abre P-003 con "Su cuenta fue borrada.".
- Nota del prototipo con lo que pasaría junta por junta, la contraseña de prueba y enlaces para ver la pantalla como Rosa, Lucía, Carmen, Teresa y Sofía.
- Estados que funcionan: Con datos (contraseña escrita) · Vacío (inicial, campo vacío) · Error ("La contraseña no es correcta.") · Loading (botón con carga) · Diálogo · Rechazo: junta en curso · Rechazo: organiza una junta · Sin conexión.
✅ Sin conexión, "Borrar mi cuenta" queda como C-04 con "Necesita conexión a internet para hacer esto." (RN-170)
✅ Estado "Rechazo: junta en curso" (o Lucía al confirmar): "Usted es miembro de una junta en curso. Podrá borrar su cuenta cuando todas sus juntas en curso terminen." (RN-182)
✅ Texto "En las juntas terminadas, sus pagos se conservan a nombre de "Participante eliminado"." (RN-183, RN-184)
✅ Texto "Se borrarán su nombre, su correo, su contraseña, su DNI y su celular." (RN-185)
✅ Texto "Saldrá de las juntas que todavía no fijaron su orden de turnos." (RN-186)
✅ Estado "Rechazo: organiza una junta" (o Carmen al confirmar): "Usted organiza una junta que todavía no fija su orden de turnos. No puede borrar su cuenta mientras la organice." (RN-207)
❌ No se ve que se borren los datos personales, que la persona salga de las juntas abiertas ni que se conserven los pagos: solo los textos de la tarjeta y la nota del prototipo (RN-183, RN-184, RN-185, RN-186)
✅ Al borrar la cuenta, la app borra del dispositivo sus cambios sin enviar (`MiJunta.store.clearDevice`) y P-003 se abre sin el aviso de outbox (iteración 1, obs. #16)
