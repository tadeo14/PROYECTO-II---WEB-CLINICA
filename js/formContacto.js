const handleEnviar = document.querySelector('#handleEnviar');

handleEnviar.addEventListener('click', addUser);

function addUser() {

    const nombreApellido = document.querySelector('#nombreApellido').value;
    console.log(nombreApellido);
}

