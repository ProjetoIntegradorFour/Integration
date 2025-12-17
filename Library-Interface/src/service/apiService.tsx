import { getToken, logout } from './authService';

const API_BASE_URL = "http://localhost:8080/api";

class ApiService {
    private async request(endpoint: string, options: RequestInit = {}) {
        const token = getToken();
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        let response;
        try {
            response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        } catch (error: unknown) {
            throw new Error("Network error: " + error.message);
        }

        if (response.status === 401 || response.status === 403) {
            if (getToken()) {
                logout();
                window.location.href = "/login";
            }
            throw new Error("Authentication required");
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    get(endpoint: string) { return this.request(endpoint); }
    post(endpoint: string, data: any) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); }
    put(endpoint: string, data: any) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }); }
    delete(endpoint: string) { return this.request(endpoint, { method: 'DELETE' }); }
}

export const apiService = new ApiService();