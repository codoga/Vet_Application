import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Customer from './Pages/Customer/Customer';
import Animal from './Pages/Animal/Animal';
import Doctor from './Pages/Doctor/Doctor';
import Appointment from './Pages/Appointment/Appointment';
import Vaccination from './Pages/Vaccination/Vaccination';
import Report from './Pages/Report/Report';
import Navbar from './Components/Navbar/Navbar';



function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/Appointment' element={<Appointment/>}  />
      <Route path='/Report' element={<Report/>}  />
      <Route path='/Vaccination' element={<Vaccination/>}  />
      <Route path='/Customer' element={<Customer/>}  />
      <Route path='/Animal' element={<Animal/>}  />
      <Route path='/Doctor' element={<Doctor/>}  />

    </Routes>
    </>
  );
}




export default App;

