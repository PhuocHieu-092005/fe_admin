import api from "./api";

export const getNotifications = async () => {
  const response = await api.get("/notifications/me");
  return response.data.data;
};
export const readNotification = async (id)=>{
    await api.patch(`/notifications/${id}/read`);
}
const notificationService = {
  getNotifications,
  readNotification
};

export default notificationService;