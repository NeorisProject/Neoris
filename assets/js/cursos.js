document.addEventListener('DOMContentLoaded', function () {
    const imageWrapper = document.querySelector('.carousel-slide');
    let imageItems = document.querySelectorAll('.carousel-slide .carousel-item');
    const perView = 3; // Number of visible items - adjust if needed
    let currentIndex = 0;
    const delay = 2000; // 2 seconds delay for auto-scroll
  
    // Clone the first 'perView' items and append them to the end of the carousel
    for (let i = 0; i < perView; i++) {
      const clone = imageItems[i].cloneNode(true);
      imageWrapper.appendChild(clone);
    }
  
    // Calculate the width of each item including margin
    const itemWidth = imageItems[0].offsetWidth + parseInt(getComputedStyle(imageItems[0]).marginRight);
  
    // Update carousel position to the new currentIndex
    function updateCarousel() {
      imageWrapper.style.transition = 'transform 0.3s ease-out';
      imageWrapper.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
    }
  
    // Handle the end of transitions for an infinite loop effect
    imageWrapper.addEventListener('transitionend', () => {
      imageItems = document.querySelectorAll('.carousel-slide .carousel-item'); // Re-select the items including clones
      if (currentIndex >= imageItems.length - perView) {
        imageWrapper.style.transition = 'none'; // Disable transition
        currentIndex = 0; // Reset index to show the first real item
        imageWrapper.style.transform = `translateX(${-itemWidth * currentIndex}px)`; // Reset position without transition
      }
    });
  
    // Auto-scroll functionality
    let autoScroll = setInterval(() => {
      currentIndex++;
      updateCarousel();
    }, delay);
  
    // Stop auto-scroll when hovering over the carousel
    imageWrapper.addEventListener('mouseenter', () => {
      clearInterval(autoScroll);
    });
  
    imageWrapper.addEventListener('mouseleave', () => {
      autoScroll = setInterval(() => {
        currentIndex++;
        updateCarousel();
      }, delay);
    });
  
    // Previous and Next button functionality
    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentIndex <= 0) {
        currentIndex = imageItems.length - perView - 1;
        imageWrapper.style.transition = 'none';
        imageWrapper.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
      }
      // Need to allow time for the transition to be disabled if it was the first item
      setTimeout(() => {
        currentIndex--;
        updateCarousel();
      }, 10);
    });
  
    document.getElementById('nextBtn').addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
    });
  });
  