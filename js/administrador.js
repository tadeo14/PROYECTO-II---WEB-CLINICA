// Variables para almacenar médicos, pacientes y usuarios
let medicos = [];
let pacientes = [];
let usuarios = [];

// Función para cargar datos al inicio
function cargarDatos() {
  // Cargar médicos, pacientes y usuarios desde localStorage si existen
  const medicosGuardados = JSON.parse(
    localStorage.getItem("medicosRegistrados")
  );
  const pacientesGuardados = JSON.parse(
    localStorage.getItem("pacientesRegistrados")
  );
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
  if (medicosGuardados) {
    medicos = medicosGuardados;
    mostrarMedicos();
  }
  if (pacientesGuardados) {
    pacientes = pacientesGuardados;
    mostrarPacientes();
  }
  if (usuariosGuardados) {
    usuarios = usuariosGuardados;
    mostrarUsuarios();
  }
}

// Función para mostrar médicos en la tabla
function mostrarMedicos() {
  const tablaMedicos = document.getElementById("medicos-lista");
  tablaMedicos.innerHTML = "";
  medicos.forEach((medico, index) => {
    const fila = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${medico.nombre}</td>
                    <td>${medico.apellido}</td>
                    <td>${medico.dni}</td>
                    <td>${medico.correo}</td>
                    <td>${medico.telefono}</td>
                    <td>${medico.direccion}</td>
                    <td>${medico.matricula}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" onclick="editarMedico(${index})" data-toggle="modal" data-target="#editarMedicoModal">Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarMedico(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
    tablaMedicos.innerHTML += fila;
  });
}

// Función para agregar un médico
function agregarMedico(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombreMedico").value;
  const apellido = document.getElementById("apellidoMedico").value;
  const dni = document.getElementById("dniMedico").value;
  const correo = document.getElementById("correoMedico").value;
  const telefono = document.getElementById("telefonoMedico").value;
  const direccion = document.getElementById("direccionMedico").value;
  const matricula = document.getElementById("matriculaMedico").value;
  const nuevoMedico = {
    nombre,
    apellido,
    dni,
    correo,
    telefono,
    direccion,
    matricula,
  };
  medicos.push(nuevoMedico);
  localStorage.setItem("medicosRegistrados", JSON.stringify(medicos));
  mostrarMedicos();
  document.getElementById("agregarMedicoForm").reset();
  $("#agregarMedicoModal").modal("hide");
}

// Función para encontrar un médico por su índice
function encontrarMedicoPorIndice(index) {
  return medicos[index];
}

// Función para eliminar un médico
function eliminarMedico(index) {
  medicos.splice(index, 1);
  localStorage.setItem("medicosRegistrados", JSON.stringify(medicos));
  mostrarMedicos();
}

// Función para editar un médico
function editarMedico(index) {
  const medico = encontrarMedicoPorIndice(index);
  document.getElementById("editarNombreMedico").value = medico.nombre;
  document.getElementById("editarApellidoMedico").value = medico.apellido;
  document.getElementById("editarDniMedico").value = medico.dni;
  document.getElementById("editarCorreoMedico").value = medico.correo;
  document.getElementById("editarTelefonoMedico").value = medico.telefono;
  document.getElementById("editarDireccionMedico").value = medico.direccion;
  document.getElementById("editarMatriculaMedico").value = medico.matricula;

  $("#editarMedicoForm")
    .off()
    .submit(function (event) {
      event.preventDefault();
      medico.nombre = document.getElementById("editarNombreMedico").value;
      medico.apellido = document.getElementById("editarApellidoMedico").value;
      medico.dni = document.getElementById("editarDniMedico").value;
      medico.correo = document.getElementById("editarCorreoMedico").value;
      medico.telefono = document.getElementById("editarTelefonoMedico").value;
      medico.direccion = document.getElementById("editarDireccionMedico").value;
      medico.matricula = document.getElementById("editarMatriculaMedico").value;
      localStorage.setItem("medicosRegistrados", JSON.stringify(medicos));
      mostrarMedicos();
      $("#editarMedicoModal").modal("hide");
    });
}

// Función para mostrar pacientes en la tabla
function mostrarPacientes() {
  const tablaPacientes = document.getElementById("pacientes-lista");
  tablaPacientes.innerHTML = "";
  pacientes.forEach((paciente, index) => {
    const fila = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellido}</td>
                    <td>${paciente.dni}</td>
                    <td>${paciente.correo}</td>
                    <td>${paciente.direccion}</td>
                    <td>${paciente.telefono}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" onclick="editarPaciente(${index})" data-toggle="modal" data-target="#editarPacienteModal">Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarPaciente(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
    tablaPacientes.innerHTML += fila;
  });
}

