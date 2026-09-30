const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const currentTimeText = document.querySelector('.current-time');
const currentDateText = document.querySelector('.current-date');

let currDateTime;
let lastDate;

updateClock();

function updateClock() {
    currDateTime = new Date();
    currentTimeText.innerHTML = `${String(currDateTime.getHours()).padStart(2, '0')}:${String(currDateTime.getMinutes()).padStart(2, '0')}:${String(currDateTime.getSeconds()).padStart(2, '0')}`;
    setTimeout(updateClock, 1000);
    if (currDateTime.getDate() != lastDate) {
        lastDate = currDateTime.getDate();
        currentDateText.innerHTML = `${currDateTime.getDate()} de ${monthNames[currDateTime.getMonth()]} del ${currDateTime.getFullYear()}`
    }
}