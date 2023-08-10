import axios from "axios";

const apiServerUrl = "http://localhost:8081";

export const getMoods = async (accessToken) => {
  try {
    const response = await axios.get(`${apiServerUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mooods:", error);
    throw error;
  }
};
