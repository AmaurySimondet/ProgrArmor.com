import {React, useState, useEffect} from "react";
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Select from "react-select";
import customStyles from "./customStyles.js";

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
import positionBras from "./Categories/PositionBras.js";


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
    if(event.target){
        setCategorie(oldCategorie => {
        return ({
            ...oldCategorie,
            [event.target.id]: event.target.value,
            })
        });
    }
    if(event.id==="muscle"){
        setCategorie(oldCategorie => {
        return ({
            ...oldCategorie,
            input: event.value,
            })
        });
    }
    else{
        setCategorie(oldCategorie => {
            return ({
                ...oldCategorie,
                [event.id]: event.value,
                })
            });
    }
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
    props.changeCategorie(categorie, props.num)
  }, [categorie])

  useEffect(() => {
    if(props.click){
        setCategorie({num : props.num})
    }
  }, [props.click])

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
        props.info === "false" ?
                <Select
                    placeholder="Categorie..."
                    onChange={handleChange}
                    options={lesCategories}
                    styles={customStyles}
                />
        :
        <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                          Catégorie {props.dashboard ? props.index+1 : null} ({props.exercice.name})
                          <img className="myDIV" onClick={handleClickCategorie} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                          <div className={categorieHiddenClick}>
                              <CategorieHiddenText />
                          </div>
                    </label>
                }
                <Select
                    placeholder="Categorie..."
                    onChange={handleChange}
                    options={lesCategories}
                    styles={customStyles}
                    className={props.info === "false" ? "form-control" : " col-sm-9"}
                />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
          </div>
      }

      {categorie.name === "Variante Street Workout" ?
        props.info === "false" ?
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={Streetworkout}
                styles={customStyles}
            />
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                          {categorie.name}
                          <img className="myDIV" onClick={handleClickStreetworkout} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                          <div className={streetworkoutHiddenClicked}>
                              <StreetworkoutHiddenText />
                          </div>
                    </label>
                }
                <Select
                    placeholder="Categorie..."
                    onChange={handleChange}
                    options={Streetworkout}
                    styles={customStyles}
                    className={props.info === "false" ? "form-control" : " col-sm-9"}
                />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Type de barre / poids" ?
        props.info === "false" ?
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={lesTypesBarres}
                styles={customStyles}
            />
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                          {categorie.name}
                    </label>
                }
                <Select
                    placeholder="Categorie..."
                    onChange={handleChange}
                    options={lesTypesBarres}
                    styles={customStyles}
                    className={props.info === "false" ? "form-control" : " col-sm-9"}
                />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Muscle" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={MusclesCategorie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={MusclesCategorie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Positionnement du corps" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={PositionCorps}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={PositionCorps}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Positionnement des bras" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={PositionBras}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={PositionBras}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Positionnement des jambes" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={PositionJambes}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={PositionJambes}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Positionnement des mains" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={PositionMains}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={PositionMains}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Positionnement des pieds" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={PositionPieds}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={PositionPieds}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Placement et axe du corps / banc / barre" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={AxeCategorie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={AxeCategorie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Ouverture coudes / genoux" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={CoudeGenou}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={CoudeGenou}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Unilatéral" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={Unilateral}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={Unilateral}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Type d'éxecution" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={Execution}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={Execution}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Type d'éxecution spécifique" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={ExecutionSpecifique}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={ExecutionSpecifique}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Temps de repos entre les séries" ?
        props.info === "false" ?
                <div className={props.info === "false" ? "form-control" : "col-sm-9"}>
                    <input type="text"
                          className="form-control"
                          id="input"
                          value={categorie.input}
                          onChange={handleChange}
                    />
                </div>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                          {categorie.name}
                    </label>
                }
                <div className={props.info === "false" ? "form-control" : "col-sm-9"}>
                    <input type="text"
                          className="form-control"
                          id="input"
                          value={categorie.input}
                          onChange={handleChange}
                    />
                </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "RPE / Niveau d'intensité" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={RPE}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={RPE}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Gêne / douleur / blessure" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={Douleur}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={Douleur}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Type de prise" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={PriseCategorie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={PriseCategorie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Tempo" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={TempoCategorie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={TempoCategorie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Forme (Partiel)" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={Partiel}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={Partiel}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Point de départ" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={DépartCategorie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={DépartCategorie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Variante d'exercice explosif" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={ExplosifCategorie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={ExplosifCategorie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Variante d'exercice d'haltérophilie" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={Halterophilie}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={Halterophilie}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Accessoire supplémentaire ou objet spécifique" ?
        props.info === "false" ?
        <Select
            placeholder="Categorie..."
            onChange={handleChange}
            options={AccessoireObjet}
            styles={customStyles}
        />
    :
        <div className="form-group row">
            {props.info === "false" ?
                null
            :
                <label className="col-sm-2 col-form-label">
                      {categorie.name}
                </label>
            }
            <Select
                placeholder="Categorie..."
                onChange={handleChange}
                options={AccessoireObjet}
                styles={customStyles}
                className={props.info === "false" ? "form-control" : " col-sm-9"}
            />

                {dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {categorie.name === "Elastique" ?
        props.info === "false" ?
            <select onChange={handleChange} className={props.info === "false" ? "form-control" : " col-sm-9"} id="utilisation">
                <option className="select-title" value="title"> / (défaut) </option>
                <option value="Resistance"> Résistance </option>
                <option value="Assistance"> Assistance </option>
            </select>
        :
          props.dashboard ?
            <div className="form-group row">
                    {props.info === "false" ?
                        null
                    :
                        <label className="col-sm-2 col-form-label">
                              Utilisation
                        </label>
                    }
                    <select onChange={handleChange} className={props.info === "false" ? "form-control" : " col-sm-9"} id="utilisation">
                        <option className="select-title" value="title"> / (défaut) </option>
                        <option value="Resistance"> Résistance </option>
                        <option value="Assistance"> Assistance </option>
                    </select>

                    {props.dashboard ? null : <div className="col-sm-1">
                      <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                    </div>}
            </div>
          :
            <div>
                <div className="form-group row">
                    {props.info === "false" ?
                        null
                    :
                        <label className="col-sm-2 col-form-label">
                              Utilisation
                        </label>
                    }
                    <select onChange={handleChange} className={props.info === "false" ? "form-control" : " col-sm-9"} id="utilisation">
                        <option className="select-title" value="title"> / (défaut) </option>
                        <option value="Resistance"> Résistance </option>
                        <option value="Assistance"> Assistance </option>
                    </select>

                    {props.dashboard ? null : <div className="col-sm-1">
                      <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                    </div>}
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Épaisseur / taille élastique
                    </label>
                    <select onChange={handleChange} className=" col-sm-9" id="input">
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











