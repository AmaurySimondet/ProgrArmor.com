import { React, useState, useEffect } from 'react';
import ReactCardFlip from "react-card-flip";

function ProgrammeCard(props) {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [isFlipped, setIsFlipped] = useState(false);

    function handleFlip() {
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        var timeout = false;
        window.addEventListener('resize', function () {
            clearTimeout(timeout);;
            timeout = setTimeout(handleResize, 200);
        });
    });

    return (
        <div className="react-card">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="YOUR_FRONT_CCOMPONENT" onClick={handleFlip}>
                    <div className="programme-card programme-card-explication">
                        <div style={dimensions.width > 850 ? { marginBottom: "40px" } : { marginBottom: "10px" }}>
                            <h1 style={{ marginBottom: "1rem", marginTop: "20px" }}> Titre </h1>
                            <p> Description </p>
                            <p style={{ margin: "0" }}> ID du programme</p>
                            <p style={{ margin: "0" }}> ... </p>
                        </div>

                        <div style={dimensions.width > 850 ? { marginBottom: "40px" } : { marginBottom: "10px" }}>
                            <p> Type de programme </p>
                            <p> Niveau conseillé </p>
                            <p> Séances / semaine</p>
                            <p> Durée max d'une séance</p>
                            <p> Materiel nécessaire</p>
                        </div>

                        <i style={dimensions.width < 850 ? { fontSize: "5px" } : { fontSize: "10px" }}>
                            Cliquez sur le programme pour en savoir plus
                        </i>

                        {/* PROFILE */}
                        <footer style={dimensions.width > 850 ? { position: "absolute", bottom: "20px" } : { position: "absolute", bottom: "5px" }} className="programme-card-profile">
                            <table className="basic-table">
                                <tr>
                                    <td>
                                        <img className="unknown-profile-pic profile-pic" src={require('../../images/profilepic.png')} alt='unknown-profile-pic' />
                                    </td>
                                    <td>
                                        <p style={{ margin: "auto", display: "inline-block" }}>Prénom Nom</p>
                                        <br />
                                        <p style={{ margin: "auto", display: "inline-block" }}>ID créateur</p>
                                    </td>
                                </tr>
                            </table>

                            {/* LIKE COMMENTS */}
                            <table className="basic-table">
                                <tr>
                                    <td>
                                        <img className="small-img" src={require('../../images/icons/like.png')} alt='like' />
                                    </td>
                                    <td>
                                        <p style={{ margin: "auto", fontSize: "50%" }}> Nbre de likes </p>
                                    </td>
                                    <td>
                                        <img className="small-img" src={require('../../images/icons/comment.png')} alt='comment' />
                                    </td>
                                    <td>
                                        <p style={{ margin: "auto", fontSize: "50%" }}> Nbre de commentaires </p>
                                    </td>
                                </tr>
                            </table>
                        </footer >
                    </div>
                </div>

                <div className="YOUR_BACK_COMPONENT" onClick={handleFlip}>
                    <div className="programme-card programme-card-explication">
                        <div>

                            <img className="panties" src={require('../../images/other/panties.png')} alt='panties' />
                        </div>
                    </div>
                </div>
            </ReactCardFlip >
        </div >
    )
};

export default ProgrammeCard;