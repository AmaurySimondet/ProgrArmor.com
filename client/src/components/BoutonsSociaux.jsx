import React from "react";

function BoutonsSociaux(props) {
  const url = "http://192.168.1.88:8800" // http://192.168.1.88:8800 http://192.168.1.88:8800

  return (
    <div>
      <a className="btn btn btn-social btn-google" href={url + "/user/auth/google"} role="button">
        <img className="icon-google" style={{ boxShadow: "none" }} src={require('../images/icons/icons8-google-plus-squared-48.webp')} alt="google" />
        {props.inscription ? "Inscription via Google" : "Connexion via Google"}
      </a>

      <a className="btn btn btn-social btn-facebook" href={url + "/user/auth/facebook"} role="button">
        <img className="icon-facebook" style={{ boxShadow: "none" }} src={require('../images/icons/icons8-facebook-circled-48.webp')} alt="facebook" />
        {props.inscription ? "Inscription via Facebook" : "Connexion via Facebook"}
      </a>
    </div>
  )
}

export default BoutonsSociaux;