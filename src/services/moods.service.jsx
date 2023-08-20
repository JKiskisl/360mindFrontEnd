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

//delete mood

export const deleteMoods = async (accessToken, moodId) => {
  const config = {
    url: `${apiServerUrl}/posts/${moodId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  if (error) {
    return { data: null, error };
  }

  if (!data || !data.message) {
    return { data: null, error: "Invalid response from the server" };
  }

  return { data: data.message, error };
};

//add mood
export const addMood = async (accessToken, mood) => {
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: mood.title,
      content: mood.content,
    }),
  };

  const response = await fetch(`${apiServerUrl}/posts`, config);
  const data = await response.json();

  if (!response.ok) {
    return { data: null, error: data.message };
  }

  return {
    data: { id: data.id, title: data.title, content: data.content },
    error: null,
  };
};
