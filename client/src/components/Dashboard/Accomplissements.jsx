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
            console.log("checkItems", data.checkItems)
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
                                {" " + Object.values(checkedItems).filter(value => value === true).length + " "}
                                sur {" " + Object.values(checkedItems).length + "  "}
                                ({(Object.values(checkedItems).filter(value => value === true).length / Object.values(checkedItems).length).toFixed(2) * 100}%)
                            </div>
                            <div class="achieveBar basic-margin-bottom">
                                <div class="achieveBarProgress" style={{ width: (Object.values(checkedItems).filter(value => value === true).length / Object.values(checkedItems).length).toFixed(2) * 100 + "%" }}></div>
                            </div>
                        </div>
                        <div style={{ clear: "both" }}></div>
                    </div>

                    <div id="personalAchieve" class="achievements_list ">

                        <h2 className='large-margin-updown'> Accomplissements debloqués</h2>

                        {checkedItems.statiqueIntermItem1 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
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
                                modeSombre={user.modeSombre}
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
                                modeSombre={user.modeSombre}
                                titre="Front Forever"
                                id="statiqueExpertItem1"
                                description="Tenir un Front Lever pendant 20 secondes ou un Front Lever à une main"
                                accomplished={true}
                                img={require("../../images/accomplissements/FrontForever.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueIntermItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Planche cabossée"
                                id="statiqueIntermItem2"
                                description="Tenir une Tuck Planche 20 secondes ou une Advanced Tuck planche 5 secondes."
                                accomplished={true}
                                img={require("../../images/accomplissements/PlancheCabossee.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueConfirmeItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Planche à pain"
                                id="statiqueConfirmeItem2"
                                description="Tenir une Closed Hip Straddle Planche pendant 10 secondes"
                                accomplished={true}
                                img={require("../../images/accomplissements/FrontFever.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueExpertItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Planche à découper"
                                id="statiqueExpertItem2"
                                description="Tenir une Full Planche ou Full Maltest pendant 10 secondes"
                                accomplished={true}
                                img={require("../../images/accomplissements/FrontForever.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueIntermItem3 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Je m'assoies ainsi"
                                id="statiqueIntermItem3"
                                description="Tenir une L-Sit 15 secondes."
                                accomplished={true}
                                img={require("../../images/accomplissements/JeMassoiesAinsi.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueConfirmeItem3 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Patriote"
                                id="statiqueConfirmeItem3"
                                description="Tenir le Drapeau pendant 15 secondes"
                                accomplished={true}
                                img={require("../../images/accomplissements/Patriote.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueExpertItem4 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Hissez haut !"
                                id="statiqueExpertItem4"
                                description="Tenir le Drapeau pendant 30 secondes"
                                accomplished={true}
                                img={require("../../images/accomplissements/HissezHaut.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueIntermItem4 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="I'll be back"
                                id="statiqueIntermItem4"
                                description="Avoir un Straddle Back Lever"
                                accomplished={true}
                                img={require("../../images/accomplissements/IllBeBack.webp")}
                            />
                            :
                            null}

                        {checkedItems.statiqueExpertItem3 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Christ rédempteur"
                                id="statiqueExpertItem3"
                                description="Tenir une Iron Cross pendant 10 secondes"
                                accomplished={true}
                                img={require("../../images/accomplissements/ChristRedempteur.webp")}
                            />
                            :
                            null}

                        {checkedItems.pdcIntermItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Tracteur rouillé"
                                id="pdcIntermItem2"
                                description="Pouvoir exécuter 12 tractions complètes "
                                accomplished={true}
                                img={require("../../images/accomplissements/Tracteur_rouillé.webp")}
                            />
                            :
                            null}

                        {checkedItems.pdcConfirmeItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Tracteur Ford"
                                id="pdcConfirmeItem2"
                                description="Pouvoir exécuter 10 tractions archer ou 1 traction une main "
                                accomplished={true}
                                img={require("../../images/accomplissements/Tracteur_Ford.webp")}
                            />
                            :
                            null}

                        {checkedItems.pdcExpertItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Tracteur Ferrari"
                                id="pdcExpertItem2"
                                description="Pouvoir exécuter 3 traction à une main "
                                accomplished={true}
                                img={require("../../images/accomplissements/Tracteur_Ferrari.webp")}
                            />
                            :
                            null}

                        {checkedItems.streetliftIntermItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Distraction"
                                id="streetliftIntermItem2"
                                description="Pouvoir exécuter 1 traction à 30% PDC "
                                accomplished={true}
                                img={require("../../images/accomplissements/Distraction.webp")}
                            />
                            :
                            null}

                        {checkedItems.streetliftConfirmeItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Contraction"
                                id="streetliftConfirmeItem2"
                                description="Pouvoir exécuter 1 traction à 75% PDC "
                                accomplished={true}
                                img={require("../../images/accomplissements/Contraction.webp")}
                            />
                            :
                            null}

                        {checkedItems.streetliftExpertItem2 === true ?
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Decontraction"
                                id="streetliftExpertItem2"
                                description="Pouvoir exécuter 1 traction à 100% PDC "
                                accomplished={true}
                                img={require("../../images/accomplissements/Decontraction.webp")}
                            />
                            :
                            null}




                        <h2 className='large-margin-updown'> Accomplissements non debloqués</h2>

                        {checkedItems.statiqueIntermItem1 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Front Lever"
                                id="statiqueIntermItem1"
                                description="Tenir un Front Lever One Leg pendant 5 secondes"
                                img={require("../../images/accomplissements/FrontLever.webp")}
                            />}

                        {checkedItems.statiqueConfirmeItem1 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Front Fever"
                                id="statiqueConfirmeItem1"
                                description="Tenir un Front Lever pendant 10 secondes"
                                img={require("../../images/accomplissements/FrontFever.webp")}
                            />}

                        {checkedItems.statiqueExpertItem1 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Front Forever"
                                id="statiqueExpertItem1"
                                description="Tenir un Front Lever pendant 20 secondes ou un Front Lever à une main"
                                img={require("../../images/accomplissements/FrontForever.webp")}
                            />}

                        {checkedItems.statiqueIntermItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Planche cabossée"
                                id="statiqueIntermItem2"
                                description="Tenir une Tuck Planche 20 secondes ou une Advanced Tuck planche 5 secondes."
                                img={require("../../images/accomplissements/PlancheCabossee.webp")}
                            />}

                        {checkedItems.statiqueConfirmeItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Planche à pain"
                                id="statiqueConfirmeItem2"
                                description="Tenir une Closed Hip Straddle Planche pendant 10 secondes"
                                img={require("../../images/accomplissements/FrontFever.webp")}
                            />}

                        {checkedItems.statiqueExpertItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Planche à découper"
                                id="statiqueExpertItem2"
                                description="Tenir une Full Planche ou Full Maltest pendant 10 secondes"
                                img={require("../../images/accomplissements/FrontForever.webp")}
                            />}

                        {checkedItems.statiqueIntermItem3 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Je m'assoies ainsi"
                                id="statiqueIntermItem3"
                                description="Tenir une L-Sit 15 secondes."
                                img={require("../../images/accomplissements/JeMassoiesAinsi.webp")}
                            />}

                        {checkedItems.statiqueConfirmeItem3 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Patriote"
                                id="statiqueConfirmeItem3"
                                description="Tenir le Drapeau pendant 15 secondes"
                                img={require("../../images/accomplissements/Patriote.webp")}
                            />}

                        {checkedItems.statiqueExpertItem4 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Hissez haut !"
                                id="statiqueExpertItem4"
                                description="Tenir le Drapeau pendant 30 secondes"
                                img={require("../../images/accomplissements/HissezHaut.webp")}
                            />}

                        {checkedItems.statiqueIntermItem4 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="I'll be back"
                                id="statiqueIntermItem4"
                                description="Avoir un Straddle Back Lever"
                                img={require("../../images/accomplissements/IllBeBack.webp")}
                            />}

                        {checkedItems.statiqueExpertItem3 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Christ rédempteur"
                                id="statiqueExpertItem3"
                                description="Tenir une Iron Cross pendant 10 secondes"
                                img={require("../../images/accomplissements/ChristRedempteur.webp")}
                            />}

                        {checkedItems.pdcIntermItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Tracteur rouillé"
                                id="pdcIntermItem2"
                                description="Pouvoir exécuter 12 tractions complètes "
                                img={require("../../images/accomplissements/Tracteur_rouillé.webp")}
                            />}

                        {checkedItems.pdcConfirmeItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Tracteur Ford"
                                id="pdcConfirmeItem2"
                                description="Pouvoir exécuter 10 tractions archer ou 1 traction une main "
                                img={require("../../images/accomplissements/Tracteur_Ford.webp")}
                            />}

                        {checkedItems.pdcExpertItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Tracteur Ferrari"
                                id="pdcExpertItem2"
                                description="Pouvoir exécuter 3 traction à une main "
                                img={require("../../images/accomplissements/Tracteur_Ferrari.webp")}
                            />}

                        {checkedItems.streetliftIntermItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Distraction"
                                id="streetliftIntermItem2"
                                description="Pouvoir exécuter 1 traction à 30% PDC "
                                img={require("../../images/accomplissements/Distraction.webp")}
                            />}

                        {checkedItems.streetliftConfirmeItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Contraction"
                                id="streetliftConfirmeItem2"
                                description="Pouvoir exécuter 1 traction à 75% PDC "
                                img={require("../../images/accomplissements/Contraction.webp")}
                            />}

                        {checkedItems.streetliftExpertItem2 === true ?
                            null :
                            <Accomplissement
                                modeSombre={user.modeSombre}
                                titre="Decontraction"
                                id="streetliftExpertItem2"
                                description="Pouvoir exécuter 1 traction à 100% PDC "
                                img={require("../../images/accomplissements/Decontraction.webp")}
                            />}

                        <Accomplissement
                            modeSombre={user.modeSombre}
                            titre="ProgrArmor"
                            description="Débloquer tous les accomplissements (c'est impossible)"
                            img={require("../../images/accomplissements/ProgrArmor.webp")}
                        />



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