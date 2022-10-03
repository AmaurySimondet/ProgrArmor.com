import {React, useState, useEffect} from "react";

function SerieInput(props) {
  const [serie, setSerie] = useState({
    num: props.num,
    typeSerie: "reps",
    repsTime: "",
    charge: "",
    percent: ""});

  const [clicked, setClicked] = useState("hide");

  function handleClickQuestion(){
    if(clicked==="hide"){
        setClicked("nothide");
    } else { setClicked("hide")};
  }

  function handleChange(){
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
    props.changeSerie(serie, props.num, props.exercice)
  }, [serie])

  function handleClickPoubelle(){
         props.onDeleteSerie(props.num);

         event.preventDefault();
  }

  function Color(){
  function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

    /* Convert an RGB triplet to a hex string */
    function convertToHex (rgb) {
      return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
    }

    /* Remove '#' in color hex string */
    function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

    /* Convert a hex string to an RGB triplet */
    function convertToRGB (hex) {
      var color = [];
      color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
      color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
      color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
      return color;
    }

    function generateColor(colorStart,colorEnd,colorCount){

        // The beginning of your gradient
        var start = convertToRGB (colorStart);

        // The end of your gradient
        var end   = convertToRGB (colorEnd);

        // The number of colors to compute
        var len = colorCount;

        //Alpha blending amount
        var alpha = 0.0;

        var saida = [];

        for (let i = 0; i < len; i++) {
            var c = [];
            alpha += (1.0/len);

            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];

            saida.push(convertToHex (c));

        }

        return saida;

    }
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
            <div className="col-sm-1">
              <input type="text"
                  className="form-control"
                  id="repsTime"
                  value={serie.repsTime}
                  onChange={handleChange}
              />
            </div>
            <label className="col-sm-2 col-form-label">Charge totale (kg)</label>
            <div className="col-sm-1">
              <input type="text"
                  className="form-control"
                  id="charge"
                  value={serie.charge}
                  onChange={handleChange}
              />
            </div>
            <div className="col-sm-2">
              <input type="percent"
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
  </div>
  );
};

export default SerieInput;











