class TemperatureType {
    
    static Celsius = "celsius";
    static Fahrenheit = "fahrenheit";
    /**
     * Function to get temperature type from a string
     * @param {string} typeStr
     * @returns {string} TemperatureType enum or null if the input is invalid
     */
    static getTemperatureType(typeStr) {
        const normalizedType = typeStr.toLowerCase();  // Normalize to lowercase

        switch (normalizedType) {
            case TemperatureType.Celsius:
                return TemperatureType.Celsius;
            case TemperatureType.Fahrenheit:
                return TemperatureType.Fahrenheit;
            default:
                return null;  // Return null if type is not valid
        }
    }
}

module.exports={TemperatureType}