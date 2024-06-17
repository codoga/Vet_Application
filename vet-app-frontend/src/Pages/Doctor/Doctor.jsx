import './Doctor.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [updateDoctors, setUpdateDoctors] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, [updateDoctors]);

  const fetchDoctors = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors`)
      .then((res) => {
        setDoctors(res.data.content);
        setUpdateDoctors(false);
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  };

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewDoctor = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors`, newDoctor)
      .then(() => {
        setUpdateDoctors(true);
        setNewDoctor({
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
        });
      })
      .catch((error) => console.error('Error adding doctor:', error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`)
      .then(() => {
        setUpdateDoctors(true);
      })
      .catch((error) => console.error('Error deleting doctor:', error));
  };

  const handleUpdateDoctor = () => {
    const { id } = updateDoctor;
    axios
      .put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`, updateDoctor)
      .then(() => {
        setUpdateDoctors(true);
        setUpdateDoctor({
          id: '',
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
        });
      })
      .catch((error) => console.error('Error updating doctor:', error));
  };

  const handleUpdateDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDoctorBtn = (selectedDoctor) => {
    setUpdateDoctor({
      id: selectedDoctor.id,
      name: selectedDoctor.name,
      phone: selectedDoctor.phone,
      email: selectedDoctor.email,
      address: selectedDoctor.address,
      city: selectedDoctor.city,
    });
  };

  return (
    <div className="doctor-management">
      <h3>Doctor Management</h3>

      <div className="form-section">
        <h4 className="form-section-title">Add Doctor</h4>
        <div className="form-row">
          <input
            type="text"
            placeholder="Name Surname"
            name="name"
            value={newDoctor.name}
            onChange={handleNewDoctorInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={newDoctor.phone}
            onChange={handleNewDoctorInputChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={newDoctor.email}
            onChange={handleNewDoctorInputChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newDoctor.address}
            onChange={handleNewDoctorInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newDoctor.city}
            onChange={handleNewDoctorInputChange}
          />
          <button className="btn create-btn" onClick={handleAddNewDoctor}>
            Create
          </button>
        </div>
      </div>

      <div className="form-section">
        <h4 className="form-section-title">Update Doctor</h4>
        <div className="form-row">
          <input
            type="text"
            placeholder="Name Surname"
            name="name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={updateDoctor.email}
            onChange={handleUpdateDoctorInputChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputChange}
          />
          <button className="btn update-btn" onClick={handleUpdateDoctor}>
            Update
          </button>
        </div>
      </div>

      <h4 className="form-section-title">Doctor List</h4>
      <div className="doctor-list">
        <div className="doctor-list-header">
          <span>Name Surname</span>
          <span>Phone</span>
          <span>Address</span>
          <span>City</span>
          <span>Email</span>
          <span>Actions</span>
        </div>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-item">
            <span>{doctor.name}</span>
            <span>{doctor.phone}</span>
            <span>{doctor.address}</span>
            <span>{doctor.city}</span>
            <span>{doctor.email}</span>
            <span className="doctor-actions">
              <button onClick={() => handleDeleteDoctor(doctor.id)}>Remove</button>
              <button onClick={() => handleUpdateDoctorBtn(doctor)}>Edit</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkDay() {
  const [workDays, setWorkDays] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newWorkDay, setNewWorkDay] = useState({
    workDay: '',
    doctorId: '',
  });

  const [searchDoctorId, setSearchDoctorId] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, [update]);

  const fetchDoctors = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors`)
      .then((res) => setDoctors(res.data.content))
      .catch((error) => console.error('Error fetching doctors:', error));
  };

  const handleNewWorkDayInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkDay((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewWorkDay = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates`, newWorkDay)
      .then(() => {
        setUpdate(!update);
        setNewWorkDay({
          workDay: '',
          doctorId: '',
        });
      })
      .catch((error) => console.error('Error adding workday:', error));
  };

  const handleSearchWorkDay = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates?doctorId=${searchDoctorId}&workDay=${searchDate}`)
      .then((res) => setWorkDays(res.data.content))
      .catch((error) => console.error('Error searching work days:', error));
  };

  const handleShowAllWorkDays = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates`)
      .then((res) => setWorkDays(res.data.content))
      .catch((error) => console.error('Error fetching all work days:', error));
  };

  const handleSearchDoctorIdChange = (e) => {
    setSearchDoctorId(e.target.value);
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleUpdateWorkDayBtn = (selectedWorkDay) => {
    // Handle update logic if needed
    console.log('Update button clicked for work day:', selectedWorkDay);
  };

  const handleDeleteWorkDay = (workDayId) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates/${workDayId}`)
      .then(() => {
        setUpdate(!update);
      })
      .catch((error) => console.error('Error deleting work day:', error));
  };

  return (
    <div className="doctor-management">
      <h3>Available Date Management</h3>
      <div className="search-section">
        <h4>Search Available Date</h4>
        <div className="form-row">
          <select name="doctorId" value={searchDoctorId} onChange={handleSearchDoctorIdChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="workDay"
            value={searchDate}
            onChange={handleSearchDateChange}
            placeholder="Select Date"
          />
          <button className="btn search-btn yellow-btn" onClick={handleSearchWorkDay}>
            Search
          </button>
          <button className="btn showall-btn yellow-btn" onClick={handleShowAllWorkDays}>
            Show All
          </button>
        </div>
      </div>

      <div className="form-section">
        <h4>Add Available Date</h4>
        <div className="form-row">
          <select name="doctorId" value={newWorkDay.doctorId} onChange={handleNewWorkDayInputChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="workDay"
            value={newWorkDay.workDay}
            onChange={handleNewWorkDayInputChange}
            placeholder="dd.mm.yyyy"
          />
          <button className="btn create-btn" onClick={handleAddNewWorkDay}>
            Create
          </button>
        </div>
      </div>

      <div className="form-section">
        <h4>Available Date List</h4>
        <div className="animal-list">
          <table>
            <thead>
              <tr>
                <th>Name Surname</th>
                <th>Available Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workDays.map((workDay, index) => (
                <tr key={index}>
                  <td>{workDay.doctor.name}</td>
                  <td>{workDay.workDay}</td>
                  <td>{workDay.doctor.phone}</td>
                  <td>{workDay.doctor.email}</td>
                  <td>
                    <button className="btn update-btn" onClick={() => handleUpdateWorkDayBtn(workDay)}>
                      Update
                    </button>
                    <button className="btn delete-btn" onClick={() => handleDeleteWorkDay(workDay.id)}>
                      Delete
                    </button>
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

function DoctorManagement() {
  return (
    <div>
      <Doctor />
      <WorkDay />
    </div>
  );
}

export default DoctorManagement;


     
