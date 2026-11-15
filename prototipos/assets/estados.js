/*
 * Mi Junta · Selector de estado de los prototipos
 *
 * Prototipo para validar con stakeholders. NO es código de producción.
 *
 * Inserta arriba de la pantalla una barra "Estado: Con datos | Vacío | Error |
 * Loading" y muestra solo los bloques del estado elegido. Un bloque se marca
 * con data-estado y uno o más estados separados por espacios:
 *
 *   <div data-estado="con-datos">…lista de juntas…</div>
 *   <div data-estado="vacio">Todavía no tiene juntas…</div>
 *   <div data-estado="error">No pudimos cargar sus juntas…</div>
 *   <div data-estado="loading" aria-hidden="true">…esqueleto C-10…</div>
 *   <div data-estado="con-datos error">…visible en los dos estados…</div>
 *
 * Los elementos sin data-estado se ven siempre. Estados por defecto:
 * con-datos, vacio, error y loading.
 *
 * Uso, al final del <body>:
 *   <script src="assets/estados.js"></script>
 *   <script>
 *     MiJunta.initStates();                          // los 4 estados
 *     MiJunta.initStates({                           // con estados propios
 *       extraStates: [{ id: 'sin-conexion', label: 'Sin conexión' }],
 *       initial: 'con-datos',
 *       onChange: function (state) { … },
 *     });
 *   </script>
 *
 * El estado inicial también se puede pedir en la URL: P-007-mis-juntas.html?estado=vacio
 * Al cambiar de estado se dispara el evento "mijunta:estado" en document, con
 * event.detail.state, y <html> recibe data-estado-actual con el estado elegido.
 */
(function (global) {
  'use strict';

  const DEFAULT_STATES = [
    { id: 'con-datos', label: 'Con datos' },
    { id: 'vacio', label: 'Vacío' },
    { id: 'error', label: 'Error' },
    { id: 'loading', label: 'Loading' },
  ];

  let instanceCount = 0;

  function readStateFromUrl() {
    try {
      return new URLSearchParams(global.location.search).get('estado');
    } catch (e) {
      return null;
    }
  }

  // Deja el estado en la URL para poder compartir el enlace. Algunos
  // navegadores no lo permiten en archivos abiertos con doble clic (file://);
  // en ese caso el selector funciona igual, sin cambiar la URL.
  function writeStateToUrl(stateId) {
    try {
      const url = new URL(global.location.href);
      url.searchParams.set('estado', stateId);
      global.history.replaceState(null, '', url.toString());
    } catch (e) {
      /* sin cambio de URL */
    }
  }

  function matches(element, stateId) {
    return element.getAttribute('data-estado').split(/\s+/).indexOf(stateId) !== -1;
  }

  /**
   * Inserta el selector y aplica el estado inicial.
   * @param {Object} [options]
   * @param {Array<{id: string, label: string}>} [options.states] Reemplaza los 4 estados.
   * @param {Array<{id: string, label: string}>} [options.extraStates] Se agregan después de los 4.
   * @param {string} [options.initial] Estado inicial si la URL no pide otro.
   * @param {Element} [options.root] Dónde buscar los bloques (por defecto, document).
   * @param {function(string)} [options.onChange] Se llama con el estado elegido.
   * @returns {{ get: function(): string, set: function(string): void, element: Element }}
   */
  function initStates(options) {
    const opts = options || {};
    const states = (opts.states || DEFAULT_STATES).concat(opts.extraStates || []);
    const root = opts.root || global.document;
    const ids = states.map(function (s) { return s.id; });
    instanceCount += 1;
    const groupName = 'proto-estado-' + instanceCount;

    // Barra del prototipo
    const bar = global.document.createElement('aside');
    bar.className = 'proto-bar';
    bar.setAttribute('aria-label', 'Controles del prototipo');

    const inner = global.document.createElement('div');
    inner.className = 'proto-bar__inner';

    const tag = global.document.createElement('span');
    tag.className = 'proto-bar__tag';
    tag.textContent = 'Prototipo';
    inner.appendChild(tag);

    const fieldset = global.document.createElement('fieldset');
    const legend = global.document.createElement('legend');
    legend.textContent = 'Estado:';
    fieldset.appendChild(legend);

    states.forEach(function (state) {
      const label = global.document.createElement('label');
      label.className = 'proto-bar__option';
      const input = global.document.createElement('input');
      input.type = 'radio';
      input.name = groupName;
      input.value = state.id;
      label.appendChild(input);
      label.appendChild(global.document.createTextNode(state.label));
      fieldset.appendChild(label);
    });

    inner.appendChild(fieldset);
    bar.appendChild(inner);

    // Arriba de la pantalla, pero después del enlace "Ir al contenido", que
    // tiene que ser el primer elemento con foco (C-01, WCAG 2.4.1).
    const body = global.document.body;
    const skip = body.querySelector(':scope > .skip-link');
    if (skip) {
      skip.insertAdjacentElement('afterend', bar);
    } else {
      body.insertBefore(bar, body.firstChild);
    }

    let current = null;

    function apply(stateId) {
      if (ids.indexOf(stateId) === -1) return;
      current = stateId;

      root.querySelectorAll('[data-estado]').forEach(function (el) {
        el.hidden = !matches(el, stateId);
      });

      fieldset.querySelectorAll('input').forEach(function (input) {
        input.checked = input.value === stateId;
      });

      // Mientras carga, el contenido principal se anuncia como ocupado
      const main = global.document.querySelector('main');
      if (main) {
        if (stateId === 'loading') main.setAttribute('aria-busy', 'true');
        else main.removeAttribute('aria-busy');
      }

      global.document.documentElement.setAttribute('data-estado-actual', stateId);
      writeStateToUrl(stateId);

      if (typeof opts.onChange === 'function') opts.onChange(stateId);
      global.document.dispatchEvent(new CustomEvent('mijunta:estado', { detail: { state: stateId } }));
    }

    fieldset.addEventListener('change', function (event) {
      if (event.target && event.target.name === groupName) apply(event.target.value);
    });

    const fromUrl = readStateFromUrl();
    const initial = ids.indexOf(fromUrl) !== -1 ? fromUrl : (ids.indexOf(opts.initial) !== -1 ? opts.initial : ids[0]);
    apply(initial);

    return {
      get: function () { return current; },
      set: apply,
      element: bar,
    };
  }

  const MiJunta = global.MiJunta || {};
  MiJunta.initStates = initStates;
  global.MiJunta = MiJunta;
})(window);
