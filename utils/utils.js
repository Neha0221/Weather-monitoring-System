const fs = require('fs');  
const path = require('path');

const kelvinToCelsius = (temp) => temp - 273.15;

const celsiusToFahrenheit = (temp) => (temp * 9/5) + 32;

/**
 * Logs errors to a file to keep track of failures in production.
 * @param {Error} error 
 */
function logErrorToFile(error) {
    const logFilePath = path.join(__dirname, 'cron_error.log');
    const errorMessage = `${new Date().toISOString()} - Error: ${error.message || error}\n`;
    fs.appendFileSync(logFilePath, errorMessage, 'utf8'); // Append error to log file
}



module.exports = {
    celsiusToFahrenheit,
    kelvinToCelsius,
    logErrorToFile
};
