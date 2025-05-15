import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthDialogOpen: boolean;
  initialAuthTab: 'login' | 'register';
  openAuthDialog: (tab?: 'login' | 'register') => void;
  closeAuthDialog: () => void;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const [initialAuthTab, setInitialAuthTab] = useState<'login' | 'register'>('login');

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation (would be done server-side in a real app)
        if (email && password.length >= 6) {
          // Create mock user
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: email.split("@")[0], // Extract name from email
            email,
          };

          // Save user to state
          setUser(newUser);
          setIsAuthenticated(true);

          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(newUser));

          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          resolve(true);
        } else {
          resolve(false);
        }
      }, 800); // Simulate network delay
    });
  };

  // Mock register function - in a real app, this would call an API
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation (would be done server-side in a real app)
        if (name && email && password.length >= 6) {
          // Create mock user
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
          };

          // Save user to state
          setUser(newUser);
          setIsAuthenticated(true);

          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(newUser));

          resolve(true);
        } else {
          resolve(false);
        }
      }, 800); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    // Clear authentication state
    setUser(null);
    setIsAuthenticated(false);

    // Clear from localStorage (except rememberedEmail)
    localStorage.removeItem("user");

    // In a real app, you might also invalidate tokens on the server
  };

  // Update user profile
  const updateUserProfile = async (
    userData: Partial<User>
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...userData };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };
  // Open auth dialog
  const openAuthDialog = (tab: 'login' | 'register' = 'login') => {
    setInitialAuthTab(tab);
    setIsAuthDialogOpen(true);
  };

  // Close auth dialog
  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthDialogOpen,
        initialAuthTab,
        openAuthDialog,
        closeAuthDialog,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
