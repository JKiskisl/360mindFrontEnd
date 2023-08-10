import { callExternalApi } from "./callexternalapi";
const apiServerUrl = "http://localhost:8081";

//get MOODS

export const getMoods = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/posts`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  if (error) {
    return { data: null, error };
  }

  if (!data || !Array.isArray(data.data)) {
    return { data: null, error: "Data is not an array" };
  }
  const moods = data.data.map((mood) => ({
    id: mood.id,
    title: mood.title,
    content: mood.content,
  }));

  return {
    data: moods,
    error,
  };
};
