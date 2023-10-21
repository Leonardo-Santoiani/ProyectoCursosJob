// Obtiene la URL actual
const currentURL = window.location.href;

// Obtiene todos los elementos del menú
const menuItems = document.querySelectorAll(".nav_items a");

// Recorre los elementos del menú y verifica si la URL coincide con el enlace
menuItems.forEach((item) => {
    if (item.href === currentURL) {
        item.classList.add("active"); // Agrega la clase "active" al elemento actual
    }
});