import React from "react";

function Bienvenue(props) {
    return (
        <div className="Dashboard">
            <h1 className="Dashboard-h1">Bienvenue !</h1>

            <h2 className="Dashboard-h2"> Les choses serieuses commencent, {"laisses moi t'expliquer ce que tu pourras trouver ici"} </h2>

            <div className="Design-welcome">
                <table className="table1">
                    <tr>
                        <td>
                            <img className={props.modeSombre === true ? "home" : "icon-navbar home"} src={require('../images/icons/home.webp')} alt='home' />
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className={props.modeSombre === true ? "questionDark fleche1" : "fleche1"} src={require('../images/icons/fleche.webp')} alt='home' />
                        </td>
                        <td>
                            {"Ça c'est l'acceuil, mais tu y es déjà ! Quand tu auras enregistré ta première séance, tu pourras y voir ton historique des seances trié comme bon te semble."}
                        </td>
                    </tr>
                </table>

                <table className="table1">
                    <tr>
                        <td>
                        </td>
                        <td>
                            <img className={props.modeSombre === true ? "home2" : "icon-navbar home2"} src={require('../images/icons/write.webp')} alt='session' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {"Ici tu pourras enregistrer tes séances. T'inquiètes pas ça va bien se passer."}
                        </td>
                        <td>
                            <img className={props.modeSombre === true ? "questionDark fleche2" : "fleche2"} src={require('../images/icons/fleche.webp')} alt='home' />
                        </td>
                    </tr>
                </table>


                <table className="table1">
                    <tr>
                        <td>
                            <img className={props.modeSombre === true ? "home" : "icon-navbar home"} src={require('../images/icons/chart.webp')} alt='stats' />
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className={props.modeSombre === true ? "questionDark fleche1" : "fleche1"} src={require('../images/icons/fleche.webp')} alt='home' />
                        </td>
                        <td>
                            {"Ça c'est l'onglet statistiques. Les statistiques c'est cool (c'est pas une blague)."}
                        </td>
                    </tr>
                </table>

                <table className="table1">
                    <tr>
                        <td>
                        </td>
                        <td>
                            <img className={props.modeSombre === true ? "home2" : "icon-navbar home2"} src={require('../images/icons/plus.webp')} alt='programme' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {"Ici tu trouveras le programme parfait parmis ceux de la communauté."}
                        </td>
                        <td>
                            <img className={props.modeSombre === true ? "questionDark fleche2" : "fleche2"} src={require('../images/icons/fleche.webp')} alt='home' />
                        </td>
                    </tr>
                </table>


                <table className="table1">
                    <tr>
                        <td>
                            <img className={props.modeSombre === true ? "home" : "icon-navbar home"} src={require('../images/icons/social.webp')} alt='social' />
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className={props.modeSombre === true ? "questionDark fleche1" : "fleche1"} src={require('../images/icons/fleche.webp')} alt='home' />
                        </td>
                        <td>
                            {"Ça c'est l'onglet social. Si tu as des amis, tu verras leur progression ici."}
                        </td>
                    </tr>
                </table>

                <table className="table1">
                    <tr>
                        <td>
                        </td>
                        <td>
                            <img className={props.modeSombre === true ? "home2" : "icon-navbar home2"} src={require('../images/icons/gear.webp')} alt='parametres' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {"Ici tu pourras paramétrer ton compte et obtenir de l'aide."}
                        </td>
                        <td>
                            <img className={props.modeSombre === true ? "questionDark fleche2" : "fleche2"} src={require('../images/icons/fleche.webp')} alt='home' />
                        </td>
                    </tr>
                </table>

                <h2 className="Dashboard-h2"> Amuses-toi bien ! </h2>

                <h3 className="Dashboard-h2"> {"Et n'oublies pas de nous suivre sur nos différents réseaux pour partager ton ressenti et ne rien rater de la suite !"} </h3>

                <div className="Design-welcome">
                    <table className="table1">
                        <tr>
                            <td>
                                <a href="https://twitter.com/ProgrArmor"><img className={props.modeSombre === true ? "social questionDark" : "social"} src={require('../images/icons/twitter.webp')} alt='twitter' /></a>
                            </td>
                            <td>
                                <a href="https://www.instagram.com/prograrmor/"><img className={props.modeSombre === true ? "social questionDark" : "social"} src={require('../images/icons/instagram.webp')} alt='instagram' /></a>
                            </td>
                            <td>
                                <a href="https://www.facebook.com/profile.php?id=100087568835793"><img className={props.modeSombre === true ? "social questionDark" : "social"} src={require('../images/icons/facebook.webp')} alt='facebook' /></a>
                            </td>
                            <td>
                                <a href="https://discord.gg/Gj98SjG8"><img className={props.modeSombre === true ? "social questionDark" : "social"} src={require('../images/icons/discord.webp')} alt='discord' /></a>
                            </td>
                            <td>
                                <a href="https://www.tiktok.com/@prograrmor"><img className={props.modeSombre === true ? "social questionDark" : "social"} src={require('../images/icons/tiktok.webp')} alt='tiktok' /></a>
                            </td>
                            <td>
                                <a href="https://www.youtube.com/@prograrmor"><img className={props.modeSombre === true ? "social questionDark" : "social"} src={require('../images/icons/youtube.webp')} alt='youtube' /></a>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Bienvenue;