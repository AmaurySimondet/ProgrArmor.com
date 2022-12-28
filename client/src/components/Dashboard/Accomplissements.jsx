import { React, useState, useEffect } from 'react';
import Footer from '../Footer';
import NavigBar from '../NavigBar';
import API from '../../utils/API';
import Accomplissement from './Accomplissements/Accomplissement';

function Accomplissements() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [user, setUser] = useState({});
    const [checkedItems, setCheckedItems] = useState({});
    const [accomplissements, setAccomplissements] = useState([]);
    const [nonaAccomplissements, setNonaAccomplissements] = useState([]);

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
        setTimeout(getUser, 50);
    }, []);

    function imageFallback(id) {
        let imageSrc;
        try {
            imageSrc = require('../../images/accomplissements/' + id + '.webp');
        } catch (error) {
            imageSrc = require('../../images/accomplissements/ProgrArmor.webp');;
        }
        return imageSrc;
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
    });

    async function handleLoad() {
        // setText("Chargement des critères en cours...");
        const { data } = await API.getNiveau({ id: localStorage.getItem("id") });

        if (data.success === false) {
            console.log(data.message);
        }
        else {
            // console.log(data);
            // console.log(Object.values(data.checkItems).length)
            console.log("checkItems", data.checkItems)
            setCheckedItems(data.checkItems);

            let acc = [];
            let nonaAcc = [];
            Object.values(data.checkItems).forEach((item, index) => {
                if (item.valeur === true) {
                    acc.push(item);
                } else {
                    nonaAcc.push(item);
                }
            });

            setAccomplissements(acc);
            setNonaAccomplissements(nonaAcc);
            // setText("Vos critères ont bien été chargés automatiquement, désolé pour toi si tu n'as remplis aucun objectif !")
        }

    }

    useEffect(() => {
        handleLoad()
    }, []);

    return (
        <div>
            <NavigBar />

            {Object.values(checkedItems).length > 0 ?
                <div className="basic-div large-margin-bottom" style={{ minHeight: "85vh" }}>
                    <h1>Accomplissements</h1>

                    <p className='basic-margin-bottom'>
                        Voici la liste de tous les accomplissements que tu as débloqués.
                        <br />
                        Tous les accomplissements sont aussi atteignables via leurs conversions selon les tables de Berger (%1RM) ou en faisant mieux que l'objectif.
                    </p>

                    <div id="topSummaryBoxContent" style={
                        user.modeSombre ?
                            null
                            :
                            { background: "#888888" }
                    }>
                        <div className="comment-table" style={
                            dimensions.width < 730 ?
                                user.modeSombre ?
                                    { marginTop: "20px", width: "90%" }
                                    :
                                    { marginTop: "20px", width: "90%", background: "#aaaaaa" }
                                :
                                user.modeSombre ?
                                    { marginTop: "20px", width: "60%" }
                                    :
                                    { marginTop: "20px", width: "60%", background: "#aaaaaa" }}
                        >
                            <img
                                className="profile-pic"
                                style={
                                    dimensions.width < 500 ?
                                        dimensions.width < 300 ?
                                            { width: "30px", height: "30px", padding: "2%" }
                                            :
                                            { width: "50px", height: "50px", padding: "2%" }
                                        :
                                        { width: "100px", height: "100px", padding: "2%" }}
                                src={user.profilePic}
                                alt="profile-pic"
                            />

                            <div style={{ padding: "5%", margin: "auto", display: "inline-block" }}>
                                <p style={
                                    dimensions.width < 500 ?
                                        dimensions.width < 300 ?
                                            { fontSize: "10px", color: "white" }
                                            :
                                            { fontSize: "15px", color: "white" }
                                        :
                                        { fontSize: "25px", color: "white" }}>
                                    {user.fName} {user.lName}
                                </p>
                            </div>
                        </div>
                        <div id="topSummaryAchievements">
                            <div style={
                                user.modeSombre ?
                                    null :
                                    { color: "white" }
                            }>
                                Succès remportés:
                                {" " + accomplissements.length + " "}
                                sur {" " + Object.values(checkedItems).length + "  "}
                                ({(accomplissements.length / Object.values(checkedItems).length).toFixed(2) * 100}%)
                            </div>
                            <div class="achieveBar basic-margin-bottom">
                                <div class="achieveBarProgress" style={{ width: (accomplissements.length / Object.values(checkedItems).length).toFixed(2) * 100 + "%" }}></div>
                            </div>
                        </div>
                        <div style={{ clear: "both" }}></div>
                    </div>

                    <div id="personalAchieve" class="achievements_list ">

                        <h2 className='large-margin-updown'> Accomplissements debloqués</h2>

                        {accomplissements.map((item, index) => {

                            // console.log("item", item)
                            return (
                                <Accomplissement
                                    key={index}
                                    id={item.id}
                                    titre={item.titre}
                                    description={item.description}
                                    accomplished={item.valeur}
                                    modeSombre={user.modeSombre}
                                    img={imageFallback(item.id)}
                                />
                            )
                        })}

                        <h2 className='large-margin-updown'> Accomplissements non debloqués</h2>

                        {nonaAccomplissements.map((item, index) => {
                            // console.log("item", item)
                            return (
                                <Accomplissement
                                    key={index}
                                    id={item.id}
                                    titre={item.titre}
                                    description={item.description}
                                    accomplished={item.valeur}
                                    modeSombre={user.modeSombre}
                                    img={imageFallback(item.id)}
                                />
                            )
                        })}

                    </div>
                </div>
                :
                <div className="basic-div" style={{ minHeight: "85vh", display: "flex", flexWrap: "wrap", alignContent: "center" }}>
                    <h1>Erreur de chargement des accomplissements</h1>

                    <p>Les accomplissements n'ont pas pu être chargés. Veuillez réessayer en rechargeant la page</p>
                </div>
            }


            <Footer />
        </div>
    )
}

export default Accomplissements;