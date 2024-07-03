let slideIndex = 0;

function changeSlide(n) {
  const slides = document.querySelector('.slides');
  const slideWidth = document.querySelector('.slides img').clientWidth;
  
  slideIndex += n;
  
  if (slideIndex < 0) {
    slideIndex = slides.children.length - 1;
  } else if (slideIndex >= slides.children.length) {
    slideIndex = 0;
  }
  
  slides.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
}

document.getElementById('btn1').addEventListener('click', function() {
  window.location.href = 'page1.html'; // 버튼 1을 클릭하면 page1.html로 이동
});

document.getElementById('btn2').addEventListener('click', function() {
  window.location.href = 'page2.html'; // 버튼 2를 클릭하면 page2.html로 이동
});

document.getElementById('btn3').addEventListener('click', function() {
  window.location.href = 'page3.html'; // 버튼 3을 클릭하면 page3.html로 이동
});