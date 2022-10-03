import {React, useState} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import { Switch } from '@mui/material';
import API from "../../utils/API";
import DebutantForm from "./DebutantForm.jsx"
import ExpertForm from "./ExpertForm.jsx"

function Session() {
  const [switched, setSwitched] = useState(false);

  function handleChange(){
    event.preventDefault();

    setSwitched(!switched);
    console.log(switched);
  }

  return (
      <div>
          <NavigBar location="session"/>

          <div className="session-div">
              <h1> Enregistre ta séance ! </h1>

              <p className="session-div-switch"> Débutant <Switch onChange={handleChange} /> Expert </p>

              {switched ? <ExpertForm/> : <DebutantForm/>}
          </div>


      </div>
    );
};

export default Session;