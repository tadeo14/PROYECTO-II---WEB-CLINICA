const validarPaciente = document.querySelector("#validarLogin");
validarPaciente.addEventListener("submit", validarLogin);

const usuarios = JSON.parse(localStorage.getItem("pacientesRegistrados"));

function validarLogin(e) {
  //Prevenimos que la pagina se autorecargue
  e.preventDefault();
  //Traemos los datos de los inputs del HTML
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Validamos si algun campo esta vacio
  if (email === "") {
    return mostrarError("Debe completar todos los campos");
  } else if (password === "") {
    return mostrarError("Debe completar todos los campos");
  }

  //Validaciones
  const comprobandoEmail = usuarios.find(function (usuario) {
    return email === usuario.email;
  });

  if (comprobandoEmail !== undefined) {
    if (comprobandoEmail.password === password) {
      mostrarMensajePositivo("Login correcto!");
      window.location.href =
        "/PROYECTO-II---WEB-CLINICA/pages/pacienteLogueadoTurno.html";
      //return mostrarMensajePositivo("Login correcto!");
    } else {
      return mostrarError("El correo o la contraseña es incorrecta");
    }
  } else {
    return mostrarError("El correo o la contraseña es incorrecta");
  }
}

function mostrarError(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
  });
}

function mostrarMensajePositivo() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Inicio de sesión exitoso",
    showConfirmButton: false,
    timer: 1500,
  });
}
