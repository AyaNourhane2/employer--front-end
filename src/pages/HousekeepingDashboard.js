import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../Style/commonStyles.css";

const HousekeepingDashboard = () => {
  // تحديد الزر النشط
  const [activeButton, setActiveButton] = useState("Chambres");

  // قائمة الغرف
  const [rooms, setRooms] = useState([]);

  // قائمة المنتجات
  const [products, setProducts] = useState([]);

  // قائمة الإشعارات
  const [notifications, setNotifications] = useState([]);

  // بيانات النموذج لإضافة غرفة جديدة
  const [roomFormData, setRoomFormData] = useState({
    roomNumber: "",
    status: "à nettoyer", // حالة الغرفة (à nettoyer, en maintenance, nettoyée)
  });

  // بيانات النموذج لإضافة منتج جديد
  const [productFormData, setProductFormData] = useState({
    productName: "",
    quantity: "",
  });

  // بيانات النموذج لإضافة إشعار جديد
  const [notificationFormData, setNotificationFormData] = useState({
    message: "",
    priority: "normal", // أولوية الإشعار (normal, urgent)
  });

  // الأزرار المتاحة في الشريط الجانبي
  const buttons = ["Chambres", "Notifications", "Produits", "Coordination"];

  // عند النقر على زر معين، يتم تغييره إلى الزر النشط
  const handleButtonClick = (button) => setActiveButton(button);

  // تحديث بيانات النموذج عند الكتابة في حقول الإدخال
  const handleInputChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // إضافة غرفة جديدة إلى قائمة الغرف
  const handleAddRoom = () => {
    if (roomFormData.roomNumber) {
      setRooms([...rooms, roomFormData]);
      setRoomFormData({ roomNumber: "", status: "à nettoyer" });
    } else {
      alert("Veuillez remplir le numéro de chambre.");
    }
  };

  // تحديث حالة الغرفة
  const handleUpdateRoomStatus = (index, newStatus) => {
    const updatedRooms = rooms.map((room, i) =>
      i === index ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
  };

  // حذف غرفة من القائمة
  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  // إضافة منتج جديد إلى قائمة المنتجات
  const handleAddProduct = () => {
    if (productFormData.productName && productFormData.quantity) {
      setProducts([...products, productFormData]);
      setProductFormData({ productName: "", quantity: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // حذف منتج من القائمة
  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // إضافة إشعار جديد إلى قائمة الإشعارات
  const handleAddNotification = () => {
    if (notificationFormData.message) {
      setNotifications([...notifications, notificationFormData]);
      setNotificationFormData({ message: "", priority: "normal" });
    } else {
      alert("Veuillez remplir le message.");
    }
  };

  // حذف إشعار من القائمة
  const handleDeleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="container">
      {/* شريط جانبي للتنقل بين الوظائف */}
      <Sidebar
        buttons={buttons}
        onButtonClick={handleButtonClick}
        activeButton={activeButton}
        dashboardName="التدبير المنزلي"
      />

      {/* عرض القسم المحدد */}
      <div className="main-content">
        {activeButton === "Chambres" && (
          <div>
            <h2>Gestion des Chambres</h2>
            <div>
              <input
                type="text"
                name="roomNumber"
                placeholder="Numéro de chambre"
                value={roomFormData.roomNumber}
                onChange={(e) => handleInputChange(e, roomFormData, setRoomFormData)}
              />
              <select
                name="status"
                value={roomFormData.status}
                onChange={(e) => handleInputChange(e, roomFormData, setRoomFormData)}
              >
                <option value="à nettoyer">À nettoyer</option>
                <option value="en maintenance">En maintenance</option>
                <option value="nettoyée">Nettoyée</option>
              </select>
              <button onClick={handleAddRoom}>Ajouter Chambre</button>
            </div>

            <div>
              <h3>Liste des Chambres</h3>
              <table>
                <thead>
                  <tr>
                    <th>Numéro de chambre</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={index}>
                      <td>{room.roomNumber}</td>
                      <td>
                        <select
                          value={room.status}
                          onChange={(e) =>
                            handleUpdateRoomStatus(index, e.target.value)
                          }
                        >
                          <option value="à nettoyer">À nettoyer</option>
                          <option value="en maintenance">En maintenance</option>
                          <option value="nettoyée">Nettoyée</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteRoom(index)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeButton === "Notifications" && (
          <div>
            <h2>Gestion des Notifications</h2>
            <div>
              <input
                type="text"
                name="message"
                placeholder="Message"
                value={notificationFormData.message}
                onChange={(e) => handleInputChange(e, notificationFormData, setNotificationFormData)}
              />
              <select
                name="priority"
                value={notificationFormData.priority}
                onChange={(e) => handleInputChange(e, notificationFormData, setNotificationFormData)}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
              <button onClick={handleAddNotification}>Ajouter Notification</button>
            </div>

            <div>
              <h3>Liste des Notifications</h3>
              <table>
                <thead>
                  <tr>
                    <th>Message</th>
                    <th>Priorité</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, index) => (
                    <tr key={index}>
                      <td>{notification.message}</td>
                      <td>{notification.priority}</td>
                      <td>
                        <button onClick={() => handleDeleteNotification(index)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeButton === "Produits" && (
          <div>
            <h2>Gestion des Produits</h2>
            <div>
              <input
                type="text"
                name="productName"
                placeholder="Nom du produit"
                value={productFormData.productName}
                onChange={(e) => handleInputChange(e, productFormData, setProductFormData)}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantité"
                value={productFormData.quantity}
                onChange={(e) => handleInputChange(e, productFormData, setProductFormData)}
              />
              <button onClick={handleAddProduct}>Ajouter Produit</button>
            </div>

            <div>
              <h3>Liste des Produits</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nom du produit</th>
                    <th>Quantité</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productName}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button onClick={() => handleDeleteProduct(index)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeButton === "Coordination" && (
          <div>
            <h2>Coordination avec la Réception</h2>
            <div>
              <h3>Liste des Chambres à Coordonner</h3>
              <table>
                <thead>
                  <tr>
                    <th>Numéro de chambre</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={index}>
                      <td>{room.roomNumber}</td>
                      <td>{room.status}</td>
                      <td>
                        <button onClick={() => alert(`Coordination pour la chambre ${room.roomNumber}`)}>
                          Coordonner
                        </button>
                      </td>
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

export default HousekeepingDashboard;