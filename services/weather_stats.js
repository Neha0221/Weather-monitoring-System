class WeatherStats {
    constructor(city) {
        this.city = city;
        this.resetStats();  // Initialize default values by calling resetStats
    }

    /**
     * Resets all the instance properties to their initial default values.
     */
    resetStats() {
        this.temperatures = [];               // List of all recorded temperatures
        this.maxTemperature = -Infinity;      // Reset max temperature
        this.minTemperature = Infinity;       // Reset min temperature
        this.sumTemperature = 0;              // Reset sum of temperatures
        this.weatherFrequency = {};           // Reset weather frequency hash map
        this.dominantWeather = "";      // Reset most frequent weather
        this.dominantWeatherFrequency = 0;         // Reset frequency counter of most frequent weather
    }

    /**
     * Method to update weather statistics.
     * 
     * example weather_data object:
     * {
     *    temperature: 25,
     *    condition: "clear"
     * }
     *
     * @param {Object} weather_data - Contains temperature and weather condition for a specific data point
     */
    add_stats(weather_data) {
        let { temperature, maxTemperature,minTemperature, condition } = weather_data;
        
        // 1. Track the temperature data
        this.temperatures.push(temperature);
        this.sumTemperature += temperature;

        // Update max and min temperatures
        if (maxTemperature > this.maxTemperature) {
            this.maxTemperature = maxTemperature;
        }
        if (minTemperature < this.minTemperature) {
            this.minTemperature = minTemperature;
        }

        // 2. Update weather condition frequency count (hash map)
        if (this.weatherFrequency[condition]) {
            this.weatherFrequency[condition]++;
        } else {
            this.weatherFrequency[condition] = 1;
        }

        // 3. Update the most frequent weather condition
        if (this.weatherFrequency[condition] > this.dominantWeatherFrequency) {
            this.dominantWeather = condition;
            this.dominantWeatherFrequency = this.weatherFrequency[condition];
        }
    }

    /**
     * Helper to calculate average temperature.
     * 
     * @returns {number} average temperature
     */
    getAverageTemperature() {
        if (this.temperatures.length === 0) {
            return 0; // Prevent division by zero if no temperatures have been recorded
        }
        return this.sumTemperature / this.temperatures.length;
    }

    /**
     * Summary information about daily weather.
     * 
     * @returns {Object} Daily summary containing average temperature, min, max, and dominant weather
     */
    getDailySummary() {
        return {
            city: this.city,
            maxTemperature: this.maxTemperature,
            minTemperature: this.minTemperature,
            avgTemperature: this.getAverageTemperature(),
            dominantWeather: this.dominantWeather,
            dominantWeatherFrequency: this.dominantWeatherFrequency,
        };
    }
}

module.exports ={WeatherStats};