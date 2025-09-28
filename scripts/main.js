import { initStarfield } from './stars.js';
import { getWeatherData, getLatestRoverPhotos, getRoverManifest, getRoverPhotosBySol } from './api.js';
import { 
    displayWeatherData, 
    displayLatestPhotos, 
    displayMissionManifest, 
    updateActiveRoverButton, 
    displayPhotoGallery,
    showLoader, // Nueva función para mostrar loader
    hideLoader, // Nueva función para ocultar loader
    showErrorMessage // Nueva función para mostrar mensajes de error
} from './ui.js';

// URLs de NASA Eyes (asegúrate de que los IDs del iframe en index.html sean correctos si los cambias)
const nasaEyesUrls = {
    'Perseverance': 'https://mars.nasa.gov/gltf_embed/24883',
    'General': 'https://eyes.nasa.gov/apps/solar-system/#/mars'
};

// Variable global para mantener el rover activo
let activeRover = 'Perseverance'; 

/**
 * Carga los datos del rover (manifiesto y galería de fotos).
 * @param {string} roverName - El nombre del rover.
 */
async function loadRoverData(roverName) {
    activeRover = roverName; // Actualizar el rover activo
    const manifestContainer = document.getElementById('mission-manifest');
    const galleryContainer = document.getElementById('photo-gallery');

    showLoader(manifestContainer); // Mostrar loader para el manifiesto
    showLoader(galleryContainer); // Mostrar loader para la galería

    try {
        const manifest = await getRoverManifest(roverName);
        if (manifest) {
            displayMissionManifest(manifest);
            // Cargar fotos para el último sol del manifiesto
            await loadPhotoGallery(roverName, manifest.max_sol);
        } else {
            showErrorMessage(manifestContainer, `No se pudo cargar el manifiesto para ${roverName}.`);
            // Limpiar galería si el manifiesto falla
            galleryContainer.innerHTML = ''; 
        }
    } catch (error) {
        console.error("Error al cargar datos del rover:", error);
        showErrorMessage(manifestContainer, `Error al cargar datos de ${roverName}.`);
        galleryContainer.innerHTML = '';
    } finally {
        hideLoader(manifestContainer); // Ocultar loader del manifiesto
        // El loader de la galería se oculta en loadPhotoGallery
    }
}

/**
 * Carga y muestra la galería de fotos para un sol específico.
 * @param {string} roverName - El nombre del rover.
 * @param {number} sol - El número de sol marciano.
 */
async function loadPhotoGallery(roverName, sol) {
    const galleryContainer = document.getElementById('photo-gallery');
    showLoader(galleryContainer); // Asegurarse de que el loader esté visible

    try {
        const photos = await getRoverPhotosBySol(roverName, sol);
        displayPhotoGallery(photos, roverName, sol); // Pasar sol y roverName para mensajes
    } catch (error) {
        console.error("Error al cargar fotos de la galería:", error);
        showErrorMessage(galleryContainer, `Error al cargar fotos para el Sol ${sol} de ${roverName}.`);
    } finally {
        hideLoader(galleryContainer);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    initStarfield();

    // Cargar y mostrar datos del clima
    const weatherWidget = document.getElementById('weather-widget');
    showLoader(weatherWidget); // Mostrar loader del clima
    try {
        const weather = await getWeatherData();
        displayWeatherData(weather);
    } catch (error) {
        console.error("Error al cargar datos del clima:", error);
        showErrorMessage(weatherWidget, "Error al cargar datos del clima.");
    } finally {
        hideLoader(weatherWidget); // Ocultar loader del clima
    }


    // Cargar y mostrar últimas fotos de Perseverance en el dashboard
    const latestPhotosWidget = document.getElementById('latest-photos');
    showLoader(latestPhotosWidget); // Mostrar loader de últimas fotos
    try {
        const photos = await getLatestRoverPhotos('Perseverance');
        displayLatestPhotos(photos);
    } catch (error) {
        console.error("Error al cargar últimas fotos:", error);
        showErrorMessage(latestPhotosWidget, "Error al cargar las últimas fotos.");
    } finally {
        hideLoader(latestPhotosWidget); // Ocultar loader de últimas fotos
    }

    // Event listener para el selector de rovers
    const roverSelector = document.getElementById('rover-selector');
    roverSelector.addEventListener('click', async (event) => {
        if (event.target.tagName === 'BUTTON') {
            const newRoverName = event.target.dataset.rover;
            if (newRoverName !== activeRover) { // Solo cargar si es un rover diferente
                updateActiveRoverButton(event.target);
                await loadRoverData(newRoverName);
            }
        }
    });
    
    // Event listener para los controles del mapa
    const mapControls = document.getElementById('map-controls');
    const nasaEyesIframe = document.getElementById('nasa-eyes-map'); // Obtener el iframe por ID
    
    mapControls.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const target = event.target.dataset.target;
            if (nasaEyesUrls[target] && nasaEyesIframe) {
                nasaEyesIframe.src = nasaEyesUrls[target];
            }
            // Opcional: añadir clase 'active' a los botones del mapa si se desea
            document.querySelectorAll('#map-controls button').forEach(button => button.classList.remove('active'));
            event.target.classList.add('active');
        }
    });
    // Establecer el botón "Vista General" como activo por defecto para el mapa
    const generalMapButton = document.querySelector('#map-controls button[data-target="General"]');
    if (generalMapButton) {
        generalMapButton.classList.add('active');
    }


    // Cargar los datos del rover por defecto al inicio
    await loadRoverData('Perseverance');
});