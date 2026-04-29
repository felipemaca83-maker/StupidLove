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
    let current = 0;

    slides.forEach((s, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("activa");
        dotsContainer.appendChild(dot);
    });

    function actualizarDots() {
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((d, i) => d.classList.toggle("activa", i === current));
    }

    seccion.addEventListener("click", (e) => {
        // Si clickean el botón, no hacemos nada aquí
        if (e.target.classList.contains('btn-generic')) return;

        if (current < slides.length - 1) {
            slides[current].classList.remove("activa");
            current++;
            slides[current].classList.add("activa");
            actualizarDots();
        } 
    });

    const btn = seccion.querySelector(".siguiente-carrusel");
    if (btn) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const nextSeccion = seccion.nextElementSibling;
            if (nextSeccion && nextSeccion.classList.contains('carrusel-seccion')) {
                nextSeccion.classList.add("visible");
                setTimeout(() => {
                    nextSeccion.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
                // Opcional: ocultar el botón tras usarlo
                btn.style.opacity = "0";
                btn.style.pointerEvents = "none";
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

// Llamar la función al cargar
//earParticulas();
// const $ = id => document.getElementById(id);
//         const musica = $('musica');
//         const TIMING = { transition: 800, p2_delay: 15000, p2_scroll: 45000, p3_scroll: 55000, final_scroll: 112000, final_exit_delay: 90000 };

        // function createParticles() {

        //     const containers = ['particle-container', 'welcome-particles', 'prep-particles'];
        //     const colors = ['#ffffff', '#ffebef', '#e3f2fd', '#fff5f8'];

        //     containers.forEach(id => {
        //         const container = $(id);
        //         if (!container) return;

        //         for (let i = 0; i < 100; i++) {
        //             const p = document.createElement('div');
        //             p.className = 'particle';
                 
        //             const size = Math.random() * 4 + 1 + 'px';
        //             p.style.width = p.style.height = size;
        //             p.style.left = Math.random() * 100 + '%';
        //             p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        //             p.style.animationDuration = Math.random() * 5 + 5 + 's';
        //             p.style.animationDelay = Math.random() * 10 + 's';
        //             container.appendChild(p);
        //         }
        //     });
        // }
// function escribirEfecto(element, texto, velocidad = 60) {
//       return new Promise(resolve => {
//         let i = 0;
//         function escribir() {
//           if (i < texto.length) {
//             element.textContent += texto.charAt(i);
//             i++;
//             setTimeout(escribir, velocidad);
//           } else {
//             element.style.borderRight = "none";
//             resolve();
//           }
//         }
//         escribir();
//       });
//     }

//     async function escribirEnOrden() {
//       const elementos = document.querySelectorAll(".typewriter");
//       for (let el of elementos) {
//         const texto = el.getAttribute("data-text");
//         await escribirEfecto(el, texto);
//       }
//       document.getElementById("btnPantalla1").style.display = "inline-block";
//     }

//     document.addEventListener("DOMContentLoaded", escribirEnOrden);
//     function siguientePantalla(num) {
//       const audio = document.getElementById("backgroundAudio");
//       audio.play().catch(() => console.log("Usuario debe interactuar para reproducir audio en iOS"));

//       document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
//       document.getElementById('pantalla' + num).classList.add('activa');

//       if (num === 3) { iniciarTexto(); }
//     }

//     // Carrusel
//     document.querySelectorAll(".carrusel-seccion").forEach(seccion => {
//       const slides = seccion.querySelectorAll(".slide");
//       let current = 0;
//       const dotsContainer = seccion.querySelector(".dots");

//       slides.forEach((s, i) => {
//         const dot = document.createElement("div");
//         dot.classList.add("dot");
//         if (i === 0) dot.classList.add("activa");
//         dot.addEventListener("click", (e) => {
//           e.stopPropagation();
//           slides[current].classList.remove("activa");
//           current = i;
//           slides[current].classList.add("activa");
//           actualizarDots();
//         });
//         dotsContainer.appendChild(dot);
//       });

//       function actualizarDots() {
//         const dots = dotsContainer.querySelectorAll(".dot");
//         dots.forEach(d => d.classList.remove("activa"));
//         dots[current].classList.add("activa");
//       }

//       seccion.addEventListener("click", () => {
//         slides[current].classList.remove("activa");
//         current = (current + 1) % slides.length;
//         slides[current].classList.add("activa");
//         actualizarDots();
//       });

//       const btn = seccion.querySelector(".siguiente-carrusel");
//       if (btn) {
//         btn.addEventListener("click", (e) => {
//           e.stopPropagation();
//           const nextSeccion = seccion.nextElementSibling;
//           if (nextSeccion) {
//             nextSeccion.classList.add("visible");
//             nextSeccion.scrollIntoView({ behavior: "smooth" });
//           }
//         });
//       }
//     });

//     function iniciarTexto() {
//       const messageText = `En definitiva, has logrado despertar en mí sentimientos y emociones que rara vez me atrevo a mostrar.
      
//       No es fácil para mí abrirme, pero contigo todo se siente diferente; la conexión que compartimos es única, 
//       y me impulsa a mostrar mi versión más auténtica, más perfecta y sin filtros, porque tú mereces lo mejor de mí.
      
//       Quiero recordarte que te admiro, cada día te esfuerzas más,  nunca te rindes ni desistes. 💪🏼
      
//       Admiro esa valentía con la que te levantas, lo brillante que eres, hermosa 🥰, valiente y soñadora.  
      
//       Nunca dudes de lo apoteósica e inteligente que eres, un poquito loca 🤭 JAJA, pero con un corazón hermoso, y eso jamás lo he puesto en duda. 🫶🏽
      
//       No soy de decir este tipo de cosas, pero tu lo vales, rompes todas esas barreras y te lo agradezco, porque gracias a eso soy mejor cada día, en todos los aspectos.
      
//       Att: Felipe, el mejor que pudiste encontar 😎
      
//       Pstd: Hacer esto me tomo muchas noches, una vez me preguntaste sobre de que trataba mi trabajo, esto es un poco de lo que hago, diseñe y cree esto para ti, me inspiras a esto y mucho más 💕`;


//       const messageEl = document.getElementById("message");
//       messageEl.textContent = "";
//       let i = 0;

//       function typeMessage() {
//         if (i < messageText.length) {
//           messageEl.textContent += messageText.charAt(i);
//           i++;
//           let delay = 60; // antes 40
//           if (",💵".includes(messageText.charAt(i - 1))) delay = 450; // antes 250
//           if (".✨😍".includes(messageText.charAt(i - 1))) delay = 800; // antes 400
//           setTimeout(typeMessage, delay);
//         } else {
//           document.getElementById("readButton").style.display = "inline-block";
//         }
//       }

//       setTimeout(typeMessage, 500);
//     }

//     function finishMessage() {
//       document.getElementById("pantalla3").classList.remove("activa");
//       document.getElementById("pantalla4").classList.add("activa");
//     }

    