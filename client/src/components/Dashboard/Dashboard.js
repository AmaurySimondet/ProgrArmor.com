import {React, useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import API from "../../utils/API";
import ExerciceInput from "./ExerciceInput"
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
    const [params, setParams] = useState({periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
    const [categorieNumb, setCategorieNumb] = useState(0)
    const [detailNumb, setDetailNumb] = useState(0)
    const [categoriesAddRien, setCategoriesAddRien] = useState([])
    const [detailsAddRien, setDetailsAddRien] = useState([])

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
    const {data} = await API.workouts(params);
    if (data.success === false){
        alert(data.message);
    } else {
//        console.log(data.seances);
        setSeances(data.seances);
    }
  }

  useEffect(() => {
        setTimeout(getWorkouts, 50);
  }, [params]);


  function handleChange(event){
    event.preventDefault();

    setParams(oldParams => {
        return ({
            ...oldParams,
            [event.target.id]: event.target.value,
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

  return (
      <div>
          <NavigBar location="dashboard"/>

          <div className="Dashboard">

            <h1 className="Dashboard-h1">Historique des séances</h1>

            <form className="debutant-form">
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">
                      Tri
                    </label>
                    <div className="col-sm-5">
                        <select onChange={handleChange} className="custom-select col-sm-10" id="tri">
                            <option value="Ordre chronologique décroissant"> Ordre chronologique décroissant (défaut) </option>
                            <option value="Ordre chronologique croissant"> Ordre chronologique croissant </option>
                            <option value="Charge (ordre décroissant)"> Charge (ordre décroissant) </option>
                            <option value="PDC (ordre décroissant)"> % PDC (ordre décroissant) </option>
                        </select>
                    </div>

                    <label className="col-sm-1 col-form-label">
                      Periode
                    </label>
                    <div className="col-sm-5">
                        <select onChange={handleChange} className="custom-select col-sm-10" id="periode">
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
                    <label className="col-sm-1 col-form-label">
                      Exercice
                    </label>
                    <div className="col-sm-5">
                        <ExerciceInput taille="petit" typeSerie={0} id="exercice" changeExercice={changeExercice} />
                    </div>

                    <label className="col-sm-1 col-form-label">
                      Reps / Temps
                    </label>
                        <div className="col-sm-2">
                            <input type="text"
                              className="form-control"
                              value={params.repsFrom}
                              onChange={handleChange}
                              placeholder="Aucun filtre"
                              id="repsFrom"
                            />
                        </div>
                        <label className="">
                          à
                        </label>
                        <div className="col-sm-2">
                            <input type="text"
                              className="form-control"
                              value={params.repsTo}
                              onChange={handleChange}
                              placeholder="Aucun filtre"
                              id="repsTo"
                            />
                        </div>
                </div>

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
            </form>



            <table className="table table-hover table-responsive-md table-dark dashboard-table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date </th>
                  <th scope="col">Poids</th>
                  <th scope="col">Exercice</th>
                  {categoriesAddRien.map(rien => {
                    return <th scope="col">Categorie</th>
                  })}
                  <th scope="col">Série</th>
                  <th scope="col">Type</th>
                  <th scope="col">Reps / Temps</th>
                  <th scope="col">Charge</th>
                  <th scope="col">% PDC</th>
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
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {seance.date}
                                                    </td>
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {seance.poids}
                                                    </td>
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {exercice.exercice.name==="own-exercice" ? exercice.exercice.ownExercice : exercice.exercice.name}
                                                    </td>
                                                    {categoriesAddRien.map((rien,index) => {
                                                        console.log(exercice.Categories)
                                                        if (Object.values(exercice.Categories)[index].input){
                                                            return(
                                                                <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                     {Object.values(exercice.Categories)[index].input}
                                                                </td>
                                                            )
                                                        } else{
                                                            return(
                                                                <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                                /
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {serie.num+1}
                                                    </td>
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {serie.typeSerie==="reps" ? "Répétitions" : null}
                                                        {serie.typeSerie==="time" ? "Temps (sec)" : null}
                                                    </td>
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {serie.repsTime}
                                                    </td>
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {serie.charge}
                                                    </td>
                                                    <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                        {serie.percent}
                                                    </td>
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