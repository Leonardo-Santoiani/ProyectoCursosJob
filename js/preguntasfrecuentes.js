const acordeonItems = document.querySelectorAll('.acordeon-item');

acordeonItems.forEach(item => {
    const boton = item.querySelector('.acordeon-boton');
    const contenido = item.querySelector('.acordeon-contenido');

    boton.addEventListener('click', () => {
        item.classList.toggle('activo');
        if (item.classList.contains('activo')) {
            contenido.style.maxHeight = contenido.scrollHeight + 'px';
            const container = document.querySelector('.container');
            container.style.width = 'auto'; 
        } else {
            contenido.style.maxHeight = '0';
            const container = document.querySelector('.container');
            container.style.width = 'auto'; 
        }
    });
});