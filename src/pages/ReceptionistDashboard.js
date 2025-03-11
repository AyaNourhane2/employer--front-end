import React, { useState } from "react";
import "../Style/commonStyles.css"; // Assurez-vous que ce fichier CSS existe

const ReceptionistDashboard = () => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simuler une API call (remplacez cela par votre appel API réel)
      const fakeApiResponse = {
        data: {
          guest_name: "Jean Dupont",
          room_type: "Chambre Standard",
          check_in_date: "2023-10-15",
          check_out_date: "2023-10-20",
          email: "jean.dupont@example.com",
          phone_number: "0123456789",
        },
      };

      // Simuler un délai pour l'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setReservation(fakeApiResponse.data);
      setError("");
    } catch (err) {
      setError("Réservation non trouvée ou informations incorrectes.");
      setReservation(null);
    }
  };

  const handleLogout = () => {
    alert("Déconnexion réussie !");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Tableau de bord Réceptionniste</h1>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
      <div className="main-content">
        <h2>Authentification des Réservations</h2>
        <form onSubmit={handleSubmit} className="authenticate-reservation">
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
          <button type="submit">Vérifier</button>
        </form>
        {error && <p className="error">{error}</p>}
        {reservation && (
          <div className="reservation-details">
            <h3>Détails de la Réservation</h3>
            <p><strong>Nom:</strong> {reservation.guest_name}</p>
            <p><strong>Chambre:</strong> {reservation.room_type}</p>
            <p><strong>Arrivée:</strong> {reservation.check_in_date}</p>
            <p><strong>Départ:</strong> {reservation.check_out_date}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Téléphone:</strong> {reservation.phone_number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;