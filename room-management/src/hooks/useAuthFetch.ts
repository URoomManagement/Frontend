export function useAuthFetch() {
  const authFetch = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          return await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
              ...options.headers,
              'Content-Type': 'application/json',
            },
          });
        } else {
          window.location.href = '/login';
          return;
        }
      }

      return response;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  };

  return { authFetch };
}