import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/ServiceDetailsPage.css"; // Fichier CSS pour les styles

import SteakFritesImage from "../assets/Steak Frites.webp";
import PatesCarbonaraImage from "../assets/Pâtes Carbonara.webp";
import SaladeCesarImage from "../assets/Salade César.webp";
import BurgerGourmetImage from "../assets/Burger Gourmet.webp";
import PizzaMargheritaImage from "../assets/Pizza Margherita.webp";
import SushiMixImage from "../assets/Sushi Mix.webp";
import TiramisuImage from "../assets/Tiramisu.webp";
import CremeBruleeImage from "../assets/Crème Brûlée.webp";
import GlaceMaisonImage from "../assets/Glace Maison.webp";
import TarteTatinImage from "../assets/Tarte Tatin.webp";
import MousseChocolatImage from "../assets/Mousse au Chocolat.webp";
import CheesecakeImage from "../assets/Cheesecake.webp";
import DoctorImage from "../assets/doctor.webp";
import FeuImage from "../assets/feu.webp";
import SecuriseImage from "../assets/securise.webp";
import YogaImage from "../assets/youga.webp";
import GymImage from "../assets/gym2.webp";
import MassageImage from "../assets/massage.webp";
import MusculationImage from "../assets/Musculation.webp";
import SoinDesPiedsImage from "../assets/soin des pieds.webp";
import VisageSoinImage from "../assets/visage soign.webp";

