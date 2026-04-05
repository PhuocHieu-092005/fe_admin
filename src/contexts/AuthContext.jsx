import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi parse data user:", error);
        localStorage.removeItem("admin_user"); // Dọn dẹp nếu data bị lỗi
      }
    }
    setLoading(false);
  }, []);

  const login = (token, role, fullName, avatarUrl) => {
    const userData = {
      token,
      role,
      fullName,
      avatarUrl,
    };

    setUser(userData);

    localStorage.setItem("admin_user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("admin_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
