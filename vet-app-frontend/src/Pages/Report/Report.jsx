import './Report.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Report() {
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "", 
  });

  const [updateReport, setUpdateReport] = useState({
    id: '',
    title: "",
    diagnosis: "",
    price: "",
    appointment: {
      id: 0,
      date: "",
      customerName: "",
      animalName: "",
      doctorName: "",
    },
  });

  const [searchReportName, setSearchReportName] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments`)
      .then((res) => {
        setAppointments(res.data.content);
        setUpdate(false);
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  }, [update]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports`)
      .then((res) => {
        setReports(res.data.content);
        setUpdate(false);
      })
      .catch((error) => console.error('Error fetching reports:', error));
  }, [update]);

  const handleNewReportInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewReport = () => {
    axios.post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports`, newReport)
      .then(() => {
        setUpdate(!update);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
        });
      })
      .catch((error) => console.error('Error adding report:', error));
  };

  const handleDeleteReport = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${id}`)
      .then(() => setUpdate(true))
      .catch((error) => console.error('Error deleting report:', error));
  };

  const handleUpdateReport = () => {
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${updateReport.id}`, updateReport)
      .then(() => {
        setUpdate(true);
        setUpdateReport({
          id: '',
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: 0,
            date: "",
            customerName: "",
            animalName: "",
            doctorName: "",
          },
        });
      })
      .catch((error) => console.error('Error updating report:', error));
  };

  const handleUpdateReportInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateReportBtn = (index) => {
    setUpdateReport({ ...reports[index] });
  };

  const handleSearchReport = () => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports?animalName=${searchReportName}`)
      .then((res) => setReports(res.data.content))
      .catch((error) => console.error('Error searching reports:', error));
  };

  const handleShowAllReports = () => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports`)
      .then((res) => setReports(res.data.content))
      .catch((error) => console.error('Error fetching reports:', error));
  };

  const handleSearchReportNameInputChange = (e) => {
    setSearchReportName(e.target.value);
  };

  return (
    <div>
      <div className="form-section">
        <h5>Add Report</h5>
        <div className="form-row">
          <input type="text" name="title" value={newReport.title} onChange={handleNewReportInputChange} placeholder="Title" />
          <input type="text" name="diagnosis" value={newReport.diagnosis} onChange={handleNewReportInputChange} placeholder="Diagnosis" />
          <input type="text" name="price" value={newReport.price} onChange={handleNewReportInputChange} placeholder="Price" />
          <select name="appointmentId" value={newReport.appointmentId} onChange={handleNewReportInputChange}>
            <option value="">Select Appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.name}
              </option>
            ))}
          </select>
          <button className="btn create-btn" onClick={handleAddNewReport}>Create</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Update Report</h5>
        <div className="form-row">
          <input type="text" name="title" value={updateReport.title} onChange={handleUpdateReportInputChange} placeholder="Title" />
          <input type="text" name="diagnosis" value={updateReport.diagnosis} onChange={handleUpdateReportInputChange} placeholder="Diagnosis" />
          <input type="text" name="price" value={updateReport.price} onChange={handleUpdateReportInputChange} placeholder="Price" />
          <select name="appointmentId" value={updateReport.appointment.id} onChange={handleUpdateReportInputChange}>
            <option value="">Select Appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.name}
              </option>
            ))}
          </select>
          <button className="btn create-btn" onClick={handleUpdateReport}>Update</button>
        </div>
      </div>

      <div className="search-section">
        <h4>Search Report</h4>
        <div className="form-row">
          <input type="text" placeholder="Enter Report Name" value={searchReportName} onChange={handleSearchReportNameInputChange} />
          <button className="btn search-btn yellow-btn" onClick={handleSearchReport}>Search</button>
        </div>
        <button className="btn showall-btn orange-btn" onClick={handleShowAllReports}>Show All</button>
      </div>

      <div className="form-section">
        <h5>Report List</h5>
        <div className="report-list">
          <table>
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Diagnosis</th>
                <th>Doctor Name</th>
                <th>Customer Name</th>
                <th>Price</th>
                <th>Appointment Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.title}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.appointment ? report.appointment.doctorName : ''}</td>
                  <td>{report.appointment ? report.appointment.customerName : ''}</td>
                  <td>{report.price}</td>
                  <td>{report.appointment ? report.appointment.name : ''}</td>
                  <td>
                    <button className="btn update-btn" onClick={() => handleUpdateReportBtn(index)}>Update</button>
                    <button className="btn delete-btn" onClick={() => handleDeleteReport(report.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
