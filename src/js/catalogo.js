// Array de temas
const temas = [
    {
        nombre: "Anime",
        imagen: "https://via.placeholder.com/200x150?text=Anime",
        enlace: "anime.html"
    },
    {
        nombre: "Música",
        imagen: "https://via.placeholder.com/200x150?text=Música",
        enlace: "musica.html"
    },
    {
        nombre: "Series",
        imagen: "https://via.placeholder.com/200x150?text=Series",
        enlace: "series.html"
    },
    {
        nombre: "Películas",
        imagen: "https://via.placeholder.com/200x150?text=Películas",
        enlace: "peliculas.html"
    }
];

// Seleccionar el contenedor de temas
const temasContainer = document.querySelector('.temas-container');

// Función para mostrar los temas
function cargarTemas() {
    temas.forEach(tema => {
        // Crear un contenedor para cada tema
        const temaDiv = document.createElement('div');
        temaDiv.className = 'tema';

        // Agregar imagen del tema
        const img = document.createElement('img');
        img.src = tema.imagen;
        img.alt = tema.nombre;

        // Agregar título del tema
        const titulo = document.createElement('h3');
        titulo.textContent = tema.nombre;

        // Redirigir al hacer clic en el tema
        temaDiv.addEventListener('click', () => {
            window.location.href = tema.enlace;
        });

        // Agregar elementos al contenedor del tema
        temaDiv.appendChild(img);
        temaDiv.appendChild(titulo);

        // Agregar el tema al contenedor principal
        temasContainer.appendChild(temaDiv);
    });
}

// Cargar los temas al cargar la página
cargarTemas();
