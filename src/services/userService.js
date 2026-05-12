import api from "./api";

export const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const changePassword = async (payload) => {
  const response = await api.put("/user/change-password", {
    old_password: payload.oldPassword,
    new_password: payload.newPassword,
  });

  return response.data;
};

const userService = {
  getCurrentUser,
  changePassword,
};

export default userService;