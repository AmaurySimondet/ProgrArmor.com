import {React, useState} from "react";
import API from "../../utils/API";
import axios from 'axios';
import DateInput from "./DateInput";
import PoidsInput from "./PoidsInput";
import FullExerciceInput from "./FullExerciceInput"

function DebutantForm() {
  const [seance, setSeance] = useState({date: "", poids: ""});
  const [exercices, setExercices] = useState([]);

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

    function changeExercices(exercice, num){
        event.preventDefault();

        const otherThanSelected =  exercices.filter((exercice, index) => {
            return index!==(num)
        })

        setExercices([...otherThanSelected, exercice])

        setSeance(oldSeance => {
            return ({
            ...oldSeance,
            exerices: exercices,
            });
        });
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

    async function handleClick() {
        event.preventDefault();

        console.log(seance)

        Object.values(seance)[2].forEach(exercice => {
            if(exercice.exercice.name==="title"){
                alert("Une catégorie n'est pas un exercice voyons !")
            }
        });
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