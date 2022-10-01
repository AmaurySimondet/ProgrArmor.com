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
    const [series, setSeries] = useState([])
    const [fullExercice, setFullExercice] = useState({});

    function changeExercice(exercice){
        event.preventDefault();

        setFullExercice(oldFullExercice => {
            return ({
                ...oldFullExercice,
                exercice: exercice,
            });
        });

        props.changeFullExercice(fullExercice);
    }

    function changeSerie(serie, num, exerciceOf){
        event.preventDefault();

        const otherThanSelected =  series.filter((serie, index) => {
            return index!==(num)
        })

        setSeries([...otherThanSelected, serie])

        props.changeFullExercice(fullExercice, series);
    }

    function onAddSerie(serie, num){
        event.preventDefault();

        const otherThanSelected =  series.filter((serie, index) => {
            return index!==(num)
        })

        setSeries([...otherThanSelected, serie])
    }

    function onDeleteSerie(num){
        event.preventDefault();

        setSeries(oldSeries => {
            return(
                oldSeries.filter((serie, index) => {
                    return index!==(num)
                })
            )
        })
    }

    return(
          <div>
              <ExerciceInput id="exercice" value={fullExercice.exercice} num={props.num} onDeleteExercices={props.onDeleteExercices} changeExercice={changeExercice} />

              {series ? series.map((serie,index) => {
                return(
                    <SerieInput
                        key={index}
                        num={index}
                        exercice={fullExercice.exercice}
                        poids={props.poids}
                        onAddSerie={onAddSerie}
                        changeSerie={changeSerie}
                        onDeleteSerie={onDeleteSerie}
                />);
              })
              : null
              }

              <button className="btn btn-dark form-button" onClick={onAddSerie} type="submit">Ajouter une série !</button>
              <br/>
          </div>
    )
}

export default FullExerciceInput;