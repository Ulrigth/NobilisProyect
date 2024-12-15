import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de Supabase
const SUPABASE_URL = 'https://scklqyvjkvrhwomxnjwl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNja2xxeXZqa3ZyaHdvbXhuandsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTM2OTQsImV4cCI6MjA0OTc4OTY5NH0.YIGhkfe0-GYuAHyvbdAAdwoycq7383-dS97LXzTaNOM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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


const imageContainer = document.getElementById('image-container');

// Función para cargar imágenes desde Supabase
async function fetchImages() {
    try {
        // Consulta para obtener las últimas 10 imágenes ordenadas por ID (ajusta el campo si es necesario)
        const { data, error } = await supabase
            .from('imagenes') // Nombre de la tabla
            .select('url') // Columna donde están las URLs
            .order('id', { ascending: false }) // Orden descendente por ID
            .limit(10); // Obtener solo las últimas 10 imágenes

        if (error) {
            console.error('Error al obtener imágenes:', error);
            return;
        }

        displayImages(data);
    } catch (err) {
        console.error('Error inesperado:', err);
    }
}

// Función para mostrar imágenes
function displayImages(images) {
    let currentIndex = 0;

    function renderNextBatch() {
        imageContainer.innerHTML = '';

        const nextImages = images.slice(currentIndex, currentIndex + 5);
        nextImages.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.url; // Asegúrate de que la ruta sea válida
            imgElement.alt = 'Imagen';
            imageContainer.appendChild(imgElement);
        });

        currentIndex = (currentIndex + 5) % images.length;
    }

    renderNextBatch();
    setInterval(renderNextBatch, 5000);
}

// Iniciar la carga de imágenes
fetchImages();
