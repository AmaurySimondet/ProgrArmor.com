import React, { useState } from "react";
import NavigBar from "../NavigBar";
import {useForm} from "react-hook-form"
import { useEffect } from "react";
import {Cell, Tooltip, PieChart, Pie, ResponsiveContainer} from 'recharts'
import API from "../../utils/API";
import Footer from "../Footer";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {label ? <p className="label">Date : {label}</p> : null}
          {payload.map((payload) => {
              if (payload.dataKey === "exercices[0].Series[0].repsTime"){
                  return (<p className="desc">Reps / Temps : {payload.value/10}</p>)
              }
              if (payload.dataKey === "exercices[0].Series[0].charge"){
                  return (<p className="desc">Charge : {payload.value}</p>)
              }
              if (payload.dataKey === "exercices[0].Series[0].percent"){
                  return (<p className="desc">% PDC : {payload.value}</p>)
              }
              if (payload.dataKey === "poids"){
                  return (<p className="desc">Poids : {payload.value}</p>)
              }
              if (payload.dataKey === "repsTime"){
                  return (<p className="desc"> Valeur classification : {payload.value}</p>)
              }
              if(payload.dataKey === "exercices[0].Categories[0].estimation" || payload.dataKey === "exercices[0].Categories[1].estimation" || payload.dataKey === "exercices[0].Categories[2].estimation" || payload.dataKey === "exercices[0].Categories[3].estimation" || payload.dataKey === "exercices[0].Categories[4].estimation"){
                  return (<p className="desc"> Élastique estimation (kg) : {payload.value}</p>)
              }
          })}
        </div>
      );
    }
  
    return null;
};

let renderLabel = function(entry) {
    if(typeof(entry.name) !== "number"){
        return entry.name;
    }
}

function Admin(){

    const [credSuccess, setCredSuccess] = useState(false);
    const [numUsers, setNumUsers] = useState(0);
    const [numSeanceDay, setNumSeanceDay] = useState(0);
    const [numSeances, setNumSeances] = useState(0);
    const [numActiveUsers, setNumActiveUsers] = useState(0);
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const [seances3, setSeances3] = useState([]);
    const [params3, setParams3] = useState({admin: process.env.REACT_APP_ADMIN, password: process.env.REACT_APP_PASSWORD, top: 5, class: "sets", date: "md", reforme: "pie", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceMuscle: "title",exerciceOwnExercice: ""})
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        function handleResize() {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
        })
        }

        var timeout = false;
        window.addEventListener('resize', function() {
            clearTimeout(timeout);;
            timeout = setTimeout(handleResize, 200);
        });
    })

    useEffect(() => {
        if(data && data!==null){ 
            let dataJSON = JSON.parse(data);
            if(dataJSON.Admin){
                if(dataJSON.Password){
                    if(dataJSON.Admin === ""+process.env.REACT_APP_ADMIN && dataJSON.Password===""+process.env.REACT_APP_PASSWORD){
                        setCredSuccess(true);
                        console.log("oups")
        }}}};
    }, [data]);


    useEffect(() => {
        console.log(seances3)
        setTimeout(getSeance3, 50);
    }, [params3]);

    async function getSeance3(){
        const {data} = await API.workouts(params3);
        if (data.success === false && errIter===0 ){
            if (data.message === "Aucune séance !"){
               console.log(data.message);
            }
            errIter=1;
        } else {
            if(params3.top && params3.top !== "max"){
                setSeances3(data.seances.slice(0,parseInt(params3.top)));
                setNumSeanceDay(data.numSeanceDay);
                setNumUsers(data.numUsers);
                setNumSeances(data.numSeances);
                setNumActiveUsers(data.numActiveUsers);
            }
            else{
                if(data.seances){
                    setSeances3(data.seances);
                    setNumSeanceDay(data.numSeanceDay);
                    setNumUsers(data.numUsers);
                    setNumSeances(data.numSeances);
                    setNumActiveUsers(data.numActiveUsers);
                }
            }
        }
    }

    function handleChange3(event){
        event.preventDefault();
    
        setParams3(oldParams => {
            return ({
                ...oldParams,
                [event.target.id]: event.target.value,
            })
        });
    }
    

    return (
        <div>
            <NavigBar />

            


                {credSuccess===true ?
                <div className="Admin chart-pie">
                    <h1> Admin </h1>                     

                    <h2>Nombre d'utilisateurs</h2>
                    <p>{numUsers}</p>

                    <h2>Nombre d'utilisateurs actifs</h2>
                    <p>{numActiveUsers}</p>

                    <h2>Nombre de séances au total</h2>
                    <p>{numSeances}</p>

                    <h2>Nombre de séances aujourd'hui</h2>
                    <p>{numSeanceDay}</p>
                        
                    <div className="chart-pie">
                        <h2> Les exercices préférés </h2>

                        
                        <div className="form-group row stats-form">
                            <div className="form-group col-sm-4">
                                <label className="col-form-label">
                                Periode
                                </label>
                                <select onChange={handleChange3} className="form-control" id="periode">
                                    <option value="max"> Max (défaut) </option>
                                    <option value="7d"> 7 derniers jours </option>
                                    <option value="30d"> 30 derniers jours </option>
                                    <option value="90d"> 90 derniers jours (3 mois) </option>
                                    <option value="180d"> 180 derniers jours (6 mois) </option>
                                    <option value="1y"> Depuis 1 an </option>
                                </select>
                            </div>

                            <div className="form-group col-sm-4">
                                <label className="col-form-label">
                                Classification
                                </label>
                                <select onChange={handleChange3} className="form-control" id="class">
                                    <option value="sets"> Somme des séries (défaut) </option>
                                    <option value="reps"> Somme des répétitions </option>
                                    <option value="time"> Somme des secondes </option>
                                </select>
                            </div>

                            <div className="form-group col-sm-4">
                                <label className="col-form-label">
                                Affichage
                                </label>
                                <select onChange={handleChange3} className="form-control" id="top">
                                    <option value={5}> Top 5 (défaut) </option>
                                    <option value={10}> Top 10 </option>
                                    <option value={20}> Top 20 </option>
                                    <option value="max"> Tous </option>
                                </select>
                            </div>
                        </div>


                        <ResponsiveContainer className="piechart" width="100%" height=
                        {dimensions.width<330 ?
                        100
                        :
                        dimensions.width<450 ?
                        200
                        :
                        dimensions.width<700 ?
                        300
                        :
                        400
                        }
                        >
                            <PieChart width={800} height={800}>
                            <Pie
                                data={seances3}
                                innerRadius=
                                {dimensions.width<330 ?
                                10
                                :
                                dimensions.width<450 ?
                                20
                                :
                                dimensions.width<700 ?
                                40
                                :
                                100
                                }
                                outerRadius=
                                {dimensions.width<330 ?
                                20
                                :
                                dimensions.width<450 ?
                                40
                                :
                                dimensions.width<700 ?
                                70
                                :
                                150
                                }
                                fill="#9b0000"
                                dataKey="repsTime"
                                label={renderLabel}
                                >
                                {seances3.map((entry, index) => (
                                <Cell fill={index%2 === 0 ? "#9b0000" : "#E84646"} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>



                </div>

                :


                    <form className="form-admin" onSubmit={handleSubmit((data) => {
                        setData(JSON.stringify(data))
                    })}>
                        <input className="form-admin-input" {...register("Admin", { required: true })}/>
                        <input className="form-admin-input" {...register("Password", { required: true })}/>
                        <br/>
                        <input className="form-admin-input" type="submit" />
                    </form>


                }
            

            <Footer/>
        </div>
    )
}

export default Admin;