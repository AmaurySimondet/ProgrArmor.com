import {React, useState, useEffect} from "react";
import Select from "react-select"
import customStyles from "./customStyles";

function NameInput(props) {
  const [nom, setNom] = useState(props.nom);

  function handleChange(event){
    if(event.target){
        setNom(oldNom => {
        return ({
            ...oldNom,
            [event.target.id]: event.target.value,
            })
        });
    }
    else{
      setNom(oldNom => {
        return ({
            ...oldNom,
                [event.id]: event.value,
                })
            });
    }
  }

  useEffect(() => {
    console.log(nom)
    props.changeName(nom);
  }, [nom]);

  return (
    <div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Nom de la séance
            </label>
            <div className="col-sm-10">
              <Select
                  placeholder="Nom..."
                  onChange={handleChange}
                  options={[
                    {label: "/ (défaut)", value:"title"},
                    props.listeNoms.map((nom,index) => {
                      return {key:{index}, value: nom, label: nom}
                    }),
                    {value:"nouveau-nom", label: "Entrer un nouveau nom de séance..."}
                  ]}
                  styles={customStyles}
                  value={{value: nom.ancienNom, label: nom.ancienNom}}
              />
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



