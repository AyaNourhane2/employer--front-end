import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ buttons, onButtonClick, activeButton, onLogout, dashboardName }) => {
  return (
    <div className="navigation">
      {/* عنوان لوحة التحكم */}
      <h2 className="dashboard-title">{dashboardName}</h2>
      <ul>
        {/* عرض الأزرار الممررة عبر الـ props */}
        {buttons.map((button, index) => (
          <li
            key={index}
            className={button === activeButton ? "active" : ""} // تحديد الزر النشط
            onClick={() => onButtonClick(button)} // عند النقر على الزر
          >
            <Link to="#">
              <span className="title">{button}</span>
            </Link>
          </li>
        ))}
        {/* زر تسجيل الخروج */}
        <li onClick={onLogout}>
          <Link to="/logout">
            <span className="title">Déconnexion</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;