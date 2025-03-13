import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../Style/commonStyles.css"; // Assurez-vous d'importer globalStyles.css

const HousekeepingDashboard = () => {
  // État pour gérer le bouton actif dans la barre latérale
  const [activeButton, setActiveButton] = useState("Tâches de Ménage");

  // États pour les données
  const [tasks, setTasks] = useState([
    { id: 1, room: "101", status: "à nettoyer", priority: "normal" },
    { id: 2, room: "102", status: "en cours de nettoyage", priority: "VIP" },
    { id: 3, room: "103", status: "propre", priority: "normal" },
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Jean Dupont", status: "présent", performance: "excellent" },
    { id: 2, name: "Marie Curie", status: "absent", performance: "bon" },
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, item: "Serviettes", quantity: 50, needsRestock: false },
    { id: 2, item: "Détergent", quantity: 10, needsRestock: true },
  ]);

  const [specialRequests, setSpecialRequests] = useState([
    { id: 1, room: "101", request: "Nettoyage urgent", status: "en attente" },
  ]);

  const [qualityChecks, setQualityChecks] = useState([
    { id: 1, room: "101", status: "passé", issues: "Aucun" },
    { id: 2, room: "102", status: "en attente", issues: "À vérifier" },
  ]);

  const [invoices, setInvoices] = useState([]);
  const [audits, setAudits] = useState([]);

  // Fonctions pour mettre à jour les données
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTask = (room, priority) => {
    const newTask = {
      id: tasks.length + 1,
      room,
      status: "à nettoyer",
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const updateInventory = (itemId, newQuantity) => {
    setInventory(
      inventory.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addSpecialRequest = (room, request) => {
    const newRequest = {
      id: specialRequests.length + 1,
      room,
      request,
      status: "en attente",
    };
    setSpecialRequests([...specialRequests, newRequest]);
  };

  const updateQualityCheck = (checkId, newStatus, issues) => {
    setQualityChecks(
      qualityChecks.map((check) =>
        check.id === checkId ? { ...check, status: newStatus, issues } : check
      )
    );
  };

  const addInvoice = (clientName, amount) => {
    const newInvoice = {
      id: invoices.length + 1,
      clientName,
      amount,
      date: new Date().toLocaleDateString(),
    };
    setInvoices([...invoices, newInvoice]);
  };

  const addAudit = (description, status) => {
    const newAudit = {
      id: audits.length + 1,
      description,
      status,
      date: new Date().toLocaleDateString(),
    };
    setAudits([...audits, newAudit]);
  };

  const addEmployee = (name, status, performance) => {
    const newEmployee = {
      id: staff.length + 1,
      name,
      status,
      performance,
    };
    setStaff([...staff, newEmployee]);
  };

  const addProduct = (item, quantity, needsRestock) => {
    const newProduct = {
      id: inventory.length + 1,
      item,
      quantity,
      needsRestock,
    };
    setInventory([...inventory, newProduct]);
  };

  // Boutons disponibles dans la barre latérale
  const buttons = [
    "Tâches de Ménage",
    "Suivi du Personnel",
    "Gestion des Stocks",
    "Demandes Spéciales",
    "Contrôle Qualité",
  ];

  // Fonction pour gérer le clic sur un bouton
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="container">
      {/* Barre latérale */}
      <Sidebar
        buttons={buttons}
        onButtonClick={handleButtonClick}
        activeButton={activeButton}
        dashboardName="cleanning management"
      />

      {/* Contenu principal */}
      <div className="main-content">
        <h1>Gestion du Service de Ménage</h1>

        {/* Section : Tâches de Ménage */}
        {activeButton === "Tâches de Ménage" && (
          <section className="section">
            <h2>Tâches de Ménage</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Chambre</th>
                  <th>Statut</th>
                  <th>Priorité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.room}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>
                      <button
                        className="button"
                        onClick={() => updateTaskStatus(task.id, "propre")}
                      >
                        Marquer comme propre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="button"
              onClick={() => addTask("104", "VIP")}
            >
              Ajouter une tâche
            </button>
            <button
              className="button"
              onClick={() => addInvoice("Client 1", 100)}
            >
              Ajouter une facture
            </button>
          </section>
        )}

        {/* Section : Suivi du Personnel */}
        {activeButton === "Suivi du Personnel" && (
          <section className="section">
            <h2>Suivi du Personnel</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Statut</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.status}</td>
                    <td>{employee.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="button"
              onClick={() => addEmployee("Nouvel Employé", "présent", "bon")}
            >
              Ajouter un employé
            </button>
            <button
              className="button"
              onClick={() => addInvoice("Client 2", 200)}
            >
              Ajouter une facture
            </button>
          </section>
        )}

        {/* Section : Gestion des Stocks */}
        {activeButton === "Gestion des Stocks" && (
          <section className="section">
            <h2>Gestion des Stocks</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.needsRestock && (
                        <button
                          className="button"
                          onClick={() => updateInventory(item.id, item.quantity + 10)}
                        >
                          Commander
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="button"
              onClick={() => addProduct("Nouveau Produit", 10, false)}
            >
              Ajouter un produit
            </button>
            <button
              className="button"
              onClick={() => addInvoice("Client 3", 300)}
            >
              Ajouter une facture
            </button>
          </section>
        )}

        {/* Section : Demandes Spéciales */}
        {activeButton === "Demandes Spéciales" && (
          <section className="section">
            <h2>Demandes Spéciales</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Chambre</th>
                  <th>Demande</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {specialRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.room}</td>
                    <td>{request.request}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="button"
              onClick={() => addSpecialRequest("105", "Nettoyage urgent")}
            >
              Ajouter une demande
            </button>
            <button
              className="button"
              onClick={() => addInvoice("Client 4", 400)}
            >
              Ajouter une facture
            </button>
          </section>
        )}

        {/* Section : Contrôle Qualité */}
        {activeButton === "Contrôle Qualité" && (
          <section className="section">
            <h2>Contrôle Qualité</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Chambre</th>
                  <th>Statut</th>
                  <th>Problèmes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {qualityChecks.map((check) => (
                  <tr key={check.id}>
                    <td>{check.room}</td>
                    <td>{check.status}</td>
                    <td>{check.issues}</td>
                    <td>
                      <button
                        className="button"
                        onClick={() => updateQualityCheck(check.id, "passé", "Aucun")}
                      >
                        Marquer comme vérifié
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="button"
              onClick={() => addAudit("Audit de qualité", "en cours")}
            >
              Ajouter un audit
            </button>
            <button
              className="button"
              onClick={() => addInvoice("Client 5", 500)}
            >
              Ajouter une facture
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default HousekeepingDashboard;