// Función para mostrar el loader dentro de un contenedor
export function showLoader(container) {
    // Busca un loader existente o crea uno
    let loaderContainer = container.querySelector('.loader-container');
    if (!loaderContainer) {
        loaderContainer = document.createElement('div');
        loaderContainer.className = 'loader-container';
        loaderContainer.innerHTML = `
            <div class="loader"></div>
            <p>Cargando...</p>
        `;
        // Limpia el contenido actual y añade el loader
        container.innerHTML = ''; 
        container.appendChild(loaderContainer);
    }
    loaderContainer.style.display = 'flex'; // Asegura que esté visible
    // Opcional: Actualiza el texto del loader según el contexto
    const loaderText = loaderContainer.querySelector('p');
    if (container.id === 'weather-widget') loaderText.textContent = 'Cargando datos del clima...';
    if (container.id === 'latest-photos') loaderText.textContent = 'Cargando últimas fotos...';
    if (container.id === 'mission-manifest') loaderText.textContent = 'Cargando manifiesto de misión...';
    if (container.id === 'photo-gallery') loaderText.textContent = 'Cargando galería de fotos...';
}

// Función para ocultar el loader
export function hideLoader(container) {
    const loaderContainer = container.querySelector('.loader-container');
    if (loaderContainer) {
        loaderContainer.style.display = 'none';
        // Asegurarse de que el contenido real se inyecte *después* de ocultar el loader
        // o que el loader se elimine si no es necesario para el contenido final
    }
}

// Función para mostrar mensajes de error
export function showErrorMessage(container, message) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
}

export function displayWeatherData(weatherData) {
    const widget = document.getElementById('weather-widget');
    hideLoader(widget); // Ocultar loader una vez que se tienen los datos

    if (!weatherData || weatherData.avgTemp === null) {
        // Usar el mensaje que viene con los datos, o un mensaje genérico
        widget.innerHTML = `
            <h3 class="widget-title">Clima en Elysium Planitia</h3>
            <p class="error-message">${weatherData.message || 'No se pudieron cargar los datos del clima de Marte.'}</p>
        `;
        return;
    }
    const avgTempCelsius = Math.round(weatherData.avgTemp);
    const content = `
        <h3 class="widget-title">Clima en Elysium Planitia</h3>
        <p class="sol-date">Sol ${weatherData.sol}</p>
        <p class="temperature">${avgTempCelsius}°C</p>
        <p class="description">Temperatura Promedio</p>
    `;
    widget.innerHTML = content;
}

export function displayLatestPhotos(photos) {
    const widget = document.getElementById('latest-photos');
    hideLoader(widget); // Ocultar loader

    widget.innerHTML = '<h3 class="widget-title">Últimas Fotos de Perseverance</h3>'; // Limpiar antes de añadir contenido
    if (!photos || photos.length === 0) {
        widget.innerHTML += `<p class="info-message">No se encontraron fotos recientes de Perseverance.</p>`;
        return;
    }
    const photoGrid = document.createElement('div');
    photoGrid.className = 'photo-grid-small';
    photos.forEach(photo => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'photo-item'; // Usar la clase photo-item
        imgContainer.innerHTML = `
            <img src="${photo.img_src}" alt="Foto del rover Perseverance (ID: ${photo.id})" loading="lazy">
            <div class="photo-info">Cámara: ${photo.camera.full_name}</div>
        `;
        photoGrid.appendChild(imgContainer);
    });
    widget.appendChild(photoGrid);
}

export function displayMissionManifest(manifest) {
    const manifestContainer = document.getElementById('mission-manifest');
    hideLoader(manifestContainer); // Ocultar loader

    if (!manifest) {
        manifestContainer.innerHTML = `<p class="error-message">No se pudo cargar el manifiesto de la misión.</p>`;
        return;
    }
    const content = `
        <h3>Manifiesto: ${manifest.name}</h3>
        <ul>
            <li><strong>Estado:</strong> <span>${manifest.status}</span></li>
            <li><strong>Lanzamiento:</strong> <span>${manifest.launch_date}</span></li>
            <li><strong>Aterrizaje:</strong> <span>${manifest.landing_date}</span></li>
            <li><strong>Último Sol Marciano:</strong> <span>${manifest.max_sol}</span></li>
            <li><strong>Fotos Totales:</strong> <span>${manifest.total_photos.toLocaleString()}</span></li>
            <li><strong>Soles Activos:</strong> <span>${manifest.photos.length}</span></li>
        </ul>
    `;
    manifestContainer.innerHTML = content;
}

export function updateActiveRoverButton(clickedButton) {
    document.querySelectorAll('#rover-selector button').forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
    });
    clickedButton.classList.add('active');
    clickedButton.setAttribute('aria-pressed', 'true');
}

export function displayPhotoGallery(photos, roverName, sol) { // Añadir roverName y sol para el mensaje
    const galleryContainer = document.getElementById('photo-gallery');
    hideLoader(galleryContainer); // Ocultar loader

    galleryContainer.innerHTML = `<h3>Galería de Fotos del Rover</h3>`; // Título estático
    
    if (!photos || photos.length === 0) {
        galleryContainer.innerHTML += `<p class="info-message">No se encontraron fotos para el rover ${roverName} en el Sol ${sol}. Intenta con otro Sol o rover.</p>`;
        return;
    }
    const photoGrid = document.createElement('div');
    photoGrid.className = 'photo-grid-large';
    photos.forEach(photo => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'photo-item';
        imgContainer.innerHTML = `
            <img src="${photo.img_src}" alt="Foto del rover ${photo.rover.name}, cámara ${photo.camera.full_name}" loading="lazy">
            <div class="photo-info">Cámara: ${photo.camera.full_name}</div>
        `;
        photoGrid.appendChild(imgContainer);
    });
    galleryContainer.appendChild(photoGrid);
}