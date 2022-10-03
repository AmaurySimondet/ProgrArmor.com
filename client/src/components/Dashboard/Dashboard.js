import {React, useState} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"

import API from "../../utils/API";

function Dashboard() {
    const [seances, setSeances] = useState([]);

  async function disconnect() {
    await API.logout();
    localStorage.removeItem('token');
    window.location = "/";
  };

  async function getWorkouts(){
    const {data} = await API.workouts();
    if (data.success === false){
        alert(data.message);
    } else {
        console.log(data.seances);
        setSeances(data.seances);
    }
  }

  return (
      <div>
          <NavigBar location="dashboard"/>

          <div className="Dashboard">
            <h1>Connecté !</h1>
            <Button onClick={disconnect} block="true" type="submit">
              Se déconnecter
            </Button>

            <Button onClick={getWorkouts} block="true" type="submit">
              Get data
            </Button>

            <table className="dashboard-table">
                <tbody>
                  {seances ? seances.map((seance,index) => {
                    return(
                        <tr>
                            <td className="dashboard-td">
                                {seance.date}
                            </td>
                            <td className="dashboard-td">
                                {seance.poids}
                            </td>
                        </tr>

                    );
                  })
                  : null
                  }
                </tbody>
            </table>
          </div>
      </div>
    );
};

export default Dashboard;