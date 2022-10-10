import {React, useState, useEffect} from "react";
import lesCategories from "./Categories/Categories";
import lesVariantes from "./Categories/Variantes.js";
import lesTypesBarres from "./Categories/TypesBarres.js";
import lesElastiques from "./Categories/Elastiques.js";
import VarianteHiddenText from "./Categories/VarianteHiddenText.js";
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 100,
    label: '100%',
  },
  {
    value: 200,
    label: '200%',
  },
  {
    value: 300,
    label: '300%',
  },
  {
    value: 400,
    label: '400%',
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

      {categorie.name === "Variante" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Variante
                  <img className="myDIV" onClick={handleClickVariante} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                  <div className={varianteClicked}>
                      <VarianteHiddenText />
                  </div>
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {lesVariantes.map(createEntry)}
                </select>
            </div>
      : null }
      {categorie.name === "Variante" && categorie.input==="Avec chaines" ?
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                    Poids chaines (kg)
                    <img className="myDIV" onClick={handleClickChaine} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                    <div className={chaineClicked}>
                      <div className="hidden-text">
                        <strong> Attention: ce poids sera ajouté à la charge totale, il ne faut donc pas le compter dans la charge </strong>
                      </div>
                    </div>
                </label>
                <div className="col-sm-5">
                  <input type="text"
                      className="form-control"
                      onChange={handleChange}
                      id="poidsChaines"
                      value={categorie.poidsChaines}
                  />
                </div>
            </div>
        :null}
      {categorie.name === "Côté (si unilatéral)" ?
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          Côté
        </label>
        <select onChange={handleChange} className="custom-select col-sm-9" id="input">
            <option className="select-title" value="title"> / (défaut) </option>
            <option value="Gauche"> Gauche </option>
            <option value="Droit"> Droit </option>
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

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Tension elastique
                </label>
                <Slider
                    style={{
                        width: "70%",
                        marginLeft: "5%"
                    }}
                    defaultValue={100}
                    onChange={handleChangeSlider}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    max={400}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </div>
        </div>
      : null }

  </div>
  );
};

export default CategorieInput;











