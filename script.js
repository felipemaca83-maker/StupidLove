function siguientePantalla(num) {
  // Intentar reproducir audio
  const audio = document.getElementById("backgroundAudio");
  if (audio) {
    audio.play().catch(() => console.log("El audio se reproducirá tras la interacción"));
  }

  // Cambiar pantallas
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));

  const proxima = document.getElementById('pantalla' + num);
  if (proxima) {
    proxima.classList.add('activa');
  }

  // Lógica especial para el mensaje final
  if (num === 4) { // Ahora el mensaje final sería la 4 o 5 según tu nuevo orden
    iniciarTexto();
  }
}

document.querySelectorAll(".carrusel-seccion").forEach(seccion => {
  const slides = seccion.querySelectorAll(".slide");
  const dotsContainer = seccion.querySelector(".dots");

  // 1. LIMPIEZA TOTAL: Evita que se acumulen puntos de otras secciones
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
  }

  let current = 0;

  // 2. CREACIÓN ÚNICA DE PUNTOS
  slides.forEach((s, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("activa");
    dotsContainer.appendChild(dot);
  });

  function actualizarDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((d, i) => {
      d.classList.toggle("activa", i === current);
    });
  }

  // 3. EVENTO DE TAP (Solo en las fotos, no en los botones)
  seccion.addEventListener("click", (e) => {
    if (e.target.closest('.btn-generic')) return;

    if (current < slides.length - 1) {
      slides[current].classList.remove("activa");
      current++;
      slides[current].classList.add("activa");
      actualizarDots();
    }
  });

  // Busca la parte donde manejas el clic del botón de "Siguiente Capítulo"
  const btn = seccion.querySelector(".siguiente-carrusel");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const nextSeccion = seccion.nextElementSibling;

      if (nextSeccion && nextSeccion.classList.contains('carrusel-seccion')) {
        // 1. Ocultamos la sección actual para que no se acumulen sus dots
        seccion.classList.remove("visible");
        seccion.style.display = "none";

        // 2. Mostramos la siguiente
        nextSeccion.classList.add("visible");
        nextSeccion.style.display = "flex";

        // 3. Scroll suave al inicio de la nueva sección
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});

function crearParticulas() {
  const container = document.body;
  const cantidadParticulas = 150; // Aumentamos la cantidad significativamente

  for (let i = 0; i < cantidadParticulas; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    // Tamaños variados para dar profundidad (de 1px a 4px)
    const size = (Math.random() * 3 + 1) + 'px';
    p.style.width = size;
    p.style.height = size;

    // Posición inicial aleatoria en toda la pantalla
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';

    // Brillo aleatorio (algunas más sutiles, otras más brillantes)
    p.style.opacity = Math.random();

    // Duración de la animación variada (entre 10s y 25s para que no vayan todas al mismo tiempo)
    const duration = (Math.random() * 15 + 10) + 's';
    p.style.animationDuration = duration;

    // Retraso aleatorio para que no arranquen todas a la vez
    p.style.animationDelay = (Math.random() * 10) + 's';

    container.appendChild(p);
  }
}

// Asegúrate de llamarla al cargar la página
window.onload = crearParticulas;

