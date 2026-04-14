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

const teacherService = {
  getTeachers,
  getTeacherById,
  deleteTeacherById,
};

export default teacherService;