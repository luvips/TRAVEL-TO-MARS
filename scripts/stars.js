
export function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    const ctx = canvas.getContext('2d');

    // Ajusta el canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const numStars = 500; // Cantidad de estrellas
    let stars = [];

    // Crea las estrellas con propiedades aleatorias
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5, // Radio entre 0.5 y 2
            alpha: Math.random(), // Opacidad inicial
            deltaAlpha: (Math.random() - 0.5) * 0.02 // Velocidad de parpadeo
        });
    }

    // Dibuja una estrella
    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    }

    // Actualiza la opacidad de la estrella para el efecto de parpadeo
    function updateStar(star) {
        star.alpha += star.deltaAlpha;

        // Invierte la dirección del parpadeo si llega a los límites
        if (star.alpha <= 0 || star.alpha >= 1) {
            star.deltaAlpha *= -1;
        }
    }

    // Bucle de animación
    function animate() {
        // Limpia el canvas en cada fotograma
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibuja y actualiza cada estrella
        stars.forEach(star => {
            drawStar(star);
            updateStar(star);
        });

        // Solicita el siguiente fotograma
        requestAnimationFrame(animate);
    }

    // Inicia la animación
    animate();
    initStarfield = true;
}