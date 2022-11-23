import Footer from "../Footer";
import NavigBar from "../NavigBar";
import { React, useState } from "react"
import InstallApp from "./InstallApp";

function Aide() {
    const [clickInstallApp, setClickInstallApp] = useState(false);

    function handleClickInstallApp() {
        setClickInstallApp(!clickInstallApp)
    }

    return (
        <div>
            <NavigBar location="aide" />

            <div className="basic-div">
                <h1 className="large-margin-updown"> Aide </h1>

                <h2
                    className="large-margin-bottom"
                    onClick={handleClickInstallApp}>

                    Installer l'application ProgrArmor
                    {clickInstallApp ?
                        <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                        :
                        <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.png')} />
                    }
                </h2>

                {clickInstallApp ? <InstallApp /> : null}
            </div>

            <Footer />
        </div>

    )
}

export default Aide;