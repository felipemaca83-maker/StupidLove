// --- CONFIGURACIÓN GLOBAL ---
window.onload = () => {
  crearParticulas();
};

// --- NAVEGACIÓN ENTRE PANTALLAS ---
function siguientePantalla(n) {
  const actuales = document.querySelectorAll('.pantalla');
  actuales.forEach(p => {
    p.classList.remove('activa');
    p.style.display = 'none';
  });

  const proxima = document.getElementById('pantalla' + n);
  if (proxima) {
    proxima.classList.add('activa');
    proxima.style.display = 'flex';
  }

  // Activar música al entrar a los carruseles (Pantalla 3)
  if (n === 3) {
    reproducirMusica();
  }
}

// --- LÓGICA DE MÚSICA ---
function reproducirMusica() {
  const audio = document.getElementById("backgroundAudio");
  if (audio && audio.paused) {
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 150);
    }).catch(err => console.error("Error audio:", err));
  }
}

// --- LÓGICA DE CARRUSELES ---
document.querySelectorAll(".carrusel-seccion").forEach(seccion => {
  const slides = seccion.querySelectorAll(".slide");
  const dotsContainer = seccion.querySelector(".dots");
  let current = 0;

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("activa");
      dotsContainer.appendChild(dot);
    });
  }

  const actualizarDots = () => {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((d, i) => d.classList.toggle("activa", i === current));
  };

  seccion.addEventListener("click", (e) => {
    if (e.target.closest('.btn-generic')) return;

    if (current < slides.length - 1) {
      slides[current].classList.remove("activa");
      current++;
      slides[current].classList.add("activa");

      // 1. Obtenemos el número de sección actual desde el atributo data
      const numSeccion = seccion.getAttribute('data-seccion');

      // 2. Definimos los textos por sección
      const textosPorSeccion = {
        "1": ["Foto 1 cap 1", "Foto 2 cap 1", "Foto 3 cap 1", "Foto 4 cap 1", "Foto 5 cap 1", "Foto 6 cap 1", "Foto 7 cap 1", "Foto 8 cap 1"],
        "2": ["Inicio cap 2", "Segunda de cap 2", "Tercera de cap 2", "Final de cap 2", "Foto 5 cap 2", "Foto 6 cap 2", "Foto 7 cap 2", "Foto 8 cap 2"],
        "3": ["Foto 1 cap 3", "Foto 2 cap 3", "Foto 3 cap 3", "Foto 4 cap 3", "Foto 5 cap 3", "Foto 6 cap 3", "Foto 7 cap 3", "Foto 8 cap 3"]
      };

      // 3. Buscamos el span específico DE ESTA SECCIÓN
      const textoContenedor = seccion.querySelector(".info-slide-externo span");

      if (textoContenedor && textosPorSeccion[numSeccion]) {
        textoContenedor.style.opacity = 0;
        setTimeout(() => {
          // Usamos el array de textos que corresponda a esta sección
          textoContenedor.textContent = textosPorSeccion[numSeccion][current];
          textoContenedor.style.opacity = 1;
        }, 200);
      }

      actualizarDots();
    }
  });

  const btn = seccion.querySelector(".siguiente-carrusel");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const nextElement = seccion.nextElementSibling;
      if (nextElement && nextElement.classList.contains('carrusel-seccion')) {
        seccion.style.display = "none";
        nextElement.classList.add("visible");
        nextElement.style.display = "flex";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});

// --- TRANSICIÓN A PANTALLA FINAL (VIDEO) ---
function irAlFinal() {
  document.getElementById('pantalla3').style.display = 'none';
  const p4 = document.getElementById('pantalla4');
  p4.classList.add('activa');
  p4.style.display = 'flex';
  iniciarTexto();
}

// --- EFECTO MÁQUINA DE ESCRIBIR ---
function iniciarTexto() {
  const messageText = `En definitiva`;

  const messageEl = document.getElementById("message");
  messageEl.textContent = "";
  let i = 0;

  function typeMessage() {
    if (i < messageText.length) {
      let char = messageText.charAt(i);
      messageEl.textContent += char;
      i++;

      let delay = 50;
      if (",".includes(char)) delay = 400;
      if (".✨😍💪🏼🥰🤭🫶🏽💕😎".includes(char)) delay = 800;
      if ("\n".includes(char)) delay = 600;

      setTimeout(typeMessage, delay);
      const container = messageEl.parentElement;
      container.scrollTop = container.scrollHeight;
    } else {
      document.getElementById("readButton").style.display = "inline-block";
    }
  }
  setTimeout(typeMessage, 1000);
}

// --- PANTALLAS DE CIERRE ---
function finishMessage() {
  document.getElementById("pantalla4").style.display = "none";
  const p5 = document.getElementById("pantalla5");
  p5.classList.add("activa");
  p5.style.display = "flex";

  setTimeout(() => {
    p5.style.display = "none";
    const p6 = document.getElementById("pantalla6");
    p6.classList.add("activa");
    p6.style.display = "flex";
  }, 7000);
}

function cerrarProyecto() {
  console.log("Botón finalizar presionado");
  alert("¡Espero que te haya gustado! Hecho con ❤️ por Felipe.");
}

// --- SISTEMA DE PARTÍCULAS ---
function crearParticulas() {
  const container = document.body;
  for (let i = 0; i < 150; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = (Math.random() * 3 + 1) + 'px';
    p.style.width = size;
    p.style.height = size;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.opacity = Math.random();
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}