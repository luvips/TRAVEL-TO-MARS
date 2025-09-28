import { initStarfield } from './stars.js';
import { getWeatherData, getLatestRoverPhotos, getRoverManifest, getRoverPhotosBySol } from './api.js';
import { displayWeatherData, displayLatestPhotos, displayMissionManifest, updateActiveRoverButton, displayPhotoGallery } from './ui.js';

const nasaEyesUrls = {
    'Perseverance': 'https://eyes.nasa.gov/apps/mars2020/#/home?embed=true',
    'Curiosity': 'https://eyes.nasa.gov/apps/marsdem/#/present/curiosity?embed=true',
    'General': 'https://eyes.nasa.gov/apps/marsdem/#/present/mars?embed=true'
};

async function loadRoverData(roverName) {
    const manifestContainer = document.getElementById('mission-manifest');
    const galleryContainer = document.getElementById('photo-gallery');

    manifestContainer.innerHTML = '<div class="loader"></div>';
    galleryContainer.innerHTML = '';

    const manifest = await getRoverManifest(roverName);
    displayMissionManifest(manifest);

    if (manifest) {
        await loadPhotoGallery(roverName, manifest.max_sol);
    }
}

async function loadPhotoGallery(roverName, sol) {
    const galleryContainer = document.getElementById('photo-gallery');
    galleryContainer.innerHTML = '<div class="loader"></div>';
    const photos = await getRoverPhotosBySol(roverName, sol);
    displayPhotoGallery(photos);
}

document.addEventListener('DOMContentLoaded', async () => {
    initStarfield();

    const weather = await getWeatherData();
    displayWeatherData(weather);

    const photos = await getLatestRoverPhotos('Perseverance');
    displayLatestPhotos(photos);

    const roverSelector = document.getElementById('rover-selector');
    roverSelector.addEventListener('click', async (event) => {
        if (event.target.tagName === 'BUTTON') {
            const roverName = event.target.dataset.rover;
            updateActiveRoverButton(event.target);
            await loadRoverData( roverName );
        }
    });
    
    const mapControls = document.getElementById('map-controls');
    mapControls.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const target = event.target.dataset.target;
            const iframe = document.getElementById('nasa-eyes-map');
            if (nasaEyesUrls[target]) {
                iframe.src = nasaEyesUrls[target];
            }
        }
    });

    await loadRoverData('Perseverance');
});