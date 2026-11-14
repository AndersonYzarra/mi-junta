# Project Brief de Mi Junta

Versión: 0.3

Fuente: entrevista de descubrimiento con el Product Owner (Agente Analyst, 4 rondas). Las cifras de este documento vienen de la experiencia del Product Owner en su entorno (juntas de familia y de trabajo). No se han validado con una muestra más amplia, y por eso los supuestos están en la sección 6.

El rol que crea y gestiona la junta se llama "organizador" (PREG-010, resuelta). En las entrevistas también se le decía "administrador de la junta", término que ya no se usa.

---

## 1. Problema y oportunidad

### Cómo funciona hoy una junta
Una junta es un sistema de ahorro rotativo. Cada participante paga una cuota periódica y, en cada ronda, uno de ellos recibe el pozo completo. En el entorno estudiado:

| Aspecto | Situación actual |
|---|---|
| Quiénes participan | Familia y compañeros de trabajo |
| Tamaño | Más de 10 participantes por junta |
| Cuota | Entre S/ 300 y S/ 1,000 al mes, según el pozo que el grupo quiere juntar y la cantidad de participantes |
| Pozo por ronda (ejemplo) | 10 participantes × S/ 300 = S/ 3,000 |
| Orden de turnos | Casi siempre por sorteo. A veces se asigna según la necesidad de cada participante |
| Recepción del dinero | El organizador recibe las cuotas (Yape, Plin, efectivo u otro medio) y paga el pozo a quien le toca la ronda |
| Recordatorios | El organizador los envía por WhatsApp |
| Control | El organizador lleva la cuenta en un Excel |
| Reglas | No hay reglas escritas sobre multas, atrasos, garantías ni retiros. Todo se resuelve sobre la marcha |

### Quién sufre y qué pierde
El que más sufre es el **organizador**. Sus problemas, del más grave al menos grave:

1. **Tiempo:** dedica entre **8 y 16 horas al mes** a cobrar, recordar y actualizar el Excel. Envía cerca de **3 a 4 recordatorios por participante al mes**, es decir, 30 a 40 mensajes en una junta de 10 personas. Administra **1 o 2 juntas a la vez**.
2. **Morosidad:** se presenta, aunque no con frecuencia. El atraso típico es de **2 a 3 días**. Cuando un participante no puede pagar, a veces otro le presta. Rara vez el organizador pone dinero de su bolsillo.
3. **Desconfianza por el orden del sorteo:** aparece al inicio, porque todos tienen necesidad y nadie quiere el último turno.
4. **Confusión sobre quién pagó:** aparece cuando el organizador no lleva bien el Excel. A veces los participantes desconfían de ese Excel.

En la experiencia del Product Owner, una junta que sale mal **se retrasa, pero no se cancela**. No se reportaron casos de alguien que cobra su turno y deja de pagar, ni pérdidas en soles.

### Oportunidad
- El Product Owner no conoce ninguna app ni servicio en Perú que hoy se use para organizar juntas. Es un supuesto por validar (S-07).
- Las juntas se organizan con herramientas gratuitas pero dispersas: WhatsApp para comunicarse y Excel para llevar la cuenta. Ninguna de las dos da a los participantes una vista compartida de los pagos.
- El producto busca atraer usuarios y tráfico como base para una futura línea de préstamos. Esa línea es un proyecto aparte y está fuera de este alcance.

---

## 2. Usuarios y segmentos objetivo

### Usuarios

| Usuario | Perfil | Qué necesita |
|---|---|---|
| **Organizador** | 18 a 40 años. Usa Yape y Plin, tiene celular propio y usa más WhatsApp que el correo. Organiza de forma voluntaria y en esta versión no recibe ningún beneficio (PREG-019, resuelta) | Dedicar menos horas a cobrar y recordar, tener menos discusiones con el grupo y verse más serio ante él |
| **Participante** | Mismo perfil que el organizador | Saber cuándo le toca cobrar, si su pago quedó registrado y quién falta pagar. Ver su propio estado y el de los demás (dentro de lo que permite PRINCIPIO-006) |

