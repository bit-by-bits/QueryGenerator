import { createContext, useState, ReactNode, useCallback } from "react";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const validCredentials =
      email === "test@example.com" && password === "tc4tuo5r7T58^FE4xd";
    if (validCredentials) {
      setUser(email);
    } else {
      throw new Error("Invalid credentials");
    }
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
