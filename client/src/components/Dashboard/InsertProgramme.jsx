import { React, useState, useEffect } from 'react';
import Select from 'react-select';
import { customStyles, customStylesDark, customStylesMini, customStylesDarkMini } from './customStyles';
import SeanceOfProgramme from './SeanceOfProgramme';
import { v4 as uuidv4 } from 'uuid';
import TypesDeProgrammes from './Programme/TypeDeProgrammes'
import Niveaux from './Programme/Niveaux'

function InsertProgramme(props) {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState({ id: "", label: "", value: "" });
    const [niveau, setNiveau] = useState({ id: "", label: "", value: "" });
    const [duree, setDuree] = useState({ id: "", label: "", value: "" });
    const [seances, setSeances] = useState([]);

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
                setTitre(event.target.value);
            } else if (event.target.id === "description") {
                setDescription(event.target.value);
            }
        }
        else {
            if (event.id === "type") {
                setType(event);
            }
        }
    }

    function addSeance() {
        setSeances([...seances,
        { id: uuidv4(), exercices: [], echauffements: [], jourRepos: 0 }]);
    }

    function handleDeleteSeance(id) {
        console.log(id)
        setSeances(seances.filter(seance => seance.id !== id));
    }

    return (
        <div>
            <div className='form-group row'>
                <div className='col-12 basic-margin-updown'>
                    <label>Titre</label>
                    <input type="text"
                        onChange={handleChange}
                        id="titre"
                        placeholder="FullStack... heu je veux dire FullBody"
                        className='form-control inputDark' value={titre} />
                </div>

                <div className='col-12 basic-margin-updown'>
                    <label>Description</label>
                    <textarea type="text"
                        onChange={handleChange}
                        id="description"
                        placeholder="Vous savez, le truc qui explique ce que c'est"
                        className='form-control inputDark'
                        value={description} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Type de programme </label>
                    <Select options={TypesDeProgrammes}
                        onChange={handleChange}
                        value={{ id: type.id, label: type.label, value: type.value }}
                        styles={styleOnDim(dimensions)} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Niveau </label>
                    <Select options={Niveaux}
                        onChange={handleChange}
                        value={{ id: niveau.id, label: niveau.label, value: niveau.value }}
                        styles={styleOnDim(dimensions)} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Durée max d'une séance </label>
                    <input
                        type="number"
                        onChange={handleChange}
                        id="duree"
                        placeholder="En minutes"
                        className='form-control inputDark'
                        value={duree} />
                </div>
            </div>

            {seances?.map((seance, index) => {
                return (
                    <SeanceOfProgramme
                        key={seance.id}
                        id={seance.id}
                        seance={seance}
                        index={index}
                        modeSombre={props.modeSombre}
                        handleDeleteSeance={handleDeleteSeance}
                    />
                )
            })}

            <button className='btn btn-dark block large-margin-updown'
                style={{ marginLeft: "0" }}
                onClick={addSeance}>
                Ajouter une séance
            </button>

            <button className='btn btn-black block large-margin-updown'
                onClick={addSeance}>
                Enregistrer le programme !
            </button>
        </div>
    )
}

export default InsertProgramme;