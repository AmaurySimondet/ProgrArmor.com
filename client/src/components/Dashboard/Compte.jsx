import {React, useState, useEffect, useRef} from "react";
import { Button } from "react-bootstrap";
import NavigBar from "../NavigBar.jsx"
import API from "../../utils/API";
import Footer from "../Footer.jsx";
import { Upload } from "upload-js";
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red['A700'],
    '&:hover': {
      backgroundColor: alpha(red['A700'], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red['A700'],
  },
}));

function Compte() {
    const upload = Upload({ apiKey: "free" });
    const inputFile = useRef(null);
    const [text, setText] = useState();
    const [user, setUser] = useState({})
    const [formInfo, setFormInfo] = useState({})
    const [modifyInfo, setModifyInfo] = useState(false);
    const [switched, setSwitched] = useState();

    async function updateMode(){
      if(switched!=user.modeSombre){
        const res = await API.modifyUser({id: localStorage.getItem("id"), modeSombre: ""+switched})
        console.log(res)

        window.location = '/compte'
      }
    }

    function handleChangeSwitch(event){
      event.preventDefault();

      setSwitched(!switched);
    }

    useEffect(()=>{
      updateMode();
    },[switched])

    async function disconnect() {
        await API.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        window.location = "/";
    };

    async function getUser(){
        const {data} = await API.getUser({id: localStorage.getItem("id")});
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

  async function handleClickUpdateUser(event){
    event.preventDefault();

    console.log(formInfo)
    let {fName, lName, email} = formInfo;

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return alert("Email au mauvais format !")
    if (!email || email.length === 0) return alert("Aucun email fourni !");
    if (!fName || fName.length === 0) return alert("Aucun prénom fourni !");
    if (!lName || lName.length === 0) return alert("Aucun mom fourni !");

    else{
      const res = await API.modifyUser({id: localStorage.getItem("id"), fName: fName, lName: lName, email: email})
      console.log(res)

      window.location = "/compte"
    }
  }

  function handleClickFormInfo(formInfo){
    return alert("Pas encore disponible !")
  }

  const boxRef = useRef();

  // X
  const [x, setX] = useState();

  // Y
  const [y, setY] = useState();

  // This function calculate X and Y
  const getPosition = () => {
    const x = boxRef.current.offsetLeft;
    setX(x);

    const y = boxRef.current.offsetTop;
    setY(y);
  };

  // Get the position of the red box in the beginning
  useEffect(() => {
    getPosition();
  }, []);

  // Re-calculate X and Y of the red box when the window is resized by the user
  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);


  async function onFileSelected(event) {
      const [ file ]    = event.target.files;
      const { fileUrl } = await upload.uploadFile(
        file,
        {
          onBegin:    ({ cancel })   => setText("File upload started!"),
          onProgress: ({ progress }) => setText(`File uploading... ${progress}%`)
        }
      );
      setText(`File uploaded!`);

      const res = await API.modifyUser({id: localStorage.getItem("id"), profilePic: fileUrl})
      console.log(res)

      window.location = "/compte"
  }

    return (
    <div>
        <NavigBar show={true} location="gear"/>
        <div ref={boxRef}></div>

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
              <Button className="btn btn-dark btn-lg" onClick={handleClickUpdateUser} block="true" type="submit">
                  Appliquer les modifications
              </Button>
              <br/>
              <Button className="btn btn-dark btn-lg btn-arriere" onClick={handleModifyForm} block="true" type="submit">
                  Revenir en arrière
              </Button>
            </form>
        :
            <div className="Compte">
                <input style={{display: "none"}} type="file" onChange={onFileSelected} ref={inputFile} />

                <table className="profile-table">
                    <tbody>
                        <tr>

                                {user.profilePic ?
                                    <td className="profile-td">
                                        <div onClick={() => inputFile.current.click()} className="relative">
                                          <img className="inner-img" src={require('../../images/icons/camera.png')} alt="camera" />
                                          <img className="profile-pic" src={user.profilePic} alt="profile-pic" />
                                          <p> {text} </p>
                                        </div>
                                    </td>
                                :
                                    <td>
                                        <div onClick={() => inputFile.current.click()} className="relative">
                                          <img className="inner-img" src={require('../../images/icons/camera.png')} alt="camera" />
                                          <img className="unknown-profile-pic profile-pic" src={require('../../images/profilepic.png')} alt='unknown-profile-pic' />
                                          <p> {text} </p>
                                        </div>
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

                                <p className="session-div-switch"> 
                                  Mode clair 
                                  <GreenSwitch onChange={handleChangeSwitch} checked={!!user.modeSombre}/>
                                  Mode Sombre 
                                </p>

                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="small-profile">

                    {user.profilePic ?
                          <div onClick={() => inputFile.current.click()} className="relative">
                            <img className="inner-img" src={require('../../images/icons/camera.png')} alt="camera" />
                            <img className="profile-pic profile-pic-small" src={user.profilePic} alt="profile-pic" />
                            <p> {text} </p>
                          </div>
                    :
                          <div onClick={() => inputFile.current.click()} className="relative">
                            <img className="inner-img" src={require('../../images/icons/camera.png')} alt="camera" />
                            <img className="unknown-profile-pic profile-pic profile-pic-small" src={require('../../images/profilepic.png')} alt='unknown-profile-pic' />
                            <p> {text} </p>
                          </div>
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

                    <p className="session-div-switch"> 
                      Mode clair 
                      <GreenSwitch onChange={handleChangeSwitch} checked={!!user.modeSombre}/> 
                      Mode Sombre </p>
                </div>

                <Button className="btn btn-dark btn-lg profile-disconnect-btn" onClick={disconnect} block="true" type="submit">
                  Se déconnecter
                </Button>
            </div>
        }

        <Footer warnref={y}/>
    </div>
    )
}

export default Compte