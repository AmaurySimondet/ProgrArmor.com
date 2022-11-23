import { React, useState, useEffect } from "react";
import NavigBar from "../NavigBar.jsx"
import { LineChart, YAxis, XAxis, Cell, Tooltip, Label, Legend, BarChart, PieChart, Pie, Sector, CartesianGrid, Line, ResponsiveContainer, Bar, ComposedChart } from 'recharts'
import API from "../../utils/API";
import ExerciceInput from "./ExerciceInput"
import CategorieInput from "./CategorieInput"
import DetailInput from "./DetailInput"
import Footer from "../Footer.jsx";
import ReguHiddenText from "./ReguHiddenText"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                {label ? <p className="label">Date : {label}</p> : null}
                {payload.map((payload) => {
                    if (payload.dataKey === "exercices[0].Series[0].repsTime") {
                        return (<p className="desc">Reps / Temps : {payload.value / 10}</p>)
                    }
                    if (payload.dataKey === "exercices[0].Series[0].charge") {
                        return (<p className="desc">Charge : {payload.value}</p>)
                    }
                    if (payload.dataKey === "exercices[0].Series[0].percent") {
                        return (<p className="desc">% PDC : {payload.value}</p>)
                    }
                    if (payload.dataKey === "poids") {
                        return (<p className="desc">Poids : {payload.value}</p>)
                    }
                    if (payload.dataKey === "repsTime") {
                        return (<p className="desc"> Valeur classification : {payload.value}</p>)
                    }
                    if (payload.dataKey === "exercices[0].Categories[0].estimation" || payload.dataKey === "exercices[0].Categories[1].estimation" || payload.dataKey === "exercices[0].Categories[2].estimation" || payload.dataKey === "exercices[0].Categories[3].estimation" || payload.dataKey === "exercices[0].Categories[4].estimation") {
                        let utilisation = payload.payload.exercices[0].Categories[payload.dataKey.slice(payload.dataKey.length - 13, payload.dataKey.length - 12)].utilisation
                        return (<p className="desc"> {utilisation} élastique estimation (kg) : {payload.value}</p>)
                    }
                })}
            </div>
        );
    }

    return null;
};

const CustomTooltipRegu = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="desc">{payload[0].payload.name} : {payload[0].payload.score.toFixed(2)}</p>
            </div>
        );
    }

    return null;
};

function formatYAxis(value) {
    return value + "%"
}

let renderLabel = function (entry) {
    if (typeof (entry.name) !== "number") {
        return entry.name;
    }
}

