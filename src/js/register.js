import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://tu-url.supabase.co'; // Reemplaza con tu URL
const SUPABASE_KEY = 'tu-clave-anon-publica'; // Reemplaza con tu clave pública
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para manejar el registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

    // Registrar al usuario en Supabase
    const { error } = await supabase.auth.signUp({
        email: correo,
        password: clave,
        options: {
            data: {
                nombre,
                apellido,
                usuario
            }
        }
    });

    if (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema al registrar el usuario. Intenta nuevamente.');
    } else {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'index.html'; // Redirigir al inicio
    }
});
