import api from "./api";

// 1. DÀNH CHO PUBLIC (Trang chủ)
export const getPublicProjects = async (params = {}) => {
  const queryParams = {
    title: params.title || undefined,
    technologyId: params.technologyId || undefined,
    page: params.page ?? 0,
    size: params.size ?? 9,
  };
  const response = await api.get("/projects", { params: queryParams });
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// 2. DÀNH CHO SINH VIÊN (Portal)
export const getMyProjects = async () => {  
  const response = await api.get("/projects/me/projects");
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (id, formData) => {
  const response = await api.put(`/projects/${id}`, formData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// 3. DÀNH CHO ADMIN
export const getAdminProjects = async (params = {}) => {
  const queryParams = {
    page: params.page ?? 0,
    size: params.size ?? 10,
  };
  const response = await api.get("/projects/admin", { params: queryParams });
  return response.data;
};

export const updateProjectStatus = async (id, status, adminNote) => {
  const response = await api.patch(`/projects/${id}/status`, {
    status,
    admin_note: adminNote,
  });
  return response.data;
};

const projectService = {
  getPublicProjects,
  getProjectById,
  getMyProjects,
  createProject,
  updateProject,
  deleteProject,
  getAdminProjects,
  updateProjectStatus,
};

export default projectService;