import {React, useState, useEffect} from "react";
import lesCategories from "./Categories/Categories";
import lesVariantes from "./Categories/Variantes.js";
import lesTypesBarres from "./Categories/TypesBarres.js";
import lesElastiques from "./Categories/Elastiques.js";
import Streetworkout from "./Categories/StreetWorkout.js";
import VarianteHiddenText from "./Categories/VarianteHiddenText.js";
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

//      {categorie.name === "Variante" ?
//            <div className="form-group row">
//                <label className="col-sm-2 col-form-label">
//                  Variante
//                  <img className="myDIV" onClick={handleClickVariante} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
//                  <div className={varianteClicked}>
//                      <VarianteHiddenText />
//                  </div>
//                </label>
//                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
//                    {lesVariantes.map(createEntry)}
//                </select>
//            </div>
//      : null }
//      {categorie.name === "Variante" && categorie.input==="Avec chaines" ?
//            <div className="form-group row">
//                <label className="col-sm-2 col-form-label">
//                    Poids chaines (kg)
//                    <img className="myDIV" onClick={handleClickChaine} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
//                    <div className={chaineClicked}>
//                      <div className="hidden-text">
//                        <strong> Attention: ce poids sera ajouté à la charge totale, il ne faut donc pas le compter dans la charge </strong>
//                      </div>
//                    </div>
//                </label>
//                <div className="col-sm-5">
//                  <input type="text"
//                      className="form-control"
//                      onChange={handleChange}
//                      id="poidsChaines"
//                      value={categorie.poidsChaines}
//                  />
//                </div>
//            </div>
//        :null}

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
  const [varianteClicked, setVarianteClicked] = useState("hide");
  const [chaineClicked, setChaineClicked] = useState("hide");

  function handleClickChaine(){
    if(chaineClicked==="hide"){
        setChaineClicked("nothide");
    } else { setChaineClicked("hide")};
  }

  function handleClickVariante(){
    if(varianteClicked==="hide"){
        setVarianteClicked("nothide");
    } else { setVarianteClicked("hide")};
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
  <div style={divStyle(props.num)}>
      <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Catégorie ({props.exercice.name})
            </label>
            <select onChange={handleChange} className="custom-select col-sm-9" id="name">
                {lesCategories.map(createEntry)}
            </select>

            <div className="col-sm-1">
              <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
            </div>
      </div>

      {categorie.name === "Variante Street Workout" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Variante Street Workout
                  <img className="myDIV" onClick={handleClickVariante} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                  <div className={varianteClicked}>
                      <VarianteHiddenText />
                  </div>
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Streetworkout.map(createEntry)}
                </select>
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
            </div>
      : null }
      {categorie.name === "Elastique" ?
        <div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Utilisation elastique
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="utilisation">
                    <option className="select-title" value="title"> / (défaut) </option>
                    <option value="Resistance"> Résistance </option>
                    <option value="Assistance"> Assistance </option>
                </select>
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
                  Tension elastique (kg)
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
                <div className="form-group row">
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
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Estimation
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











