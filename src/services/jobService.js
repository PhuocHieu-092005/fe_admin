import api from "./api"; // Giả sử file api.js đã cấu hình axios với baseURL và interceptors cho token

export const getPendingJobs = async () => {
  const response = await api.get("/admins/jobs/pending");
  return response.data;
};

export const getActiveJobs = async () => {
  const response = await api.get("/jobs/active");
  return response.data;
};

export const getJobDetail = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const approveJob = async (id, action) => {
  const response = await api.patch(`/admins/jobs/${id}/approve`, {}, {
    params: { action: action }
  });
  return response.data;
};

export const closeJobByAdmin = async (id) => {
  const response = await api.patch(`/admins/jobs/${id}/close`);
  return response.data;
};

const jobService = {
  getPendingJobs,
  getActiveJobs,
  getJobDetail,
  approveJob,
  closeJobByAdmin
};

export default jobService;