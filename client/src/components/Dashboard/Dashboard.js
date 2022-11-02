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
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red['A700'],
    '&:hover': {
      backgroundColor: alpha(red['A700'], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red['A700'],
  },
}));

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
    const [checkbox, setCheckbox] = useState({affichageCharge: true, affichageReps: true, affichageSérie: true, affichageNom: true, affichageDate: true, affichageExercice: true, affichageType: true, affichagePercent: true, affichagePoids: true, affichageModif: false, affichageSuppr: false});
    const [clicked, setClicked] = useState([false,false,false,false,false])
    const [clickedDetail, setClickedDetail] = useState([false,false,false,false,false])
    const [switched, setSwitched] = useState(false);

    function handleChangeSwitch(){
        event.preventDefault();

        setSwitched(!switched);
    }

    function handleClick(event){
        let e = parseInt(event.target.id)
        setClicked(clicked.slice(0,e).concat([!clicked[e]],clicked.slice(e+1,clicked.length)));
        setParams(oldParams => {
            return ({
                ...oldParams,
                ["categorie"+e+"name"]: "",
                ["categorie"+e+"utilisation"]: "",
                ["categorie"+e+"input"]: "",
                ["categorie"+e+"estimation"]: "",
            })
        });
    }

    function handleClickDetail(event){
        let e = parseInt(event.target.id)
        setClickedDetail(clickedDetail.slice(0,e).concat([!clickedDetail[e]],clickedDetail.slice(e+1,clickedDetail.length)));
        setParams(oldParams => {
            return ({
                ...oldParams,
                ["detail"+e+"name"]: "",
                ["detail"+e+"input"]: "",
            })
        });
    }

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
                        ["categorie"+categorie.num+"name"]: categorie.name,
                        ["categorie"+categorie.num+"input"]: categorie.input,
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
                    ["detail"+detail.num+"name"]: detail.name,
                    ["detail"+detail.num+"input"]: detail.input,
                })
            });
        })
        delete params.details
    }

    const {data} = await API.workouts(params);
    if (data.success === false){
        if (data.message === "Aucune séance !"){
            console.log(data.message);
        }
        else { alert(data.message); }
    } else {
        setSeances(data.seances);
    }
  }

  useEffect(() => {
        setTimeout(getWorkouts, 50);
  }, [params]);

  async function getNames(){
    const {data} = await API.workouts({nom: "", periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
    if (data.success === false){
        if (data.message === "Aucune séance !"){
            console.log(data.message);
        }
        else { alert(data.message); }
    } else {
        let arr = []
        data.seances.forEach((seance, index) => {
            if (seance.nom){
                if (seance.nom.ancienNom !== "nouveau-nom"){
                    if (!arr.includes(seance.nom.ancienNom)){
                        arr.push(seance.nom.ancienNom)
                    }
                }
                else{
                    if (!arr.includes(seance.nom.nouveauNom)){
                        arr.push(seance.nom.nouveauNom)
                    }
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
         if(exercice.exercice.name==="Elevation" || exercice.exercice.name==="Curl" || exercice.exercice.name==="Extension" || exercice.exercice.name==="Abduction" || exercice.exercice.name==="Adduction" || exercice.exercice.name==="Press"){
            if (exercice.exercice.muscle){
                setParams(oldParams => {
                    return ({
                        ...oldParams,
                        exerciceName: exercice.exercice.name,
                        exerciceOwnExercice: exercice.exercice.ownExercice,
                        exerciceMuscle: exercice.exercice.muscle
                    })
                })
            }
        }
        else{
            setParams(oldParams => {
                return ({
                    ...oldParams,
                    exerciceName: exercice.exercice.name,
                    exerciceOwnExercice: exercice.exercice.ownExercice,
                    exerciceMuscle: "",
                })
            })
        }
    },[exercice]);

    function trStyleBlack(index){
            let backgroundColor;

            if (index%2===0){
                backgroundColor = "black"
            } else {
                backgroundColor = "#353535"
            }

            return ({
              backgroundColor: backgroundColor
            })
      }

    function tdStyleBlack(index){
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

    function trStyleWhite(index){
            let backgroundColor;

            if (index%2===0){
                backgroundColor = "white"
            } else {
                backgroundColor = "#f0f0f0"
            }

            return ({
              backgroundColor: backgroundColor
            })
      }

    function tdStyleWhite(index){
            let font;

            if (index%2===0){
                font = "#ff0000"
            } else {
                font = "black"
            }

            return ({
              color: font
            })
      }

    function changeCategorie(categorie, num){
        setCategories(categories.slice(0,num).concat([categorie],categories.slice(num+1,categories.length)));
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

    function resetParameters(){
        event.preventDefault();

        setCategories([])
        setDetails([])
        setClicked([true,true,true,true,true])
        setClickedDetail([true,true,true,true,true])
        setCategoriesAddRien([])
        setDetailsAddRien([])
        setCategorieNumb(0)
        setDetailNumb(0)
        setParams({nom: "", periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""})
    }

    function handleClickModify(event){
        return null
    }

    async function handleClickSuppr(event){
        console.log(event.target.id);
        const res = await API.supprSeance({id: localStorage.getItem("id"), date: event.target.id})
        console.log(res.data)

        window.location = "/dashboard"
    }

  return (
<div>
      <NavigBar location="dashboard"/>

      {seances.length===0 ?
              <div className="Dashboard">
                <h1 className="Dashboard-h1">Bienvenue !</h1>

                <h2 className="Dashboard-h2"> Les choses serieuses commencent, {"laisses moi t'expliquer ce que tu pourras trouver ici"} </h2>

                <div className="Design-welcome">
                    <table className="table1">
                        <tr>
                            <td>
                                <img className="icon-navbar home" src={require('../../images/icons/home.png')} alt='home' />
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="fleche1" src={require('../../images/icons/fleche.png')} alt='home' />
                            </td>
                            <td>
                                {"Ça c'est l'acceuil, mais tu y es déjà ! Quand tu auras enregistré ta première séance, tu pourras y voir ton historique des seances trié comme bon te semble."}
                            </td>
                        </tr>
                    </table>

                    <table className="table1">
                        <tr>
                            <td>
                            </td>
                            <td>
                                <img className="icon-navbar home2" src={require('../../images/icons/write.png')} alt='session' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {"Ici tu pourras enregistrer tes séances. T'inquiètes pas ça va bien se passer."}
                            </td>
                            <td>
                                <img className="fleche2" src={require('../../images/icons/fleche.png')} alt='home' />
                            </td>
                        </tr>
                    </table>


                    <table className="table1">
                        <tr>
                            <td>
                                <img className="icon-navbar home" src={require('../../images/icons/chart.png')} alt='stats' />
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="fleche1" src={require('../../images/icons/fleche.png')} alt='home' />
                            </td>
                            <td>
                                {"Ça c'est l'onglet statistiques. Les statistiques c'est cool (c'est pas une blague)."}
                            </td>
                        </tr>
                    </table>

                    <table className="table1">
                        <tr>
                            <td>
                            </td>
                            <td>
                                <img className="icon-navbar home2" src={require('../../images/icons/plus.png')} alt='programme' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {"Ici tu trouveras le programme parfait parmis ceux de la communauté."}
                            </td>
                            <td>
                                <img className="fleche2" src={require('../../images/icons/fleche.png')} alt='home' />
                            </td>
                        </tr>
                    </table>


                    <table className="table1">
                        <tr>
                            <td>
                                <img className="icon-navbar home" src={require('../../images/icons/social.png')} alt='social' />
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="fleche1" src={require('../../images/icons/fleche.png')} alt='home' />
                            </td>
                            <td>
                                {"Ça c'est l'onglet social. Si tu as des amis, tu verras leur progression ici."}
                            </td>
                        </tr>
                    </table>

                    <table className="table1">
                        <tr>
                            <td>
                            </td>
                            <td>
                                <img className="icon-navbar home2" src={require('../../images/icons/gear.png')} alt='parametres' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {"Ici tu pourras paramétrer ton compte et obtenir de l'aide."}
                            </td>
                            <td>
                                <img className="fleche2" src={require('../../images/icons/fleche.png')} alt='home' />
                            </td>
                        </tr>
                    </table>

                    <h2 className="Dashboard-h2"> Amuses-toi bien ! </h2>

                    <h3 className="Dashboard-h2"> {"Et n'oublies pas de nous suivre sur nos différents réseaux pour partager ton ressenti et ne rien rater de la suite !"} </h3>

                    <div className="Design-welcome">
                        <table className="table1">
                            <tr>
                                <td>
                                    <img className="social" src={require('../../images/icons/twitter.png')} alt='twitter' />
                                </td>
                                <td>
                                    <img className="social" src={require('../../images/icons/instagram.png')} alt='instagram' />
                                </td>
                                <td>
                                    <img className="social" src={require('../../images/icons/facebook.png')} alt='facebook' />
                                </td>
                                <td>
                                    <img className="social" src={require('../../images/icons/discord.png')} alt='discord' />
                                </td>
                                <td>
                                    <img className="social" src={require('../../images/icons/tiktok.png')} alt='tiktok' />
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
              </div>
      :
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
                                    <label onClick={handleClick} id={index} className="col-form-label categorie-label">
                                      Catégorie {index+1}
                                    </label>
                                    <CategorieInput click={clicked[index]} id={"catégorie"+index} index={index} dashboard={true} num={index} exercice={exercice.exercice} changeCategorie={changeCategorie}/>
                                </div>
                            </div>
                        )
                    })}

                    {detailsAddRien.map((rien, index) => {
                        return(
                            <div className="form-group row">
                                <div className="form-group col-sm-12">
                                    <label onClick={handleClickDetail} id={index} className="col-form-label detail-label">
                                      Détail {index+1}
                                    </label>
                                    <DetailInput click={clickedDetail[index]} id={"detail"+index} index={index} num={index} dashboard={true} changeDetail={changeDetail}/>
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

                        <div className="form-group col-sm-3 button-dashboard">
                            <button className="btn btn-dark form-button" onClick={resetParameters} type="submit">Reset des paramètres</button>
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
                        <div className="form-group group-margin col-sm-12">
                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageNom" id="affichageNom"/>
                              <label className="col-form-label" htmlFor="#affichageNom"> Nom </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageDate" id="affichageDate"/>
                              <label className="col-form-label"  htmlFor="#affichageDate"> Date </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichagePoids" id="affichagePoids"/>
                              <label className="col-form-label" htmlFor="#affichagePoids"> Poids </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageExercice" id="affichageExercice"/>
                              <label className="col-form-label" htmlFor="#affichageExercice"> Exercice </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageSérie" id="affichageSérie"/>
                              <label className="col-form-label" htmlFor="#affichageSérie"> Série </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageType" id="affichageType"/>
                              <label className="col-form-label" htmlFor="#affichageType"> Type </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageReps" id="affichageReps"/>
                              <label className="col-form-label" htmlFor="#affichageReps"> Reps </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageCharge" id="affichageCharge"/>
                              <label className="col-form-label" htmlFor="#affichageCharge"> Charge </label>

                              <input defaultChecked={true} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichagePercent" id="affichagePercent"/>
                              <label className="col-form-labell" htmlFor="#affichagePercent"> % PDC </label>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="form-group group-margin col-sm-12">
                            <p className=""> Tableau blanc <GreenSwitch onChange={handleChangeSwitch}/> Tableau noir </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="form-group col-sm-6">
                              <input defaultChecked={false} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageModif" id="affichageModif"/>
                              <label className="col-form-label" htmlFor="#affichageModif"> Modifier des séances </label>
                        </div>

                        <div className="form-group group-margin-last col-sm-6">
                              <input defaultChecked={false} type="checkbox" className="col-form-control" onChange={handleChangeCheckbox} value="affichageSuppr" id="affichageSuppr"/>
                              <label className="col-form-label" htmlFor="#affichageSuppr"> Supprimer des séances </label>
                        </div>
                    </div>
                </form>



                <table className={switched ? "table table-hover table-responsive-lg table-dark dashboard-table" : "table table-hover table-responsive-lg dashboard-table"}>
                  <thead className={switched ? "thead-dark" : ""}>
                    <tr>
                      {checkbox.affichageModif ? <th scope="col">Modifier </th> : null}
                      {checkbox.affichageSuppr ? <th scope="col">Supprimer </th> : null}
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
                                        return (exercice.Series && Object.values(exercice.Series).map((serie, indexSerie) => {
                                           if(serie !== null){
                                                return (
                                                    <tr style={switched ? trStyleBlack(indexSeance) : trStyleWhite(indexSeance)}>
                                                        {checkbox.affichageModif ?
                                                            indexExercice === 0 ?
                                                                indexSerie === 0 ?
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                        <img id={seance.date} onClick={handleClickModify} className={switched ? "modify-black" : "modify-white"} src={require('../../images/icons/write.png')} alt='session' />
                                                                    </td>
                                                                :
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">

                                                                    </td>
                                                            :
                                                                <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">

                                                                </td>
                                                        :
                                                            null
                                                        }
                                                        {checkbox.affichageSuppr ?
                                                            indexExercice === 0 ?
                                                                indexSerie === 0 ?
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                        <img id={seance.date} onClick={handleClickSuppr} className={switched ? "suppr-black" : "suppr-white"} src={require('../../images/icons/icons8-trash-30.png')} alt='session' />
                                                                    </td>
                                                                :
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">

                                                                    </td>
                                                            :
                                                                <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">

                                                                </td>
                                                        :
                                                            null
                                                        }
                                                        {checkbox.affichageNom ?
                                                            seance.nom ?
                                                                seance.nom.ancienNom !== "nouveau-nom" ?
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                        {seance.nom.ancienNom}
                                                                    </td>
                                                                :
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                        {seance.nom.nouveauNom}
                                                                    </td>
                                                            :
                                                                <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                    /
                                                                </td>
                                                        : null }
                                                        {checkbox.affichageDate ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {seance.date}
                                                            </td>
                                                        : null }
                                                        {checkbox.affichagePoids ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {seance.poids}
                                                            </td>
                                                        : null }
                                                        {checkbox.affichageExercice ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {exercice.exercice.name==="own-exercice" ? exercice.exercice.ownExercice : exercice.exercice.name}
                                                            </td>
                                                        : null }
                                                        {categoriesAddRien.map((rien,index) => {
                                                            if (exercice.Categories){
                                                                if (Object.values(exercice.Categories)[index]){
                                                                    if (Object.values(exercice.Categories)[index].name === "Elastique"){
                                                                        return(
                                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                                 Elastique en {Object.values(exercice.Categories)[index].utilisation} estimé à {Object.values(exercice.Categories)[index].estimation} kg
                                                                            </td>
                                                                        )
                                                                    }
                                                                    else{
                                                                        return(
                                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                                 {Object.values(exercice.Categories)[index].input}
                                                                            </td>
                                                                        )
                                                                    }
                                                                }
                                                                else{
                                                                    return(
                                                                        <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                        /
                                                                        </td>
                                                                    )
                                                                }
                                                            }
                                                            else{
                                                                return(
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                    /
                                                                    </td>
                                                                )
                                                            }
                                                        })}
                                                        {checkbox.affichageSérie ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {serie.num+1}
                                                            </td>
                                                        : null }
                                                        {checkbox. affichageType ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {serie.typeSerie==="reps" ? "Répétitions" : null}
                                                                {serie.typeSerie==="time" ? "Temps (sec)" : null}
                                                            </td>
                                                        : null }
                                                        {checkbox.affichageReps ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {serie.repsTime}
                                                            </td>
                                                        : null }
                                                        {checkbox.affichageCharge ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {serie.charge}
                                                            </td>
                                                        : null }
                                                        {checkbox.affichagePercent ?
                                                            <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                {serie.percent}
                                                            </td>
                                                        : null }
                                                        {detailsAddRien.map((rien,index) => {
                                                            if (seance.details){
                                                                if (Object.values(seance.details)[index]){
                                                                    return(
                                                                        <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                             {Object.values(seance.details)[index].input}
                                                                        </td>
                                                                    )
                                                                }
                                                                else{
                                                                    return(
                                                                        <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
                                                                        /
                                                                        </td>
                                                                    )
                                                                }
                                                            }
                                                            else{
                                                                return(
                                                                    <td style={switched ? tdStyleBlack(indexExercice) : tdStyleWhite(indexExercice)} className="dashboard-td">
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
      }
</div>
    )
}

export default Dashboard;