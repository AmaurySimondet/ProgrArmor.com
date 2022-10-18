import {React, useState, useEffect} from "react";
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import lesCategories from "./Categories/Categories";
import lesTypesBarres from "./Categories/TypesBarres.js";
import lesElastiques from "./Categories/Elastiques.js";
import Streetworkout from "./Categories/StreetWorkout.js";
import MusclesCategorie from "./Categories/MusclesCategorie.js";
import PositionCorps from "./Categories/PositionCorps.js";
import PositionBras from "./Categories/PositionBras.js";
import PositionJambes from "./Categories/PositionJambes.js";
import PositionMains from "./Categories/PositionMains.js";
import PositionPieds from "./Categories/PositionPieds.js";
import AxeCategorie from "./Categories/AxeCategorie.js";
import CoudeGenou from "./Categories/CoudeGenou.js";
import Unilateral from "./Categories/Unilateral.js";
import Execution from "./Categories/ExecutionCategorie.js";
import ExecutionSpecifique from "./Categories/ExecutionSpecifique.js";
import PriseCategorie from "./Categories/PriseCategorie.js";
import TempoCategorie from "./Categories/TempoCategorie.js";
import Partiel from "./Categories/Partiel.js";
import DépartCategorie from "./Categories/DépartCategorie.js";
import ExplosifCategorie from "./Categories/ExplosifCategorie.js";
import Halterophilie from "./Categories/Halterophilie.js";
import AccessoireObjet from "./Categories/AccessoireObjet.js";
import RPE from "./Categories/RPE.js";
import Douleur from "./Categories/Douleur.js";

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
    value: 0.5,
    label: '0.5',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 9,
    label: '9',
  },

];

function valuetext(value) {
  return `${value}%`;

}

function createEntry(item) {
  return (
    <option
      key={item.id}
      className={item.class}
      value={item.value}
    >
      {item.name}
    </option>
  );
}

