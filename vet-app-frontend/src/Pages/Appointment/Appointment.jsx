import { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointment.css';

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: '',
    doctorId: '',
    animalId: ''
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    id: '',
    appointmentDate: '',
    doctorId: '',
    animalId: ''
  });
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchAnimalName, setSearchAnimalName] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors`)
      .then((res) => setDoctors(res.data.content))
      .catch((error) => console.error('Error fetching doctors:', error));

    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals`)
      .then((res) => setAnimals(res.data.content))
      .catch((error) => console.error('Error fetching animals:', error));

    handleShowAllAppointments();
  }, []);

  const handleNewAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewAppointment = () => {
    const selectedDoctor = doctors.find(doc => doc.id === Number(newAppointment.doctorId));
    const selectedAnimal = animals.find(animal => animal.id === Number(newAppointment.animalId));

    const appointmentData = {
      appointmentDate: newAppointment.appointmentDate,
      doctor: selectedDoctor,
      animal: selectedAnimal
    };

    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments`, appointmentData)
      .then(() => {
        setUpdate(false);
        handleShowAllAppointments();
      })
      .catch((error) => console.error('Error adding appointment:', error));
  };

  const handleUpdateAppointment = () => {
    const selectedDoctor = doctors.find(doc => doc.id === Number(updateAppointment.doctorId));
    const selectedAnimal = animals.find(animal => animal.id === Number(updateAppointment.animalId));

    const appointmentData = {
      appointmentDate: updateAppointment.appointmentDate,
      doctor: selectedDoctor,
      animal: selectedAnimal
    };

    axios
      .put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${updateAppointment.id}`, appointmentData)
      .then(() => {
        setUpdate(false);
        handleShowAllAppointments();
      })
      .catch((error) => console.error('Error updating appointment:', error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${id}`)
      .then(() => handleShowAllAppointments())
      .catch((error) => console.error('Error deleting appointment:', error));
  };

  const handleUpdateAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAppointmentBtn = (appointment) => {
    setUpdateAppointment({
      id: appointment.id,
      appointmentDate: appointment.appointmentDate,
      doctorId: appointment.doctor.id,
      animalId: appointment.animal.id
    });
  };

  const handleSearchByDoctorAndDate = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/searchByDoctorAndDateRange?name=${searchDoctor}&date=${searchDate}`)
      .then((res) => setAppointments(res.data.content))
      .catch((error) => console.error('Error searching appointments:', error));
  };

  const handleSearchByAnimalNameAndDate = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/searchByAnimalAndDateRange?name=${searchAnimalName}&date=${searchDate}`)
      .then((res) => setAppointments(res.data.content))
      .catch((error) => console.error('Error searching appointments:', error));
  };

  const handleShowAllAppointments = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments`)
      .then((res) => setAppointments(res.data.content))
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  return (
    <div className="appointment-management">
      <h2>Appointment Management</h2>

      <div className="form-section">
        <h5>Add Appointment</h5>
        <div className="form-row">
          <input
            type="datetime-local"
            name="appointmentDate"
            value={newAppointment.appointmentDate}
            onChange={handleNewAppointmentInputChange}
          />
          <select name="doctorId" value={newAppointment.doctorId} onChange={handleNewAppointmentInputChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <select name="animalId" value={newAppointment.animalId} onChange={handleNewAppointmentInputChange}>
            <option value="">Select Animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
          <button className="btn create-btn" onClick={handleAddNewAppointment}>Create</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Update Appointment</h5>
        <div className="form-row">
          <input
            type="datetime-local"
            name="appointmentDate"
            value={updateAppointment.appointmentDate}
            onChange={handleUpdateAppointmentInputChange}
          />
          <select name="id" value={updateAppointment.id} onChange={handleUpdateAppointmentInputChange}>
            <option value="">Select Appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.doctor.name} - {appointment.animal.name} ({new Date(appointment.appointmentDate).toLocaleString()})
              </option>
            ))}
          </select>
          <select name="doctorId" value={updateAppointment.doctorId} onChange={handleUpdateAppointmentInputChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <select name="animalId" value={updateAppointment.animalId} onChange={handleUpdateAppointmentInputChange}>
            <option value="">Select Animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
          <button className="btn update-btn" onClick={handleUpdateAppointment}>Update</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Search Appointment by Doctor and Date</h5>
        <div className="form-row">
          <select value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button className="btn search-btn" onClick={handleSearchByDoctorAndDate}>Search</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Search Appointment by Animal Name and Date</h5>
        <div className="form-row">
          <select value={searchAnimalName} onChange={(e) => setSearchAnimalName(e.target.value)}>
            <option value="">Select Animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.name}>
                {animal.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button className="btn search-btn" onClick={handleSearchByAnimalNameAndDate}>Search</button>
        </div>
      </div>

      <button className="btn showall-btn" onClick={handleShowAllAppointments}>Show All</button>
      <h5>Appointment List</h5>
      <div className="appointment-list">
        <div className="appointment-list-header">
          <span>Doctor</span>
          <span>Appointment ID</span>
          <span>Date</span>
          <span>Animal</span>
          <span>Customer</span>
          <span>Customer Phone Number</span>
          <span>Doctor Phone Number</span>
          <span>Actions</span>
        </div>
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-item">
            <span>{appointment.doctor.name}</span>
            <span>{appointment.id}</span>
            <span>{new Date(appointment.appointmentDate).toLocaleString()}</span>
            <span>{appointment.animal.name}</span>
            <span>{appointment.animal.customer.name}</span>
            <span>{appointment.animal.customer.phone}</span>
            <span>{appointment.doctor.phone}</span>
            <span>
              <button onClick={() => handleUpdateAppointmentBtn(appointment)}>Update</button>
              <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointment;

