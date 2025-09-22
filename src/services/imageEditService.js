// Use Vite's import.meta.env for frontend environment variables

import axiosInstance from "../axios/axiosInstance";

// Use the VITE_ prefixed variable name
const BACKEND_BASE_URL = import.meta.env.VITE_BETTER_AUTH_URL || ''; // Provide a default
const TRANSFORM_API_ENDPOINT = `${BACKEND_BASE_URL.replace(/\/$/, '')}/api/transform-image`;
const EDIT_API_ENDPOINT = `${BACKEND_BASE_URL.replace(/\/$/, '')}/api/edit-transformed-image`;

// Helper function to convert File to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Transform API call (10 credits)
async function callTransformApi(imageBase64, prompt) {
  console.log("[Service] Calling /api/transform-image endpoint...");
  try {
    const token = localStorage.getItem('authToken');
    const response = await axiosInstance.post(`/user/transform-image`,{
      imageBase64,
      prompt
    }, {
        headers: {
            Authorization: `Bearer ${token}` // Add the token to the request headers
        }
    });


    if (!response.status || response.status < 200 || response.status >= 300) {
      let errorData;
      try {
        errorData = await response.data; 
      } catch (e) {
        // If parsing JSON fails, use status text
        errorData = { error: response.statusText };
      }
      
      console.error("[Service] Transform API Error Response:", errorData);
      // Throw an object with status for better handling in the component
      const error= new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.data;
    console.log("[Service] Transform API Success Response:", data);

    if (!data.editedImageBase64) {
      throw new Error('API response did not contain editedImageBase64.');
    }

    return data.editedImageBase64;

  } catch (error) {
    console.error("[Service] Error calling transform API:", error);
    // Re-throw the error (potentially with status attached) for the component to handle
    throw error; 
  }
}

// Edit API call (5 credits)
async function callEditApi(imageBase64, prompt) {
  console.log("[Service] Calling /api/edit-transformed-image endpoint...");
  try {
    const token = localStorage.getItem('authToken');
    const response = await axiosInstance.post(`/user/edit-image`,{
      imageBase64,
      prompt
    }, {
        headers: {
            Authorization: `Bearer ${token}` // Add the token to the request headers
        }
    });

    if (!response.status || response.status < 200 || response.status >= 300) {
      let errorData;
      try {
        errorData = await response.data; 
      } catch (e) {
        // If parsing JSON fails, use status text
        errorData = { error: response.statusText };
      }
      
      console.error("[Service] Edit API Error Response:", errorData);
      // Throw an object with status for better handling in the component
      const error = new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.data;
    console.log("[Service] Edit API Success Response:", data);

    if (!data.editedImageBase64) {
      throw new Error('API response did not contain editedImageBase64.');
    }

    return data.editedImageBase64;

  } catch (error) {
    console.error("[Service] Error calling edit API:", error);
    // Re-throw the error (potentially with status attached) for the component to handle
    throw error; 
  }
}

// Transform function for initial transform with File (10 credits)
async function transformImageWithPrompt(file, prompt) {
  const imageBase64 = await fileToBase64(file);
  // Now calls the transform endpoint
  return callTransformApi(imageBase64, prompt);
}

export const imageEditService = {
  transformImageWithPrompt,
  callEditApi,
  callTransformApi, 
}; 