function CategorieInput(props) {
  const [categorie, setCategorie] = useState({num: props.num});
  const [streetworkoutHiddenClicked, setStreetworkoutHiddenClicked] = useState("hide");
  const [categorieHiddenClick, setcategorieHiddenClick] = useState('hide')
  const [elastiqueHiddenClick, setElastiqueHiddenClick] = useState('hide')

  function handleClickElastique(){
    if(elastiqueHiddenClick==="hide"){
        setElastiqueHiddenClick("nothide");
    } else { setElastiqueHiddenClick("hide")};
  }

  function handleClickCategorie(){
    if(categorieHiddenClick==="hide"){
        setcategorieHiddenClick("nothide");
    } else { setcategorieHiddenClick("hide")};
  }

  function handleClickStreetworkout(){
    if(streetworkoutHiddenClicked==="hide"){
        setStreetworkoutHiddenClicked("nothide");
    } else { setStreetworkoutHiddenClicked("hide")};
  }

  function handleChange(event){
    event.preventDefault();

    setCategorie(oldCategorie => {
            return ({
            ...oldCategorie,
            [event.target.id]: event.target.value,
        })});
  }

  function handleChangeSlider(event){
    event.preventDefault();

    setCategorie(oldCategorie => {
            return ({
            ...oldCategorie,
            tension: event.target.value,
            estimation: (event.target.value/3*parseInt(categorie.input)).toFixed(2),
        })});
  }

  useEffect(() => {
    props.changeCategorie(categorie, props.num, props.exercice)
  }, [categorie])

  function handleClickPoubelle(){
         props.onDeleteCategorie(props.num);

         event.preventDefault();
  }

  function divStyle(index){
        let array = ['ff0000', 'aa0000', '550000', '000000']
        let numb = index%4
        let color = '#' + array[numb]
        let font;

        if (index%2===0){
            font = 400;
        } else {
            font = 500;
        }

        return ({
          color: color,
          fontWeight:font
        })
  }

  return (
  <div style={divStyle(props.num)} className="Categorie">

    {categorie.name ?
        null
      :
        <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                      Catégorie ({props.exercice.name})
                      <img className="myDIV" onClick={handleClickCategorie} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                      <div className={categorieHiddenClick}>
                          <CategorieHiddenText />
                      </div>
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="name">
                    {lesCategories.map(createEntry)}
                </select>



                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
          </div>
      }

      {categorie.name === "Variante Street Workout" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Variante Street Workout
                  <img className="myDIV" onClick={handleClickStreetworkout} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                  <div className={streetworkoutHiddenClicked}>
                      <StreetworkoutHiddenText />
                  </div>
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Streetworkout.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Type de barre / poids" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Type de barre / poids
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {lesTypesBarres.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Muscle" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Muscle
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {MusclesCategorie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Positionnement du corps" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Positionnement du corps
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {PositionCorps.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Positionnement des bras" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Positionnement des bras
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {PositionBras.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Positionnement des jambes" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Positionnement des jambes
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {PositionJambes.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Positionnement des mains" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Positionnement des jambes
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {PositionMains.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Positionnement des pieds" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Positionnement des pieds
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {PositionPieds.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Placement et axe du corps / banc / barre" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Placement et axe du corps / banc / barre
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {AxeCategorie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Ouverture coudes / genoux" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Ouverture coudes / genoux
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {CoudeGenou.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Unilatéral" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Unilatéral
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Unilateral.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Type d'éxecution" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Type d'éxecution"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Execution.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Type d'éxecution spécifique" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Type d'éxecution spécifique"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {ExecutionSpecifique.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Temps de repos entre les séries" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Temps de repos entre les séries (minutes)
                </label>
                <div className="col-sm-9">
                    <input type="text"
                          className="form-control"
                          id="input"
                          value={categorie.input}
                          onChange={handleChange}
                    />
                </div>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "RPE / Niveau d'intensité" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  RPE / Niveau d'intensité
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {RPE.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Gêne / douleur / blessure" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Gêne / douleur / blessure
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Douleur.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Type de prise" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Type de prise"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {PriseCategorie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Tempo" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Tempo"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {TempoCategorie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Forme (Partiel)" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Forme (Partiel)"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Partiel.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Point de départ" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Point de départ"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {DépartCategorie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Variante d'exercice explosif" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Variante d'exercice explosif"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {ExplosifCategorie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Variante d'exercice d'haltérophilie" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Variante d'exercice d'haltérophilie"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Halterophilie.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Accessoire supplémentaire ou objet spécifique" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {"Accessoire supplémentaire ou objet spécifique"}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {AccessoireObjet.map(createEntry)}
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>
      : null }
      {categorie.name === "Elastique" ?
        <div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Utilisation
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="utilisation">
                    <option className="select-title" value="title"> / (défaut) </option>
                    <option value="Resistance"> Résistance </option>
                    <option value="Assistance"> Assistance </option>
                </select>

                <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Elastique
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {lesElastiques.map(createEntry)}
                </select>
            </div>

            {categorie.input === "mesure" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Tension (kg)
                </label>
                <div className="col-sm-9">
                    <input type="text"
                          className="form-control"
                          id="estimation"
                          value={categorie.estimation}
                          onChange={handleChange}
                    />
                </div>
            </div>
            :
            <div>
                <div className="form-group row slider-style">
                    <label className="col-sm-2 col-form-label">
                      Etirement (mètres)
                    </label>
                    <StyleSlider
                        style={
                        {
                            width: "74%",
                            marginLeft: "1%"
                        }
                        }
                        defaultValue={100}
                        onChange={handleChangeSlider}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={0.5}
                        max={9}
                        min={0.5}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Estimation
                      <img className="myDIV" onClick={handleClickElastique} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                      <div className={elastiqueHiddenClick}>
                          <ElastiqueHiddenText />
                      </div>
                    </label>
                    <div className="col-sm-9">
                      <input type="text"
                          className="form-control"
                          id="estimation"
                          value={categorie.estimation+" kg"}
                          readOnly
                      />
                    </div>
                </div>
            </div>
            }
        </div>
      : null }

  </div>
  );
};

export default CategorieInput;











