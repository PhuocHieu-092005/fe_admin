
import { useEffect, useState } from "react";
import jobService from "../../services/jobService";
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState("PENDING");

  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetail = async (id) => {
    try {
      const response = await jobService.getJobDetail(id);
      setSelectedJob(response.data);
    } catch (err) {
      window.alert(err);
    }
  };
  const fetchJobs = async () => {
    try {
    
      const reponse = currentTab ==="PENDING"
      ? await jobService.getPendingJobs()
      : await jobService.getActiveJobs();
      setJobs(reponse.data);
    } catch (err) {
      console.log("Không thể tải danh sách công việc");
      setError(err);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs();
  }, [currentTab]);
  const handleCloseJob = async (id) => {
    if (!window.confirm("Bạn có chắc muốn đóng tin tuyển dụng này ")) return;
    try {
      await jobService.closeJobByAdmin(id);
      fetchJobs(currentTab);
      window.alert("Thành công");
    } catch (err) {
      setError(err);
    }
  };
  const handleApprove = async (id, action) => {
    const actionText = action === "APPROVE" ? "phê duyệt" : "từ chối";
    const isComfirmed = window.confirm(
      `Xác nhận: Bạn có chắc chắn muốn ${actionText}`,
    );
    if (isComfirmed) {
      try {
        await jobService.approveJob(id,action);
        window.alert(`Thành công: Đã ${actionText} bài viết`);
        fetchJobs();
      } catch (err) {
        console.log("Không thể tải danh sách công việc");
        setError(err);
      }
    }
  };
  return (
    <>
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            {/* Nút đóng nhanh */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            {/* Header Modal: Logo + Tiêu đề */}
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <img
                src={
                  selectedJob.companyLogo 
                }
                alt="logo"
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-500 font-medium">
                  {selectedJob.companyName}
                </p>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400">Hình thức làm việc</span>
                <span className="font-semibold text-gray-700">
                  {selectedJob.jobType}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Địa điểm</span>
                <span className="font-semibold text-gray-700">
                  {selectedJob.workLocation}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Mức lương</span>
                <span className="font-semibold text-emerald-600">
                  {selectedJob.salary
                    ? `${selectedJob.salary.toLocaleString()} VNĐ`
                    : "Thỏa thuận"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Lượt xem tin</span>
                <span className="font-semibold text-blue-600">
                  {selectedJob.viewCount} lượt
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Ngày bắt đầu</span>
                <span className="font-semibold">
                  {new Date(selectedJob.startDay).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Hạn cuối</span>
                <span className="font-semibold text-rose-500">
                  {new Date(selectedJob.endDay).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>

            {/* File đính kèm */}
            {selectedJob.jdFileUrl && (
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <h4 className="font-bold text-indigo-800 mb-1">
                  Tài liệu đính kèm (JD)
                </h4>
                <a
                  href={selectedJob.jdFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline flex items-center gap-2"
                >
                  <span>📄</span> Xem chi tiết tệp mô tả công việc
                </a>
              </div>
            )}

            {/* Nút hành động (Footer) */}
            <div className="mt-8 flex justify-end gap-3 border-t pt-5">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Đóng
              </button>
              {currentTab === "PENDING" && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedJob.id, "REJECT");
                      setSelectedJob(null);
                    }}
                    className="px-5 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all font-medium"
                  >
                    Từ chối bài
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedJob.id, "APPROVE");
                      setSelectedJob(null);
                    }}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
                  >
                    Phê duyệt ngay
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="flex gap-4 mb-6 border-b pb-4">
          <button
            onClick={() => setCurrentTab("PENDING")}
            className={`px-4 py-2 rounded-lg font-medium ${currentTab === "PENDING" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Chờ phê duyệt
          </button>
          <button
            onClick={() => setCurrentTab("APPROVED")}
            className={`px-4 py-2 rounded-lg font-medium ${currentTab === "APPROVED" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Đã phê duyệt
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Kiểm duyệt tin tuyển dụng
          </h2>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
            {jobs.length} tin chờ duyệt
          </span>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4 border-b font-semibold">Công việc</th>
                <th className="p-4 border-b font-semibold">Công ty</th>
                <th className="p-4 border-b font-semibold">Mức lương</th>
                <th className="p-4 border-b font-semibold">Ngày hết hạn</th>
                <th className="p-4 border-b font-semibold text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-indigo-600">{job.title}</p>
                    <p className="text-xs text-gray-400">ID: #{job.id}</p>
                  </td>
                  <td className="p-4 font-medium">{job.companyName}</td>
                  <td className="p-4 text-emerald-600 font-semibold">
                    {job.salary ? job.salary.toLocaleString() : "Thỏa thuận"}{" "}
                    VNĐ
                  </td>
                  <td className="p-4 text-sm">
                    {new Date(job.endDay).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleViewDetail(job.id)}
                        className="px-3 py-1.5 bg-yellow-600 text-white rounded-md text-sm hover:bg-green-700 transition-all"
                      >
                        Chi tiết
                      </button>
                      {currentTab === "PENDING" ? (
                        <>
                          {" "}
                          <button
                            onClick={() => handleApprove(job.id, "APPROVE")}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-all"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleApprove(job.id, "REJECT")}
                            className="px-3 py-1.5 bg-rose-500 text-white rounded-md text-sm hover:bg-rose-600 transition-all"
                          >
                            Từ chối
                          </button>{" "}
                        </>
                      ) : (
                        <button
                          onClick={() => handleCloseJob(job.id)}
                          className="px-3 py-1.5 bg-gray-600 text-white rounded-md text-sm"
                        >
                          Đóng tin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-gray-400 italic"
                  >
                    Không có tin nào đang chờ duyệt.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
