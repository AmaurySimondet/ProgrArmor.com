import { React, useState } from "react";
import API from "../utils/API";


function InscriptionForm(){
  const stateNull = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    cpassword: ""
  };

  const [state, setState] = useState(stateNull);

  async function handleClick() {
    event.preventDefault();

    const { fName, lName, email, password, cpassword } = state;

    if (!email || email.length === 0) return alert("No email given !");
    if (!password || password.length === 0) return alert("No password given !");
    if (!fName || fName.length === 0) return alert("No first name given !");
    if (!lName || lName.length === 0) return alert("No last name given !");
    if (password !== cpassword) return alert("Passwords missmatch !");
    try {
      const { data } = await API.signup({ fName, lName, email, password });
      if (data.success === true){
          localStorage.setItem("token", data.token);
          window.location = "/dashboard";
      } else { alert(data.message); }
    } catch (error) {
      alert(error);
    }
  };

  function handleChange(event){
    setState(oldState => {
        return ({
            ...oldState,
            [event.target.id]: event.target.value
        });
    });
  };

    return(
        <form className="inscription-form">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Prénom</label>
            <div className="col-sm-10">
              <input
              type="text"
              className="form-control"
              id="fName"
              placeholder="Sylvain"
              value={state.fName}
              onChange={handleChange}
              autoFocus/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputNom" className="col-sm-2 col-form-label">Nom</label>
            <div className="col-sm-10">
              <input
              type="text"
              className="form-control"
              id="lName"
              placeholder="D."
              value={state.lName}
              onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
              type="email"
              className="form-control"
              id="email"
              placeholder="emaildumaitre@yoyo.com"
              value={state.email}
              onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Mot de passe</label>
            <div className="col-sm-10">
              <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Naturel_?_Oui"
              value={state.password}
              onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Confirmation mot de passe</label>
            <div className="col-sm-10">
              <input
              type="password"
              className="form-control"
              id="cpassword"
              placeholder="Naturel_?_Oui"
              value={state.cpassword}
              onChange={handleChange}
              />
            </div>
          </div>
          <p className="p-cgu">En cliquant sur le bouton "Inscription" ci dessous,  vous certifiez avoir pris connaissance et approuvé nos CGU</p>
          <button className="btn btn-lg btn-dark" onClick={handleClick} type="submit">Inscription</button>
        </form>
    )
}

export default InscriptionForm;