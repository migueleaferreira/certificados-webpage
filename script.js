const carousel = document.getElementById("carousel");
const scrollAmount = 370;
let scrollInterval;

function scrollCarousel(direction) {
    // direction = 1 (direita) ou -1 (esquerda)
    carousel.scrollBy({ 
        left: direction * scrollAmount, 
        behavior: "smooth" 
    });
}

// ===== SCROLL CONTÍNUO AO SEGURAR BOTÃO =====
function startContinuousScroll(direction) {
    // Scroll imediato ao clicar
    carousel.scrollBy({ 
        left: direction * 5, 
        behavior: "auto" 
    });
    
    // Continua scrollando enquanto segura
    scrollInterval = setInterval(() => {
        carousel.scrollBy({ 
            left: direction * 5, 
            behavior: "auto" 
        });
    }, 20);
}

function stopContinuousScroll() {
    clearInterval(scrollInterval);
}

// Adicionar eventos aos botões
document.querySelector('.prev').addEventListener('mousedown', () => startContinuousScroll(-1));
document.querySelector('.prev').addEventListener('mouseup', stopContinuousScroll);
document.querySelector('.prev').addEventListener('mouseleave', stopContinuousScroll);

document.querySelector('.next').addEventListener('mousedown', () => startContinuousScroll(1));
document.querySelector('.next').addEventListener('mouseup', stopContinuousScroll);
document.querySelector('.next').addEventListener('mouseleave', stopContinuousScroll);

// ===== DRAG/ARRASTAR COM MOUSE =====
let isDragging = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});

// Efeito suave dos cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(card => observer.observe(card));

// Suporte para teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollCarousel(-1);
    if (e.key === 'ArrowRight') scrollCarousel(1);
});
