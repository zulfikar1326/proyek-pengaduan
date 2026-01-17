const BASE_URL = import.meta.env.VITE_API_URL;

export async function api(path, method = "GET", body) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : null
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
