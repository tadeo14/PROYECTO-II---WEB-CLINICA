document.addEventListener("DOMContentLoaded", function () {
  const medicos = [
    {
      id: 1,
      nombre: "Dr. Carrizo, Diego",
      // imagen: "/PROYECTO-II---WEB-CLINICA/img/Carrizo-Diego.png",
    },
    {
      id: 2,
      nombre: "Dr. Cerasuolo, Pedro",
    },
    {
      id: 3,
      nombre: "Dr. Garcia, Pablo",
    },
    {
      id: 4,
      nombre: "Dr. Guzman, Nicolas",
    },
    {
      id: 5,
      nombre: "Dr. Landa, Fabian",
    },
    {
      id: 6,
      nombre: "Dr. Ortega, Enrique",
    },
    {
      id: 7,
      nombre: "Dr. Oñativia, Ignacio",
    },
    {
      id: 8,
      nombre: "Dr. Pacios, Jorge",
    },

    {
      id: 9,
      nombre: "Dr. Urpi, Joaquin",
    },
  ];

  const turnosDisponibles = generateTurnos();

  function generateTurnos() {
    let turnos = [];
    for (let i = 8; i < 13; i++) {
      turnos.push(`${i}:00`);
      turnos.push(`${i}:30`);
    }
    return turnos;
  }

  function cargarMedicos() {
    const medicosContainer = document.getElementById("medicos");
    medicosContainer.innerHTML = "";
    medicos.forEach((medico) => {
      const card = document.createElement("div");
      card.className = "col-md-4 card-medico";
      // <img src="${medico.imagen}" class="card-img-top" alt="${medico.nombre}">
      card.innerHTML = `
              <div class="card mb-4 shadow-sm">
                 
                  <div class="card-body">
                      <h5 class="card-title">${medico.nombre}</h5>
                      <button class="btn btn-primary seleccionar-medico" data-id="${medico.id}">Seleccionar</button>
                  </div>
              </div>
          `;
      medicosContainer.appendChild(card);
    });
  }

  function cargarTurnos(medicoId) {
    const turnosContainer = document.getElementById("turnos");
    turnosContainer.innerHTML = `<h3>Turnos Disponibles para el ${
      medicos.find((m) => m.id === medicoId).nombre
    }</h3>`;
    const turnosOcupados = JSON.parse(localStorage.getItem("turnos")) || [];
    const fechaSeleccionada =
      document.getElementById("fechaSeleccionada").value;

    if (!fechaSeleccionada) {
      alert("Por favor, seleccione una fecha para la consulta.");
      return;
    }

    turnosDisponibles.forEach((turno) => {
      const turnoEstaOcupado = turnosOcupados.some(
        (t) =>
          t.medicoId === medicoId &&
          t.turno === turno &&
          t.fecha === fechaSeleccionada
      );
      if (!turnoEstaOcupado) {
        const turnoElement = document.createElement("div");
        turnoElement.className = `turno-disponible m-2 p-2`;
        turnoElement.innerHTML = `
                  <button class="btn btn-block btn-outline-success seleccionar-turno" data-medico="${medicoId}" data-turno="${turno}">${turno}</button>
              `;
        turnosContainer.appendChild(turnoElement);
      }
    });
  }

  function mostrarModalConfirmacion(medicoId, turno) {
    const medico = medicos.find((m) => m.id === medicoId);
    document.getElementById("modalMedico").innerText = medico.nombre;
    document.getElementById("modalFecha").innerText =
      document.getElementById("fechaSeleccionada").value;
    document.getElementById("modalHora").innerText = turno;
    $("#confirmarTurnoModal").modal("show");
  }

  function guardarTurno(medicoId, turno) {
    const nombrePaciente = document.getElementById("nombrePaciente").value;
    const fechaSeleccionada =
      document.getElementById("fechaSeleccionada").value;
    const motivoConsulta = document.getElementById("motivoConsulta").value;

    if (!nombrePaciente) {
      alert("Por favor, ingrese su nombre.");
      return;
    }

    if (!fechaSeleccionada) {
      alert("Por favor, seleccione una fecha para la consulta.");
      return;
    }

    if (!motivoConsulta) {
      alert("Por favor, ingrese el motivo de la consulta.");
      return;
    }

    let turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || [];
    turnosGuardados.push({
      medicoId,
      turno,
      fecha: fechaSeleccionada,
      nombrePaciente,
      consulta: motivoConsulta,
    });
    localStorage.setItem("turnos", JSON.stringify(turnosGuardados));
    $("#confirmarTurnoModal").modal("hide");
    alert("Turno confirmado");
    cargarTurnos(medicoId);
    mostrarTurnosSolicitados(nombrePaciente);
  }

  function mostrarTurnosSolicitados(nombrePaciente) {
    const turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || [];
    const listaTurnos = document.getElementById("listaTurnos");
    listaTurnos.innerHTML = "";

    turnosGuardados
      .filter((turno) => turno.nombrePaciente === nombrePaciente)
      .forEach((turno) => {
        const medico = medicos.find((m) => m.id === turno.medicoId);
        const turnoElement = document.createElement("li");
        turnoElement.className = "list-group-item";
        turnoElement.innerHTML = `
              <strong>Medico:</strong> ${medico.nombre} <br>
              <strong>Paciente:</strong> ${turno.nombrePaciente} <br>
              <strong>Fecha:</strong> ${turno.fecha} <br>
              <strong>Hora:</strong> ${turno.turno} <br>
              <strong>Consulta:</strong> ${turno.consulta}
          `;
        listaTurnos.appendChild(turnoElement);
      });
  }

  cargarMedicos();

  document
    .getElementById("nombrePaciente")
    .addEventListener("change", function () {
      const nombrePaciente = this.value;
      mostrarTurnosSolicitados(nombrePaciente);
    });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("seleccionar-medico")) {
      const medicoId = parseInt(e.target.dataset.id);
      cargarTurnos(medicoId);
    }

    if (e.target.classList.contains("seleccionar-turno")) {
      const medicoId = parseInt(e.target.dataset.medico);
      const turno = e.target.dataset.turno;
      mostrarModalConfirmacion(medicoId, turno);
    }

    if (e.target.id === "confirmarTurno") {
      const medicoId = medicos.find(
        (m) => m.nombre === document.getElementById("modalMedico").innerText
      ).id;
      const turno = document.getElementById("modalHora").innerText;
      guardarTurno(medicoId, turno);
    }
  });
});
