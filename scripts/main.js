
import { initStarfield } from './stars.js';
import { getWeatherData } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    initStarfield();

    const weather = await getWeatherData();
   
});