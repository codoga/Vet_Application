import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Vaccination.css';

const Vaccination = () => {
  const [vaccines, setVaccines] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    code: '',
    protectionStartDate: '',
    protectionFinishDate: '',
    animalId: '',
  });
  const [searchAnimalName, setSearchAnimalName] = useState('');
  const [searchVaccineName, setSearchVaccineName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVaccines();
    fetchAnimals();
  }, []);

  const fetchVaccines = () => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations`)
      .then((res) => {
        setVaccines(res.data.content || []);
      })
      .catch((error) => {
        console.error('Error fetching vaccines:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchAnimals = () => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals`)
      .then((res) => {
        setAnimals(res.data.content || []); 
      })
      .catch((error) => {
        console.error('Error fetching animals:', error);
        setAnimals([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleNewVaccineInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewVaccine = () => {
    axios.post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations`, newVaccine)
      .then(() => {
        fetchVaccines();
        setNewVaccine({
          name: '',
          code: '',
          protectionStartDate: '',
          protectionFinishDate: '',
          animalId: '',
        });
      })
      .catch((error) => {
        console.error('Error adding vaccine:', error);
      });
  };

  const handleDeleteVaccine = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations/${id}`)
      .then(() => {
        fetchVaccines();
      })
      .catch((error) => {
        console.error('Error deleting vaccine:', error);
      });
  };

  const handleSearchVaccineByAnimalName = () => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations/searchByAnimal?name=${searchAnimalName}`)
      .then((res) => {
        setVaccines(res.data.content || []);
      })
      .catch((error) => {
        console.error('Error searching vaccines:', error);
      });
  };

  const handleSearchVaccineByName = () => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations?name=${searchVaccineName}`)
      .then((res) => {
        setVaccines(res.data.content || []);
      })
      .catch((error) => {
        console.error('Error searching vaccines:', error);
      });
  };

  const handleSearchVaccineByAnimalNameInputChange = (e) => {
    setSearchAnimalName(e.target.value);
  };

  const handleSearchVaccineNameInputChange = (e) => {
    setSearchVaccineName(e.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="form-section">
        <h5>Add Vaccine</h5>
        <div className="form-row">
          <input type="text" name="name" value={newVaccine.name} onChange={handleNewVaccineInputChange} placeholder="Name" />
          <input type="text" name="code" value={newVaccine.code} onChange={handleNewVaccineInputChange} placeholder="Code" />
          <input type="date" name="protectionStartDate" value={newVaccine.protectionStartDate} onChange={handleNewVaccineInputChange} placeholder="Protection Start Date" />
          <input type="date" name="protectionFinishDate" value={newVaccine.protectionFinishDate} onChange={handleNewVaccineInputChange} placeholder="Protection Finish Date" />
          <select name="animalId" value={newVaccine.animalId} onChange={handleNewVaccineInputChange}>
            <option value="">Select Animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
          <button className="btn create-btn" onClick={handleAddNewVaccine}>Create</button>
        </div>
      </div>

      <div className="search-section">
        <h4>Search Vaccine By Animal Name</h4>
        <div className="form-row">
          <input type="text" placeholder="Enter Animal Name" value={searchAnimalName} onChange={handleSearchVaccineByAnimalNameInputChange} />
          <button className="btn search-btn" onClick={handleSearchVaccineByAnimalName}>Search</button>
        </div>
      </div>

      <div className="search-section">
        <h4>Search Vaccine By Name</h4>
        <div className="form-row">
          <input type="text" placeholder="Enter Vaccine Name" value={searchVaccineName} onChange={handleSearchVaccineNameInputChange} />
          <button className="btn search-btn" onClick={handleSearchVaccineByName}>Search</button>
        </div>
      </div>

      <div className="report-list">
        <div className="report-row">
          <span className="report-cell">Vaccine List</span>
          <span className="report-cell">Animal Name</span>
          <span className="report-cell">Diagnosis</span>
          <span className="report-cell">Doctor Name</span>
          <span className="report-cell">Customer</span>
          <span className="report-cell">Price</span>
          <span className="report-cell">Appointment Date</span>
          <span className="report-cell">Actions</span>
        </div>
        {vaccines.map((vaccine) => (
          <div key={vaccine.id} className="report-row">
            <span className="report-cell">{vaccine.name}</span>
            <span className="report-cell">{vaccine.animal?.name}</span> {}
            <span className="report-cell">{vaccine.diagnosis}</span>
            <span className="report-cell">{vaccine.doctorName}</span>
            <span className="report-cell">{vaccine.animal?.customer.name}</span> {}
            <span className="report-cell">{vaccine.price}</span>
            <span className="report-cell">{vaccine.appointmentDate}</span>
            <span className="report-cell actions">
              <button className="btn" onClick={() => handleDeleteVaccine(vaccine.id)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vaccination;
