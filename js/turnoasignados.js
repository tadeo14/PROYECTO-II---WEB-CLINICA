const turnosAsignadosContainer = document.getElementById(
  "turnosAsignadosContainer"
);

// Obtener las consultas del localStorage
const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

// Mostrar las consultas en la página
consultas.forEach(function (consulta) {
  const turnoAsignado = document.createElement("div");
  turnoAsignado.innerHTML = `<div class="row-md-4">
    
                                      <div class="card">
                                      
                                      <div class="card-body">
                                              <h5 class="card-title">Médico: ${consulta.medico}</h5>
                                              <p class="card-text">Turno: ${consulta.turno}</p>
                                              <p class="card-text">Motivo: ${consulta.motivo}</p>
                                          
                                              </div>
                                      </div>
                                  </div>`;
  turnosAsignadosContainer.appendChild(turnoAsignado);
});
