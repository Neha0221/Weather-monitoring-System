const { buildUrlWithParams, fetchData } = require('./http_manager');

const BASE_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';



const get_weather = async (city) => {
  try {
    // Define query parameters as key-value pairs
    const queryParams = {
      q: city,
      APPID:process.env.OPENWEATHER_API_KEY
    };

    // Build URL with query parameters
    const finalUrl = buildUrlWithParams(BASE_API_ENDPOINT, queryParams);

    // Pass the constructed URL to fetchData
    const data = await fetchData(finalUrl);

    return data

  } catch (error) {
    console.error('Critical failure:', error.message);
  }
}

module.exports=get_weather 