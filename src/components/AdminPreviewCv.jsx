import React from "react";

const AdminPreviewCv = ({ data }) => {
  const { personalInfo, objective, education, experience, skills, avatar } =
    data;

  return (
    <div
      id="cv-preview-content"
      className="bg-white shadow-2xl rounded-3xl overflow-hidden mx-auto border border-slate-200"
      style={{ width: "210mm", minHeight: "297mm", maxWidth: "100%" }}
    >
      <div className="p-10 text-[15px] leading-relaxed text-slate-800">
        {/* Header - Fix đường dẫn Avatar */}
        <div className="flex gap-6 items-start mb-12">
          {(avatar || personalInfo?.avatar) && (
            <img
              src={avatar || personalInfo.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-100 flex-shrink-0 shadow-sm"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-black tracking-tight">
              {personalInfo?.fullName || "Họ và tên"}
            </h1>
            <p className="text-xl text-gray-700 mt-2 font-medium">
              {personalInfo?.title || "Chức danh nghề nghiệp"}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-sm text-gray-600">
              {personalInfo?.email && <span>Email: {personalInfo.email}</span>}
              {personalInfo?.phone && <span>Phone: {personalInfo.phone}</span>}
              {personalInfo?.address && (
                <span>Address: {personalInfo.address}</span>
              )}
              {personalInfo?.github && (
                <span>GitHub: {personalInfo.github}</span>
              )}
              {personalInfo?.linkedin && (
                <span>LinkedIn: {personalInfo.linkedin}</span>
              )}
            </div>
          </div>
        </div>

        {/* Các phần còn lại giữ nguyên style chuẩn Client của bạn */}
        {objective && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-slate-900 pb-2 uppercase tracking-wider">
              Mục tiêu nghề nghiệp
            </h2>
            <p className="whitespace-pre-wrap">{objective}</p>
          </div>
        )}

        {education?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6 border-b-2 border-slate-900 pb-2 uppercase tracking-wider">
              Học vấn
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start bg-slate-50 p-5 rounded-2xl border border-slate-100"
                >
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {edu.school}
                    </h3>
                    <p className="text-slate-600 font-medium">{edu.major}</p>
                  </div>
                  <div className="text-right text-sm text-black">
                    <p className="font-bold">{edu.period}</p>
                    {edu.gpa && (
                      <p className="text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6 border-b-2 border-slate-900 pb-2 uppercase tracking-wider">
              Kinh nghiệm
            </h2>
            <div className="space-y-10">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-8 border-l-2 border-slate-200"
                >
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-4 border-white" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {exp.title}
                      </h3>
                      <p className="text-black font-bold text-sm">{exp.role}</p>
                    </div>
                    <span className="text-sm font-medium text-black-400">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-4 text-slate-600 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6 border-b-2 border-slate-900 pb-2 uppercase tracking-wider">
              Kỹ năng
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {skills.programming?.length > 0 && (
                <div>
                  <p className="font-bold text-slate-900 mb-3 text-sm">
                    Ngôn ngữ
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-black"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.frameworks?.length > 0 && (
                <div>
                  <p className="font-bold text-slate-900 mb-3 text-sm">
                    Frameworks
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-black"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPreviewCv;
