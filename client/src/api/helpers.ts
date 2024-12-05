export const fetchWrapper = async (url: string, options?: RequestInit) => {
  const response = await fetch(
    url,
    options
      ? {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
          },
        }
      : undefined
  );
  if (!response.ok) {
    const error = await response.text();
    throw error;
  }
  return response.json();
};
