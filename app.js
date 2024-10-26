const dotenv = require('dotenv');
const {connectToDB} = require('./utils/mongo_db')
const {createWeatherCron} = require('./cron/weather_cron')
const {saveWeatherCronJob} = require('./cron/weather_save_cron')
const {TemperatureType } = require('./utils/enums');
const {WeatherManager} = require('./services/weather_manager')

const readline = require('readline');

dotenv.config();

// Create an interface to read input from command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Async function to ask user questions and return a new WeatherStats instance
async function askMultipleQuestions() {
    try {
        const city = await askQuestion('Please enter your city: ');
        const temperature_type_str = await askQuestion('Enter temperature type (celsius/fahrenheit): ');
        
        // Get the temperature type (ensure user input matches expected values)
        const temperature_type = TemperatureType.getTemperatureType(temperature_type_str);
        
        if (!temperature_type) {
            throw new Error(`Invalid temperature type: ${temperature_type_str}. It should be either celcius or fahrenheit.`);
        }

        weather_manager=new WeatherManager(city,temperature_type);
        
        const add_temp_triggers=await askQuestion("Do you want to add a temprature trigger: (Y/N)");

        if(add_temp_triggers==="Y")
        {
            const attribute="temperature"
            const operator=await askQuestion("Enter Operator: ");
            const threshold=await askQuestion("Enter Threshold: ");

            weather_manager.addTrigger(attribute,operator,threshold)
        }

        const add_weather_condition_triggers=await askQuestion("Do you want to add a weather condition trigger: (Y/N)");

        if(add_weather_condition_triggers==="Y")
        {
            const attribute="condition"
            const operator=await askQuestion("Enter Operator: ");
            const threshold=await askQuestion("Enter condition: ");

            weather_manager.addTrigger(attribute,operator,threshold)
        }

        return weather_manager;

    } finally {
        rl.close();  // Ensure rl is closed
    }
}

/**
 * Main function to start execution once input is done
 */
(async () => {
    try {

        await connectToDB();
        // Await weather stats creation
        const weather_manager = await askMultipleQuestions();

        console.log('******* Weather Manager created: *******\n', weather_manager);

        // Once weather_stats is created, pass it to the cron job
        createWeatherCron(weather_manager);
        saveWeatherCronJob(weather_manager);

    } catch (error) {
        console.error('Error occurred:', error.message);
    }
})();