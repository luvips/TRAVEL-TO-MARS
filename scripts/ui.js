export function displayWeatherData(weatherData) {
    const widget = document.getElementById('weather-widget');
    
    widget.innerHTML = ''; 

    if (!weatherData) {
        widget.innerHTML = `<h2>Clima en Elysium Planitia</h2><p>No se pudieron cargar los datos.</p>`;
        return;
    }

    const avgTempCelsius = Math.round(weatherData.avgTemp);

  
    const content = `
        <h2>Clima en Elysium Planitia</h2>
        <p class="sol-date">Sol ${weatherData.sol}</p>
        <p class="temperature">${avgTempCelsius}°C</p>
        <p class="description">Temperatura Promedio</p>
    `;

    widget.innerHTML = content;
}

export function displayWeatherData(weatherData) {
    const widget = document.getElementById('weather-widget');
    widget.innerHTML = ''; 
    if (!weatherData) {
        widget.innerHTML = `<h2>Clima en Elysium Planitia</h2><p>No se pudieron cargar los datos.</p>`;
        return;
    }
    const avgTempCelsius = Math.round(weatherData.avgTemp);
    const content = `
        <h2>Clima en Elysium Planitia</h2>
        <p class="sol-date">Sol ${weatherData.sol}</p>
        <p class="temperature">${avgTempCelsius}°C</p>
        <p class="description">Temperatura Promedio</p>
    `;
    widget.innerHTML = content;
}

export function displayLatestPhotos(photos) {
    const widget = document.getElementById('latest-photos');
    widget.innerHTML = '<h2>Últimas Fotos de Perseverance</h2>';
    if (!photos || photos.length === 0) {
        widget.innerHTML += `<p>No se encontraron fotos recientes.</p>`;
        return;
    }
    const photoGrid = document.createElement('div');
    photoGrid.className = 'photo-grid';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Mars Rover Photo ID: ${photo.id}`;
        photoGrid.appendChild(img);
    });
    widget.appendChild(photoGrid);
}