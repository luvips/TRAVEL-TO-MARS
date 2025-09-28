import { initStarfield } from './stars.js';
import { getWeatherData, getRoverPhotos } from './api.js';
import { displayWeatherData, displayLatestPhotos } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    initStarfield();

    const weather = await getWeatherData();
    displayWeatherData(weather);

    const photos = await getRoverPhotos('Perseverance');
    displayLatestPhotos(photos);
});