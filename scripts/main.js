import { initStarfield } from './stars.js';
import { getWeatherData, getRoverPhotos, getRoverManifest } from './api.js';
import { displayWeatherData, displayLatestPhotos, displayMissionManifest, updateActiveRoverButton } from './ui.js';

async function loadManifest(roverName) {
    const manifestContainer = document.getElementById('mission-manifest');
    manifestContainer.innerHTML = '<div class="loader"></div>';
    const manifest = await getRoverManifest(roverName);
    displayMissionManifest(manifest);
}

document.addEventListener('DOMContentLoaded', async () => {
    initStarfield();

    const weather = await getWeatherData();
    displayWeatherData(weather);

    const photos = await getRoverPhotos('Perseverance');
    displayLatestPhotos(photos);

    loadManifest('Perseverance');

    const roverSelector = document.getElementById('rover-selector');
    roverSelector.addEventListener('click', async (event) => {
        if (event.target.tagName === 'BUTTON') {
            const roverName = event.target.dataset.rover;
            updateActiveRoverButton(event.target);
            loadManifest(roverName);
        }
    });
});