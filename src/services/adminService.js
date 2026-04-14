import api from "./api";

export const getMyAdminProfile = async () => {
  const response = await api.get("/admins/me");
  return response.data;
};

const adminService = {
  getMyAdminProfile,
};

export default adminService;