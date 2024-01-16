import useAuth from "./useAuth";

const useRefreshToken = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`;
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log(auth.refreshToken);
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${auth.refreshToken}`, // Include the refresh token in the request headers
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAuth((prev: any) => {
          return { ...prev, accessToken: data.accessToken };
        });
        return data.accessToken;
      } else {
        console.error("Failed to refresh token.");
      }
    } catch (error) {
      console.error("Error refreshing token: ", error);
    }
  };

  return refresh;
};

export default useRefreshToken;
