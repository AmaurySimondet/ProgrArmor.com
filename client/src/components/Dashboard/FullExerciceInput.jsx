import ExerciceInput from "./ExerciceInput";
import SerieInput from "./SerieInput";
import exercices from "./Exercices";
import Select from "./Select";
import {React, useState, useEffect} from "react";

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
    const [series, setSeries] = useState([]);
    const [fullExercice, setFullExercice] = useState({});

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
        props.changeExercices(Exercice, props.num);
    }, [fullExercice, series])

    function onAddSerie(event){
        event.preventDefault();

        setSeries([...series, []])
    }

    function onCopySerie(event){
        event.preventDefault();

        const last = series[series.length - 1]
        console.log(last)

        setSeries([...series, last])
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

    function perc2color(perc,min,max) {
                var base = (max - min);

                if (base == 0) { perc = 100; }
                else {
                    perc = (perc - min) / base * 100;
                }
                var r, g, b = 0;
                if (perc < 50) {
                    r = 255;
                    g = Math.round(5.1 * perc);
                }
                else {
                    g = 255;
                    r = Math.round(510 - 5.10 * perc);
                }
                var h = r * 0x10000 + g * 0x100 + b * 0x1;
                return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    return(
          <div className="exercice-div">
              <hr className="hr-exercice"/>

              <ExerciceInput debutant={true} id="exercice" value={fullExercice.exercice} num={props.num} onDeleteExercices={props.onDeleteExercices} changeExercice={changeExercice} />

              {series ? series.map((serie,index) => {
                return(
                <div>
                    <hr className="hr-serie"/>

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