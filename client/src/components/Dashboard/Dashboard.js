import React from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"

import API from "../../utils/API";

function Dashboard() {
  async function disconnect() {
    await API.logout();
    localStorage.removeItem('token');
    window.location = "/";
  };

  return (
      <div>
          <NavigBar location="dashboard"/>

          <div className="Dashboard">
            <h1>Connecté !</h1>
            <Button onClick={disconnect} block="true" type="submit">
              Se déconnecter
            </Button>
          </div>
      </div>
    );
};

export default Dashboard;