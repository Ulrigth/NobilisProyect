// Recuperar el nombre y apellido del usuario desde localStorage
const nombreUsuario = localStorage.getItem('usuarioNombre');
const apellidoUsuario = localStorage.getItem('usuarioApellido');

// Seleccionar el contenedor donde se mostrará el nombre del usuario
const userInfoLi = document.getElementById('user-info');

// Verificar si hay datos del usuario almacenados
if (nombreUsuario && apellidoUsuario) {
    userInfoLi.textContent = `Hola, ${nombreUsuario} ${apellidoUsuario}`;
} else {
    userInfoLi.textContent = ''; // Si no hay datos, dejar el espacio vacío
}
