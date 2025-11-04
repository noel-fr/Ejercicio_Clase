(function () {
  const $ = (sel) => document.querySelector(sel);
  const n1 = $("#n1");
  const n2 = $("#n2");
  const n3 = $("#n3");
  const btn = $("#btnValidar");
  const out = $("#resultado");

  function leerValores() {
    // Devuelve valores como strings y numbers a la vez
    const vals = [n1.value.trim(), n2.value.trim(), n3.value.trim()];
    return {
      strings: vals,
      numbers: vals.map(v => v === "" ? null : Number(v)),
    };
  }

  function hayNulos(strings) {
    // true si algún input está vacío
    return strings.some(s => s === "");
  }

  function hayRepetidos(numbers) {
    // Considera solo valores no nulos
    const filtrados = numbers.filter(v => v !== null);
    const set = new Set(filtrados);
    return set.size !== filtrados.length;
  }

  function validar() {
    const { strings, numbers } = leerValores();

    // 1) No nulos
    if (hayNulos(strings)) {
      out.textContent = "";
      out.className = "resultado";
      alert("Hay al menos un campo vacío. Por favor, completa los 3 números.");
      return;
    }

    // 2) No repetidos
    if (hayRepetidos(numbers)) {
      out.textContent = "";
      out.className = "resultado";
      alert("No se permiten números repetidos. Ingresa 3 valores distintos.");
      return;
    }

    // Opcional: validar que realmente sean números (por si hay algo inválido)
    if (numbers.some(v => Number.isNaN(v))) {
      out.textContent = "";
      out.className = "resultado";
      alert("Uno o más valores no son numéricos válidos.");
      return;
    }

    // Si pasa validaciones, calcular el mayor:
    const max = Math.max(...numbers);
    // Encontrar el índice (para decir cuál campo fue el mayor si quieres)
    const idx = numbers.indexOf(max) + 1;

    out.className = "resultado ok";
    out.textContent = `El número mayor es ${max} (ingresado en el campo ${idx}).`;
  }

  // UX: permite Enter para validar
  ["keyup","change","input"].forEach(evt => {
    [n1,n2,n3].forEach(el => el.addEventListener(evt, () => {
      out.textContent = "";
      out.className = "resultado";
    }));
  });

  btn.addEventListener("click", validar);

  // Accesibilidad: Enter desde cualquier input ejecuta validar
  document.getElementById("formNumeros").addEventListener("submit", (e) => {
    e.preventDefault();
    validar();
  });
})();
