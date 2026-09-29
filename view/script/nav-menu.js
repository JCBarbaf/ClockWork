const clockAppModal = document.querySelector('.clock-app-modal');
const workerListModal = document.querySelector('.worker-list-modal');
const timeLogsModal = document.querySelector('.time-logs-modal');

const headerMenu = document.querySelector('.header-menu');

headerMenu.addEventListener('click', (event) => {
    if (event.target.closest('.clock-app-button')) {
        resetModals();
        clockAppModal.classList.add('active');
    }
    if (event.target.closest('.worker-list-button')) {
        resetModals();
        workerListModal.classList.add('active');
    }
    if (event.target.closest('.time-logs-button')) {
        resetModals();
        timeLogsModal.classList.add('active');
    }
})

function resetModals() {
    clockAppModal.classList.remove('active');
    workerListModal.classList.remove('active');
    timeLogsModal.classList.remove('active');
}