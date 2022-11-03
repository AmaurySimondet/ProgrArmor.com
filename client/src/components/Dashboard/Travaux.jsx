import React from "react";
import Footer from "../Footer.jsx";
import NavigBar from "../NavigBar.jsx"

function Travaux() {
  return (
      <div>
          <NavigBar />

          <div className="Travaux-div">
            <h1>Oups !</h1>
            <p>
                <img className="travaux-icon" src={require('../../images/icons/icons8-man-construction-worker-48.png')} alt="miguel" />
                <br/>
                Miguel fait encore chauffer la betonnière pour cette page ! Reviens plus tard...
                <br/>
                <img className="travaux-icon" src={require('../../images/icons/icons8-brick-48.png')} alt="brique" />
            </p>
          </div>

          <Footer/>
      </div>
    );
};

export default Travaux;