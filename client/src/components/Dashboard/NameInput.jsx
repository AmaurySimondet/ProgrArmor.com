import {React, useState, useEffect} from "react";
import Select from "./Select";
import API from "../../utils/API";

function NameInput(props) {
  const [nom, setNom] = useState({});
  const [listeNoms, setListeNoms] = useState([]);

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

  async function getNames(){
    const {data} = await API.workouts({nom: "", periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
    if (data.success === false){
        alert(data.message);
    } else {
        let arr = []
        data.seances.forEach((seance, index) => {
            if (seance.nom){
                if (seance.nom.ancienNom !== "nouveau-nom"){
                    if (!arr.includes(seance.nom.ancienNom)){
                        arr.push(seance.nom.ancienNom)
                    }
                }
                else{
                    if (!arr.includes(seance.nom.nouveauNom)){
                        arr.push(seance.nom.nouveauNom)
                    }
                }
            }
        })
        setListeNoms(arr);
    }
  }

  useEffect(() => {
    getNames();
  }, [] );

  return (
    <div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Nom de la séance
            </label>
            <div className="col-sm-10">
                <select onChange={handleChange} className="custom-select" id="ancienNom">
                    <option value="title"> / (défaut) </option>
                    {listeNoms ? listeNoms.map((nom,index) => {
                        return <option key={index} value={nom}> {nom} </option>
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



