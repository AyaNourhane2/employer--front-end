import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaPlus, FaSignOutAlt } from "react-icons/fa";
import profilereceptioniste from "../assets/profilereceptioniste.webp"; // Assurez-vous que le chemin est correct
import "../Style/commonStyles.css"; // Importez les styles communs
import "../components/sidebar.css"; // Importez les styles de la barre latérale
import "../Style/receptioniste.css"; // Importez les styles spécifiques au réceptionniste

// Composant Sidebar
const Sidebar = ({ buttons, onButtonClick, activeButton, onLogout, dashboardName, profileImage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "◄" : "►"}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="profile-section">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h1>{dashboardName}</h1>
        </div>
        <nav>
          <ul>
            {buttons.map((button, index) => (
              <li
                key={index}
                className={button.name === activeButton ? "active" : ""}
                onClick={() => onButtonClick(button.name)}
              >
                <span className="icon">{button.icon}</span>
                <span className="title">{button.name}</span>
              </li>
            ))}
            <li onClick={onLogout}>
              <span className="icon"><FaSignOutAlt /></span>
              <span className="title">Déconnexion</span>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Composant HomePage
const HomePage = () => {
  return (
    <div className="container home-page">
      <h1>Bienvenue à l'Hôtel</h1>
      <p>Gérez vos réservations en toute simplicité.</p>
      <div className="home-buttons">
        <Link to="/receptionist/authenticate" className="btn">Authentifier une Réservation</Link>
        <Link to="/receptionist/create-reservation" className="btn">Créer une Réservation</Link>
      </div>
    </div>
  );
};

// Composant AuthenticateReservation
const AuthenticateReservation = () => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simuler une réponse de l'API
      const fakeResponse = {
        reservation: {
          guest_name: "John Doe",
          room_type: "Chambre Standard",
          check_in_date: "2023-10-15",
          check_out_date: "2023-10-20",
        },
      };
      setReservation(fakeResponse.reservation);
      setError("");
    } catch (err) {
      setError("Réservation non trouvée ou informations incorrectes.");
      setReservation(null);
    }
  };

  return (
    <div className="container authenticate-reservation">
      <h2>Authentifier une Réservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numéro de réservation</label>
          <input
            type="text"
            placeholder="Numéro de réservation"
            value={reservationNumber}
            onChange={(e) => setReservationNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom du client</label>
          <input
            type="text"
            placeholder="Nom du client"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Vérifier</button>
      </form>
      {error && <p className="message error">{error}</p>}
      {reservation && (
        <div className="reservation-details">
          <h3>Détails de la Réservation</h3>
          <p><strong>Nom:</strong> {reservation.guest_name}</p>
          <p><strong>Chambre:</strong> {reservation.room_type}</p>
          <p><strong>Arrivée:</strong> {reservation.check_in_date}</p>
          <p><strong>Départ:</strong> {reservation.check_out_date}</p>
        </div>
      )}
    </div>
  );
};

// Composant CreateReservation
const CreateReservation = () => {
  const [reservation, setReservation] = useState({
    reservationNumber: "",
    guestName: "",
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    email: "",
    phoneNumber: "",
    numberOfGuests: 1,
    specialRequests: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simuler une création de réservation
      setMessage("Réservation créée avec succès !");
      setReservation({
        reservationNumber: "",
        guestName: "",
        checkInDate: "",
        checkOutDate: "",
        roomType: "",
        email: "",
        phoneNumber: "",
        numberOfGuests: 1,
        specialRequests: "",
      });
    } catch (err) {
      setMessage("Erreur lors de la création de la réservation.");
    }
  };

  return (
    <div className="form-container">
      <h2>Créer une Nouvelle Réservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numéro de réservation</label>
          <input
            type="text"
            name="reservationNumber"
            value={reservation.reservationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom du client</label>
          <input
            type="text"
            name="guestName"
            value={reservation.guestName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date d'arrivée</label>
          <input
            type="date"
            name="checkInDate"
            value={reservation.checkInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de départ</label>
          <input
            type="date"
            name="checkOutDate"
            value={reservation.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type de chambre</label>
          <select
            name="roomType"
            value={reservation.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un type de chambre</option>
            <option value="Chambre Standard">Chambre Standard</option>
            <option value="Suite Deluxe">Suite Deluxe</option>
            <option value="Chambre Familiale">Chambre Familiale</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={reservation.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Numéro de téléphone</label>
          <input
            type="text"
            name="phoneNumber"
            value={reservation.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de personnes</label>
          <input
            type="number"
            name="numberOfGuests"
            value={reservation.numberOfGuests}
            onChange={handleChange}
            min="1"
            max="30"
            required
          />
        </div>
        <div className="form-group">
          <label>Commentaires ou demandes spéciales</label>
          <textarea
            name="specialRequests"
            value={reservation.specialRequests}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="btn">Créer la Réservation</button>
      </form>
      {message && <p className="message success">{message}</p>}
    </div>
  );
};

// Composant NotFoundPage
const NotFoundPage = () => {
  return (
    <div className="container not-found-page">
      <h1>404 - Page Non Trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to="/receptionist" className="btn">Retour à l'accueil</Link>
    </div>
  );
};

// Composant ReceptionistDashboard
const ReceptionistDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveSection(buttonName.toLowerCase().replace(/ /g, "_"));
    switch (buttonName) {
      case "Authentifier une Réservation":
        navigate("/receptionist/authenticate");
        break;
      case "Créer une Réservation":
        navigate("/receptionist/create-reservation");
        break;
      default:
        navigate("/receptionist");
        break;
    }
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
    navigate("/"); // Rediriger vers la page d'accueil ou de connexion
  };

  return (
    <div className="dashboard-container">
      {/* Barre latérale */}
      <Sidebar
        buttons={[
          { name: "Authentifier une Réservation", icon: <FaCheckCircle /> },
          { name: "Créer une Réservation", icon: <FaPlus /> },
        ]}
        onButtonClick={handleButtonClick}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="Tableau de Bord Réceptionniste"
        profileImage={profilereceptioniste}
      />

      {/* Contenu principal */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authenticate" element={<AuthenticateReservation />} />
          <Route path="/create-reservation" element={<CreateReservation />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Hôtel Management System. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default ReceptionistDashboard;