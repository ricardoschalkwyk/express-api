const API_BASE_URL = "https://pokeapi.co/api/v2"; // Replace with your API base URL

const Api = {
  /**
   * Generic function to make a GET request.
   * @param {string} endpoint - The API endpoint (e.g., '/users').
   * @returns {Promise<any>} - A promise that resolves with the parsed JSON data.
   */
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        const errorData = await response.json(); // Or response.text() if not JSON
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("GET request failed:", error);
      throw error; // Re-throw to allow calling code to handle
    }
  },
};

export default Api;
