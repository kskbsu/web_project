
document.addEventListener("DOMContentLoaded", function () {
    const $container = document.getElementById("container");

    const CalendarMonths = [3, 6, 7, 8, 10, 10, 10];

    const holidays = ['3/1', '6/6', '7/17', '8/15', '10/1', '10/3', '10/9'];

    let selectedDateElements = [];

    let totalScore = 0;


    function createCalendar(container, monthIndex) {
        let calendarDiv = document.createElement("div");
        calendarDiv.classList.add("calendar");
        container.appendChild(calendarDiv);

        let calendar = jsCalendar.new({
            target: calendarDiv,
            date: "01/" + CalendarMonths[monthIndex] + "/2024",
            navigator: false,
            zeroFill: false,
            monthFormat: "month",
            dayFormat: "D",
            language: "ko"
        });

        calendar.onDateClick(function (event, date) {
            onClickHandler(monthIndex, calendarDiv, date);
            calendar.set(date)
        });
        return calendarDiv;
    }

    function onClickHandler(calendarIndex, calendarDiv, date) {

        let selectedDateElement = selectedDateElements[calendarIndex];
        if (selectedDateElement) {
            selectedDateElement.remove();
        }
        let month = date.getMonth() + 1;
        let day = date.getDate();

        selectedDateElement = document.createElement("div");
        selectedDateElement.textContent = month + "월 " + day + "일";
        calendarDiv.appendChild(selectedDateElement);
        selectedDateElements[calendarIndex] = selectedDateElement;


        if (holidays.includes(month + '/' + day)) {
            totalScore++;
        }


    }
    function scoreCalendar() {
        if (totalScore === 7) {
            alert("정답입니다. 대단하네요!");
        } else {

            alert(`${alert}개 맞췄습니다. 아쉽네요! 다시 한번 할까요?`);
        }
        selectedDateElements.forEach(selectedDateElement => {
            selectedDateElement.textContent = '';
        });
        selectedDateElements = [];
        totalScore = 0;
    }
    CalendarMonths.forEach((month, index) => {
        createCalendar($container, index);
    });
    const totalScoreButton = document.getElementById("total-score");
    totalScoreButton.addEventListener("click", scoreCalendar);
});
