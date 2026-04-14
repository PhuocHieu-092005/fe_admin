import api from "./api";

export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const createCourse = async (payload) => {
  const response = await api.post("/admin/courses", payload);
  return response.data;
};

export const updateCourse = async (id, payload) => {
  const response = await api.put(`/admin/courses/${id}`, payload);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/admin/courses/${id}`);
  return response.data;
};

export const assignTeacherToCourse = async (courseId, teacherId) => {
  const response = await api.post(
    `/admin/courses/${courseId}/teachers/${teacherId}`,
  );
  return response.data;
};

export const removeTeacherFromCourse = async (courseId, teacherId) => {
  const response = await api.delete(`/courses/${courseId}/teachers/${teacherId}`);
  return response.data;
};

const courseService = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  assignTeacherToCourse,
  removeTeacherFromCourse,
};

export default courseService;