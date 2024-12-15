import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Configuración de Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// Hashear la contraseña antes de enviarla a Supabase
async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
}
// Función para manejar el registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página

     // Obtener los valores del formulario
     const nombre = document.getElementById('nombre').value;
     const apellido = document.getElementById('apellido').value;
     const correo = document.getElementById('correo').value;
     const usuario = document.getElementById('usuario').value;
     const clave = document.getElementById('clave').value;
 
     // Referencia al contenedor de estado
     const statusDiv = document.getElementById('register-status');
 
     try {
         // Insertar datos en Supabase
         const { error } = await supabase.from('usuarios').insert([
             {
                 nombre,
                 apellido,
                 email: correo,
                 usuario,
                 password_hash: clave // Cambiar por hash si lo usas
             }
         ]);
 
         if (error) {
             // Mostrar mensaje de error
             statusDiv.textContent = 'Hubo un error al registrar el usuario. Por favor, inténtalo nuevamente.';
             statusDiv.className = 'status-message error';
             console.error('Error en el registro:', error);
         } else {
             // Mostrar mensaje de éxito
             statusDiv.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
             statusDiv.className = 'status-message success';
 
             // Limpiar el formulario
             document.getElementById('register-form').reset();
 
             // Redirigir al inicio después de 3 segundos (opcional)
             setTimeout(() => {
                 window.location.href = 'index.html';
             }, 3000);
         }
     } catch (err) {
         // Mostrar mensaje de error inesperado
         statusDiv.textContent = 'Ocurrió un error inesperado. Por favor, intenta más tarde.';
         statusDiv.className = 'status-message error';
         console.error('Error inesperado:', err);
     }
});
