const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = localStorage.getItem("recipebox-token");
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed. Check that the RecipeBox API is running.");
  return data;
}
