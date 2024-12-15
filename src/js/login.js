import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de Supabase
const SUPABASE_URL = 'https://scklqyvjkvrhwomxnjwl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNja2xxeXZqa3ZyaHdvbXhuandsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTM2OTQsImV4cCI6MjA0OTc4OTY5NH0.YIGhkfe0-GYuAHyvbdAAdwoycq7383-dS97LXzTaNOM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para hashear la contraseña ingresada
async function hashPassword(clave) {
    const encoder = new TextEncoder();
    const data = encoder.encode(clave);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuarioIngresado = document.getElementById('login-usuario').value;
    const clave = document.getElementById('login-clave').value;
    const loginStatusDiv = document.getElementById('login-status');

    try {
        // Generar el hash de la contraseña ingresada
        const hashedPassword = await hashPassword(clave);
        console.log(`Usuario ingresado: "${usuarioIngresado}"`);
        console.log(`Hash generado desde el formulario: "${hashedPassword}"`);

        // Buscar en la base de datos
        const { data, error } = await supabase
            .from('usuarios')
            .select('username, password_hash, nombre, apellido') // Selecciona solo las columnas necesarias
            .eq('username', usuarioIngresado);

            // Guarda los valores de la consulta en variables
        const userFromDB = data[0].username;
        const hashFromDB = data[0].password_hash;
        console.log(`Usuario Extraido: "${userFromDB}"`);
        console.log(`Hash Extraido: "${hashFromDB}"`);

        console.log('Datos obtenidos desde la base de datos:', data);

        if (error) {
            console.error('Error de Supabase:', error);
            loginStatusDiv.textContent = '❌ Error al consultar la base de datos.';
            loginStatusDiv.className = 'status-message error';
            return;
        }

        if (data.length === 0) {
            loginStatusDiv.textContent = '❌ Usuario o contraseña incorrectos.';
            loginStatusDiv.className = 'status-message error';
        } else {
            // Imprime el hash y el usuario recuperado desde la base de datos
            console.log(`Usuario desde la base de datos: "${data[0].username}"`);
            console.log(`Hash desde la base de datos: "${data[0].password_hash}"`);

            // Comparar hashes
            if (data[0].password_hash === hashedPassword) {
                 // Guardar el nombre y apellido del usuario en localStorage
                localStorage.setItem('usuarioNombre', data[0].nombre);
                localStorage.setItem('usuarioApellido', data[0].apellido);

                loginStatusDiv.textContent = '✅ Inicio de sesión exitoso. Redirigiendo...';
                loginStatusDiv.className = 'status-message success';

                // Redirigir a la página principal
                setTimeout(() => {
                    window.location.href = 'indexD.html';
                }, 2000);
            } else {
                loginStatusDiv.textContent = '❌ Usuario o contraseña incorrectos.';
                loginStatusDiv.className = 'status-message error';
            }
        }
    } catch (err) {
        loginStatusDiv.textContent = '❌ Error inesperado. Por favor, inténtalo más tarde.';
        loginStatusDiv.className = 'status-message error';
        console.error('Error inesperado:', err);
    }
});
