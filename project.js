//페이지가 로드 되자마자 바로 실행 
document.addEventListener("DOMContentLoaded", function () {
    const $container = document.getElementById("container");
    // 국기게양일이 없는 달을 빼고, 국기게양일이 3번 있는 10월은 세번 출력하기 위해 출력할 달을 저장
    const CalendarMonths = [3, 6, 7, 8, 10, 10, 10];
    // 정답 체크를 위한 배열
    const holidays = ['3/1', '6/6', '7/17', '8/15', '10/1', '10/3', '10/9'];

    //사용자가 선택한 날짜를 저장하기 위한 배열
    let selectedDateElements = [];
    //채점 처리를 위한 총점 변수
    let totalScore = 0;

    //달력 생성 로직
    function createCalendar(container, monthIndex) {
        let calendarDiv = document.createElement("div");
        calendarDiv.classList.add("calendar");
        container.appendChild(calendarDiv);
        // jsCalendar 라이브러리 사용
        let calendar = jsCalendar.new({
            target: calendarDiv,
            date: "01/" + CalendarMonths[monthIndex] + "/2024",
            navigator: false,
            zeroFill: false,
            monthFormat: "month",
            dayFormat: "D",
            language: "ko"
        });
        // 클릭 핸들러 할당
        calendar.onDateClick(function (event, date) {
            onClickHandler(monthIndex, calendarDiv, date);
            calendar.set(date)
        });
        return calendarDiv;
    }

    function onClickHandler(calendarIndex, calendarDiv, date) {
        //클릭한 날짜를 배열에 저장
        let selectedDateElement = selectedDateElements[calendarIndex];
        if (selectedDateElement) {
            selectedDateElement.remove();
        }
        // 사용자가 클릭한 날짜를 받음.
        // js의 getMonth는 0부터 시작하므로 +1로 원래 달 표기
        let month = date.getMonth() + 1;
        let day = date.getDate();
        //div를 만들어 선택한 날짜를 텍스트로 출력
        selectedDateElement = document.createElement("div");
        selectedDateElement.textContent = month + "월 " + day + "일";
        calendarDiv.appendChild(selectedDateElement);
        selectedDateElements[calendarIndex] = selectedDateElement;
        
        // 클릭한 날짜가 국기게양일에 해당하면 점수 증가
        if (holidays.includes(month + '/' + day)) {
            totalScore++;
        }
        

    }
    function scoreCalendar() {
        // 전부 정답일 경우와 틀린 날짜가 있는 경우의 처리
        if (totalScore === 7) {
            alert("정답입니다. 대단하네요!");
        } else {
            
            alert(`${alert}개 맞췄습니다. 아쉽네요! 다시 한번 할까요?`);
        }

        // 1회가 끝났음으로 모든 정보를 초기화
        selectedDateElements.forEach(selectedDateElement => {
            selectedDateElement.textContent = '';
        });
        selectedDateElements = [];
        totalScore = 0;
    }
    //달력 생성 로직을 호출해 달력을 출력
    CalendarMonths.forEach((month, index) => {
        createCalendar($container, index);
    });
    //채점 버튼에 이벤트 리스너 할당
    const totalScoreButton = document.getElementById("total-score");
    totalScoreButton.addEventListener("click", scoreCalendar);
});
