import { create } from 'zustand';
import { api } from '../lib/clients';
import toast from 'react-hot-toast';
import { LoginResponse, Note, SessionReponse, User } from '../lib/types';
import { isAxiosError } from 'axios';


interface AuthState {
  user: User | null;
  notes: Note[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string, confirmPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getSsession: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  notes: [],
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const data: LoginResponse = response.data;

      set({
        isAuthenticated: true,
        user: {
          id: data.userId,
          username: data.username
        },
        notes: data.notes
      })

    } catch {
      toast.error("Invalid credentials!");
      return false;
    }
    return true;
  },

  signup: async (username: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return false;
    }
    try {
      const response = await api.post("/auth/signup", { username, password });
      const data: LoginResponse = response.data;

      set({
        isAuthenticated: true,
        user: {
          id: data.userId,
          username: data.username
        },
        notes: data.notes
      });
      return true;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error signing up!");
      }
    }
    return false;
  },
  getSsession: async () => {
    try {
      const response = await api.get("/auth/session");
      const data: SessionReponse = response.data;
      set({
        isAuthenticated: true,
        user: {
          id: data.userId,
          username: data.username
        },
        notes: data.notes
      });
    } catch {
      return false;
    }
    return true;
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      toast.success("Logout successful");
      window.location.href = "/auth";
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error logging out!");
      }
    }

  },
}));