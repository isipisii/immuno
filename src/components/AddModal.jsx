import React, { useState } from "react";
import { closeAddModal } from "../features/modal/modalSlice";
import { addVaccine } from "../features/vaccine/vaccineSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { GrClose } from "react-icons/gr";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";


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
    if (
      vaccineRecord.date &&
      vaccineRecord.vaccineName &&
      vaccineRecord.location
    ) {
      dispatch(addVaccine(serializedRecord));
      setVaccineRecord({
        vaccineName: "",
        date: "",
        location: "",
        id: nanoid(),
      });
      dispatch(closeAddModal());
    } else alert("Please fill out all fields");
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
        <motion.form
          className="add-modal modal"
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          initial={{ scale: 0, opacity: 0 }}
        >
          <h3>Record your vaccination</h3>
          <GrClose
            onClick={() => dispatch(closeAddModal())}
            className="close-btn"
          />
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
              className="date-picker"
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
        </motion.form>
    </div>
  );
};

export default AddModal;
