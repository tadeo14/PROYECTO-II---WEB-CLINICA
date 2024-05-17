const validarMedico = document.querySelector('#validarLogin');
validarMedico.addEventListener('submit', validarLogin);

const usuarios = JSON.parse(localStorage.getItem('medicosRegistrados'));

function validarLogin(e){
  //Prevenimos que la pagina se autorecargue
  e.preventDefault()
  //Traemos los datos de los inputs del HTML
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  //Validaciones
  const comprobandoEmail = usuarios.find(function (usuario) {
		return email === usuario.email;
	});

	if (comprobandoEmail !== undefined) {
		if (comprobandoEmail.password === password) {
			return mostrarOk('Login correcto!')
		} else {
			return mostrarError('El correo o la contraseña es incorrecta');
		}
	} else {
		return mostrarError('El correo o la contraseña es incorrecta');
	}

}


function mostrarError(mensaje) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: mensaje,
	});
}

function mostrarOk(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Inicio de sesión exitoso',
    showConfirmButton: false,
    timer: 1500,
  })
}
