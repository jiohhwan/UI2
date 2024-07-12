let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slides img').length;

    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }

    const offset = -slideIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function changeSlide(direction) {
    showSlide(slideIndex + direction);
}

// Initialize the first slide
showSlide(slideIndex);