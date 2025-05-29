import React,{ useState } from "react";
import CourseService from "../Service/CourseService";
import NavHeader from "../Header";
import "./AddCourse.css";

const AddCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fees, setFees] = useState("");
  const [duration, setDuration] = useState("");
  const [courseType, setCourseType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!courseId.trim()) errors.courseId = "Course ID is required.";
    if (!courseName.trim()) errors.courseName = "Course Name is required.";
    if (!fees.trim()) {
      errors.fees = "Fees is required.";
    } else if (parseFloat(fees) <= 0) {
      errors.fees = "Fees must be greater than zero.";
    }
    if (!duration.trim()) {
      errors.duration = "Duration is required.";
    } else if (parseFloat(duration) <= 0) {
      errors.duration = "Duration must be greater than zero.";
    }
    if (!courseType.trim()) errors.courseType = "Course Type is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const course = { courseId, courseName, fees, duration, courseType };

    CourseService.addCourse(course)
      .then((response) => {
        console.log(response.data);
        setMessage("Course added successfully");
        setCourseId("");
        setCourseName("");
        setFees("");
        setDuration("");
        setCourseType("");
        setErrors({});
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error adding course");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Add New Course</h2>
        <form className="course-form">
          <div className="form-grid">
            <div className="form-control">
              <label htmlFor="courseId">Course ID</label>
              <input
                type="text"
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
              {errors.courseId && <p className="error-message">{errors.courseId}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="courseName">Course Name</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              {errors.courseName && <p className="error-message">{errors.courseName}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="fees">Fees (INR)</label>
              <input
                type="text"
                id="fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
              {errors.fees && <p className="error-message">{errors.fees}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="duration">Duration (months)</label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              {errors.duration && <p className="error-message">{errors.duration}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="courseType">Course Type</label>
              <input
                type="text"
                id="courseType"
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
              />
              {errors.courseType && <p className="error-message">{errors.courseType}</p>}
            </div>
          </div>
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Add Course
          </button>
        </form>
        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
};

export default AddCourse;
