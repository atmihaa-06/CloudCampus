import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  MoreHorizontal,
} from "lucide-react";

function Assignments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Assignment modal
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });

  // Fetch assignments
  useEffect(() => {
    fetch(
      "http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/assignments"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }

        return response.json();
      })
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading assignments:", error);
        setLoading(false);
      });
  }, []);

  // Create assignment
  const handleCreateAssignment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/assignments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: Number(formData.student_id),
            title: formData.title,
            description: formData.description,
            due_date: formData.due_date,
            status: formData.status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Backend error:", errorData);
        throw new Error("Failed to create assignment");
      }

      const newAssignment = await response.json();

      // Add newly created assignment to the page immediately
      setAssignments((previous) => [
        ...previous,
        newAssignment,
      ]);

      // Reset form
      setFormData({
        student_id: "",
        title: "",
        description: "",
        due_date: "",
        status: "Pending",
      });

      // Close modal
      setShowModal(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Unable to create assignment.");
    }
  };

  // Search + status filtering
  const filteredAssignments = assignments.filter((assignment) => {
    const value = search.toLowerCase();

    const matchesSearch =
      assignment.title.toLowerCase().includes(value) ||
      assignment.description?.toLowerCase().includes(value);

    const matchesStatus =
      statusFilter === "All" ||
      assignment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Statistics
  const totalAssignments = assignments.length;

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const submittedAssignments = assignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const overdueAssignments = assignments.filter(
    (assignment) => assignment.status === "Overdue"
  ).length;

  return (
    <div className="module-page">

      {/* ================= HEADER ================= */}

      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC MANAGEMENT</p>

          <h1>Assignments</h1>

          <p className="heading-description">
            Track assignments, deadlines and student submissions.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          Create Assignment
        </button>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="module-stats assignment-stats">

        <div className="module-stat">
          <div className="module-stat-icon">
            <FileText size={19} />
          </div>

          <div>
            <span>Total Assignments</span>
            <strong>{totalAssignments}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon orange">
            <Clock size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingAssignments}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Submitted</span>
            <strong>{submittedAssignments}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon red">
            <AlertCircle size={19} />
          </div>

          <div>
            <span>Overdue</span>
            <strong>{overdueAssignments}</strong>
          </div>
        </div>

      </div>

      {/* ================= ASSIGNMENT TABLE ================= */}

      <div className="table-card">

        <div className="table-toolbar">

          <div>
            <h3>Assignment Directory</h3>

            <p>
              Manage assignments and submission progress.
            </p>
          </div>

          <div className="table-actions">

            <div className="table-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              className="department-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Overdue">Overdue</option>
            </select>

          </div>

        </div>

        <div className="table-wrapper">

          {loading ? (
            <div className="empty-state">
              Loading assignments...
            </div>
          ) : (
            <table className="data-table assignments-table">

              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Student</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {filteredAssignments.map((assignment) => {

                  const dueDate = new Date(
                    assignment.due_date
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr key={assignment.id}>

                      {/* Assignment */}

                      <td>
                        <div className="assignment-cell">

                          <div className="assignment-icon">
                            <FileText size={17} />
                          </div>

                          <div>
                            <strong>
                              {assignment.title}
                            </strong>

                            <span>
                              ASG
                              {String(assignment.id).padStart(
                                3,
                                "0"
                              )}
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* Student */}

                      <td>
                        <div className="submission-cell">

                          <div className="submission-info">
                            <span>
                              Student #
                              {assignment.student_id}
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* Due Date */}

                      <td>

                        <div className="due-date">
                          <Clock size={13} />

                          {dueDate}
                        </div>

                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`assignment-status ${
                            assignment.status === "Submitted"
                              ? "submitted-status"
                              : assignment.status === "Overdue"
                                ? "overdue-status"
                                : "pending-status"
                          }`}
                        >
                          {assignment.status}
                        </span>

                      </td>

                      {/* More */}

                      <td>

                        <button className="icon-button">
                          <MoreHorizontal size={18} />
                        </button>

                      </td>

                    </tr>
                  );
                })}

                {filteredAssignments.length === 0 && (

                  <tr>

                    <td colSpan="5">

                      <div className="empty-state">
                        No assignments found.
                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

      {/* ================= ASSIGNMENT INSIGHT ================= */}

      <div className="assignment-insight">

        <div className="insight-icon">
          <Users size={18} />
        </div>

        <div>

          <strong>Assignment Overview</strong>

          <span>
            {totalAssignments} assignment
            {totalAssignments !== 1 ? "s" : ""} currently stored
            in the CloudCampus database.
          </span>

        </div>

      </div>

      {/* ================= CREATE ASSIGNMENT MODAL ================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal-card">

            {/* Modal Header */}

            <div className="modal-header">

              <div>

                <p className="eyebrow">
                  ACADEMIC MANAGEMENT
                </p>

                <h2>
                  Create Assignment
                </h2>

                <p>
                  Create a new assignment record.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            {/* Form */}

            <form onSubmit={handleCreateAssignment}>

              {/* Student ID */}

              <div className="form-group">

                <label>
                  Student ID
                </label>

                <input
                  type="number"
                  placeholder="e.g. 1"
                  value={formData.student_id}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      student_id: event.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* Title */}

              <div className="form-group">

                <label>
                  Assignment Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. AWS Architecture Design"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      title: event.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* Description */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Enter assignment description"
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                />

              </div>

              {/* Due Date */}

              <div className="form-group">

                <label>
                  Due Date
                </label>

                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      due_date: event.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* Status */}

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Submitted">
                    Submitted
                  </option>

                  <option value="Overdue">
                    Overdue
                  </option>
                </select>

              </div>

              {/* Buttons */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Assignment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Assignments;