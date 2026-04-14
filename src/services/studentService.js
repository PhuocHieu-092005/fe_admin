import api from "./api";

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const updateStudentByAdmin = async (id, payload) => {
  const response = await api.put(`/students/${id}`, payload);
  return response.data;
};

export const deleteStudentByAdmin = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

const studentService = {
  getStudents,
  getStudentById,
  updateStudentByAdmin,
  deleteStudentByAdmin,
};

export default studentService;