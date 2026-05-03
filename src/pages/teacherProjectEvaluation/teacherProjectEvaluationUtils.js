export const statusMeta = {
  PENDING: {
    label: "Chờ duyệt",
    className: "border-amber-500 text-amber-600 bg-amber-50",
  },
  APPROVED: {
    label: "Đã duyệt",
    className: "border-emerald-500 text-emerald-600 bg-emerald-50",
  },
  REJECTED: {
    label: "Từ chối",
    className: "border-rose-500 text-rose-600 bg-rose-50",
  },
  CLOSE: {
    label: "Đã đóng",
    className: "border-slate-400 text-slate-500 bg-slate-100",
  },
};

export const getProjectStatusMeta = (status) => {
  return (
    statusMeta[status] || {
      label: status || "Không xác định",
      className: "border-slate-300 text-slate-500 bg-slate-50",
    }
  );
};

export const normalizeProjects = (response) => {
  const rawList = response?.data || [];

  if (!Array.isArray(rawList)) {
    return [];
  }

  return rawList.map((item) => ({
    id: item.project_id,
    projectTitle: item.project_title || "Chưa có tiêu đề",
    studentName: item.student_name || "Chưa có sinh viên",
    courseName: item.course_name || "Chưa có học phần",
    status: item.status || "PENDING",
    hasEvaluation: Boolean(item.has_evaluation),
    evaluationId: item.evaluation_id || null,
  }));
};