### Personas
Las personas son arquetipos armados con los datos de la entrevista. Los nombres son ficticios, y las edades, los montos y las horas están dentro de los rangos que reportó el Product Owner.

**Persona 1: Carmen, organizadora de una junta familiar**
- **Perfil:** 35 años. Organiza 1 junta de 12 participantes, ella y 11 familiares, con una cuota de S/ 300 al mes, así que el pozo de cada ronda es de S/ 3,600. Cobra por Yape, Plin y en efectivo, y lleva la cuenta en un Excel.
- **Situación actual:** envía unos 40 recordatorios por WhatsApp al mes y dedica unas 10 horas al mes a la junta. Cuando alguien se atrasa 2 o 3 días, a veces tiene que esperar o buscar quién le preste.
- **Necesidad principal:** dejar de perseguir a cada familiar para cobrar y recordar, sin que la relación familiar se tense por el dinero.

**Persona 2: Jorge, organizador de juntas del trabajo**
- **Perfil:** 30 años. Administra 2 juntas a la vez con compañeros de trabajo, con cuotas de hasta S/ 1,000 al mes.
- **Situación actual:** sus grupos son más estrictos con los atrasos y, al inicio, discuten el orden del sorteo porque nadie quiere el último turno.
- **Necesidad principal:** que las reglas y el orden de turnos queden claros desde el inicio y que nadie pueda discutirlos después.

**Persona 3: Lucía, participante**
- **Perfil:** 25 años. Participa en la junta de su trabajo y paga por Yape.
- **Situación actual:** le pregunta al organizador "¿cuándo me toca?" y "¿ya registraste mi pago?". A veces desconfía del Excel, que solo ve el organizador.
- **Necesidad principal:** consultar su turno y el estado de sus pagos y los del grupo sin tener que preguntarle a nadie.

### Necesidades expresadas por el Product Owner
Se dejan aquí para que el Product Manager decida cómo atenderlas:
- Un participante quiere poder informar su propio pago, y el organizador quiere confirmarlo antes de darlo por válido (PREG-017).
- El organizador quiere dejar definidas las reglas de la junta (multas, atrasos, retiros) al crearla, para no resolverlas sobre la marcha (PREG-016).
- A veces el orden de turnos se decide según la necesidad de los participantes y no por sorteo (PREG-018).

**Cómo las atiende el alcance:** 02-alcance.md las incluye como funcionalidades Should, después del MVP. Son F-08 (el participante informa su pago), F-09 (reglas escritas, solo como texto que la app no aplica) y F-10 (orden de turnos sin sorteo).

### Segmentos

| Segmento | Persona | Diferencias observadas | Necesidad diferenciada | Estado |
|---|---|---|---|---|
| Familia | Persona 1 | Mayor tolerancia al atraso | Recordar y cobrar sin tensionar la relación familiar | Observado por el Product Owner. La necesidad es una inferencia por validar |
| Compañeros de trabajo | Personas 2 y 3 | Más estricto. Otro organizador y otra forma de sortear | Reglas y orden de turnos claros desde el inicio, que nadie discuta después | Observado por el Product Owner. La necesidad es una inferencia por validar |
| Comerciantes de mercado, vecinos, emprendedores | Sin persona | Sin datos | Sin datos | Supuesto por validar (S-08) |

**Decisión del Product Owner:** el lanzamiento se dirige a **todos los segmentos a la vez**, sin elegir un segmento inicial.

---

## 3. Propuesta de valor

**Para el organizador:** dedicar al menos un 80 % menos de horas al mes a gestionar la junta, tener un registro de pagos y turnos que el grupo puede consultar sin preguntarle, y todo sin pagar nada.

**Para el participante:** saber en cualquier momento cuándo le toca, si su pago quedó registrado y quién falta pagar, sin depender de un Excel que solo ve el organizador.

**Frente a la alternativa actual (WhatsApp + Excel):**

