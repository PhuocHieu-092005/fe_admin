import api from "./api";

export const getTeachers = async () => {
  const response = await api.get("/teachers");
  return response.data;
};

export const getTeacherById = async (id) => {
  const response = await api.get(`/teachers/${id}`);
  return response.data;
};

export const deleteTeacherById = async (id) => {
  const response = await api.delete(`/teachers/${id}`);
  return response.data;
};
// tạo tài khoản teacher
export const createTeacherAccount = async (payload) => {
  const response = await api.post("/auth/admin/register", {
    email: payload.email,
    password: payload.password,
    role: "TEACHER",
    createdByAdmin: true,
    full_name: payload.full_name,
  });

  return response.data;
};

export const getProjectsForEvaluation = async () => {
  const response = await api.get("/teacher/projects-for-evaluation");
  return response.data;
};

export const createProjectEvaluation = async (payload) => {
  const response = await api.post("/teacher/project-evaluations", payload);
  return response.data;
};

export const updateProjectEvaluation = async (evaluationId, payload) => {
  const response = await api.put(
    `/teacher/project-evaluations/${evaluationId}`,
    payload,
  );
  return response.data;
};

export const getMyEvaluationByProject = async (projectId) => {
  const response = await api.get(`/teacher/projects/${projectId}/my-evaluation`);
  return response.data;
};

const teacherService = {
  getTeachers,
  getTeacherById,
  deleteTeacherById,
  createTeacherAccount,
  getProjectsForEvaluation,
  createProjectEvaluation,
  updateProjectEvaluation,
  getMyEvaluationByProject,
};

export default teacherService;
