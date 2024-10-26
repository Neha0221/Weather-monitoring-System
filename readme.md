# Real-Time Weather Monitoring and Aggregation System

## Overview

This project implements a **real-time data processing system** to monitor weather conditions in major metro cities of India. The system retrieves weather data from the **OpenWeatherMap API** at regular intervals and computes daily aggregated statistics, including average, maximum, and minimum temperatures, as well as the dominant weather condition for the day. The system also supports configuring **alerting thresholds** based on user-specified conditions (e.g., triggering an alert if the temperature exceeds 35°C for two consecutive updates).

---

## Features

1. **Real-Time Data Retrieval**:

   - Continuous retrieval of weather data from the OpenWeatherMap API for major metro cities in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad).
   - Configurable interval for data retrieval (default is set to every 5 minutes).

2. **Weather Data Processing**:

   - Processing and aggregation of relevant data in real-time, including:
     - Temperature conversion from Kelvin to Celsius.
     - Daily roll-up of average, maximum, and minimum temperatures.
     - Identification of dominant weather conditions like Rain, Clear, etc.

3. **Alerting System**:

   - User-configurable thresholds for temperature (e.g., alert if temperature > 35°C).
   - Alert sent when thresholds are breached for two consecutive updates.
   - Alerts are displayed on the console, with optional email notifications integrated. (Future Scope)

4. **Visualization**: (Future Scope)
   - Simple front-end web page to display:
     - Daily weather summaries
     - Historical trends (temperature and weather conditions)
     - Alerts logged during the system's run-time.

---

## Project Structure

```
weather-monitoring-system/
├── app.js                              # Main application entry point managing configuration and server initialization
├── cron/
│   ├── weather_cron.js                 # Cron job that periodically retrieves weather data from the API
│   └── weather_save_cron.js            # Cron job that saves daily summaries to the database
├── cron_error.log                      # Log file for recording any cron-related errors
├── models/
│   └── weather_stats_schema.js         # Mongoose schema to define the structure for storing weather statistics
├── package-lock.json                   # Automatically generated package manager file that ensures version consistency
├── package.json                        # Project metadata and dependencies
├── readme.md                           # Project documentation (this file you are reading)
├── services/
│   ├── http_manager.js                 # Handles HTTP requests; wraps axios for OpenWeatherMap interactions
│   ├── openweather_manager.js          # Manages weather data retrieval from OpenWeatherMap API
│   ├── weather_manager.js              # Orchestrates data retrieval, parsing, and processing of weather information
│   ├── weather_stats.js                # Handles aggregation calculations such as daily summaries (min/max/avg temperatures)
│   └── weather_triggers.js             # Contains logic for checking and triggering alerts based on thresholds
└── utils/
    ├── cron_error.log                  # Utility to handle and log any errors encountered during cron execution
    ├── enums.js                        # Enum constants used across the application (e.g., weather types, thresholds)
    ├── mongo_db.js                     # Connection management and configuration for MongoDB
    └── utils.js                        # Utility functions for conversions, data formatting, etc.

```

## Technology Stack

### Backend:

- **Node.js**: Main application framework to create the server and handle API requests.
- **Express.js**: Simplifies building APIs and serving front-end resources.
- **Axios**: Used to make HTTP requests to the OpenWeatherMap API.
- **node-cron**: Manages scheduling of API calls at defined intervals.
- **MongoDB**: Database for storing daily weather summaries persistently.
- **Mongoose**: ORM for interacting with MongoDB.
- **nodemailer**: (Optional) Enables email-based alerts.

### Frontend:

- To be build

---

## Prerequisites

To run the application, ensure the following are installed on your system:

