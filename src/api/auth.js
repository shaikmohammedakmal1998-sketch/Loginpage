import api from "./axios";

export const loginUser = async (payload) => {
  const response = await api.post("/api/users/login", payload);
  return response.data;
};
