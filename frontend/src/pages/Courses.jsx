import {
  Plus,
  Search,
  BookOpen,
  Users,
  Clock,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

function Courses() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Course modal
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    credits: "",
  });

  const [adding, setAdding] = useState(false);
  const [formError, setFormError] = useState("");

  const API_URL =
    "http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com";

  // Fetch courses
  const fetchCourses = () => {
    setLoading(true);

    fetch(`${API_URL}/api/courses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load courses from the backend.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add course
  const handleAddCourse = async (event) => {
    event.preventDefault();

    setFormError("");

    if (
      !formData.name ||
      !formData.code ||
      !formData.department ||
      !formData.credits
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      setAdding(true);

      const response = await fetch(`${API_URL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          code: formData.code,
          department: formData.department,
          credits: Number(formData.credits),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to add course"
        );
      }

      const newCourse = await response.json();

      // Add newly created course immediately
      setCourses((previous) => [...previous, newCourse]);

      // Reset form
      setFormData({
        name: "",
        code: "",
        department: "",
        credits: "",
      });

      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      setFormError(err.message || "Unable to add course.");
    } finally {
      setAdding(false);
    }
  };

  const formattedCourses = courses.map((course) => ({
    code: course.code,
    title: course.name,
    department: course.department,
    instructor: "—",
    students: "—",
    duration: "—",
    status: "Active",
    credits: course.credits,
  }));

  const filteredCourses = formattedCourses.filter((course) => {
    const value = search.toLowerCase();

    return (
      course.title.toLowerCase().includes(value) ||
      course.code.toLowerCase().includes(value) ||
      course.department.toLowerCase().includes(value)
    );
  });

  return (
    <div className="module-page">

      {/* PAGE HEADING */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC MANAGEMENT</p>

          <h1>Courses</h1>

          <p className="heading-description">
            Manage courses, instructors and student enrollment.
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
          Add Course
        </button>
      </div>


      {/* STATS */}
      <div className="module-stats">

        <div className="module-stat">
          <div className="module-stat-icon">
            <BookOpen size={19} />
          </div>

          <div>
            <span>Total Courses</span>
            <strong>{courses.length}</strong>
          </div>
        </div>


        <div className="module-stat">
          <div className="module-stat-icon green">
            <BookOpen size={19} />
          </div>

          <div>
            <span>Active Courses</span>
            <strong>{courses.length}</strong>
          </div>
        </div>


        <div className="module-stat">
          <div className="module-stat-icon orange">
            <Users size={19} />
          </div>

          <div>
            <span>Total Enrollments</span>
            <strong>—</strong>
          </div>
        </div>

      </div>


      {/* TOOLBAR */}
      <div className="courses-toolbar">
        <div>
          <h3>Course Catalog</h3>

          <p>
            Browse currently available courses.
          </p>
        </div>

        <div className="table-actions">

          <div className="table-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

        </div>
      </div>


      {/* LOADING */}
      {loading && (
        <div className="course-empty">
          Loading courses...
        </div>
      )}


      {/* ERROR */}
      {error && (
        <div className="course-empty">
          {error}
        </div>
      )}


      {/* COURSES */}
      {!loading && !error && (
        <div className="course-grid">

          {filteredCourses.map((course) => (
            <div
              className="course-card"
              key={course.code}
            >

              <div className="course-card-top">

                <div className="course-icon">
                  <BookOpen size={21} />
                </div>

                <button className="icon-button">
                  <MoreHorizontal size={18} />
                </button>

              </div>


              <div className="course-code">
                {course.code}
              </div>

              <h3>{course.title}</h3>

              <p className="course-instructor">
                {course.instructor}
              </p>


              <div className="course-meta">

                <div>
                  <Users size={14} />
                  <span>
                    {course.students} students
                  </span>
                </div>

                <div>
                  <Clock size={14} />
                  <span>
                    {course.duration}
                  </span>
                </div>

              </div>


              <div className="course-card-footer">

                <span>
                  {course.department} · {course.credits} Credits
                </span>

                <span className="course-status active-status">
                  {course.status}
                </span>

              </div>

            </div>
          ))}


          {filteredCourses.length === 0 && (
            <div className="course-empty">
              No courses found.
            </div>
          )}

        </div>
      )}


      {/* ========================= */}
      {/* ADD COURSE MODAL */}
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

                <h2>Add Course</h2>

                <p>
                  Create a new course record.
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


            <form onSubmit={handleAddCourse}>

              <div className="modal-body">

                {/* COURSE NAME */}
                <div className="form-group">

                  <label>Course Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Data Structures and Algorithms"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>


                {/* COURSE CODE */}
                <div className="form-group">

                  <label>Course Code</label>

                  <input
                    type="text"
                    name="code"
                    placeholder="e.g. CSE2001"
                    value={formData.code}
                    onChange={handleChange}
                  />

                </div>


                {/* DEPARTMENT */}
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


                {/* CREDITS */}
                <div className="form-group">

                  <label>Credits</label>

                  <select
                    name="credits"
                    value={formData.credits}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select credits
                    </option>

                    <option value="1">1 Credit</option>
                    <option value="2">2 Credits</option>
                    <option value="3">3 Credits</option>
                    <option value="4">4 Credits</option>
                    <option value="5">5 Credits</option>
                    <option value="6">6 Credits</option>
                  </select>

                </div>


                {/* ERROR */}
                {formError && (
                  <div className="form-error">
                    {formError}
                  </div>
                )}

              </div>


              {/* FOOTER */}
              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    !adding && setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add Course"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Courses;