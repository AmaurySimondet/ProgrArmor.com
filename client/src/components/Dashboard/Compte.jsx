import {React, useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import API from "../../utils/API";

function Compte() {
    const [user, setUser] = useState({})

    async function disconnect() {
        await API.logout();
        localStorage.removeItem('token');
        window.location = "/";
    };

    async function getUser(){
        const {data} = await API.getUser();
        if (data.success === false){
            alert(data.message);
        } else {
            console.log(data.profile);
            setUser(data.profile);
        };
    }

  useEffect(() => {
        setTimeout(getUser, 50);
  }, []);

    return (
    <div>
        <NavigBar location="gear"/>

        <div className="Compte">
            <table className="profile-table">
                <tbody>
                    <tr>
                            {user.profilePic ?
                                <td className="profile-td">
                                    <img className="profile-pic" src={user.profilePic} alt="profile-pic" />
                                </td>
                            : null }

                            {user ?
                                <td className="profile-td">
                                    <h1> {user.fName} {user.lName} </h1>
                                    <h1 className="profile-email"> {user.email} </h1>
                                </td>
                            : null }

                        <td>
                            <Button className="btn btn-dark" onClick={()=>{return null}} block="true" type="submit">
                              Modifier la photo de profil
                            </Button>
                            <br/>

                            <Button className="btn btn-dark profile-btn" onClick={()=>{return null}} block="true" type="submit">
                              Modifier les infos
                            </Button>
                            <br/>

                            <Button className="btn btn-dark" onClick={()=>{return null}} block="true" type="submit">
                              Modifier le mot de passe
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="small-profile">
                {user.profilePic ?
                        <img className="profile-pic profile-pic-small" src={user.profilePic} alt="profile-pic" />
                : null }

                {user ?
                    <div>
                        <h1> {user.fName} {user.lName} </h1>
                        <h1 className="profile-email"> {user.email} </h1>
                    </div>
                : null }

                <Button className="btn btn-dark profile-btn-small" onClick={()=>{return null}} block="true" type="submit">
                  Modifier la photo de profil
                </Button>
                <br/>

                <Button className="btn btn-dark profile-btn" onClick={()=>{return null}} block="true" type="submit">
                  Modifier les infos
                </Button>
                <br/>

                <Button className="btn btn-dark" onClick={()=>{return null}} block="true" type="submit">
                  Modifier le mot de passe
                </Button>
            </div>

            <Button className="btn btn-dark btn-lg profile-disconnect-btn" onClick={disconnect} block="true" type="submit">
              Se déconnecter
            </Button>
        </div>
    </div>
    )
}

export default Compte