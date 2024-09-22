import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from "react";

interface User {
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserInfo: (name: string, picture: string) => void;
  updateEmail: (email: string) => void; // New method for updating email
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const validCredentials =
      email === "test@example.com" && password === "tc4tuo5r7T58^FE4xd";
    if (validCredentials) {
      const loggedInUser = {
        email,
        name: "John Doe",
        picture: "/path/to/profile.jpg"
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      throw new Error("Invalid credentials");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const updateUserInfo = useCallback((name: string, picture: string) => {
    setUser(prevUser => {
      if (prevUser) {
        const updatedUser = { ...prevUser, name, picture };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    });
  }, []);

  const updateEmail = useCallback((email: string) => {
    setUser(prevUser => {
      if (prevUser) {
        const updatedUser = { ...prevUser, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUserInfo, updateEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
