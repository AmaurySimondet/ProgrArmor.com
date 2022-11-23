import Footer from "../Footer";
import NavigBar from "../NavigBar";
import { React, useState, useEffect } from "react"
import InstallApp from "./Help/InstallApp";
import API from "../../utils/API";

function Aide() {
    const [clickInstallApp, setClickInstallApp] = useState(false);
    const [user, setUser] = useState();

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

    function handleClickInstallApp() {
        setClickInstallApp(!clickInstallApp)
    }

    useEffect(() => {
        getUser();
    }, [])

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

                {clickInstallApp ? <InstallApp modeSombre={user ? user.modeSombre === true ? true : false : false} /> : null}
            </div>

            <Footer />
        </div>

    )
}

export default Aide;