import mockData from "./mock-data";
import NProgress from "nprogress";
/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Fetches a list of events from an API or returns mock data in a development environment.
 * It checks the environment, obtains an access token for authentication, and then fetches the events.
 */
export const getEvents = async () => {
  // Check if the current environment is a local development environment
  // The function returns mock data if the URL indicates it's running on localhost.
  if (window.location.href.startsWith("http://localhost")) {
    return mockData; // Return mock data for local development/testing
  }
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }
  // Obtain an access token for authentication
  // This token is necessary to authenticate the request to the events API
  const token = await getAccessToken();

  // Check if the token was successfully obtained
  if (token) {
    removeQuery(); // Remove query parameters from the URL (clean-up function)

    // Construct the URL for fetching events, appending the token for authentication
    const url =
      "https://p2qb3sooc2.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;

    // Fetch the events data from the API
    const response = await fetch(url);
    const result = await response.json(); // Parse the JSON response

    // Check if the result contains event data
    if (result) {
      NProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
    // If no token was obtained, no action is performed (events are not fetched)
  }
};

/**
 * Checks the validity of an OAuth access token.
 * Makes an API request to a Google endpoint to verify the token.
 *
 * @param {string} accessToken - The OAuth access token to be validated.
 * @returns {Promise<Object>} A promise that resolves to the token information.
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json(); // Parses the API response to JSON format
  return result; // Returns the token information (validity, user, etc.)
};

/**
 * Obtains an access token using an authorization code.
 * This is part of the OAuth authentication flow.
 *
 * @param {string} code - The authorization code received from OAuth provider.
 * @returns {Promise<string>} A promise that resolves to the access token.
 */
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code); // Encodes the code for secure transmission
  const response = await fetch(
    "https://p2qb3sooc2.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  );
  const { access_token } = await response.json(); // Parses the response to get the access token

  if (access_token) {
    localStorage.setItem("access_token", access_token); // Stores the token in local storage for later use
  }

  return access_token; // Returns the access token
};

/**
 * This function manages user login in web applications.
 * It obtains an OAuth access token necessary for accessing secure areas and services.
 * Used for verifying user identity and ensuring secure access to protected resources.
 */
export const getAccessToken = async () => {
  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem("access_token");

  // Check if the token is valid by calling a function `checkToken`
  // This is to verify if the token is still valid (not expired)
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // If there's no access token or the token is invalid (as indicated by tokenCheck.error)
  if (!accessToken || tokenCheck.error) {
    // Remove the invalid or nonexistent access token from local storage
    await localStorage.removeItem("access_token");

    // Get the URL search parameters from the current window location
    const searchParams = new URLSearchParams(window.location.search);

    // Retrieve the 'code' parameter from the URL, if present
    // This 'code' is typically provided as part of the OAuth callback after user authentication
    const code = await searchParams.get("code");

    // If there is no 'code' in the URL (which means the user has not been authenticated yet)
    if (!code) {
      // Fetch an authentication URL from your server
      // This endpoint should return the URL to which the user should be redirected for OAuth authentication
      const response = await fetch(
        "https://p2qb3sooc2.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;

      // Redirect the browser to the authentication URL
      // This is typically a third-party authentication service (like Google, Facebook, etc.)
      return (window.location.href = authUrl);
    }

    // If there is a 'code' in the URL, use it to get the token
    // This part of the flow occurs after the user has authenticated with the OAuth provider
    // and the 'code' is exchanged for an access token
    return code && getToken(code);
  }

  // If the token exists and is verified as valid, return it
  // This token can be used for making authenticated requests to your server
  return accessToken;
};

// * This function takes an events array, then uses map to create a new array with only locations.
// * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
// * The Set will remove all duplicates from the array.

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};