// Composant RestaurantCard pour serviceId === 1
const RestaurantCard = () => {
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Steak Frites",
      description: "Steak juteux accompagné de frites croustillantes.",
      price: 18,
      ingredients: ["Steak", "Frites", "Beurre", "Herbes"],
      rating: 4.7,
      ratings: [5, 4, 5, 4, 5], // Notes des clients
      image: SteakFritesImage, // Utilisation de l'image importée
    },
    {
      id: 2,
      name: "Pâtes Carbonara",
      description: "Pâtes crémeuses avec lardons et parmesan.",
      price: 14,
      ingredients: ["Pâtes", "Lardons", "Crème", "Parmesan"],
      rating: 4.5,
      ratings: [4, 5, 4, 5, 4],
      image: PatesCarbonaraImage, // Utilisation de l'image importée
    },
    {
      id: 3,
      name: "Salade César",
      description: "Salade fraîche avec poulet grillé, croûtons et sauce césar.",
      price: 12,
      ingredients: ["Laitue", "Poulet", "Croûtons", "Sauce César"],
      rating: 4.3,
      ratings: [4, 4, 5, 4, 4],
      image: SaladeCesarImage, // Utilisation de l'image importée
    },
    {
      id: 4,
      name: "Burger Gourmet",
      description: "Burger avec steak haché, cheddar, bacon et sauce maison.",
      price: 16,
      ingredients: ["Steak haché", "Cheddar", "Bacon", "Sauce maison"],
      rating: 4.6,
      ratings: [5, 4, 5, 4, 5],
      image: BurgerGourmetImage, // Utilisation de l'image importée
    },
    {
      id: 5,
      name: "Pizza Margherita",
      description: "Pizza classique avec tomate, mozzarella et basilic.",
      price: 13,
      ingredients: ["Tomate", "Mozzarella", "Basilic"],
      rating: 4.4,
      ratings: [4, 5, 4, 5, 4],
      image: PizzaMargheritaImage, // Utilisation de l'image importée
    },
    {
      id: 6,
      name: "Sushi Mix",
      description: "Assortiment de sushis frais (saumon, thon, crevette).",
      price: 22,
      ingredients: ["Riz", "Saumon", "Thon", "Crevette"],
      rating: 4.8,
      ratings: [5, 5, 4, 5, 5],
      image: SushiMixImage, // Utilisation de l'image importée
    },
    {
      id: 7,
      name: "Tiramisu",
      description: "Dessert italien au café et mascarpone.",
      price: 8,
      ingredients: ["Mascarpone", "Café", "Biscuits", "Cacao"],
      rating: 4.9,
      ratings: [5, 5, 5, 5, 5],
      image: TiramisuImage, // Utilisation de l'image importée
    },
    {
      id: 8,
      name: "Crème Brûlée",
      description: "Crème onctueuse avec une couche de sucre caramélisé.",
      price: 9,
      ingredients: ["Crème", "Sucre", "Vanille"],
      rating: 4.7,
      ratings: [5, 4, 5, 4, 5],
      image: CremeBruleeImage, // Utilisation de l'image importée
    },
    {
      id: 9,
      name: "Glace Maison",
      description: "Glace artisanale avec choix de parfums.",
      price: 6,
      ingredients: ["Lait", "Crème", "Sucre", "Parfums"],
      rating: 4.6,
      ratings: [4, 5, 4, 5, 4],
      image: GlaceMaisonImage, // Utilisation de l'image importée
    },
    {
      id: 10,
      name: "Tarte Tatin",
      description: "Tarte aux pommes caramélisées.",
      price: 10,
      ingredients: ["Pommes", "Sucre", "Pâte feuilletée"],
      rating: 4.5,
      ratings: [4, 5, 4, 5, 4],
      image: TarteTatinImage, // Utilisation de l'image importée
    },
    {
      id: 11,
      name: "Mousse au Chocolat",
      description: "Mousse légère et onctueuse au chocolat noir.",
      price: 7,
      ingredients: ["Chocolat noir", "Œufs", "Crème"],
      rating: 4.8,
      ratings: [5, 5, 4, 5, 5],
      image: MousseChocolatImage, // Utilisation de l'image importée
    },
    {
      id: 12,
      name: "Cheesecake",
      description: "Cheesecake fondant avec coulis de fruits rouges.",
      price: 9,
      ingredients: ["Fromage frais", "Biscuit", "Fruits rouges"],
      rating: 4.7,
      ratings: [5, 4, 5, 4, 5],
      image: CheesecakeImage, // Utilisation de l'image importée
    },
  ]);

  const [selectedDish, setSelectedDish] = useState(null); // Plat sélectionné
  const [clientRating, setClientRating] = useState(0); // Note du client

  // Fonction pour valider la commande
  const validateOrder = (dish) => {
    alert(`Vous avez commandé : ${dish.name}`);
    setSelectedDish(null); // Fermer la fenêtre modale
  };

  // Fonction pour fermer la fenêtre modale
  const closeModal = () => {
    setSelectedDish(null);
    setClientRating(0); // Réinitialiser la note du client
  };

  // Fonction pour soumettre la note du client
  const submitRating = (dishId) => {
    if (clientRating > 0) {
      const updatedMenu = menu.map((dish) => {
        if (dish.id === dishId) {
          const newRatings = [...dish.ratings, clientRating];
          const newRating = newRatings.reduce((a, b) => a + b, 0) / newRatings.length;
          return { ...dish, ratings: newRatings, rating: newRating };
        }
        return dish;
      });
      setMenu(updatedMenu);
      setClientRating(0); // Réinitialiser la note du client
      alert("Merci pour votre note !");
    } else {
      alert("Veuillez sélectionner une note avant de soumettre.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2c3e50", fontStyle: "italic" }}>Menu du Restaurant</h1>

      {/* Affichage des plats */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {menu.map((dish) => (
          <div
            key={dish.id}
            className="card"
            onClick={() => setSelectedDish(dish)}
          >
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p><strong>Prix :</strong> {dish.price}€</p>
            <p><strong>Note :</strong> {dish.rating.toFixed(1)}/5</p>
          </div>
        ))}
      </div>

      {/* Fenêtre modale pour afficher les détails du plat */}
      {selectedDish && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{selectedDish.name}</h3>
            <p>{selectedDish.description}</p>
            <p><strong>Prix :</strong> {selectedDish.price}€</p>
            <p><strong>Ingrédients :</strong> {selectedDish.ingredients.join(", ")}</p>
            <p><strong>Note moyenne :</strong> {selectedDish.rating.toFixed(1)}/5</p>

            {/* Section pour noter le plat */}
            <div style={{ marginTop: "20px" }}>
              <h4>Donnez votre avis :</h4>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= clientRating ? "active" : ""}
                    onClick={() => setClientRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button
                className="validate"
                onClick={() => submitRating(selectedDish.id)}
              >
                Soumettre la note
              </button>
            </div>

            <button
              className="validate"
              onClick={() => validateOrder(selectedDish)}
            >
              Commander
            </button>
            <button
              className="close"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant GymServices pour serviceId === 2
const GymServices = () => {
  const gymServices = [
    {
      id: 1,
      name: "Cardio Training",
      price: "30€",
      hours: "6h - 22h",
      team: "Équipe Fitness",
      description: "Séances de cardio pour améliorer votre endurance.",
      image: GymImage, // Utilisation de l'image importée
    },
    {
      id: 2,
      name: "Musculation",
      price: "40€",
      hours: "7h - 21h",
      team: "Équipe Bodybuilding",
      description: "Exercices de musculation pour renforcer vos muscles.",
      image: MusculationImage, // Utilisation de l'image importée
    },
    {
      id: 3,
      name: "Yoga",
      price: "35€",
      hours: "8h - 20h",
      team: "Équipe Relaxation",
      description: "Séances de yoga pour améliorer votre flexibilité et votre bien-être.",
      image: YogaImage, // Utilisation de l'image importée
    },
  ];

  const [selectedService, setSelectedService] = useState(null); // Service sélectionné

  // Fonction pour fermer la fenêtre modale
  const closeModal = () => {
    setSelectedService(null);
  };

  // Fonction pour valider le service
  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };

  return (
    <div>
      <h2 style={{ fontStyle: "italic" }}>Services de Gym</h2>

      {/* Liste des cartes de services */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {gymServices.map((service) => (
          <div
            key={service.id}
            className="card"
            onClick={() => setSelectedService(service)}
          >
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>Prix : {service.price}</p>
            <p>Heures : {service.hours}</p>
            <p>Équipe : {service.team}</p>
          </div>
        ))}
      </div>

      {/* Fenêtre modale pour afficher les détails */}
      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>Détails du Service : {selectedService.name}</h3>
            <p>{selectedService.description}</p>
            <p>Prix : {selectedService.price}</p>
            <p>Heures : {selectedService.hours}</p>
            <p>Équipe : {selectedService.team}</p>
            <button
              className="validate"
              onClick={validateService}
            >
              Valider
            </button>
            <button
              className="close"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant SpaEmergencyService pour serviceId === 3
const SpaEmergencyService = () => {
  const spaServices = [
    {
      id: 1,
      name: "Massage",
      price: "70€",
      hours: "10h - 20h",
      team: "Équipe Bien-être",
      description: "Massage relaxant pour détendre vos muscles.",
      image: MassageImage, // Utilisation de l'image importée
    },
    {
      id: 2,
      name: "Soins du Visage",
      price: "50€",
      hours: "9h - 18h",
      team: "Équipe Beauté",
      description: "Soins hydratants et anti-âge pour votre visage.",
      image: VisageSoinImage, // Utilisation de l'image importée
    },
    {
      id: 3,
      name: "Soins des Pieds",
      price: "40€",
      hours: "11h - 19h",
      team: "Équipe Podologie",
      description: "Pédicure et soins des pieds pour un confort optimal.",
      image: SoinDesPiedsImage, // Utilisation de l'image importée
    },
  ];

  const [selectedService, setSelectedService] = useState(null); // Service sélectionné

  // Fonction pour fermer la fenêtre modale
  const closeModal = () => {
    setSelectedService(null);
  };

  // Fonction pour valider le service
  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };

  return (
    <div>
      <h2 style={{ fontStyle: "italic" }}>Services de Spa</h2>

      {/* Liste des cartes de services */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {spaServices.map((service) => (
          <div
            key={service.id}
            className="card"
            onClick={() => setSelectedService(service)}
          >
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>Prix : {service.price}</p>
            <p>Heures : {service.hours}</p>
            <p>Équipe : {service.team}</p>
          </div>
        ))}
      </div>

      {/* Fenêtre modale pour afficher les détails */}
      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>Détails du Service : {selectedService.name}</h3>
            <p>{selectedService.description}</p>
            <p>Prix : {selectedService.price}</p>
            <p>Heures : {selectedService.hours}</p>
            <p>Équipe : {selectedService.team}</p>
            <button
              className="validate"
              onClick={validateService}
            >
              Valider
            </button>
            <button
              className="close"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant EmergencyService pour serviceId === 4
// Composant EmergencyService pour serviceId === 4
const EmergencyService = () => {
  const emergencyServices = [
    {
      id: 1,
      name: "Appeler un Docteur",
      description: "Contactez un médecin en cas d'urgence médicale.",
      image: DoctorImage, // Utilisation de l'image importée
    },
    {
      id: 2,
      name: "Signaler un Feu",
      description: "Signalez un incendie dans votre chambre ou ailleurs.",
      image: FeuImage, // Utilisation de l'image importée
    },
    {
      id: 3,
      name: "Appeler la Sécurité",
      description: "Contactez la sécurité en cas de problème.",
      image: SecuriseImage, // Utilisation de l'image importée
    },
  ];

  const [selectedService, setSelectedService] = useState(null); // Service sélectionné

  // Fonction pour fermer la fenêtre modale
  const closeModal = () => {
    setSelectedService(null);
  };

  // Fonction pour valider le service
  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };

  return (
    <div>
      <h2 style={{ fontStyle: "italic" }}>Services d'Urgence</h2>

      {/* Liste des cartes de services */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {emergencyServices.map((service) => (
          <div
            key={service.id}
            className="card"
            onClick={() => setSelectedService(service)}
          >
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {/* Fenêtre modale pour afficher les détails */}
      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>Détails du Service : {selectedService.name}</h3>
            <p>{selectedService.description}</p>
            <button
              className="validate"
              onClick={validateService}
            >
              Valider
            </button>
            <button
              className="close"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant RoomService pour serviceId === 5
const RoomService = () => {
  const [orders, setOrders] = useState([]); // Liste des commandes
  const [newOrder, setNewOrder] = useState(""); // Nouvelle commande
  const [deliveredOrders, setDeliveredOrders] = useState([]); // Commandes livrées
  const [customerFeedback, setCustomerFeedback] = useState(""); // Feedback du client

  // Ajouter une nouvelle commande
  const addOrder = () => {
    if (newOrder.trim() !== "") {
      const order = {
        id: orders.length + 1,
        details: newOrder,
        status: "En préparation",
      };
      setOrders([...orders, order]);
      setNewOrder(""); // Réinitialiser le champ
    }
  };

  // Marquer une commande comme livrée
  const markAsDelivered = (id) => {
    const order = orders.find((order) => order.id === id);
    if (order) {
      setDeliveredOrders([...deliveredOrders, order]);
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  // Envoyer un feedback au client
  const sendFeedback = () => {
    if (customerFeedback.trim() !== "") {
      alert(`Feedback envoyé : ${customerFeedback}`);
      setCustomerFeedback(""); // Réinitialiser le champ
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2c3e50", fontStyle: "italic" }}>Room Service</h1>

      {/* Section : Prise de commandes */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Prise de Commandes</h2>
        <input
          type="text"
          value={newOrder}
          onChange={(e) => setNewOrder(e.target.value)}
          placeholder="Entrez la commande (plat, boisson, etc.)"
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button
          onClick={addOrder}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ajouter la Commande
        </button>
      </div>

      {/* Section : Préparation et Livraison des Commandes */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Commandes en Cours</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Détails</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Statut</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.details}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => markAsDelivered(order.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2ecc71",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Marquer comme Livré
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section : Commandes Livrées */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Commandes Livrées</h2>
        {deliveredOrders.length > 0 ? (
          <ul>
            {deliveredOrders.map((order) => (
              <li key={order.id} style={{ marginBottom: "10px" }}>
                <strong>Commande #{order.id}</strong> : {order.details}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune commande livrée pour le moment.</p>
        )}
      </div>

      {/* Section : Service Client et Feedback */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Service Client</h2>
        <textarea
          value={customerFeedback}
          onChange={(e) => setCustomerFeedback(e.target.value)}
          placeholder="Entrez votre feedback ou votre question..."
          style={{ padding: "8px", width: "100%", height: "100px", marginBottom: "10px" }}
        />
        <button
          onClick={sendFeedback}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e67e22",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Envoyer Feedback
        </button>
      </div>

      {/* Section : Respect des Normes d'Hygiène */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Respect des Normes d'Hygiène</h2>
        <p>
          Toutes les procédures de sécurité alimentaire et d'hygiène sont strictement respectées.
        </p>
      </div>

      {/* Section : Coordination avec d'Autres Services */}
      <div>
        <h2>Coordination avec d'Autres Services</h2>
        <p>
          Le room service collabore avec la cuisine, le service d'étage et la réception pour assurer
          un service fluide et de qualité.
        </p>
      </div>
    </div>
  );
};

// Composant ServiceDetailsPage
const ServiceDetailsPage = () => {
  const { serviceId } = useParams(); // Récupère l'ID du service depuis l'URL
  const navigate = useNavigate();

  return (
    <div className="service-details-page">
      <h1 style={{ fontStyle: "italic", color: "#2c3e50", animation: "colorChange 3s infinite" }}>
        Détails du Service
      </h1>

      {/* Afficher le composant de gestion approprié en fonction de l'ID du service */}
      {serviceId === "1" && <RestaurantCard />} {/* Service de restauration */}
      {serviceId === "2" && <GymServices />} {/* Services de Gym */}
      {serviceId === "3" && <SpaEmergencyService />} {/* Services de Spa */}
      {serviceId === "4" && <EmergencyService />} {/* Services d'Urgence */}
      {serviceId === "5" && <RoomService />} {/* Room Service */}

      <button
        className="back-button"
        onClick={() => navigate("/additional-services-page")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#3498db",
          color: "#fff",
        }}
      >
        Retour aux Services Additionnels
      </button>
    </div>
  );
};

export default ServiceDetailsPage;