| | WhatsApp + Excel | Mi Junta |
|---|---|---|
| Costo | Gratis | Gratis y sin publicidad |
| Quién ve el estado de pagos | Solo el organizador | Todos los miembros, dentro de lo que permite PRINCIPIO-006 |
| Recordatorios | El organizador los envía a mano | Por correo y notificación push (PRINCIPIO-007) |
| Orden de turnos | Sorteo sin registro | Sorteo con registro auditable (PRINCIPIO-008) |

**Límite de la propuesta:** Mi Junta no recibe, no transfiere ni guarda el dinero de la junta (PRINCIPIO-004). Solo registra los pagos que se hacen fuera de la app.

---

## 4. Modelo de negocio preliminar

| Elemento | Decisión |
|---|---|
| Precio en el lanzamiento | Gratis para organizadores y participantes |
| Publicidad | Ninguna |
| Objetivo de esta etapa | Atraer usuarios y tráfico |
| Costos de operación (infraestructura, envío de correos) | Los asume la empresa que desarrolla el producto, sin un tope mensual definido |
| Comisiones sobre el dinero de la junta | No existen. La app no toca el dinero (PRINCIPIO-004) |

### Fuentes de ingreso futuras (fuera de este proyecto)
- **Plan VIP:** idea del Product Owner, por un monto mensual pequeño, alrededor de US$ 1. Queda para después del lanzamiento. La idea original era que el plan gratis permitiera una sola junta y el VIP varias, pero el lanzamiento permite varias juntas sin límite (PREG-013, resuelta). Por eso, qué ofrece el plan VIP, su precio en S/ y el medio de cobro están [REQUIERE DECISIÓN] (PREG-011). Cobrar una suscripción dentro de la app hoy choca con PRINCIPIO-004, que prohíbe integrar pasarelas de pago.
- **Línea de préstamos:** es la fuente de ingresos principal que espera el Product Owner. Es un proyecto aparte que se conectaría con Mi Junta. Puede requerir autorización de la SBS, y el uso de datos para evaluar créditos requiere un consentimiento propio (PREG-015).

---

## 5. Métricas de éxito (KPIs medibles)

El **mes 1** es el primer mes calendario después del lanzamiento. La fecha de lanzamiento no está definida.

**Definiciones:**
- **Junta activa:** junta en estado "En curso" en la que todas las cuotas de la ronda 1 están en el estado "Pagada". Si después se desmarca uno de esos pagos, deja de estar activa hasta que se vuelva a registrar. Una junta "Terminada" ya no cuenta como activa.
- **Junta terminada:** junta en estado "Terminada", es decir, con todas las cuotas de todas sus rondas en el estado "Pagada" (04-glosario.md).
- **Junta al día en un mes:** junta activa en la que todas las cuotas que vencían en ese mes calendario quedaron pagadas a tiempo, es decir, con fecha de pago igual o anterior a su fecha de vencimiento (RN-055). Esta definición aplica a cualquier frecuencia de cuota (semanal, quincenal, mensual o cada cierta cantidad de días, según 02-alcance.md). En una junta semanal cuentan todas las cuotas que vencieron en el mes.

| ID | KPI | Cómo se calcula | Meta | Cuándo se mide | Fuente |
|---|---|---|---|---|---|
| KPI-01 | Juntas activas | Cantidad de juntas activas al cierre del mes | 10 en el mes 1, 20 en el mes 3 y 40 en el mes 6 | Al cierre de los meses 1, 3 y 6 | Datos de la app |
| KPI-02 | Usuarios registrados | Cantidad de cuentas creadas al cierre del mes | [REQUIERE DECISIÓN] (PREG-012) | Al cierre de los meses 1, 3 y 6 | Datos de la app |
| KPI-03 | Juntas al día | (Juntas al día en el mes ÷ juntas activas en el mes) × 100 | ≥ 80 % | Cada mes | Datos de la app |
| KPI-04 | Pagos a tiempo | (Cuotas pagadas a tiempo ÷ cuotas vencidas en el mes) × 100 | ≥ 80 % | Cada mes | Datos de la app (definición de "a tiempo" en RN-055) |
| KPI-05 | Reducción de horas del organizador | (Horas antes − horas a los 3 meses) ÷ horas antes × 100 | ≥ 80 % (con la línea base actual de 8 a 16 horas, bajar a 1.6–3.2 horas al mes) | Encuesta al organizador al empezar a usar la app y a los 3 meses | Encuesta (PREG-021) |
| KPI-06 | Juntas terminadas en la app | (Juntas terminadas ÷ juntas cuya última ronda vencía dentro del periodo) × 100 | ≥ 80 % | A los 12 meses del lanzamiento | Datos de la app |

