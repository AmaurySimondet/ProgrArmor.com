import {React, useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"

import API from "../../utils/API";

function Dashboard() {
    const [seances, setSeances] = useState([]);
    const [params, setParams] = useState({tri: "Ordre chronologique décroissant", periode: "30j", repsFrom: "", repsTo: ""});

  async function disconnect() {
    await API.logout();
    localStorage.removeItem('token');
    window.location = "/";
  };

  async function getWorkouts(){
    event.preventDefault();

    const {data} = await API.workouts(params);
    if (data.success === false){
        alert(data.message);
    } else {
//        Obect.values(data.seances[0].exercices[0].Series)j.map(serie => console.log(serie));
//        console.log(data.seances);
//        console.log(Object.values(data.seances[0].exercices[0].Series));
        setSeances(data.seances);
    }
  }

  function handleChange(event){
    event.preventDefault();

    setParams(oldParams => {
        return ({
            ...oldParams,
            [event.target.id]: event.target.value,
        })
    });
  }

//  useEffect(()=>{
//    console.log(params);
//    let string = "";
//    let keyArray = [];
//    Object.keys(params).forEach(key => {keyArray.push(key)});
//    Object.values(params).forEach((param,index) => {
//        string = string + keyArray[index] + "=" + param
//        if (index !== (Object.values(params).length-1)){
//            string = string + "&"
//        };
//    })
//    console.log(string);
//  },[params]);

    function trStyle(index){
            let font;

            if (index%2===0){
                font = "black"
            } else {
                font = "#353535"
            }

            return ({
              backgroundColor: font
            })
      }

    function tdStyle(index){
            let font;

            if (index%2===0){
                font = "#ffbaba"
            } else {
                font = "white"
            }

            return ({
              color: font
            })
      }

  return (
      <div>
          <NavigBar location="dashboard"/>

          <div className="Dashboard">
            <h1 className="Dashboard-h1">Connecté !</h1>
            <Button className="btn btn-dark btn-lg" onClick={disconnect} block="true" type="submit">
              Se déconnecter
            </Button>

            <h1 className="Dashboard-h1">Historique des séances</h1>

            <form className="debutant-form">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Tri
                    </label>
                    <div className="col-sm-4">
                        <select onChange={handleChange} className="custom-select col-sm-10" id="tri">
                            <option value="Ordre chronologique décroissant"> Ordre chronologique décroissant (défaut) </option>
                            <option value="Ordre chronologique croissant"> Ordre chronologique croissant </option>
                        </select>
                    </div>

                    <label className="col-sm-1 col-form-label">
                      Reps / Temps
                    </label>
                    <div className="col-sm-1">
                        <input type="text"
                          className="form-control"
                          value={params.repsFrom}
                          onChange={handleChange}
                          id="repsFrom"
                        />
                    </div>
                    <label className="col-sm-1 col-form-label">
                      à
                    </label>
                    <div className="col-sm-1">
                        <input type="text"
                          className="form-control"
                          value={params.repsTo}
                          onChange={handleChange}
                          id="repsTo"
                        />
                    </div>

                    <div className="form-button-div">
                        <Button className="btn btn-dark btn-lg" onClick={getWorkouts} block="true" type="submit">
                            Actualiser
                        </Button>
                    </div>
                </div>
            </form>



            <table className="table table-hover table-responsive-md table-dark dashboard-table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date (AAAA-MM-JJ) </th>
                  <th scope="col">Poids</th>
                  <th scope="col">Exercice</th>
                  <th scope="col">Série</th>
                  <th scope="col">Type</th>
                  <th scope="col">Reps / Temps</th>
                  <th scope="col">Charge</th>
                  <th scope="col">% PDC</th>
                </tr>
              </thead>
              <tbody>
                  {seances.map((seance,indexSeance) => {
                        return (seance.exercices.map((exercice, indexExercice) => {
                                return (Object.values(exercice.Series).map((serie, index) => {
                                    return (
                                        <tr style={trStyle(indexSeance)}>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {seance.date}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {seance.poids}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {exercice.exercice.name==="own-exercice" ? exercice.exercice.ownExercice : exercice.exercice.name}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {serie.num+1}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {serie.typeSerie==="reps" ? "Répétitions" : null}
                                                {serie.typeSerie==="time" ? "Temps (secondes)" : null}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {serie.repsTime}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {serie.charge}
                                            </td>
                                            <td style={tdStyle(indexExercice)} className="dashboard-td">
                                                {serie.percent}
                                            </td>
                                        </tr>
                                )}))
                        }))})
                  }
              </tbody>
            </table>
          </div>
      </div>
    );
};

export default Dashboard;