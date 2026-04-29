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

function iniciarTexto() {
  const messageText = `En definitiva, has logrado despertar en mí sentimientos y emociones... (todo tu texto aquí)`;

  const messageEl = document.getElementById("message");
  messageEl.textContent = "";
  let i = 0;

  function typeMessage() {
    if (i < messageText.length) {
      messageEl.textContent += messageText.charAt(i);
      let char = messageText.charAt(i);
      i++;

      let delay = 50;
      if (",".includes(char)) delay = 400;
      if (".✨😍💪🏼🥰🤭🫶🏽💕😎".includes(char)) delay = 800;
      if ("\n".includes(char)) delay = 600;

      setTimeout(typeMessage, delay);

      // Auto-scroll para que el usuario siempre vea lo que se está escribiendo
      const container = messageEl.parentElement;
      container.scrollTop = container.scrollHeight;
    } else {
      document.getElementById("readButton").style.display = "inline-block";
    }
  }
  setTimeout(typeMessage, 1000);
}

// Esta función se activa al darle al botón "Finalizar" de la pantalla 4
function finishMessage() {
  // 1. Cambiamos a la pantalla 5
  document.getElementById("pantalla4").classList.remove("activa");
  document.getElementById("pantalla4").style.display = "none";

  const p5 = document.getElementById("pantalla5");
  p5.classList.add("activa");
  p5.style.display = "flex";

  // 2. Esperamos X tiempo (ejemplo: 7 segundos) y pasamos a la 6
  // Calculado para una lectura cómoda de una frase corta
  setTimeout(() => {
    irAPantallaFinal();
  }, 7000);
}

function irAPantallaFinal() {
  const p5 = document.getElementById("pantalla5");
  const p6 = document.getElementById("pantalla6");

  p5.classList.remove("activa");
  p5.style.display = "none";

  p6.classList.add("activa");
  p6.style.display = "flex";
}

function cerrarProyecto() {
  // Aquí puedes redirigir a tu Instagram, TikTok o simplemente un mensaje
  alert("¡Espero que te haya gustado! Hecho con ❤️ por Felipe.");
  // window.location.href = "https://tiktok.com/@tu_usuario"; 
}
// Ejemplo de clic en el último botón
// function irAlFinal() {
//   document.getElementById('pantalla3').style.display = 'none'; // u ocultar la sección carrusel
//   document.getElementById('pantalla4').classList.add('activa');
//   iniciarTexto(); // Arranca el efecto
// }