**Por qué KPI-06 se mide a los 12 meses:** una junta mensual de 10 participantes, el tamaño típico del brief, dura 10 meses, así que antes de ese plazo hay pocas juntas terminadas. Las juntas más chicas (desde 2 participantes, RN-005) y las semanales o quincenales terminan antes, y entran en el cálculo si debían terminar dentro del periodo. KPI-03 sirve como indicador temprano mientras tanto.

---

## 6. Riesgos identificados y supuestos

### Supuestos

| ID | Supuesto | Fuente | Cómo validarlo |
|---|---|---|---|
| S-01 | Los participantes crearán una cuenta y aceptarán la política de privacidad para ver su junta | Confirmado por el Product Owner, sin datos | Porcentaje de invitados que crean su cuenta en las primeras 10 juntas |
| S-02 | El organizador seguirá recibiendo el dinero fuera de la app y registrará cada pago en ella | Confirmado por el Product Owner | Porcentaje de cuotas vencidas que quedan registradas en las primeras 10 juntas |
| S-03 | Los participantes leerán los recordatorios por correo o push sin que el organizador los reenvíe por WhatsApp | Confirmado por el Product Owner, aunque los usuarios usan más WhatsApp que el correo | Pregunta en la encuesta de KPI-05 sobre reenvíos por WhatsApp |
| S-04 | Las cifras del problema (8 a 16 h/mes, 3 a 4 recordatorios por participante, 2 a 3 días de atraso) representan a la mayoría de organizadores | Experiencia del Product Owner | Encuesta inicial de KPI-05 |
| S-05 | El perfil de usuario (18 a 40 años, digital, celular propio) aplica a todos los segmentos | Observado solo en familia y trabajo | Encuesta inicial a organizadores de otros segmentos |
| S-06 | Una app gratuita es motivo suficiente para dejar WhatsApp + Excel | Product Owner | KPI-01 y KPI-03 |
| S-07 | No hay competidores en Perú | Product Owner, sin investigación | Revisión de competidores (PREG-022) |
| S-08 | Mercados, vecinos y emprendedores tienen el mismo problema y las mismas necesidades | Sin datos | Entrevistas a organizadores de esos segmentos |

### Riesgos

