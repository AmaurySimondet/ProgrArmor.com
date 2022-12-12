import { React, useState, useEffect } from "react";
import HomeHeader from "./HomeHeader.jsx"
import BoutonsSociaux from "./BoutonsSociaux.jsx"
import ConnexionForm from "./ConnexionForm.jsx"
import Footer from "./Footer.jsx";
import API from "../utils/API.js";

function Connexion() {
    const [mdpClicked, setMdpClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(60);
    const [sentClicked, setSentClicked] = useState(false);

    function handleClickMdp() {
        setMdpClicked(!mdpClicked);
    }

    async function handleForgotPassword() {
        const { data } = await API.getUser({ email: email });

        if (data.success === true) {
            setSentClicked(true);
            launchTimer();
        }
        else {
            alert("Aucune adresse mail correspondante");
        }
    }

    function launchTimer() {
        let interval = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);

    }

    useEffect(() => {
        if (timer <= 0) {
            setSentClicked(false);
            setTimer(60);
        }
    }, [timer]);


    return (
        <div>
            <HomeHeader />

            <table className="connexion-table">
                <tbody>
                    <tr className="tr-connexion">
                        <td className="connexion-img-td">
                            <img className="connexion-img" src={require('../images/connexion.webp')} alt="ad" />
                        </td>

                        <td>

                            {mdpClicked ?
                                <div className="basic-div">

                                    <h1 className="h1-inscription"> J'y penses et puis j'oublie </h1>
                                    <h2 className="h2-inscription"> Je t'envoies un mail de récupération chef </h2>

                                    <button onClick={handleClickMdp}
                                        className="btn btn-dark large-margin-updown">
                                        Retour </button>

                                    <input
                                        className="form-control"
                                        placeholder="Ton email"
                                        onChange={e => setEmail(e.target.value)}
                                    ></input>

                                    {sentClicked ?
                                        <div>
                                            <p className="basic-margin-top">
                                                Un mail de récupération a été envoyé à l'adresse
                                                {" " + email + " "}.
                                                Vérifies tes spams aussi au cas où !
                                                Tu pourras renvoyer un mail dans 60 secondes.
                                            </p>

                                            <button className="btn btn-dark basic-margin-updown" disabled>
                                                {timer}
                                            </button>

                                        </div>
                                        :
                                        <button
                                            onClick={handleForgotPassword}
                                            className="btn btn-dark large-margin-updown">
                                            Envoyer </button>
                                    }

                                </div>

                                :
                                <div className="connexion-div">
                                    <div>
                                        <h1 className="h1-inscription">{"On s'connait non ?"}</h1>
                                        <h2 className="h2-inscription">Connexion</h2>
                                    </div>

                                    <BoutonsSociaux inscription={false} />

                                    <ConnexionForm handleClickMdp={handleClickMdp} />
                                </div>

                            }


                        </td>
                    </tr>
                </tbody>
            </table>

            <Footer />
        </div>
    )
}

export default Connexion