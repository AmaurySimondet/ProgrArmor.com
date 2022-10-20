import {React, useState, useEffect} from "react";
import NavigBar from "../NavigBar.jsx"
import {LineChart, YAxis, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, Bar, ComposedChart} from 'recharts'
import API from "../../utils/API";
import ExerciceInput from "./ExerciceInput"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Date : {label}</p>
        <p className="desc">Valeur : {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

function Stats() {
    const [seances1, setSeances1] = useState([]);
    const [seances2, setSeances2] = useState([]);
    const [exercice, setExercice] = useState({exercice: {name: "title", ownExercice: ""}});
    const [params2, setParams2] = useState({reforme: "true", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceMuscle: "title",exerciceOwnExercice: ""})
    const [params1, setParams1] = useState({reforme: "poids", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""})

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
        if (params1.categories){
            params1.categories.forEach((categorie, index) => {
                if(categorie.name==="Elastique"){
                    setParams1(oldParams => {
                        return ({
                            ...oldParams,
                            ["categorie"+index+"name"]: categorie.name,
                            ["categorie"+index+"utilisation"]: categorie.utilisation,
                            ["categorie"+index+"input"]: categorie.input,
                            ["categorie"+index+"estimation"]: categorie.estimation,
                        })
                    });
                }
                else {
                    setParams1(oldParams => {
                        return ({
                            ...oldParams,
                            ["categorie"+categorie.num+"name"]: categorie.name,
                            ["categorie"+categorie.num+"input"]: categorie.input,
                        })
                    });
                }
            })
            delete params1.categories
        }
        if (params1.details){
            params1.details.forEach((detail, index) => {
                setParams(oldParams => {
                    return ({
                        ...oldParams,
                        ["detail"+detail.num+"name"]: detail.name,
                        ["detail"+detail.num+"input"]: detail.input,
                    })
                });
            })
            delete params1.details
        }

        const {data} = await API.workouts(params1);
        if (data.success === false){
            alert(data.message);
        } else {
//            console.log(data.seances);
            setSeances1(data.seances);
        }
    }

    async function getSeance2(){
        if (params2.categories){
            params2.categories.forEach((categorie, index) => {
                if(categorie.name==="Elastique"){
                    setParams2(oldParams => {
                        return ({
                            ...oldParams,
                            ["categorie"+index+"name"]: categorie.name,
                            ["categorie"+index+"utilisation"]: categorie.utilisation,
                            ["categorie"+index+"input"]: categorie.input,
                            ["categorie"+index+"estimation"]: categorie.estimation,
                        })
                    });
                }
                else {
                    setParams2(oldParams => {
                        return ({
                            ...oldParams,
                            ["categorie"+categorie.num+"name"]: categorie.name,
                            ["categorie"+categorie.num+"input"]: categorie.input,
                        })
                    });
                }
            })
            delete params2.categories
        }
        if (params2.details){
            params2.details.forEach((detail, index) => {
                setParams2(oldParams => {
                    return ({
                        ...oldParams,
                        ["detail"+detail.num+"name"]: detail.name,
                        ["detail"+detail.num+"input"]: detail.input,
                    })
                });
            })
            delete params2.details
        }

        const {data} = await API.workouts(params2);
        if (data.success === false){
            alert(data.message);
        } else {
            setSeances2(data.seances);
            console.log(data.seances);
        }
    }

    useEffect(() => {
        console.log(params2)
        setTimeout(getSeance1, 50);
        setTimeout(getSeance2, 50);
    }, [params2]);


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
                                    <ResponsiveContainer width="100%" height={400}>
                                        <LineChart
                                            width={400}
                                            height={400}
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
                            <td>
                                <div className="chart-poids">
                                    <h1> Evolution de tes performances </h1>

                                    <div className="form-group row stats-form">
                                        <div className="form-group col-sm-12">
                                            <label className="col-form-label">
                                              Exercice
                                            </label>
                                            <ExerciceInput taille="petit" typeSerie={0} id="exercice" changeExercice={changeExercice} />
                                        </div>
                                    </div>

                                    <ResponsiveContainer width="100%" height={400}>
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
                                            <Line connectNulls type="monotone" dataKey="exercices[0].Series[0].charge" stroke="#ff0000" />
                                        </ComposedChart>
                                    </ResponsiveContainer >
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stats;