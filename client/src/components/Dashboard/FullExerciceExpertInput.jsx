import ExerciceInput from "./ExerciceInput";
import SerieInput from "./SerieInput";
import CategorieInput from "./CategorieInput";
import {React, useState, useEffect} from "react";

function FullExerciceInput(props){
    const [categories, setCategories] = useState([...Object.values(props.exercice.Categories)]);
    const [series, setSeries] = useState([...Object.values(props.exercice.Series)]);
    const [fullExercice, setFullExercice] = useState(props.exercice);
    const [clickExercice, setClickExercice] = useState(props.click);

  function handleClickExercice(){
    setClickExercice(!clickExercice);

  }

    function changeExercice(exercice){
        setFullExercice(oldFullExercice => {
            return ({
                ...oldFullExercice,
                exercice: exercice,
            });
        });
    }

    function changeSerie(serie, num){
        const otherThanSelected =  series.filter((serie, index) => {
            return index!==(num)
        });

        setSeries([...otherThanSelected, serie]);
    }

    function changeCategorie(categorie, num){
        const otherThanSelected =  categories.filter((categorie, index) => {
            return index!==(num)
        });

        setCategories([...otherThanSelected, categorie]);
    }

    useEffect(() => {
        const Series = {...series};
        const Categories = {...categories};
        const Exercice = {...fullExercice, Series, Categories};
        props.changeExercices(Exercice, props.num);
    }, [fullExercice, series, categories])

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

        setSeries(oldSeries => {
            return(
                oldSeries.filter((serie, index) => {
                    return index!==(num)
                })
            )
        })
    }

    function onAddCategorie(categorie){
        event.preventDefault();



        setCategories([...categories, {num: categories.length}])
    }

    function onDeleteCategorie(num){
        event.preventDefault();

        setCategories(oldCategories => {
            return(
                oldCategories.filter((categorie, index) => {
                    return index!==(num)
                })
            )
        })
    }

    return(
          <div className="exercice-div">
              <hr className={props.modeSombre===true ? "hr-exercice-dark " : "hr-exercice"}/>

              <ExerciceInput 
                debutant={false} id="exercice" onClickExercice={handleClickExercice} 
                clickExercice={clickExercice} value={fullExercice.exercice} num={props.num} 
                onDeleteExercices={props.onDeleteExercices} changeExercice={changeExercice} 
                key={props.num} exercice={fullExercice.exercice} modeSombre={props.modeSombre}
              />


            {clickExercice ?
                <div>

                      {categories ? categories.map((categorie,index) => {
                        return(
                        <div>
                          <hr className={props.modeSombre===true ? "hr-serie-dark " : "hr-serie"}/>

                          <CategorieInput
                            key={index}
                            num={index}
                            categorie={categorie}
                            exercice={fullExercice.exercice}
                            changeCategorie={changeCategorie}
                            onDeleteCategorie={onDeleteCategorie}
                            modeSombre={props.modeSombre}
                          />

                        </div>
                        );
                      })
                      : null
                      }

                      <button className="btn btn-dark form-button" onClick={onAddCategorie} type="submit">Ajouter une categorie à cet exercice !</button>
                      <br/>
                </div>
            : null}

            {series ? series.map((serie,index) => {
            return(
            <div>
                <hr className={props.modeSombre===true ? "hr-serie-dark " : "hr-serie"}/>

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
                    onAddSerie={onAddSerie}
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