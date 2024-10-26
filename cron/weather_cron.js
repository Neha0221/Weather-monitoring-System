const cron = require('node-cron');
const get_weather = require('../services/openweather_manager')
const {logErrorToFile} = require('../utils/utils');


// Global flag to avoid overlapping executions
let isJobRunning = false;

/**
 * Cron job to run every 5 minutes. It fetches data from an API and makes sure we don't run overlapping jobs.
 */
function createWeatherCron(weather_manager) {
    return cron.schedule('*/1 * * * *', async () => {
        if (isJobRunning) {
            console.warn('[CRON] A previous job is still in process. Skipping this execution.');
            return;
        }

        isJobRunning = true;  // Mark the job as running

        try {
            console.log(`[CRON]  [${new Date().toISOString()}] createWeatherCron started...`);

            const weatherData = await get_weather(weather_manager.getCity());
            console.log(`[CRON] [${new Date().toISOString()}] Weather data fetched:`, weatherData);

            // Add the fetched weather data to WeatherStats instance
            weather_manager.addWeatherData({ 
                temperature: weatherData.main.temp, 
                maxTemperature: weatherData.main.temp_max, 
                minTemperature: weatherData.main.temp_min, 
                condition: weatherData.weather[0].main 
            });

            // Output the complete daily summary
            console.log("[CRON] Daily Weather Summary:",weather_manager.getDailySummary());

        } catch (error) {
            console.error('[CRON] Error during API fetch:', error.message);
            logErrorToFile(error);
        } finally {
            isJobRunning = false;  // Mark the job as available again
            console.log(`[CRON] [${new Date().toISOString()}] createWeatherCron finished.`);
        }
    }, {
        scheduled: true,  // Automatically schedule the cron job
        timezone: 'UTC',  // Specify your timezone (or use the appropriate TZ for your environment)
    });
}

module.exports={createWeatherCron};