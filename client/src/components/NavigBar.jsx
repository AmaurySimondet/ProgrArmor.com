import React, {useState} from "react";

function NavigBar(){
    const [gearIsClicked, setGearIsClicked] = useState(false);

    function handleClick(){
        setGearIsClicked(oldGear => {
            return !oldGear
        })
    }

    return(
    <div>
        <nav className="navbar navbar-expand navbar-light bg-light navigbar">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <a className="navbar-brand" href="/dashboard"><img className="logo-navbar" src={require('../images/icons/logo-navbar.png')} alt="logo" /></a>
            <a className="navbar-brand" href="/dashboard"><h1 className="ProgrArmor">ProgrArmor</h1></a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 navbar-elements">
              <li className="nav-item active">
                <a className="nav-link" href="/dashboard"><img className="icon-navbar" src={require('../images/icons/home.png')} alt='home' /></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/session"><img className="icon-navbar" src={require('../images/icons/write.png')} alt='session' /></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/stats"><img className="icon-navbar" src={require('../images/icons/chart.png')} alt='stats' /></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/programme"><img className="icon-navbar" src={require('../images/icons/plus.png')} alt='programme' /></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/social"><img className="icon-navbar" src={require('../images/icons/social.png')} alt='social' /></a>
              </li>
              <li className="nav-item active">
                <a onClick={handleClick} className="nav-link"><img className="icon-navbar" src={require('../images/icons/gear.png')} alt='parametres' /></a>
              </li>
            </ul>
          </div>
        </nav>

        {gearIsClicked ? (
            <div>
                <div className="gear-is-clicked"></div>

                <table className="param-choice-div">
                    <tbody>
                        <tr>
                            <td>
                                <a className="param-choice" href="/compte"> Compte </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="param-choice" href="/aide"> Aide </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="param-choice" href="/a_propos"> A propos </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="param-choice" href="/CGU"> CGU </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ) : null}
    </div>
    )
}

export default NavigBar;