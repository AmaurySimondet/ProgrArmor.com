import { React, useState, useEffect } from 'react';
import Footer from '../Footer';
import NavigBar from '../NavigBar';
import API from '../../utils/API';
import { useSearchParams } from "react-router-dom";
import { writeSeries, writeCategories, includesExercice } from "../../utils/WriteExercice";

function Profil() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [userID, setUserID] = useState();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState();
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    const [lastSeance, setLastSeance] = useState();
    const [programmes, setProgrammes] = useState();
    const [PR, setPR] = useState();

    function sortDateCroissant(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();

    }


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

    async function getUser() {
        const { data } = await API.getUser({ id: localStorage.getItem("id") });
        if (data.success === false) {
            console.log(data.message);
        } else {
            console.log(data.profile);
            if (data.profile.modeSombre && data.profile.modeSombre === true) {
                // 👇 add class to body element
                document.body.classList.add('darkMode');
            }
            setUser(data.profile);
        };
    }

    async function getUserById(id) {
        const { data } = await API.getUser({ id: id });
        if (data.success === false) {
            console.log("getuserbyid", data.message);
        } else {
            console.log("getuserbyid", data.profile);
            setProfile(data.profile);
            setLastSeance(data.seances.sort(sortDateCroissant).slice(-1)[0]);
        };
    }

    async function getProgrammesByUser(id) {
        const { data } = await API.getProgrammesByUser({ userId: id });
        if (data.success === false) {
            console.log("getProgrammeByUser", data.message);
        } else {
            console.log("getProgrammeByUser", data.programmes);
            setProgrammes(data.programmes);
        };
    }

    async function getPR(id) {
        const { data } = await API.workouts({ id: id, date: "", reforme: "true", nom: "", periode: "max", tri: "PDC (ordre décroissant)", repsFrom: "", repsTo: "", exerciceName: "title", exerciceMuscle: "title", exerciceOwnExercice: "" });
        if (data.success === false) {
            console.log("getPR", data.message);
        } else {
            console.log("getPR", data.seances);
            setPR(arrangePR(data.seances));
        };
    }

    function arrangePR(seances) {
        let PR = [];
        let PR13 = [];
        let PR36 = [];
        let PR612 = [];
        let PR12 = [];

        seances.forEach(seance => {
            let exercice = seance.exercices[0].exercice.name;
            console.log(seance.exercices[0])
            if (seance.exercices[0].exercice.muscle) {
                exercice += " - " + seance.exercices[0].exercice.muscle;
            }
            if (seance.exercices[0].Categories && Object.values(seance.exercices[0].Categories).length > 0) {
                PR.push({
                    exercice: exercice,
                    categories: writeCategories(Object.values(seance.exercices[0].Categories)),
                    reps: parseFloat(seance.exercices[0].Series[0].repsTime),
                    charge: parseFloat(seance.exercices[0].Series[0].charge),
                    percent: seance.exercices[0].Series[0].percent,
                });
            }
            else {
                PR.push({
                    exercice: exercice,
                    reps: parseFloat(seance.exercices[0].Series[0].repsTime),
                    charge: parseFloat(seance.exercices[0].Series[0].charge),
                    percent: seance.exercices[0].Series[0].percent,
                });
            }
        });

        console.log(PR);

        PR.forEach(pr => {
            if (pr.reps <= 3 && pr.reps >= 1 && PR13.includes(pr) === false && includesExercice(PR13, pr.exercice) === false) {
                PR13.push(pr);
            }
            if (pr.reps >= 3 && pr.reps <= 6 && PR36.includes(pr) === false && includesExercice(PR36, pr.exercice) === false) {
                PR36.push(pr);
            }
            if (pr.reps >= 6 && pr.reps <= 12 && PR612.includes(pr) === false && includesExercice(PR612, pr.exercice) === false) {
                PR612.push(pr);
            }
            if (pr.reps >= 12 && PR12.includes(pr) === false && includesExercice(PR12, pr.exercice) === false) {
                PR12.push(pr);
            }
        });

        if (PR13.length > 2) {
            PR13 = PR13.slice(0, 2)
        }
        if (PR36.length > 2) {
            PR36 = PR36.slice(0, 2)
        }
        if (PR612.length > 2) {
            PR612 = PR612.slice(0, 2)
        }
        if (PR12.length > 2) {
            PR12 = PR12.slice(0, 2)
        }

        console.log("PR12", PR12);

        PR = { PR13: PR13, PR36: PR36, PR612: PR612, PR12: PR12 };

        return PR;
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setUserID(searchParams.get("id"));
    }, [searchParams])

    useEffect(() => {
        if (userID) {
            getUserById(userID);
            getProgrammesByUser(userID);
            getPR(userID);
            console.log("userID", userID);
        }
    }, [userID])

    useEffect(() => {
        if (lastSeance) {
            console.log("lastSeance", lastSeance);
        }
    }, [lastSeance])

    return (
        <div>
            <NavigBar />

            <div className='basic-div basic-flex2'>

                <div className="form-group row">
                    <label className="col-form-label">
                        Rechercher un utilisateur:
                    </label>

                    <input type="text" className={user.modeSombre ? "form-control inputDark" : "form-control"}
                        placeholder="ID utilisateur"
                        onChange={(e) => setSearchParams({ id: e.target.value })} />

                    <button className='btn btn-dark'
                        style={{ margin: "40px auto" }}
                        onClick={(e) => setSearchParams({ id: user.id })}>
                        Voir ton profil
                    </button>

                </div>

                <br />

                {userID ?
                    profile ?
                        <div className='Profile'>
                            <div className='basic-flexed2' style={{ marginTop: "40px" }}>

                                <img
                                    src={profile.profilePic}
                                    className="profile-pic"
                                    style={{ margin: "auto 2vw" }}
                                    alt="profilePic"
                                />

                                <h1
                                    style={{ margin: "auto 2vw" }}>{profile.fName} {profile.lName}
                                </h1>

                            </div>

                            <br />

                            <div className='basic-flexed2' style={{ marginBottom: "40px" }}>
                                <p style={{ margin: "auto 2vw" }}>
                                    Abonnés : {"{à venir}"}
                                </p>

                                <button style={{ margin: "auto 2vw" }}
                                    className="btn btn-dark large-margin-bottom" disabled>
                                    S'abonner
                                </button>
                            </div>

                            <br />

                            <div className={dimensions.width > 900 ? 'basic-flexed2' : ""} style={{ marginBottom: "40px" }} >

                                {/* PROGRAMMES */}
                                <div className={dimensions.width > 900 ? 'section' : "smartphoneSection"}>
                                    <h2 style={{ margin: "auto 2vw" }}>Programmes:</h2>

                                    <br />


                                    <ul>
                                        {programmes.length > 0 ? programmes.map((programme, index) => {
                                            return (
                                                <li key={index}>
                                                    <a href={`/programme?programmeId=${programme._id}`}
                                                        style={{ color: "#ff0000" }}>
                                                        {programme.titre}
                                                    </a>
                                                </li>
                                            )
                                        }) :
                                            <li><p>Aucun programme</p></li>}
                                    </ul>

                                </div>

                                {/* LAST SEANCE */}
                                <div className={dimensions.width > 900 ? 'section' : "smartphoneSection"}>
                                    <h2 style={{ margin: "auto 2vw" }}>Dernière séance:</h2>

                                    <br />


                                    <div className='lastSeance'>
                                        <h3 style={{ margin: "0" }}>{lastSeance.date}</h3>
                                        {lastSeance.exercices.map((exercice, index) => {
                                            return (
                                                <div key={index} style={{ marginBottom: "20px" }}>
                                                    <p style={{ margin: "0", fontWeight: "500", color: "#ffa5a5" }}>{exercice.exercice.name}</p>

                                                    {exercice.Categories ?
                                                        <p style={{ margin: "0" }}>{writeCategories(Object.values(exercice.Categories))}</p>
                                                        : null}

                                                    {Object.values(exercice.Series).length > 0 ?
                                                        <p style={{ margin: "0" }}>{writeSeries(Object.values(exercice.Series))}</p>

                                                        : null}
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>

                                {/* STATS */}
                                <div className="smartphoneSection">
                                    <h2 style={{ margin: "auto 2vw" }}>Statistiques:</h2>

                                    <br />


                                    <ul>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                    </ul>

                                </div>
                            </div>

                            {/* PR */}
                            <div className='basic-flexed2' style={{ marginBottom: "40px" }}>
                                <div>
                                    <h2 style={{ margin: "auto 2vw" }}>Records Personnels:</h2>

                                    <br />

                                    <h3 style={{ margin: "auto 2vw" }}>1-3 répétitions:</h3>
                                    <ol>
                                        {PR?.PR13?.length > 0 ? PR.PR13.map((pr, index) => {
                                            return (
                                                <li key={index}>
                                                    <p>
                                                        <div style={{ fontWeight: "500" }}>
                                                            {pr.exercice} {pr.categories ? ", " + pr.categories : null}
                                                        </div>



                                                        {pr.reps}x{pr.charge}kg ({pr.percent}%)
                                                    </p>
                                                </li>
                                            )
                                        })
                                            :
                                            <li><p>Aucun record personnel</p></li>}

                                    </ol>

                                    <br />

                                    <h3 style={{ margin: "auto 2vw" }}>3-6 répétitions:</h3>
                                    <ol>
                                        {PR?.PR36?.length > 0 ? PR.PR36.map((pr, index) => {
                                            return (
                                                <li key={index}>
                                                    <p>
                                                        <div style={{ fontWeight: "500" }}>
                                                            {pr.exercice} {pr.categories ? ", " + pr.categories : null}
                                                        </div>



                                                        {pr.reps}x{pr.charge}kg ({pr.percent}%)
                                                    </p>
                                                </li>
                                            )
                                        })
                                            :
                                            <li><p>Aucun record personnel</p></li>}
                                    </ol>

                                    <br />

                                    <h3 style={{ margin: "auto 2vw" }}>6-12 répétitions:</h3>
                                    <ol>
                                        {PR?.PR612?.length > 0 ? PR.PR612.map((pr, index) => {
                                            return (
                                                <li key={index}>
                                                    <p>
                                                        <div style={{ fontWeight: "500" }}>
                                                            {pr.exercice} {pr.categories ? ", " + pr.categories : null}
                                                        </div>



                                                        {pr.reps}x{pr.charge}kg ({pr.percent}%)
                                                    </p>
                                                </li>
                                            )
                                        })
                                            :
                                            <li><p>Aucun record personnel</p></li>}
                                    </ol>

                                    <br />

                                    <h3 style={{ margin: "auto 2vw" }}>12+ répétitions:</h3>
                                    <ol>
                                        {PR?.PR12?.length > 0 ? PR.PR12.map((pr, index) => {
                                            return (
                                                <li key={index}>
                                                    <p>
                                                        <div style={{ fontWeight: "500" }}>
                                                            {pr.exercice} {pr.categories ? ", " + pr.categories : null}
                                                        </div>



                                                        {pr.reps}x{pr.charge}kg ({pr.percent}%)
                                                    </p>
                                                </li>
                                            )
                                        })
                                            :
                                            <li><p>Aucun record personnel</p></li>}
                                    </ol>


                                </div>
                            </div>


                        </div>








                        : <h1 style={{ height: "auto" }}>Utilisateur introuvable</h1>
                    : <h1>Aucun utilisateur selectionné</h1>}




            </div>

            <Footer />
        </div>
    )
}

export default Profil;