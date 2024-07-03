// 공휴일 여부를 판별하는 함수 (예시)
function isHoliday(date) {
    // 여기에 공휴일 판별 로직을 구현 (예: 특정 공휴일 날짜를 배열에 등록하여 확인)
    const holidays = ['2024-08-15', '2024-09-16', '2024-09-17', '2024-09-18',
                      '2024-10-03', '2024-10-09', '2024-12-25'
    ]; 
    const dateString = date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환

    return holidays.includes(dateString);
}

// 현재 시간을 기준으로 다음 두 개의 버스 도착 시간 계산 함수 (분 단위)
function calculateTimeUntilNextBus() {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes(); // 현재 시간을 분 단위로 변환

    let nextBuses = [];
    let foundBuses = 0;

    // 공휴일 여부 확인
    const isHolidayToday = isHoliday(now);

    // 버스 시간표 선택 (예시: 공휴일, 평일, 토요일마다 다른 시간표)
    let timetable;
    if (isHolidayToday) {
        timetable = [
            { time: '04:55'},
            { time: '05:14'},
            { time: '05:33'},
            { time: '05:52'},
            { time: '06:11'},
            { time: '06:30'},
            { time: '06:49'},
            { time: '07:08'},
            { time: '07:27'},
            { time: '07:46'},
            { time: '08:05'},
            { time: '08:26'},
            { time: '08:47'},
            { time: '09:08'},
            { time: '09:29'},
            { time: '09:50'},
            { time: '10:11'},
            { time: '10:32'},
            { time: '10:53'},
            { time: '11:14'},
            { time: '11:36'},
            { time: '11:57'},
            { time: '12:18'},
            { time: '12:39'},
            { time: '13:00'},
            { time: '13:21'},
            { time: '13:42'},
            { time: '14:03'},
            { time: '14:24'},
            { time: '14:45'},
            { time: '15:07'},
            { time: '15:28'},
            { time: '15:49'},
            { time: '16:10'},
            { time: '16:31'},
            { time: '16:52'},
            { time: '17:13'},
            { time: '17:34'},
            { time: '17:55'},
            { time: '18:16'},
            { time: '18:37'},
            { time: '18:58'},
            { time: '19:19'},
            { time: '19:40'},
            { time: '20:01'},
            { time: '20:22'},
            { time: '20:44'},
            { time: '21:06'},
            { time: '21:28'},
            { time: '21:50'}
        ];
    } else if (now.getDay() === 6) { // 토요일은 now.getDay()가 6
        timetable = [
            { time: '04:55'},
            { time: '05:12'},
            { time: '05:29'},
            { time: '05:46'},
            { time: '06:03'},
            { time: '06:20'},
            { time: '06:37'},
            { time: '06:54'},
            { time: '07:11'},
            { time: '07:28'},
            { time: '07:45'},
            { time: '07:56'},
            { time: '08:17'},
            { time: '08:38'},
            { time: '08:59'},
            { time: '09:20'},
            { time: '09:41'},
            { time: '10:02'},
            { time: '10:22'},
            { time: '10:44'},
            { time: '11:05'},
            { time: '11:26'},
            { time: '11:46'},
            { time: '12:06'},
            { time: '12:26'},
            { time: '12:46'},
            { time: '13:06'},
            { time: '13:26'},
            { time: '13:46'},
            { time: '14:06'},
            { time: '14:26'},
            { time: '14:46'},
            { time: '15:00'},
            { time: '15:20'},
            { time: '15:40'},
            { time: '16:00'},
            { time: '16:20'},
            { time: '16:40'},
            { time: '17:00'},
            { time: '17:20'},
            { time: '17:40'},
            { time: '18:00'},
            { time: '18:20'},
            { time: '18:35'},
            { time: '18:54'},
            { time: '19:13'},
            { time: '19:32'},
            { time: '19:51'},
            { time: '20:10'},
            { time: '20:30'},
            { time: '20:50'},
            { time: '21:10'},
            { time: '21:30'},
            { time: '21:50'}
        ];
    } else { // 나머지는 평일
        timetable = [
            { time: '04:55'},
            { time: '05:10'},
            { time: '05:25'},
            { time: '05:40'},
            { time: '05:55'},
            { time: '06:10'},
            { time: '06:25'},
            { time: '06:40'},
            { time: '06:56'},
            { time: '07:12'},
            { time: '07:29'},
            { time: '07:47'},
            { time: '08:06'},
            { time: '08:25'},
            { time: '08:44'},
            { time: '09:03'},
            { time: '09:22'},
            { time: '09:41'},
            { time: '10:00'},
            { time: '10:20'},
            { time: '10:40'},
            { time: '11:00'},
            { time: '11:20'},
            { time: '11:40'},
            { time: '11:59'},
            { time: '12:18'},
            { time: '12:37'},
            { time: '12:56'},
            { time: '13:15'},
            { time: '13:34'},
            { time: '13:53'},
            { time: '14:12'},
            { time: '14:31'},
            { time: '14:50'},
            { time: '15:09'},
            { time: '15:19'},
            { time: '15:38'},
            { time: '15:57'},
            { time: '16:16'},
            { time: '16:35'},
            { time: '16:54'},
            { time: '17:13'},
            { time: '17:32'},
            { time: '17:51'},
            { time: '18:10'},
            { time: '18:29'},
            { time: '18:48'},
            { time: '19:00'},
            { time: '19:18'},
            { time: '19:37'},
            { time: '19:56'},
            { time: '20:15'},
            { time: '20:34'},
            { time: '20:53'},
            { time: '21:12'},
            { time: '21:31'},
            { time: '21:50'}
        ];
    }

    // 버스 도착 시간 계산
    for (let i = 0; i < timetable.length; i++) {
        const busTime = new Date(now);
        const [hours, minutes] = timetable[i].time.split(':');
        busTime.setHours(hours, minutes, 0, 0);

        const busTimeInMinutes = busTime.getHours() * 60 + busTime.getMinutes();
        if (busTimeInMinutes >= currentTimeInMinutes) {
            nextBuses.push({
                timeInMinutes: busTimeInMinutes,
                destination: timetable[i].destination
            });
            foundBuses++;
        }

        if (foundBuses === 2) {
            break;
        }
    }

    if (nextBuses.length === 0) {
        return '출발 예정 정보가 없습니다.';
    }

    let result = '';
    nextBuses.forEach((bus, index) => {
        const minutesUntilNextBus = bus.timeInMinutes - currentTimeInMinutes;
        result += `${minutesUntilNextBus} 분 후 출발합니다.<br>`;
    });

    return result;
}

// 1초마다 업데이트하여 시간 표시하는 함수
function updateBusInfo() {
    const resultDiv = document.getElementById('result');

    setInterval(() => {
        const result = calculateTimeUntilNextBus();
        resultDiv.innerHTML = result;
    }, 1000); // 1초마다 실행
}

// 페이지 로드 시 자동으로 업데이트 시작
window.onload = updateBusInfo;