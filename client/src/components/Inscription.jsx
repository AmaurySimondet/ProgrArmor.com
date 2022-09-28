import React from "react";
import HomeHeader from "./HomeHeader.jsx"
import BoutonsSociaux from "./BoutonsSociaux.jsx"
import InscriptionForm from "./InscriptionForm.jsx"

function Inscription(){

    return(
        <div>
            <HomeHeader />

            <table className="hometable">
                <tbody>
                    <tr>
                        <td>
                            <div className="inscription-div">
                                <div>
                                    <h1 className="h1-inscription">Inscris toi !</h1>
                                    <h2 className="h2-inscription">Armes toi avec les meilleurs outils pour ta progression</h2>
                                </div>

                                <BoutonsSociaux inscription={true} />

                                <InscriptionForm />
                            </div>
                        </td>

                        <td className="inscription-img-td">
                            <img className="inscription-img" src={require('../images/inscription.png')} alt="ad" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Inscription;