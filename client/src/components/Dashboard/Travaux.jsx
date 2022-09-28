import React from "react";
import NavigBar from "../NavigBar.jsx"

function Travaux() {
  return (
      <div>
          <NavigBar />

          <div className="Travaux-div">
            <h1>Oups !</h1>
            <p>
                <img className="travaux-icon" src={require('../../images/icons/icons8-man-construction-worker-48.png')} alt="miguel" />
                Miguel fait encore chauffer la betonnière pour cette page ! Reviens plus tard...
                <img className="travaux-icon" src={require('../../images/icons/icons8-brick-48.png')} alt="brique" />
            </p>
          </div>
      </div>
    );
};

export default Travaux;