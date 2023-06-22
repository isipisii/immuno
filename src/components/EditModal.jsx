import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import { closeEditModal } from "../features/modal/modalSlice";
import { updateVaccine } from "../features/vaccine/vaccineSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const EditModal = () => {
  const dispatch = useDispatch();
  const { vaccineRecord } = useSelector((state) => state.vaccine);
  const [editVacRecord, setEditVacRecord] = useState({
    ...vaccineRecord,
    date: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const serializedRecord = {
      ...editVacRecord,
      date: moment(editVacRecord.date).format("DD, MMMM  YYYY"),
    };
    if (editVacRecord.date && editVacRecord.vaccineName && editVacRecord.location) {
      dispatch(updateVaccine(serializedRecord));
      dispatch(closeEditModal());
    } else alert("Please fill out all fields");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditVacRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  }

  function handleDateChange(date) {
    setEditVacRecord((prevRecord) => ({
      ...prevRecord,
      date: date,
    }));
  }

  return (
    <div className="modal-overlay">
      <motion.form
        className=" modal"
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.4 }}
        initial={{ scale: 0, opacity: 0 }}
      >
        <h3>Edit your vaccination</h3>
        <GrClose
          onClick={() => dispatch(closeEditModal())}
          className="close-btn"
        />
        <div className="modal-field-container">
          <label>Vaccine Name</label>
          <input
            id="vaccineName"
            type="text"
            placeholder="Vaccine Name"
            value={editVacRecord.vaccineName}
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
            value={editVacRecord.location}
            onChange={handleChange}
          />
        </div>
        <div className="modal-field-container">
          <label>Date vaccinated</label>
          <DatePicker
            selected={editVacRecord.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Date"
            className="date-picker"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </motion.form>
    </div>
  );
};

export default EditModal;
