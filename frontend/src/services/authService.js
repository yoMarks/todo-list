import { API_BASE_URL } from "../config/api";

const AUTH_URL = `${API_BASE_URL}/auth`;

const TOKEN_KEY = "todo_auth_token";
const USER_KEY = "todo_auth_user";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Error en autenticación");
  }

  return data;
}

function saveSession(data) {
  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  if (data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await handleResponse(response);
  saveSession(data);

  return data;
}

export async function loginUser(email, password) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);
  saveSession(data);

  return data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    logout();
    return null;
  }
}

export function getAuthHeaders() {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}