import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaMoneyCheckAlt, FaFileInvoiceDollar, FaReceipt, FaPlus } from "react-icons/fa";
import profilecomptable from "../assets/profilecompatible.webp";
import { useNavigate } from "react-router-dom";

const styles = {
  comptableService: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  section: {
    marginBottom: "40px",
  },
  form: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
    border: "1px solid #ddd",
    borderRadius: "3px",
  },
};

const AccountingDashboard = () => {
  const [activeSection, setActiveSection] = useState("payments");
  const navigate = useNavigate();

  const [payments, setPayments] = useState([
    { id: 1, client: "Client A", amount: 200, date: "2023-10-01", paymentMethod: "Carte bancaire" },
    { id: 2, client: "Client B", amount: 300, date: "2023-10-02", paymentMethod: "Virement bancaire" },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 1, client: "Client A", amount: 200, date: "2023-10-01", status: "payé" },
    { id: 2, client: "Client B", amount: 300, date: "2023-10-02", status: "en attente" },
  ]);

  const [taxPayments, setTaxPayments] = useState([
    { id: 1, type: "TVA", amount: 1000, date: "2023-10-01", status: "payé" },
    { id: 2, type: "Impôt sur les sociétés", amount: 5000, date: "2023-10-02", status: "en attente" },
  ]);

  const [newPayment, setNewPayment] = useState({ client: "", amount: "", paymentMethod: "" });
  const [newInvoice, setNewInvoice] = useState({ client: "", amount: "" });
  const [newTax, setNewTax] = useState({ type: "", amount: "" });

  const addPayment = () => {
    if (newPayment.client && newPayment.amount && newPayment.paymentMethod) {
      const newPaymentEntry = {
        id: payments.length + 1,
        client: newPayment.client,
        amount: parseFloat(newPayment.amount),
        date: new Date().toISOString().split('T')[0],
        paymentMethod: newPayment.paymentMethod,
      };
      setPayments([...payments, newPaymentEntry]);
      setNewPayment({ client: "", amount: "", paymentMethod: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInvoice = () => {
    if (newInvoice.client && newInvoice.amount) {
      const newInvoiceEntry = {
        id: invoices.length + 1,
        client: newInvoice.client,
        amount: parseFloat(newInvoice.amount),
        date: new Date().toISOString().split('T')[0],
        status: "en attente",
      };
      setInvoices([...invoices, newInvoiceEntry]);
      setNewInvoice({ client: "", amount: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addTax = () => {
    if (newTax.type && newTax.amount) {
      const newTaxEntry = {
        id: taxPayments.length + 1,
        type: newTax.type,
        amount: parseFloat(newTax.amount),
        date: new Date().toISOString().split('T')[0],
        status: "en attente",
      };
      setTaxPayments([...taxPayments, newTaxEntry]);
      setNewTax({ type: "", amount: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
    navigate("/"); // Rediriger vers la page d'accueil
  };

  return (
    <div style={styles.comptableService}>
      <Sidebar
        buttons={[
          { name: "Payments", icon: <FaMoneyCheckAlt /> },
          { name: "Invoices", icon: <FaFileInvoiceDollar /> },
          { name: "Taxes", icon: <FaReceipt /> },
        ]}
        onButtonClick={(buttonName) => setActiveSection(buttonName.toLowerCase().replace(/ /g, "_"))}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="Tableau de Bord Comptable"
        profileImage={profilecomptable}
      />

      <div className="main-content">
        {activeSection === "payments" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Paiements</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nom du client</th>
                  <th style={styles.th}>Montant</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Mode de paiement</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td style={styles.td}>{payment.client}</td>
                    <td style={styles.td}>{payment.amount} €</td>
                    <td style={styles.td}>{payment.date}</td>
                    <td style={styles.td}>{payment.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Nom du client"
                value={newPayment.client}
                onChange={(e) => setNewPayment({ ...newPayment, client: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Montant"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                style={styles.input}
              />
              <select
                value={newPayment.paymentMethod}
                onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
                style={styles.input}
              >
                <option value="">Choisir un mode de paiement</option>
                <option value="Espèce">Espèce</option>
                <option value="Carte bancaire">Carte bancaire</option>
                <option value="Virement bancaire">Virement bancaire</option>
                <option value="Portefeuille électronique">Portefeuille électronique</option>
                <option value="Chèque">Chèque</option>
                <option value="Paiement à l'arrivée">Paiement à l'arrivée</option>
                <option value="Paiement en ligne">Paiement en ligne</option>
              </select>
              <button style={styles.button} onClick={addPayment}>
                <FaPlus /> Ajouter un paiement
              </button>
            </div>
          </section>
        )}

        {activeSection === "invoices" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Factures</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nom du client</th>
                  <th style={styles.th}>Montant</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={styles.td}>{invoice.client}</td>
                    <td style={styles.td}>{invoice.amount} €</td>
                    <td style={styles.td}>{invoice.date}</td>
                    <td style={styles.td}>{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Nom du client"
                value={newInvoice.client}
                onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Montant"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                style={styles.input}
              />
              <button style={styles.button} onClick={addInvoice}>
                <FaPlus /> Ajouter une facture
              </button>
            </div>
          </section>
        )}

        {activeSection === "taxes" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Taxes</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Montant</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {taxPayments.map((tax) => (
                  <tr key={tax.id}>
                    <td style={styles.td}>{tax.type}</td>
                    <td style={styles.td}>{tax.amount} €</td>
                    <td style={styles.td}>{tax.date}</td>
                    <td style={styles.td}>{tax.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Type de taxe"
                value={newTax.type}
                onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Montant"
                value={newTax.amount}
                onChange={(e) => setNewTax({ ...newTax, amount: e.target.value })}
                style={styles.input}
              />
              <button style={styles.button} onClick={addTax}>
                <FaPlus /> Ajouter une taxe
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AccountingDashboard;