async function login(email, password) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data.token; // Return the JWT token from the response
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

async function signup(username, email, password) {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    return data.token; // Return the JWT token from the response
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}
