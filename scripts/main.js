import { initStarfield } from './stars.js';
import { getWeatherData } from './api.js';
import { displayWeatherData } from './ui.js';


document.addEventListener('DOMContentLoaded', async () => {

    initStarfield();

 
    const weather = await getWeatherData();

    
    displayWeatherData(weather);

    
});