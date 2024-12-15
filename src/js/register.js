
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de Supabase
const SUPABASE_URL = 'https://scklqyvjkvrhwomxnjwl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNja2xxeXZqa3ZyaHdvbXhuandsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTM2OTQsImV4cCI6MjA0OTc4OTY5NH0.YIGhkfe0-GYuAHyvbdAAdwoycq7383-dS97LXzTaNOM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function hashPassword(clave) {
    const encoder = new TextEncoder();
    const data = encoder.encode(clave);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Función para manejar el registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita recargar la página
   

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

    // Contenedor para mostrar mensajes de estado
    const statusDiv = document.getElementById('register-status');
    statusDiv.textContent = ''; // Limpiar mensajes anteriores

    try {
        // Hashear la contraseña
        const hashedPassword = await hashPassword(clave);

        // Insertar datos en la tabla 'usuarios' de Supabase
        const { data, error } = await supabase.from('usuarios').insert([
            {
                nombre,
                apellido,
                email: correo,
                usuario,
                password_hash: hashedPassword
            }
        ]);

        if (error) {
            // Mostrar mensaje de error en el contenedor
            statusDiv.textContent = 'Error al registrar el usuario. Por favor, inténtalo nuevamente.';
            statusDiv.className = 'status-message error';
           
        } else {
            // Mostrar mensaje de éxito en el contenedor
            statusDiv.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
            statusDiv.className = 'status-message success';
           

            // Limpiar el formulario
            //document.getElementById('register-form').reset();
        }
    } catch (err) {
        // Mostrar mensaje de error inesperado
        statusDiv.textContent = 'Ocurrió un error inesperado. Por favor, inténtalo más tarde.';
        statusDiv.className = 'status-message error';
        
    }
});
