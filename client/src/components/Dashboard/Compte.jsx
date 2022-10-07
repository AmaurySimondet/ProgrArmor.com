import {React, useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import API from "../../utils/API";

function Compte() {
    const [user, setUser] = useState({})
    const [formInfo, setFormInfo] = useState({})
    const [modifyInfo, setModifyInfo] = useState(false);

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

  function handleChange(event){
    event.preventDefault();

    setFormInfo(oldFormInfo => {
            return ({
            ...oldFormInfo,
            [event.target.id]: event.target.value,
        })});
  }

  function handleModifyForm(){
    setModifyInfo(!modifyInfo);
  }

  function handleClickFormInfo(formInfo){
    return alert("Pas encore disponible !")
  }

    return (
    <div>
        <NavigBar location="gear"/>

        {modifyInfo ?
        <form className="modify-info-form">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
                Prénom
            </label>
            <div className="col-sm-10">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Monsieur"
                  value={formInfo.fName}
                  id="fName"
                  onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
                Nom
            </label>
            <div className="col-sm-10">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Fonte"
                  value={formInfo.lName}
                  id="lName"
                  onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
                email
            </label>
            <div className="col-sm-10">
              <input
                  type="email"
                  className="form-control"
                  placeholder="argent@abonnés.com"
                  value={formInfo.email}
                  id="email"
                  onChange={handleChange}
              />
            </div>
          </div>
          <Button className="btn btn-dark btn-lg" onClick={handleClickFormInfo} block="true" type="submit">
              Appliquer les modifications
          </Button>
          <br/>
          <Button className="btn btn-dark btn-lg btn-arriere" onClick={handleModifyForm} block="true" type="submit">
              Revenir en arrière
          </Button>
        </form>
        :
            <div className="Compte">
                <table className="profile-table">
                    <tbody>
                        <tr>
                                {user.profilePic ?
                                    <td className="profile-td">
                                        <img className="profile-pic" src={user.profilePic} alt="profile-pic" />
                                    </td>
                                :
                                    <td>
                                        <img className="unknown-profile-pic profile-pic" src={require('../../images/profilepic.png')} alt='unknown-profile-pic' />
                                    </td>
                                }

                                {user ?
                                    <td className="profile-td">
                                        <h1> {user.fName} {user.lName} </h1>
                                        <h1 className="profile-email"> {user.email} </h1>
                                    </td>
                                : null }

                            <td>

                                <Button className="btn btn-dark profile-btn" onClick={handleModifyForm} block="true" type="submit">
                                  Modifier les infos
                                </Button>
                                <br/>

                                <Button className="btn btn-dark" onClick={handleClickFormInfo} block="true" type="submit">
                                  Modifier le mot de passe
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="small-profile">
                    {user.profilePic ?
                            <img className="profile-pic profile-pic-small" src={user.profilePic} alt="profile-pic" />
                    :
                            <img className="unknown-profile-pic profile-pic profile-pic-small" src={require('../../images/profilepic.png')} alt='unknown-profile-pic' />
                    }

                    {user ?
                        <div>
                            <h1> {user.fName} {user.lName} </h1>
                            <h1 className="profile-email"> {user.email} </h1>
                        </div>
                    : null }

                    <Button className="btn btn-dark profile-btn profile-btn-small" onClick={handleModifyForm} block="true" type="submit">
                      Modifier les infos
                    </Button>
                    <br/>

                    <Button className="btn btn-dark" onClick={handleClickFormInfo} block="true" type="submit">
                      Modifier le mot de passe
                    </Button>
                </div>

                <Button className="btn btn-dark btn-lg profile-disconnect-btn" onClick={disconnect} block="true" type="submit">
                  Se déconnecter
                </Button>
            </div>
        }
    </div>
    )
}

export default Compte