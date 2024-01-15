import { useContext, useEffect } from "react";
import AuthContext from "@/context/authprovider";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/login");
    }
  }, [auth, router]);

  return { auth, setAuth };
};

export default useAuth;
