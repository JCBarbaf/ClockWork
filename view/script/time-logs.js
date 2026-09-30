const timeLogsButton = document.querySelector('.time-logs-button');
const timeLogsList = document.querySelector('.time-logs');

const urlTimeLogs = "http://localhost:3000/api/time-logs";
const urlWorkers = "http://localhost:3000/api/workers/";

timeLogsButton.addEventListener('click', async (event) => {
    try {
    const response = await fetch(urlTimeLogs);

    const timeLogs = await response.json();

    timeLogsList.innerHTML = "";

    timeLogs.forEach((log) => {

      // const resposeWorker = await fetch(urlWorkers)

      const li = document.createElement("li");
      console.log(log);
      li.classList.add('time-log');
      li.classList.add('list-item');
      const typeClass = log.type === 'Clock-In' ? 'clock-in' : 'clock-out';
      li.classList.add(typeClass);

      const date = new Date(log.datetime);

        const formattedDate = date.toLocaleString("es-ES", {
          dateStyle: "short",
          timeStyle: "short",
        });

      li.innerHTML = `<span>${log["employee_code"]}</span><span>${log.type === 'Clock-In' ? 'Entrada' : 'Salida'}</span>${formattedDate}`;

      timeLogsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener los fichajes:", error);
  }
});