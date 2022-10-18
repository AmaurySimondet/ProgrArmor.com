import {React, useState, useEffect} from "react";
import API from "../../utils/API";
import axios from 'axios';
import DateInput from "./DateInput";
import NameInput from "./NameInput";
import PoidsInput from "./PoidsInput";
import DetailInput from "./DetailInput";
import EchauffementInput from "./EchauffementInput";
import FullExerciceExpertInput from "./FullExerciceExpertInput"

function ExpertForm() {
  const [seance, setSeance] = useState({date: "", poids: "", exercices: {}, nom: ""});
  const [exercices, setExercices] = useState([]);
  const [details, setDetails] = useState([]);
  const [echauffements, setEchauffements] = useState([]);
  const [clickEchauffement, setClickEchauffement] = useState(false);
  const [clickExercices, setClickExercices] = useState(false);
  const [clickDetails, setClickDetails] = useState(false);

  function handleClickEchauffement(){
    setClickEchauffement(true);
  }

  function handleClickExercices(){
    setClickExercices(true);
  }

  function handleClickDetails(){
    setClickDetails(true);
  }

  async function handleClick() {
        event.preventDefault();
        let emptySerie = false
        let err = false;

        console.log(seance);

        //CONDITIONS
        if (!seance.nom.ancienNom || seance.nom.ancienNom === "title" && err === false){
            err = true;
            alert ("Donne un nom à ta séance pour t'en resservir plus tard !")
        }

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

            if(exercice.exercice.name==="Elevation" || exercice.exercice.name==="Curl" || exercice.exercice.name==="Extension" || exercice.exercice.name==="Abduction" || exercice.exercice.name==="Adduction" || exercice.exercice.name==="Press" && (exercice.exercice.muscle === "title" || exercice.exercice.muscle === "") && err === false){
                err = true;
                console.log((exercice.exercice.muscle === "title" || exercice.exercice.muscle === ""))
                alert("Tu ne m'as pas dis quelle muscle pour ton "+exercice.exercice.name+" !")
            }

            if(exercice.exercice.name==="title" && err === false){
                err = true;
                alert("Un titre n'est pas un exercice voyons !")
            }

            if(exercice.exercice.name==="" && err === false){
                err = true;
                alert("Tu m'as pas donné le nom de ton exo petit cachottier !")
            }
        });

//        //API
//        try {
//          const { data } = await API.expertform(seance);
//          if (data.success === true){
//            window.location = "/dashboard";
//          }else{
//            alert(data.message);
//          }
//        } catch (error) {
//          alert(error);
//        }
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

    useEffect(() => {setSeance(oldSeance => {
        return ({
            ...oldSeance,
            details: details,
        });
    });}, [details])

    useEffect(() => {setSeance(oldSeance => {
        return ({
            ...oldSeance,
            echauffements: echauffements,
        });
    });}, [echauffements])

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

    function changeDetail(detail, num){
        const otherThanSelected =  details.filter((detail, index) => {
            return index!==(num)
        });

        setDetails([...otherThanSelected, detail]);
    }

    function onAddDetail(detail){
        event.preventDefault();

        setDetails([...details, detail])
    }

    function onDeleteDetail(num){
        event.preventDefault();

        setDetails(oldDetails => {
            return(
                oldDetails.filter((detail, index) => {
                    return index!==(num)
                })
            )
        })
    }

    function changeEchauffements(echauffement, num){
        const otherThanSelected =  echauffements.filter((echauffement, index) => {
            return index!==(num)
        });

        setEchauffements([...otherThanSelected, echauffement]);
    }

    function onAddEchauffements(echauffement){
        event.preventDefault();

        setEchauffements([...echauffements, echauffement])
    }

    function onDeleteEchauffements(num){
        event.preventDefault();

        setEchauffements(oldEchauffements => {
            return(
                oldEchauffements.filter((echauffement, index) => {
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

          {clickEchauffement ?
              <div>
                  <p onClick={handleClickEchauffement} className="expert-title"> Echauffement <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  {echauffements ?
                  echauffements.map((echauffement,index) => {
                    return(
                        <EchauffementInput
                            key={index}
                            num={index}
                            poids={seance.poids}
                            onAddEchauffements={onAddEchauffements}
                            changeEchauffements={changeEchauffements}
                            onDeleteEchauffements={onDeleteEchauffements}
                    />);
                  })
                  : null
                  }

                  <hr className="hr-serie"/>
                  <button className="btn btn-dark form-button" onClick={onAddEchauffements} type="submit">Ajouter un échauffement à cette séance !</button>
                  <br/>
              </div>
          :
              <div>
                  <p onClick={handleClickEchauffement} className="expert-title"> Echauffement <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  <hr className="hr-serie"/>
              </div>
          }

          {clickExercices ?
              <div>
                  <p onClick={handleClickExercices} className="expert-title"> Exercices <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
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
                  : null }

                  <hr className="hr-serie"/>
                  <button className="btn btn-dark form-button" onClick={onAddExercices} type="submit">Ajouter un exercice à cette séance !</button>
                  <br/>
              </div>
          :
              <div>
                  <p onClick={handleClickExercices} className="expert-title"> Exercices <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  <hr className="hr-serie"/>
              </div>
          }

          {clickDetails ?
              <div>
                  <p onClick={handleClickDetails} className="expert-title"> Details <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  {details ? details.map((detail,index) => {
                    return(
                    <div>
                      <hr className="hr-detail"/>

                      <DetailInput
                        key={index}
                        num={index}
                        onAddDetail={onAddDetail}
                        changeDetail={changeDetail}
                        onDeleteDetail={onDeleteDetail}
                      />

                    </div>
                    );
                  })
                  : null}

                  <div className="detail-div">
                    <hr className="hr-serie"/>
                    <button className="btn btn-dark form-button" onClick={onAddDetail} type="submit">Ajouter un détail à cette séance !</button>
                  </div>
                  <br/>
              </div>
          :
              <div>
                  <p onClick={handleClickDetails} className="expert-title"> Details <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  <hr className="hr-serie"/>
              </div>
          }

          <div className="form-button-div">
            <button className="btn btn-lg btn-dark enregistrer-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
          </div>
        </form>
    )
};

export default ExpertForm;