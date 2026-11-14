# Mi Junta — Spec Pack (Diploma AI-First Software Architecture · DMC)

## Qué es este repo
Especificación (Spec Driven Development, pipeline BMAD) de "Mi Junta": app para
organizar juntas en Perú (participantes, sorteo de turnos, cuotas y seguimiento
de pagos). En este módulo NO se programa la app: solo se escribe la especificación
en spec-pack/ y prototipos HTML en prototipos/.

## Antes de cualquier tarea
- Lee spec-pack/00-constitucion.md. Sus principios (idioma, formatos de Perú,
  reglas de redacción, IDs, límites de los agentes de IA) son obligatorios y
  ganan ante cualquier otra instrucción.

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
- Si hace falta un valor nuevo, márcalo [REQUIERE DECISIÓN].

## Reglas de trabajo
- Nada del out-of-scope de 02-alcance.md puede aparecer como regla, HU, pantalla o tarea.
- Al escribir trazabilidad ("Reglas relacionadas: RN-004"), verifica que esa RN
  trate realmente ese tema.