import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

// Styles CSS intégrés
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
  // État pour suivre la section active
  const [activeSection, setActiveSection] = useState("financial");

  // États pour les données
  const [financialOperations, setFinancialOperations] = useState([
    { id: 1, type: 'facturation', amount: 1500, date: '2023-10-01', status: 'validé' },
    { id: 2, type: 'paiement', amount: -500, date: '2023-10-02', status: 'en attente' },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 1, client: 'Client A', amount: 200, date: '2023-10-01', status: 'payé' },
    { id: 2, client: 'Client B', amount: 300, date: '2023-10-02', status: 'en attente' },
  ]);

  const [payroll, setPayroll] = useState([
    { id: 1, employee: 'Jean Dupont', salary: 2000, date: '2023-10-01', status: 'payé' },
    { id: 2, employee: 'Marie Curie', salary: 2500, date: '2023-10-02', status: 'en attente' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, description: 'Vérification des comptes', date: '2023-10-01', status: 'terminé' },
    { id: 2, description: 'Détection des anomalies', date: '2023-10-02', status: 'en cours' },
  ]);

  const [taxPayments, setTaxPayments] = useState([
    { id: 1, type: 'TVA', amount: 1000, date: '2023-10-01', status: 'payé' },
    { id: 2, type: 'Impôt sur les sociétés', amount: 5000, date: '2023-10-02', status: 'en attente' },
  ]);

  // États pour les formulaires
  const [newInvoice, setNewInvoice] = useState({ client: "", amount: "" });
  const [newEmployee, setNewEmployee] = useState({ employee: "", salary: "" });
  const [newTax, setNewTax] = useState({ type: "", amount: "" });
  const [newAuditLog, setNewAuditLog] = useState({ description: "", status: "en cours" });

  // Fonctions pour valider les opérations financières
  const validateFinancialOperation = (operationId) => {
    setFinancialOperations(financialOperations.map(op =>
      op.id === operationId ? { ...op, status: 'validé' } : op
    ));
  };

  // Fonction pour ajouter une facture
  const addInvoice = () => {
    if (newInvoice.client && newInvoice.amount) {
      const newInvoiceEntry = {
        id: invoices.length + 1,
        client: newInvoice.client,
        amount: parseFloat(newInvoice.amount),
        date: new Date().toISOString().split('T')[0],
        status: 'en attente',
      };
      setInvoices([...invoices, newInvoiceEntry]);
      setNewInvoice({ client: "", amount: "" }); // Réinitialiser le formulaire
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction pour ajouter un employé
  const addEmployee = () => {
    if (newEmployee.employee && newEmployee.salary) {
      const newEmployeeEntry = {
        id: payroll.length + 1,
        employee: newEmployee.employee,
        salary: parseFloat(newEmployee.salary),
        date: new Date().toISOString().split('T')[0],
        status: 'en attente',
      };
      setPayroll([...payroll, newEmployeeEntry]);
      setNewEmployee({ employee: "", salary: "" }); // Réinitialiser le formulaire
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction pour payer un salaire
  const paySalary = (employeeId) => {
    setPayroll(payroll.map(employee =>
      employee.id === employeeId ? { ...employee, status: 'payé' } : employee
    ));
  };

  // Fonction pour ajouter une taxe
  const addTax = () => {
    if (newTax.type && newTax.amount) {
      const newTaxEntry = {
        id: taxPayments.length + 1,
        type: newTax.type,
        amount: parseFloat(newTax.amount),
        date: new Date().toISOString().split('T')[0],
        status: 'en attente',
      };
      setTaxPayments([...taxPayments, newTaxEntry]);
      setNewTax({ type: "", amount: "" }); // Réinitialiser le formulaire
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction pour payer une taxe
  const payTax = (taxId) => {
    setTaxPayments(taxPayments.map(tax =>
      tax.id === taxId ? { ...tax, status: 'payé' } : tax
    ));
  };

  // Fonction pour ajouter un log d'audit
  const addAuditLog = () => {
    if (newAuditLog.description) {
      const newAuditLogEntry = {
        id: auditLogs.length + 1,
        description: newAuditLog.description,
        date: new Date().toISOString().split('T')[0],
        status: newAuditLog.status,
      };
      setAuditLogs([...auditLogs, newAuditLogEntry]);
      setNewAuditLog({ description: "", status: "en cours" }); // Réinitialiser le formulaire
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction pour gérer le clic sur un bouton de la barre latérale
  const handleSidebarButtonClick = (button) => {
    setActiveSection(button.toLowerCase().replace(/ /g, "_")); // Convertir le nom du bouton en un identifiant de section
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    alert("Déconnexion réussie");
    window.location.href = "/"; // Rediriger vers la page d'accueil
  };

  // Boutons pour la barre latérale
  const buttons = ["Financial", "Payments", "Payroll", "Audit", "Taxes"];

  return (
    <div style={styles.comptableService}>
      {/* Barre latérale avec boutons de navigation */}
      <Sidebar
        buttons={buttons}
        onButtonClick={handleSidebarButtonClick}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="Tableau de Bord Comptable"
      />

      {/* Contenu principal en fonction de la section active */}
      <div className="main-content">
        {activeSection === "financial" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Gestion Financière et Comptable</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Montant</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {financialOperations.map((operation) => (
                  <tr key={operation.id}>
                    <td style={styles.td}>{operation.type}</td>
                    <td style={styles.td}>{operation.amount} €</td>
                    <td style={styles.td}>{operation.date}</td>
                    <td style={styles.td}>{operation.status}</td>
                    <td style={styles.td}>
                      {operation.status === 'en attente' && (
                        <button style={styles.button} onClick={() => validateFinancialOperation(operation.id)}>
                          Valider
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSection === "payments" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Paiements et Facturation</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Client</th>
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
                Ajouter une facture
              </button>
            </div>
          </section>
        )}

        {activeSection === "payroll" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Salaires et Charges Sociales</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Employé</th>
                  <th style={styles.th}>Salaire</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map((employee) => (
                  <tr key={employee.id}>
                    <td style={styles.td}>{employee.employee}</td>
                    <td style={styles.td}>{employee.salary} €</td>
                    <td style={styles.td}>{employee.date}</td>
                    <td style={styles.td}>{employee.status}</td>
                    <td style={styles.td}>
                      {employee.status === 'en attente' && (
                        <button style={styles.button} onClick={() => paySalary(employee.id)}>
                          Payer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Nom de l'employé"
                value={newEmployee.employee}
                onChange={(e) => setNewEmployee({ ...newEmployee, employee: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Salaire"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                style={styles.input}
              />
              <button style={styles.button} onClick={addEmployee}>
                Ajouter un employé
              </button>
            </div>
          </section>
        )}

        {activeSection === "audit" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Audit et Contrôle Interne</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={styles.td}>{log.description}</td>
                    <td style={styles.td}>{log.date}</td>
                    <td style={styles.td}>{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Description"
                value={newAuditLog.description}
                onChange={(e) => setNewAuditLog({ ...newAuditLog, description: e.target.value })}
                style={styles.input}
              />
              <select
                value={newAuditLog.status}
                onChange={(e) => setNewAuditLog({ ...newAuditLog, status: e.target.value })}
                style={styles.input}
              >
                <option value="en cours">En cours</option>
                <option value="terminé">Terminé</option>
              </select>
              
              <button style={styles.button} onClick={addAuditLog}>
                Ajouter un log d'audit
              </button>
            </div>
          </section>
        )}

        {activeSection === "taxes" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Taxes et Impôts</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Montant</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {taxPayments.map((tax) => (
                  <tr key={tax.id}>
                    <td style={styles.td}>{tax.type}</td>
                    <td style={styles.td}>{tax.amount} €</td>
                    <td style={styles.td}>{tax.date}</td>
                    <td style={styles.td}>{tax.status}</td>
                    <td style={styles.td}>
                      {tax.status === 'en attente' && (
                        <button style={styles.button} onClick={() => payTax(tax.id)}>
                          Payer
                        </button>
                      )}
                    </td>
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
                Ajouter une taxe
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AccountingDashboard;