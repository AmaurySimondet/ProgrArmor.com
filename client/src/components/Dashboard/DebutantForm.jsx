import {React, useState} from "react";
import API from "../../utils/API";
import axios from 'axios';
import exercices from "./Exercices";
import Select from "./Select";

function createEntry(exercicesTerm) {
  return (
    <Select
      key={exercicesTerm.id}
      class={exercicesTerm.class}
      name={exercicesTerm.name}
      value={exercicesTerm.value}
    />
  );
}

const ReactComment = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }}/>
}

function DebutantForm() {
  const [state, setState] = useState({
    date: "",
    poids: "",
    exercice: "",
    charge: "",
    percent: "",
    typeSerie: "reps",
    repsTime: "",
  });

  const [clicked, setClicked] = useState("hide");

  function handleClickPoids(){
    if(clicked==="hide"){
        setClicked("nothide");
    } else { setClicked("hide")};
  }

  async function handleClick() {
    event.preventDefault();

    const { date, poids, exercice, typeSerie, repsTime, charge, percent } = state;

    if (!date || date.length === 0) {
      return alert("No date given !");
    }
//    try {
//      const { data } = await API.login(email, password);
//      if (data.success === true){
//        localStorage.setItem("token", data.token);
//        window.location = "/dashboard";
//      }else{
//        alert(data.message);
//      }
//    } catch (error) {
//      alert(error);
//    }
  };

  function handleClickSerie(){
         return null
  }

  function handleClickExercice(){
        return null
  }

  function handleClickPoubelle(){
         return null
  }

  function handleChange(event){
    event.preventDefault();

    const calc = state.charge/state.poids;

    setState(oldState => {
        return ({
            ...oldState,
            [event.target.id]: event.target.value,
        });
    });

    if (state.charge !== "" && state.poids !== "") {
        setState(oldState => {
            return ({
                ...oldState,
                percent: ""+(oldState.charge/oldState.poids * 100).toFixed(2)+"%",
            });
        });
    }
  };

    return(
        <form className="debutant-form">

          <ReactComment text={'DATE'}/>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Date</label>
            <div className="col-sm-10">
              <input type="date"
                  className="form-control"
                  id="date"
                  value={state.date}
                  onChange={handleChange}
                  autoFocus
              />
            </div>
          </div>

          <ReactComment text={'POIDS'}/>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Ton poids (kg)
                <img className="myDIV" onClick={handleClickPoids} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                <div className={clicked}>
                    <strong> Pourquoi te demander ton poids ? </strong> <br/>
                    <br/>
                    La force relative à ton poids (<i>par exemple un developpé couché à 100% de ton poids</i>) est une information bien plus intéressante que la force absolue (<i>un developpé couché à 100kg</i>) <br/>
                    <br/>
                    Ton poids permet donc à <strong> ProgrArmor </strong> de: <br/>
                    - Te comparer de manière équitable avec tes amis <br/>
                    - De suivre ta progression quelque soit ta prise de muscle ou perte de poids <br/>
                    <br/>
                    Pèses toi au moins une fois par semaine et toujours dans les mêmes conditions pour un traçage optimal <br/>
                    Tu peux gérer la visibilité de ton poids par tes amis dans les paramètres de ton compte <br/>
                    <br/>
                    <i> {"Cliques à nouveau sur l'icone ? pour faire disparaître ce bandeau d'information"} </i>
                </div>
            </label>
            <div className="col-sm-10">
              <input
                  type="poids"
                  className="form-control"
                  placeholder="120"
                  value={state.poids}
                  id="poids"
                  onChange={handleChange}
              />
            </div>
          </div>

          <ReactComment text={'EXERCICE'}/>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Exercice
            </label>
            <div className="col-sm-10">
                <select onChange={handleChange} className="custom-select col-sm-10" id="exercice">
                    {exercices.map(createEntry)}
                </select>
            </div>
          </div>

          <ReactComment text={'OWN-EXERCICE'}/>
          {state.exercice === "own-exercice" ?
              <div className="form-group row">
                <div className="col-sm-5">
                <p>
                    <u>Attention:</u> Pour une experience optimale de ProgrArmor, choisis un exercice parmis la liste précédente <br/>
                    {"Tu accèderas à plus de choix en selectionnant le mode Expert avec l'interrupteur"}
                </p>
                </div>
                <label className="col-sm-2 col-form-label">Ton exercice</label>
                <div className="col-sm-5">
                  <input type="text"
                      className="form-control"
                      onChange={handleChange}
                      id="own-exercice"
                      value={state.ownExercice}
                      onChange={handleChange}
                  />
                </div>
              </div>
          : null }

          <ReactComment text={'SERIE'}/>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Série 1</label>
            <div className="col-sm-3">
                <select onChange={handleChange} className="custom-select" id="typeSerie">
                    <option value="reps"> Répétitions (défaut) </option>
                    <option value="time"> Temps (secondes) </option>
                </select>
            </div>
            <div className="col-sm-1">
              <input type="text"
                  className="form-control"
                  id="repsTime"
                  value={state.repsTime}
                  onChange={handleChange}
              />
            </div>
            <label className="col-sm-2 col-form-label">Charge totale (kg)</label>
            <div className="col-sm-1">
              <input type="text"
                  className="form-control"
                  id="charge"
                  value={state.charge}
                  onChange={handleChange}
              />
            </div>
            <div className="col-sm-2">
              <input type="percent"
                  className="form-control"
                  id="percent"
                  value={state.percent}
                  readOnly
              />
            </div>
            <div className="col-sm-1">
              <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
            </div>
          </div>

          <button className="btn btn-lg btn-dark form-button" onClick={handleClickSerie} type="submit">Ajouter une série !</button>
          <br/>

          <button className="btn btn-lg btn-dark form-button" onClick={handleClickExercice} type="submit">Ajouter un exercice à cette séance !</button>
          <br/>

          <button className="btn btn-lg btn-dark form-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
        </form>
    )
};

export default DebutantForm;