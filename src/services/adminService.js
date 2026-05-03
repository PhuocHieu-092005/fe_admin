import api from "./api";

export const getMyAdminProfile = async () => {
  const response = await api.get("/admins/me");
  return response.data;
};

export const getAdminLogs = async (params = {}) => {
  const queryParams = {
    page: params.page ?? 0,
    size: params.size ?? 10,
  };

  const response = await api.get("/admins/logs", { params: queryParams });
  return response.data;
};

const adminService = {
  getMyAdminProfile,
  getAdminLogs,
};

export default adminService;
