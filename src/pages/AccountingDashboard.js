import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../Style/commonStyles.css";

const AccountingDashboard = () => {
  // تحديد الزر النشط
  const [activeButton, setActiveButton] = useState("Paiements");

  // قائمة المدفوعات
  const [payments, setPayments] = useState([]);

  // قائمة الفواتير
  const [factures, setFactures] = useState([]);

  // بيانات النموذج لإضافة دفعة جديدة
  const [paymentFormData, setPaymentFormData] = useState({
    type: "entrant", // نوع الدفعة (entrant: واردة, sortant: صادرة)
    amount: "",
    date: "",
    description: "",
  });

  // بيانات النموذج لإضافة فاتورة جديدة
  const [factureFormData, setFactureFormData] = useState({
    clientName: "",
    amount: "",
    date: "",
    status: "en attente", // حالة الفاتورة (en attente, payée, annulée)
  });

  // الأزرار المتاحة في الشريط الجانبي
  const buttons = ["Paiements", "Factures", "Rapports", "Taxes", "Dettes"];

  // عند النقر على زر معين، يتم تغييره إلى الزر النشط
  const handleButtonClick = (button) => setActiveButton(button);

  // تحديث بيانات النموذج عند الكتابة في حقول الإدخال
  const handleInputChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // إضافة دفعة جديدة إلى قائمة المدفوعات
  const handleAddPayment = () => {
    if (paymentFormData.amount && paymentFormData.date && paymentFormData.description) {
      setPayments([...payments, paymentFormData]);
      setPaymentFormData({ type: "entrant", amount: "", date: "", description: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // إضافة فاتورة جديدة إلى قائمة الفواتير
  const handleAddFacture = () => {
    if (factureFormData.clientName && factureFormData.amount && factureFormData.date) {
      setFactures([...factures, factureFormData]);
      setFactureFormData({ clientName: "", amount: "", date: "", status: "en attente" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // تحديث حالة الفاتورة
  const handleUpdateFactureStatus = (index, newStatus) => {
    const updatedFactures = factures.map((facture, i) =>
      i === index ? { ...facture, status: newStatus } : facture
    );
    setFactures(updatedFactures);
  };

  // حساب إجمالي المدفوعات الواردة والصادرة
  const totalEntrants = payments
    .filter((p) => p.type === "entrant")
    .reduce((total, p) => total + Number(p.amount), 0);

  const totalSortants = payments
    .filter((p) => p.type === "sortant")
    .reduce((total, p) => total + Number(p.amount), 0);

  // حساب عدد الفواتير التي لم يتم دفعها بعد
  const facturesEnAttente = factures.filter((f) => f.status === "en attente").length;

  // الفواتير المتأخرة
  const facturesEnRetard = factures.filter(
    (facture) => new Date(facture.date) < new Date() && facture.status === "en attente"
  );

  return (
    <div className="container">
      {/* شريط جانبي للتنقل بين الوظائف */}
      <Sidebar
        buttons={buttons}
        onButtonClick={handleButtonClick}
        activeButton={activeButton}
        dashboardName="قسم المحاسبة"
      />

      {/* عرض القسم المحدد */}
      <div className="main-content">
        {activeButton === "Paiements" && (
          <div>
            <h2>Gestion des Paiements</h2>
            <div>
              <select
                name="type"
                value={paymentFormData.type}
                onChange={(e) => handleInputChange(e, paymentFormData, setPaymentFormData)}
              >
                <option value="entrant">Paiement entrant</option>
                <option value="sortant">Paiement sortant</option>
              </select>
              <input
                type="number"
                name="amount"
                placeholder="Montant"
                value={paymentFormData.amount}
                onChange={(e) => handleInputChange(e, paymentFormData, setPaymentFormData)}
              />
              <input
                type="date"
                name="date"
                value={paymentFormData.date}
                onChange={(e) => handleInputChange(e, paymentFormData, setPaymentFormData)}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={paymentFormData.description}
                onChange={(e) => handleInputChange(e, paymentFormData, setPaymentFormData)}
              />
              <button onClick={handleAddPayment}>Ajouter Paiement</button>
            </div>

            <div>
              <h3>Liste des Paiements</h3>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.type === "entrant" ? "Entrant" : "Sortant"}</td>
                      <td>{payment.amount}€</td>
                      <td>{payment.date}</td>
                      <td>{payment.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeButton === "Factures" && (
          <div>
            <h2>Gestion des Factures</h2>
            <div>
              <input
                type="text"
                name="clientName"
                placeholder="Nom du client"
                value={factureFormData.clientName}
                onChange={(e) => handleInputChange(e, factureFormData, setFactureFormData)}
              />
              <input
                type="number"
                name="amount"
                placeholder="Montant"
                value={factureFormData.amount}
                onChange={(e) => handleInputChange(e, factureFormData, setFactureFormData)}
              />
              <input
                type="date"
                name="date"
                value={factureFormData.date}
                onChange={(e) => handleInputChange(e, factureFormData, setFactureFormData)}
              />
              <button onClick={handleAddFacture}>Ajouter Facture</button>
            </div>

            <div>
              <h3>Liste des Factures</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nom du client</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {factures.map((facture, index) => (
                    <tr key={index}>
                      <td>{facture.clientName}</td>
                      <td>{facture.amount}€</td>
                      <td>{facture.date}</td>
                      <td>
                        <select
                          value={facture.status}
                          onChange={(e) =>
                            handleUpdateFactureStatus(index, e.target.value)
                          }
                        >
                          <option value="en attente">En attente</option>
                          <option value="payée">Payée</option>
                          <option value="annulée">Annulée</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => alert(`Envoyer un rappel pour ${facture.clientName}`)}>
                          Envoyer un rappel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeButton === "Rapports" && (
          <div>
            <h2>Rapports Financiers</h2>
            <div>
              <h3>Statistiques des Paiements</h3>
              <p>Total des paiements entrants : {totalEntrants}€</p>
              <p>Total des paiements sortants : {totalSortants}€</p>
              <p>Bénéfice net : {totalEntrants - totalSortants}€</p>
            </div>

            <div>
              <h3>Statistiques des Factures</h3>
              <p>Total des factures émises : {factures.reduce((acc, f) => acc + Number(f.amount), 0)}€</p>
              <p>Nombre de factures en attente : {facturesEnAttente}</p>
            </div>
          </div>
        )}

        {activeButton === "Taxes" && (
          <div>
            <h2>Gestion des Taxes</h2>
            <p>Intégration avec le système fiscal local (ex: SATIM pour l'Algérie).</p>
          </div>
        )}

        {activeButton === "Dettes" && (
          <div>
            <h2>Suivi des Dettes</h2>
            <div>
              <h3>Factures en Retard</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nom du client</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {facturesEnRetard.map((facture, index) => (
                    <tr key={index}>
                      <td>{facture.clientName}</td>
                      <td>{facture.amount}€</td>
                      <td>{facture.date}</td>
                      <td>{facture.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountingDashboard;