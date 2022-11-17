import {React, useState, useEffect} from "react";
import API from "../../utils/API";
import PoidsInput from "./PoidsInput";
import Select from "react-select"
import customStyles from "./customStyles";
import customStylesDark from "./customStylesDark";
import DetailInput from "./DetailInput";
import EchauffementInput from "./EchauffementInput";
import FullExerciceExpertInput from "./FullExerciceExpertInput"

function createId(date){
    return date.toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
}

function containsObj(arr, obj){
    let contains = arr.some(elem =>{
        return JSON.stringify(obj) === JSON.stringify(elem);
    });
    return contains
}

function ExpertForm(props) {
  const [seance, setSeance] = useState({id: createId(Date.now), date: "", poids: "", exercices: [], nom: {}, echauffements: [], details: []});
  const [clickEchauffement, setClickEchauffement] = useState(false);
  const [paramsSelect, setParamsSelect] = useState();
  const [clickExercices, setClickExercices] = useState(false);
  const [clickDetails, setClickDetails] = useState(false);
  const [params, setParams] = useState({load: ""});
  const [data, setData] = useState({id: createId(Date.now), date: "", poids: "", exercices: [], nom: {}, echauffements: [], details: []});
  const [listeNoms, setListeNoms] = useState([])

  function handleClickEchauffement(){
    setClickEchauffement(!clickEchauffement);
  }

  function handleClickExercices(){
    setClickExercices(!clickExercices);
  }

  function handleClickDetails(){
    setClickDetails(!clickDetails);
  }

  async function handleClick() {
        event.preventDefault();

        console.log(seance);

        let err = false;

        //CONDITIONS
        if (!seance.nom.ancienNom || seance.nom.ancienNom === "title"){
            err = true;
            alert ("Donne un nom à ta séance pour t'en resservir plus tard !")

        }

        if (seance.date === ''){
            err = true;
            alert ("Et c'était quand ça ? tu m'as pas dis la date !")

        }

        if (seance.poids === ''){
            err = true;
            alert ("Tu pèses combien ? Pas de tricherie avec moi tu m'as pas donné ton poids !")

        }

        if (seance.exercices.length === 0){
            err = true;
            alert ("Ah bah super ta séance, y a aucun exo !")

        }

        seance.exercices.forEach((exercice,index) => {
            if (Object.keys(exercice.Series).length === 0){
                err = true;
                alert("Faut avouer qu'un exercice sans série c'est pas commode (exercice "+(index+1)+" "+exercice.exercice.name+") !")
            }

            //serie manquant
            Object.values(exercice.Series).forEach(serie => {
                if (serie.repsTime==='' || serie.charge==='' || !serie.repsTime || !serie.charge && err === false){
                    err = true;
                    alert("Une serie n'est pas remplie (exercice "+(index+1)+" "+exercice.exercice.name+") !")
                }
            })

            //muscle manquant
            if(exercice.exercice.name==="Elevation" || exercice.exercice.name==="Curl" || exercice.exercice.name==="Extension" || exercice.exercice.name==="Abduction" || exercice.exercice.name==="Adduction" || exercice.exercice.name==="Press"){
                if (!exercice.exercice.muscle || exercice.exercice.muscle === "" || exercice.exercice.muscle === "title"){
                    err = true;
                    alert("Tu ne m'as pas dis quelle muscle pour ton exercice "+(index+1)+" "+exercice.exercice.name+" !")
                }
            }

            //name exercice titre
            if(exercice.exercice.name==="title"){
                err = true;
                alert("Un titre n'est pas un exercice voyons (exercice "+(index+1)+" "+exercice.exercice.name+") !")
            }

            //name exo manquant
            if(!exercice.exercice.name || exercice.exercice.name===""){
                err = true;
                alert("Tu m'as pas donné le nom de ton exo petit cachottier (exercice "+(index+1)+" "+exercice.exercice.name+") !")
            }

            //catégorie manquant
            Object.values(exercice.Categories).forEach(categorie => {
                if (!categorie.name || categorie.name==='' || categorie.input==='' || !categorie.input || categorie.input==="title"){
                    err = true;
                    alert("Une catégorie n'est pas remplie (exercice "+(index+1)+" "+exercice.exercice.name+") !")
                }
                if (categorie.name==='Elastique'){
                    if (categorie.utilisation==='' || !categorie.utilisation || categorie.utilisation==="title"){
                        err = true;
                        alert("Et l'elastique il sert à quoi ? (exercice "+(index+1)+" "+exercice.exercice.name+") !")
                    }
                    if (categorie.estimation==='' || !categorie.estimation || Number.isNaN(parseFloat(categorie.estimation))){
                        err = true;
                        alert("Erreur de mesure élastique (exercice "+(index+1)+" "+exercice.exercice.name+") !")
                    }
                }
            })
        });

        seance.echauffements.forEach((echauffement,index) => {
            if (Object.keys(echauffement.Series).length === 0){
                err = true;
                alert("Faut avouer qu'un echauffement sans série c'est pas commode (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
            }

            //serie manquant
            Object.values(echauffement.Series).forEach(serie => {
                if (serie.repsTime==='' || serie.charge==='' || !serie.repsTime || !serie.charge && err === false){
                    err = true;
                    alert("Une serie n'est pas remplie (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
                }
            })

            //muscle echauffement
            if(echauffement.echauffement.name==="Elevation" || echauffement.echauffement.name==="Curl" || echauffement.echauffement.name==="Extension" || echauffement.echauffement.name==="Abduction" || echauffement.echauffement.name==="Adduction" || echauffement.echauffement.name==="Press"){
                if (!echauffement.echauffement.muscle || echauffement.echauffement.muscle === "" || echauffement.echauffement.muscle === "title"){
                    err = true;
                    alert("Tu ne m'as pas dis quelle muscle pour ton echauffement "+(index+1)+" "+echauffement.echauffement.name+" !")
                }
            }

            //name echauffement titre
            if(echauffement.echauffement.name==="title"){
                err = true;
                alert("Un titre n'est pas un echauffement voyons (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
            }

            //name echauffement manquant
            if(!echauffement.echauffement.name || echauffement.echauffement.name===""){
                err = true;
                alert("Tu t'echauffes en faisant rien ? (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
            }

            //catégorie manquant
            Object.values(echauffement.Categories).forEach(categorie => {
                if (!categorie.name || categorie.name==='' || categorie.input==='' || !categorie.input || categorie.input==="title"){
                    err = true;
                    alert("Une catégorie n'est pas remplie (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
                }
                if (categorie.name==='Elastique'){
                    if (categorie.utilisation==='' || !categorie.utilisation || categorie.utilisation==="title"){
                        err = true;
                        alert("Et l'elastique il sert à quoi ? (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
                    }
                    if (categorie.estimation==='' || !categorie.estimation || Number.isNaN(parseFloat(categorie.estimation))){
                        err = true;
                        alert("Erreur de mesure élastique (echauffement "+(index+1)+" "+echauffement.echauffement.name+") !")
                    }
                }
            })
        });

        seance.details.forEach((detail, index) =>{
            if (!detail.name || detail.name==='' || detail.input==='' || !detail.input || detail.input==="title"){
                err = true;
                alert("Ce n'est peut être qu'un détail, mais il est vide !");
            }
        });

        //API
        if(err===false){
            // try {
            // const { data } = await API.debutantform({seance: seance, id: localStorage.getItem("id")});
            // if (data.success === true){
            //     window.location = "/dashboard";
            // }else{
            //     alert(data.message);
            // }
            // } catch (error) {
            // alert(error);
            // }
        }
    }

    function handleChangeDate(event){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
            ...oldSeance,
            date: event.target.value,
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
                exercices: [...oldSeance.exercices, {exercice: {name: ""}, Series: {}, Categories: {}}]
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

    function changeDetail(detail, num){
        const otherThanSelected =  seance.details.filter((detail, index) => {
            return index!==(num)
        });

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                details: [...otherThanSelected, detail]
            })
        })
    }

    function onAddDetail(event){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                details: [...oldSeance.details, []]
            })
        })
    }

    function onDeleteDetail(num){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                details: oldSeance.details.filter((detail, index) => {
                    // console.log(index, num)
                    return index!==(num)
                })
            })
        })
    }

    function changeEchauffements(detail, num){
        const otherThanSelected =  seance.echauffements.filter((detail, index) => {
            return index!==(num)
        });

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                echauffements: [...otherThanSelected, detail]
            })
        })
    }

    function onAddEchauffements(event){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                echauffements: [...oldSeance.echauffements, {echauffement: {name: ""}, Series: {}, Categories: {}}]
            })
        })
    }

    function onDeleteEchauffements(num){
        event.preventDefault();

        setSeance(oldSeance => {
            return ({
                ...oldSeance,
                echauffements: oldSeance.echauffements.filter((detail, index) => {
                    // console.log(index, num)
                    return index!==(num)
                })
            })
        })
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
                if (!data.seance.nom){
                    alert("Vous ne pouvez pas charger une séance débutant en mode expert !")
                }
                else{
                    setSeance({id: createId(Date.now), date: "", poids: "", exercices: [], nom: {}, echauffements: [], details: []});
                    setData(data.seance)
                    setClickExercices(true)
                    if (data.seance.echauffements.length>0){
                        setClickEchauffement(true)
                    }
                    if (data.seance.details.length > 0){
                        setClickDetails(true)
                    }
                }
            }
            else{
                setSeance({id: createId(Date.now), date: "", poids: "", exercices: [], nom: {}, echauffements: [], details: []});
                setClickDetails(false)
                setClickEchauffement(false)
            }
        }
    }

    function handleChange(event){
        setParams(oldParams => {
            return ({
                ...oldParams,
                [event.id]: event.value,
                })
            });
      }

    async function getNames(){
        const {data} = await API.workouts({nom: "", periode: "max", tri: "Ordre chronologique décroissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
        if (data.success === false){
            alert(data.message);
        } else {
            let arr = [{label: "/ (défaut)", value:"title"}]

            let arr2 = [
                {className:"select-title", id: "load", label: "/ (défaut)", value:"title"},
                {id: "load", label: "Dernière séance en date", value:"lastDate"},
                {id: "load", label: "Dernière séance enregistrée", value:"lastRec"},
                {id: "load", label: "", value:"title"},
                {className:"select-title", id: "load", label: "Par nom de séance", value:"title"}
            ]

            data.seances.forEach((seance, index) => {
                if (seance.nom){
                    if (seance.nom.ancienNom !== "nouveau-nom"){
                        if (!arr.includes(seance.nom.ancienNom)){
                            let obj = {label: seance.nom.ancienNom, value: seance.nom.ancienNom}
                            if (!containsObj(arr,obj)){
                                arr.push(obj)
                            }
                            let obj1 = {id: "load", label: `Dernière séance "${seance.nom.ancienNom}" enregistrée`, value:`lastRec-${seance.nom.ancienNom}`}
                            let obj2 = {id: "load", label: `Dernière séance "${seance.nom.ancienNom}" en date`, value:`lastDate-${seance.nom.ancienNom}`}
                            if(!containsObj(arr2,obj1)){
                                arr2.push(obj1)
                            }
                            if(!containsObj(arr2,obj2)){
                                arr2.push(obj2)
                            }
                        }
                    }
                    else{
                        if (!arr.includes(seance.nom.nouveauNom)){
                            let obj = {label: seance.nom.nouveauNom, value: seance.nom.nouveauNom}
                            if (!containsObj(arr,obj)){
                                arr.push(obj)
                            }
                            let obj1 = {id: "load", label: `Dernière séance "${seance.nom.nouveauNom}" enregistrée`, value:`lastRec-${seance.nom.nouveauNom}`}
                            let obj2 = {id: "load", label: `Dernière séance "${seance.nom.nouveauNom}" en date`, value:`lastDate-${seance.nom.nouveauNom}`}
                            if(!containsObj(arr2,obj1)){
                                arr2.push(obj1)
                            }
                            if(!containsObj(arr2,obj2)){
                                arr2.push(obj2)
                            }
                        }
                    }
                }
            })
            arr.push({value:"nouveau-nom", label: "Entrer un nouveau nom de séance..."})
            setListeNoms(arr);
            setParamsSelect(arr2)
        }
    }

    function handleChangeName(event){
        console.log(event.value)
        if(event.target){
            setSeance(oldSeance => {
                return ({
                    ...oldSeance,
                    nom: {...seance.nom, nouveauNom: event.target.value}
                })
            });
        }
        else{
            setSeance(oldSeance => {
                return ({
                    ...oldSeance,
                    nom: {...seance.nom, ancienNom: event.value},
                })
            });
        }
      }

    useEffect(() => {
        getNames();
    }, [] );

    useEffect(()=>{
        setSeance(data);
    }, [data])


    return(
        <form className="debutant-form">

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Séance précédente</label>
                <div className="col-sm-7">
                    <Select
                        placeholder="Séance précédente à charger..."
                        onChange={handleChange}
                        options={paramsSelect}
                        styles={props.modeSombre===true ? customStylesDark : customStyles}
                    />
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-dark" onClick={loadSeance} type="submit">Charger la séance</button>
                </div>
            </div>

            <div className="NameInput">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                    Nom de la séance
                    </label>
                    <div className="col-sm-10">
                    <Select
                        placeholder="Nom..."
                        onChange={handleChangeName}
                        options={listeNoms}
                        styles={props.modeSombre===true ? customStylesDark : customStyles}
                        value={{value: seance.nom.ancienNom, label: seance.nom.ancienNom}}
                    />
                    </div>
                </div>

                {seance.nom.ancienNom === "nouveau-nom" ?
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nom de la séance</label>
                        <div className="col-sm-5">
                        <input type="text"
                            className={props.modeSombre ? "form-control inputDark" : "form-control"}
                            onChange={handleChangeName}
                            placeholder="Annihilation des biceps"
                            id="nouveauNom"
                            value={seance.nom.nouveauNom}
                        />
                        </div>
                    </div>
                : null }
            </div>

          <div className="DateInput form-group row">
            <label className="col-sm-2 col-form-label">Date</label>
            <div className="col-sm-10">
              <input type="date"
                  className={props.modeSombre ? "form-control inputDark" : "form-control"}
                  value={seance.date}
                  onChange={handleChangeDate}
                  id="date"
              />
            </div>
          </div>

          <PoidsInput modeSombre={props.modeSombre} key={seance.id} poids={seance.poids} changePoids={changePoids}/>


          {clickEchauffement ?
              <div>
                  <p onClick={handleClickEchauffement} className="expert-title"> 
                    Echauffement <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> 
                  </p>
                  {seance.echauffements ?
                    seance.echauffements.map((echauffement,index) => {
                        return(
                            <EchauffementInput
                                key={index}
                                num={index}
                                modeSombre={props.modeSombre}
                                poids={seance.poids}
                                echauffement={echauffement}
                                click={echauffement.Categories ? echauffement.Categories[0] ? true : false : false}
                                onAddEchauffements={onAddEchauffements}
                                changeEchauffements={changeEchauffements}
                                onDeleteEchauffements={onDeleteEchauffements}
                        />);
                    })
                  : null
                  }

                  <hr className={props.modeSombre ? "hr-serie-dark" : "hr-serie"}/>
                  <button className="btn btn-dark form-button" onClick={onAddEchauffements} type="submit">Ajouter un échauffement à cette séance !</button>
                  <br/>
              </div>
          :
              <div>
                  <p onClick={handleClickEchauffement} className="expert-title"> Echauffement <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  <hr className={props.modeSombre ? "hr-serie-dark" : "hr-serie"}/>
              </div>
          }

          {clickExercices ?
              <div>
                  <p onClick={handleClickExercices} className="expert-title"> Exercices <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  {seance.exercices ? seance.exercices.map((exercice,index) => {
                    return(
                        <FullExerciceExpertInput
                            key={index}
                            num={index}
                            modeSombre={props.modeSombre}
                            exercice={exercice}
                            poids={seance.poids}
                            click={exercice.Categories ? exercice.Categories[0] ? true : false : false}
                            onAddExercices={onAddExercices}
                            changeExercices={changeExercices}
                            onDeleteExercices={onDeleteExercices}
                    />);
                  })
                  : null }

                  <hr className={props.modeSombre ? "hr-serie-dark" : "hr-serie"}/>
                  <button className="btn btn-dark form-button" onClick={onAddExercices} type="submit">Ajouter un exercice à cette séance !</button>
                  <br/>
              </div>
          :
              <div>
                  <p onClick={handleClickExercices} className="expert-title"> Exercices <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  <hr className={props.modeSombre ? "hr-serie-dark" : "hr-serie"}/>
              </div>
          }

          {clickDetails ?
              <div>
                  <p onClick={handleClickDetails} className="expert-title"> Details <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  {seance.details ? seance.details.map((detail,index) => {
                    return(
                    <div>
                      <hr className="hr-detail"/>

                      <DetailInput
                        key={index}
                        num={index}
                        modeSombre={props.modeSombre}
                        detail={detail}
                        onAddDetail={onAddDetail}
                        changeDetail={changeDetail}
                        onDeleteDetail={onDeleteDetail}
                      />

                    </div>
                    );
                  })
                  : null}

                  <div className="detail-div">
                    <hr className={props.modeSombre ? "hr-serie-dark" : "hr-serie"}/>
                    <button className="btn btn-dark form-button" onClick={onAddDetail} type="submit">Ajouter un détail à cette séance !</button>
                  </div>
                  <br/>
              </div>
          :
              <div>
                  <p onClick={handleClickDetails} className="expert-title"> Details <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} /> </p>
                  <hr className={props.modeSombre ? "hr-serie-dark" : "hr-serie"}/>
              </div>
          }

          <div className="form-button-div">
            <button className="btn btn-lg btn-dark enregistrer-button" onClick={handleClick} type="submit">Enregistrer la séance !</button>
          </div>
        </form>
    )
};

export default ExpertForm;