export function useAuthFetch() {
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }

    return response;
  };

  return { authFetch };
}