const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function fetchEmployees({ search = "", limit = 10, offset = 0, signal } = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(
    `${API_BASE_URL}/employees?${params.toString()}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Employee request failed (${response.status})`);
  }

  return response.json();
}
