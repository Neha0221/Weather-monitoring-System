const mongoose = require('mongoose');

// Define the WeatherStats MongoDB schema
const WeatherStatsSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        index: true        // Index the city field to improve search performance
    },
    date: {
        type: Date,
        required: true,
        index: true        // Index the date field to speed up date-based queries
    },
    maxTemperature: {
        type: Number,
        required: true
    },
    minTemperature: {
        type: Number,
        required: true
    },
    avgTemperature: {
        type: Number,
        required: true
    },
    dominantWeather: {
        type: String,      // Weather condition like "Clear", "Rainy", etc.
        required: true
    }
});

// Create a **compound index** to quickly retrieve stats by city and date
WeatherStatsSchema.index({ city: 1, date: -1 });

// Create and export the model
module.exports = mongoose.model('WeatherSummary', WeatherStatsSchema);