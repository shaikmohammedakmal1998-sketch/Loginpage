import api from "./axios";

// 🔐 LOGIN API
export const loginUser = async ({ username, password }) => {
  const response = await api.post("/api/users/login", {
    email: username,
    pswd: password,
  });

  return response.data;
};

// 🔓 LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("loggedUser");
};

// 👤 GET LOGGED USER
export const getLoggedUser = () => {
  const user = localStorage.getItem("loggedUser");
  return user ? JSON.parse(user) : null;
};

// ✅ CHECK AUTH
export const isAuthenticated = () => {
  return !!localStorage.getItem("loggedUser");
};
