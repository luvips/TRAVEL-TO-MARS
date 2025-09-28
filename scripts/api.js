// Considera usar variables de entorno para API_KEY en un entorno de producción.
// Para este ejemplo de vanilla JS, se mantiene aquí.
const API_KEY = 'RmffFUTSgjahS3SCtoTRPamgVVodlJrte3xEWLWk'; 

export async function getWeatherData() {
    // La API Insight Mars Weather (insight_weather) ha sido descontinuada.
    // Intentaremos obtenerla, pero es probable que falle.
    // Podrías considerar reemplazarla con datos de Perseverance/Curiosity (MWL)
    // o un mensaje que indique que la API no está disponible.
    // Por ahora, mantendremos la llamada original con manejo de error.
    
    const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.warn(`Insight Mars Weather API returned status: ${response.status}. It might be deprecated.`);
            // Si la API falla, retornamos datos de ejemplo o un objeto que indique el fallo.
            return {
                sol: "N/A",
                avgTemp: null,
                message: "Datos de Insight Weather no disponibles. La API puede estar descontinuada."
            };
        }
        const data = await response.json();
        
        // Verifica que los datos tengan la estructura esperada
        if (!data || !data.sol_keys || data.sol_keys.length === 0) {
            console.warn("Mars weather data is empty or malformed.");
            return {
                sol: "N/A",
                avgTemp: null,
                message: "Datos de Insight Weather no disponibles."
            };
        }

        // Obtener el último sol
        const latestSolKey = data.sol_keys[data.sol_keys.length - 1]; 
        const latestSolData = data[latestSolKey];
        
        // Verifica que latestSolData y latestSolData.AT existan
        if (latestSolData && latestSolData.AT && latestSolData.AT.av) {
            return {
                sol: latestSolKey,
                avgTemp: latestSolData.AT.av,
                message: "Datos del clima cargados correctamente."
            };
        } else {
            console.warn("Specific weather data (avgTemp) not found for the latest sol.");
            return {
                sol: latestSolKey,
                avgTemp: null, // O un valor por defecto si no hay temperatura
                message: "Temperatura promedio no disponible para el último Sol."
            };
        }
    } catch (error) {
        console.error("Could not fetch Mars weather data:", error);
        return {
            sol: "N/A",
            avgTemp: null,
            message: `Error al cargar datos del clima: ${error.message}`
        };
    }
}

export async function getLatestRoverPhotos(roverName, count = 4) { // Añadir un parámetro para limitar el número de fotos
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.latest_photos.slice(0, count); // Usar el parámetro 'count'
    } catch (error) {
        console.error(`Could not fetch ${roverName} latest photos:`, error);
        return [];
    }
}

export async function getRoverManifest(roverName) {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.photo_manifest;
    } catch (error) {
        console.error(`Could not fetch ${roverName} manifest:`, error);
        return null;
    }
}

export async function getRoverPhotosBySol(roverName, sol, camera = '') { // Añadir parámetro de cámara opcional
    // Añadir lógica para manejar el caso de 'sol' como 'latest' o 'max_sol'
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=${API_KEY}`;
    if (sol === 'latest' || sol === 'max_sol') {
        // En este caso, ya tenemos getLatestRoverPhotos. Esta función es para un SOL específico.
        // Si se pide 'max_sol', la API de manifest ya lo da.
        // Podríamos obtener el max_sol del manifest aquí, o asumir que se pasará un número.
        // Por simplicidad, asumimos que 'sol' siempre será un número para esta función.
        url += `&sol=${sol}`;
    } else {
        url += `&sol=${sol}`;
    }

    if (camera) {
        url += `&camera=${camera}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error(`Could not fetch ${roverName} photos for sol ${sol} (camera: ${camera}):`, error);
        return [];
    }
}