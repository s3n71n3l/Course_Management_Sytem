import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Course from "./Course/Course";
import Admission from "./Admission/Admission";
import Associate from "./Associate/Associate";

import AddCourse from "./Course/AddCourse";
import UpdateCourse from "./Course/UpdateCourse";
import ViewCourse from "./Course/ViewCourse";
import CourseDeactivate from "./Course/CourseDeactivate";
import CourseRating from "./Course/CourseRating";

import AssociateRegistration from "./Admission/AssociateRegistration";
import HighestFeeCalculation from "./Admission/HighestFeeCalculation";
import AddFeedback from "./Admission/AddFeedback";
import ViewFeedback from "./Admission/ViewFeedback";
import FeeDetails from "./Admission/FeeDetails";
import MakePayment from "./Admission/MakePayment";

import AddAssociate from "./Associate/AddAssociate";
import UpdateAssociate from "./Associate/UpdateAssociate";
import ViewAssociate from "./Associate/ViewAssociate";

import Home from "./Home";
import Main from "./Main";

function Routing() {
  const location = useLocation();
  const isAuthenticated = location.state?.isAuthenticated || false;

  return (
    <Routes>
      <Route path="/" element={<Main isAuthenticated={isAuthenticated} />} />
      <Route path="/login" element={<Home />} />
      <Route path="/course" element={<Course />} />
      <Route path="/course/addcourse" element={<AddCourse />} />
      <Route path="/course/updatecourse" element={<UpdateCourse />} />
      <Route path="/course/viewcourse" element={<ViewCourse />} />
      <Route path="/course/deactivate" element={<CourseDeactivate />} />
      <Route path="/course/viewfeedbackrating" element={<CourseRating />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/admission/registration" element={<AssociateRegistration />} />
      <Route path="/admission/feeDetails" element={<FeeDetails />} />
      <Route path="/admission/addfeedback" element={<AddFeedback />} />
      <Route path="/admission/highestFee" element={<HighestFeeCalculation />} />
      <Route path="/admission/viewfeedback" element={<ViewFeedback />} />
      <Route path="/admission/makepayment" element={<MakePayment />} />
      <Route path="/associate" element={<Associate />} />
      <Route path="/associate/addassociate" element={<AddAssociate />} />
      <Route path="/associate/updateassociate" element={<UpdateAssociate />} />
      <Route path="/associate/viewassociate" element={<ViewAssociate />} />
    </Routes>
  );
}

export default Routing;
