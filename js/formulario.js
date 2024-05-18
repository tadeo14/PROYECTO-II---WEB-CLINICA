const consultaForm = document.getElementById("consultaForm");

consultaForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const motivo = document.getElementById("motivo").value;
  const medico = localStorage.getItem("selectedMedico");
  const turno = localStorage.getItem("selectedTurno");

  // Obtener consultas anteriores del localStorage o inicializar un array vacío
  const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

  // Agregar la nueva consulta al array
  consultas.push({
    medico: medico,
    turno: turno,

    motivo: motivo,
  });

  // Guardar el array de consultas actualizado en el localStorage
  localStorage.setItem("consultas", JSON.stringify(consultas));

  // Limpiar datos del localStorage
  localStorage.removeItem("selectedMedico");
  localStorage.removeItem("selectedTurno");

  alert(
    `Consulta solicitada con éxito.\nMédico: ${medico}\nTurno: ${turno}\nMotivo: ${motivo}`
  );

  // Redirigir a la página principal
  window.location.href = "/PROYECTO-II---WEB-CLINICA/pages/solicitarTurno.html";
});
