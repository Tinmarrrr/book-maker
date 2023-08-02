import React, { useState } from "react";
import "./styles/BookApp.css";
import Header from "./components/Header";
import AddPageModal from "./components/AddPageModal";
import DisplayPages from "./components/DisplayPages";

function BookApp() {
  const [isModalOpen, setModalOpen] = useState(false);

  const switchModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="Container">
      <Header onAddPageClick={switchModal} />
      {isModalOpen ? (
        <AddPageModal closeModal={switchModal} />
      ) : (
        <DisplayPages />
      )}
    </div>
  );
}

export default BookApp;
