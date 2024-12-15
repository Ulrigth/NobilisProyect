import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://scklqyvjkvrhwomxnjwl.supabase.c';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNja2xxeXZqa3ZyaHdvbXhuandsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTM2OTQsImV4cCI6MjA0OTc4OTY5NH0.YIGhkfe0-GYuAHyvbdAAdwoycq7383-dS97LXzTaNOM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para cargar las últimas 10 fotos
async function cargarUltimasFotos() {
    const { data, error } = await supabase
        .from('fotos')
        .select('url_imagen')
        .order('fecha_subida', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error al cargar las fotos:', error);
        return;
    }

    mostrarFotosEnSlider(data);
}

// Mostrar las fotos en el slider
function mostrarFotosEnSlider(fotos) {
    const sliderContainer = document.querySelector('.slider-container');
    fotos.forEach((foto) => {
        const img = document.createElement('img');
        img.src = foto.url_imagen;
        img.alt = 'Fotografía';
        sliderContainer.appendChild(img);
    });

    iniciarSlider();
}

// Iniciar el slider
function iniciarSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    let index = 0;

    setInterval(() => {
        index += 5; // Mueve 5 imágenes a la izquierda
        if (index >= sliderContainer.children.length) {
            index = 0; // Reinicia si llega al final
        }

        sliderContainer.style.transform = `translateX(-${index * 20}%)`;
    }, 5000); // Cambia cada 5 segundos
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    cargarUltimasFotos();
});
