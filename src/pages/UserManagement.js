// UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import '../Style/UserManagement.css';
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaEdit, FaTrash, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';
import img from '../assets/hotel.webp';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  // Charger les utilisateurs depuis l'API au montage du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/usersmanag/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification("Erreur lors de la récupération des utilisateurs.", true);
    }
  };

  // Fonction pour ajouter un utilisateur via l'API
  const addUser = async () => {
    if (newUser.username && newUser.role) {
      try {
        await axios.post('http://localhost:3000/api/usersmanag/users', newUser);
        setNewUser({ username: '', role: '' });
        fetchUsers(); // Recharger la liste des utilisateurs après l'ajout
        showNotification("Utilisateur ajouté avec succès !");
      } catch (error) {
        console.error('Error adding user:', error);
        showNotification("Erreur lors de l'ajout de l'utilisateur.", true);
      }
    } else {
      showNotification("Veuillez remplir tous les champs.", true);
    }
  };

  // Fonction pour supprimer un utilisateur via l'API
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/usersmanag/users/${id}`);
        fetchUsers(); // Recharger la liste des utilisateurs après la suppression
        showNotification("Utilisateur supprimé avec succès !");
      } catch (error) {
        console.error('Error deleting user:', error);
        showNotification("Erreur lors de la suppression de l'utilisateur.", true);
      }
    }
  };

  // Fonction pour mettre à jour un utilisateur via l'API
  const updateUser = async (id) => {
    const updatedUsername = prompt("Nouveau nom d'utilisateur", users.find(user => user.id === id).name);
    const updatedRole = prompt("Nouveau rôle", users.find(user => user.id === id).userType);
    if (updatedUsername && updatedRole) {
      try {
        await axios.put(`http://localhost:3000/api/usersmanag/users/${id}`, {
          username: updatedUsername,
          role: updatedRole,
        });
        fetchUsers(); // Recharger la liste des utilisateurs après la mise à jour
        showNotification("Utilisateur modifié avec succès !");
      } catch (error) {
        console.error('Error updating user:', error);
        showNotification("Erreur lors de la modification de l'utilisateur.", true);
      }
    }
  };

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Réinitialiser la pagination lors de la recherche
  };

  // Fonction pour basculer l'ordre de tri
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fonction pour afficher une notification
  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // La notification disparaît après 3 secondes
  };

  // Filtrer et trier les utilisateurs
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userType.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Bouton pour basculer en mode sombre */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
          {notification.message}
        </div>
      )}

      <div className="user-management">
        {/* Ajout de l'image dans l'en-tête */}
        <div className="header-with-image">
          <img src={img} alt="Gestion des utilisateurs" className="header-image" />
          <h2 className="title">Gestion des Utilisateurs</h2>
        </div>

        {/* Barre de recherche */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Bouton de tri */}
        <button onClick={toggleSortOrder} className="sort-button">
          {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          Trier par nom ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>

        {/* Formulaire d'ajout d'utilisateur */}
        <div className="user-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="user-input"
          />
          <input
            type="text"
            placeholder="Rôle"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="user-input"
          />
          <button onClick={addUser} className="add-user-button">
            <FaUserPlus /> Ajouter
          </button>
        </div>

        {/* Liste des utilisateurs */}
        <ul className="user-list">
          {currentUsers.map((user, index) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.userType}</span>
              <div className="user-actions">
                <button onClick={() => updateUser(user.id)} className="edit-button">
                  <FaEdit /> Modifier
                </button>
                <button onClick={() => deleteUser(user.id)} className="delete-button">
                  <FaTrash /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Nouvel espace pour afficher les utilisateurs ajoutés en dehors de user-management */}
      <div className="external-users">
        <h3>Utilisateurs Ajoutés</h3>
        <ul>
          {currentUsers.map((user, index) => (
            <li key={user.id} className="external-user-item">
              <span>{user.name}</span> - <span>{user.userType}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserManagement;