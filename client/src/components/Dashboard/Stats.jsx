import {React, useState, useEffect} from "react";
import NavigBar from "../NavigBar.jsx"
import {LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts'
import API from "../../utils/API";

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
    const [params, setParams] = useState({})

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
            console.log(data.seances);
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

        const {data} = await API.workouts({reforme:"true", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "Developpé couché", exerciceOwnExercice: ""});
        if (data.success === false){
            alert(data.message);
        } else {
            console.log(data.seances);
            setSeances2(data.seances);
        }
    }

    useEffect(() => {
        console.log(params)
        setTimeout(getSeance1, 50);
        setTimeout(getSeance2, 50);
    }, [params]);

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
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Line type="monotone" dataKey="poids" stroke="#ff7300" yAxisId={0} />
                                            <Line type="monotone" dataKey="nom.ancienNom" stroke="#387908" yAxisId={1} />
                                        </LineChart>
                                    </ResponsiveContainer >
                                </div>
                            </td>
                            <td>
                                <div className="chart-poids">
                                    <h1> Evolution de tes performances </h1>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <LineChart
                                            width={400}
                                            height={400}
                                            data={seances2}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis dataKey="date" />
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Line type="monotone" dataKey="exercices[0].Series[0].charge" stroke="#ff7300" yAxisId={0} />
                                            <Line type="monotone" dataKey="exercices[0].exercice.name" stroke="#387908" yAxisId={1} />
                                        </LineChart>
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