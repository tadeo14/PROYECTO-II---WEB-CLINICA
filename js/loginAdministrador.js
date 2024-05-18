document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Aquí puedes agregar tu lógica de validación del usuario y contraseña
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Ejemplo de validación simple
    if (username === "usuario" && password === "usuario") {
      // Usuario y contraseña válidos, redirige a la página principal
      window.location.href =
        "/PROYECTO-II---WEB-CLINICA/pages/administrador.html";
    } else {
      // Usuario o contraseña incorrectos, muestra un mensaje de error
      alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
  });
