const API_KEY = 'RmffFUTSgjahS3SCtoTRPamgVVodlJrte3xEWLWk';



export async function getWeatherData() {
    const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const latestSolKey = data.sol_keys.pop();
        const latestSolData = data[latestSolKey];
        return {
            sol: latestSolKey,
            avgTemp: latestSolData.AT.av,
        };
    } catch (error) {
        console.error("Could not fetch Mars weather data:", error);
        return null;
    }
}

export async function getLatestRoverPhotos(roverName) {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.latest_photos.slice(0, 4);
    } catch (error) {
        console.error(`Could not fetch ${roverName} latest photos:`, error);
        return null;
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

export async function getRoverPhotosBySol(roverName, sol) {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error(`Could not fetch ${roverName} photos for sol ${sol}:`, error);
        return [];
    }
}