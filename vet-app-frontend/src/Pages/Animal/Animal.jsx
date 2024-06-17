import './Animal.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '',
    dateOfBirth: '',
    colour: '',
    customer: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
    },
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    id: '',
    name: '',
    species: '',
    breed: '',
    gender: '',
    dateOfBirth: '',
    colour: '',
    customer: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
    },
  });

  const [searchAnimalName, setSearchAnimalName] = useState('');
  const [searchCustomerName, setSearchCustomerName] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers`)
      .then((res) => setCustomers(res.data.content))
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals`)
      .then((res) => setAnimals(res.data.content))
      .catch((error) => console.error('Error fetching animals:', error));
  }, [update]);

  const handleNewAnimalInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerId') {
      const selectedCustomer = customers.find((cust) => cust.id === +value);
      setNewAnimal((prev) => ({
        ...prev,
        customer: selectedCustomer ? { ...selectedCustomer } : { id: 0, name: '', phone: '', email: '', address: '', city: '' },
      }));
    } else {
      setNewAnimal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddNewAnimal = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals`, newAnimal)
      .then(() => {
        setUpdate(!update);
        setNewAnimal({
          name: '',
          species: '',
          breed: '',
          gender: '',
          dateOfBirth: '',
          colour: '',
          customer: {
            id: 0,
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
          },
        });
      })
      .catch((error) => console.error('Error adding animal:', error));
  };

  const handleDeleteAnimal = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/${id}`)
      .then(() => setUpdate(!update))
      .catch((error) => console.error('Error deleting animal:', error));
  };

  const handleUpdateAnimal = () => {
    axios
      .put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/${updateAnimal.id}`, updateAnimal)
      .then(() => {
        setUpdate(!update);
        setUpdateAnimal({
          id: '',
          name: '',
          species: '',
          breed: '',
          gender: '',
          dateOfBirth: '',
          colour: '',
          customer: {
            id: 0,
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
          },
        });
      })
      .catch((error) => console.error('Error updating animal:', error));
  };

  const handleUpdateAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAnimalBtn = (index) => {
    setUpdateAnimal({ ...animals[index] });
  };

  const handleSearchAnimal = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/searchByName?name=${searchAnimalName}`)
      .then((res) => setAnimals(res.data.content))
      .catch((error) => console.error('Error searching animals:', error));
  };

  const handleSearchCustomer = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/searchByCustomer?name=${searchCustomerName}`)
      .then((res) => setAnimals(res.data.content))
      .catch((error) => console.error('Error searching customers:', error));
  };

  const handleShowAllAnimals = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals`)
      .then((res) => setAnimals(res.data.content))
      .catch((error) => console.error('Error fetching animals:', error));
  };

  const handleSearchAnimalNameInputChange = (e) => {
    setSearchAnimalName(e.target.value);
  };

  const handleSearchCustomerNameInputChange = (e) => {
    setSearchCustomerName(e.target.value);
  };

  return (
    <div className="animal-management">
      <h2>Animal Management</h2>

      <div className="search-section">
        <h4>Search Animal</h4>
        <div className="form-row">
          <input type="text" placeholder="Enter Animal Name" value={searchAnimalName} onChange={handleSearchAnimalNameInputChange} />
          <button className="btn search-btn yellow-btn" onClick={handleSearchAnimal}>Search</button>
        </div>
      </div>

      <div className="search-section">
        <h4>Search Customer</h4>
        <div className="form-row">
          <input type="text" placeholder="Enter Customer Name" value={searchCustomerName} onChange={handleSearchCustomerNameInputChange} />
          <button className="btn search-btn yellow-btn" onClick={handleSearchCustomer}>Search</button>
        </div>
        <button className="btn showall-btn orange-btn" onClick={handleShowAllAnimals}>Show All</button>
      </div>

      <div className="form-section">
        <h5>Add Animal</h5>
        <div className="form-row">
          <input type="text" name="name" value={newAnimal.name} onChange={handleNewAnimalInputChange} placeholder="Name" />
          <input type="text" name="species" value={newAnimal.species} onChange={handleNewAnimalInputChange} placeholder="Species" />
          <input type="text" name="breed" value={newAnimal.breed} onChange={handleNewAnimalInputChange} placeholder="Breed" />
          <input type="text" name="gender" value={newAnimal.gender} onChange={handleNewAnimalInputChange} placeholder="Gender" />
          <input type="text" name="colour" value={newAnimal.colour} onChange={handleNewAnimalInputChange} placeholder="Colour" />
          <input type="date" name="dateOfBirth" value={newAnimal.dateOfBirth} onChange={handleNewAnimalInputChange} placeholder="Date of Birth" />

          <select name="customerId" value={newAnimal.customer.id} onChange={handleNewAnimalInputChange}>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <button className="btn create-btn" onClick={handleAddNewAnimal}>Create</button>
        </div>
      </div>

      <div className="form-section">
        <h5>Update Animal</h5>
        <div className="form-row">
          <input type="text" name="name" value={updateAnimal.name} onChange={handleUpdateAnimalInputChange} placeholder="Name" />
          <input type="text" name="species" value={updateAnimal.species} onChange={handleUpdateAnimalInputChange} placeholder="Species" />
          <input type="text" name="breed" value={updateAnimal.breed} onChange={handleUpdateAnimalInputChange} placeholder="Breed" />
          <input type="text" name="gender" value={updateAnimal.gender} onChange={handleUpdateAnimalInputChange} placeholder="Gender" />
          <input type="text" name="colour" value={updateAnimal.colour} onChange={handleUpdateAnimalInputChange} placeholder="Colour" />
          <input type="date" name="dateOfBirth" value={updateAnimal.dateOfBirth} onChange={handleUpdateAnimalInputChange} placeholder="Date of Birth" />
          <select name="customerId" value={updateAnimal.customer.id} onChange={handleUpdateAnimalInputChange}>
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      <button className="btn update-btn" onClick={handleUpdateAnimal}>Update</button>
    </div>
  </div>

  <div className="form-section">
    <h5>Animal List</h5>
    <div className="animal-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Colour</th>
            <th>Date of Birth</th>
            <th>Customer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.length > 0 ? (
            animals.map((animal, index) => (
              <tr key={index}>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{animal.breed}</td>
                <td>{animal.gender}</td>
                <td>{animal.colour}</td>
                <td>{animal.dateOfBirth}</td>
                <td>{animal.customer.name}</td>
                <td>
                  <button className="btn update-btn" onClick={() => handleUpdateAnimalBtn(index)}>Update</button>
                  <button className="btn delete-btn" onClick={() => handleDeleteAnimal(animal.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No animals found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
);
}

export default Animal;
