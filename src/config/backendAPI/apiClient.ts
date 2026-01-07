import { getIdToken } from "../Firebase/auth";

/**
 * This module provides a configured API client wrapper for making requests to the backend server.
 * It includes functionality to automatically attach the Firebase ID token for authenticated requests.
 */
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const baseUrl = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`;
    const token = await getIdToken();

    const responseFromFetch = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers || {},
        },
    });
    if (!responseFromFetch.ok) {
        throw new Error(`API request failed with status ${responseFromFetch.status}`);
    }
    return responseFromFetch.json() as Promise<any>;
}