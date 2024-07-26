import React, { useState } from "react";
import { UploadIcon } from "@heroicons/react/outline";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function CareerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    cv: null,
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cv" ? files[0] : value,
    });
  };

  const handleCheckboxChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    // Replace with your submission logic (e.g., API call or form handling)
    console.log(formData);
    // Clear form fields after submission if needed
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      cv: null,
    });
    setAgreeTerms(false); // Reset checkbox state
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled = !agreeTerms;

  return (
    <form className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="pb-8 border-b border-gray-200">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-4 mt-4">
            Career Form
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <div className="sm:col-span-1 lg:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium mb-2 text-gray-900"
              >
                First name
              </label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                autoComplete="given-name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-1 lg:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium mb-2 text-gray-900"
              >
                Last name
              </label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                autoComplete="family-name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input-field block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2 text-gray-900"
              >
                Phone Number
              </label>
              <PhoneInput
                inputProps={{
                  name: "phone",
                  id: "phone",
                  autoComplete: "tel",
                  placeholder: "Enter your phone number",
                  className:
                    "input-field block w-full rounded-md border-0 py-1.5 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                }}
                country={"us"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Submit Your Resume
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <UploadIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="6"
                className="input-field block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                style={{ minHeight: "120px" }}
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-6 flex items-center">
              <label htmlFor="terms-checkbox" className="flex items-center">
                <input
                  id="terms-checkbox"
                  name="terms-checkbox"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={agreeTerms}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-sm text-gray-900">
                  I agree to the Terms and Conditions
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitDisabled} // Disable button if terms are not agreed
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-600"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
      <hr className="my-6 mb-0 border-t border-gray-200" />
    </form>
  );
}
