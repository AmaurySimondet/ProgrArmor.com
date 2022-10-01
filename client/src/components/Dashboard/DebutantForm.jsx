import {React, useState} from "react";
import API from "../../utils/API";
import axios from 'axios';
import DateInput from "./DateInput";
import PoidsInput from "./PoidsInput";
import FullExerciceInput from "./FullExerciceInput"

const ReactComment = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }}/>
}

function DebutantForm() {
  const [state, setState] = useState({
//    date: "",
    poids: "",
    exercice: "",
    charge: "",
    percent: "",
    typeSerie: "reps",
    repsTime: "",
  });

  const [seance, setSeance] = useState({date: "", poids: ""});

  async function handleClick() {
//    event.preventDefault();
//
//    const {poids, exercice, typeSerie, repsTime, charge, percent } = state;
//    if (!date || date.length === 0) {
//      return alert("No date given !");
//    }
//    try {
//      const { data } = await API.login(email, password);
//      if (data.success === true){
//        localStorage.setItem("token", data.token);
//        window.location = "/dashboard";
//      }else{
//        alert(data.message);
//      }
//    } catch (error) {
//      alert(error);
//    }
  };



  function handleChange(event){
    event.preventDefault();

    setState(oldState => {
        return ({
            ...oldState,
            [event.target.id]: event.target.value,
        });
    });
  };

    function changeDate(date){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
            ...oldSeance,
            date: date,
        });
    })}

    function changePoids(poids){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
            ...oldSeance,
            poids: poids,
        });
    })}

    function changeFullExercice(fullExercice, fullSeries){
        event.preventDefault();

        const series = {...fullSeries}
        const exercice = {...fullExercice, series}

        setSeance(oldSeance => {
            return ({
            ...oldSeance,
            exercices: {exercice},
            });
        })
    }

//    function changeSeries(series, exerciceOf){
//        event.preventDefault();
//        const indexOf = null;
//
//        const exericesArray = Object.values(seance.exercices)
//        exericesArray.forEach((exercice, index) => {
//            if(exercice.name === exerciceOf.name && exercice.name !== "own-exercice"){
//                indexOf = index;
//            }
//            if(exercice.name === exerciceOf.name && exercice.ownExercice === exerciceOf.ownExercice){
//                indexOf = index;
//            }
//        })
//
//        setSeance(oldSeance => {
//            return ({
//            ...oldSeance,
//            [seance.exercices.indexOf.series]: series,
//            });
//        })
//    }

    function handleClickExercice(){
        return null;
    }


    return(
        <form className="debutant-form">

          <DateInput changeDate={changeDate}/>

          <PoidsInput changePoids={changePoids}/>

          <FullExerciceInput changeFullExercice={changeFullExercice} poids={seance.poids}/>

          <button className="btn btn-dark form-button" onClick={handleClickExercice} type="submit">Ajouter un exercice à cette séance !</button>
          <br/>

          <div className="form-button-div">
            <button className="btn btn-lg btn-dark form-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
          </div>
        </form>
    )
};

export default DebutantForm;