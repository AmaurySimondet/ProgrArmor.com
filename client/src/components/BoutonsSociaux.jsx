import React from "react";

function BoutonsSociaux(props){
    return(
        <div>
              <a className="btn btn btn-social btn-google" href="https://prograrmorprealpha1.herokuapp.com/user/auth/google" role="button">
                <img className="icon-google" src={require('../images/icons/icons8-google-plus-squared-48.png')} alt="google" />
                {props.inscription ? "Inscription via Google" : "Connexion via Google"}
              </a>

              <a className="btn btn btn-social btn-facebook" href="https://prograrmorprealpha1.herokuapp.com/user/auth/facebook" role="button">
                <img className="icon-facebook" src={require('../images/icons/icons8-facebook-circled-48.png')} alt="facebook" />
                {props.inscription ? "Inscription via Facebook" : "Connexion via Facebook"}
              </a>
        </div>
    )
}

export default BoutonsSociaux;