import {React, useState, useEffect} from "react";
import NavigBar from "../NavigBar.jsx"
import {LineChart, YAxis, XAxis, Tooltip, Label, CartesianGrid, Line, ResponsiveContainer, Bar, ComposedChart} from 'recharts'
import API from "../../utils/API";
import ExerciceInput from "./ExerciceInput"
import CategorieInput from "./CategorieInput"
import DetailInput from "./DetailInput"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Date : {label}</p>
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
            else{
                return (<p className="desc">Elastique : {payload.value}</p>)
            }
        })}
      </div>
    );
  }

  return null;
};

function Stats() {
    let errIter = 0;
    const [seances1, setSeances1] = useState([]);
    const [seances2, setSeances2] = useState([]);
    const [typePerfGraph, setTypePerfGraph] = useState("percent")
    const [categorie, setCategorie] = useState({num: 0})
    const [detail, setDetail] = useState({num: 0})
    const [clicked, setClicked] = useState(false)
    const [clickedDetail, setClickedDetail] = useState(false)
    const [exercice, setExercice] = useState({exercice: {name: "title", ownExercice: ""}});
    const [params2, setParams2] = useState({date: "md", reforme: "true", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceMuscle: "title",exerciceOwnExercice: ""})
    const [params1, setParams1] = useState({date: "md", reforme: "poids", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""})

    function handleClick(){
        setClicked(!clicked);
    }

    function handleClickDetail(){
        setClickedDetail(!clickedDetail);
    }

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

    async function getSeance1(){
        const {data} = await API.workouts(params1);
        if (data.success === false && errIter===0 ){
            alert(data.message);
            errIter=1;
        } else {
//            console.log(data.seances);
            setSeances1(data.seances);
        }
    }

    async function getSeance2(){
        const {data} = await API.workouts(params2);
        if (data.success === false && errIter===0 ){
            alert(data.message);
            errIter=1;
        } else {
            setSeances2(data.seances);
            console.log(data.seances);
        }
    }

    useEffect(() => {
        console.log(params2)
        setTimeout(getSeance1, 50);
        setTimeout(getSeance2, 50);
    }, [params1, params2]);


    function changeExercice(exercice){
        setExercice(oldExercice => {
            return ({
                ...oldExercice,
                exercice: exercice,
            });
        });
    }

    useEffect(() => {
         if(exercice.exercice.name==="Elevation" || exercice.exercice.name==="Curl" || exercice.exercice.name==="Extension" || exercice.exercice.name==="Abduction" || exercice.exercice.name==="Adduction" || exercice.exercice.name==="Press"){
            if (exercice.exercice.muscle){
                setParams2(oldParams => {
                    return ({
                        ...oldParams,
                        exerciceName: exercice.exercice.name,
                        exerciceOwnExercice: exercice.exercice.ownExercice,
                        exerciceMuscle: exercice.exercice.muscle
                    })
                })
            }
        }
        else{
            setParams2(oldParams => {
                return ({
                    ...oldParams,
                    exerciceName: exercice.exercice.name,
                    exerciceOwnExercice: exercice.exercice.ownExercice,
                    exerciceMuscle: "",
                })
            })
        }
    },[exercice]);

    function changeTypePerfGraph(){
        setTypePerfGraph(event.target.value)

    }

    function changeCategorie(categorie){
        setCategorie(categorie)
    }

    function changeDetail(detail){
        setDetail(detail)
    }

    useEffect(() => {
        if(categorie.name==="Elastique"){
            setParams2(oldParams => {
                return ({
                    ...oldParams,
                    ["categorie0name"]: categorie.name,
                    ["categorie0utilisation"]: categorie.utilisation,
                    ["categorie0input"]: categorie.input,
                    ["categorie0estimation"]: categorie.estimation,
                })
            });
        }
        else {
            setParams2(oldParams => {
                return ({
                    ...oldParams,
                    ["categorie0name"]: categorie.name,
                    ["categorie0input"]: categorie.input,
                })
            });
        }
    }, [categorie])

    useEffect(() => {
        setParams2(oldParams => {
            return ({
                ...oldParams,
                ["detail0name"]: detail.name,
                ["detail0input"]: detail.input,
            })
        });
    }, [detail])

  function handleChange2(event){
    event.preventDefault();

    setParams2(oldParams => {
        return ({
            ...oldParams,
            [event.target.id]: event.target.value,
        })
    });
  }

  function handleChange1(event){
    event.preventDefault();

    setParams1(oldParams => {
        return ({
            ...oldParams,
            [event.target.id]: event.target.value,
        })
    });
  }

    return (
        <div>
            <NavigBar />

            <div className="Stats-div">
                <table className="Stats-table">
                    <tbody>
                        <tr>
                            <td>
                                <div className="chart-poids">
                                    <h1> Evolution de ton poids </h1>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-12">
                                            <label className="col-form-label">
                                              Periode
                                            </label>
                                            <select onChange={handleChange1} className="form-control" id="periode">
                                                <option value="max"> Max (défaut) </option>
                                                <option value="7d"> 7 derniers jours </option>
                                                <option value="30d"> 30 derniers jours </option>
                                                <option value="90d"> 90 derniers jours (3 mois) </option>
                                                <option value="180d"> 180 derniers jours (6 mois) </option>
                                                <option value="1y"> Depuis 1 an </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-12">
                                            <label className="col-form-label">
                                              Format Date
                                            </label>
                                            <select onChange={handleChange1} className="form-control" id="date">
                                                <option value="md"> Mois-Jour (défaut) </option>
                                                <option value="d"> Jour </option>
                                                <option value=""> Année-Mois-Jour </option>
                                            </select>
                                        </div>
                                    </div>

                                    <ResponsiveContainer width="100%" height={dimensions.width<925 ? 280 : 400} className="chart">
                                        <LineChart
                                            data={seances1}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis dataKey="date" />
                                            <YAxis domain={[25, 150]}/>
                                            <Tooltip content={<CustomTooltip />}/>
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Line connectNulls type="monotone" dataKey="poids" stroke="#ff0000" />
                                        </LineChart>
                                    </ResponsiveContainer >
                                </div>
                            </td>



                            {dimensions.width>925 ?
                            <td>
                                <div className="chart-poids">
                                    <h1> Evolution de tes performances </h1>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Exercice
                                            </label>
                                            <ExerciceInput taille="petit" typeSerie={0} id="exercice" changeExercice={changeExercice} />
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label onClick={handleClick} className="col-form-label categorie-label">
                                              Catégorie
                                            </label>
                                            <CategorieInput info="false" click={clicked} id={"catégorie"+0} index={0} dashboard={true} num={0} exercice={exercice.exercice} changeCategorie={changeCategorie}/>
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Performance
                                            </label>
                                            <select onChange={changeTypePerfGraph} className="form-control">
                                                <option value={"percent"}> Pourcentage du poids de corps (défaut) </option>
                                                <option value={"charge"}> Charge </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Format Date
                                            </label>
                                            <select onChange={handleChange2} className="form-control" id="date">
                                                <option value="md"> Mois-Jour (défaut) </option>
                                                <option value="d"> Jour </option>
                                                <option value=""> Année-Mois-Jour </option>
                                            </select>
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Periode
                                            </label>
                                            <select onChange={handleChange2} className="form-control" id="periode">
                                                <option value="max"> Max (défaut) </option>
                                                <option value="7d"> 7 derniers jours </option>
                                                <option value="30d"> 30 derniers jours </option>
                                                <option value="90d"> 90 derniers jours (3 mois) </option>
                                                <option value="180d"> 180 derniers jours (6 mois) </option>
                                                <option value="1y"> Depuis 1 an </option>
                                            </select>
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label onClick={handleClickDetail} className="col-form-label detail-label">
                                              Détail
                                            </label>
                                            <DetailInput info="false" click={clickedDetail}  id={"detail"+0} index={0} num={0} dashboard={true} changeDetail={changeDetail}/>
                                        </div>
                                    </div>

                                    <div className="form-group row stats-form">
                                        <label className="col-form-label col-sm-3">
                                          Reps / Temps
                                        </label>
                                        <input type="text"
                                          className="form-control col-sm-4"
                                          value={params2.repsFrom}
                                          onChange={handleChange2}
                                          placeholder="Aucun filtre"
                                          id="repsFrom"
                                        />
                                        <label className="col-form-label col-sm-1">
                                          à
                                        </label>
                                        <input type="text"
                                          className="form-control col-sm-4"
                                          value={params2.repsTo}
                                          onChange={handleChange2}
                                          placeholder="Aucun filtre"
                                          id="repsTo"
                                        />
                                    </div>

                                    <ResponsiveContainer width="100%" height={400} className="chart">
                                        <ComposedChart
                                            width={400}
                                            height={400}
                                            data={seances2}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis dataKey="date" />
                                            <YAxis domain={[0, 300]} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Bar barSize={20} fill="#afafaf" dataKey="exercices[0].Series[0].repsTime" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Series[0]."+typePerfGraph} stroke="#ff0000" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[0].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[1].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[2].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[3].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[4].estimation"} stroke="#10669C" />
                                        </ComposedChart>
                                    </ResponsiveContainer >

                                    <i className="detail-stat"> Les répétitions sont multipliées par 10 pour une meilleur lecture </i>
                                </div>
                            </td>
                            :
                            null
                            }
                        </tr>
                        {dimensions.width < 925 ?
                        <tr>
                            <td>
                                <div className="chart-poids">
                                    <h1 className="chart-title"> Evolution de tes performances </h1>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Exercice
                                            </label>
                                            <ExerciceInput taille="petit" typeSerie={0} id="exercice" changeExercice={changeExercice} />
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label onClick={handleClick} className="col-form-label categorie-label">
                                              Catégorie
                                            </label>
                                            <CategorieInput info="false" click={clicked} id={"catégorie"+0} index={0} dashboard={true} num={0} exercice={exercice.exercice} changeCategorie={changeCategorie}/>
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Performance
                                            </label>
                                            <select onChange={changeTypePerfGraph} className="form-control">
                                                <option value={"percent"}> Pourcentage du poids de corps (défaut) </option>
                                                <option value={"charge"}> Charge </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Format Date
                                            </label>
                                            <select onChange={handleChange2} className="form-control" id="date">
                                                <option value="md"> Mois-Jour (défaut) </option>
                                                <option value="d"> Jour </option>
                                                <option value=""> Année-Mois-Jour </option>
                                            </select>
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label className="col-form-label">
                                              Periode
                                            </label>
                                            <select onChange={handleChange2} className="form-control" id="periode">
                                                <option value="max"> Max (défaut) </option>
                                                <option value="7d"> 7 derniers jours </option>
                                                <option value="30d"> 30 derniers jours </option>
                                                <option value="90d"> 90 derniers jours (3 mois) </option>
                                                <option value="180d"> 180 derniers jours (6 mois) </option>
                                                <option value="1y"> Depuis 1 an </option>
                                            </select>
                                        </div>

                                        <div className="form-group col-sm-4">
                                            <label onClick={handleClickDetail} className="col-form-label detail-label">
                                              Détail
                                            </label>
                                            <DetailInput info="false" click={clickedDetail}  id={"detail"+0} index={0} num={0} dashboard={true} changeDetail={changeDetail}/>
                                        </div>
                                    </div>

                                    <div className="form-group row stats-form">
                                        <label className="col-form-label col-sm-3">
                                          Reps / Temps
                                        </label>
                                        <input type="text"
                                          className="form-control col-sm-4"
                                          value={params2.repsFrom}
                                          onChange={handleChange2}
                                          placeholder="Aucun filtre"
                                          id="repsFrom"
                                        />
                                        <label className="col-form-label col-sm-1">
                                          à
                                        </label>
                                        <input type="text"
                                          className="form-control col-sm-4"
                                          value={params2.repsTo}
                                          onChange={handleChange2}
                                          placeholder="Aucun filtre"
                                          id="repsTo"
                                        />
                                    </div>

                                    <ResponsiveContainer width="100%" height={dimensions.width<925 ? 280 : 400} className="chart">
                                        <ComposedChart
                                            width={400}
                                            height={400}
                                            data={seances2}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis dataKey="date" />
                                            <YAxis domain={[0, 300]} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Bar barSize={20} fill="#afafaf" dataKey="exercices[0].Series[0].repsTime" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Series[0]."+typePerfGraph} stroke="#ff0000" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[0].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[1].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[2].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[3].estimation"} stroke="#10669C" />
                                            <Line connectNulls type="monotone" dataKey={"exercices[0].Categories[4].estimation"} stroke="#10669C" />
                                        </ComposedChart>
                                    </ResponsiveContainer >

                                    <i className="detail-stat"> Les répétitions sont multipliées par 10 pour une meilleur lecture </i>
                                </div>
                            </td>
                            </tr>
                        : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stats;