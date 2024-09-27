import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employee');
        setEmployees(response.data.data);
      } catch (error) {
        setError('Error fetching employees');
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search
  const filteredEmployees = employees.filter((employee) =>
    `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const totalRows = filteredEmployees.length;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb pageName="Employee Details" />
      <div className="my-10 py-8 px-2 bg-white shadow-md rounded-md">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border py-4 px-2 text-center">EmpId</th>
                    <th className="border py-4 px-2 text-center">FName</th>
                    <th className="border py-4 px-2 text-center">LName</th>
                    <th className="border py-4 px-2 text-center">Email</th>
                    <th className="border py-4 px-2 text-center">Phone No.</th>
                    <th className="border py-4 px-2 text-center">Position</th>
                    <th className="border py-4 px-2 text-center">Department</th>
                    <th className="border py-4 px-2 text-center">DOB</th>
                    <th className="border py-4 px-2 text-center">DOJ</th>
                    <th className="border py-4 px-2 text-center">Salary</th>
                    <th className="border py-4 px-2 text-center">Status</th>
                    <th className="border py-4 px-2 text-center">Image</th>
                    <th className="border py-4 px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr key={employee.employee_id} className="hover:bg-gray-50">
                      <td className="border py-2 px-2 text-center">{employee.employee_id}</td>
                      <td className="border py-2 px-2 text-center">{employee.first_name}</td>
                      <td className="border py-2 px-2 text-center">{employee.last_name}</td>
                      <td className="border py-2 px-2 text-center">{employee.email}</td>
                      <td className="border py-2 px-2 text-center">{employee.phone_number}</td>
                      <td className="border py-2 px-2 text-center">{employee.position}</td>
                      <td className="border py-2 px-2 text-center">{employee.department}</td>
                      <td className="border py-2 px-2 text-center">{employee.date_of_birth}</td>
                      <td className="border py-2 px-2 text-center">{employee.date_of_joining}</td>
                      <td className="border py-2 px-2 text-center">${employee.salary}</td>
                      <td className="border py-2 px-2 text-center">{employee.status}</td>
                      <td className="border py-2 px-2 text-center">
                        {employee.image_url && (
                          <img
                            src={`http://localhost:8000/${employee.image_url}`}
                            alt={`${employee.first_name} ${employee.last_name}`}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        )}
                      </td>
                      <td className="border py-2 px-2 text-center">
                        <MdOutlineModeEdit className="inline mx-2 cursor-pointer" />
                      </td>
                      <td className="border py-2 px-2 text-center">
                        <BsTrash className="inline mx-2 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <span className="mr-2">Rows per page:</span>
              <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="border rounded-md">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="mt-4">
              {Array.from({ length: Math.ceil(totalRows / rowsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeDetails;
