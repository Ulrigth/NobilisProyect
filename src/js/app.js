import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://tu-url.supabase.co'; // Reemplaza con tu URL
const SUPABASE_KEY = 'tu-clave-publica'; // Reemplaza con tu clave pública
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Cargar fotos desde Supabase
async function cargarFotos() {
    const { data, error } = await supabase.from('fotos').select('*');
    if (error) {
        console.error('Error al cargar fotos:', error);
        return;
    }
    mostrarFotos(data);
}

// Mostrar fotos en la galería
function mostrarFotos(fotos) {
    const galeria = document.querySelector('.grid');
    galeria.innerHTML = '';
    fotos.forEach(foto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${foto.url_imagen}" alt="${foto.titulo}" style="width:100%">
            <h3>${foto.titulo}</h3>
            <p>Precio: €${foto.precio}</p>
            <button onclick="agregarAlCarrito(${foto.id})">Añadir al carrito</button>
        `;
        galeria.appendChild(div);
    });
}

// Inicializar la app
cargarFotos();
