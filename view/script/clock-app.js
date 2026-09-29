const employeeInput = document.querySelector("#worker-input");
const clockButton = document.querySelector(".clock-in-out-button");
const message = document.querySelector(".message-container");
const urlTimeLog = "http://localhost:3000/api/time-logs";
const urlWorkers = "http://localhost:3000/api/workers/";

let worker = null;
let nextAction = null;
let timeout;

employeeInput.addEventListener("input", () => {
  //Debounce: Cancela el contador en marcha
  clearTimeout(timeout);

  clockButton.disabled = true;
  message.classList.remove("success");
  message.classList.remove("error");
  message.querySelector(".message").innerHTML = "";
  //Cuando pasan 1500ms de la ultima escritura en el input se ejecuta
  timeout = setTimeout(async () => {
    const employeeCode = employeeInput.value.trim();

    if (!employeeCode) {
      return;
    }

    try {
      const response = await fetch(urlWorkers + `${employeeCode}`);

      if (!response.ok) {
        message.classList.remove("success");
        message.classList.add('error');
        message.querySelector(".message").innerHTML = "Trabajador no encontrado";
        return;
      }

      const data = await response.json();
      

      worker = data.worker;
      nextAction = data.nextAction;

    //   clockButton.textContent = nextAction === "Clock-In" ? "Fichar entrada" : "Fichar salida";

      clockButton.disabled = false;
      if (data.lastLog) {
        const date = new Date(data.lastLog.datetime);

        const formattedDate = date.toLocaleString("es-ES", {
          dateStyle: "short",
          timeStyle: "short",
        });
        const actionText =
          data.lastLog.type === "Clock-In" ? "Entrada" : "Salida";

        message.classList.remove("error");
        message.classList.add("success");
        message.querySelector(".message").innerHTML = `Última ${actionText} - ${formattedDate}`;
      } else {
        message.classList.remove("success");
        message.classList.add("error");
        message.querySelector(".message").innerHTML = "No tiene entradas o salidas anteriores";
      }
    } catch (error) {
        console.error(error);
        message.classList.remove("success");
        message.classList.add("error");
        message.querySelector(".message").innerHTML = "Error al consultar el trabajador";
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
    employeeInput.value = "";
    message.classList.remove("success");
    message.classList.add('success');
    message.querySelector(".message").innerHTML = ` ${actionText} registrada.`;

    clockButton.disabled = true;
  } catch (error) {
    console.error(error);
    employeeInput.value = "";
    message.classList.remove("success");
    message.classList.add("error");
    message.querySelector(".message").innerHTML = "No se ha podido registrar la entrada";
  }
});
