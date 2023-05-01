import React from "react";
import VaccineList from "../components/VaccineList";
import { MdVaccines } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { AnimatePresence } from "framer-motion";

import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

import { useSelector } from "react-redux";

const Home = () => {
  const { isOpen } = useSelector((state) => state.addModal);
  const { isEditOpen } = useSelector((state) => state.editModal);
  const { vaccineList } = useSelector((state) => state.vaccine);

  return (
    <div className="home-container">
      <h1 className="user">Hi, User</h1>
      <div className="vaccines-container">
        {/* left */}
        <div className="card-container">
          <div className="card">
            <div>
              <div className="card-details">
                <h3 className="card-title">Vaccine Status</h3>
                <h2 className="vaccine-status">{vaccineList.length > 0 ? "Vaccinated" : "Not Vaccinated"}</h2>
              </div>
              <MdVaccines className="icon" />
            </div>
          </div>

          <div className="vaccine-count card">
            <div>
              <div className="card-details">
                <h3 className="card-title">Vaccination count</h3>
                <h2 className="count">{vaccineList.length}</h2>
              </div>
              <RxCounterClockwiseClock className="icon" />
            </div>
          </div>
        </div>

        {/* right */}
        <VaccineList />
      </div>
      {/* modals */}
      <AnimatePresence>
        {isOpen && <AddModal />}
        {isEditOpen && <EditModal />}
      </AnimatePresence>
    </div>
  );
};

export default Home;
