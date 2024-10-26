// Importing necessary libraries
const axios = require('axios');

// Maximum retry count
const MAX_RETRIES = 3;

/**
 * Builds a complete URL by appending provided query parameters to the base URL.
 * 
 * @param {string} baseUrl - The base API endpoint
 * @param {Object} queryParams - Object representing the query params (key-value pairs)
 * @returns {string} - The constructed URL with encoded query parameters
 */
function buildUrlWithParams(baseUrl, queryParams = {}) {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(queryParams);
    
    url.search = params;  // Automatically encodes and attaches the query parameters
    return url.toString();
}

/**
 * Makes a GET request to a given URL while handling common edge cases such as network errors,
 * server-side issues, invalid JSON responses, and retry attempts for transient issues.
 * @param {string} url - The API endpoint to call
 * @param {number} retries - Number of retry attempts in case of failure
 * @returns {Promise<Object>} - Resolves with the API response data or rejects with an error
 */
async function fetchData(url, retries = MAX_RETRIES) {
  try {
    const config = {
      timeout: 5000, // Setting a 5-second timeout
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      validateStatus: (status) => {
        // Only resolve with valid status codes
        return status >= 200 && status < 300; // Default is 200-299
      },
    };

    // Making a GET request using axios
    const response = await axios.get(url, config);

    // If the request is successful, return the response data
    return response.data;
  } catch (error) {
    if ((error.code === 'ECONNABORTED' || error.message === 'Network Error') && retries > 0) {
      // Retry the request if it timed out or had a network issue
      console.warn(`Request failed (network issue), retrying... (${retries} retries left)`);
      return fetchData(url, retries - 1);
    } else if (error.response) {
      // Server-side error, e.g., 4xx, 5xx status codes
      console.error(
        `Request failed with status ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      // Request was made, no response received (likely network issues)
      console.error("Request made but no response received");
    } else {
      // Other errors
      console.error(`Unexpected error occurred: ${error.message}`);
    }

    // In case of failure after retries, throw the error for upper layers to handle
    throw new Error(
      'Failed to fetch data after multiple attempts due to: ' + error.message
    );
  }
}

module.exports = {
    buildUrlWithParams,
    fetchData
};