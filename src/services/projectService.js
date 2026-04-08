import api from "./api";

/**
 * Service quản lý toàn bộ logic liên quan đến Đồ án (Projects)
 * Đã xóa bỏ các chữ /api thừa để tránh trùng lặp với baseURL
 */

// 1. DÀNH CHO PUBLIC (Trang chủ)
export const getPublicProjects = async (params = {}) => {
  const queryParams = {
    title: params.title || undefined,
    technologyId: params.technologyId || undefined,
    page: params.page ?? 0,
    size: params.size ?? 9,
  };
  // Sửa: bỏ /api ở đầu
  const response = await api.get("/projects", { params: queryParams });
  return response.data;
};

export const getProjectById = async (id) => {
  // Sửa: bỏ /api ở đầu
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// 2. DÀNH CHO SINH VIÊN (Portal)
export const getMyProjects = async () => {
  // Sửa: bỏ /api ở đầu
  const response = await api.get("/projects/me/projects");
  return response.data;
};

export const createProject = async (projectData) => {
  // Sửa: bỏ /api ở đầu
  const response = await api.post("/projects", projectData);
  return response.data;
};

// 3. DÀNH CHO ADMIN & TEACHER (Admin Dashboard)
export const getAdminProjects = async () => {
  // SỬA QUAN TRỌNG: Bỏ /api để không thành /api/api
  const response = await api.get("/projects/admin");
  return response.data;
};

export const updateProjectStatus = async (id, status) => {
  // Sửa: bỏ /api ở đầu
  const response = await api.patch(`/projects/${id}/status`, null, {
    params: { status: status },
  });
  return response.data;
};

const projectService = {
  getPublicProjects,
  getProjectById,
  getMyProjects,
  createProject,
  getAdminProjects,
  updateProjectStatus,
};

export default projectService;