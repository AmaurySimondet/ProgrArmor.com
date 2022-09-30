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
    const [fullExercice, setFullExercice] = useState({name: "", series: {}});
    const [numberOfSeries ,setNumberOfSeries] = useState(0);

    function changeExercice(exercice){
        event.preventDefault();

        setFullExercice(oldFullExercice => {
            return ({
            ...oldFullExercice,
            name: exercice,
        });
    })}

    function changeSerie(serie, num){
        const otherThanFiltered = {}

        if (FullExerciceInput.series) {otherThanFiltered = FullExerciceInput.series.filter(function (serie) {
              if(serie.num !== num) {
                return true
              } else {
                return false;
              }
        });
        }

        setFullExercice(oldFullExercice => {
            return ({
            ...oldFullExercice,
            series: {...otherThanFiltered, serie},
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

    function onDeleteSerie(num){
        const seriesDeleted = {}

        if (FullExerciceInput.series) {seriesDeleted = FullExerciceInput.series.filter(function (serie) {
          if(serie.num !== num) {
            return true
          } else {
            return false;
          }
        });
        };

        setFullExercice(oldFullExercice => {
            return({
                ...oldFullExercice,
                series: seriesDeleted,
            })
        });
    }

    function onAddSerie(){
        event.preventDefault();
        let lastKey = 0;

        if (fullExercice.series) {
            for(var key in fullExercice.series){
                    lastKey = key;
                }
        }

        const data = {num: lastKey+1};

        setFullExercice(oldFullExercice => {
            return({
                ...oldFullExercice,
                series: {...series, data},
            })
        })
    }

    return(
          <div>
              <ExerciceInput id="name" value={fullExercice.name} changeExercice={changeExercice} />

              <div id="series">
                  {fullExercice.series ? Object.keys(fullExercice.series).map((serie,index) => {
                    return(
                        <SerieInput
                            key={index+1}
                            num={index+1}
                            poids={props.poids}
                            changeSerie={changeSerie}
                            onAddSerie={onAddSerie}
                            onDeleteSerie={onDeleteSerie}
                    />);
                  })
                  : null
                  }
              </div>


              <button className="btn btn-dark form-button" onClick={onAddSerie} type="submit">Ajouter une série !</button>
              <br/>
          </div>
    )
}

export default FullExerciceInput;