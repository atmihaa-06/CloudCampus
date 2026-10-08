import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  Download,
  X,
} from "lucide-react";

const API_URL =
  "http://cloudcampus-alb-126996037.ap-south-1.elb.amazonaws.com";

function Students() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });

  const fetchStudents = () => {
    setLoading(true);

    fetch(`${API_URL}/api/students`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load students from the backend.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();

    setFormError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department.trim() ||
      !formData.year
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department.trim(),
          year: Number(formData.year),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to add student."
        );
      }

      setFormData({
        name: "",
        email: "",
        department: "",
        year: "",
      });

      setShowModal(false);

      fetchStudents();
    } catch (err) {
      console.error(err);
      setFormError(err.message || "Unable to add student.");
    } finally {
      setSubmitting(false);
    }
  };

  const formattedStudents = students.map((student) => ({
    id: `CC${String(student.id).padStart(3, "0")}`,
    name: student.name,
    email: student.email,
    department: student.department,
    year: `${student.year}${
      student.year === 1
        ? "st"
        : student.year === 2
        ? "nd"
        : student.year === 3
        ? "rd"
        : "th"
    } Year`,
    attendance: "—",
    status: "Active",
  }));

  const filteredStudents = formattedStudents.filter((student) => {
    const searchValue = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.id.toLowerCase().includes(searchValue) ||
      student.department.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="module-page">
      {/* PAGE HEADER */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC MANAGEMENT</p>

          <h1>Students</h1>

          <p className="heading-description">
            Manage student records and academic information.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setFormError("");
            setShowModal(true);
          }}
        >
          <Plus size={17} />
          Add Student
        </button>
      </div>

      {/* STATS */}
      <div className="module-stats">
        <div className="module-stat">
          <div className="module-stat-icon">
            <Users size={19} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon green">
            <Users size={19} />
          </div>

          <div>
            <span>Active Students</span>
            <strong>{students.length}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon orange">
            <Users size={19} />
          </div>

          <div>
            <span>New This Month</span>
            <strong>—</strong>
          </div>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="table-card">
        <div className="table-toolbar">
          <div>
            <h3>Student Directory</h3>

            <p>
              View and manage registered students.
            </p>
          </div>

          <div className="table-actions">
            <div className="table-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <button className="secondary-button">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          {loading && (
            <div className="empty-state">
              Loading students...
            </div>
          )}

          {error && (
            <div className="empty-state">
              {error}
            </div>
          )}

          {!loading && !error && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-cell">
                        <div className="student-avatar">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{student.name}</strong>

                          <span>
                            {student.id} · {student.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>{student.department}</td>

                    <td>{student.year}</td>

                    <td>
                      <span className="attendance-value">
                        {student.attendance}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`student-status ${
                          student.status === "Active"
                            ? "active-status"
                            : "inactive-status"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <button className="icon-button">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        No students found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!submitting) {
              setShowModal(false);
            }
          }}
        >
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">ACADEMIC MANAGEMENT</p>

                <h2>Add Student</h2>

                <p>
                  Create a new student record.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
                disabled={submitting}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleAddStudent}>
              <div className="form-group">
                <label>Student Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  placeholder="Computer Science & Engineering"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Year</label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">
                    Select year
                  </option>

                  <option value="1">
                    1st Year
                  </option>

                  <option value="2">
                    2nd Year
                  </option>

                  <option value="3">
                    3rd Year
                  </option>

                  <option value="4">
                    4th Year
                  </option>
                </select>
              </div>

              {formError && (
                <div className="form-error">
                  {formError}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={submitting}
                >
                  {submitting
                    ? "Adding..."
                    : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;