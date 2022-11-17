import {React, useState, useEffect} from "react";
import lesExercices from "./Exercices";
import Select from "react-select";
import MusclesCategorie from "./Categories/MusclesCategorie.js";
import customStyles from "./customStyles.js";
import customStylesDark from "./customStylesDark";

function ExerciceEchauffementInput(props) {

  const [exercice, setExercice] = useState(props.echauffement);

  function handleChange(event){
    if(event.target){
        setExercice(oldExercice => {
        return ({
            ...oldExercice,
            [event.target.id]: event.target.value,
            })
        });
    }
    else{
        setExercice(oldExercice => {
            return ({
                ...oldExercice,
                [event.id]: event.value,
                })
            });
    }
  }

  useEffect(() => {
    props.changeEchauffement(exercice);
  }, [exercice]);

    function handleClickPoubelle(){
         props.onDeleteEchauffements(props.num);

         event.preventDefault();
  }

  function handleClickLabel(){
    props.onClickExercice();
  }

  return (
    <div>
          <div className="form-group row">
            <label onClick={handleClickLabel} className="col-sm-2 col-form-label exercice-label">
              Echauffement {props.num+1}
              {props.clickExercice ?
                <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
              :
                <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
              }
            </label>
            <div className="col-sm-9">
              <Select
                  placeholder="Exercice..."
                  onChange={handleChange}
                  options={lesExercices}
                  styles={props.modeSombre===true ? customStylesDark : customStyles}
                  value={{value: exercice.name, label: exercice.name}}
              />
            </div>
            <div className="col-sm-1 poubelle-div">
              <img className={props.modeSombre===true ? "poubelleDark" : "poubelle"} onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
            </div>
          </div>

          {exercice.name === "Elevation" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <div className="col-sm-9">
                  <Select
                      placeholder="Muscle..."
                      onChange={handleChange}
                      options={MusclesCategorie}
                      styles={props.modeSombre===true ? customStylesDark : customStyles}
                      value={{value: exercice.muscle, label: exercice.muscle}}
                  />
                </div>
            </div>
          : exercice.name === "Curl" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <div className="col-sm-9">
                  <Select
                      placeholder="Muscle..."
                      onChange={handleChange}
                      options={MusclesCategorie}
                      styles={props.modeSombre===true ? customStylesDark : customStyles}
                      value={{value: exercice.muscle, label: exercice.muscle}}
                  />
                </div>
            </div>
          : exercice.name === "Extension" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <div className="col-sm-9">
                  <Select
                      placeholder="Muscle..."
                      onChange={handleChange}
                      options={MusclesCategorie}
                      styles={props.modeSombre===true ? customStylesDark : customStyles}
                      value={{value: exercice.muscle, label: exercice.muscle}}
                  />
                </div>
            </div>
          : exercice.name === "Abduction" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <div className="col-sm-9">
                  <Select
                      placeholder="Muscle..."
                      onChange={handleChange}
                      options={MusclesCategorie}
                      styles={props.modeSombre===true ? customStylesDark : customStyles}
                      value={{value: exercice.muscle, label: exercice.muscle}}
                  />
                </div>
            </div>
          : exercice.name === "Adduction" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <div className="col-sm-9">
                  <Select
                      placeholder="Muscle..."
                      onChange={handleChange}
                      options={MusclesCategorie}
                      styles={props.modeSombre===true ? customStylesDark : customStyles}
                      value={{value: exercice.muscle, label: exercice.muscle}}
                  />
                </div>
            </div>
          : exercice.name === "Press" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <div className="col-sm-9">
                  <Select
                      placeholder="Muscle..."
                      onChange={handleChange}
                      options={MusclesCategorie}
                      styles={props.modeSombre===true ? customStylesDark : customStyles}
                      value={{value: exercice.muscle, label: exercice.muscle}}
                  />
                </div>
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

export default ExerciceEchauffementInput;



