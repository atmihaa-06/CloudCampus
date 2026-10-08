import {
  Plus,
  Search,
  GraduationCap,
  Users,
  BookOpen,
  Mail,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

function Faculty() {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    specialization: "",
    courses: "",
    students: "",
    status: "Active",
  });

  const API_URL =
    "http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com";

  const fetchFaculty = () => {
    fetch(`${API_URL}/api/faculty`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch faculty");
        }

        return response.json();
      })
      .then((data) => {
        setFacultyMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching faculty:", error);
      });
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddFaculty = async (event) => {
    event.preventDefault();

    setFormError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.role ||
      !formData.specialization ||
      formData.courses === "" ||
      formData.students === ""
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      setAdding(true);

      const response = await fetch(`${API_URL}/api/faculty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.department,
          role: formData.role,
          specialization: formData.specialization,
          courses: Number(formData.courses),
          students: Number(formData.students),
          status: formData.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to add faculty"
        );
      }

      const newFaculty = await response.json();

      setFacultyMembers((previous) => [
        ...previous,
        newFaculty,
      ]);

      setFormData({
        name: "",
        email: "",
        department: "",
        role: "",
        specialization: "",
        courses: "",
        students: "",
        status: "Active",
      });

      setShowAddModal(false);
    } catch (error) {
      console.error(error);
      setFormError(
        error.message || "Unable to add faculty."
      );
    } finally {
      setAdding(false);
    }
  };

  const filteredFaculty = facultyMembers.filter((faculty) => {
    const value = search.toLowerCase();

    return (
      faculty.name.toLowerCase().includes(value) ||
      faculty.department.toLowerCase().includes(value) ||
      faculty.specialization.toLowerCase().includes(value)
    );
  });

  const activeFaculty = facultyMembers.filter(
    (faculty) => faculty.status === "Active"
  ).length;

  const totalCourses = facultyMembers.reduce(
    (total, faculty) => total + faculty.courses,
    0
  );

  return (
    <div className="module-page">

      {/* PAGE HEADING */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC MANAGEMENT</p>

          <h1>Faculty</h1>

          <p className="heading-description">
            Manage faculty members, departments and teaching assignments.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setFormError("");
            setShowAddModal(true);
          }}
        >
          <Plus size={17} />
          Add Faculty
        </button>
      </div>


      {/* STATS */}
      <div className="module-stats">

        <div className="module-stat">
          <div className="module-stat-icon">
            <GraduationCap size={19} />
          </div>

          <div>
            <span>Total Faculty</span>
            <strong>{facultyMembers.length}</strong>
          </div>
        </div>


        <div className="module-stat">
          <div className="module-stat-icon green">
            <Users size={19} />
          </div>

          <div>
            <span>Active Faculty</span>
            <strong>{activeFaculty}</strong>
          </div>
        </div>


        <div className="module-stat">
          <div className="module-stat-icon orange">
            <BookOpen size={19} />
          </div>

          <div>
            <span>Courses Managed</span>
            <strong>{totalCourses}</strong>
          </div>
        </div>

      </div>


      {/* TOOLBAR */}
      <div className="faculty-toolbar">

        <div>
          <h3>Faculty Directory</h3>

          <p>
            View faculty profiles and teaching assignments.
          </p>
        </div>

        <div className="table-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search faculty..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

      </div>


      {/* FACULTY GRID */}
      <div className="faculty-grid">

        {filteredFaculty.map((faculty) => (

          <div
            className="faculty-card"
            key={faculty.id}
          >

            <div className="faculty-card-header">

              <div className="faculty-avatar">
                {faculty.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <button className="icon-button">
                <MoreHorizontal size={18} />
              </button>

            </div>


            <h3>{faculty.name}</h3>

            <p className="faculty-role">
              {faculty.role}
            </p>

            <div className="faculty-department">
              {faculty.department}
            </div>

            <div className="faculty-specialization">

              <span>Specialization</span>

              <strong>
                {faculty.specialization}
              </strong>

            </div>


            <div className="faculty-stats">

              <div>
                <strong>{faculty.courses}</strong>
                <span>Courses</span>
              </div>

              <div>
                <strong>{faculty.students}</strong>
                <span>Students</span>
              </div>

            </div>


            <div className="faculty-footer">

              <div className="faculty-email">

                <Mail size={13} />

                <span>{faculty.email}</span>

              </div>

              <span
                className={`faculty-status ${
                  faculty.status === "Active"
                    ? "active-status"
                    : "inactive-status"
                }`}
              >
                {faculty.status}
              </span>

            </div>

          </div>

        ))}


        {filteredFaculty.length === 0 && (
          <div className="course-empty">
            No faculty members found.
          </div>
        )}

      </div>


      {/* ========================= */}
      {/* ADD FACULTY MODAL */}
      {/* ========================= */}

      {showAddModal && (

        <div
          className="modal-overlay"
          onClick={() => {
            if (!adding) {
              setShowAddModal(false);
            }
          }}
        >

          <div
            className="modal-container"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <p className="eyebrow">
                  ACADEMIC MANAGEMENT
                </p>

                <h2>Add Faculty</h2>

                <p>
                  Create a new faculty profile.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  !adding && setShowAddModal(false)
                }
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={handleAddFaculty}>

              <div className="modal-body">

                <div className="form-group">
                  <label>Faculty Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Dr. Priya Sharma"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="faculty@cloudcampus.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Department</label>

                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Role</label>

                  <input
                    type="text"
                    name="role"
                    placeholder="e.g. Assistant Professor"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Specialization</label>

                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g. Artificial Intelligence"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Courses Managed</label>

                  <input
                    type="number"
                    name="courses"
                    min="0"
                    placeholder="e.g. 3"
                    value={formData.courses}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Students</label>

                  <input
                    type="number"
                    name="students"
                    min="0"
                    placeholder="e.g. 120"
                    value={formData.students}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>


                {formError && (
                  <div className="form-error">
                    {formError}
                  </div>
                )}

              </div>


              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    !adding &&
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={adding}
                >
                  {adding
                    ? "Adding..."
                    : "Add Faculty"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Faculty;