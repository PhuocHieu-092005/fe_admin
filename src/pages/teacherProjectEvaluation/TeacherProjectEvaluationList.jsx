import React, { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import teacherService from "../../services/teacherService";
import projectService from "../../services/projectService";
import ProjectDetailModal from "../projectManagement/ProjectDetailModal";
import TeacherEvaluationStats from "./TeacherEvaluationStats";
import TeacherEvaluationTable from "./TeacherEvaluationTable";
import { normalizeProjects } from "./teacherProjectEvaluationUtils";

export default function TeacherProjectEvaluationList() {
  const [projects, setProjects] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPreviousEvaluations, setLoadingPreviousEvaluations] =
    useState(false);
  const [submittingId, setSubmittingId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const preloadPreviousEvaluations = useCallback(async (projectList) => {
    const evaluatedProjects = projectList.filter((project) => project.hasEvaluation);

    if (evaluatedProjects.length === 0) {
      return;
    }

    try {
      setLoadingPreviousEvaluations(true);

      const responses = await Promise.allSettled(
        evaluatedProjects.map((project) =>
          teacherService.getMyEvaluationByProject(project.id),
        ),
      );

      const loadedDrafts = {};

      responses.forEach((result, index) => {
        const projectId = evaluatedProjects[index]?.id;

        if (!projectId || result.status !== "fulfilled") {
          return;
        }

        const evaluation = result.value?.data || result.value;
        loadedDrafts[projectId] = evaluation?.suggestions || "";
      });

      if (Object.keys(loadedDrafts).length > 0) {
        setDrafts((prev) => ({
          ...prev,
          ...loadedDrafts,
        }));
      }
    } catch (error) {
      console.error(
        "Lỗi preload đánh giá cũ của giảng viên:",
        error?.response?.data || error,
      );
    } finally {
      setLoadingPreviousEvaluations(false);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await teacherService.getProjectsForEvaluation();
      const normalizedProjects = normalizeProjects(response);

      setProjects(normalizedProjects);
      setDrafts((prev) => {
        const nextDrafts = {};

        normalizedProjects.forEach((project) => {
          nextDrafts[project.id] = prev[project.id] ?? "";
        });

        return nextDrafts;
      });

      await preloadPreviousEvaluations(normalizedProjects);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách đồ án cho giảng viên đánh giá:",
        error?.response?.data || error,
      );
      setProjects([]);
      Swal.fire(
        "Lỗi",
        "Không thể tải danh sách đồ án cần đánh giá của giảng viên!",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, [preloadPreviousEvaluations]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const stats = useMemo(() => {
    const total = projects.length;
    const evaluated = projects.filter((project) => project.hasEvaluation).length;

    return {
      total,
      evaluated,
      pending: total - evaluated,
    };
  }, [projects]);

  const handleDraftChange = useCallback((projectId, value) => {
    setDrafts((prev) => ({
      ...prev,
      [projectId]: value,
    }));
  }, []);

  const handleOpenProjectDetail = async (projectId) => {
    try {
      setSelectedProjectId(projectId);
      setSelectedProject(null);
      setModalLoading(true);

      const response = await projectService.getProjectById(projectId);
      setSelectedProject(response?.data || response);
    } catch (error) {
      console.error(
        "Lỗi lấy chi tiết đồ án cho giảng viên:",
        error?.response?.data || error,
      );
      setSelectedProjectId(null);
      Swal.fire(
        "Không xem được chi tiết",
        error?.response?.data?.message ||
          "Không thể tải chi tiết đồ án để giảng viên xem trước khi đánh giá!",
        "error",
      );
    } finally {
      setModalLoading(false);
    }
  };

  const handleSubmit = async (project) => {
    const suggestion = drafts[project.id]?.trim();

    if (!suggestion) {
      Swal.fire("Lưu ý", "Vui lòng nhập nội dung đánh giá!", "warning");
      return;
    }

    try {
      setSubmittingId(project.id);

      if (project.hasEvaluation && project.evaluationId) {
        await teacherService.updateProjectEvaluation(project.evaluationId, {
          suggestions: suggestion,
        });
      } else {
        await teacherService.createProjectEvaluation({
          projectId: project.id,
          suggestions: suggestion,
        });
      }

      Swal.fire(
        "Thành công",
        project.hasEvaluation
          ? "Đã cập nhật đánh giá đồ án!"
          : "Đã tạo đánh giá đồ án!",
        "success",
      );

      await fetchProjects();
    } catch (error) {
      console.error(
        "Lỗi lưu đánh giá đồ án của giảng viên:",
        error?.response?.data || error,
      );
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message || "Không thể lưu đánh giá đồ án!",
        "error",
      );
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 text-left text-black">
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-black">
            Đánh giá đồ án cho giảng viên
          </h1>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Xem danh sách đồ án theo học phần phụ trách và tạo nhận xét đánh giá
          </p>
        </div>

        <button
          onClick={fetchProjects}
          disabled={loading}
          className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Đang tải..." : "Tải lại danh sách"}
        </button>
      </div>

      <TeacherEvaluationStats stats={stats} />

      <TeacherEvaluationTable
        projects={projects}
        drafts={drafts}
        loading={loading}
        loadingPreviousEvaluations={loadingPreviousEvaluations}
        submittingId={submittingId}
        onDraftChange={handleDraftChange}
        onOpenProjectDetail={handleOpenProjectDetail}
        onSubmit={handleSubmit}
      />

      <ProjectDetailModal
        id={selectedProjectId}
        project={selectedProject}
        modalLoading={modalLoading}
        actionLoading={false}
        onClose={() => {
          setSelectedProjectId(null);
          setSelectedProject(null);
        }}
        onApprove={() => {}}
        readOnly
      />
    </div>
  );
}
