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
import customStyles from "./customStyles.js";
import Select from "react-select";

function DetailInput(props) {
  const [detail, setDetail] = useState(props.detail);

  function handleChange(event){
    if(event.target){
        setDetail(oldDetail => {
        return ({
            ...oldDetail,
            [event.target.id]: event.target.value,
            })
        });
    }
    else{
        setDetail(oldDetail => {
            return ({
                ...oldDetail,
                [event.id]: event.value,
                })
            });
    }
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
          <div className="form-group row">
                {props.info==="false" ? null :
                  <label className="col-sm-2 col-form-label">
                      Detail {props.dashboard ? props.index+1 : null}
                </label>
                } 

                <div className={props.info===true ? "col-sm-10" : props.info==="false" ? "col-sm-12" : "col-sm-9"}>
                <Select
                    placeholder="Detail..."
                    onChange={handleChange}
                    options={Details}
                    styles={customStyles}
                    value={{value: detail.name, label: detail.name }}
                />
                </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
          </div>
      }

      {detail.name === "Condition météorologique défavorable" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Meteo}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  {detail.name}
                </label>
                <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
                <Select
                    placeholder="Detail..."
                    onChange={handleChange}
                    options={Meteo}
                    styles={customStyles}
                    value={{value: detail.input, label: detail.input }}
                />
                </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Gêne / douleur / blessure" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={DouleurSeance}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={DouleurSeance}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Fatigue" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Fatigue}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={Fatigue}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Pre Workout, Café..." ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Preworkout}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={Preworkout}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Alcool, drogue, sexe..." ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={DRUG}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={DRUG}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Etat psychologique" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Psycho}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={Psycho}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Séance seul ou à plusieurs" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Seul}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={Seul}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Environnement" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Environnement}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={Environnement}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

                {props.dashboard ? null : <div className="col-sm-1">
                  <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
                </div>}
            </div>
      : null }
      {detail.name === "Courbatures / Congestion" ?
        props.info === "false" ?
        <Select
            placeholder="Detail..."
            onChange={handleChange}
            options={Courbatures}
            styles={customStyles}
            value={{value: detail.input, label: detail.input }}
        />
      :
          <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                {detail.name}
              </label>
              <div className={props.info===true ? "col-sm-10" : "col-sm-9"}>
              <Select
                  placeholder="Detail..."
                  onChange={handleChange}
                  options={Courbatures}
                  styles={customStyles}
                  value={{value: detail.input, label: detail.input }}
              />
              </div>

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











