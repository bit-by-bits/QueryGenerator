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
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserInfo: (name: string, picture: string) => void;
  updateEmail: (email: string) => void;
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
        name: "User",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      throw new Error("Invalid credentials");
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      const newUser = {
        email,
        name,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    []
  );

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
      value={{ user, login, signup, logout, updateUserInfo, updateEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
