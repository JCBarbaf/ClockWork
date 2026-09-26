//lista de trabajadores
const btnWorkers = document.getElementById("btnWorkers");
const workersList = document.getElementById("workersList");

//Busqueda
const employeeInput = document.getElementById("employeeCode");
const clockButton = document.getElementById("clockButton");
const message = document.getElementById("message");

// Variables
const urlWorkers = "http://localhost:3000/api/workers/";
const urlTimeLog = "http://localhost:3000/api/time-logs";

btnWorkers.addEventListener("click", async () => {
  try {
    const response = await fetch(urlWorkers);

    const workers = await response.json();

    workersList.innerHTML = "";

    workers.forEach((worker) => {
      const li = document.createElement("li");

      li.textContent = `${worker.employee_code} - ${worker.first_name} ${worker.last_names}`;

      workersList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
  }
});

let worker = null;
let nextAction = null;
let timeout;

employeeInput.addEventListener("input", () => {
  //Debounce: Cancela el contador en marcha
  clearTimeout(timeout);

  clockButton.disabled = true;
  message.textContent = "";
  //Cuando pasan 1500ms de la ultima escritura en el input se ejecuta
  timeout = setTimeout(async () => {
    const employeeCode = employeeInput.value.trim();

    if (!employeeCode) {
      return;
    }

    try {
      const response = await fetch(urlWorkers + `${employeeCode}`);

      if (!response.ok) {
        message.textContent = "Trabajador no encontrado";
        return;
      }

      const data = await response.json();
      

      worker = data.worker;
      nextAction = data.nextAction;

      clockButton.textContent = nextAction === "Clock-In" ? "ENTRAR" : "SALIR";

      clockButton.disabled = false;
      if (data.lastLog) {
        const date = new Date(data.lastLog.datetime);

        const formattedDate = date.toLocaleString("es-ES", {
          dateStyle: "short",
          timeStyle: "short",
        });
        const actionText =
          data.lastLog.type === "Clock-In" ? "Entrada" : "Salida";

        message.textContent = `Última ${actionText} - ${formattedDate}`;
      } else {
        message.textContent = "No tiene entradas o salidas anteriores";
      }
    } catch (error) {
      message.textContent = "Error al consultar el trabajador";
    }
  }, 1500);
});

clockButton.addEventListener("click", async () => {
  try {
    const response = await fetch(urlTimeLog, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workerId: worker.id,
        type: nextAction,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    const actionText = data.type === "Clock-In" ? "Entrada" : "Salida";
    message.textContent = ` ${actionText} registrada.`;

    clockButton.disabled = true;
  } catch (error) {
    console.error(error);
    message.textContent = "No se ha podido registrar la entrada";
  }
});
