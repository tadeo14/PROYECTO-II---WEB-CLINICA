const handleEnviar = document.querySelector('#handleEnviar');

handleEnviar.addEventListener('click', addUser);

const nombres = [];

function addUser() {

    const nombreApellido = document.querySelector('#nombreApellido').value;
    nombres.push(nombreApellido);
    localStorage.setItem('nombres', JSON.stringify(nombres));
}