// Función para agregar un paciente
function agregarPaciente(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombrePaciente").value;
  const apellido = document.getElementById("apellidoPaciente").value;
  const dni = document.getElementById("dniPaciente").value;
  const correo = document.getElementById("correoPaciente").value;
  const direccion = document.getElementById("direccionPaciente").value;
  const telefono = document.getElementById("telefonoPaciente").value;
  const nuevoPaciente = {
    nombre,
    apellido,
    dni,
    correo,
    direccion,
    telefono,
  };
  pacientes.push(nuevoPaciente);
  localStorage.setItem("pacientesRegistrados", JSON.stringify(pacientes));
  mostrarPacientes();
  document.getElementById("agregarPacienteForm").reset();
  $("#agregarPacienteModal").modal("hide");
}

// Función para encontrar un paciente por su índice
function encontrarPacientePorIndice(index) {
  return pacientes[index];
}

// Función para eliminar un paciente
function eliminarPaciente(index) {
  pacientes.splice(index, 1);
  localStorage.setItem("pacientesRegistrados", JSON.stringify(pacientes));
  mostrarPacientes();
}

// Función para editar un paciente
function editarPaciente(index) {
  const paciente = encontrarPacientePorIndice(index);
  document.getElementById("editarNombrePaciente").value = paciente.nombre;
  document.getElementById("editarApellidoPaciente").value = paciente.apellido;
  document.getElementById("editarDniPaciente").value = paciente.dni;
  document.getElementById("editarCorreoPaciente").value = paciente.correo;
  document.getElementById("editarDireccionPaciente").value = paciente.direccion;
  document.getElementById("editarTelefonoPaciente").value = paciente.telefono;

  $("#editarPacienteForm")
    .off()
    .submit(function (event) {
      event.preventDefault();
      paciente.nombre = document.getElementById("editarNombrePaciente").value;
      paciente.apellido = document.getElementById(
        "editarApellidoPaciente"
      ).value;
      paciente.dni = document.getElementById("editarDniPaciente").value;
      paciente.correo = document.getElementById("editarCorreoPaciente").value;
      paciente.direccion = document.getElementById(
        "editarDireccionPaciente"
      ).value;
      paciente.telefono = document.getElementById(
        "editarTelefonoPaciente"
      ).value;
      localStorage.setItem("pacientesRegistrados", JSON.stringify(pacientes));
      mostrarPacientes();
      $("#editarPacienteModal").modal("hide");
    });
}

// Función para mostrar usuarios en la tabla
function mostrarUsuarios() {
  const tablaUsuarios = document.getElementById("usuarios-lista");
  tablaUsuarios.innerHTML = "";
  usuarios.forEach((usuario, index) => {
    const fila = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.contraseña}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" onclick="editarUsuario(${index})" data-toggle="modal" data-target="#editarUsuarioModal">Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
    tablaUsuarios.innerHTML += fila;
  });
}

// Función para agregar un usuario
function agregarUsuario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombreUsuario").value;
  const apellido = document.getElementById("apellidoUsuario").value;
  const correo = document.getElementById("correoUsuario").value;
  const contraseña = document.getElementById("contraseñaUsuario").value;
  const rol = document.getElementById("rolUsuario").value;
  const nuevoUsuario = { nombre, apellido, correo, contraseña, rol };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
  document.getElementById("agregarUsuarioForm").reset();
  $("#agregarUsuarioModal").modal("hide");
}

// Función para encontrar un usuario por su índice
function encontrarUsuarioPorIndice(index) {
  return usuarios[index];
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
}

// Función para editar un usuario
function editarUsuario(index) {
  const usuario = encontrarUsuarioPorIndice(index);
  document.getElementById("editarNombreUsuario").value = usuario.nombre;
  document.getElementById("editarApellidoUsuario").value = usuario.apellido;
  document.getElementById("editarCorreoUsuario").value = usuario.correo;
  document.getElementById("editarContraseñaUsuario").value = usuario.contraseña;
  document.getElementById("editarRolUsuario").value = usuario.rol;

  $("#editarUsuarioForm")
    .off()
    .submit(function (event) {
      event.preventDefault();
      usuario.nombre = document.getElementById("editarNombreUsuario").value;
      usuario.apellido = document.getElementById("editarApellidoUsuario").value;
      usuario.correo = document.getElementById("editarCorreoUsuario").value;
      usuario.contraseña = document.getElementById(
        "editarContraseñaUsuario"
      ).value;
      usuario.rol = document.getElementById("editarRolUsuario").value;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
      $("#editarUsuarioModal").modal("hide");
    });
}

// Cargar datos al inicio
cargarDatos();

// Agregar eventos para enviar formularios
document
  .getElementById("agregarMedicoForm")
  .addEventListener("submit", agregarMedico);
document
  .getElementById("agregarPacienteForm")
  .addEventListener("submit", agregarPaciente);
document
  .getElementById("agregarUsuarioForm")
  .addEventListener("submit", agregarUsuario);
