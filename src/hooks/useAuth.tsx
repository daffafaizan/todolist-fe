import { useContext, useEffect } from "react";
import AuthContext from "@/context/authprovider";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Exclude login and register pages from redirection
    const allowedPages = ["/login", "/register"];
    const currentPath = window.location.pathname;

    if (!auth.isAuthenticated && !allowedPages.includes(currentPath)) {
      router.replace("/login");
    }
  }, [auth, router]);

  return { auth, setAuth };
};

export default useAuth;
