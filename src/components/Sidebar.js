import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/commonStyles.css"; // Importez le fichier CSS commun
import "../components/sidebar.css"; // Importez le fichier CSS spécifique à la barre latérale

const Sidebar = ({ buttons, onButtonClick, activeButton, onLogout, dashboardName }) => {
  const [isOpen, setIsOpen] = useState(true); // État pour ouvrir/fermer la barre latérale

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Basculer l'état
  };

  return (
    <>
      {/* Bouton pour basculer la barre latérale */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "◄" : "►"} {/* Icône ou texte pour indiquer l'état */}
      </button>

      {/* Barre latérale */}
      <div className={`navigation ${isOpen ? "" : "closed"}`}>
        <h1>{dashboardName}</h1>
        <ul>
          {/* Afficher les boutons passés via les props */}
          {buttons.map((button, index) => (
            <li
              key={index}
              className={button === activeButton ? "active" : ""} // Définir le bouton actif
              onClick={() => onButtonClick(button)} // Gérer le clic sur le bouton
            >
              <Link to="#">
                <span className="title">{button}</span>
              </Link>
            </li>
          ))}

          {/* Bouton de déconnexion */}
          <li onClick={onLogout}>
            <Link to="/logout">
              <span className="title">Déconnexion</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;