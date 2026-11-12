/**
 * Brasa Points: validación del formulario de registro.
 * Reglas, opciones y mensajes tomados literalmente de BRIEFING.md.
 */
(function () {
  "use strict";

  // País → ciudades → restaurantes (14 ubicaciones)
  const UBICACIONES = {
    CO: {
      prefijo: "+57",
      ciudades: {
        "Medellín": ["Brasaland El Poblado", "Brasaland Laureles", "Brasaland Envigado", "Brasaland Sabaneta"],
        "Bogotá": ["Brasaland Usaquén", "Brasaland Chapinero", "Brasaland Zona Rosa"],
        "Cali": ["Brasaland Granada", "Brasaland Ciudad Jardín", "Brasaland Unicentro"],
      },
    },
    US: {
      prefijo: "+1",
      ciudades: {
        "Miami": ["Brasaland Brickell", "Brasaland Coral Gables"],
        "Orlando": ["Brasaland Downtown", "Brasaland International Drive"],
      },
    },
  };

  const MENSAJES = {
    nombre: "Ingresa tu nombre completo (nombre y apellido)",
    email: "Ingresa un email válido (ejemplo: nombre@correo.com)",
    telefono: "El teléfono debe incluir código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)",
    pais: "Selecciona tu país",
    ciudad: "Selecciona tu ciudad",
    origen: "Cuéntanos cómo conociste Brasaland",
    nacimiento: "Debes ser mayor de 18 años para registrarte en Brasa Points",
    terminos: "Debes aceptar los términos del programa Brasa Points para continuar",
  };

  const EDAD_MINIMA = 18;

  const form = document.getElementById("registro");
  if (!form) return;

  const campos = {
    nombre: form.elements.nombre,
    email: form.elements.email,
    telefono: form.elements.telefono,
    nacimiento: form.elements.nacimiento,
    pais: form.elements.pais,
    ciudad: form.elements.ciudad,
    origen: form.elements.origen,
    terminos: form.elements.terminos,
  };
  const ubicacion = form.elements.ubicacion;
  const resumen = document.getElementById("resumen-errores");
  const exito = document.getElementById("exito");
  const tocados = new Set();

  // ---------- Reglas ----------

  function edadEnAnios(fechaISO) {
    const [a, m, d] = fechaISO.split("-").map(Number);
    const hoy = new Date();
    let edad = hoy.getFullYear() - a;
    if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) edad--;
    return edad;
  }

  const reglas = {
    // Al menos nombre y apellido: dos palabras de 2 o más letras
    nombre: (v) => {
      const palabras = v.trim().split(/\s+/).filter(Boolean);
      return palabras.length >= 2 && palabras.every((p) => /^[\p{L}][\p{L}'’.-]+$/u.test(p));
    },
    // Contiene @ y un dominio con extensión
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    // Empieza por + y el código del país (+57 o +1); si ya hay país, debe coincidir
    telefono: (v) => {
      const limpio = v.trim();
      const m = limpio.match(/^\+(57|1)[\s-]?(\d(?:[\s-]?\d){6,11})$/);
      if (!m) return false;
      const pais = campos.pais.value;
      return !pais || UBICACIONES[pais].prefijo === "+" + m[1];
    },
    pais: (v) => v in UBICACIONES,
    ciudad: (v) => {
      const pais = campos.pais.value;
      return Boolean(pais && v && UBICACIONES[pais].ciudades[v]);
    },
    origen: (v) => v !== "",
    nacimiento: (v) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
      const fecha = new Date(v + "T00:00:00");
      if (Number.isNaN(fecha.getTime()) || fecha > new Date()) return false;
      return edadEnAnios(v) >= EDAD_MINIMA;
    },
    terminos: (_, el) => el.checked,
  };

  // ---------- Estado visual y accesible ----------

  function errorDe(nombre) {
    return document.getElementById(nombre + "-error");
  }

  function pintar(nombre, valido) {
    const el = campos[nombre];
    const error = errorDe(nombre);
    if (valido) {
      el.removeAttribute("aria-invalid");
      if (el.type !== "checkbox") el.dataset.valido = "true";
      error.textContent = "";
      error.classList.add("hidden");
    } else {
      el.setAttribute("aria-invalid", "true");
      delete el.dataset.valido;
      error.textContent = MENSAJES[nombre];
      error.classList.remove("hidden");
    }
  }

  function limpiarEstado(nombre) {
    const el = campos[nombre];
    el.removeAttribute("aria-invalid");
    delete el.dataset.valido;
    const error = errorDe(nombre);
    error.textContent = "";
    error.classList.add("hidden");
  }

  function validar(nombre) {
    const el = campos[nombre];
    const valido = reglas[nombre](el.value, el);
    pintar(nombre, valido);
    return valido;
  }

  // ---------- Campos dependientes ----------

  function rellenar(select, opciones, textoVacio) {
    select.replaceChildren(new Option(textoVacio, ""));
    opciones.forEach((o) => select.add(new Option(o, o)));
    select.disabled = opciones.length === 0;
  }

  function actualizarCiudades() {
    const pais = campos.pais.value;
    const ciudades = pais ? Object.keys(UBICACIONES[pais].ciudades) : [];
    rellenar(campos.ciudad, ciudades, pais ? "Selecciona una ciudad" : "Primero elige un país");
    limpiarEstado("ciudad");
    actualizarUbicaciones();
  }

  function actualizarUbicaciones() {
    const pais = campos.pais.value;
    const ciudad = campos.ciudad.value;
    const locales = pais && ciudad ? UBICACIONES[pais].ciudades[ciudad] || [] : [];
    rellenar(ubicacion, locales, locales.length ? "Sin preferencia" : "Primero elige país y ciudad");
  }

  campos.pais.addEventListener("change", () => {
    actualizarCiudades();
    // El prefijo del teléfono depende del país
    if (tocados.has("telefono") || campos.telefono.value) validar("telefono");
  });
  campos.ciudad.addEventListener("change", actualizarUbicaciones);

  // "Sin restricciones" excluye al resto de preferencias
  form.querySelectorAll('input[name="preferencias[]"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      if (!cb.checked) return;
      form.querySelectorAll('input[name="preferencias[]"]').forEach((otro) => {
        const esSinRestricciones = otro.value === "sin-restricciones";
        if (otro !== cb && (cb.value === "sin-restricciones" ? true : esSinRestricciones)) otro.checked = false;
      });
    });
  });

  // ---------- Validación en tiempo real ----------

  Object.keys(campos).forEach((nombre) => {
    const el = campos[nombre];
    errorDe(nombre).setAttribute("aria-live", "polite");

    el.addEventListener("blur", () => {
      tocados.add(nombre);
      validar(nombre);
    });
    const evento = el.tagName === "SELECT" || el.type === "checkbox" || el.type === "date" ? "change" : "input";
    el.addEventListener(evento, () => {
      if (el.tagName === "SELECT" || el.type === "checkbox") tocados.add(nombre);
      if (tocados.has(nombre)) validar(nombre);
    });
  });

  // Límite de fecha: como máximo, hace 18 años
  (function fijarFechaMaxima() {
    const hoy = new Date();
    const max = new Date(hoy.getFullYear() - EDAD_MINIMA, hoy.getMonth(), hoy.getDate());
    const pad = (n) => String(n).padStart(2, "0");
    campos.nacimiento.max = `${max.getFullYear()}-${pad(max.getMonth() + 1)}-${pad(max.getDate())}`;
  })();

  // ---------- Envío ----------

  function mostrarResumen(invalidos) {
    resumen.replaceChildren();
    const titulo = document.createElement("p");
    titulo.className = "font-semibold";
    titulo.textContent =
      invalidos.length === 1 ? "Revisa 1 campo antes de continuar:" : `Revisa ${invalidos.length} campos antes de continuar:`;
    const lista = document.createElement("ul");
    lista.className = "mt-2 list-disc space-y-1 pl-5";
    invalidos.forEach((nombre) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + campos[nombre].id;
      a.className = "underline underline-offset-2";
      a.textContent = MENSAJES[nombre];
      a.addEventListener("click", (e) => {
        e.preventDefault();
        campos[nombre].focus();
      });
      li.append(a);
      lista.append(li);
    });
    resumen.append(titulo, lista);
    resumen.classList.remove("hidden");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalidos = Object.keys(campos).filter((nombre) => {
      tocados.add(nombre);
      return !validar(nombre);
    });

    if (invalidos.length) {
      mostrarResumen(invalidos);
      campos[invalidos[0]].focus();
      return;
    }

    // Envío simulado: no se conecta a ningún servidor
    resumen.classList.add("hidden");
    form.classList.add("hidden");
    exito.classList.remove("hidden");
    exito.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("exito-titulo").focus({ preventScroll: true });
  });

  // ---------- Limpiar ----------

  form.addEventListener("reset", () => {
    // El navegador vacía los valores después del evento: esperamos un tick
    setTimeout(() => {
      tocados.clear();
      Object.keys(campos).forEach(limpiarEstado);
      resumen.classList.add("hidden");
      resumen.replaceChildren();
      actualizarCiudades();
      campos.nombre.focus();
    });
  });

  document.getElementById("nuevo-registro").addEventListener("click", () => {
    form.reset();
    exito.classList.add("hidden");
    form.classList.remove("hidden");
  });
})();
