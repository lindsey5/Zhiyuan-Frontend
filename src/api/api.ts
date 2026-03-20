interface ExtendedRequestInit extends RequestInit {
  responseType?: "json" | "blob";
}

export const apiClient = async <T>(
  endpoint: string,
  options: ExtendedRequestInit = {},
): Promise<T> => {
  const token = localStorage.getItem("token");

  const { responseType = "json", ...fetchOptions } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = options.body instanceof FormData;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const mergedHeaders: Record<string, string> = {
    ...headers,
    ...(options.headers as Record<string, string>),
  };

  if (isFormData) {
    delete mergedHeaders["Content-Type"];
  }

  const config: ExtendedRequestInit = {
    ...fetchOptions,
    headers: mergedHeaders,
  };

  try {
    const response = await fetch(`/api/${endpoint}`, config);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      throw new Error(data?.message || "API request failed");
    }

    return data as T;
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
};
