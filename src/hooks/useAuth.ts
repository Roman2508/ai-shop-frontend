import { authStore } from "@/store/auth/auth.store";

export const useAuth = () => {
  const isAuthentificated = authStore((state) => state.isAuthentificated);
  const setIsAuthentificated = authStore((state) => state.setIsAuthentificated);

  const auth = () => setIsAuthentificated(true);
  const exit = () => setIsAuthentificated(false);

  return { isAuthentificated, auth, exit };
};
