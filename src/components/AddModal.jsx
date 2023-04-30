import React, { useState, useEffect } from "react";

import { addVaccine } from "../features/vaccine/vaccineSlice";
import { closeModal } from "../features/modal/addModalSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { GrClose } from "react-icons/gr";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddModal = () => {
  const dispatch = useDispatch();
  const [vaccineRecord, setVaccineRecord] = useState({
    vaccineName: "",
    date: "",
    location: "",
    id: nanoid(),
  });

  //   the vaccineRecord state was passed to the vaccineList state
  function handleSubmit(e) {
    e.preventDefault();
    const serializedRecord = {
      ...vaccineRecord,
      date: moment(vaccineRecord.date).format("DD, MMMM  YYYY"),
    };
    if(vaccineRecord.date && vaccineRecord.vaccineName && vaccineRecord.location){
      dispatch(addVaccine(serializedRecord));
      setVaccineRecord({
        vaccineName: "",
        date: "",
        location: "",
        id: nanoid(),
      });
      dispatch(closeModal());
    } else alert("Please fill out all fields")
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setVaccineRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  }

  function handleDateChange(date) {
    setVaccineRecord((prevRecord) => ({
      ...prevRecord,
      date: date,
    }));
  }

  return (
    <div className="modal-overlay">
      <form className="add-modal modal">
          <h3>Record your vaccination</h3> 
          <GrClose onClick={() => dispatch(closeModal())} className="close-btn"/> 
        <div className="modal-field-container">
          <label>Vaccine Name</label>
          <input
            id="vaccineName"
            type="text"
            placeholder="Vaccine Name"
            value={vaccineRecord.vaccineName}
            name="vaccineName"
            onChange={handleChange}
          />
        </div>
        <div className="modal-field-container">
          <label>Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Location"
            value={vaccineRecord.location}
            onChange={handleChange}
          />
        </div>
        <div className="modal-field-container">
          <label>Date vaccinated</label>
          <DatePicker
            selected={vaccineRecord.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Date"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddModal;
