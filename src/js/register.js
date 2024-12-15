import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Configuración de Supabase
const SUPABASE_URL = 'https://scklqyvjkvrhwomxnjwl.supabase.c';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNja2xxeXZqa3ZyaHdvbXhuandsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTM2OTQsImV4cCI6MjA0OTc4OTY5NH0.YIGhkfe0-GYuAHyvbdAAdwoycq7383-dS97LXzTaNOM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para escribir logs en un archivo TXT
async function escribirLog(mensaje) {
    try {
        const log = `[${new Date().toISOString()}] ${mensaje}\n`;
        const blob = new Blob([log], { type: 'text/plain' });

        // Crear un enlace para descargar el log en caso de ser necesario
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'registro-log.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log(mensaje); // También mostrar el mensaje en la consola
    } catch (error) {
        console.error('Error al escribir el log:', error);
    }
}

// Hashear la contraseña antes de enviarla a Supabase
async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
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
    const hashedPassword = await hashPassword(clave);

    // Registrar el inicio del proceso en los logs
    await escribirLog(`Inicio del registro para: ${correo}`);

    try {
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
            // Registrar el error en los logs
            await escribirLog(`Error al registrar el usuario (${correo}): ${error.message}`);
            console.error('Error en el registro:', error);
            alert('Hubo un error al registrar el usuario. Por favor, inténtalo nuevamente.');
        } else {
            // Registrar el éxito en los logs
            await escribirLog(`Usuario registrado exitosamente (${correo}): ${JSON.stringify(data)}`);
            console.log('Registro exitoso:', data);
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            document.getElementById('register-form').reset(); // Limpiar formulario
        }
    } catch (err) {
        // Registrar errores inesperados en los logs
        await escribirLog(`Error inesperado durante el registro (${correo}): ${err.message}`);
        console.error('Error inesperado:', err);
        alert('Ocurrió un error inesperado. Por favor, inténtalo más tarde.');
    }
});
