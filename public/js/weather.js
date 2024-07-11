// OpenWeatherMap API Key
const apiKey = '9c6036555b8fdf13d48834af36b93df1';
// 위치 정보를 기반으로 날씨 정보를 가져오는 API Endpoint
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Busan&appid=${apiKey}&units=metric`;

// API 요청 보내기
fetch(apiUrl)
.then(response => response.json()) // JSON 형식으로 변환
.then(data => {
    console.log(data); // 데이터 확인 (개발자 도구 콘솔에 출력)

    // 온도 정보 가져오기
    const temperature = Math.round(data.main.temp);
    document.getElementById('temperature').textContent = `현재 온도: ${temperature} °C`;

    // 날씨 상태 정보 가져오기
    const weatherDescription = data.weather[0].description;
    document.getElementById('weather-description').textContent = `날씨: ${weatherDescription}`;

    // 풍속 및 풍향 정보 가져오기
    //const windSpeed = data.wind.speed;
    //const windDeg = data.wind.deg;
    //document.getElementById('wind-info').textContent = `풍속: ${windSpeed} m/s, 풍향: ${windDeg}°`;

    // 일출 및 일몰 시간 가져오기
    //const options = { hour12: false, hour: 'numeric', minute: 'numeric' };
    //const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ko-KR', options);
    //const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('ko-KR', options);
    //document.getElementById('sunrise-sunset').textContent = `일출: ${sunrise}, 일몰: ${sunset}`;
    
    // 날씨 상태에 따라 이미지 설정
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherDescription.includes('맑음') || weatherDescription.includes('구름')) {
        weatherIcon.classList.add('cloudy');
    } else if (weatherDescription.includes('비') || weatherDescription.includes('소나기')|| weatherDescription.includes('light rain')) {
        weatherIcon.classList.add('rainy');
    } else if (weatherDescription.includes('overcast clouds')) {
        weatherIcon.classList.add('overcastclouds');
    } else {
        weatherIcon.classList.add('sunny');
    }
})
.catch(error => {
    console.error('날씨 정보를 가져오는 중 에러 발생:', error);
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '<p>날씨 정보를 가져오는 중 에러 발생</p>';
});