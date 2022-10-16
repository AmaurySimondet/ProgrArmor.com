import {React, useState, useEffect} from "react";
import lesExercices from "./Exercices";
import Select from "./Select";
import MusclesCategorie from "./Categories/MusclesCategorie.js";

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

function ExerciceInput(props) {
  const [exercice, setExercice] = useState({name: "", ownExercice: ""});

  function handleChange(event){
    event.preventDefault();

    setExercice(oldExercice => {
            return ({
            ...oldExercice,
            [event.target.id]: event.target.value,
        })});
  }

  useEffect(() => {
    props.changeExercice(exercice);
  }, [exercice]);

    function handleClickPoubelle(){
         props.onDeleteExercices(props.num);

         event.preventDefault();
  }

  function handleClickLabel(){
    props.onClickExercice();
  }

  return (
    <div>
          <div className="form-group row">
            <label onClick={handleClickLabel} className="col-sm-2 col-form-label exercice-label">
              Exercice {props.num+1}
              {props.clickExercice ?
                <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
              :
                <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
              }
            </label>
            <div className="col-sm-9">
                <select onChange={handleChange} className="custom-select col-sm-10" id="name">
                    {lesExercices.map(createEntry)}
                </select>
            </div>
            <div className="col-sm-1 poubelle-div">
              <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
            </div>
          </div>

          {exercice.name === "Elevation" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="muscle">
                    {MusclesCategorie.map(createEntry)}
                </select>
            </div>
          : exercice.name === "Curl" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="muscle">
                    {MusclesCategorie.map(createEntry)}
                </select>
            </div>
          : exercice.name === "Extension" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="muscle">
                    {MusclesCategorie.map(createEntry)}
                </select>
            </div>
          : exercice.name === "Abduction" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="muscle">
                    {MusclesCategorie.map(createEntry)}
                </select>
            </div>
          : exercice.name === "Adduction" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="muscle">
                    {MusclesCategorie.map(createEntry)}
                </select>
            </div>
          : exercice.name === "Press" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="muscle">
                    {MusclesCategorie.map(createEntry)}
                </select>
            </div>
          : null}

          {exercice.name === "own-exercice" ?
              <div className="form-group row">
                <div className="col-sm-5">
                <p className="info-own-exercice">
                    <u>Attention:</u> Pour une experience optimale de ProgrArmor, choisis un exercice parmis la liste précédente <br/>
                    {"Tu accèderas à plus de choix en selectionnant le mode Expert avec l'interrupteur"}
                </p>
                </div>
                <label className="col-sm-2 col-form-label">Ton exercice</label>
                <div className="col-sm-5">
                  <input type="text"
                      className="form-control"
                      onChange={handleChange}
                      id="ownExercice"
                      value={exercice.ownExercice}
                  />
                </div>
              </div>
          : null }
    </div>
  );
};

export default ExerciceInput;



