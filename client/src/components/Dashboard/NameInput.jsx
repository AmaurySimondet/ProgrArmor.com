import {React, useState, useEffect} from "react";
import Select from "./Select";

function NameInput(props) {
  const [nom, setNom] = useState({});
  const anciensNoms = [{ancienNom: "ancien-nom", nouveauNom: "Force bas du corps"}, {ancienNom: "ancien-nom", nouveauNom: "Freestyle haut du corps"}];

  function handleChange(event){
    event.preventDefault();

    setNom(oldNom => {
            return ({
            ...oldNom,
            [event.target.id]: event.target.value,
        })});
  }

  useEffect(() => {
    props.changeName(nom);
  }, [nom]);

  return (
    <div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Nom de la séance
            </label>
            <div className="col-sm-10">
                <select onChange={handleChange} className="custom-select col-sm-10" id="ancienNom">
                    <option value="title"> / (défaut) </option>
                    {anciensNoms ? anciensNoms.map((nom,index) => {
                        return <option key={index} value={nom.nouveauNom}> {nom.nouveauNom} </option>
                    })
                    : null }
                    <option value="nouveau-nom"> Entrer un nouveau nom de séance... </option>
                </select>
            </div>
          </div>

          {nom.ancienNom === "nouveau-nom" ?
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Nom de la séance</label>
                <div className="col-sm-5">
                  <input type="text"
                      className="form-control"
                      onChange={handleChange}
                      placeholder="Annihilation des biceps"
                      id="nouveauNom"
                      value={nom.nouveauNom}
                  />
                </div>
              </div>
          : null }
    </div>
  );
};

export default NameInput;



