import { React, useState, useEffect } from 'react';
import Select from 'react-select';
import { customStyles, customStylesDark, customStylesMini, customStylesDarkMini } from './customStyles';
import SeanceOfProgramme from './SeanceOfProgramme';
import { v4 as uuidv4 } from 'uuid';
import TypesDeProgrammes from './Programme/TypeDeProgrammes'
import Niveaux from './Programme/Niveaux'
import ProgrammeMateriel from './Programme/ProgrammeMateriel';

function InsertProgramme(props) {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState({ id: "", label: "", value: "" });
    const [niveau, setNiveau] = useState({ id: "", label: "", value: "" });
    const [duree, setDuree] = useState({ id: "", label: "", value: "" });
    const [materiel, setMateriel] = useState([]);
    const [seances, setSeances] = useState([]);
    const [seancesClosed, setSeancesClosed] = useState(false);

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
        console.log(event)
        if (event.target) {
            if (event.target.id === "titre") {
                setTitre(event.target.value);
            } else if (event.target.id === "description") {
                setDescription(event.target.value);
            } else if (event.target.id === "duree") {
                setDuree(event.target.value);
            }
        }
        else {
            if (event.id === "type") {
                setType(event);
            }
            if (event.id === "niveaux") {
                setNiveau(event);
            }
        }
    }

    function closingSeances() {
        setSeancesClosed(!seancesClosed);
        console.log(seancesClosed)
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
                        className={props.modeSombre ? 'form-control inputDark' : 'form-control'} value={titre} />
                </div>

                <div className='col-12 basic-margin-updown'>
                    <label>Description</label>
                    <textarea type="text"
                        onChange={handleChange}
                        id="description"
                        placeholder="Vous savez, le truc qui explique ce que c'est"
                        className={props.modeSombre ? 'form-control inputDark' : 'form-control'}
                        value={description} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Type de programme </label>
                    <Select options={TypesDeProgrammes}
                        placeholder="Type de programme..."
                        onChange={handleChange}
                        value={{ id: type.id, label: type.label, value: type.value }}
                        styles={styleOnDim(dimensions)} />
                </div>

                <div className='col-4 basic-margin-updown'>
                    <label> Niveau </label>
                    <Select options={Niveaux}
                        placeholder="Niveau..."
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
                        style={{ textAlign: 'center', height: "50px" }}
                        className={props.modeSombre ? 'form-control inputDark' : 'form-control'}
                        value={duree} />
                </div>

                <div className="col-12">
                    <label className="col-form-label">Materiel</label>
                    <Select
                        isMulti
                        options={ProgrammeMateriel}
                        styles={styleOnDim(dimensions)}
                        placeholder="Tout (défaut)"
                    />
                </div>
            </div>

            {seances?.map((seance, index) => {
                return (
                    <div>
                        <SeanceOfProgramme
                            key={seance.id}
                            id={seance.id}
                            seance={seance}
                            index={index}
                            modeSombre={props.modeSombre}
                            closed={seancesClosed}
                            handleDeleteSeance={handleDeleteSeance}
                        />
                        <hr className='hr-exercice' />
                    </div>
                )
            })}

            <button className='btn btn-dark block large-margin-updown'
                style={{ marginLeft: "0" }}
                onClick={addSeance}>
                Ajouter une séance
            </button>

            <button className='btn btn-dark block large-margin-updown'
                onClick={closingSeances}>
                {seancesClosed ? "Ouvrir toutes les séances" : "Résumer toutes les séances"}
            </button>

            <button className='btn btn-black block large-margin-updown'
                onClick={addSeance}>
                Enregistrer le programme !
            </button>
        </div>
    )
}

export default InsertProgramme;