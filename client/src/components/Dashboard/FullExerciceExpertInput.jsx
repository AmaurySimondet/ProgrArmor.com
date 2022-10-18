import ExerciceInput from "./ExerciceInput";
import SerieInput from "./SerieInput";
import exercices from "./Exercices";
import Select from "./Select";
import CategorieInput from "./CategorieInput";
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
    const [categories, setCategories] = useState([]);
    const [fullExercice, setFullExercice] = useState({});
    const [clickExercice, setClickExercice] = useState(false);

  function handleClickExercice(){
    setClickExercice(true);

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

    function onAddCategorie(categorie){
        event.preventDefault();

        setCategories([...categories, categorie])
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

              <ExerciceInput id="exercice" onClickExercice={handleClickExercice} clickExercice={clickExercice} value={fullExercice.exercice} num={props.num} onDeleteExercices={props.onDeleteExercices} changeExercice={changeExercice} />


            {clickExercice ?
                <div>

                      {categories ? categories.map((categorie,index) => {
                        return(
                        <div>
                          <hr className="hr-serie"/>

                          <CategorieInput
                            key={index}
                            num={index}
                            exercice={fullExercice.exercice}
                            onAddCategorie={onAddCategorie}
                            changeCategorie={changeCategorie}
                            onDeleteCategorie={onDeleteCategorie}
                          />

                        </div>
                        );
                      })
                      : null
                      }

                      {series ? series.map((serie,index) => {
                        return(
                        <div>
                            <hr className="hr-serie"/>

                            <SerieInput
                                key={index}
                                num={index}
                                length={series.length}
                                exercice={fullExercice.exercice}
                                poids={props.poids}
                                onAddSerie={onAddSerie}
                                changeSerie={changeSerie}
                                onDeleteSerie={onDeleteSerie}
                            />
                        </div>
                        );
                      })
                      : null
                      }

                      <button className="btn btn-dark form-button" onClick={onAddCategorie} type="submit">Ajouter une categorie à cet exercice !</button>
                      <br/>


                      <button className="btn btn-dark form-button" onClick={onAddSerie} type="submit">Ajouter une série !</button>
                      <br/>
                  </div>
              : null}


          </div>
    )
}

export default FullExerciceInput;