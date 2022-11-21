import SerieInput from "./SerieInput";
import CategorieInput from "./CategorieInput";
import { React, useState, useEffect } from "react";
import ExerciceEchauffementInput from "./ExerciceEchauffementInput";
import { v4 as uuidv4 } from 'uuid';

function EchauffementInput(props) {
    const [series, setSeries] = useState([...Object.values(props.echauffement.Series)]);
    const [categories, setCategories] = useState([...Object.values(props.echauffement.Categories)]);
    const [echauffement, setEchauffement] = useState(props.echauffement);
    const [clickExercice, setClickExercice] = useState(props.click);

    function handleClickExercice() {
        setClickExercice(!clickExercice);

    }


    function changeEchauffement(echauffement) {
        setEchauffement(oldEchauffement => {
            return ({
                ...oldEchauffement,
                echauffement: echauffement,
            });
        });
    }

    useEffect(() => {
        const Series = { ...series };
        const Categories = { ...categories };
        const Echauffement = { ...echauffement, Series, Categories };
        props.changeEchauffements(Echauffement, props.id);
    }, [echauffement, series, categories])

    function changeSerie(changedS, id) {
        let newS = [...series]
        let indexOfChg = newS.findIndex(ex => ex.id === id)

        newS.splice(indexOfChg, 1, changedS)

        setSeries(newS)
    }

    function onAddSerie(event) {
        event.preventDefault();

        let newSerie = [...series]

        newSerie.push({ id: uuidv4(), typeSerie: "reps", repsTime: "", charge: "", percent: "" })

        setSeries(newSerie)
    }

    function onCopySerie(event) {
        event.preventDefault();

        let newSeries = [...series]

        let last = {}
        if (newSeries[newSeries.length - 1]) {
            last = {
                ...newSeries[newSeries.length - 1],
                id: uuidv4()
            }
        }
        else {
            last = { id: uuidv4(), typeSerie: "reps", repsTime: "", charge: "", percent: "" }
        }

        newSeries.push(last)

        setSeries(newSeries)
    }

    function onDeleteSerie(id) {
        let newSeries = [...series];
        let indexOfDel = newSeries.findIndex(s => s.id === id)

        //replace by nothing
        newSeries.splice(indexOfDel, 1)

        setSeries(newSeries);
    }

    function changeCategorie(changedC, id) {
        let newC = [...categories]
        let indexOfChg = newC.findIndex(c => c.id === id)

        newC.splice(indexOfChg, 1, changedC)

        setCategories(newC)
    }

    function onAddCategorie(event) {
        event.preventDefault();

        let newC = [...categories]

        newC.push({ id: uuidv4() })

        setCategories(newC)
    }

    function onDeleteCategorie(id) {
        let newC = [...categories];
        let indexOfDel = newC.findIndex(c => c.id === id)

        //replace by nothing
        newC.splice(indexOfDel, 1)

        setCategories(newC);
    }

    return (
        <div className="exercice-div">
            <hr className={props.modeSombre === true ? "hr-exercice-dark " : "hr-exercice"} />

            <ExerciceEchauffementInput
                id={props.id} key={props.id} onClickExercice={handleClickExercice} echauffement={echauffement.echauffement}
                clickExercice={clickExercice} value={echauffement.exercice} index={props.index}
                onDeleteEchauffements={props.onDeleteEchauffements} changeEchauffement={changeEchauffement}
                modeSombre={props.modeSombre}
            />

            {clickExercice ?
                <div>

                    {categories ? categories.map((categorie, index) => {
                        return (
                            <div>
                                <hr className={props.modeSombre === true ? "hr-serie-dark " : "hr-serie"} />

                                <CategorieInput
                                    modeSombre={props.modeSombre}
                                    key={categorie.id}
                                    id={categorie.id}
                                    index={index}
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
                    <br />
                </div>
                : null}

            {series ? series.map((serie, index) => {
                return (
                    <div>
                        <hr className={props.modeSombre === true ? "hr-serie-dark " : "hr-serie"} />

                        <SerieInput
                            key={serie.id}
                            id={serie.id}
                            index={index}
                            length={series.length}
                            exercice={echauffement.echauffement}
                            serie={serie}
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
            <br />


        </div>
    )
}

export default EchauffementInput;