function Stats() {
    let errIter = 0;
    const [seances1, setSeances1] = useState([]);
    const [seances2, setSeances2] = useState([]);
    const [seances3, setSeances3] = useState([]);
    const [typePerfGraph, setTypePerfGraph] = useState("percent")
    const [categorie, setCategorie] = useState({ num: 0 })
    const [detail, setDetail] = useState({ num: 0 })
    const [clicked, setClicked] = useState(false)
    const [infoPoids, setInfoPoids] = useState({})
    const [infoPerf, setInfoPerf] = useState({})
    const [clickedDetail, setClickedDetail] = useState(false)
    const [exercice, setExercice] = useState({ exercice: { name: "title", ownExercice: "" } });
    const [params3, setParams3] = useState({ top: 5, class: "reps", date: "md", reforme: "pie", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceMuscle: "title", exerciceOwnExercice: "" })
    const [params2, setParams2] = useState({ date: "md", reforme: "true", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceMuscle: "title", exerciceOwnExercice: "" })
    const [params1, setParams1] = useState({ date: "md", reforme: "poids", nom: "", periode: "max", tri: "Ordre chronologique croissant", repsFrom: "", repsTo: "", exerciceName: "title", exerciceOwnExercice: "" })
    const [user, setUser] = useState()
    const [reguScore, setReguScore] = useState();
    const [ReguHiddenClick, setReguHiddenClick] = useState('hide')
    const [poidsHidden, setPoidsHidden] = useState(true);
    const [perfHidden, setPerfHidden] = useState(true);
    const [prefHidden, setPrefHidden] = useState(true);

    function handleClickPoids() {
        setPoidsHidden(!poidsHidden);
    }

    function handleClickPerf() {
        setPerfHidden(!perfHidden);
    }

    function handleClickPref() {
        setPrefHidden(!prefHidden);
    }

    function handleClickRegu() {
        if (ReguHiddenClick === "hide") {
            setReguHiddenClick("nothide-big");
        } else { setReguHiddenClick("hide") };
    }

    async function getUser() {
        const { data } = await API.getUser({ id: localStorage.getItem("id") });
        if (data.success === false) {
            alert(data.message);
        } else {
            console.log(data.profile);
            if (data.profile.modeSombre && data.profile.modeSombre === true) {
                // 👇 add class to body element
                document.body.classList.add('darkMode');
            }
            setUser(data.profile);
        };
    }

    useEffect(() => {
        getUser();
        getReguScore();
    }, []);

    function handleClick() {
        setClicked(!clicked);
    }

    function handleClickDetail() {
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
        window.addEventListener('resize', function () {
            clearTimeout(timeout);;
            timeout = setTimeout(handleResize, 200);
        });
    })

    async function getSeance1() {
        const { data } = await API.workouts(params1);
        if (data.success === false && errIter === 0) {
            if (data.message === "Aucune séance !") {
                console.log(data.message);
            }
            errIter = 1;
        } else {
            if (data.seances) {
                setSeances1(data.seances);
                setInfoPoids({ poidsMin: data.poidsMin, poidsMax: data.poidsMax })
            }
        }
    }

    async function getSeance2() {
        const { data } = await API.workouts(params2);
        if (data.success === false && errIter === 0) {
            if (data.message === "Aucune séance !") {
                console.log(data.message);
            }
            errIter = 1;
        } else {
            if (data.seances) {
                setSeances2(data.seances);
                setInfoPerf({ chargeMax: data.chargeMax, percentMax: data.percentMax })
            }
            //            console.log(data.seances);
        }
    }

    async function getSeance3() {
        const { data } = await API.workouts(params3);
        if (data.success === false && errIter === 0) {
            if (data.message === "Aucune séance !") {
                console.log(data.message);
            }
            errIter = 1;
        } else {
            if (params3.top && params3.top !== "max") {
                setSeances3(data.seances.slice(0, parseInt(params3.top)));
            }
            else {
                if (data.seances) {
                    setSeances3(data.seances);
                }
            }
        }
    }

    async function getReguScore() {
        const { data } = await API.reguScore({ id: localStorage.getItem("id") });
        if (data.success === false) {
            alert(data.message)
        } else {
            setReguScore(data);
        }
    }

    useEffect(() => {
        setTimeout(getSeance1, 50);
        setTimeout(getSeance2, 50);
        setTimeout(getSeance3, 50);
    }, [params1, params2, params3]);


    function changeExercice(exercice) {
        setExercice(oldExercice => {
            return ({
                ...oldExercice,
                exercice: exercice,
            });
        });
    }

    useEffect(() => {
        if (exercice.exercice.name === "Elevation" || exercice.exercice.name === "Curl" || exercice.exercice.name === "Extension" || exercice.exercice.name === "Abduction" || exercice.exercice.name === "Adduction" || exercice.exercice.name === "Press") {
            if (exercice.exercice.muscle) {
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
        else {
            setParams2(oldParams => {
                return ({
                    ...oldParams,
                    exerciceName: exercice.exercice.name,
                    exerciceOwnExercice: exercice.exercice.ownExercice,
                    exerciceMuscle: "",
                })
            })
        }
    }, [exercice]);

    function changeTypePerfGraph(event) {
        setTypePerfGraph(event.target.value)

    }

    function changeCategorie(categorie) {
        setCategorie(categorie)
    }

    function changeDetail(detail) {
        setDetail(detail)
    }

    useEffect(() => {
        if (categorie.name === "Elastique") {
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

    function handleChange3(event) {
        event.preventDefault();

        setParams3(oldParams => {
            return ({
                ...oldParams,
                [event.target.id]: event.target.value,
            })
        });
    }

    function handleChange2(event) {
        event.preventDefault();

        setParams2(oldParams => {
            return ({
                ...oldParams,
                [event.target.id]: event.target.value,
            })
        });
    }

    function handleChange1(event) {
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

            {seances1.length === 0 ?
                <div className="Travaux-div">
                    <h1>Rien à afficher ici ! </h1>

                    <p> {"Je suis désolé, j'aurais vraiment aimé te fournir des statistiques sur rien mais on va pas réinventer les maths juste pour toi..."} </p>
                    <p> Commence par enregistrer tes premières séances ! </p>
                </div>
                :
                <div className="Stats-div">
                    <table className="Stats-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="chart-poids">
                                        <h1
                                            onClick={handleClickPoids}>
                                            Evolution de ton poids
                                            {poidsHidden ?
                                                <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                                :
                                                <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                            }
                                        </h1>

                                        {poidsHidden ? null :
                                            <div>
                                                <div className="form-group row stats-form">
                                                    <div className="form-group col-sm-12">
                                                        <label className="col-form-label">
                                                            Periode
                                                        </label>
                                                        <select onChange={handleChange1} className={user.modeSombre === true ? "form-control selectDark" : "form-control"}
                                                            id="periode">
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
                                                        <select onChange={handleChange1} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="date">
                                                            <option value="md"> Mois-Jour (défaut) </option>
                                                            <option value="d"> Jour </option>
                                                            <option value=""> Année-Mois-Jour </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <p> Evolution de ton poids sur la période {params1.periode} </p>

                                        <ResponsiveContainer width="100%" height={dimensions.width < 925 ? 280 : 400} className={user.modeSombre === true ? "chart watermark watermarkDark" : "chart watermark"}>
                                            <LineChart
                                                data={seances1}
                                                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                            >
                                                <XAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : { stroke: "black" }} dataKey="date" />
                                                <YAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : null} domain={[parseInt(infoPoids.poidsMin * 0.98), parseInt(infoPoids.poidsMax * 1.02)]} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <CartesianGrid fill={user.modeSombre === true ? "black" : "white"} stroke="#f5f5f5" />
                                                <Line strokeWidth={3} connectNulls type="monotone" dataKey="poids" stroke={user.modeSombre === true ? "#ff6666" : "#ff0000"} />
                                            </LineChart>
                                        </ResponsiveContainer >
                                    </div>
                                </td>

                                {dimensions.width > 925 ?
                                    <td>
                                        <div className="chart-poids">
                                            <h1
                                                onClick={handleClickPerf}>
                                                Evolution de tes performances
                                                {perfHidden ?
                                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                                    :
                                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                                }
                                            </h1>

                                            {perfHidden ? null :
                                                <div>
                                                    <div className="form-group row stats-form">
                                                        <div className="form-group col-sm-4">
                                                            <label className="col-form-label">
                                                                Exercice
                                                            </label>
                                                            <ExerciceInput modeSombre={user.modeSombre === true ? true : false} taille="petit" typeSerie={0} id="exercice" exercice={exercice.exercice} changeExercice={changeExercice} />
                                                        </div>

                                                        <div className="form-group col-sm-4">
                                                            <label onClick={handleClick} className="col-form-label categorie-label">
                                                                Catégorie <img className={user.modeSombre === true ? "reset-img  questionDark" : "reset-img"} onClick={handleClick} src={require('../../images/icons/reset.png')} />
                                                            </label>
                                                            <CategorieInput modeSombre={user.modeSombre === true ? true : false} info="false" click={clicked} id={"catégorie" + 0} categorie={categorie} index={0} dashboard={true} num={0} exercice={exercice.exercice} changeCategorie={changeCategorie} />
                                                        </div>

                                                        <div className="form-group col-sm-4">
                                                            <label className="col-form-label">
                                                                Performance
                                                            </label>
                                                            <select onChange={changeTypePerfGraph} className={user.modeSombre === true ? "form-control selectDark" : "form-control"}>
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
                                                            <select onChange={handleChange2} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="date">
                                                                <option value="md"> Mois-Jour (défaut) </option>
                                                                <option value="d"> Jour </option>
                                                                <option value=""> Année-Mois-Jour </option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-sm-4">
                                                            <label className="col-form-label">
                                                                Periode
                                                            </label>
                                                            <select onChange={handleChange2} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="periode">
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
                                                                Détail <img className={user.modeSombre === true ? "reset-img  questionDark" : "reset-img"} onClick={handleClick} src={require('../../images/icons/reset.png')} />
                                                            </label>
                                                            <DetailInput modeSombre={user.modeSombre === true ? true : false} info="false" click={clickedDetail} detail={detail} id={"detail" + 0} index={0} num={0} dashboard={true} changeDetail={changeDetail} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row stats-form">
                                                        <label className="col-form-label col-sm-3">
                                                            Reps / Temps
                                                        </label>
                                                        <input type="text"
                                                            className={user.modeSombre === true ? "form-control col-sm-4 inputDark" : "form-control col-sm-4"}
                                                            value={params2.repsFrom}
                                                            onChange={handleChange2}
                                                            placeholder="Aucun filtre"
                                                            id="repsFrom"
                                                        />
                                                        <label className="col-form-label col-sm-1">
                                                            à
                                                        </label>
                                                        <input type="text"
                                                            className={user.modeSombre === true ? "form-control col-sm-4 inputDark" : "form-control col-sm-4"}
                                                            value={params2.repsTo}
                                                            onChange={handleChange2}
                                                            placeholder="Aucun filtre"
                                                            id="repsTo"
                                                        />
                                                    </div>
                                                </div>
                                            }

                                            <p className="chart-little-title">
                                                Evolution de tes performances en
                                                {typePerfGraph === "percent" ?
                                                    " % du poids du corps "
                                                    :
                                                    " charge "
                                                }
                                                de :
                                            </p>

                                            <p>
                                                {params2.exerciceName === "title" ?
                                                    "Tous les exercices, "
                                                    : params2.exerciceMuscle !== "" ?
                                                        params2.exerciceName + " - " + params2.exerciceMuscle + ", "
                                                        :
                                                        params2.exerciceName + ", "
                                                }

                                                {params2.categorie0name ?
                                                    params2.categorie0name === "Aucune" ?
                                                        "aucune catégorie - "
                                                        :
                                                        params2.categorie0name + " : " + params2.categorie0input + ", "
                                                    :
                                                    "toutes catégories, "
                                                }

                                                {params2.detail0name ?
                                                    params2.detail0name === "Aucun" ?
                                                        "aucun détail, "
                                                        :
                                                        params2.detail0name + " : " + params2.detail0input + ", "
                                                    :
                                                    "tout détail, "
                                                }

                                                sur la période {params2.periode}
                                            </p>

                                            <ResponsiveContainer width="100%" height={400} className={user.modeSombre === true ? "chart watermark watermarkDark" : "chart watermark"}>
                                                <ComposedChart
                                                    width={400}
                                                    height={400}
                                                    data={seances2}
                                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                                >
                                                    <XAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : { stroke: "black" }} dataKey="date" />
                                                    <YAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : null} domain={typePerfGraph === "percent" ?
                                                        [0, parseInt(infoPerf.percentMax * 1.02)]
                                                        :
                                                        [0, parseInt(infoPerf.chargeMax * 1.02)]
                                                    }
                                                        tickFormatter={typePerfGraph === "percent" ? formatYAxis : null}
                                                    />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <CartesianGrid fill={user.modeSombre === true ? "black" : "white"} stroke="#f5f5f5" />
                                                    <Bar barSize={20} fill={user.modeSombre === true ? "#626262" : "#afafaf"} dataKey="exercices[0].Series[0].repsTime" />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Series[0]." + typePerfGraph} stroke={user.modeSombre === true ? "#ff6666" : "#ff0000"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[0].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[1].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[2].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[3].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[4].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
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
                                            <h1
                                                onClick={handleClickPerf}>
                                                Evolution de tes performances
                                                {perfHidden ?
                                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                                    :
                                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                                }
                                            </h1>

                                            {perfHidden ? null :
                                                <div>
                                                    <div className="form-group row stats-form">
                                                        <div className="form-group col-sm-4">
                                                            <label className="col-form-label">
                                                                Exercice
                                                            </label>
                                                            <ExerciceInput modeSombre={user.modeSombre === true ? true : false} taille="petit" exercice={exercice.exercice} typeSerie={0} id="exercice" changeExercice={changeExercice} />
                                                        </div>

                                                        <div className="form-group col-sm-4">
                                                            <label onClick={handleClick} className="col-form-label categorie-label">
                                                                Catégorie <img className={user.modeSombre === true ? "reset-img  questionDark" : "reset-img"} onClick={handleClick} src={require('../../images/icons/reset.png')} />
                                                            </label>
                                                            <CategorieInput modeSombre={user.modeSombre === true ? true : false} info="false" categorie={categorie} click={clicked} id={"catégorie" + 0} index={0} dashboard={true} num={0} exercice={exercice.exercice} changeCategorie={changeCategorie} />
                                                        </div>

                                                        <div className="form-group col-sm-4">
                                                            <label className="col-form-label">
                                                                Performance
                                                            </label>
                                                            <select onChange={changeTypePerfGraph} className={user.modeSombre === true ? "form-control selectDark" : "form-control"}>
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
                                                            <select onChange={handleChange2} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="date">
                                                                <option value="md"> Mois-Jour (défaut) </option>
                                                                <option value="d"> Jour </option>
                                                                <option value=""> Année-Mois-Jour </option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-sm-4">
                                                            <label className="col-form-label">
                                                                Periode
                                                            </label>
                                                            <select onChange={handleChange2} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="periode">
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
                                                                Détail <img className={user.modeSombre === true ? "reset-img  questionDark" : "reset-img"} onClick={handleClick} src={require('../../images/icons/reset.png')} />
                                                            </label>
                                                            <DetailInput modeSombre={user.modeSombre === true ? true : false} info="false" detail={detail} click={clickedDetail} id={"detail" + 0} index={0} num={0} dashboard={true} changeDetail={changeDetail} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row stats-form">
                                                        <label className="col-form-label col-sm-3">
                                                            Reps / Temps
                                                        </label>
                                                        <input type="text"
                                                            className={user.modeSombre === true ? "form-control col-sm-4 inputDark" : "form-control col-sm-4"}
                                                            value={params2.repsFrom}
                                                            onChange={handleChange2}
                                                            placeholder="Aucun filtre"
                                                            id="repsFrom"
                                                        />
                                                        <label className="col-form-label col-sm-1">
                                                            à
                                                        </label>
                                                        <input type="text"
                                                            className={user.modeSombre === true ? "form-control col-sm-4 inputDark" : "form-control col-sm-4"}
                                                            value={params2.repsTo}
                                                            onChange={handleChange2}
                                                            placeholder="Aucun filtre"
                                                            id="repsTo"
                                                        />
                                                    </div>
                                                </div>
                                            }

                                            <p className="chart-little-title">
                                                Evolution de tes performances en
                                                {typePerfGraph === "percent" ?
                                                    " % du poids du corps "
                                                    :
                                                    " charge "
                                                }
                                                de :
                                            </p>

                                            <p>
                                                {params2.exerciceName === "title" ?
                                                    "Tous les exercices, "
                                                    : params2.exerciceMuscle !== "" ?
                                                        params2.exerciceName + " - " + params2.exerciceMuscle + ", "
                                                        :
                                                        params2.exerciceName + ", "
                                                }

                                                {params2.categorie0name ?
                                                    params2.categorie0name === "Aucune" ?
                                                        "aucune catégorie - "
                                                        :
                                                        params2.categorie0name + " : " + params2.categorie0input + ", "
                                                    :
                                                    "toutes catégories, "
                                                }

                                                {params2.detail0name ?
                                                    params2.detail0name === "Aucun" ?
                                                        "aucun détail, "
                                                        :
                                                        params2.detail0name + " : " + params2.detail0input + ", "
                                                    :
                                                    "tout détail, "
                                                }

                                                sur la période {params2.periode}
                                            </p>

                                            <ResponsiveContainer width="100%" height={dimensions.width < 925 ? 280 : 400} className={user.modeSombre === true ? "chart watermark watermarkDark" : "chart watermark"}>
                                                <ComposedChart
                                                    width={400}
                                                    height={400}
                                                    data={seances2}
                                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                                >
                                                    <XAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : { stroke: "black" }} dataKey="date" />
                                                    <YAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : null} domain={typePerfGraph === "percent" ?
                                                        [0, parseInt(infoPerf.percentMax * 1.02)]
                                                        :
                                                        [0, parseInt(infoPerf.chargeMax * 1.02)]
                                                    }
                                                        tickFormatter={typePerfGraph === "percent" ? formatYAxis : null}
                                                    />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <CartesianGrid fill={user.modeSombre === true ? "black" : "white"} stroke="#f5f5f5" />
                                                    <Bar barSize={20} fill={user.modeSombre === true ? "#626262" : "#afafaf"} dataKey="exercices[0].Series[0].repsTime" />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Series[0]." + typePerfGraph} stroke={user.modeSombre === true ? "#ff6666" : "#ff0000"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[0].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[1].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[2].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[3].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                    <Line strokeWidth={3} connectNulls type="monotone" dataKey={"exercices[0].Categories[4].estimation"} stroke={user.modeSombre === true ? "#4DBAFF" : "#10669C"} />
                                                </ComposedChart>
                                            </ResponsiveContainer >

                                            <i className="detail-stat"> Les répétitions sont multipliées par 10 pour une meilleur lecture </i>
                                        </div>
                                    </td>
                                </tr>
                                : null}

                        </tbody>
                    </table>

                    <div className="chart-pie">
                        <h1
                            className="chart-title"
                            onClick={handleClickPref}>
                            Tes exercices préférés
                            {prefHidden ?
                                <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                                :
                                <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                            }
                        </h1>

                        {prefHidden ? null :
                            <div>
                                <div className="form-group row stats-form">
                                    <div className="form-group col-sm-4">
                                        <label className="col-form-label">
                                            Periode
                                        </label>
                                        <select onChange={handleChange3} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="periode">
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
                                        <select onChange={handleChange3} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="class">
                                            <option value="reps"> Somme des répétitions (défaut) </option>
                                            <option value="sets"> Somme des séries </option>
                                            <option value="time"> Somme des secondes </option>
                                        </select>
                                    </div>

                                    <div className="form-group col-sm-4">
                                        <label className="col-form-label">
                                            Affichage
                                        </label>
                                        <select onChange={handleChange3} className={user.modeSombre === true ? "form-control selectDark" : "form-control"} id="top">
                                            <option value={5}> Top 5 (défaut) </option>
                                            <option value={10}> Top 10 </option>
                                            <option value={20}> Top 20 </option>
                                            <option value="max"> Tous </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }

                        <p style={{ marginBottom: "0" }}>
                            Top {params3.top} de tes exercices préférés classés par
                            {params3.class === "reps" ?
                                " répétitions "
                                :
                                params3.class === "sets" ?
                                    " séries "
                                    :
                                    params3.class === "time" ?
                                        " temps (secondes) "
                                        : null
                            }
                            sur la période {params3.periode}
                        </p>

                        <ResponsiveContainer className={user.modeSombre === true ? "piechart watermark-piechart watermarkDark" : "piechart watermark-piechart"} width="100%" height=
                            {dimensions.width < 330 ?
                                100
                                :
                                dimensions.width < 450 ?
                                    200
                                    :
                                    dimensions.width < 700 ?
                                        300
                                        :
                                        400
                            }
                        >
                            <PieChart width={800} height={800}>
                                <Pie
                                    data={seances3}
                                    innerRadius=
                                    {dimensions.width < 330 ?
                                        10
                                        :
                                        dimensions.width < 450 ?
                                            20
                                            :
                                            dimensions.width < 700 ?
                                                40
                                                :
                                                100
                                    }
                                    outerRadius=
                                    {dimensions.width < 330 ?
                                        20
                                        :
                                        dimensions.width < 450 ?
                                            40
                                            :
                                            dimensions.width < 700 ?
                                                70
                                                :
                                                150
                                    }
                                    fill="#9b0000"
                                    dataKey="repsTime"
                                    label={renderLabel}
                                >
                                    {seances3.map((entry, index) => (
                                        <Cell fill={
                                            user.modeSombre === true ?
                                                index % 2 === 0 ? "#ffbcbc" : "#ff6666"
                                                :
                                                index % 2 === 0 ? "#9b0000" : "#E84646"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="regu-score">
                        <p style={{ marginBottom: dimensions.width < 350 ? "-50px" : dimensions.width < 950 ? "-100px" : "-300px" }}>
                            <h1 style={{ marginBottom: "20px" }}>Ta régularité</h1>
                            <img className={user.modeSombre === true ? "myDIV questionDark " : "myDIV"} onClick={handleClickRegu} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                            <div className={ReguHiddenClick}>
                                <ReguHiddenText />
                            </div>

                            <h2> Ta série de séances consécutives actuelle: </h2>
                            <h2> {reguScore.currSerie} </h2>

                            <h2> Ta meilleure série de séances consécutives: </h2>
                            <h2> {reguScore.bestSerie} </h2>

                            <h2> Ta moyenne de séances consécutives: </h2>
                            <h2 style={{ marginBottom: "20px" }}> {reguScore.AverageSerie.toFixed(2)} </h2>
                        </p>

                        <ResponsiveContainer
                            width={dimensions.width < 350 ? 80 : dimensions.width < 450 ? 100 : dimensions.width < 925 ? 200 : 200}
                            height={dimensions.width < 350 ? 150 : dimensions.width < 450 ? 300 : dimensions.width < 925 ? 400 : 800}
                            className={user.modeSombre === true ? "regu-score watermark-regu watermark watermarkDark rotate" : "regu-score watermark-regu watermark rotate"}>
                            <BarChart
                                data={reguScore.reguScore}
                            >
                                <XAxis tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : { stroke: "black" }} dataKey="name" />
                                <YAxis domain={[0, 100]} tick={user.modeSombre === true ? { fill: 'white' } : { fill: "black" }} tickLine={user.modeSombre === true ? { stroke: 'white' } : null} />
                                <Tooltip content={<CustomTooltipRegu />} />
                                <CartesianGrid fill={user.modeSombre === true ? "black" : "white"} stroke="#f5f5f5" />
                                <Bar barSize={100} fill={user.modeSombre === true ? "#626262" : "#afafaf"} dataKey="score">
                                    {reguScore.reguScore.map((entry, index) => (
                                        <Cell fill={
                                            entry.score < 25 ? "#F7A4A4" :
                                                entry.score < 50 ? "#FEBE8C" :
                                                    entry.score < 75 ? "#FFFBC1" :
                                                        "#B6E2A1"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer >


                    </div>

                </div>
            }

            <Footer />

        </div>
    );
};

export default Stats;