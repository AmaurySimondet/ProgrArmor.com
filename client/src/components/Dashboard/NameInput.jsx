import {React, useState, useEffect} from "react";
import Select from "./Select";

function NameInput(props) {
  const [nom, setNom] = useState({ancienNom: "nouveau-nom", nouveauNom: ""});
  const anciensNoms = [{ancienNom: "nouveau-nom", nouveauNom: "Force bas du corps"}, {ancienNom: "nouveau-nom", nouveauNom: "Freestyle haut du corps"}];

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
            <div className="col-sm-9">
                <select onChange={handleChange} className="custom-select col-sm-10" id="ancienNom">
                    {anciensNoms ? anciensNoms.map(nom => {
                        return <option value={nom.nouveauNom}> {nom.nouveauNom} </option>
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



