// 입력 필드에 이벤트 리스너 추가
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateAndDisplayResult);
});

function calculateAndDisplayResult() {
    // 입력값 가져오기
    const input1 = parseFloat(document.getElementById('input1').value) || 0;
    const input2 = parseFloat(document.getElementById('input2').value) || 0;
    const input3 = parseFloat(document.getElementById('input3').value) || 0;

    // 수식 계산
    const result = calculate(input1, input2, input3);

    // 결과 표시
    document.getElementById('result').textContent = `점수: ${result.toFixed(1)}`;
}

function calculate(a, b, c) {
    return (a + b / 500) * 12.5 + c * 0.03 + 10;
}