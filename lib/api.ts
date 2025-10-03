// API utility functions for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
}

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  verify: async (token: string) => {
    return fetchAPI<any>("/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getProfile: async (token: string) => {
    return fetchAPI<any>("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Blog API functions
export const blogAPI = {
  getAll: async (published?: boolean) => {
    const query = published !== undefined ? `?published=${published}` : "";
    return fetchAPI<any>(`/blogs${query}`);
  },

  getById: async (id: string) => {
    return fetchAPI<any>(`/blogs/${id}`);
  },

  create: async (token: string, blogData: any) => {
    return fetchAPI<any>("/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
  },

  update: async (token: string, id: string, blogData: any) => {
    return fetchAPI<any>(`/blogs/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
  },

  delete: async (token: string, id: string) => {
    return fetchAPI<any>(`/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Project API functions
export const projectAPI = {
  getAll: async (featured?: boolean) => {
    const query = featured !== undefined ? `?featured=${featured}` : "";
    return fetchAPI<any>(`/projects${query}`);
  },

  getById: async (id: string) => {
    return fetchAPI<any>(`/projects/${id}`);
  },

  create: async (token: string, projectData: any) => {
    return fetchAPI<any>("/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
  },

  update: async (token: string, id: string, projectData: any) => {
    return fetchAPI<any>(`/projects/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
  },

  delete: async (token: string, id: string) => {
    return fetchAPI<any>(`/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

