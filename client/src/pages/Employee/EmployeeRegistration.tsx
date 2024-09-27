import React, { useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    position: '',
    department: '',
    date_of_birth: '',
    salary: '',
    status: '',
    image_url: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image_url: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/employee', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Employee added successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <>
      <Breadcrumb pageName='Employee Registration' />
      <div className="max-w-7xl mx-auto my-10 p-8 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter First Name"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Email"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Position"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Department"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Salary"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Status"
          />
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image_url"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="px-6 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default EmployeeForm;
