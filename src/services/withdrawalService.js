import api from "./api";

export const getAdminWithdrawals = async () => {
  const response = await api.get("/withdrawals/admin");
  return response.data;
};

export const updateAdminWithdrawal = async (id, payload) => {
  const response = await api.patch(`/withdrawals/admin/${id}`, payload);
  return response.data;
};

const withdrawalService = {
  getAdminWithdrawals,
  updateAdminWithdrawal,
};

export default withdrawalService;
