import React, { useState } from "react";

const CreateEvents = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setEventDetails({ ...eventDetails, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventDetails.title);
    formData.append("date", eventDetails.date);
    formData.append("time", eventDetails.time);
    formData.append("venue", eventDetails.venue);
    formData.append("description", eventDetails.description);
    formData.append("image", eventDetails.image);

    try {
      const response = await fetch("http://localhost:8081/api/create-event", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event created successfully!");
        // Reset form
        setEventDetails({
          title: "",
          date: "",
          time: "",
          venue: "",
          description: "",
          image: null,
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error creating event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Event creation form */}
      <div className="flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-500">
            Create Upcoming Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter event title"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={eventDetails.time}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={eventDetails.venue}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter event venue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter event description"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
