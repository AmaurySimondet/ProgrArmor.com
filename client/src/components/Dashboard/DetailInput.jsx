import {React, useState, useEffect} from "react";

import Details from "./Details/Details";
import Meteo from "./Details/Meteo";
import DouleurSeance from "./Details/DouleurSeance";
import Fatigue from "./Details/Fatigue";
import Preworkout from "./Details/Preworkout";
import DRUG from "./Details/DRUG";
import Psycho from "./Details/Psycho";
import Seul from "./Details/Seul";
import Environnement from "./Details/Environnement";
import Courbatures from "./Details/Courbatures";

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

function DetailInput(props) {
  const [detail, setDetail] = useState({num: props.num});

  function handleChange(event){
    event.preventDefault();

    setDetail(oldDetail => {
            return ({
            ...oldDetail,
            [event.target.id]: event.target.value,
        })});
  }

  useEffect(() => {
    props.changeDetail(detail, props.num)
  }, [detail])

  function handleClickPoubelle(){
         props.onDeleteDetail(props.num);

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

  useEffect(() => {
    if(props.click){
        setDetail({num : props.num})
    }
  }, [props.click])

  return (
  <div style={divStyle(props.num)}>
    {detail.name ?
        null
    :
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="name">
                        {Details.map(createEntry)}
            </select>
        :
          <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                      Detail {props.dashboard ? props.index+1 : null}
                </label>

                <select onChange={handleChange} className="custom-select col-sm-9" id="name">
                    {Details.map(createEntry)}
                </select>


                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
          </div>
      }

      {detail.name === "Condition météorologique défavorable" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Meteo.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {detail.name}
                </label>
                <select onChange={handleChange} className="custom-select col-sm-9" id="input">
                    {Meteo.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Gêne / douleur / blessure" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {DouleurSeance.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {DouleurSeance.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Fatigue" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Fatigue.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {Fatigue.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Pre Workout, Café..." ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Preworkout.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {Preworkout.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Alcool, drogue, sexe..." ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {DRUG.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {DRUG.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Etat psychologique" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Psycho.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {Psycho.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Séance seul ou à plusieurs" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Seul.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {Seul.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Environnement" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Environnement.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {Environnement.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Courbatures / Congestion" ?
        props.info === "false" ?
            <select onChange={handleChange} className="form-control" id="input">
                {Courbatures.map(createEntry)}
            </select>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <select onChange={handleChange} className={props.info === "false" ? "form-control" : "custom-select col-sm-9"} id="input">
                    {Courbatures.map(createEntry)}
                </select>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Notes" ?
        props.info === "false" ?
            <div className={props.info === "false" ? "" : "col-sm-10"}>
                    <textarea type="text"
                          className="form-control"
                          id="input"
                          value={detail.input}
                          placeHolder="Je n'ai pas su garder un léger flex"
                          rows="5"
                          onChange={handleChange}
                    />
            </div>
        :
            <div className="form-group row">
                {props.info === "false" ?
                    null
                :
                    <label className="col-sm-2 col-form-label">
                      {detail.name}
                    </label>
                }
                <div className={props.info === "false" ? "" : "col-sm-10"}>
                    <textarea type="text"
                          className="form-control"
                          id="input"
                          value={detail.input}
                          placeHolder="Je n'ai pas su garder un léger flex"
                          rows="5"
                          onChange={handleChange}
                    />
                </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
  </div>
  );
};

export default DetailInput;











