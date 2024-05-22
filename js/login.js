const validarUsuario = document.querySelector('#validarLogin');

validarUsuario.addEventListener('submit', validarLogin);

const usuarios = JSON.parse(localStorage.getItem('registrados'));

function validarLogin(e) {
	e.preventDefault();

	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;

	//validaciones
	//checkear que los campos no esten vacios, que sea un email valido

	const comprobandoEmail = usuarios.find(function (usuario) {
		return email === usuario.email;
	});

	if(email === "" || password === ""){
		return mostrarError('Todos los campos son obligatorios')
	}

	if (comprobandoEmail !== undefined) {
		if (comprobandoEmail.password === password) {
			window.location.href = "/pages/turnoasignados.html";
		} else {
			return mostrarError('El email o la contraseña son incorrectas')

		}
	} else {
		return mostrarError('El email o la contraseña son incorrectas')
	}

	
}

function mostrarError(mensaje) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: mensaje,
	});
}
