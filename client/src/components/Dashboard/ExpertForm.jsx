import {React, useState, useEffect} from "react";
import API from "../../utils/API";
import axios from 'axios';
import DateInput from "./DateInput";
import NameInput from "./NameInput";
import PoidsInput from "./PoidsInput";
import FullExerciceExpertInput from "./FullExerciceExpertInput"

function ExpertForm() {
  const [seance, setSeance] = useState({date: "", poids: "", exercices: {}});
  const [exercices, setExercices] = useState([]);

  async function handleClick() {
        event.preventDefault();
        let emptySerie = false
        let err = false;

        console.log(seance);

        //CONDITIONS
        if (seance.date === '' && err === false){
            err = true;
            alert ("Et c'était quand ça ? tu m'as pas dis la date !")
        }

        if (seance.poids === '' && err === false){
            err = true;
            alert ("Tu pèses combien ? Pas de tricherie avec moi tu m'as pas donné ton poids !")
        }

        if (exercices.length === 0 && err === false){
            err = true;
            alert ("Ah bah super ta séance, y a aucun exo !")
        }

        exercices.forEach(exercice => {
            if (Object.keys(exercice.Series).length === 0 && err === false){
                err = true;
                alert("Faut avouer qu'un exercice sans série c'est pas commode !")
            }

            Object.values(exercice.Series).forEach(serie => {
                if (serie.repsTime==='' || serie.charge==='' && err === false){
                    err = true;
                    alert("Une serie n'est pas remplie !")
                }
            })

            if(exercice.exercice.name==="title" && err === false){
                err = true;
                alert("Une catégorie n'est pas un exercice voyons !")
            }

            if(exercice.exercice.name==="" && err === false){
                err = true;
                alert("Tu m'as pas donné le nom de ton exo petit cachottier !")
            }
        });

        //API
        try {
          const { data } = await API.expertform(seance);
          if (data.success === true){
            window.location = "/dashboard";
          }else{
            alert(data.message);
          }
        } catch (error) {
          alert(error);
        }
    }

    function changeName(name){
        setSeance(oldSeance => {
            return ({
            ...oldSeance,
            nom: name,
        });
    })}

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
        const otherThanSelected =  exercices.filter((exercice, index) => {
            return index!==(num)
        })

        setExercices([...otherThanSelected, exercice])
    }

    useEffect(() => {setSeance(oldSeance => {
            return ({
            ...oldSeance,
            exercices: exercices,
            });
        });}, [exercices])

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

          <NameInput changeName={changeName}/>

          <DateInput changeDate={changeDate}/>

          <PoidsInput changePoids={changePoids}/>

          {exercices ? exercices.map((exercice,index) => {
            return(
                <FullExerciceExpertInput
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
            <button className="btn btn-lg btn-dark enregistrer-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
          </div>
        </form>
    )
};

export default ExpertForm;