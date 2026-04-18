// Testimonials Carousel Controller
(function() {
  const carouselContainer = document.querySelector('.testimonials-container');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const bullets = document.querySelectorAll('.testimonial-bullet');

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideInterval = 5000; // 5 seconds
  let autoPlayTimer;

  // Function to update carousel position
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
    updateBullets();
  }

  // Function to update active bullet
  function updateBullets() {
    bullets.forEach((bullet, index) => {
      if (index === currentIndex) {
        bullet.classList.remove('bg-coffee/40');
        bullet.classList.add('bg-coffee');
      } else {
        bullet.classList.remove('bg-coffee');
        bullet.classList.add('bg-coffee/40');
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoPlay();
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Auto play carousel
  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, slideInterval);
  }

  // Reset auto play
  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      goToSlide(index);
    });
  });

  // Pause on hover
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayTimer);
    });

    carousel.addEventListener('mouseleave', () => {
      startAutoPlay();
    });
  }

  // Initialize
  updateCarousel();
  startAutoPlay();
})();
