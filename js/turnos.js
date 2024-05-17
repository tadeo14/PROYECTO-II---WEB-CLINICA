const fechaSeleccionadaInput = document.getElementById("fechaSeleccionada");
const turnosContainer = document.getElementById("turnosContainer");

fechaSeleccionadaInput.addEventListener("change", cargarTurnos);

function cargarTurnos() {
  turnosContainer.innerHTML = "";
  const fechaSeleccionada = fechaSeleccionadaInput.value;
  const medicoSeleccionado = localStorage.getItem("selectedMedico");

  // Generar turnos disponibles para la fecha seleccionada

  const turnosDisponibles = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
  ];
  turnosDisponibles.forEach((turno) => {
    const turnoElement = document.createElement("div");
    turnoElement.innerHTML = `
            <div class="row-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${turno}</h5>
                        <button class="btn btn-primary" onclick="solicitarConsulta('${turno}')">Solicitar Consulta</button>
                    </div>
                </div>
            </div>`;
    turnosContainer.appendChild(turnoElement);
  });
}

function solicitarConsulta(turno) {
  localStorage.setItem("selectedTurno", turno);

  window.location.href = "/PROYECTO-II---WEB-CLINICA/pages/formulario.html";
}
