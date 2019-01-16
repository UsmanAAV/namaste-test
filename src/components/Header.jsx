import React from 'react';
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <header>
      <div className="header-container">
        <div className="app-title">
          <h3>Planner</h3>
        </div>
        <nav className="menu-top">
          <ul className="menu-main">
            <li className="menu-item"><NavLink to="/main">Main</NavLink></li>
            <li className="menu-item"><NavLink to="/configure">Configure</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
