// API utility functions for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Add timeout to prevent hanging
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - backend server may not be running");
    }
    throw error;
  }
}

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI<{
      success: boolean;
      data: { token: string; user: Record<string, unknown> };
    }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  verify: async (token: string) => {
    return fetchAPI<{
      success: boolean;
      data: { user: Record<string, unknown> };
    }>("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getProfile: async (token: string) => {
    return fetchAPI<{
      success: boolean;
      data: { user: Record<string, unknown> };
    }>("/api/auth/profile", {
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
    return fetchAPI<{ success: boolean; data: Record<string, unknown>[] }>(
      `/api/blogs${query}`
    );
  },

  getById: async (id: string) => {
    return fetchAPI<{ success: boolean; data: Record<string, unknown> }>(
      `/api/blogs/${id}`
    );
  },

  create: async (token: string, blogData: Record<string, unknown>) => {
    return fetchAPI<{ success: boolean; data: Record<string, unknown> }>(
      "/api/blogs",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      }
    );
  },

  update: async (
    token: string,
    id: string,
    blogData: Record<string, unknown>
  ) => {
    return fetchAPI<{ success: boolean; data: Record<string, unknown> }>(
      `/api/blogs/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      }
    );
  },

  delete: async (token: string, id: string) => {
    return fetchAPI<{ success: boolean; message: string }>(`/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Upload API functions
export const uploadAPI = {
  uploadImage: async (
    token: string,
    file: File,
    folder: string = "general"
  ) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const url = `${API_BASE_URL}/api/upload`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to upload image");
    }

    return data;
  },

  deleteImage: async (token: string, publicId: string) => {
    return fetchAPI<{ success: boolean; message: string }>("/api/upload", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ publicId }),
    });
  },
};

// Project API functions
export const projectAPI = {
  getAll: async (featured?: boolean) => {
    const query = featured !== undefined ? `?featured=${featured}` : "";
    return fetchAPI<{ success: boolean; data: Record<string, unknown>[] }>(
      `/api/projects${query}`
    );
  },

  getById: async (id: string) => {
    return fetchAPI<{ success: boolean; data: Record<string, unknown> }>(
      `/api/projects/${id}`
    );
  },

  create: async (token: string, projectData: Record<string, unknown>) => {
    return fetchAPI<{ success: boolean; data: Record<string, unknown> }>(
      "/api/projects",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      }
    );
  },

  update: async (
    token: string,
    id: string,
    projectData: Record<string, unknown>
  ) => {
    return fetchAPI<{ success: boolean; data: Record<string, unknown> }>(
      `/api/projects/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      }
    );
  },

  delete: async (token: string, id: string) => {
    return fetchAPI<{ success: boolean; message: string }>(
      `/api/projects/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
