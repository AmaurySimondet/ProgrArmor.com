import {React, useState, useEffect} from "react";
import API from "../../utils/API";
import Select from "react-select";
import DateInput from "./DateInput";
import PoidsInput from "./PoidsInput";
import FullExerciceInput from "./FullExerciceInput"
import customStyles from "./customStyles";

function createId(date){
    return date.toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
}

function DebutantForm() {
  const [seance, setSeance] = useState({date: "", poids: "", exercices: []});
  const [params, setParams] = useState({load: ""});
  const [data, setData] = useState({date: "", poids: "", exercices: []});

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

        if (seance.exercices.length === 0 && err === false){
            err = true;
            alert ("Ah bah super ta séance, y a aucun exo !")
        }

        seance.exercices.forEach(exercice => {
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
          const { data } = await API.debutantform({seance: seance, id: localStorage.getItem("id")});
          if (data.success === true){
            window.location = "/dashboard";
          }else{
            alert(data.message);
          }
        } catch (error) {
          alert(error);
        }
    }

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
        const otherThanSelected =  seance.exercices.filter((exercice, index) => {
            return index!==(num)
        })

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                exercices: [...otherThanSelected, exercice]
            })
        })
    }

    function onAddExercices(event){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                exercices: [...oldSeance.exercices, {exercice: {name: ""}, Series: {}}]
            })
        })
    }

    function onDeleteExercices(num){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                exercices: oldSeance.exercices.filter((exercice, index) => {
                    // console.log(index, num)
                    return index!==(num)
                })
            })
        })
    }

    function handleChange(event){
        setParams(oldParams => {
            return ({
                ...oldParams,
                [event.id]: event.value,
                })
            });
      }

    async function loadSeance(event){
        event.preventDefault();

        const {data} = await API.loadSeance(params);
        if (data.success === false){
            if (data.message === "Aucune séance !"){
               console.log(data.message);
            }
            else { alert(data.message); }
        } else {
            console.log(data.seance)
            if(data.seance){
                setSeance({date: "", poids: "", exercices: []});
                if (data.seance.echauffements || data.seance.details){
                    if (data.seance.echauffements.length>0 || data.seance.details.length > 0){
                        alert("Vous ne pouvez pas charger une séance expert en mode débutant !")
                }}
                else{
                    setData(data.seance)
                }
            }
            else{
                setSeance({date: "", poids: "", exercices: []});
            }
        }
    }

    useEffect(()=>{
        setSeance(data)
    }, [data])


    return(
        <form className="debutant-form">

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Séance précédente</label>
                <div className="col-sm-7">
                    <Select
                        placeholder="Séance précédente à charger..."
                        onChange={handleChange}
                        options={[
                            {id: "load", label: "/ (défaut)", value:"title"},
                            {id: "load", label: "Dernière séance en date", value:"lastDate"},
                            {id: "load", label: "Dernière séance enregistrée", value:"lastRec"}
                    ]}
                        styles={customStyles}
                    />
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-dark" onClick={loadSeance} type="submit">Charger la séance</button>
                </div>
            </div>

            <DateInput key={createId(Date.now())} date={seance.date} changeDate={changeDate}/>

            <PoidsInput key={createId(Date.now())} poids={seance.poids} changePoids={changePoids}/>

            {seance.exercices.map((exercice,index) => {
                    return(
                        <FullExerciceInput
                            key={index}
                            num={index}
                            exercice={exercice}
                            poids={seance.poids}
                            onAddExercices={onAddExercices}
                            changeExercices={changeExercices}
                            onDeleteExercices={onDeleteExercices}
                    />);
            })}

            <button className="btn btn-dark form-button" onClick={onAddExercices} type="submit">Ajouter un exercice à cette séance !</button>
            <br/>

            <div className="form-button-div">
              <button className="btn btn-lg btn-dark enregistrer-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
            </div>
        </form>
    )
};

export default DebutantForm;