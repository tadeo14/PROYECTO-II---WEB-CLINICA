function solicitarTurno(medico) {
  localStorage.setItem("selectedMedico", medico);
  window.location.href = "turnos.html";
}
