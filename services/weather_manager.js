const { WeatherStats} = require('./weather_stats');
const { WeatherTrigger } = require('./weather_triggers');
const {kelvinToCelsius} = require('../utils/utils')
const {TemperatureType} = require('../utils/enums')

class WeatherManager {
    constructor(city, temperatureType) {
        this.weatherStats = new WeatherStats(city);  // Create a WeatherStats instance for the city
        this.triggers = [];  // Array to store WeatherTrigger instances
        this.temperatureType = temperatureType;  // Celsius or Fahrenheit
    }

    /**
     * Add a new trigger to monitor weather conditions.
     * @param {WeatherTrigger} trigger - The WeatherTrigger instance to add.
     */
    addTrigger(attribute,operator,threshold) {
        this.triggers.push(new WeatherTrigger(attribute,operator,threshold));
    }

    /**
     * Add weather data and update statistics.
     * @param {Object} weatherData - The weather data to add (contains temperature and condition).
     */
    addWeatherData(weatherData) {
        weatherData.temperature=this.format_temperature(weatherData.temperature)
        weatherData.maxTemperature=this.format_temperature(weatherData.maxTemperature)
        weatherData.minTemperature=this.format_temperature(weatherData.minTemperature)
        
        this.weatherStats.add_stats(weatherData);  // Adds stats to WeatherStats
        this.checkWeatherTriggers(weatherData);
    }

    /**
     * Check if any of the triggers are met based on the updated stats.
     * @returns {Array} - Array of triggered conditions.
     */
    checkWeatherTriggers(weatherData) {
        const triggeredConditions = [];

        for (let trigger of this.triggers) {
            // Get the current value of the attribute (e.g., temperature, maxTemperature, etc.)
            const value = weatherData[trigger.attribute];

            if (value !== undefined) {
                if (trigger.isTriggered(value)) {
                    triggeredConditions.push(`${trigger.attribute} ${trigger.operator} ${trigger.threshold} (Current: ${value})`);
                }
            } else {
                console.error(`Invalid attribute: ${trigger.attribute}`);
            }
        }

        console.log("******* Triggers Met *******")
        console.log(triggeredConditions);
    }

    getDailySummary(){
        return this.weatherStats.getDailySummary()
    }

    getCity(){
        return this.weatherStats.city;
    }

    format_temperature(temperature){
        if(this.temperatureType==TemperatureType.Celsius)
            return kelvinToCelsius(temperature);
        else
            return temperature;
    }
}

module.exports = { WeatherManager };