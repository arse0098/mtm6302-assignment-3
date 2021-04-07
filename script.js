const $main = document.getElementById("main");
const $title = document.getElementById("title");
const $year = document.getElementById("year");
const $month = document.getElementById("month");
const $day = document.getElementById("day");
const $submit = document.getElementById("submit");

const $countdown = document.getElementById("countdown");
const $output_title = document.getElementById("output_title");
const $output_timer = document.getElementById("output_timer");
const $new_countdown = document.getElementById("new_countdown");

function addOptionsToSelect($select, options) {
    let innerHTML = ""
    for (option of options) {
        innerHTML += `<option>${option}</option>`;
    }

    $select.innerHTML = innerHTML;
}

let years = [];
for (let i = 2021; i <= 2100; i++) {
    years.push(i);
} 
addOptionsToSelect($year, years);

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
addOptionsToSelect($month, months);

function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year %400 ===0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function numberOfDays(month) {
    const monthsWith31Days = ["January", "March", "May", "July", "August", "October", "December"];

    if (month === "February") {
        if (isLeapYear(year)) {
            return 29;
        } else {
            return 28;
        }

    }
    if (monthsWith31Days.includes(month)) {
        return 31;
    }
    else {
        return 30;
    }
}

function setDays() {
    let numDays = numberOfDays($month.value, $year.value);
    let days = [];
    for (let i = 1; i <= numDays; i++) {
        days.push(i)
    }
    addOptionsToSelect($day, days);
}

$month.addEventListener("change", setDays)
$year.addEventListener("change", setDays)
setDays();

function submitCountdown() {
    localStorage.setItem("title", $title.value);
    localStorage.setItem("year", $year.value);
    localStorage.setItem("month", $month.value);
    localStorage.setItem("day", $day.value);

    showCountdown();
}

$submit.addEventListener("click", submitCountdown);

let intervalTimer;

function showCountdown() {
    $main.style.display = "none"
    $countdown.style.display = "block";

    $output_title.innerHTML = $title.value;

    timerLoop();
    intervalTimer = setInterval(timerLoop, 1000);
}

function timerLoop() {
    let monthIndex = months.indexOf($month.value)

    let endDate = new Date($year.value, monthIndex, $day.value).getTime();
    let startDate = Date.now();

    let timeDifference = endDate - startDate;

    let totalDays = timeDifference / (1000 * 60 * 60 * 24)
    let numberOfDays = Math.floor(totalDays)

    let totalHours = (totalDays - numberOfDays) * 24;
    let numberOfHours = Math.floor(totalHours);

    let totalMinutes = (totalHours - numberOfHours) * 60;
    let numberOfMinutes = Math.floor(totalMinutes);

    let totalSeconds = (totalMinutes - numberOfMinutes) * 60;
    let numberofSeconds = Math.floor(totalSeconds);

    $output_timer.innerHTML = `${numberOfDays} days, ${numberOfHours} hours, ${numberOfMinutes} minutes, and ${numberofSeconds} seconds`
}

function changeCountdown() {
    clearInterval(intervalTimer);

    $countdown.style.display = "none";
    $main.style.display = "block";
}
$new_countdown.addEventListener("click", changeCountdown)

if (localStorage.length !== 0) {
    $title.value = localStorage.getItem("title");
    $year.value = localStorage.getItem("year");
    $month.value = localStorage.getItem("month");
    $day.value = localStorage.getItem("day");

    showCountdown();
} else {
    $main.style.display = "block";
}