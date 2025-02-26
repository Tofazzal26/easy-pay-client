import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUserData, setAllUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    refetch: headerRefetch,
    isLoading,
    data: headerUserData = {},
  } = useQuery({
    queryKey: ["headerUserData", user],
    queryFn: async () => {
      const resp = await axiosPublic.get(`/userData/${user?.email}`);
      return resp?.data;
    },
  });

  const allInfo = {
    user,
    setUser,
    loading,
    setLoading,
    allUserData,
    setAllUserData,
    headerUserData,
    headerRefetch,
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await axiosPublic.get("/verifyToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // console.log("User is authenticated:", response.data);
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(
        "Error during token verification:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  useEffect(() => {
    const findUserData = async () => {
      if (!user?.email) return;
      const resp = await axiosPublic.get(`/userData/${user?.email}`);
      setAllUserData(resp?.data);
    };
    findUserData();
  }, [user]);

  return (
    <AuthContext.Provider value={allInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
