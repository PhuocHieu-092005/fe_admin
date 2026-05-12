import api from "./api";

const getProjectAccessRequests = async (page = 0, size = 10) => {
  const response = await api.get("/project-access-requests", {
    params: { page, size },
  });
  return response.data;
};

const getProjectAccessRequestDetail = async (id) => {
  const response = await api.get(`/project-access-requests/${id}`);
  return response.data;
};

const updateProjectAccessRequestStatus = async (id, payload) => {
  // { status: "...", approval_note: "..." }
  const response = await api.patch(
    `/project-access-requests/${id}/status`,
    payload 
  );
  return response.data;
};

const projectAccessRequestService = {
  getProjectAccessRequests,
  getProjectAccessRequestDetail,
  updateProjectAccessRequestStatus,
};

export default projectAccessRequestService;