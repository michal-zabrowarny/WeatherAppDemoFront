const API_BASE_URL = "https://weatherappdemo-596h.onrender.com/weather";

export async function fetchWeatherForecast(lat, lon) {
    if (!lat || !lon) {
        throw new Error("Missing coordinates for forecast.");
    }

    const response = await fetch(`${API_BASE_URL}/forecast?latitude=${lat}&longitude=${lon}`);
    if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
    }

    return await response.json();
}
