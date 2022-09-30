import {React, useState} from "react";
import lesExercices from "./Exercices";
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

function ExerciceInput(props) {
  const [exercice, setExercice] = useState({name: "", ownExercice: ""});

  function handleChange(event){
    event.preventDefault();

    setExercice(oldExercice => {
            return ({
            ...oldExercice,
            [event.target.id]: event.target.value,
        });
    });

    props.changeExercice(exercice);
  }

  return (
    <div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Exercice
            </label>
            <div className="col-sm-10">
                <select onChange={handleChange} className="custom-select col-sm-10" id="name">
                    {lesExercices.map(createEntry)}
                </select>
            </div>
          </div>

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



