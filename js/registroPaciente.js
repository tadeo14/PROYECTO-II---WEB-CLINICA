const validarRegistro = document.querySelector('#validarRegistro');
validarRegistro.addEventListener('submit', validarUsuario);

//Obtenemos los usuarios registrados del LocalStorage
const pacientesRegistrados = JSON.parse(localStorage.getItem('pacientesRegistrados')) || [];

//Creamos la clase Usuario 
class Usuario {
  constructor(dni,nombre,email,celular,password) {
    this.dni = dni;
    this.nombre = nombre;
    this.email = email;
    this.celular = celular;
    this.password = password; 
  }
}



function validarUsuario(e){
  e.preventDefault();
  // Obtenemos los datos de los inputs
  const id = Date.now();
  const dni = document.querySelector('#dni').value;
	const nombre = document.querySelector('#nombre').value;
	const email = document.querySelector('#email').value;
  const celular = document.querySelector('#celular').value;
	const password = document.querySelector('#password').value;
	const confirmPassword = document.querySelector('#confirmPassword').value;
  

  //Creamos las variables de validacion para el email
  const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const resultadoValidacion = validarEmail.test(email);

  //Hacemos las validaciones de que todos los campos esten completos
  if(!resultadoValidacion){
    return mostrarError('El email no es valido');
  }
  else if(dni === ''){
    return mostrarError('El DNI es obligatorio');
  }
  else if(nombre === ''){
    return mostrarError('El nombre es obligatorio');
  }
  else if(celular === ''){
    return mostrarError('El celular es obligatorio');
  }
  else if(password === ''){
    return mostrarError('La contraseña es obligatoria');
  }
  else if(confirmPassword === ''){
    return mostrarError('La confirmacion es obligatoria');
  }

//Validamos si el correo no esta ya en la lista
const comprobandoEmail = pacientesRegistrados.find(function(usuario){
  return email === usuario.email;
});

//Verificamos si el correo ya existe
if(comprobandoEmail !== undefined){
  return mostrarError('El correo ya existe');
}

//Verificamos que las contraseñas coincidan
if(password !== confirmPassword){
  return mostrarError("Las contraseñas no coinciden.");
}

//Creamos el objeto para los usuarios
const nuevoUsuario = new Usuario (dni,nombre,email,celular,password);
//Agregamos el nuevo usuario registrado al array
pacientesRegistrados.push(nuevoUsuario);

localStorage.setItem('pacientesRegistrados', JSON.stringify(pacientesRegistrados));


Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Usuario registrado correctamente',
  showConfirmButton: false,
  timer: 1500,
})

}

function mostrarError(mensaje) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: mensaje,
	});
}

