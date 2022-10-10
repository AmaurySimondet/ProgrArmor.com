import {React, useState, useEffect} from "react";
import lesCategories from "./Categories";

function createEntry(categorie) {
  return (
    <option
      key={categorie.id}
      className={categorie.class}
      value={categorie.value}
    >
      {categorie.name}
    </option>
  );
}

function CategorieInput(props) {
  const [categorie, setCategorie] = useState({num: props.num});

  function handleChange(event){
    event.preventDefault();

    setCategorie(oldCategorie => {
            return ({
            ...oldCategorie,
            [event.target.id]: event.target.value,
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
              Catégorie
            </label>
            <select onChange={handleChange} className="custom-select col-sm-10" id="name">
                {lesCategories.map(createEntry)}
            </select>
      </div>

      <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Information
            </label>
            <div className="col-sm-9">
              <input type="text"
                  className="form-control"
                  id="input"
                  onChange={handleChange}
                  value={categorie.input}
              />
            </div>

            <div className="col-sm-1">
              <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
            </div>
      </div>
  </div>
  );
};

export default CategorieInput;











