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

//  function handleChange(event){
//    event.preventDefault();
//
//    setFullExercice(oldFullExercice => {
//            return ({
//            ...oldFullExercice,
//            [event.target.id]: event.target.value,
//        });
//    });
//  }

//    React.useEffect(() => {
//        if (series) {
//            setFullExercice(oldFullExercice => {
//                return ({
//                ...oldFullExercice,
//                series: series,
//                });
//            })
//        }
//    }, [series])

    function onAddSerie(serie, num){
        event.preventDefault();

        const otherThanSelected =  series.filter((serie, index) => {
            return index!==num
        })

        setSeries([...otherThanSelected, serie])
    }

    function onDeleteSerie(num){
        event.preventDefault();

        setSeries(oldSeries => {
            return(
                oldSeries.filter((serie, index) => {
                    return index!==(num-1)
                })
            )
        })
    }

    return(
          <div>
              <ExerciceInput id="exercice" value={fullExercice.exercice} changeExercice={changeExercice} />

              {series ? series.map((serie,index) => {
                return(
                    <SerieInput
                        key={index+1}
                        num={index+1}
                        poids={props.poids}
                        onAddSerie={onAddSerie}
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