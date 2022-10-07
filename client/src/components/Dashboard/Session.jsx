import {React, useState} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import API from "../../utils/API";
import DebutantForm from "./DebutantForm.jsx"
import ExpertForm from "./ExpertForm.jsx"
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red['A700'],
    '&:hover': {
      backgroundColor: alpha(red['A700'], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red['A700'],
  },
}));

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

              <p className="session-div-switch"> Débutant <GreenSwitch onChange={handleChange}/> Expert </p>

              {switched ? <ExpertForm/> : <DebutantForm/>}
          </div>


      </div>
    );
};

export default Session;