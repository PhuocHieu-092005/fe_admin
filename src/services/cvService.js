import axiosInstance from "./api";
const cvService = {
  // Lấy danh sách TẤT CẢ CV (Dành cho Admin)
  getAllCvs: async () => {
    const response = await axiosInstance.get("/cvs");
    return response.data;
  },

  // Lấy chi tiết một CV theo ID
  getCvById: async (id) => {
    const response = await axiosInstance.get(`/cvs/${id}`);
    return response.data;
  },

  // API Lấy link preview PDF hoặc nội dung JSON
  previewCv: async (id) => {
    const response = await axiosInstance.get(`/cvs/${id}/preview`);
    return response.data;
  },

  // Phê duyệt hoặc từ chối CV
  approveCv: async (id, status, adminNote) => {
    // status là chuỗi "APPROVED" hoặc "REJECTED"
    const payload = {
      status: status,
      admin_note: adminNote,
    };

    const response = await axiosInstance.put(`/cvs/${id}/approve`, payload);
    return response.data;
  },
};

export default cvService;
