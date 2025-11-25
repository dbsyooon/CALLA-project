const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  username: string;
  created_at: string;
}

// 토큰 관리
export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('access_token');
};

// API 요청 헬퍼
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: '알 수 없는 오류가 발생했습니다.' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 인증 API
export const authApi = {
  register: async (data: RegisterRequest): Promise<UserResponse> => {
    return apiRequest<UserResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await apiRequest<TokenResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setToken(response.access_token);
    return response;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    return apiRequest<UserResponse>('/api/users/me');
  },

  logout: (): void => {
    removeToken();
  },
};

// 분석 API
export interface AnalyzeRequest {
  user_input: string;
}

export interface AnalyzeResponse {
  response: string;
}

export const analysisApi = {
  analyze: async (data: AnalyzeRequest): Promise<AnalyzeResponse> => {
    return apiRequest<AnalyzeResponse>('/api/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

