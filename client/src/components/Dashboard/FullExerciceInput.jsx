import ExerciceInput from "./ExerciceInput";
import SerieInput from "./SerieInput";
import exercices from "./Exercices";
import Select from "./Select";
import {React, useState} from "react";

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

function FullExerciceInput(props){
    const [fullExercice, setFullExercice] = useState({})

    function changeExercice(exercice){
        event.preventDefault();

        setFullExercice(oldFullExercice => {
            return ({
            ...oldFullExercice,
            name: exercice,
        });
    })}

    function changeSerie(serie){
        setFullExercice(oldFullExercice => {
            return ({
            ...oldFullExercice,
            serie: serie,
        });
    })};

    function handleChange(event){
        setFullExercice(oldFullExercice => {
            return ({
                ...oldFullExercice,
                [event.target.id]: event.target.value,
            });
        });

        props.changeFullExercice(fullExercice);
      };

    function handleClickSerie(){
        return null;
    }

    return(
          <div>
              <ExerciceInput id="name" value={fullExercice.name} changeExercice={changeExercice} />
              <SerieInput id="serie" value={fullExercice.serie} changeSerie={changeSerie} num={"1"} poids={props.poids}/>

              <button className="btn btn-dark form-button" onClick={handleClickSerie} type="submit">Ajouter une série !</button>
              <br/>
          </div>
    )
}

export default FullExerciceInput;