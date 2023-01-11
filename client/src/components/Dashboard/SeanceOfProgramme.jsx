import { React, useState, useEffect } from 'react';

import FullExerciceExpertInput from './FullExerciceExpertInput';
import { v4 as uuidv4 } from 'uuid';
import { writeExercice } from "../../utils/WriteExercice";

function SeanceOfProgramme(props) {

    const [seance, setSeance] = useState(props.seance);
    const [clickSeance, setClickSeance] = useState(false);
    const [exerciceInSeance, setExerciceInSeance] = useState({});

    function handleClickSeance() {
        setClickSeance(!clickSeance);
    }

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        var timeout = false;
        window.addEventListener('resize', function () {
            clearTimeout(timeout);;
            timeout = setTimeout(handleResize, 200);
        });
    });

    function handleClickPoubelle() {
        props.handleDeleteSeance(props.id);
    }

    function getMarginTop() {
        if (dimensions.width > 900) {
            return "40px";
        } else {
            return "5%";
        }
    }

    function changeExercices(changedExercice, id) {
        let newSeance = { ...seance }
        let indexOfChg = seance.exercices.findIndex(ex => ex.id === id)

        newSeance.exercices.splice(indexOfChg, 1, changedExercice)

        setSeance(newSeance)
    }

    function onAddExercices(event) {
        event.preventDefault();

        let newS = { ...seance }

        newS = {
            ...newS,
            exercices: [...newS.exercices, { exercice: { name: "" }, Series: {}, Categories: {}, id: uuidv4() }]
        }

        setSeance(newS)

    }

    function onDeleteExercices(id) {
        let newSeance = seance;
        let indexOfDel = seance.exercices.findIndex(ex => ex.id === id)

        //replace by nothing
        newSeance.exercices.splice(indexOfDel, 1)

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                exercices: newSeance.exercices
            })
        })
    }

    function writeExerciceInSeance(exercice, id) {
        let jsonExercices = exerciceInSeance;
        jsonExercices[id] = writeExercice(exercice);
        setExerciceInSeance(jsonExercices);
    }

    useEffect(() => {
        if (props.closed !== clickSeance) {
            setClickSeance(props.closed)
        }
    }, [props.closed])


    return (
        <div>

            <div>
                <h1 id="seanceTitle" style={{ display: "inline-block" }} onClick={handleClickSeance}>
                    Seance {props.index + 1}
                    <img className={clickSeance ? "expert-toggle rotated" : "expert-toggle not-rotated"}
                        src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                </h1>

                <img className={props.modeSombre === true ? "poubelleDark " : "poubelle"}
                    onClick={handleClickPoubelle}
                    style={{ float: "right", display: "inline-block", height: "10%", marginTop: getMarginTop() }}
                    src={require('../../images/icons/icons8-trash-30.webp')}
                    alt="Poubelle" />

                {clickSeance ?
                    Object.values(exerciceInSeance).map((exercice, index) => {
                        if (index === Object.values(exerciceInSeance).length - 1) {
                            return (
                                <div>
                                    <p>
                                        Exercice {index + 1}: {exercice.exercice}
                                    </p>
                                    {exercice.categories[0] ?
                                        <p>
                                            Categories: {exercice.categories}
                                        </p>
                                        : null}
                                    <p>
                                        Series: {exercice.series}
                                    </p>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <p>
                                        Exercice {index + 1}: {exercice.exercice}
                                    </p>
                                    {exercice.categories[0] ?
                                        <p>
                                            Categories: {exercice.categories}
                                        </p>
                                        : null}
                                    <p>
                                        Series: {exercice.series}
                                    </p>
                                    <hr className="hr-serie" />
                                </div>
                            )
                        }
                    })

                    :
                    seance.exercices ? seance.exercices.map((exercice, index) => {
                        return (
                            <div>
                                <FullExerciceExpertInput
                                    key={exercice.id}
                                    index={index}
                                    dimensions={dimensions}
                                    id={exercice.id}
                                    modeSombre={props.modeSombre}
                                    exercice={exercice}
                                    poids={seance.poids}
                                    click={true}
                                    changeExercices={changeExercices}
                                    onDeleteExercices={onDeleteExercices}
                                    programme={true}
                                    writeExerciceInSeance={writeExerciceInSeance}
                                />

                                <button className="btn btn-dark form-button large-margin-bottom" id={index} onClick={onAddExercices} type="submit">Ajouter un exercice</button>
                                <br />
                            </div>)
                    }) : null
                }

            </div>

            {seance.exercices[0] ? null
                : <button className="btn btn-dark form-button large-margin-bottom" onClick={onAddExercices} type="submit">Ajouter un exercice</button>
            }

        </div>
    )
}

export default SeanceOfProgramme;