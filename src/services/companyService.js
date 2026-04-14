import api from "./api";

export const getCompanies = async () => {
  const response = await api.get("/companies");
  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

export const deleteCompanyByAdmin = async (id) => {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
};

export const updateCompanyStatusByAdmin = async (id, status, adminId) => {
  const response = await api.put(`/companies/${id}`, {
    status,
    adminId,
  });
  return response.data;
};

const companyService = {
  getCompanies,
  getCompanyById,
  deleteCompanyByAdmin,
  updateCompanyStatusByAdmin,
};

export default companyService;