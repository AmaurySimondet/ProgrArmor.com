import SerieInput from "./SerieInput";
import CategorieInput from "./CategorieInput";
import {React, useState, useEffect} from "react";
import ExerciceEchauffementInput from "./ExerciceEchauffementInput";

function EchauffementInput(props){
    const [series, setSeries] = useState([...Object.values(props.echauffement.Series)]);
    const [categories, setCategories] = useState([...Object.values(props.echauffement.Categories)]);
    const [echauffement, setEchauffement] = useState(props.echauffement);
    const [clickExercice, setClickExercice] = useState(props.click);

  function handleClickExercice(){
    setClickExercice(!clickExercice);

  }


    function changeEchauffement(echauffement){
        setEchauffement(oldEchauffement => {
            return ({
                ...oldEchauffement,
                echauffement: echauffement,
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
        const Echauffement = {...echauffement, Series, Categories};
        props.changeEchauffements(Echauffement, props.num);
    }, [echauffement, series, categories])

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

              <ExerciceEchauffementInput 
                id="exercice" key={props.num} onClickExercice={handleClickExercice} echauffement={echauffement.echauffement}
                clickExercice={clickExercice} value={echauffement.exercice} num={props.num} 
                onDeleteEchauffements={props.onDeleteEchauffements} changeEchauffement={changeEchauffement} 
              />

              {clickExercice ?
                <div>

                      {categories ? categories.map((categorie,index) => {
                        return(
                        <div>
                          <hr className="hr-serie"/>

                          <CategorieInput
                            key={index}
                            num={index}
                            categorie={categorie}
                            exercice={echauffement.echauffement}
                            changeCategorie={changeCategorie}
                            onDeleteCategorie={onDeleteCategorie}
                          />

                        </div>
                        );
                      })
                      : null
                      }

                      <button className="btn btn-dark form-button" onClick={onAddCategorie} type="submit">Ajouter une categorie à cet echauffement !</button>
                      <br/>
                </div>
            : null}

            {series ? series.map((serie,index) => {
            return(
            <div>
                <hr className="hr-serie"/>

                <SerieInput
                    key={index}
                    num={index}
                    length={series.length}
                    exercice={echauffement.echauffement}
                    typeSerie={serie.typeSerie}
                    repsTime={serie.repsTime}
                    charge={serie.charge}
                    percent={serie.percent}
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

            <button className="btn btn-dark form-button" onClick={onAddSerie} type="submit">Ajouter une série !</button>
            <button className="btn btn-dark form-button copy-btn" onClick={onCopySerie} type="submit">Recopier la série !</button>
            <br/>


          </div>
    )
}

export default EchauffementInput;