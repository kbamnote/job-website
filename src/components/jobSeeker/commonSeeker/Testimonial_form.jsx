import React, { useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Testimonial = () => {
  const [formData, setFormData] = useState({
    userName: "",
    rating: 0,
    feedback: "",
    userRole: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  const { userName, rating, feedback, userRole } = formData;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    const token = Cookies.get("JwtToken");
    const api = "https://jobquick.onrender.com/feedback";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(api, formData, config);

      if (response.data.success) {
        alert("Feedback submitted successfully");
        closeModal(); // Close modal after successful submission
      } else {
        alert("Feedback submission failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      let errorMessage = "Feedback submission failed: An error occurred";
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMessage = `Feedback submission failed: ${
          error.response.data.message || "An error occurred"
        }`;
      } else if (error.request) {
        console.log(error.request);
        errorMessage = "Feedback submission failed: No response from server";
      } else {
        console.log("Error", error.message);
        errorMessage = `Feedback submission failed: ${error.message}`;
      }
      alert(errorMessage);
    }
  }, [formData, rating]);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share Your Feedback
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-5">
              Share Your Feedback
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="userRole"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Role:
                </label>
                <select
                  id="userRole"
                  name="userRole"
                  value={userRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating (1-5):
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={rating}
                  min="1"
                  max="5"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Feedback:
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={feedback}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full py-2 px-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;