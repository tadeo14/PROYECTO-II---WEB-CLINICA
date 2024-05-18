function solicitarTurno(medico) {
  localStorage.setItem("selectedMedico", medico);
  window.location.href = "/PROYECTO-II---WEB-CLINICA/pages/turnos.html";
}
