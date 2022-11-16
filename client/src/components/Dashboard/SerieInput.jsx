import {React, useState, useEffect} from "react";

function SerieInput(props) {
  const [serie, setSerie] = useState({
    num: props.num,
    typeSerie: props.typeSerie,
    repsTime: props.repsTime,
    charge: props.charge,
    percent: props.percent});
  const [text, setText] = useState();

  const [clicked, setClicked] = useState("hide");

  function handleClickQuestion(){
    if(clicked==="hide"){
        setClicked("nothide");
    } else { setClicked("hide")};
  }

  function handleChange(event){
    if (event.target.id !== "charge") {
        setSerie(oldSerie => {
                return ({
                ...oldSerie,
                [event.target.id]: event.target.value,
            });
        });
    }
    else {
        setSerie(oldSerie => {
                return ({
                ...oldSerie,
                charge: event.target.value,
                percent: ""+(event.target.value/props.poids * 100).toFixed(2)+"%",
            });
        });
    }
  }

  useEffect(() => {
    props.changeSerie(serie, props.num)

    if(serie.typeSerie==="reps" && serie.repsTime >= 25){
      setText("Ton nombre de reps semble élevé, t'aurais pas inversé charge et reps par hasard ?")
    }
    if(!serie.typeSerie){
      setSerie(oldSerie => {
        return ({
          ...oldSerie,
          typeSerie: "reps"
        });
      });
    }
    else{
      setText();
    }
  }, [serie])

  function handleClickPoubelle(){
         props.onDeleteSerie(props.num);

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
                Série {props.num+1} <p className="nom-exercice-serie"> ({props.exercice.name}) </p>
                <img className="myDIV" onClick={handleClickQuestion} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                <div className={clicked}>
                    <div className="hidden-text">
                        <strong> {"C'est quoi cette donnée grisée à côté de la charge ?"} </strong> <br/>
                        <br/>
                        La donnée grisée représente la charge relative à ton poids, soit le calcul charge/poids. <br/>
                        Ainsi, si tu pèses 100kg et que tu réalises une série de squat à 200kg, la charge relative représente 200% de ton poids <br/>
                        Si tu fais 50kg par contre, {"tu réalises cette série a 400% de ton poids, ça rapproche déjà des records du monde !"} <br/>
                        La force relative, donnée par la charge relative, est une donnée essentielle pour juger ses performances et les comparer avec celles des autres <br/>
                        <br/>
                        <strong> {"A quoi sert la poubelle ?"} </strong> <br/>
                        <br/>
                        A jeter tes déchets evidemment, mais ici elle sert à supprimer la série ou {"l'exercice correspondant"}, alors fais attention ! <br/>
                        <br/>
                        <i> {"Cliques à nouveau sur l'icone"} <img className="myDIV" src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" /> {"pour faire disparaître ce bandeau d'information"} </i>
                    </div>
                </div>
            </label>
            <div className="col-sm-2">
                <select onChange={handleChange} className="custom-select" id="typeSerie">
                    <option value="reps"> Répétitions (défaut) </option>
                    <option value="time"> Temps (secondes) </option>
                </select>
            </div>
            <div className="col-sm-2">
              <input type="number"
                  className="form-control"
                  id="repsTime"
                  value={serie.repsTime}
                  onChange={handleChange}
              />
            </div>
            <label className="col-sm-1 col-form-label">Charge totale (kg)</label>
            <div className="col-sm-2">
              <input type="number"
                  className="form-control"
                  id="charge"
                  value={serie.charge}
                  onChange={handleChange}
              />
            </div>
            <div className="col-sm-2">
              <input type="text"
                  className="form-control"
                  id="percent"
                  value={serie.percent}
                  readOnly
              />
            </div>
            <div className="col-sm-1">
              <img className="poubelle" onClick={handleClickPoubelle} src={require('../../images/icons/icons8-trash-30.png')} alt="Poubelle" />
            </div>
      </div>
      <p> {text} </p>
  </div>
  );
};

export default SerieInput;











