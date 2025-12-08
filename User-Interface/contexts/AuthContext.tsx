import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { login as loginService } from "@/services/auth";

type User = { token: string } | null;

type AuthContextType = {
  user: User;
  signIn: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  // Carrega token do AsyncStorage ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setUser({ token });
    };
    loadUser();
  }, []);

  // Função de login que usa o service
  const signIn = async (cpf: string, password: string) => {
    const data = await loginService(cpf, password); // chama backend
    await AsyncStorage.setItem("token", data.accessToken);
    setUser({ token: data.accessToken });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