| ID | Tipo | Riesgo | Impacto | Probabilidad | Mitigación conocida |
|---|---|---|---|---|---|
| R-01 | Negocio | Los participantes no leen el correo, porque usan más WhatsApp, y el organizador vuelve a recordar a mano | Alto: KPI-05 no se cumple | Media | Integrar WhatsApp después del lanzamiento, lo que requiere cambiar PRINCIPIO-007 (PREG-014) |
| R-02 | Negocio | Crear una cuenta es una barrera y los participantes no se registran | Alto: la junta no llega a estar activa | Media | Medir S-01 en las primeras 10 juntas |
| R-03 | Negocio | El organizador deja de registrar pagos y vuelve al Excel | Alto: KPI-03 y KPI-04 pierden validez | Media | Medir S-02 |
| R-04 | Negocio | La línea base del problema viene de un solo entorno y no representa al mercado | Medio: metas mal calibradas | Alta | Encuesta inicial de KPI-05 |
| R-05 | Negocio | Lanzar para todos los segmentos a la vez dispersa el esfuerzo de adquisición | Medio: KPI-01 no se cumple | Media | Revisar KPI-01 por segmento al mes 3 |
| R-06 | Negocio | El producto no genera ingresos y depende de una línea de préstamos futura que puede requerir autorización de la SBS | Alto para la sostenibilidad del negocio | No estimada | Fuera de este proyecto. Lo asume el Product Owner |
| R-07 | Legal | Usar después los datos de pago para evaluar créditos sin un consentimiento válido según la Ley N.° 29733 | Alto: riesgo legal | No estimada | Consentimiento aparte cuando exista esa funcionalidad (PREG-015, PREG-001) |
| R-08 | Recursos | Todo el producto depende de un solo líder técnico | Medio: retrasos sin plan de respaldo | No estimada | Spec-pack como fuente de verdad (PRINCIPIO-001) |
| R-09 | Negocio | El estado de pagos visible para todos genera conflictos entre miembros | Medio | Baja | Limitar lo visible según PRINCIPIO-006 |
| R-10 | Técnico | En iPhone, una app web solo recibe notificaciones push si el usuario la agrega a la pantalla de inicio, y solo desde iOS 16.4. Si no lo hace, solo le llegan correos | Alto: agrava R-01 y afecta KPI-04 | No estimada (depende de la proporción de usuarios con iPhone) | A definir en el diseño de arquitectura |
| R-11 | Técnico | Los correos de recordatorio caen en spam o no se entregan | Alto: los participantes no reciben el recordatorio y afecta KPI-04 | Media | A definir en el diseño de arquitectura. Medir la tasa de entrega desde el lanzamiento |
| R-12 | Técnico | El mismo pago se registra o cambia sin conexión desde dos dispositivos y, al sincronizar, los datos chocan (PRINCIPIO-009). En el MVP solo el organizador registra pagos (F-04 de 02-alcance.md), así que el choque ocurre cuando usa dos dispositivos. Con F-08 también puede ocurrir entre el organizador y un participante | Alto: estados de pago incorrectos que afectan KPI-03 y KPI-04 y la confianza del grupo | Media | El servidor aplica los cambios en orden y rechaza el que ya no es válido, y la app le muestra al usuario el cambio rechazado (PREG-005, RN-171 a RN-173 de 03-reglas-de-negocio.md) |
| R-13 | Seguridad | Quien conoce el correo de otra persona puede bloquear su inicio de sesión con 5 intentos fallidos (RN-075) | Bajo: el bloqueo dura 900 s y no afecta datos | Baja | Aceptado en esta versión. Revisar si se reportan bloqueos repetidos |

---

## 7. Restricciones conocidas

**Del negocio:**
- La app es gratis y sin publicidad en el lanzamiento.
- En el lanzamiento, un organizador puede gestionar varias juntas a la vez, sin límite (PREG-013, resuelta).
- El plan VIP, la integración con WhatsApp y la línea de préstamos quedan después del lanzamiento o fuera del proyecto.
- El lanzamiento es real, al mercado y para todos los segmentos.
- No hay fecha límite de lanzamiento.

**Del equipo y los recursos:**
- **Equipo:** 1 líder técnico asistido por IA, con la metodología del diploma (Spec Driven Development, pipeline BMAD).
- **Costos:** los asume la empresa, sin tope mensual definido.
- **Adquisición:** red propia de familia y trabajo, redes sociales y recomendación boca a boca.

**De la constitución (obligatorias):**

| Principio | Restricción |
|---|---|
| PRINCIPIO-004 | La app no mueve dinero y no integra pasarelas de pago ni APIs de billeteras. Esto también impide hoy cobrar el plan VIP dentro de la app |
| PRINCIPIO-007 | Las notificaciones van solo por correo y push, sin SMS ni WhatsApp. No se crea una cuenta sin aceptar la política de privacidad y el consentimiento |
| PRINCIPIO-006 | Cada miembro ve solo el nombre, el turno, el estado de pago y el próximo pago de los demás |
| PRINCIPIO-008 | El sorteo es auditable y reproducible |
| PRINCIPIO-009 | La app es web (Next.js, TypeScript, PostgreSQL) y funciona sin conexión |
| PRINCIPIO-002 y PRINCIPIO-003 | Interfaz en español de Perú, con trato de "usted", montos en S/ y fechas en DD/MM/AAAA, zona America/Lima |

**Legales:**
- El cumplimiento de la Ley N.° 29733 está pendiente (PREG-001).
- La actividad de préstamos puede requerir autorización de la SBS, pero queda fuera de este proyecto.
