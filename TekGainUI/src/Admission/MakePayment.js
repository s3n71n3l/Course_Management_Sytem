import React, { useState } from "react";
import NavHeader from "../Header";
import "./AddAdmission.css";

const MakePayment = () => {
  const [regId, setRegId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [assId, setAssId] = useState("");
  const [fees, setFees] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_ps95tils5dPQwx",
      currency: "INR",
      amount: amount * 100,
      name: "Course",
      description: "Thanks for purchasing",
      image: "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",
      handler: function (response) {
        alert("Payment Successfully");
        console.log("Payment completed successfully.");
      },
      prefill: {
        name: "Course",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <NavHeader />
      <div className="admission_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Make Payment for Registered Course</h2>

        <form className="admission-form">
          <div className="form-control">
            <label htmlFor="registrationId">Registration ID</label>
            <input
              type="text"
              id="registrationId"
              value={regId}
              onChange={(e) => setRegId(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="courseId">Course ID</label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="associateId">Associate ID</label>
            <input
              type="text"
              id="associateId"
              value={assId}
              onChange={(e) => setAssId(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="fees">Fees</label>
            <input
              type="number"
              id="fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            onClick={(e) => {
              e.preventDefault();
              displayRazorpay(fees);
            }}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;