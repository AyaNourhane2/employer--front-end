import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdditionalServicesPage.css"; // Fichier CSS pour les styles

import restaurationImage from "../assets/restauration.webp";
import spaImage from "../assets/spa.webp";
import gymImage from "../assets/gym2.webp"; // Nouvelle image pour la gym
import urgentImage from "../assets/urgent.webp"; // Nouvelle image pour le service urgent
import roomServiceImage from "../assets/room-service.webp"; // Nouvelle image pour le room service

const AdditionalServicesPage = () => {
  const navigate = useNavigate();

  // Liste des services additionnels avec images de fond
  const services = [
    { id: 1, name: "Restauration", description: "Commander des repas en chambre.", image: restaurationImage },
    { id: 2, name: "Spa", description: "Réserver des séances de massage ou de bien-être.", image: spaImage },
    { id: 3, name: "Gym", description: "Accéder à la salle de sport et aux équipements.", image: gymImage },
    { id: 4, name: "Service Urgent", description: "Demander une assistance urgente.", image: urgentImage },
    { id: 5, name: "Room Service", description: "Demander des plats ou des besoins 24/7 directement à la chambre.", image: roomServiceImage },
  ];

  // Fonction pour gérer le clic sur une carte
  const handleServiceClick = (serviceId) => {
    navigate(`/service-details/${serviceId}`); // Navigation vers la page des détails
  };

  return (
    <div className="services-page">
      <h1>Services Additionnels</h1>
      <div className="services-list">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-card" 
            onClick={() => handleServiceClick(service.id)}
            style={{ 
              backgroundImage: `url(${service.image})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center", 
              backgroundRepeat: "no-repeat", 
              color: "white", 
              padding: "20px", 
              borderRadius: "10px", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center", 
              alignItems: "center", 
              height: "200px", 
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)"
            }}
          >
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default AdditionalServicesPage;