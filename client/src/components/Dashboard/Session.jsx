import {React, useState, useEffect} from "react";
import NavigBar from "../NavigBar.jsx"
import DebutantForm from "./DebutantForm.jsx"
import ExpertForm from "./ExpertForm.jsx"
import API from "../../utils/API.js";
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Footer from "../Footer.jsx";

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
  const [user, setUser] = useState()

  async function getUser(){
      const {data} = await API.getUser({id: localStorage.getItem("id")});
      if (data.success === false){
          alert(data.message);
      } else {
          console.log(data.profile);
          if (data.profile.modeSombre && data.profile.modeSombre===true){
            // 👇 add class to body element
            document.body.classList.add('darkMode');
          }
          setUser(data.profile);
      };
  }

  useEffect(() => {
      getUser();
  }, []);

  function handleChange(){
    event.preventDefault();

    setSwitched(!switched);
  }

  return (
      <div>
          <NavigBar location="session"/>

          <div className="session-div">
              <h1> Enregistre ta séance ! </h1>

              <p className="session-div-switch"> Débutant <GreenSwitch onChange={handleChange}/> Expert </p>

              {switched ? 
                <ExpertForm modeSombre={user && user.modeSombre ? true : false} /> 
              : 
                <DebutantForm modeSombre={user && user.modeSombre ? true : false} />
              }

          </div>

          <Footer />
      </div>
    );
};

export default Session;