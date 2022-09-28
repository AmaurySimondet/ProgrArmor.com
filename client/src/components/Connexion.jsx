import React from "react";
import HomeHeader from "./HomeHeader.jsx"
import BoutonsSociaux from "./BoutonsSociaux.jsx"
import ConnexionForm from "./ConnexionForm.jsx"

function Connexion(){
    return(
        <div>
            <HomeHeader />

            <table className="connexion-table">
                <tbody>
                    <tr className="tr-connexion">
                        <td className="connexion-img-td">
                            <img className="connexion-img" src={require('../images/connexion.png')} alt="ad" />
                        </td>

                        <td>
                            <div className="connexion-div">
                                <div>
                                    <h1 className="h1-inscription">{"On s'connait non ?"}</h1>
                                    <h2 className="h2-inscription">Connexion</h2>
                                </div>

                                <BoutonsSociaux inscription={false} />

                                <ConnexionForm />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Connexion