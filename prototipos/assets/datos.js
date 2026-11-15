/*
 * Mi Junta · Datos ficticios de los prototipos
 *
 * Prototipo para validar con stakeholders. NO es código de producción.
 * Todas las pantallas usan este mismo set de datos, para que no se contradigan.
 *
 * Fuentes: spec-pack/03-reglas-de-negocio.md v0.4 ("Datos de ejemplo" y
 * catálogo §2.9), spec-pack/07-architecture.md v0.4 §3.2 (nombres del modelo de
 * datos) y los wireframes de spec-pack/09-ui-spec.md v1.0.
 *
 * Convenciones (00-constitucion.md):
 *   - Identificadores en inglés, salvo "junta" (PRINCIPIO-002). Comentarios y
 *     textos que ve el usuario, en español de Perú y de "usted".
 *   - Montos en céntimos enteros (sufijo Cents). Se muestran con formatMoney():
 *     30000 → "S/ 300.00" (PRINCIPIO-003, RN-040, RN-091).
 *   - Fechas sin hora como "AAAA-MM-DD" y fechas con hora como ISO 8601 con
 *     -05:00. Se muestran con formatDate() y formatTime() en America/Lima:
 *     "30/11/2026" y "19:30" (RN-092, RN-093, RN-177).
 *   - Celular ^9\d{8}$ y DNI ^\d{8}$ (PRINCIPIO-003). Son datos personales:
 *     solo la pantalla de la propia cuenta los usa. Ninguna pantalla muestra el
 *     correo, el celular ni el DNI de otro miembro (PRINCIPIO-006, RN-023,
 *     RN-178). Por eso las funciones de miembros no los devuelven.
 *
 * Fecha simulada: hoy es 29/12/2026 en America/Lima (meta.today). Con esa
 * fecha la ronda actual de la Junta Oficina es la 2 (vence el 30/12/2026), como
 * en los wireframes de P-010, P-011 y P-014.
 *
 * Lo que se calcula y no se escribe a mano, para que cumpla las reglas:
 *   - vencimiento de cada ronda (RN-046 a RN-050);
 *   - turno de cada participante y receptor del pozo (RN-036, RN-037);
 *   - pozo = cuota × participantes (RN-041);
 *   - estado de cada cuota según sus pagos, correcciones y pagos informados
 *     (RN-045, RN-053, RN-059, RN-060, RN-062, RN-063);
 *   - "a tiempo" o "atrasado" (RN-055, RN-056);
 *   - ronda actual y próxima cuota (04-glosario.md, PREG-039).
 *
 * Uso en una pantalla:
 *   <script src="assets/datos.js"></script>
 *   const user = MiJunta.getCurrentUser();          // ?usuario=user_789 lo cambia
 *   const juntas = MiJunta.getJuntasForUser(user.id);
 *   MiJunta.formatMoney(MiJunta.getPotCents(juntas[0]));  // "S/ 10,000.00"
 *   MiJunta.message('RN-130');                      // "Esta cuota ya no está pendiente."
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------------
     Datos base
     ------------------------------------------------------------------------ */

  // Fecha y hora simuladas del prototipo, en America/Lima.
  const meta = {
    today: '2026-12-29',
    now: '2026-12-29T18:50:00-05:00',
    lastSyncAt: '2026-12-29T18:30:00-05:00',   // C-02: "Última sincronización"
    timeZone: 'America/Lima',
  };

  // Política de privacidad. El texto lo escribe el asesor legal (PREG-001).
  // exampleNewVersion solo sirve para mostrar el modo "aceptar versión nueva" de
  // P-006; no es una versión publicada.
  const privacyPolicy = {
    currentVersion: '1.0',
    publishedAt: '2026-11-14T08:00:00-05:00',
    exampleNewVersion: '1.1',
  };

  // Crea un usuario con los valores por defecto de 07 §3.2.
  function user(id, name, email, createdAt, extra) {
    return Object.assign({
      id: id,
      name: name,                       // 2 a 80 caracteres (RN-147)
      email: email,
      emailVerifiedAt: createdAt,
      dni: null,                        // opcional (RN-148)
      phone: null,                      // opcional (RN-148)
      twoFactorEnabled: false,
      emailRemindersEnabled: true,      // RN-187
      overdueNoticesEnabled: true,      // RN-208
      pushEnabled: false,               // RN-073
      consent: { policyVersion: '1.0', acceptedAt: createdAt },   // RN-083, RN-084
      ageConfirmedAt: createdAt,        // RN-181
      createdAt: createdAt,
      deletedAt: null,
    }, extra || {});
  }

  const users = [
    // Junta Familia (Carmen y sus familiares)
    user('user_123', 'Carmen Mamani', 'carmen.mamani@example.com', '2026-11-14T08:40:00-05:00', { phone: '998877665' }),
    user('user_124', 'Teresa Mamani', 'teresa.mamani@example.com', '2026-11-14T12:10:00-05:00'),
    user('user_125', 'José Mamani', 'jose.mamani@example.com', '2026-11-14T13:25:00-05:00'),
    user('user_126', 'Flor Mamani', 'flor.mamani@example.com', '2026-11-14T19:02:00-05:00'),
    user('user_127', 'Alberto Mamani', 'alberto.mamani@example.com', '2026-11-15T09:15:00-05:00'),
    user('user_128', 'Nancy Condori', 'nancy.condori@example.com', '2026-11-15T11:40:00-05:00'),
    user('user_129', 'Wilmer Mamani', 'wilmer.mamani@example.com', '2026-11-15T20:05:00-05:00'),
    user('user_130', 'Yolanda Mamani', 'yolanda.mamani@example.com', '2026-11-16T08:30:00-05:00'),
    user('user_131', 'Edgar Condori', 'edgar.condori@example.com', '2026-11-16T21:00:00-05:00'),
    user('user_132', 'Maribel Mamani', 'maribel.mamani@example.com', '2026-11-17T07:45:00-05:00'),
    user('user_133', 'Fredy Condori', 'fredy.condori@example.com', '2026-11-18T18:20:00-05:00'),

    // Junta Oficina (Jorge organiza y participa)
    user('user_456', 'Jorge Mendoza', 'jorge.mendoza@example.com', '2026-11-15T09:50:00-05:00', {
      phone: '912345678', twoFactorEnabled: true, pushEnabled: true,
    }),
    user('user_234', 'Pedro Ramírez', 'pedro.ramirez@example.com', '2026-11-15T12:20:00-05:00'),
    user('user_789', 'Lucía Quispe', 'lucia@example.com', '2026-11-14T10:32:00-05:00', {
      dni: '45879213', phone: '987654321',
    }),
    user('user_501', 'Martín Salazar', 'martin.salazar@example.com', '2026-11-16T08:40:00-05:00'),
    user('user_502', 'Gabriela Torres', 'gabriela.torres@example.com', '2026-11-16T13:05:00-05:00'),
    user('user_503', 'Diana Castillo', 'diana.castillo@example.com', '2026-11-17T09:20:00-05:00'),
    user('user_504', 'Luis Paredes', 'luis.paredes@example.com', '2026-11-17T20:55:00-05:00'),
    user('user_505', 'Karina Rojas', 'karina.rojas@example.com', '2026-11-18T07:45:00-05:00'),
    user('user_506', 'Víctor Chávez', 'victor.chavez@example.com', '2026-11-18T19:30:00-05:00'),
    user('user_507', 'Silvia Flores', 'silvia.flores@example.com', '2026-11-19T12:00:00-05:00'),

    // Junta Ventas (Jorge organiza sin participar)
    user('user_610', 'Marta Huamán', 'marta.huaman@example.com', '2026-11-14T16:45:00-05:00', { phone: '956123478' }),
    user('user_611', 'Óscar Villanueva', 'oscar.villanueva@example.com', '2026-11-16T12:30:00-05:00'),
    user('user_612', 'Patricia León', 'patricia.leon@example.com', '2026-11-16T14:10:00-05:00'),
    user('user_613', 'Raúl Cárdenas', 'raul.cardenas@example.com', '2026-11-16T17:45:00-05:00'),
    user('user_614', 'Elena Vargas', 'elena.vargas@example.com', '2026-11-17T08:05:00-05:00'),
    user('user_615', 'Hugo Ríos', 'hugo.rios@example.com', '2026-11-17T10:50:00-05:00'),
    user('user_616', 'Milagros Soto', 'milagros.soto@example.com', '2026-11-17T18:15:00-05:00'),
    user('user_617', 'César Aguilar', 'cesar.aguilar@example.com', '2026-11-18T09:35:00-05:00'),
    user('user_618', 'Rocío Medina', 'rocio.medina@example.com', '2026-11-18T15:20:00-05:00'),
    user('user_619', 'Julio Espinoza', 'julio.espinoza@example.com', '2026-11-19T19:10:00-05:00'),

    // Junta Amigas (terminada): Sofía organiza y participa
    user('user_620', 'Sofía Paz', 'sofia.paz@example.com', '2026-11-14T15:50:00-05:00'),
    // Borró su cuenta el 20/12/2026: sus datos personales quedan en nulo (RN-185)
    // y las vistas lo muestran como "Participante eliminado" (RN-183).
    user('user_621', null, null, '2026-11-15T07:55:00-05:00', { deletedAt: '2026-12-20T10:00:00-05:00' }),

    // Rosa: tiene cuenta, no es miembro de ninguna junta y no verificó su correo
    user('user_301', 'Rosa Delgado', 'rosa.delgado@example.com', '2026-12-28T21:15:00-05:00', { emailVerifiedAt: null }),
  ];

  // Ana no tiene cuenta (03, "Datos de ejemplo"). Estos son los datos que
  // escribiría al crear su cuenta en P-001.
  const examples = {
    newAccount: { name: 'Ana Salinas', email: 'ana.salinas@example.com', dni: '72345618', phone: '976543210' },
    // Códigos para probar P-009 (RN-116, RN-019, RN-020)
    inviteCodes: { valid: 'T9QW3HZ5', regenerated: 'K7MP4XR2', revokedByDraw: 'M3QX7KPA', unknown: 'H2RZ8QWN' },
    // Contraseña que aceptan todas las cuentas en P-003. Solo existe en el
    // prototipo: la app nunca guarda contraseñas en claro (PRINCIPIO-005).
    demoPassword: 'Junta2026',
    // Cuenta que, al iniciar sesión, tiene que aceptar la versión
    // privacyPolicy.exampleNewVersion antes de ver sus juntas (RN-168).
    // Jorge además tiene segundo factor, así que recorre UF-02 completo:
    // P-003 → P-022 → P-006 (aceptación) → P-007.
    policyAcceptancePendingUserId: 'user_456',
  };

  const juntas = [
    {
      id: 'junta_familia',
      name: 'Junta Familia',
      organizerId: 'user_123',
      organizerParticipates: true,
      contributionAmountCents: 30000,          // S/ 300.00
      participantCount: 12,
      frequency: 'monthly',
      frequencyDays: null,
      round1DueDate: '2026-11-30',
      reminderLeadDays: 3,
      juntaRules: 'Pagamos por Yape a Carmen hasta el día de vencimiento.\n' +
        'Si alguien no puede pagar a tiempo, avisa en el grupo de la familia antes del vencimiento.\n' +
        'El orden se sortea en la app cuando estemos los 12.',
      status: 'open',                          // 11 de 12 cupos
      createdAt: '2026-11-14T09:00:00-05:00',
      createdOn: '2026-11-14',
      turnOrderFixedAt: null,
    },
    {
      id: 'junta_oficina',
      name: 'Junta Oficina',
      organizerId: 'user_456',
      organizerParticipates: true,
      contributionAmountCents: 100000,         // S/ 1,000.00
      participantCount: 10,
      frequency: 'monthly',
      frequencyDays: null,
      round1DueDate: '2026-11-30',
      reminderLeadDays: 3,
      juntaRules: 'La cuota se paga por Yape, Plin o en efectivo a Jorge.\n' +
        'Jorge registra cada pago en Mi Junta el mismo día que lo recibe.',
      status: 'in_progress',
      createdAt: '2026-11-15T10:05:00-05:00',
      createdOn: '2026-11-15',
      turnOrderFixedAt: '2026-11-20T19:30:12-05:00',
    },
    {
      id: 'junta_ventas',
      name: 'Junta Ventas',
      organizerId: 'user_456',
      organizerParticipates: false,
      contributionAmountCents: 50000,          // S/ 500.00
      participantCount: 10,
      frequency: 'every_15_days',
      frequencyDays: null,
      round1DueDate: '2026-12-01',
      reminderLeadDays: 3,
      juntaRules: null,                        // sin reglas escritas
      status: 'in_progress',
      createdAt: '2026-11-16T11:20:00-05:00',
      createdOn: '2026-11-16',
      turnOrderFixedAt: '2026-11-20T19:45:00-05:00',
    },
    {
      // Junta agregada para el prototipo (no está en 03): muestra el estado
      // "Terminada" y a un "Participante eliminado".
      id: 'junta_amigas',
      name: 'Junta Amigas',
      organizerId: 'user_620',
      organizerParticipates: true,
      contributionAmountCents: 5000,           // S/ 50.00
      participantCount: 3,
      frequency: 'weekly',
      frequencyDays: null,
      round1DueDate: '2026-11-21',
      reminderLeadDays: 2,
      juntaRules: null,
      status: 'finished',
      createdAt: '2026-11-14T16:00:00-05:00',
      createdOn: '2026-11-14',
      turnOrderFixedAt: '2026-11-15T09:10:00-05:00',
    },
  ];

  // Membresías. slotTakenAt ordena la lista de entrada del sorteo (RN-123).
  // El organizador que no participa no ocupa cupo (RN-006).
  function member(juntaId, userId, slotTakenAt, isOrganizer) {
    return {
      juntaId: juntaId,
      userId: userId,
      isOrganizer: !!isOrganizer,
      occupiesSlot: slotTakenAt !== null,
      slotTakenAt: slotTakenAt,
      leftAt: null,
    };
  }

  const memberships = [
    member('junta_familia', 'user_123', '2026-11-14T09:00:00-05:00', true),
    member('junta_familia', 'user_124', '2026-11-14T12:15:00-05:00'),
    member('junta_familia', 'user_125', '2026-11-14T13:30:00-05:00'),
    member('junta_familia', 'user_126', '2026-11-14T19:05:00-05:00'),
    member('junta_familia', 'user_127', '2026-11-15T09:20:00-05:00'),
    member('junta_familia', 'user_128', '2026-11-15T11:45:00-05:00'),
    member('junta_familia', 'user_129', '2026-11-15T20:10:00-05:00'),
    member('junta_familia', 'user_130', '2026-11-16T08:35:00-05:00'),
    member('junta_familia', 'user_131', '2026-11-16T21:05:00-05:00'),
    member('junta_familia', 'user_132', '2026-11-17T07:50:00-05:00'),
    member('junta_familia', 'user_133', '2026-11-18T18:25:00-05:00'),

    member('junta_oficina', 'user_456', '2026-11-15T10:05:00-05:00', true),
    member('junta_oficina', 'user_234', '2026-11-15T12:30:00-05:00'),
    member('junta_oficina', 'user_789', '2026-11-15T18:02:00-05:00'),
    member('junta_oficina', 'user_501', '2026-11-16T08:47:00-05:00'),
    member('junta_oficina', 'user_502', '2026-11-16T13:15:00-05:00'),
    member('junta_oficina', 'user_503', '2026-11-17T09:30:00-05:00'),
    member('junta_oficina', 'user_504', '2026-11-17T21:05:00-05:00'),
    member('junta_oficina', 'user_505', '2026-11-18T07:55:00-05:00'),
    member('junta_oficina', 'user_506', '2026-11-18T19:40:00-05:00'),
    member('junta_oficina', 'user_507', '2026-11-19T12:10:00-05:00'),

    member('junta_ventas', 'user_456', null, true),
    member('junta_ventas', 'user_610', '2026-11-16T12:00:00-05:00'),
    member('junta_ventas', 'user_611', '2026-11-16T12:40:00-05:00'),
    member('junta_ventas', 'user_612', '2026-11-16T14:20:00-05:00'),
    member('junta_ventas', 'user_613', '2026-11-16T17:50:00-05:00'),
    member('junta_ventas', 'user_614', '2026-11-17T08:10:00-05:00'),
    member('junta_ventas', 'user_615', '2026-11-17T11:00:00-05:00'),
    member('junta_ventas', 'user_616', '2026-11-17T18:20:00-05:00'),
    member('junta_ventas', 'user_617', '2026-11-18T09:40:00-05:00'),
    member('junta_ventas', 'user_618', '2026-11-18T15:30:00-05:00'),
    member('junta_ventas', 'user_619', '2026-11-19T19:15:00-05:00'),

    member('junta_amigas', 'user_620', '2026-11-14T16:00:00-05:00', true),
    member('junta_amigas', 'user_610', '2026-11-14T17:30:00-05:00'),
    member('junta_amigas', 'user_621', '2026-11-15T08:00:00-05:00'),
  ];

  // Códigos de invitación: 8 caracteres de ABCDEFGHJKLMNPQRSTUVWXYZ23456789
  // (RN-015). Ninguno se reutiliza (RN-016). Solo el de la Junta Familia está
  // vigente: los demás se anularon al fijar el orden (RN-019, RN-129) o al
  // regenerarlo (RN-020).
  const inviteCodes = [
    { code: 'K7MP4XR2', juntaId: 'junta_familia', createdAt: '2026-11-14T09:00:00-05:00', revokedAt: '2026-11-16T20:10:00-05:00', revokeReason: 'regenerated' },
    { code: 'T9QW3HZ5', juntaId: 'junta_familia', createdAt: '2026-11-16T20:10:00-05:00', revokedAt: null, revokeReason: null },
    { code: 'M3QX7KPA', juntaId: 'junta_oficina', createdAt: '2026-11-15T10:05:00-05:00', revokedAt: '2026-11-20T19:30:12-05:00', revokeReason: 'turn_order_fixed' },
    { code: 'W8RT5NHC', juntaId: 'junta_ventas', createdAt: '2026-11-16T11:20:00-05:00', revokedAt: '2026-11-20T19:45:00-05:00', revokeReason: 'turn_order_fixed' },
    { code: 'P4NV8JDE', juntaId: 'junta_amigas', createdAt: '2026-11-14T16:00:00-05:00', revokedAt: '2026-11-15T09:10:00-05:00', revokeReason: 'turn_order_fixed' },
  ];

  // Registro del sorteo de la Junta Oficina (PRINCIPIO-008, RN-034).
  // Es reproducible de verdad: aplicando fisher-yates-v1 (03, anexo A) a input
  // con esta semilla sale exactamente result. Se verificó con el vector de
  // prueba del anexo A antes de generar la semilla.
  const draws = [
    {
      juntaId: 'junta_oficina',
      seedHex: '5c255276d1eaa7a2556b2931a218677ebba3049e5da78271f6529415b7116b15',
      algorithmVersion: 'fisher-yates-v1',
      // Ordenada por el momento en que cada uno ocupó su cupo (RN-123)
      input: ['user_456', 'user_234', 'user_789', 'user_501', 'user_502', 'user_503', 'user_504', 'user_505', 'user_506', 'user_507'],
      // Turno = posición en el resultado, contando desde 1 (RN-036)
      result: ['user_501', 'user_234', 'user_502', 'user_456', 'user_505', 'user_506', 'user_789', 'user_503', 'user_507', 'user_504'],
      executedBy: 'user_456',
      executedAt: '2026-11-20T19:30:12-05:00',
    },
  ];

  // Orden asignado sin sorteo (F-10, RN-038, RN-039, RN-195)
  const turnAssignments = [
    {
      juntaId: 'junta_ventas',
      result: ['user_610', 'user_613', 'user_611', 'user_615', 'user_612', 'user_617', 'user_614', 'user_619', 'user_616', 'user_618'],
      assignedBy: 'user_456',
      assignedAt: '2026-11-20T19:45:00-05:00',
    },
    {
      juntaId: 'junta_amigas',
      result: ['user_610', 'user_621', 'user_620'],
      assignedBy: 'user_620',
      assignedAt: '2026-11-15T09:10:00-05:00',
    },
  ];

  /*
   * Pagos registrados por el organizador. Solo inserción: un pago no se edita
   * (RN-134); si se corrige, queda el registro original y una corrección aparte
   * (RN-057, RN-058). "a tiempo" o "atrasado" se calcula (RN-055, RN-056).
   * Toda fecha de pago es posterior a la creación de la junta (RN-132) y no es
   * posterior a hoy (RN-054).
   */
  let paymentSeq = 0;
  function pay(juntaId, roundNumber, participantId, paidOn, recordedAt, recordedBy, extra) {
    paymentSeq += 1;
    return Object.assign({
      id: 'pay_' + String(paymentSeq).padStart(3, '0'),
      juntaId: juntaId,
      roundNumber: roundNumber,
      participantId: participantId,
      paidOn: paidOn,
      source: 'organizer',
      recordedBy: recordedBy,
      recordedAt: recordedAt,
    }, extra || {});
  }

  const J = 'user_456';   // Jorge registra los pagos de sus dos juntas
  const S = 'user_620';   // Sofía registra los de la Junta Amigas

  const payments = [
    // Junta Oficina · Ronda 1 (vence 30/11/2026): todas pagadas
    pay('junta_oficina', 1, 'user_456', '2026-11-20', '2026-11-20T19:40:00-05:00', J),
    pay('junta_oficina', 1, 'user_502', '2026-11-25', '2026-11-25T19:00:00-05:00', J),
    pay('junta_oficina', 1, 'user_789', '2026-11-25', '2026-11-28T18:40:00-05:00', J, { id: 'pay_lucia_r1_a' }),  // se corrigió
    pay('junta_oficina', 1, 'user_501', '2026-11-27', '2026-11-27T20:10:00-05:00', J),
    pay('junta_oficina', 1, 'user_504', '2026-11-28', '2026-11-28T18:45:00-05:00', J),
    pay('junta_oficina', 1, 'user_505', '2026-11-29', '2026-11-29T10:15:00-05:00', J),
    pay('junta_oficina', 1, 'user_503', '2026-11-29', '2026-11-29T21:30:00-05:00', J, { source: 'reported_confirmation', reportedPaymentId: 'rep_001' }),
    pay('junta_oficina', 1, 'user_234', '2026-11-30', '2026-11-30T21:00:00-05:00', J),
    pay('junta_oficina', 1, 'user_507', '2026-11-30', '2026-11-30T22:05:00-05:00', J),
    pay('junta_oficina', 1, 'user_506', '2026-12-02', '2026-12-02T18:20:00-05:00', J),   // atrasado
    pay('junta_oficina', 1, 'user_789', '2026-11-28', '2026-12-02T08:16:00-05:00', J, { id: 'pay_lucia_r1_b' }),  // vuelve a registrarse

    // Junta Oficina · Ronda 2 (vence 30/12/2026, ronda actual)
    pay('junta_oficina', 2, 'user_506', '2026-12-15', '2026-12-15T18:00:00-05:00', J),
    pay('junta_oficina', 2, 'user_501', '2026-12-20', '2026-12-20T18:00:00-05:00', J),
    pay('junta_oficina', 2, 'user_502', '2026-12-22', '2026-12-22T20:30:00-05:00', J),
    pay('junta_oficina', 2, 'user_456', '2026-12-26', '2026-12-26T19:00:00-05:00', J),
    pay('junta_oficina', 2, 'user_503', '2026-12-27', '2026-12-27T09:40:00-05:00', J),
    pay('junta_oficina', 2, 'user_504', '2026-12-28', '2026-12-28T19:10:00-05:00', J),

    // Junta Oficina · Ronda 3 (vence 30/01/2027): pago adelantado (RN-133)
    pay('junta_oficina', 3, 'user_502', '2026-12-22', '2026-12-22T20:31:00-05:00', J),

    // Junta Ventas · Ronda 1 (vence 01/12/2026): todas pagadas
    pay('junta_ventas', 1, 'user_614', '2026-11-27', '2026-11-27T19:20:00-05:00', J),
    pay('junta_ventas', 1, 'user_610', '2026-11-28', '2026-11-28T12:05:00-05:00', J),
    pay('junta_ventas', 1, 'user_613', '2026-11-29', '2026-11-29T17:30:00-05:00', J),
    pay('junta_ventas', 1, 'user_617', '2026-11-29', '2026-11-29T18:10:00-05:00', J),
    pay('junta_ventas', 1, 'user_611', '2026-11-30', '2026-11-30T09:45:00-05:00', J),
    pay('junta_ventas', 1, 'user_616', '2026-11-30', '2026-11-30T20:00:00-05:00', J),
    pay('junta_ventas', 1, 'user_612', '2026-12-01', '2026-12-01T13:15:00-05:00', J),
    pay('junta_ventas', 1, 'user_615', '2026-12-01', '2026-12-01T18:30:00-05:00', J),
    pay('junta_ventas', 1, 'user_618', '2026-12-01', '2026-12-01T21:40:00-05:00', J),
    pay('junta_ventas', 1, 'user_619', '2026-12-03', '2026-12-03T10:00:00-05:00', J),   // atrasado

    // Junta Ventas · Ronda 2 (vence 16/12/2026): Milagros sigue "Pendiente"
    pay('junta_ventas', 2, 'user_614', '2026-12-12', '2026-12-12T16:00:00-05:00', J),
    pay('junta_ventas', 2, 'user_610', '2026-12-14', '2026-12-14T11:30:00-05:00', J),
    pay('junta_ventas', 2, 'user_612', '2026-12-15', '2026-12-15T19:00:00-05:00', J),
    pay('junta_ventas', 2, 'user_618', '2026-12-15', '2026-12-15T20:20:00-05:00', J),
    pay('junta_ventas', 2, 'user_611', '2026-12-16', '2026-12-16T10:10:00-05:00', J),
    pay('junta_ventas', 2, 'user_617', '2026-12-16', '2026-12-16T18:00:00-05:00', J),
    pay('junta_ventas', 2, 'user_619', '2026-12-17', '2026-12-17T09:05:00-05:00', J),   // atrasado
    pay('junta_ventas', 2, 'user_613', '2026-12-18', '2026-12-18T12:45:00-05:00', J),   // atrasado
    pay('junta_ventas', 2, 'user_615', '2026-12-16', '2026-12-28T09:50:00-05:00', J),   // registrado tarde, pagó a tiempo

    // Junta Ventas · Ronda 3 (vence 31/12/2026, ronda actual)
    pay('junta_ventas', 3, 'user_614', '2026-12-26', '2026-12-26T17:00:00-05:00', J),
    pay('junta_ventas', 3, 'user_610', '2026-12-27', '2026-12-27T10:30:00-05:00', J),
    pay('junta_ventas', 3, 'user_611', '2026-12-28', '2026-12-28T12:00:00-05:00', J),
    pay('junta_ventas', 3, 'user_612', '2026-12-29', '2026-12-29T09:15:00-05:00', J),

    // Junta Amigas: las 9 cuotas pagadas, por eso está "Terminada" (RN-103)
    pay('junta_amigas', 1, 'user_620', '2026-11-19', '2026-11-19T20:00:00-05:00', S),
    pay('junta_amigas', 1, 'user_610', '2026-11-20', '2026-11-20T18:30:00-05:00', S),
    pay('junta_amigas', 1, 'user_621', '2026-11-21', '2026-11-21T12:00:00-05:00', S),
    pay('junta_amigas', 2, 'user_610', '2026-11-27', '2026-11-27T19:00:00-05:00', S),
    pay('junta_amigas', 2, 'user_620', '2026-11-28', '2026-11-28T08:00:00-05:00', S),
    pay('junta_amigas', 2, 'user_621', '2026-11-28', '2026-11-28T13:40:00-05:00', S),
    pay('junta_amigas', 3, 'user_621', '2026-12-04', '2026-12-04T18:00:00-05:00', S),
    pay('junta_amigas', 3, 'user_610', '2026-12-05', '2026-12-05T10:20:00-05:00', S),
    pay('junta_amigas', 3, 'user_620', '2026-12-05', '2026-12-05T11:00:00-05:00', S),
  ];

  // Correcciones: un pago se corrige una sola vez (07 §3.2). Es el historial
  // del wireframe de P-015 ("Pagada" con corrección).
  const paymentCorrections = [
    { paymentId: 'pay_lucia_r1_a', correctedBy: J, correctedAt: '2026-12-02T08:15:00-05:00' },
  ];

  // Pagos informados por el participante (F-08). resolution: null mientras el
  // organizador no responde (RN-064), "confirmed" (RN-062, RN-138) o
  // "rejected" (RN-063, RN-194).
  const reportedPayments = [
    { id: 'rep_001', juntaId: 'junta_oficina', roundNumber: 1, participantId: 'user_503', reportedPaidOn: '2026-11-29', reportedAt: '2026-11-29T19:05:00-05:00', resolution: 'confirmed', resolvedBy: J, resolvedAt: '2026-11-29T21:30:00-05:00' },
    { id: 'rep_002', juntaId: 'junta_oficina', roundNumber: 2, participantId: 'user_234', reportedPaidOn: '2026-12-19', reportedAt: '2026-12-20T08:30:00-05:00', resolution: 'rejected', resolvedBy: J, resolvedAt: '2026-12-21T09:00:00-05:00' },
    { id: 'rep_003', juntaId: 'junta_oficina', roundNumber: 2, participantId: 'user_789', reportedPaidOn: '2026-12-28', reportedAt: '2026-12-28T20:15:00-05:00', resolution: null, resolvedBy: null, resolvedAt: null },
  ];

  // Cambios hechos sin conexión en el dispositivo de Jorge (outbox), en el
  // orden en que se hicieron (RN-087, RN-173, RN-174). Todavía no se envían.
  const pendingChanges = [
    { clientChangeId: 'chg_0002', userId: J, type: 'payment_recorded', juntaId: 'junta_oficina', roundNumber: 2, participantId: 'user_505', paidOn: '2026-12-28', performedAt: '2026-12-29T18:40:00-05:00' },
  ];

  // Cambios que el servidor rechazó al sincronizar (RN-171, RN-172). Jorge
  // registró en su celular, sin conexión, un pago que ya había registrado desde
  // su computadora a las 09:50.
  const rejectedChanges = [
    {
      clientChangeId: 'chg_0001', userId: J, type: 'payment_recorded', juntaId: 'junta_ventas', roundNumber: 2, participantId: 'user_615', paidOn: '2026-12-16',
      performedAt: '2026-12-28T10:20:00-05:00', rejectedAt: '2026-12-28T11:05:00-05:00', reasonId: 'RN-172-reason-already-recorded',
      reviewedAt: null,   // se llena al pulsar "Entendido" en P-016
    },
  ];

  // Encuesta de KPI-05 (RN-204 a RN-206, RN-210). El rango de las respuestas
  // numéricas sigue abierto (PREG-071); estas respuestas son solo de ejemplo.
  const organizerSurveys = [
    { organizerId: 'user_123', wave: 'initial', hoursPerMonth: null, manualRemindersPerMonth: null, forwardsByWhatsapp: null, answeredAt: null, closedAt: '2026-11-14T09:03:00-05:00' },
    { organizerId: 'user_456', wave: 'initial', hoursPerMonth: 6, manualRemindersPerMonth: 25, forwardsByWhatsapp: true, answeredAt: '2026-11-15T10:08:00-05:00', closedAt: null },
    { organizerId: 'user_620', wave: 'initial', hoursPerMonth: 2, manualRemindersPerMonth: 6, forwardsByWhatsapp: false, answeredAt: '2026-11-14T16:04:00-05:00', closedAt: null },
  ];

  // Usuario con sesión por defecto. Cada pantalla puede usar otro con
  // ?usuario=user_789 en la URL, o con MiJunta.getCurrentUser('user_789').
  const session = { defaultUserId: 'user_456' };

  /* ------------------------------------------------------------------------
     Textos del catálogo §2.9 de 03-reglas-de-negocio.md, copiados tal cual.
     La clave es la RN. Cuando una RN tiene más de un texto, la clave lleva un
     sufijo. {n}, {nombre}, {enlace}, {fecha} y {hora} se reemplazan con
     message(id, { n: 3, nombre: 'Lucía' }).
     ------------------------------------------------------------------------ */

  const messages = {
    'RN-002': 'Complete los campos marcados.',
    'RN-007': 'Elija una frecuencia: semanal, quincenal, mensual o cada cierta cantidad de días.',
    'RN-003': 'Ingrese una cuota entre S/ 10.00 y S/ 5,000.00.',
    'RN-004': 'La cuota debe ser múltiplo de S/ 0.10, por ejemplo S/ 20.80.',
    'RN-005': 'Ingrese entre 2 y 50 participantes.',
    'RN-008': 'Ingrese un número de días entre 2 y 60.',
    'RN-009': 'La fecha de vencimiento de la ronda 1 no puede ser anterior a hoy.',
    'RN-010': 'Ingrese entre 1 y 7 días de aviso previo.',
    'RN-012': 'Los días de aviso previo deben ser menos que los días entre una cuota y la siguiente.',
    'RN-017': 'Inicie sesión o cree su cuenta para unirse a la junta.',
    'RN-018': 'Esta junta ya no tiene cupos disponibles.',
    'RN-019': 'Este código ya no es válido.',
    'RN-027': 'La junta todavía tiene cupos libres. Fije el orden de turnos cuando estén todos ocupados.',
    'RN-029': 'Necesita conexión a internet para ejecutar el sorteo.',
    'RN-054': 'La fecha de pago no puede ser posterior a hoy.',
    'RN-074': 'Su contraseña debe tener al menos 8 caracteres.',
    'RN-075': 'El correo o la contraseña no son correctos.',
    'RN-161': 'Demasiados intentos fallidos. Intente de nuevo en 15 minutos.',
    'RN-080': 'Este código ya no es válido. Pida uno nuevo.',
    'RN-085': 'Ingrese un DNI de 8 dígitos.',
    'RN-086': 'Ingrese un celular de 9 dígitos que empiece con 9.',
    'RN-096': 'El nombre de la junta debe tener entre 3 y 60 caracteres.',
    'RN-097': 'Ingrese el monto solo con números y un punto decimal, por ejemplo 1250.50.',
    'RN-105': 'Su turno y sus cuotas aparecerán cuando se fije el orden de turnos.',
    'RN-108': 'La junta ya tiene {n} cupos ocupados. Ingrese al menos {n} participantes.',
    'RN-109': 'La junta no tiene cupos libres para que usted participe.',
    'RN-110': 'La junta ya fijó su orden de turnos. Solo puede cambiar su nombre.',
    'RN-114-leave': 'La junta ya fijó su orden de turnos. Ya no es posible salir de ella.',
    'RN-114-remove': 'La junta ya fijó su orden de turnos. Ya no es posible quitar participantes.',
    'RN-115': 'Usted es la persona organizadora de esta junta y no puede salir de ella.',
    'RN-116': 'Este código no es válido.',
    'RN-117': 'Demasiados códigos no válidos. Intente de nuevo en 1 hora.',
    'RN-122': 'La fecha de vencimiento de la ronda 1 ya pasó. Cámbiela antes de fijar el orden de turnos.',
    'RN-125': 'Esta junta ya tiene su orden de turnos.',
    'RN-127': 'Asigne a cada participante un turno distinto, del 1 al {n}.',
    'RN-130': 'Esta cuota ya no está pendiente.',
    'RN-131': 'Esta cuota no tiene un pago registrado.',
    'RN-132': 'La fecha de pago no puede ser anterior a la creación de la junta.',
    'RN-136': "Registre su propio pago con la opción 'Registrar pago'.",
    'RN-146': 'Complete su nombre, su correo y su contraseña.',
    'RN-147': 'Su nombre debe tener entre 2 y 80 caracteres.',
    'RN-150': 'Ya existe una cuenta con este correo. Inicie sesión o recupere su contraseña.',
    'RN-151': 'Ya existe una cuenta con este DNI.',
    'RN-153': 'Verifique su correo para crear una junta o unirse a una.',
    'RN-154': 'Este enlace ya se usó o venció. Pida uno nuevo.',
    'RN-156': 'Si el correo está registrado, le enviamos un enlace para recuperar su contraseña.',
    'RN-164': 'Ya pidió varios códigos. Intente de nuevo en {n} minutos.',
    'RN-166': 'El código no es correcto. Revíselo e intente de nuevo.',
    'RN-170': 'Necesita conexión a internet para hacer esto.',
    'RN-172': 'No se pudo guardar un cambio hecho sin conexión: {motivo}.',
    'RN-172-reason-already-recorded': 'el pago de {nombre} de la ronda {n} ya estaba registrado',
    'RN-172-reason-report-not-pending': 'su pago informado de la ronda {n} no se guardó porque la cuota ya no estaba pendiente',
    'RN-172-reason-no-longer-recorded': 'el pago de {nombre} de la ronda {n} ya no estaba registrado',
    'RN-152-subject': 'Mi Junta: verifique su correo',
    'RN-152-body': 'Hola, {nombre}. Para terminar de crear su cuenta en Mi Junta, abra este enlace: {enlace}. El enlace sirve hasta el {fecha} a las {hora}. Si usted no creó esta cuenta, ignore este correo.',
    'RN-155-subject': 'Mi Junta: recupere su contraseña',
    'RN-155-body': 'Hola, {nombre}. Recibimos un pedido para cambiar la contraseña de su cuenta. Para cambiarla, abra este enlace: {enlace}. El enlace sirve una sola vez, hasta el {fecha} a las {hora}. Si usted no lo pidió, ignore este correo y su contraseña seguirá igual.',
    'RN-174-one': '1 cambio sin enviar.',
    'RN-174-many': '{n} cambios sin enviar.',
    'RN-179': 'Las reglas de la junta pueden tener hasta 2,000 caracteres.',
    'RN-180': 'Ya existe una cuenta con este celular.',
    'RN-181': 'Confirme que es mayor de 18 años para crear su cuenta.',
    'RN-182': 'Usted es miembro de una junta en curso. Podrá borrar su cuenta cuando todas sus juntas en curso terminen.',
    'RN-207': 'Usted organiza una junta que todavía no fija su orden de turnos. No puede borrar su cuenta mientras la organice.',
    'RN-198': 'Hay cambios sin enviar ({n}). Si cierra sesión ahora, se perderán.',
  };

  // RN que comparten un mismo texto en el catálogo §2.9
  const messageAliases = {
    'RN-020': 'RN-019', 'RN-129': 'RN-019',
    'RN-126': 'RN-027',
    'RN-081': 'RN-080', 'RN-162': 'RN-080', 'RN-163': 'RN-080',
    'RN-135': 'RN-130',
    'RN-157': 'RN-154',
  };

  // Textos de interfaz de 09 que usan varias pantallas ([TEXTO UI], 09 §6)
  const uiTexts = {
    offline: 'Sin conexión. Última sincronización: {fecha} {hora}',      // C-02
    rejectedChange: 'Un cambio no se pudo guardar.',                      // C-03
    unsent: 'Sin enviar',                                                 // C-06
    dateHelp: 'Formato DD/MM/AAAA',                                       // C-05
    dateInvalid: 'Ingrese la fecha con el formato DD/MM/AAAA, por ejemplo 30/11/2026.',   // C-05
    deletedParticipant: 'Participante eliminado',                         // RN-183
  };

  function fill(text, params) {
    return String(text).replace(/\{(\w+)\}/g, function (match, key) {
      return params && params[key] !== undefined && params[key] !== null ? String(params[key]) : match;
    });
  }

  // Devuelve el texto exacto del catálogo para una RN, con sus valores.
  function message(id, params) {
    const key = messages[id] !== undefined ? id : messageAliases[id];
    if (key === undefined) {
      throw new Error('No hay un texto del catálogo para ' + id);
    }
    return fill(messages[key], params);
  }

  // "1 cambio sin enviar." o "{n} cambios sin enviar." (RN-174)
  function pendingChangesText(n) {
    return n === 1 ? message('RN-174-one') : message('RN-174-many', { n: n });
  }

  /* ------------------------------------------------------------------------
     Formatos de Perú (PRINCIPIO-003, RN-091 a RN-093, RN-177)
     ------------------------------------------------------------------------ */

  // 125050 → "S/ 1,250.50"
  function formatMoney(cents) {
    const sign = cents < 0 ? '-' : '';
    const abs = Math.abs(Math.trunc(cents));
    const soles = String(Math.floor(abs / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const centavos = String(abs % 100).padStart(2, '0');
    return sign + 'S/ ' + soles + '.' + centavos;
  }

  // Partes de un instante en America/Lima
  const limaParts = (function () {
    let formatter = null;
    try {
      formatter = new Intl.DateTimeFormat('es-PE', {
        timeZone: meta.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
      });
    } catch (e) {
      formatter = null;
    }
    return function (instant) {
      const date = new Date(instant);
      if (formatter) {
        const parts = {};
        formatter.formatToParts(date).forEach(function (p) { parts[p.type] = p.value; });
        return { year: parts.year, month: parts.month, day: parts.day, hour: parts.hour === '24' ? '00' : parts.hour, minute: parts.minute };
      }
      // Respaldo: Lima es UTC-5 todo el año
      const lima = new Date(date.getTime() - 5 * 3600 * 1000);
      return {
        year: String(lima.getUTCFullYear()), month: String(lima.getUTCMonth() + 1).padStart(2, '0'),
        day: String(lima.getUTCDate()).padStart(2, '0'), hour: String(lima.getUTCHours()).padStart(2, '0'),
        minute: String(lima.getUTCMinutes()).padStart(2, '0'),
      };
    };
  })();

  // "2026-11-30" o un instante ISO → "30/11/2026"
  function formatDate(value) {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const p = value.split('-');
      return p[2] + '/' + p[1] + '/' + p[0];
    }
    const t = limaParts(value);
    return t.day + '/' + t.month + '/' + t.year;
  }

  // Instante ISO → "19:30" (24 horas, America/Lima)
  function formatTime(instant) {
    if (!instant) return '';
    const t = limaParts(instant);
    return t.hour + ':' + t.minute;
  }

  // Instante ISO → "20/11/2026 19:30"
  function formatDateTime(instant) {
    return formatDate(instant) + ' ' + formatTime(instant);
  }

  // Fecha de calendario de un instante en Lima: "2026-11-20"
  function toLimaDate(instant) {
    const t = limaParts(instant);
    return t.year + '-' + t.month + '-' + t.day;
  }

  // "28/11/2026" → "2026-11-28"; null si no tiene el formato o no existe (C-05)
  function parseDateInput(text) {
    const m = /^\s*(\d{2})\/(\d{2})\/(\d{4})\s*$/.exec(String(text || ''));
    if (!m) return null;
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    const d = new Date(Date.UTC(year, month - 1, day));
    if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
    return m[3] + '-' + m[2] + '-' + m[1];
  }

  // Monto escrito → céntimos; null si no cumple RN-097 ("1250.50" → 125050)
  function parseMoneyInput(text) {
    const m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(String(text || '').trim());
    if (!m) return null;
    return Number(m[1]) * 100 + Number((m[2] || '0').padEnd(2, '0'));
  }

  // El código de invitación se compara sin espacios y en mayúsculas (RN-190)
  function normalizeInviteCode(text) {
    return String(text || '').replace(/\s+/g, '').toUpperCase();
  }

  // Código en dos grupos de 4 para leerlo en voz alta: "T9QW 3HZ5" (P-011)
  function formatInviteCode(code) {
    return code.slice(0, 4) + ' ' + code.slice(4);
  }

  // Semilla en bloques de 8 caracteres separados por un espacio (P-013)
  function formatSeed(hex) {
    return hex.match(/.{1,8}/g).join(' ');
  }

  /* ------------------------------------------------------------------------
     Nombres de los estados (04-glosario.md, C-06) y de las frecuencias
     ------------------------------------------------------------------------ */

  const juntaStatusLabels = { open: 'Abierta', full: 'Completa', in_progress: 'En curso', finished: 'Terminada' };
  const contributionStatusLabels = { pending: 'Pendiente', awaiting_confirmation: 'Por confirmar', paid: 'Pagada' };
  const frequencyLabels = { weekly: 'Semanal', every_15_days: 'Quincenal', monthly: 'Mensual', every_n_days: 'Cada {n} días' };

  function statusLabel(status) {
    return juntaStatusLabels[status] || contributionStatusLabels[status] || status;
  }

  function frequencyLabel(junta) {
    return fill(frequencyLabels[junta.frequency], { n: junta.frequencyDays });
  }

  // Etiqueta de estado (C-06) lista para insertar: <span class="badge badge--paid">Pagada</span>
  function badgeHtml(status) {
    return '<span class="badge badge--' + status.replace(/_/g, '-') + '">' + escapeHtml(statusLabel(status)) + '</span>';
  }

  function unsentBadgeHtml() {
    return '<span class="badge badge--unsent">' + uiTexts.unsent + '</span>';
  }

  // "a tiempo" o "atrasado" (RN-055, RN-056)
  function timingHtml(isOnTime) {
    return isOnTime
      ? '<span class="timing timing--on-time">a tiempo</span>'
      : '<span class="timing timing--late">atrasado</span>';
  }

  function escapeHtml(text) {
    return String(text === null || text === undefined ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------------
     Calendario de la junta (RN-046 a RN-050, RN-012)
     ------------------------------------------------------------------------ */

  function addDays(isoDate, days) {
    const p = isoDate.split('-').map(Number);
    const d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + days));
    return d.toISOString().slice(0, 10);
  }

  // Mensual: mismo día del mes que la ronda 1, k − 1 meses después; si ese mes
  // no tiene ese día, el último día del mes (RN-049, RN-050).
  function addMonthsClamped(isoDate, months) {
    const p = isoDate.split('-').map(Number);
    const targetMonth = p[1] - 1 + months;
    const year = p[0] + Math.floor(targetMonth / 12);
    const month = ((targetMonth % 12) + 12) % 12;
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const day = Math.min(p[2], lastDay);
    return year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
  }

  // Días del periodo; la frecuencia mensual se toma como 28 (RN-012)
  function periodDays(frequency, frequencyDays) {
    if (frequency === 'weekly') return 7;
    if (frequency === 'every_15_days') return 15;
    if (frequency === 'monthly') return 28;
    if (frequency === 'every_n_days') return frequencyDays;
    return null;
  }

  function computeDueDates(junta) {
    const dates = [];
    for (let k = 1; k <= junta.participantCount; k += 1) {
      if (k === 1) {
        dates.push(junta.round1DueDate);
      } else if (junta.frequency === 'monthly') {
        dates.push(addMonthsClamped(junta.round1DueDate, k - 1));
      } else {
        dates.push(addDays(dates[k - 2], periodDays(junta.frequency, junta.frequencyDays)));
      }
    }
    return dates;
  }

  /* ------------------------------------------------------------------------
     Datos derivados: rondas y cuotas
     ------------------------------------------------------------------------ */

  const byId = {};
  users.forEach(function (u) { byId[u.id] = u; });

  const juntaById = {};
  juntas.forEach(function (j) { juntaById[j.id] = j; });

  // Resultado del orden de turnos de una junta: del sorteo o asignado a mano
  function getTurnOrder(juntaId) {
    const draw = draws.find(function (d) { return d.juntaId === juntaId; });
    if (draw) return { kind: 'draw', result: draw.result, record: draw };
    const assignment = turnAssignments.find(function (a) { return a.juntaId === juntaId; });
    if (assignment) return { kind: 'assignment', result: assignment.result, record: assignment };
    return null;
  }

  // Rondas: solo existen después de fijar el orden (RN-013, RN-105)
  const rounds = [];
  juntas.forEach(function (junta) {
    const order = getTurnOrder(junta.id);
    if (!order) return;
    computeDueDates(junta).forEach(function (dueDate, index) {
      rounds.push({
        juntaId: junta.id,
        number: index + 1,
        dueDate: dueDate,
        potRecipientId: order.result[index],     // RN-037
      });
    });
  });

  function correctionFor(paymentId) {
    return paymentCorrections.find(function (c) { return c.paymentId === paymentId; }) || null;
  }

  // Cuotas: una por participante en cada ronda, incluido el receptor (RN-042)
  const contributions = [];
  rounds.forEach(function (round) {
    const junta = juntaById[round.juntaId];
    const order = getTurnOrder(junta.id);
    order.result.forEach(function (participantId) {
      const own = payments
        .filter(function (p) { return p.juntaId === junta.id && p.roundNumber === round.number && p.participantId === participantId; })
        .sort(function (a, b) { return a.recordedAt < b.recordedAt ? -1 : 1; });
      // Pago vigente: el último sin corrección (04-glosario.md)
      const current = own.filter(function (p) { return !correctionFor(p.id); }).pop() || null;
      const openReport = reportedPayments.find(function (r) {
        return r.juntaId === junta.id && r.roundNumber === round.number && r.participantId === participantId && r.resolution === null;
      }) || null;

      let status = 'pending';                        // RN-045
      if (current) status = 'paid';                  // RN-053, RN-062
      else if (openReport) status = 'awaiting_confirmation';   // RN-060, RN-064

      contributions.push({
        id: 'ctb_' + junta.id.replace('junta_', '') + '_r' + round.number + '_' + participantId,
        juntaId: junta.id,
        roundNumber: round.number,
        dueDate: round.dueDate,
        participantId: participantId,
        amountCents: junta.contributionAmountCents,  // RN-043
        status: status,
        currentPayment: current ? {
          id: current.id,
          paidOn: current.paidOn,
          isOnTime: current.paidOn <= round.dueDate,  // RN-055, RN-056
          recordedBy: current.recordedBy,
          recordedAt: current.recordedAt,
          source: current.source,
        } : null,
        reportedPayment: openReport,
      });
    });
  });

  /* ------------------------------------------------------------------------
     Consultas para las pantallas
     ------------------------------------------------------------------------ */

  function getUser(userId) {
    return byId[userId] || null;
  }

  // Nombre para mostrar; quien borró su cuenta es "Participante eliminado" (RN-183)
  function displayName(userId) {
    const u = byId[userId];
    if (!u || u.deletedAt) return uiTexts.deletedParticipant;
    return u.name;
  }

  // Usuario con sesión: el de ?usuario= en la URL, el pedido o el de session
  function getCurrentUser(preferredId) {
    let fromUrl = null;
    try {
      fromUrl = new URLSearchParams(global.location ? global.location.search : '').get('usuario');
    } catch (e) {
      fromUrl = null;
    }
    return byId[fromUrl] || byId[preferredId] || byId[session.defaultUserId];
  }

  function getJunta(juntaId) {
    return juntaById[juntaId] || null;
  }

  function activeMemberships(juntaId) {
    return memberships.filter(function (m) { return m.juntaId === juntaId && m.leftAt === null; });
  }

  function isMember(juntaId, userId) {
    return activeMemberships(juntaId).some(function (m) { return m.userId === userId; });
  }

  function isOrganizer(juntaId, userId) {
    const junta = juntaById[juntaId];
    return !!junta && junta.organizerId === userId;
  }

  // Cupos ocupados = membresías que ocupan cupo y no salieron (07 §3.3)
  function getOccupiedSlots(juntaId) {
    return activeMemberships(juntaId).filter(function (m) { return m.occupiesSlot; }).length;
  }

  // Pozo por ronda = cuota × participantes (RN-041)
  function getPotCents(junta) {
    return junta.contributionAmountCents * junta.participantCount;
  }

  function getRounds(juntaId) {
    return rounds.filter(function (r) { return r.juntaId === juntaId; });
  }

  // Ronda actual: la de número más bajo que vence hoy o después; si todas
  // vencieron, la última (04-glosario.md, PREG-039)
  function getCurrentRound(juntaId, today) {
    const list = getRounds(juntaId);
    if (!list.length) return null;
    const t = today || meta.today;
    return list.find(function (r) { return r.dueDate >= t; }) || list[list.length - 1];
  }

  function getTurn(juntaId, userId) {
    const order = getTurnOrder(juntaId);
    if (!order) return null;
    const index = order.result.indexOf(userId);
    return index === -1 ? null : index + 1;        // RN-036
  }

  // Cambios del outbox aplicados encima de la cuota: estado nuevo y "Sin enviar"
  function withPendingChanges(contribution, viewerId) {
    const change = pendingChanges.find(function (c) {
      return c.userId === viewerId && c.juntaId === contribution.juntaId &&
        c.roundNumber === contribution.roundNumber && c.participantId === contribution.participantId;
    });
    if (!change) return Object.assign({ unsent: false }, contribution);
    const local = Object.assign({}, contribution, { unsent: true, pendingChange: change });
    if (change.type === 'payment_recorded' || change.type === 'payment_confirmed') {
      local.status = 'paid';
      local.currentPayment = { id: null, paidOn: change.paidOn, isOnTime: change.paidOn <= contribution.dueDate, recordedBy: change.userId, recordedAt: change.performedAt, source: 'organizer' };
    } else if (change.type === 'payment_unmarked' || change.type === 'payment_rejected') {
      local.status = 'pending';
      local.currentPayment = null;
    } else if (change.type === 'payment_reported') {
      local.status = 'awaiting_confirmation';
    }
    return local;
  }

  // Cuotas de una junta (vista del organizador, RN-120). options.roundNumber
  // filtra por ronda; options.viewerId aplica los cambios sin enviar de ese
  // usuario (por defecto, el usuario con sesión).
  function getContributions(juntaId, options) {
    const opts = options || {};
    const viewerId = opts.viewerId || getCurrentUser().id;
    return contributions
      .filter(function (c) { return c.juntaId === juntaId && (opts.roundNumber === undefined || c.roundNumber === opts.roundNumber); })
      .map(function (c) { return withPendingChanges(c, viewerId); })
      .sort(function (a, b) { return a.roundNumber - b.roundNumber || getTurn(juntaId, a.participantId) - getTurn(juntaId, b.participantId); });
  }

  function getContribution(contributionId, viewerId) {
    const c = contributions.find(function (x) { return x.id === contributionId; });
    return c ? withPendingChanges(c, viewerId || getCurrentUser().id) : null;
  }

  // Cuotas propias de un participante (RN-026)
  function getOwnContributions(juntaId, userId) {
    return getContributions(juntaId, { viewerId: userId }).filter(function (c) { return c.participantId === userId; });
  }

  // Historial de una cuota en orden cronológico (P-015, RN-058)
  function getContributionHistory(contributionId) {
    const c = contributions.find(function (x) { return x.id === contributionId; });
    if (!c) return [];
    const events = [];
    payments
      .filter(function (p) { return p.juntaId === c.juntaId && p.roundNumber === c.roundNumber && p.participantId === c.participantId; })
      .forEach(function (p) {
        events.push({ type: 'payment_recorded', at: p.recordedAt, paidOn: p.paidOn, by: p.recordedBy, source: p.source });
        const corr = correctionFor(p.id);
        if (corr) events.push({ type: 'payment_unmarked', at: corr.correctedAt, by: corr.correctedBy });
      });
    reportedPayments
      .filter(function (r) { return r.juntaId === c.juntaId && r.roundNumber === c.roundNumber && r.participantId === c.participantId; })
      .forEach(function (r) {
        events.push({ type: 'payment_reported', at: r.reportedAt, paidOn: r.reportedPaidOn, by: r.participantId });
        if (r.resolution) events.push({ type: r.resolution === 'confirmed' ? 'report_confirmed' : 'report_rejected', at: r.resolvedAt, by: r.resolvedBy });
      });
    return events.sort(function (a, b) { return a.at < b.at ? -1 : a.at > b.at ? 1 : 0; });
  }

  /*
   * Miembros de una junta tal como los recibe quien mira (PRINCIPIO-006):
   *   - Todo miembro: nombre, turno, estado de la cuota de la ronda actual y
   *     fecha y estado de la próxima cuota (RN-022). Sin próxima cuota, los dos
   *     quedan en null (RN-119).
   *   - El organizador que no participa: solo nombre y rol (RN-118).
   *   - El organizador recibe además userId e isOrganizer (API-024).
   * Nunca incluye correo, celular ni DNI (RN-023, RN-178).
   */
  function getMembersForViewer(juntaId, viewerId) {
    const junta = juntaById[juntaId];
    const viewerIsOrganizer = isOrganizer(juntaId, viewerId);
    const current = getCurrentRound(juntaId);
    const list = activeMemberships(juntaId).map(function (m) {
      const row = {
        name: displayName(m.userId),
        isSelf: m.userId === viewerId,
        isOrganizerRole: m.isOrganizer,
        participates: m.occupiesSlot,
        turn: null,
        currentRoundStatus: null,
        nextDueDate: null,
        nextStatus: null,
      };
      if (viewerIsOrganizer) {
        row.userId = m.userId;
        row.isOrganizer = m.isOrganizer;
      }
      if (current && m.occupiesSlot) {
        row.turn = getTurn(juntaId, m.userId);
        const now = getContributions(juntaId, { roundNumber: current.number, viewerId: viewerId })
          .find(function (c) { return c.participantId === m.userId; });
        const next = getContributions(juntaId, { roundNumber: current.number + 1, viewerId: viewerId })
          .find(function (c) { return c.participantId === m.userId; });
        row.currentRoundStatus = now ? now.status : null;
        row.currentRoundUnsent = now ? now.unsent : false;
        row.nextDueDate = next ? next.dueDate : null;
        row.nextStatus = next ? next.status : null;
      }
      return row;
    });
    // Ordenada por turno; antes del orden, por el momento en que entraron
    if (current) {
      list.sort(function (a, b) { return (a.turn || 0) - (b.turn || 0); });
    }
    return { junta: junta, currentRound: current, members: list };
  }

  // Juntas de un usuario, con lo que muestra su tarjeta en P-007.
  // Orden: "En curso", después "Abierta" y "Completa", al final "Terminada";
  // dentro de cada grupo, por nombre (decisión de diseño de 09, P-007).
  function getJuntasForUser(userId) {
    const rank = { in_progress: 0, open: 1, full: 1, finished: 2 };
    return juntas
      .filter(function (j) { return isMember(j.id, userId); })
      .map(function (j) {
        const current = getCurrentRound(j.id);
        const own = current ? getContributions(j.id, { roundNumber: current.number, viewerId: userId })
          .find(function (c) { return c.participantId === userId; }) : null;
        return {
          junta: j,
          role: j.organizerId === userId ? 'organizer' : 'participant',
          participates: activeMemberships(j.id).some(function (m) { return m.userId === userId && m.occupiesSlot; }),
          occupiedSlots: getOccupiedSlots(j.id),
          turn: getTurn(j.id, userId),
          currentRound: current,
          ownStatus: own ? own.status : null,
          ownUnsent: own ? own.unsent : false,
        };
      })
      .sort(function (a, b) {
        return rank[a.junta.status] - rank[b.junta.status] || a.junta.name.localeCompare(b.junta.name, 'es');
      });
  }

  function getInviteCode(juntaId) {
    return inviteCodes.find(function (c) { return c.juntaId === juntaId && c.revokedAt === null; }) || null;
  }

  // Resultado de ingresar un código en P-009 (RN-190, RN-116, RN-019, RN-020,
  // RN-129, RN-018, RN-021). No revisa la sesión (RN-017), el correo sin
  // verificar (RN-153) ni el límite de intentos (RN-117): eso lo simula la pantalla.
  function checkInviteCode(text, userId) {
    const code = normalizeInviteCode(text);
    const found = inviteCodes.find(function (c) { return c.code === code; });
    if (!found) return { ok: false, messageId: 'RN-116', message: message('RN-116') };
    if (found.revokedAt) return { ok: false, messageId: 'RN-019', message: message('RN-019') };
    const junta = juntaById[found.juntaId];
    if (userId && isMember(junta.id, userId)) return { ok: true, alreadyMember: true, junta: junta };
    if (getOccupiedSlots(junta.id) >= junta.participantCount) return { ok: false, messageId: 'RN-018', message: message('RN-018') };
    return { ok: true, alreadyMember: false, junta: junta };
  }

  function getDraw(juntaId) {
    return draws.find(function (d) { return d.juntaId === juntaId; }) || null;
  }

  function getTurnAssignment(juntaId) {
    return turnAssignments.find(function (a) { return a.juntaId === juntaId; }) || null;
  }

  function getPendingChanges(userId) {
    return pendingChanges.filter(function (c) { return c.userId === userId; });
  }

  // Rechazos sin revisar, con su texto completo (RN-172). Los que se marcaron
  // con "Entendido" en P-016 ya no aparecen.
  function getRejectedChanges(userId) {
    const reviewed = reviewedRejections();
    return rejectedChanges
      .filter(function (c) { return c.userId === userId && !c.reviewedAt && reviewed.indexOf(c.clientChangeId) === -1; })
      .map(function (c) {
        const reason = message(c.reasonId, { nombre: displayName(c.participantId), n: c.roundNumber });
        return Object.assign({}, c, { text: message('RN-172', { motivo: reason }) });
      });
  }

  // Rechazos que P-016 marcó como revisados en este navegador ("Entendido")
  const REVIEWED_KEY = 'mijunta.rechazosRevisados';

  function reviewedRejections() {
    try {
      return JSON.parse(global.sessionStorage.getItem(REVIEWED_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function markRejectionReviewed(clientChangeId) {
    try {
      const list = reviewedRejections();
      if (list.indexOf(clientChangeId) === -1) list.push(clientChangeId);
      global.sessionStorage.setItem(REVIEWED_KEY, JSON.stringify(list));
    } catch (e) {
      /* sin almacenamiento: el rechazo vuelve a aparecer al recargar */
    }
  }

  /*
   * Indicador de cambios sin enviar (C-03) para un usuario:
   *   - con un rechazo sin revisar: { kind: 'rejected', text: 'Un cambio no se pudo guardar.' }
   *   - con cambios por enviar:     { kind: 'pending', text: '1 cambio sin enviar.' } (RN-174)
   *   - sin nada:                   null
   */
  function getSyncIndicator(userId) {
    const reviewed = reviewedRejections();
    const unreviewed = rejectedChanges.filter(function (c) {
      return c.userId === userId && !c.reviewedAt && reviewed.indexOf(c.clientChangeId) === -1;
    });
    if (unreviewed.length) return { kind: 'rejected', text: uiTexts.rejectedChange };
    const pending = getPendingChanges(userId).length;
    if (pending) return { kind: 'pending', count: pending, text: pendingChangesText(pending) };
    return null;
  }

  // Encuesta pendiente de KPI-05 (RN-204, RN-205, RN-211). Para el prototipo
  // solo se revisa la primera encuesta.
  function hasPendingSurvey(userId) {
    const organizes = juntas.some(function (j) { return j.organizerId === userId; });
    if (!organizes) return false;
    return !organizerSurveys.some(function (s) { return s.organizerId === userId && s.wave === 'initial'; });
  }

  /* ------------------------------------------------------------------------
     Validaciones de formulario con los textos del catálogo.
     Cada una devuelve null si el valor es válido o el texto del error.
     No revisan el campo vacío: cada formulario usa su propio mensaje
     (RN-002 en la junta, RN-146 en la cuenta).
     ------------------------------------------------------------------------ */

  const validate = {
    juntaName: function (text) {                                  // RN-096
      const n = String(text).trim().length;
      return n >= 3 && n <= 60 ? null : message('RN-096');
    },
    contributionAmount: function (text) {                         // RN-097, RN-003, RN-004
      const cents = parseMoneyInput(text);
      if (cents === null) return message('RN-097');
      if (cents < 1000 || cents > 500000) return message('RN-003');
      if (cents % 10 !== 0) return message('RN-004');
      return null;
    },
    participantCount: function (value) {                          // RN-005
      const n = Number(value);
      return Number.isInteger(n) && n >= 2 && n <= 50 ? null : message('RN-005');
    },
    frequencyDays: function (value) {                             // RN-008
      const n = Number(value);
      return Number.isInteger(n) && n >= 2 && n <= 60 ? null : message('RN-008');
    },
    round1DueDate: function (text, today) {                       // C-05, RN-009
      const iso = parseDateInput(text);
      if (!iso) return uiTexts.dateInvalid;
      return iso < (today || meta.today) ? message('RN-009') : null;
    },
    reminderLeadDays: function (value, frequency, frequencyDays) { // RN-010, RN-012
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1 || n > 7) return message('RN-010');
      const period = periodDays(frequency, frequencyDays);
      return period !== null && n >= period ? message('RN-012') : null;
    },
    juntaRules: function (text) {                                 // RN-179
      return String(text || '').length <= 2000 ? null : message('RN-179');
    },
    userName: function (text) {                                   // RN-147
      const n = String(text).trim().length;
      return n >= 2 && n <= 80 ? null : message('RN-147');
    },
    password: function (text) {                                   // RN-074
      return String(text).length >= 8 ? null : message('RN-074');
    },
    dni: function (text) {                                        // RN-085
      return /^\d{8}$/.test(String(text)) ? null : message('RN-085');
    },
    phone: function (text) {                                      // RN-086
      return /^9\d{8}$/.test(String(text)) ? null : message('RN-086');
    },
    paymentDate: function (text, junta, today) {                  // C-05, RN-054, RN-132
      const iso = parseDateInput(text);
      if (!iso) return uiTexts.dateInvalid;
      if (iso > (today || meta.today)) return message('RN-054');
      if (junta && iso < junta.createdOn) return message('RN-132');
      return null;
    },
  };

  // Días de aviso después de elegir una frecuencia (RN-098)
  function adjustLeadDays(leadDays, frequency, frequencyDays) {
    const period = periodDays(frequency, frequencyDays);
    return period !== null && period <= leadDays ? period - 1 : leadDays;
  }

  /* ------------------------------------------------------------------------
     Exportación
     ------------------------------------------------------------------------ */

  const MiJunta = global.MiJunta || {};

  MiJunta.data = {
    meta: meta,
    privacyPolicy: privacyPolicy,
    users: users,
    examples: examples,
    juntas: juntas,
    memberships: memberships,
    inviteCodes: inviteCodes,
    draws: draws,
    turnAssignments: turnAssignments,
    rounds: rounds,
    contributions: contributions,
    payments: payments,
    paymentCorrections: paymentCorrections,
    reportedPayments: reportedPayments,
    pendingChanges: pendingChanges,
    rejectedChanges: rejectedChanges,
    organizerSurveys: organizerSurveys,
    session: session,
  };

  Object.assign(MiJunta, {
    // Textos
    messages: messages,
    uiTexts: uiTexts,
    message: message,
    fill: fill,
    pendingChangesText: pendingChangesText,
    // Formatos
    formatMoney: formatMoney,
    formatDate: formatDate,
    formatTime: formatTime,
    formatDateTime: formatDateTime,
    toLimaDate: toLimaDate,
    parseDateInput: parseDateInput,
    parseMoneyInput: parseMoneyInput,
    normalizeInviteCode: normalizeInviteCode,
    formatInviteCode: formatInviteCode,
    formatSeed: formatSeed,
    statusLabel: statusLabel,
    frequencyLabel: frequencyLabel,
    badgeHtml: badgeHtml,
    unsentBadgeHtml: unsentBadgeHtml,
    timingHtml: timingHtml,
    escapeHtml: escapeHtml,
    // Calendario
    periodDays: periodDays,
    computeDueDates: computeDueDates,
    adjustLeadDays: adjustLeadDays,
    // Consultas
    getUser: getUser,
    getCurrentUser: getCurrentUser,
    displayName: displayName,
    getJunta: getJunta,
    getJuntasForUser: getJuntasForUser,
    isMember: isMember,
    isOrganizer: isOrganizer,
    getOccupiedSlots: getOccupiedSlots,
    getPotCents: getPotCents,
    getRounds: getRounds,
    getCurrentRound: getCurrentRound,
    getTurn: getTurn,
    getTurnOrder: getTurnOrder,
    getContributions: getContributions,
    getContribution: getContribution,
    getOwnContributions: getOwnContributions,
    getContributionHistory: getContributionHistory,
    getMembersForViewer: getMembersForViewer,
    getInviteCode: getInviteCode,
    checkInviteCode: checkInviteCode,
    getDraw: getDraw,
    getTurnAssignment: getTurnAssignment,
    getPendingChanges: getPendingChanges,
    getRejectedChanges: getRejectedChanges,
    getSyncIndicator: getSyncIndicator,
    markRejectionReviewed: markRejectionReviewed,
    hasPendingSurvey: hasPendingSurvey,
    // Validaciones
    validate: validate,
  });

  global.MiJunta = MiJunta;
})(typeof window !== 'undefined' ? window : globalThis);
