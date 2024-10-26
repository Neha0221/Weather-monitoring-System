const cron = require('node-cron');
const WeatherSummary = require('../models/weather_stats_schema');

// Function to save the weather stats at 00:00 every day
function saveWeatherCronJob(weather_manager) {
    return cron.schedule('*/3 * * * *', async () => {  // runs at 00:00 every day
    // return cron.schedule('00 00 * * *', async () => {  // runs at 00:00 every day
        console.log('[CRON] Starting the job to save yesterday\'s weather stats...');

        try {
            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
            const statsToSave = weather_manager.getDailySummary();
            statsToSave['date'] = yesterday;  // Add the date to stats

            // Save the stats to the DB
            await WeatherSummary.create(statsToSave);

            console.log(`[CRON] Weather stats saved for ${statsToSave.city} on ${yesterday.toDateString()}`);
            
        } catch (error) {
            console.error('[CRON] Error saving weather stats:', error);
        }

    }, {
        timezone: 'UTC'
    });
}

module.exports = { saveWeatherCronJob };