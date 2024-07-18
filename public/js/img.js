// 모달 열기 함수
function openModal(imageSrc, imageAlt) {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('modalImg');
    
    // 이미지와 텍스트 설정
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    
    // 모달 보이기
    modal.style.display = 'block';
  }

// 모달 닫기 함수
function closeModal() {
    var modal = document.getElementById('myModal');
    
    // 모달 숨기기
    modal.style.display = 'none';
    
    // 이미지 초기화
    var modalImg = document.getElementById('modalImg');
    modalImg.src = '';
    modalImg.alt = '';
  }
  
  // 모달 영역 외 클릭 시 닫기
  window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
      closeModal();
    }
  }