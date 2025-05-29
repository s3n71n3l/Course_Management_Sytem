import React, { useState } from "react";
import CourseService from "../Service/CourseService";
import NavHeader from "../Header";
import "./AddCourse.css";

const ViewCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);

  const handleChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    CourseService.viewCourse(courseId)
      .then((response) => {
        setCourseDetails(response.data);
      })
      .catch((error) => {
        setCourseDetails(null);
        setMessage('Error fetching course details.');
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">View Course</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="courseId">Course ID</label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            View Course
          </button>
        </form>

        {courseDetails && (
          <div className="course-details">
            <h4>Course Details</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Course Id</th>
                  <th>Course Name</th>
                  <th>Fees</th>
                  <th>Duration</th>
                  <th>Course Type</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{courseDetails.courseId}</td>
                  <td>{courseDetails.courseName}</td>
                  <td>{courseDetails.fees}</td>
                  <td>{courseDetails.duration}</td>
                  <td>{courseDetails.courseType}</td>
                  <td>{courseDetails.rating}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {message && <div id="message">{message}</div>}
      </div>
    </div>
  );
};

export default ViewCourse;
