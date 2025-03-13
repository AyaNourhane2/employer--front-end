import React from "react";
import "../styles/Footer.css";
import "../styles/ReservationDetails.css";
import "../styles/ReservationForm.css";

const Receptioniste = () => {
  // Exemple de données de réservation
  const reservation = {
    guest_name: "Jean Dupont",
    room_type: "Suite Deluxe",
    check_in_date: "2023-10-15",
    check_out_date: "2023-10-20",
    email: "jean.dupont@example.com",
    phone_number: "0123456789",
    reservationNumber: "123456",
    guestName: "Jean Dupont",
    checkInDate: "2023-10-15",
    checkOutDate: "2023-10-20",
    roomType: "Suite Deluxe",
    email: "jean.dupont@example.com",
    phoneNumber: "0123456789",
    numberOfGuests: 2,
    specialRequests: "Un lit bébé si possible.",
  };

  const handleChange = (e) => {
    // Gérer les changements dans le formulaire
    console.log(e.target.name, e.target.value);
  };

  return (
    <div className="receptioniste-page">
      <h1>Page de la Réceptionniste</h1>

      {/* Section des détails de la réservation */}
      <ReservationDetails reservation={reservation} />

      {/* Section du formulaire de réservation */}
      <ReservationForm reservation={reservation} onChange={handleChange} />

      {/* Pied de page */}
      <Footer />
    </div>
  );
};

const ReservationDetails = ({ reservation }) => {
  return (
    <div className="reservation-details">
      <h3>Détails de la Réservation</h3>
      <p>
        <strong>Nom:</strong> {reservation.guest_name}
      </p>
      <p>
        <strong>Chambre:</strong> {reservation.room_type}
      </p>
      <p>
        <strong>Arrivée:</strong> {reservation.check_in_date}
      </p>
      <p>
        <strong>Départ:</strong> {reservation.check_out_date}
      </p>
      <p>
        <strong>Email:</strong> {reservation.email}
      </p>
      <p>
        <strong>Téléphone:</strong> {reservation.phone_number}
      </p>
    </div>
  );
};

const ReservationForm = ({ reservation, onChange }) => {
  return (
    <div className="reservation-form">
      <div className="form-group">
        <label htmlFor="1">Numéro de réservation</label>
        <input
          id="1"
          type="text"
          name="reservationNumber"
          value={reservation.reservationNumber}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="2">Nom du client</label>
        <input
          id="2"
          type="text"
          name="guestName"
          value={reservation.guestName}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="3">Date d'arrivée</label>
        <input
          id="3"
          type="date"
          name="checkInDate"
          value={reservation.checkInDate}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="4">Date de départ</label>
        <input
          id="4"
          type="date"
          name="checkOutDate"
          value={reservation.checkOutDate}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="5">Type de chambre</label>
        <select
          id="5"
          name="roomType"
          value={reservation.roomType}
          onChange={onChange}
          required
        >
          <option value="">Sélectionnez un type de chambre</option>
          <option value="Chambre Standard">Chambre Standard</option>
          <option value="Suite Deluxe">Suite Deluxe</option>
          <option value="Chambre Familiale">Chambre Familiale</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="6">Email</label>
        <input
          id="6"
          type="email"
          name="email"
          value={reservation.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="7">Numéro de téléphone</label>
        <input
          id="7"
          type="text"
          name="phoneNumber"
          value={reservation.phoneNumber}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="8">Nombre de personnes</label>
        <input
          id="8"
          type="number"
          name="numberOfGuests"
          value={reservation.numberOfGuests}
          onChange={onChange}
          min="1"
          max="30"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="9">Commentaires ou demandes spéciales</label>
        <textarea
          id="9"
          name="specialRequests"
          value={reservation.specialRequests}
          onChange={onChange}
          rows="4"
        ></textarea>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2023 Hôtel Management System. Tous droits réservés.</p>
    </footer>
  );
};

export default Receptioniste;