class WeatherTrigger{
    constructor(attribute,operator,threshold) {
        this.attribute = attribute;
        this.operator=operator;
        this.threshold=threshold;
    }

    /**
     * Check if a condition is triggered based on the attribute value.
     * @param {number} value - The current value for the attribute (e.g., current temperature).
     * @returns {boolean} - True if the condition is met, else false.
     */
    isTriggered(value) {
        switch (this.operator) {
            case '>':
                return value > this.threshold;
            case '>=':
                return value >= this.threshold;
            case '<':
                return value < this.threshold;
            case '<=':
                return value <= this.threshold;
            case '==':
                return value === this.threshold;
            default:
                throw new Error(`Unsupported operator: ${this.operator}`);
        }
    }
}

module.exports = {WeatherTrigger}