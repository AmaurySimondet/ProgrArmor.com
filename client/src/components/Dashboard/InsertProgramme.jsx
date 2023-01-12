import { React, useState, useEffect } from 'react';
import Select from 'react-select';
import { customStyles, customStylesDark, customStylesMini, customStylesDarkMini } from './customStyles';
import Periodisation from './Periodisation';
import { v4 as uuidv4 } from 'uuid';
import TypesDeProgrammes from './Programme/TypeDeProgrammes'
import Niveaux from './Programme/Niveaux'
import ProgrammeMateriel from './Programme/ProgrammeMateriel';

function InsertProgramme(props) {
    const [periodisationsClosed, setPeriodisationsClosed] = useState(false);
    const [periodisation, setPeriodisation] = useState([{ id: uuidv4(), seances: [], cycle: "" }]);
    const [programme, setProgramme] = useState({
        titre: "",
        description: "",
        type: { id: "", label: "", value: "" },
        niveau: { id: "", label: "", value: "" },
        duree: { id: "", label: "", value: "" },
        materiel: [],
        programme: periodisation
    });

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

    function styleOnDim() {
        if (dimensions.width > 500) {
            if (props.modeSombre === true) {
                return customStylesDark;
            } else {
                return customStyles;
            }
        } else {
            if (props.modeSombre === true) {
                return customStylesDarkMini;
            } else {
                return customStylesMini;
            }
        }
    }

    function handleChange(event) {
        if (event.target) {
            if (event.target.id === "titre") {
                setProgramme({ ...programme, titre: event.target.value });
            } else if (event.target.id === "description") {
                setProgramme({ ...programme, description: event.target.value });
            } else if (event.target.id === "duree") {
                setProgramme({ ...programme, duree: event.target.value });
            }
        }
        else {
            if (event.id === "type") {
                setProgramme({ ...programme, type: event });
            }
            if (event.id === "niveaux") {
                setProgramme({ ...programme, niveau: event });
            }
            if (event.id === "materiel") {
                setProgramme({ ...programme, materiel: event });
            }
        }
    }

    function addPeriodisation() {
        setPeriodisation([...periodisation, { id: uuidv4(), seances: [], cycle: "" }]);
    }

    function handleDeletePeriodisation(id) {
        setPeriodisation(periodisation.filter(periodisation => periodisation.id !== id));
    }

    function closingPeriodisations() {
        setPeriodisationsClosed(!periodisationsClosed);
    }

    function sendProgramme() {
        console.log(programme);
    }

    function writePeriodisation(id, seances) {
        setPeriodisation(periodisation.map(periodisation => {
            if (periodisation.id === id) {
                periodisation.seances = seances;
            }
            return periodisation;
        }))
    }

    function adminLoadProgramme() {
        let obj = {
            "titre": "Le classico",
            "description": "Ultra classico mon pote",
            "type": {
                "id": "type",
                "label": "Musculation / StreetLifting",
                "value": "Musculation / StreetLifting",
                "name": "Type de programme"
            },
            "niveau": {
                "id": "niveaux",
                "label": "Débutant",
                "value": "Débutant",
                "name": "Niveaux"
            },
            "duree": "120",
            "materiel": { "id": "materiel", "label": 'Rack, barre et poids', "value": 'Rack, barre et poids', "name": "Materiel" },
            "programme": [
                {
                    "id": "f159c84e-b5b1-4cf4-b345-9c0733e01b4b",
                    "seances": [
                        {
                            "id": "95636e1c-c465-4a2a-b052-80df00ef6f3c",
                            "exercices": [
                                {
                                    "exercice": {
                                        "name": "Developpé couché"
                                    },
                                    "Series": {
                                        "0": {
                                            "id": "0f691e27-95dc-4c97-aadf-7a819ea15455",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        },
                                        "1": {
                                            "id": "ab88fcca-02d2-49f7-8e00-368824aa3944",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        },
                                        "2": {
                                            "id": "57fcb5ec-7557-426a-b41f-510634dbf606",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        },
                                        "3": {
                                            "id": "b74862d6-7d9b-4c7b-88ae-602d74054805",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        }
                                    },
                                    "Categories": {
                                        "0": {
                                            "id": "4ed2f9c0-9cbe-4e93-8e3d-d49c956790b2",
                                            "input": "Barre olympique droite",
                                            "name": "Type de barre / poids"
                                        }
                                    },
                                    "id": "4fe30b97-b6ae-4972-8021-777099775346"
                                },
                                {
                                    "exercice": {
                                        "name": "Squat"
                                    },
                                    "Series": {
                                        "0": {
                                            "id": "6ee29fe0-87bc-4d6b-a21c-84310e7464b7",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        },
                                        "1": {
                                            "id": "462becbe-5367-470a-a306-c9e89f48ebf5",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        },
                                        "2": {
                                            "id": "298f2289-5f77-4c6c-a2c6-1e6d4efa5793",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        },
                                        "3": {
                                            "id": "aa312ba5-9103-41f4-9184-14b8330d15cc",
                                            "typeSerie": "reps",
                                            "repsTime": "12",
                                            "charge": "",
                                            "percent": "NaN%"
                                        }
                                    },
                                    "Categories": {},
                                    "id": "48699b90-1a39-4c45-a22b-6c03cc562790"
                                }
                            ],
                            "echauffements": [],
                            "jourRepos": "2"
                        }
                    ],
                    "cycle": ""
                }
            ]
        };
        let newObj = {};
        Object.keys(obj).forEach(key => {
            newObj[key] = obj[key];
        });
        setProgramme(newObj)

    }

    return (
        <div>
            <button className='btn btn-black block large-margin-updown'
                onClick={adminLoadProgramme}>
                Admin: Charger programme type
            </button>

            <div className='form-group row'>
                <div className='col-12 basic-margin-updown'>
                    <label>Titre</label>
                    <input type="text"
                        onChange={handleChange}
                        id="titre"
                        placeholder="FullStack... heu je veux dire FullBody"
                        className={props.modeSombre ? 'form-control inputDark' : 'form-control'} value={programme.titre} />
                </div>

                <div className='col-12 basic-margin-updown'>
                    <label>Description</label>
                    <textarea type="text"
                        onChange={handleChange}
                        id="description"
                        placeholder="Vous savez, le truc qui explique ce que c'est"
                        className={props.modeSombre ? 'form-control inputDark' : 'form-control'}
                        value={programme.description} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Type de programme </label>
                    <Select options={TypesDeProgrammes}
                        placeholder="Type de programme..."
                        onChange={handleChange}
                        value={{ id: programme.type.id, label: programme.type.label, value: programme.type.value }}
                        styles={styleOnDim(dimensions)} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Niveau </label>
                    <Select options={Niveaux}
                        placeholder="Niveau..."
                        onChange={handleChange}
                        value={{ id: programme.niveau.id, label: programme.niveau.label, value: programme.niveau.value }}
                        styles={styleOnDim(dimensions)} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Durée max d'une séance </label>
                    <input
                        type="number"
                        onChange={handleChange}
                        id="duree"
                        placeholder="En minutes"
                        style={{ textAlign: 'center', height: "50px" }}
                        className={props.modeSombre ? 'form-control inputDark' : 'form-control'}
                        value={programme.duree} />
                </div>

                <div className="col-12">
                    <label className="col-form-label">Materiel</label>
                    <Select
                        isMulti
                        onChange={handleChange}
                        id="materiel"
                        value={programme.materiel}
                        options={ProgrammeMateriel}
                        styles={styleOnDim(dimensions)}
                        placeholder="Tout (défaut)"
                    />
                </div>
            </div>

            {periodisation?.map((periodisation, index) => {
                return (
                    <div>
                        <Periodisation
                            key={periodisation.id}
                            id={periodisation.id}
                            periodisation={periodisation}
                            index={index}
                            modeSombre={props.modeSombre}
                            closedPeriodisation={periodisationsClosed}
                            writePeriodisation={writePeriodisation}
                            handleDeletePeriodisation={handleDeletePeriodisation}
                        />
                        <hr className='hr-detail large-margin-top' />
                    </div>
                )
            })
            }

            <button className='btn btn-dark block large-margin-updown'
                style={{ marginLeft: "0" }}
                onClick={addPeriodisation}>
                Ajouter une périodisation
            </button>

            <button className='btn btn-dark block large-margin-updown'
                onClick={closingPeriodisations} disabled={periodisation.length > 0 ? false : true}>
                {periodisationsClosed ? "Ouvrir toutes les periodisations" : "Résumer toutes les periodisations"}
            </button>

            <button className='btn btn-black block large-margin-updown'
                onClick={sendProgramme}>
                Enregistrer le programme !
            </button>
        </div>
    )
}

export default InsertProgramme;