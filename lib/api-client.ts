class HttpAdapter {
  private readonly API_URL = "";
  async post(endpoint: string, data?: object, headers?: object) {
    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json;
  }
}

export const httpAdapter = new HttpAdapter();
