function solicitarTurno(medico) {
  localStorage.setItem("selectedMedico", medico);
  window.location.href = "/pages/turnos.html";
}