1. **Node.js** (v14 or higher) and **npm** (Node Package Manager). You can download Node.js from [here](https://nodejs.org/).
2. **MongoDB Database** for storing weather summaries.

---

## Installation Instructions

### 1. Clone the Repository

Clone the project repository from GitHub using the following command:

```bash
git clone https://github.com/your-github-handle/weather-monitoring-system.git
cd weather-monitoring-system
```

### 2. Install Dependencies

Use npm to install all the required dependencies listed in `package.json`. Run the following command in your project root:

```bash
npm install
```

The primary dependencies installed are:

- **dotenv**: For environment file handling.
- **axios**: For making HTTP requests to the weather API.
- **readline**: To interact with the user via the terminal.
- **mongoose**: For MongoDB connection and schema management.

### 3. Environment Configuration

Create a `.env` file in the root of the project to store API keys and other configuration data. The app uses `dotenv` to load environment variables. An example `.env` file looks like this:

```bash
# Environment settings (.env)

OPENWEATHER_API_KEY=your_openweathermap_api_key_here  # Use your OpenWeatherMap API Key
MONGODB_URI=mongodb://localhost:27017/weatherMonitoringDB  # URI of your MongoDB instance
```

Make sure to replace `your_openweathermap_api_key_here` and `mongodb://localhost:27017/weatherMonitoringDB` with your actual OpenWeatherMap API key and MongoDB connection string.

### 4. Start the Application

Start the real-time weather monitoring system by running the following command:

```bash
node app.js
```

This will:

- Connect to the MongoDB database.
- Prompt the user to enter their **city** and **temperature type** preferences.
- Optionally, allow users to set **weather triggers** for either temperature or weather conditions.

### 5. Respond to Command-Line Prompts

- **City Input**: You will be prompted to input a city of your choice for weather monitoring (e.g., Delhi, Mumbai, etc.). Make sure your input matches the cities supported by the OpenWeatherMap API.
- **Temperature Type (Celsius/Fahrenheit)**: Select the temperature scale that you want to use for monitoring (`celsius` or `fahrenheit`).

- **Temperature Trigger (Optional)**: You will also be asked whether you’d like to define a "temperature trigger" (i.e., generate an alert when the temperature condition is met). If you choose "Yes (Y)", it prompts:

  - **Operator**: Enter a comparison operator (e.g., `>`, `<`, `=`).
  - **Threshold**: Enter a temperature threshold (e.g., 35 for alert when temperature exceeds 35°C).

- **Weather Condition Trigger (Optional)**: Similar to temperature, you can define trigger conditions based on the main weather (e.g., Rain, Clear, etc.). If you choose "Yes (Y)", it prompts:
  - **Operator**: Enter a comparison operator (`=`, `!=`, etc.).
  - **Condition**: Enter a weather condition (such as `Rain`, `Clear`).

#### Example Input:

```bash
Please enter your city: Delhi
Enter temperature type (celsius/fahrenheit): celsius
Do you want to add a temperature trigger: (Y/N) Y
Enter Operator: <
Enter Threshold: 35
Do you want to add a weather condition trigger: (Y/N) N
```

Once you have entered all inputs, the application will initialize, set up cron jobs for retrieving and saving weather data, and will continuously monitor the defined triggers.

### 6. Application Outputs

The application will output the following to the console:

- The created **Weather Manager** object with your specified configurations.
- Real-time weather data will be fetched and processed based on the cron schedule.
- If alerts are triggered (e.g., temperature exceeds defined thresholds), corresponding logs or notifications will be generated.

#### Sample Output

```
MongoDB connected successfully
Please enter your city: Delhi
Enter temperature type (celsius/fahrenheit): celsius
Do you want to add a temprature trigger: (Y/N)Y
Enter Operator: <
Enter Threshold: 35
Do you want to add a weather condition trigger: (Y/N)N
******* Weather Manager created: *******
 WeatherManager {
  weatherStats: WeatherStats {
    city: 'Delhi',
    temperatures: [],
    maxTemperature: -Infinity,
    minTemperature: Infinity,
    sumTemperature: 0,
    weatherFrequency: {},
    dominantWeather: '',
    dominantWeatherFrequency: 0
  },
  triggers: [
    WeatherTrigger {
      attribute: 'temperature',
      operator: '<',
      threshold: '35'
    }
  ],
  temperatureType: 'celsius'
}
[CRON]  [2024-10-26T12:29:00.068Z] createWeatherCron started...
[CRON] [2024-10-26T12:29:00.794Z] Weather data fetched: {
  coord: { lon: 77.2167, lat: 28.6667 },
  weather: [ { id: 721, main: 'Haze', description: 'haze', icon: '50n' } ],
  base: 'stations',
  main: {
    temp: 303.2,
    feels_like: 302.57,
    temp_min: 303.2,
    temp_max: 303.2,
    pressure: 1008,
    humidity: 37,
    sea_level: 1008,
    grnd_level: 983
  },
  visibility: 3000,
  wind: { speed: 1.54, deg: 320 },
  clouds: { all: 0 },
  dt: 1729945473,
  sys: {
    type: 1,
    id: 9165,
    country: 'IN',
    sunrise: 1729904336,
    sunset: 1729944659
  },
  timezone: 19800,
  id: 1273294,
  name: 'Delhi',
  cod: 200
}
******* Triggers Met *******
[ 'temperature < 35 (Current: 30.05000000000001)' ]
[CRON] Daily Weather Summary: {
  city: 'Delhi',
  maxTemperature: 30.05000000000001,
  minTemperature: 30.05000000000001,
  avgTemperature: 30.05000000000001,
  dominantWeather: 'Haze',
  dominantWeatherFrequency: 1
}
[CRON] [2024-10-26T12:29:00.797Z] createWeatherCron finished.
```

### 7. Monitoring Weather and Alerts

- **Real-Time Weather Data**: Weather data for your selected city will be fetched every 5 minutes (or as specified in the `.env` file). The data is processed, and daily summaries will be saved to MongoDB.
- **Trigger Alerts**: Alerts will be printed to the console if any of the thresholds you defined are breached (e.g., temperature alert or weather condition alert).

---

### Troubleshooting

- **Error connecting to OpenWeatherMap API**: Double-check your **API key** in the `.env` file and confirm it's valid.
- **MongoDB connection error**: Ensure MongoDB is running locally or in the configured Docker container.

---

## Summary Steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in the `.env` file.
4. Run the application using `node app.js`.
5. Follow the command-line prompts to configure the system (e.g., city, temperature type, triggers).
6. Monitor the console for real-time weather data and alerts!

---

This should cover the **Installation Instructions** based on your **app.js** file analysis. Let me know if you need further details!

---

## Key Design Choices

1. **Node.js + Express**: Chosen for its simplicity, scalability, and wide ecosystem support, especially for real-time web development tasks.
2. **MongoDB + Mongoose**: A NoSQL database was chosen because the weather data is unstructured and can vary over time. MongoDB provides highly flexible schema interaction.
3. **node-cron**: Ideal for task scheduling, which allows us to set up regular API calls.
4. **Alerting System**: To keep things simple, alerts are initially logged to the console, but email-based notifications through `nodemailer` can be easily integrated.

---

## Future Improvements / Bonus Features

1. **Support for Additional Weather Parameters**:

   - Extend rollups and aggregates to include additional parameters like humidity, wind speed, etc.

2. **Weather Forecasting**:

   - Integrate weather forecasts from the OpenWeatherMap API for upcoming days and generate future summaries and predictions.

---
