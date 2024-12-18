import { API_ROUTES } from '@/config/api'
import type { UserProfileData } from "@/lib/validation"
import type { User } from "@/types/user"

export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(API_ROUTES.login, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.text();
    let data;
    try {
      data = JSON.parse(responseData);
    } catch (_) {
      if (!response.ok) {
        throw new Error(responseData || "Failed to login");
      }
      throw new Error("Invalid response format");
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    return data.user as User;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function logout() {
  await fetch(API_ROUTES.logout, {
    method: "POST",
    credentials: "include",
  });
}

export async function register(data: UserProfileData) {
  try {
    const response = await fetch(API_ROUTES.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    return true;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}
