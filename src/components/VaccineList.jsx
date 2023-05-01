import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { openModal } from "../features/modal/addModalSlice";
import { useDispatch } from "react-redux";
import {
  deleteVaccine,
  updateVaccine,
} from "../features/vaccine/vaccineSlice";
import { openEditModal } from "../features/modal/editModalSlice";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../hook/useLocalStorage";
import { getVaccineRecord } from "../features/vaccine/vaccineSlice";

import { TbVaccine } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

const VaccineList = () => {
  const dispatch = useDispatch();
  const { vaccineList } = useSelector((state) => state.vaccine);
  const [vacList, setVacList] = useLocalStorage("vacList", []); // custom hook local storage

  const reversedVacList = [...vacList].reverse();
  
  useEffect(() => {
    // update local storage
    setVacList(vaccineList);
  }, [vaccineList]);

  function findVaccineRecord(id) {
    const vacRecord = vaccineList.find((vac) => vac.id === id);
    dispatch(getVaccineRecord(vacRecord));
  }

  return (
    <div className="vaccine-list">
      <div className="vaclist-header">
        <h4>Vaccination Record</h4>
        <AiOutlinePlusCircle
          className="add-icon"
          onClick={() => dispatch(openModal())}
        />
      </div>
      <div className="vaccine-detail-name">
        <h4 className="detail-prop">Vaccine Name</h4>
        <h4 className="detail-prop">Location</h4>
        <h4 className="detail-prop">Date</h4>
        <h4 className="detail-prop">Actions</h4>
      </div>
      <div className="vaccine-item-wrapper">
        <div className="vaccine-item-container">
          {reversedVacList.map((vaccine, index) => (
            <div
              className="vaccine-record"
              id={index % 2 == 0 ? "alternate" : null}
              key={index}
            >
              <h5 className="vaccine-name" id="vac-name">
                <TbVaccine />
                {vaccine.vaccineName}
              </h5>
              <p className="vaccine-location">{vaccine.location}</p>
              <p className="vaccine-date">{vaccine.date}</p>
              <div className="actions-icon">
                <FiEdit
                  className="edit-icon"
                  onClick={() => {
                    dispatch(openEditModal()), findVaccineRecord(vaccine.id);
                  }}
                />
                <RiDeleteBin2Line
                  className="delete-icon"
                  onClick={() => dispatch(deleteVaccine(vaccine.id))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaccineList;
