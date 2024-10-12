import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      await axios.get("/api/v1/profile").then(({ data }) => {
        setUser(data);
      });
    } catch (error) {
      console.log("Something happened in context.jsx");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
