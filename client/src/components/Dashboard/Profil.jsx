import { React, useState, useEffect } from 'react';
import Footer from '../Footer';
import NavigBar from '../NavigBar';
import API from '../../utils/API';
import { useSearchParams } from "react-router-dom";
import { writeSeries, writeCategories } from "../../utils/WriteExercice";

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

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setUserID(searchParams.get("id"));
    }, [searchParams])

    useEffect(() => {
        if (userID) {
            getUserById(userID);
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

                <div className="form-group row large-margin-updown">
                    <label className="col-form-label">
                        Rechercher un utilisateur:
                    </label>

                    <input type="text" className={user.modeSombre ? "form-control inputDark" : "form-control"}
                        placeholder="ID utilisateur"
                        onChange={(e) => setSearchParams({ id: e.target.value })} />

                </div>

                {userID ?
                    profile ?
                        <div className='Profile'>
                            <div className='basic-flexed2' style={{ margin: "40px" }}>

                                <img
                                    src={profile.profilePic}
                                    className="profile-pic"
                                    style={{ margin: "auto 2vw" }}
                                    alt="profilePic"
                                />

                                <h1
                                    style={{ margin: "auto 2vw" }}>{profile.fName} {profile.lName}</h1>

                            </div>

                            <br />

                            <div className={dimensions.width > 900 ? 'basic-flexed2' : ""} style={{ marginBottom: "40px" }} >

                                <div className={dimensions.width > 900 ? 'section' : ""}>
                                    <h2 style={{ margin: "auto 2vw" }}>Records Personnels:</h2>

                                    <br />



                                    <ul>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                    </ul>

                                </div>

                                <div className={dimensions.width > 900 ? 'section' : ""}>
                                    <h2 style={{ margin: "auto 2vw" }}>Programmes:</h2>

                                    <br />


                                    <ul>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                        <li> Lorem ipsum </li>
                                    </ul>

                                </div>

                                <div className={dimensions.width > 900 ? 'section' : ""}>
                                    <h2 style={{ margin: "auto 2vw" }}>Dernière séance:</h2>

                                    <br />


                                    <div className='lastSeance'>
                                        {lastSeance.nom ?
                                            lastSeance.nom.ancienNom !== "nouveau-nom" ?
                                                <h3>{lastSeance.nom.ancienNom}</h3>
                                                : <h3>{lastSeance.nom.nouveauNom}</h3>
                                            : null}
                                        <h4>{lastSeance.date}</h4>
                                        {lastSeance.exercices.map((exercice, index) => {
                                            return (
                                                <div key={index}>
                                                    <h5>{exercice.exercice.name}</h5>
                                                    {"Catégories: "}

                                                    <br />

                                                    {exercice.Categories ?
                                                        writeCategories(Object.values(exercice.Categories))
                                                        : null}

                                                    <br />
                                                    <br />

                                                    {Object.values(exercice.Series).length > 0 ?
                                                        <div>
                                                            {"Séries: "}
                                                            <br />
                                                            {writeSeries(Object.values(exercice.Series))}
                                                        </div>
                                                        : null}
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>

                                <div className="">
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


                        </div>








                        : <h1 style={{ height: "auto" }}>Utilisateur introuvable</h1>
                    : <h1>Aucun utilisateur selectionné</h1>}




            </div>

            <Footer />
        </div>
    )
}

export default Profil;