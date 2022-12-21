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
            setCheckedItems(data.checkItems);
            // setText("Vos critères ont bien été chargés automatiquement, désolé pour toi si tu n'as remplis aucun objectif !")
        }

    }

    useEffect(() => {
        handleLoad()
    }, []);

    return (
        <div>
            <NavigBar />

            <div className="basic-div large-margin-bottom" style={{ minHeight: "85vh" }}>
                <h1>Accomplissements</h1>

                <div id="topSummaryBoxContent">
                    <div className="comment-table" style={
                        dimensions.width < 730 ? { marginTop: "20px", width: "90%" }
                            : { marginTop: "20px", width: "60%" }}
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
                        <div>
                            Succès remportés:
                            {" " + Object.values(checkedItems).filter(value => value === true).length + " "}
                            sur {" " + Object.values(checkedItems).length + "  "}
                            ({(Object.values(checkedItems).filter(value => value === true).length / Object.values(checkedItems).length).toFixed(2)}%)
                        </div>
                        <div class="achieveBar basic-margin-bottom">
                            <div class="achieveBarProgress" style={{ width: (Object.values(checkedItems).filter(value => value === true).length / Object.values(checkedItems).length).toFixed(2) + "%" }}></div>
                        </div>
                    </div>
                    <div style={{ clear: "both" }}></div>
                </div>

                <div id="personalAchieve" class="achievements_list ">

                    <h2 className='large-margin-updown'> Accomplissements debloqués</h2>

                    {checkedItems.statiqueIntermItem1 === true ?
                        <Accomplissement
                            titre="Front Lever"
                            id="statiqueIntermItem1"
                            description="Tenir un Front Lever One Leg pendant 5 secondes"
                            accomplished={true}
                            img={require("../../images/accomplissements/FrontLever.webp")}
                        />
                        :
                        null}

                    {checkedItems.statiqueConfirmeItem1 === true ?
                        <Accomplissement
                            titre="Front Fever"
                            id="statiqueConfirmeItem1"
                            description="Tenir un Front Lever pendant 10 secondes"
                            accomplished={true}
                            img={require("../../images/accomplissements/FrontFever.webp")}
                        />
                        :
                        null}

                    {checkedItems.statiqueExpertItem1 === true ?
                        <Accomplissement
                            titre="Front Forever"
                            id="statiqueExpertItem1"
                            description="Tenir un Front Lever pendant 20 secondes ou un Front Lever à une main"
                            accomplished={true}
                            img={require("../../images/accomplissements/FrontForever.webp")}
                        />
                        :
                        null}

                    {checkedItems.pdcIntermItem2 === true ?
                        <Accomplissement
                            titre="Tracteur rouillé"
                            id="pdcIntermItem2"
                            description="Pouvoir exécuter 12 tractions complètes (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Tracteur_rouillé.webp")}
                        />
                        :
                        null}

                    {checkedItems.pdcConfirmeItem2 === true ?
                        <Accomplissement
                            titre="Tracteur Ford"
                            id="pdcConfirmeItem2"
                            description="Pouvoir exécuter 10 tractions archer ou 1 traction une main (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Tracteur_Ford.webp")}
                        />
                        :
                        null}

                    {checkedItems.pdcExpertItem2 === true ?
                        <Accomplissement
                            titre="Tracteur Ferrari"
                            id="pdcExpertItem2"
                            description="Pouvoir exécuter 3 traction à une main (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Tracteur_Ferrari.webp")}
                        />
                        :
                        null}

                    {checkedItems.streetliftIntermItem2 === true ?
                        <Accomplissement
                            titre="Distraction"
                            id="streetliftIntermItem2"
                            description="Pouvoir exécuter 1 traction à 30% PDC (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Distraction.webp")}
                        />
                        :
                        null}

                    {checkedItems.streetliftConfirmeItem2 === true ?
                        <Accomplissement
                            titre="Contraction"
                            id="streetliftConfirmeItem2"
                            description="Pouvoir exécuter 1 traction à 75% PDC (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Contraction.webp")}
                        />
                        :
                        null}

                    {checkedItems.streetliftExpertItem2 === true ?
                        <Accomplissement
                            titre="Decontraction"
                            id="streetliftExpertItem2"
                            description="Pouvoir exécuter 1 traction à 100% PDC (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Decontraction.webp")}
                        />
                        :
                        null}




                    <h2 className='large-margin-updown'> Accomplissements non debloqués</h2>

                    {checkedItems.statiqueIntermItem1 === true ?
                        null :
                        <Accomplissement
                            titre="Front Lever"
                            id="statiqueIntermItem1"
                            description="Tenir un Front Lever One Leg pendant 5 secondes"
                            img={require("../../images/accomplissements/FrontLever.webp")}
                        />}

                    {checkedItems.statiqueConfirmeItem1 === true ?
                        null :
                        <Accomplissement
                            titre="Front Fever"
                            id="statiqueConfirmeItem1"
                            description="Tenir un Front Lever pendant 10 secondes"
                            img={require("../../images/accomplissements/FrontFever.webp")}
                        />}

                    {checkedItems.statiqueExpertItem1 === true ?
                        null :
                        <Accomplissement
                            titre="Front Forever"
                            id="statiqueExpertItem1"
                            description="Tenir un Front Lever pendant 20 secondes ou un Front Lever à une main"
                            img={require("../../images/accomplissements/FrontForever.webp")}
                        />}

                    {checkedItems.pdcIntermItem2 === true ?
                        null :
                        <Accomplissement
                            titre="Tracteur rouillé"
                            id="pdcIntermItem2"
                            description="Pouvoir exécuter 12 tractions complètes (ou équivalent via table de conversion %1RM)"
                            img={require("../../images/accomplissements/Tracteur_rouillé.webp")}
                        />}

                    {checkedItems.pdcConfirmeItem2 === true ?
                        null :
                        <Accomplissement
                            titre="Tracteur Ford"
                            id="pdcConfirmeItem2"
                            description="Pouvoir exécuter 10 tractions archer ou 1 traction une main (ou équivalent via table de conversion %1RM)"
                            img={require("../../images/accomplissements/Tracteur_Ford.webp")}
                        />}

                    {checkedItems.pdcExpertItem2 === true ?
                        null :
                        <Accomplissement
                            titre="Tracteur Ferrari"
                            id="pdcExpertItem2"
                            description="Pouvoir exécuter 3 traction à une main (ou équivalent via table de conversion %1RM)"
                            img={require("../../images/accomplissements/Tracteur_Ferrari.webp")}
                        />}

                    {checkedItems.streetliftIntermItem2 === true ?
                        null :
                        <Accomplissement
                            titre="Distraction"
                            id="streetliftIntermItem2"
                            description="Pouvoir exécuter 1 traction à 30% PDC (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Distraction.webp")}
                        />}

                    {checkedItems.streetliftConfirmeItem2 === true ?
                        null :
                        <Accomplissement
                            titre="Contraction"
                            id="streetliftConfirmeItem2"
                            description="Pouvoir exécuter 1 traction à 75% PDC (ou équivalent via table de conversion %1RM)"
                            img={require("../../images/accomplissements/Contraction.webp")}
                        />}

                    {checkedItems.streetliftExpertItem2 === true ?
                        null :
                        <Accomplissement
                            titre="Decontraction"
                            id="streetliftExpertItem2"
                            description="Pouvoir exécuter 1 traction à 100% PDC (ou équivalent via table de conversion %1RM)"
                            accomplished={true}
                            img={require("../../images/accomplissements/Decontraction.webp")}
                        />}

                    <Accomplissement
                        titre="ProgrArmor"
                        description="Débloquer tous les accomplissements (c'est impossible)"
                        img={require("../../images/accomplissements/ProgrArmor.webp")}
                    />



                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Accomplissements;