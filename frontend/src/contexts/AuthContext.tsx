import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, UserResponse, LoginRequest, RegisterRequest } from '@/lib/api';

interface AuthContextType {
  user: UserResponse | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 앱 시작 시 저장된 토큰으로 사용자 정보 가져오기
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        // 토큰이 유효하지 않으면 제거
        authApi.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (data: LoginRequest) => {
    await authApi.login(data);
    const userData = await authApi.getCurrentUser();
    setUser(userData);
  };

  const register = async (data: RegisterRequest) => {
    await authApi.register(data);
    // 회원가입 후 자동 로그인하지 않음 - 사용자가 직접 로그인해야 함
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

