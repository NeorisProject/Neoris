let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.getElementById('prevBtn').addEventListener('click', () => {
  moveToPrevSlide();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  moveToNextSlide();
});

function updateSlidePosition() {
  for (let slide of slides) {
    slide.style.transform = 'translateX(' + (-slideIndex * 100) + '%)';
  }
}

function moveToPrevSlide() {
  if (slideIndex === 0) {
    slideIndex = totalSlides - 1;
  } else {
    slideIndex--;
  }
  updateSlidePosition();
}

function moveToNextSlide() {
  if (slideIndex === totalSlides - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  updateSlidePosition();
}

// Optional: Add auto-slide functionality
setInterval(moveToNextSlide, 3000); // Change image every 3 seconds