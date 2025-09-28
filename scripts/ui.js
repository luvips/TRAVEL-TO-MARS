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
    photoGrid.className = 'photo-grid-small';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Mars Rover Photo ID: ${photo.id}`;
        img.loading = 'lazy';
        photoGrid.appendChild(img);
    });
    widget.appendChild(photoGrid);
}

export function displayMissionManifest(manifest) {
    const manifestContainer = document.getElementById('mission-manifest');
    if (!manifest) {
        manifestContainer.innerHTML = `<p>No se pudo cargar el manifiesto de la misión.</p>`;
        return;
    }
    const content = `
        <h3>Manifiesto: ${manifest.name}</h3>
        <ul>
            <li><strong>Estado:</strong> ${manifest.status}</li>
            <li><strong>Lanzamiento:</strong> ${manifest.launch_date}</li>
            <li><strong>Aterrizaje:</strong> ${manifest.landing_date}</li>
            <li><strong>Último Sol Marciano:</strong> ${manifest.max_sol}</li>
            <li><strong>Fotos Totales:</strong> ${manifest.total_photos.toLocaleString()}</li>
        </ul>
    `;
    manifestContainer.innerHTML = content;
}

export function updateActiveRoverButton(clickedButton) {
    document.querySelectorAll('#rover-selector button').forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
}

export function displayPhotoGallery(photos) {
    const galleryContainer = document.getElementById('photo-gallery');
    galleryContainer.innerHTML = '';
    if (!photos || photos.length === 0) {
        galleryContainer.innerHTML = `<p>No se encontraron fotos para el Sol seleccionado. Intenta con otro.</p>`;
        return;
    }
    const photoGrid = document.createElement('div');
    photoGrid.className = 'photo-grid-large';
    photos.forEach(photo => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'photo-item';
        imgContainer.innerHTML = `
            <img src="${photo.img_src}" alt="Foto del rover ${photo.rover.name}" loading="lazy">
            <div class="photo-info">Cámara: ${photo.camera.full_name}</div>
        `;
        photoGrid.appendChild(imgContainer);
    });
    galleryContainer.appendChild(photoGrid);
}