import {React, useState, useEffect} from "react";
import NavigBar from "../NavigBar.jsx"
import {LineChart, YAxis, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, Bar, ComposedChart} from 'recharts'
import API from "../../utils/API";
import ExerciceInput from "./ExerciceInput"

const data = [
  { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
  { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
  { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
  { name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
  { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
  { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
];

function Stats() {
    const [seances1, setSeances1] = useState([]);
    const [seances2, setSeances2] = useState([]);
    const [exercice, setExercice] = useState({exercice: {name: "title", ownExercice: ""}});
    const [params, setParams] = useState({reforme: "true", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""})

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
        if (params.categories){
            params.categories.forEach((categorie, index) => {
                if(categorie.name==="Elastique"){
                    setParams(oldParams => {
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
                    setParams(oldParams => {
                        return ({
                            ...oldParams,
                            ["categorie"+categorie.num+"name"]: categorie.name,
                            ["categorie"+categorie.num+"input"]: categorie.input,
                        })
                    });
                }
            })
            delete params.categories
        }
        if (params.details){
            params.details.forEach((detail, index) => {
                setParams(oldParams => {
                    return ({
                        ...oldParams,
                        ["detail"+detail.num+"name"]: detail.name,
                        ["detail"+detail.num+"input"]: detail.input,
                    })
                });
            })
            delete params.details
        }

        const {data} = await API.workouts({nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: ""});
        if (data.success === false){
            alert(data.message);
        } else {
//            console.log(data.seances);
            setSeances1(data.seances);
        }
    }

    async function getSeance2(){
        if (params.categories){
            params.categories.forEach((categorie, index) => {
                if(categorie.name==="Elastique"){
                    setParams(oldParams => {
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
                    setParams(oldParams => {
                        return ({
                            ...oldParams,
                            ["categorie"+categorie.num+"name"]: categorie.name,
                            ["categorie"+categorie.num+"input"]: categorie.input,
                        })
                    });
                }
            })
            delete params.categories
        }
        if (params.details){
            params.details.forEach((detail, index) => {
                setParams(oldParams => {
                    return ({
                        ...oldParams,
                        ["detail"+detail.num+"name"]: detail.name,
                        ["detail"+detail.num+"input"]: detail.input,
                    })
                });
            })
            delete params.details
        }

        const {data} = await API.workouts(params);
        if (data.success === false){
            alert(data.message);
        } else {
            setSeances2(data.seances);
            console.log(data.seances);
        }
    }

    useEffect(() => {
        console.log(params)
        setTimeout(getSeance1, 50);
        setTimeout(getSeance2, 50);
    }, [params]);


    function changeExercice(exercice){
        setExercice(oldExercice => {
            return ({
                ...oldExercice,
                exercice: exercice,
            });
        });
    }

    useEffect(() => {
        setParams(oldParams => {
            return ({
                ...oldParams,
                exerciceName: exercice.exercice.name,
                exerciceOwnExercice: exercice.exercice.ownExercice,
            })
        })
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
                                            <YAxis />
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Line type="monotone" dataKey="poids" stroke="#ff0000" />
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
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Bar barSize={20} fill="#afafaf" dataKey="exercices[0].Series[0].repsTime" />
                                            <Line type="monotone" dataKey="exercices[0].Series[0].charge" stroke="#ff0000" />
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