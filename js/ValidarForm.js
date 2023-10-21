function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var numeroDeCelular = document.getElementById("numeroDeCelular").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;

    var regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var regexcelular = /^[0-9]+$/;

    if (nombre === "" || numeroDeCelular === "" || email === "") {
        alert("Por favor, rellene todos los campos");
        return false;
    } else if (!regexNombre.test(nombre)) {
        alert("Por favor, introduzca un nombre válido sin números ni signos");
        return false;
    } else if (!regexcelular.test(numeroDeCelular)) {
        alert("Por favor, introduzca solo números");
        return false;
    } else if (!regexEmail.test(email)) {
        alert("Por favor, introduzca un email válido con el siguiente formato example@gmail.com");
        return false;
    } else {
        alert("Gracias por enviar el formulario");
        return true;
    }
}
document.getElementById("miFormulario").addEventListener("submit", function(event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Llamar a la función de validación
    if (validarFormulario()) {
        // Si la validación es exitosa, puedes enviar el formulario aquí
        alert("Formulario enviado");
        // Aquí puedes agregar lógica adicional para enviar el formulario, si es necesario
    }
});