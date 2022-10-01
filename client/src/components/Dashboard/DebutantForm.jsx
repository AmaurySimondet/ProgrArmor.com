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
  const [exercices, setExercices] = useState([]);

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

    function changeExercices(exercice, num){
        event.preventDefault();

        const otherThanSelected =  exercices.filter((exercice, index) => {
            return index!==(num)
        })

        setExercices([...otherThanSelected, exercice])
    }

    function onAddExercices(exercice, num){
        event.preventDefault();

        const otherThanSelected =  exercices.filter((exercice, index) => {
            return index!==(num)
        })

        setExercices([...otherThanSelected, exercice])
    }

    function onDeleteExercices(num){
        event.preventDefault();

        setExercices(oldExercices => {
            return(
                oldExercices.filter((exercice, index) => {
                    return index!==(num)
                })
            )
        })
    }

    return(
        <form className="debutant-form">

          <DateInput changeDate={changeDate}/>

          <PoidsInput changePoids={changePoids}/>

          {exercices ? exercices.map((exercice,index) => {
            return(
                <FullExerciceInput
                    key={index}
                    num={index}
                    poids={seance.poids}
                    changeFullExercice={changeFullExercice}
                    onAddExercices={onAddExercices}
                    changeExercices={changeExercices}
                    onDeleteExercices={onDeleteExercices}
            />);
          })
          : null
          }

          <button className="btn btn-dark form-button" onClick={onAddExercices} type="submit">Ajouter un exercice à cette séance !</button>
          <br/>

          <div className="form-button-div">
            <button className="btn btn-lg btn-dark form-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
          </div>
        </form>
    )
};

export default DebutantForm;