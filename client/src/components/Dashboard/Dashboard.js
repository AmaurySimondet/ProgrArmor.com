import {React, useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import API from "../../utils/API";
import ExerciceInput from "./ExerciceInput"
import DetailInput from "./DetailInput"
import CategorieInput from "./CategorieInput"
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import StreetworkoutHiddenText from "./Categories/StreetworkoutHiddenText.js";
import CategorieHiddenText from "./Categories/CategorieHiddenText.js";
import ElastiqueHiddenText from "./Categories/ElastiqueHiddenText.js";

const StyleSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    color: red['A700'],
  },
  '& .MuiSlider-thumb:hover': {
    color: red['A400'],
  },
  '& .MuiSlider-dragging': {
    backgroundColor: red['A700'],
  },
  '& .MuiSlider-rail': {
    backgroundColor: red['A700'],
  },
  '& .MuiSlider-track': {
    backgroundColor: red['A700'],
  },
  '& .MuiSlider-mark': {
    backgroundColor: red['A700'],
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },

];

function valuetext(value) {
  return `${value}`;

}

function Dashboard() {
    const [seances, setSeances] = useState([]);
    const [exercice, setExercice] = useState({exercice: {name: "title", ownExercice: ""}});
    const [listeNoms, setListeNoms] = useState([]);
    const [details, setDetails] = useState([]);
    const [categories, setCategories] = useState([])
    const [params, setParams] = useState({nom: "", periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
    const [categorieNumb, setCategorieNumb] = useState(0)
    const [detailNumb, setDetailNumb] = useState(0)
    const [categoriesAddRien, setCategoriesAddRien] = useState([])
    const [detailsAddRien, setDetailsAddRien] = useState([])
    const [checkbox, setCheckbox] = useState({affichageCharge: true, affichageReps: true, affichageSérie: true, affichageNom: true, affichageDate: true, affichageExercice: true, affichageType: true, affichagePercent: true, affichagePoids: true});

    function handleChangeSliderCategorie(event){
        setCategorieNumb(event.target.value);
        let arr = [];
        for(let i=0; i<event.target.value; i++){
            arr.push("rien");
        };
        setCategoriesAddRien(arr);

    }

    function handleChangeSliderDetail(event){
        setDetailNumb(event.target.value);
        let arr = [];
        for(let i=0; i<event.target.value; i++){
            arr.push("rien");
        };
        setDetailsAddRien(arr);

    }

  async function getWorkouts(){
    if (params.categories){
        params.categories.forEach((categorie, index) => {
            if(categorie.name==="Elastique"){
                setParams(oldParams => {
                    return ({
                        ...oldParams,
                        ["categorie"+index+"name"]: categorie.name,
                        ["categorie"+index+"utilisation"]: categorie.utilisation,
                        ["categorie"+index+"input"]: categorie.input,
                        ["categorie"+index+"estimation"]: categorie.estimation,
                    })
                });
            }
            else {
                setParams(oldParams => {
                    return ({
                        ...oldParams,
                        ["categorie"+index+"name"]: categorie.name,
                        ["categorie"+index+"input"]: categorie.input,
                    })
                });
            }
        })
        delete params.categories
    }
    if (params.details){
        params.details.forEach((detail, index) => {
            setParams(oldParams => {
                return ({
                    ...oldParams,
                    ["detail"+index+"name"]: detail.name,
                    ["detail"+index+"input"]: detail.input,
                })
            });
        })
        delete params.details
    }

    const {data} = await API.workouts(params);
    if (data.success === false){
        alert(data.message);
    } else {
        console.log(data.seances);
        setSeances(data.seances);
    }
  }

  useEffect(() => {
        console.log(params)
        setTimeout(getWorkouts, 50);
  }, [params]);

  async function getNames(){
    const {data} = await API.workouts({nom: "", periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
    if (data.success === false){
        alert(data.message);
    } else {
        let arr = []
        data.seances.forEach((seance, index) => {
            if (seance.nom){
                if (seance.nom.ancienNom !== "nouveau-nom"){
                    arr.push(seance.nom.ancienNom)
                }
                else{
                    arr.push(seance.nom.nouveauNom)
                }
            }
        })
        setListeNoms(arr);
    }
  }

  useEffect(() => {
    getNames();
  }, [] );

  function handleChange(event){
    event.preventDefault();

    setParams(oldParams => {
        return ({
            ...oldParams,
            [event.target.id]: event.target.value,
        })
    });
  }

  function handleChangeCheckbox(e) {
    let value = e.target.value;

    setCheckbox(oldCheckbox => {
        return ({
            ...oldCheckbox,
            [value]: !oldCheckbox[value],
        })
    });
  }

    function changeExercice(exercice){
        setExercice(oldExercice => {
            return ({
                ...oldExercice,
                exercice: exercice,
            });
        });
    }

    useEffect(() => {
        setParams(oldParams => {
            return ({
                ...oldParams,
                exerciceName: exercice.exercice.name,
                exerciceOwnExercice: exercice.exercice.ownExercice,
            })
        })
    },[exercice]);

    function trStyle(index){
            let font;

            if (index%2===0){
                font = "black"
            } else {
                font = "#353535"
            }

            return ({
              backgroundColor: font
            })
      }

    function tdStyle(index){
            let font;

            if (index%2===0){
                font = "#ffbaba"
            } else {
                font = "white"
            }

            return ({
              color: font
            })
      }

    function changeCategorie(categorie, num){
        const otherThanSelected =  categories.filter((categorie, index) => {
            return categorie.num!==(num)
        });

        setCategories([...otherThanSelected, categorie]);
    }

    useEffect(() => {
        setParams(oldParams => {
            return ({
                ...oldParams,
                categories: categories
            })
        })
    },[categories]);

    useEffect(() => {
        setParams(oldParams => {
            return ({
                ...oldParams,
                details: details
            })
        })
    },[details]);

    function changeDetail(detail, num){
        const otherThanSelected =  details.filter((detail, index) => {
            return detail.num!==(num)
        });

        setDetails([...otherThanSelected, detail]);
    }

  return (
      <div>
          <NavigBar location="dashboard"/>

          <div className="Dashboard">

            <h1 className="Dashboard-h1">Historique des séances</h1>

            <form className="debutant-form">
                <h2> Filtrage </h2>

                <div className="form-group row">
                    <div className="form-group col-sm-6">
                        <label className="col-sm-1 col-form-label">
                          Tri
                        </label>
                        <select onChange={handleChange} className="custom-select" id="tri">
                            <option value="Ordre chronologique décroissant"> Ordre chronologique décroissant (défaut) </option>
                            <option value="Ordre chronologique croissant"> Ordre chronologique croissant </option>
                            <option value="Charge (ordre décroissant)"> Charge (ordre décroissant) </option>
                            <option value="PDC (ordre décroissant)"> % PDC (ordre décroissant) </option>
                        </select>
                    </div>

                    <div className="form-group col-sm-6">
                        <label className="col-sm-1 col-form-label">
                          Periode
                        </label>
                        <select onChange={handleChange} className="custom-select" id="periode">
                            <option value="max"> Max (défaut) </option>
                            <option value="7d"> 7 derniers jours </option>
                            <option value="30d"> 30 derniers jours </option>
                            <option value="90d"> 90 derniers jours (3 mois) </option>
                            <option value="180d"> 180 derniers jours (6 mois) </option>
                            <option value="1y"> Depuis 1 an </option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="form-group col-sm-6">
                        <label className="col-form-label">
                          Exercice
                        </label>
                        <ExerciceInput taille="petit" typeSerie={0} id="exercice" changeExercice={changeExercice} />
                    </div>

                    <div className="form-group col-sm-6">
                        <label className="col-form-label">
                          Reps / Temps
                        </label>
                        <input type="text"
                          className="form-control"
                          value={params.repsFrom}
                          onChange={handleChange}
                          placeholder="Aucun filtre"
                          id="repsFrom"
                        />
                        <label className="col-form-label">
                          à
                        </label>
                        <input type="text"
                          className="form-control"
                          value={params.repsTo}
                          onChange={handleChange}
                          placeholder="Aucun filtre"
                          id="repsTo"
                        />
                    </div>
                </div>

                {categoriesAddRien.map((rien, index) => {
                    return(
                        <div className="form-group row">
                            <div className="form-group col-sm-12">
                                <label className="col-form-label">
                                  Catégorie {index+1}
                                </label>
                                <CategorieInput id={"catégorie"+index} index={index} dashboard={true} num={index} exercice={exercice.exercice} changeCategorie={changeCategorie}/>
                            </div>
                        </div>
                    )
                })}

                {detailsAddRien.map((rien, index) => {
                    return(
                        <div className="form-group row">
                            <div className="form-group col-sm-12">
                                <label className="col-form-label">
                                  Détail {index+1}
                                </label>
                                <DetailInput id={"detail"+index} index={index} num={index} dashboard={true} changeDetail={changeDetail}/>
                            </div>
                        </div>
                    )
                })}

                <div className="form-group row">
                    <div className="form-group col-sm-6">
                        <label className="col-sm-1 col-form-label">
                          Nom
                        </label>
                        <select onChange={handleChange} className="custom-select" id="nom">
                            <option value="title"> / (défaut) </option>
                            {listeNoms ? listeNoms.map((nom,index) => {
                                return <option key={index} value={nom}> {nom} </option>
                            })
                            : null }
                        </select>
                    </div>
                </div>

                <h2> Affichage </h2>

                <div className="form-group row slider-style">
                    <label className="col-sm-1 col-form-label">
                      Nombre de catégories
                    </label>
                    <div className="col-sm-5">
                        <StyleSlider
                            style={
                            {
                                width: "70%",
                            }
                            }
                            defaultValue={0}
                            onChange={handleChangeSliderCategorie}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            max={5}
                            min={0}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>

                    <label className="col-sm-1 col-form-label">
                      Nombre de détails
                    </label>
                    <div className="col-sm-5">
                        <StyleSlider
                            style={
                            {
                                width: "70%",
                            }
                            }
                            defaultValue={0}
                            onChange={handleChangeSliderDetail}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            max={5}
                            min={0}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageNom" id="affichageNom"/>
                          <label className="col-form-label" htmlFor="#affichageNom"> Nom </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageDate" id="affichageDate"/>
                          <label className="col-form-label"  htmlFor="#affichageDate"> Date </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichagePoids" id="affichagePoids"/>
                          <label className="col-form-label" htmlFor="#affichagePoids"> Poids </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageExercice" id="affichageExercice"/>
                          <label className="col-form-label" htmlFor="#affichageExercice"> Exercice </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageSérie" id="affichageSérie"/>
                          <label className="col-form-label" htmlFor="#affichageSérie"> Série </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageType" id="affichageType"/>
                          <label className="col-form-label" htmlFor="#affichageType"> Type </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageReps" id="affichageReps"/>
                          <label className="col-form-label" htmlFor="#affichageReps"> Reps </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageCharge" id="affichageCharge"/>
                          <label className="col-form-label" htmlFor="#affichageCharge"> Charge </label>
                    </div>
                    <div className="form-group col-md-6 col-lg-2 custom-control custom-checkbox">
                          <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichagePercent" id="affichagePercent"/>
                          <label className="col-form-labell" htmlFor="#affichagePercent"> Percent </label>
                    </div>
                </div>
            </form>



            <table className="table table-hover table-responsive-lg table-dark dashboard-table">
              <thead className="thead-dark">
                <tr>
                  {checkbox.affichageNom ? <th scope="col">Nom </th> : null}
                  {checkbox.affichageDate ? <th scope="col">Date </th> : null}
                  {checkbox.affichagePoids ? <th scope="col">Poids</th> : null}
                  {checkbox.affichageExercice ? <th scope="col">Exercice</th> : null}
                  {categoriesAddRien.map(rien => {
                    return <th scope="col">Categorie</th>
                  })}
                  {checkbox.affichageSérie ? <th scope="col">Série</th> : null}
                  {checkbox.affichageType ? <th scope="col">Type</th> : null}
                  {checkbox.affichageReps ? <th scope="col">Reps / Temps</th> : null}
                  {checkbox.affichageCharge ? <th scope="col">Charge</th> : null}
                  {checkbox.affichagePercent ? <th scope="col">% PDC</th> : null}
                  {detailsAddRien.map(rien => {
                    return <th scope="col">Detail</th>
                  })}
                </tr>
              </thead>
              <tbody>
                  {seances.map((seance,indexSeance) => {
                        if (seance !== null) {
                            return (seance.exercices.map((exercice, indexExercice) => {
                                if (exercice !== null){
                                    return (exercice.Series && Object.values(exercice.Series).map((serie, index) => {
                                       if(serie !== null){
                                            return (
                                                <tr style={trStyle(indexSeance)}>
                                                    {checkbox.affichageNom ?
                                                        seance.nom ?
                                                            seance.nom.ancienNom !== "nouveau-nom" ?
                                                                <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                    {seance.nom.ancienNom}
                                                                </td>
                                                            :
                                                                <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                    {seance.nom.nouveauNom}
                                                                </td>
                                                        :
                                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                /
                                                            </td>
                                                    : null }
                                                    {checkbox.affichageDate ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {seance.date}
                                                        </td>
                                                    : null }
                                                    {checkbox.affichagePoids ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {seance.poids}
                                                        </td>
                                                    : null }
                                                    {checkbox.affichageExercice ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {exercice.exercice.name==="own-exercice" ? exercice.exercice.ownExercice : exercice.exercice.name}
                                                        </td>
                                                    : null }
                                                    {categoriesAddRien.map((rien,index) => {
                                                        if (exercice.Categories){
                                                            if (Object.values(exercice.Categories)[index]){
                                                                return(
                                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                         {Object.values(exercice.Categories)[index].input}
                                                                    </td>
                                                                )
                                                            }
                                                            else{
                                                                return(
                                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                    /
                                                                    </td>
                                                                )
                                                            }
                                                        }
                                                        else{
                                                            return(
                                                                <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                /
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                    {checkbox.affichageSérie ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {serie.num+1}
                                                        </td>
                                                    : null }
                                                    {checkbox. affichageType ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {serie.typeSerie==="reps" ? "Répétitions" : null}
                                                            {serie.typeSerie==="time" ? "Temps (sec)" : null}
                                                        </td>
                                                    : null }
                                                    {checkbox.affichageReps ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {serie.repsTime}
                                                        </td>
                                                    : null }
                                                    {checkbox.affichageCharge ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {serie.charge}
                                                        </td>
                                                    : null }
                                                    {checkbox.affichagePercent ?
                                                        <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                            {serie.percent}
                                                        </td>
                                                    : null }
                                                    {detailsAddRien.map((rien,index) => {
                                                        if (seance.details){
                                                            if (Object.values(seance.details)[index]){
                                                                return(
                                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                         {Object.values(seance.details)[index].input}
                                                                    </td>
                                                                )
                                                            }
                                                            else{
                                                                return(
                                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                    /
                                                                    </td>
                                                                )
                                                            }
                                                        }
                                                        else{
                                                            return(
                                                                <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                /
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                </tr>
                                            )
                                        }
                                    }))
                                }
                            }))
                        }})
                  }
              </tbody>
            </table>
          </div>
      </div>
    )
}

export default Dashboard;