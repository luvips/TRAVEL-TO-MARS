const API_KEY = 'RmffFUTSgjahS3SCtoTRPamgVVodlJrte3xEWLWk';

export async function getWeatherData() {
   
    const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`ERROR: ${response.status}`);
        }
        const data = await response.json();
        
       
        const latestSolKey = data.sol_keys.pop();
        const latestSolData = data[latestSolKey];

       
        return {
            sol: latestSolKey,
            avgTemp: latestSolData.AT.av,
        };

    } catch (error) {
        console.error("CERROR", error);
        return null; 
}