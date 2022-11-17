import ExerciceInput from "./ExerciceInput";
import SerieInput from "./SerieInput";
import {React, useState, useEffect} from "react";

function FullExerciceInput(props){

    const [series, setSeries] = useState([...Object.values(props.exercice.Series)]);
    const [fullExercice, setFullExercice] = useState(props.exercice);

    // console.log("fullExercice")
    // console.log(fullExercice)
    // console.log("props.exercice")
    // console.log(props.exercice)

    function changeExercice(exercice){
        setFullExercice(oldFullExercice => {
            return ({
                ...oldFullExercice,
                exercice: exercice,
            });
        });
    }

    function changeSerie(serie, num, exerciceOf){
        const otherThanSelected =  series.filter((serie, index) => {
            return index!==(num)
        });

        setSeries([...otherThanSelected, serie]);
    }

    useEffect(() => {
        const Series = {...series};
        const Exercice = {...fullExercice, Series};
        props.changeExercices(Exercice, props.id);
    }, [fullExercice, series])

    function onAddSerie(event){
        event.preventDefault();

        setSeries([...series, []])
    }

    function onCopySerie(event){
        event.preventDefault();

        let last = {}
        if(series[series.length - 1]){
            last = series[series.length - 1]
        }
        else{
            last = {typeSerie: "reps", repsTime: "", charge: "", percent: ""}
        }

        setSeries([...series, last])
    }

    function onDeleteSerie(num){
        event.preventDefault();

        console.log(num)

        setSeries(oldSeries => {
            return(
                oldSeries.filter((serie, index) => {
                    console.log(index, num, index!==(num))
                    return index!==(num)
                })
            )
        })
    }

    return(
          <div className="exercice-div">
              <hr className={props.modeSombre === true ? "hr-exercice-dark" : "hr-exercice"}/>

              <ExerciceInput debutant={true} key={props.id} index={props.index}
                value={fullExercice.exercice} id={props.id} onDeleteExercices={props.onDeleteExercices} 
                changeExercice={changeExercice} exercice={fullExercice.exercice} modeSombre={props.modeSombre}
              />

              {series ? series.map((serie,index) => {
                return(
                <div>
                    <hr className={props.modeSombre === true ? "hr-serie-dark" : "hr-serie"}/>

                    <SerieInput
                        key={index}
                        num={index}
                        typeSerie={serie.typeSerie}
                        repsTime={serie.repsTime}
                        charge={serie.charge}
                        percent={serie.percent}
                        length={series.length}
                        exercice={fullExercice.exercice}
                        poids={props.poids}
                        changeSerie={changeSerie}
                        onDeleteSerie={onDeleteSerie}
                        modeSombre={props.modeSombre}
                    />
                </div>
                );
              })
              : null
              }

              <button className="btn btn-dark form-button" onClick={onAddSerie} type="submit">Ajouter une série !</button>
              <button className="btn btn-dark form-button copy-btn" onClick={onCopySerie} type="submit">Recopier la série !</button>
              <br/>
          </div>
    )
}

export default FullExerciceInput;