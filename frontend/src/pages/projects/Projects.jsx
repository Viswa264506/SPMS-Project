import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

function Projects() {

  const [projects, setProjects] = useState([
    { id: 1, name: "HR Management System", employee: "John Doe" },
    { id: 2, name: "Employee Portal", employee: "Jane Smith" }
  ]);

  const [projectName, setProjectName] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const addProject = (e) => {
    e.preventDefault();

    if (!projectName || !employeeName) return;

    const newProject = {
      id: Date.now(),
      name: projectName,
      employee: employeeName
    };

    setProjects([newProject, ...projects]);

    setProjectName("");
    setEmployeeName("");
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  return (
    <div className="p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Project Management
      </h1>

      {/* Add Project Card */}
      <div className="bg-white shadow-lg rounded-2xl p-5 mb-6">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add New Project
        </h2>

        <form
          onSubmit={addProject}
          className="grid md:grid-cols-3 gap-4"
        >

          <input
            type="text"
            placeholder="Project Name"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none p-2 rounded-lg"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Assign Employee"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none p-2 rounded-lg"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />

          <button
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition"
          >
            <Plus size={18} />
            Add Project
          </button>

        </form>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
          >

            {/* Project Name */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {proj.name}
            </h3>

            {/* Employee */}
            <p className="text-gray-500 text-sm mb-4">
              Assigned to:
              <span className="font-medium text-gray-700 ml-1">
                {proj.employee}
              </span>
            </p>

            {/* Avatar */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  {proj.employee.charAt(0)}
                </div>
                <span className="text-sm text-gray-600">
                  {proj.employee}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteProject(proj.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;