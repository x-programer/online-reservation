import React, { useState } from "react";

function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: "",
    imgTitle: "",
    imgSm: "",
    trailer: "",
    video: "",
    year: "",
    limit: 16,
    gener: "",
    isSeries: false,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Movie Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        {/* Repeat similar input fields for other properties (desc, img, imgTitle, etc.) */}
        {/* ... */}
        <div className="mb-4">
          <label htmlFor="isSeries" className="block text-sm font-medium text-gray-700">
            Is Series?
          </label>
          <input
            type="checkbox"
            id="isSeries"
            name="isSeries"
            checked={formData.isSeries}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, isSeries: e.target.checked }))}
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
