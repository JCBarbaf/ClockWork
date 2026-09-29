const btnWorkers = document.querySelector(".worker-list-button");
const workersList = document.querySelector(".worker-list");
const urlWorkers = "http://localhost:3000/api/workers/";

btnWorkers.addEventListener("click", async () => {
  try {
    const response = await fetch(urlWorkers);

    const workers = await response.json();

    workersList.innerHTML = "";

    workers.forEach((worker) => {
      const li = document.createElement("li");

      li.classList.add('worker-item');
      li.classList.add('list-item');
      li.innerHTML = `<span>${worker.employee_code}</span> ${worker.first_name} ${worker.last_names}`;

      workersList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
  }
});