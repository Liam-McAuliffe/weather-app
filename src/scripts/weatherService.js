export async function fetchWeather(location) {
  const baseUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  const unitGroup = 'us';
  const apiKey = `${process.env.APIKEY}`;

  const url = `${baseUrl}${encodeURIComponent(
    location
  )}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
}
