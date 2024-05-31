

document.addEventListener("DOMContentLoaded", function() {
    const $container = document.getElementById("container");

    // 각 달력을 div로 감싸기
    for (var i = 1; i < 13; i++) {
        let calendarDiv = document.createElement("div");
        calendarDiv.classList.add("calendar");
        $container.appendChild(calendarDiv);

        // 1~12월어치의 달력을 생성
        jsCalendar.new({
            target: calendarDiv,
            date: "01/" + i  + "/2024", 
            navigator: false,
            zeroFill: false,
            monthFormat: "month",
            dayFormat: "D",
            language: "ko"
        });
    }
});
