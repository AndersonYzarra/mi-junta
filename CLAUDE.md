# Mi Junta — Spec Pack (Diploma AI-First Software Architecture · DMC)

## Qué es este repo
Especificación (Spec Driven Development, pipeline BMAD) de "Mi Junta": app para
organizar juntas en Perú (participantes, sorteo de turnos, cuotas y seguimiento
de pagos). En este módulo NO se programa la app: solo se escribe la especificación
en spec-pack/ y prototipos HTML en prototipos/.

## Cómo leer los prompts
- Los prompts de cada agente están en prompts/claseN/. Ejecútalos al pie de la letra
  (rol, contexto, tarea, restricciones, formato).
- Un marcador [ARCHIVO: ruta] dentro de un prompt equivale a tener pegado ahí el
  contenido COMPLETO de ese archivo. Léelo siempre antes de responder.
- Si el prompt dice "PREGUNTA" o "hazme preguntas", pregunta y espera mis respuestas.
  No escribas ningún archivo hasta que yo te lo pida.

## Fuente de verdad
- spec-pack/ es la única fuente de verdad. Si algo no está ahí, NO lo inventes:
  pregunta, o propón agregarlo a spec-pack/05-preguntas-abiertas.md.

## Reglas de trabajo
- Idioma: español. País: Perú. Montos "S/ 1,250.50", fechas DD/MM/AAAA,
  zona America/Lima (UTC-5), celular 9 dígitos que inicia con 9, DNI 8 dígitos.
- Modifica SOLO el archivo que se te indique. No toques otros archivos.
- No inventes montos, plazos, porcentajes ni reglas que no estén en
  03-reglas-de-negocio.md. Si hace falta un valor nuevo, márcalo [REQUIERE DECISIÓN].
- Respeta los IDs existentes (PRINCIPIO-NNN, RN-NNN, HU-NNN, P-NNN, T-NNN, PREG-NNN).
  Nunca renumeres. Un ID nuevo usa el siguiente número libre.
- Una regla EARS = un solo DEBE / NO DEBE / PUEDE. Si hay dos, son dos reglas.
- Prohibido "rápido", "seguro", "fácil", "adecuado", "razonable", "intuitivo"
  sin un valor medible.
- Nada del out-of-scope de 02-alcance.md puede aparecer como regla, HU, pantalla o tarea.
- Al escribir trazabilidad ("Reglas relacionadas: RN-004"), verifica que esa RN
  trate realmente ese tema.