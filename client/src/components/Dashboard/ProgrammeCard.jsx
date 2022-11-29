import { React, useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

function ProgrammeCard(props) {
    const [programme, setProgramme] = useState(props.programme);
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
                    <div className="programme-card">
                        <div style={dimensions.width > 850 ? { marginBottom: "40px" } : { marginBottom: "10px" }}>
                            <h1 style={{ marginBottom: "1rem", marginTop: "20px" }}>{programme.titre ? programme.titre : "Programme sans titre"} </h1>
                            <p>{programme.description ? programme.description : "/"} </p>
                            <p>{programme.id}</p>
                        </div>

                        <div style={dimensions.width > 850 ? { marginBottom: "40px" } : { marginBottom: "10px" }}>
                            <p>{programme.type}</p>
                            <p>{programme.niveau}</p>
                            <p>{programme.seancesSemaine}</p>
                            <p>{programme.duree}</p>
                            {programme.materiel.map((materiel, index) => {
                                if (index <= 3) {
                                    return <p style={{ overflow: "hidden", margin: "0" }}>{materiel.slice(0, 40)}</p>
                                }
                                if (index === 4) {
                                    return <p style={{ overflow: "hidden", margin: "0" }}>...</p>
                                }
                            }
                            )}
                        </div>

                        <i style={dimensions.width < 850 ? { fontSize: "5px" } : { fontSize: "10px" }}>
                            Cliquez sur le programme pour en savoir plus
                        </i>

                        {/* PROFILE */}
                        <footer style={dimensions.width > 850 ? { position: "absolute", bottom: "20px" } : { position: "absolute", bottom: "5px" }} className="programme-card-profile">
                            <table className="basic-table">
                                <tr>
                                    <td>
                                        <img
                                            className="profile-pic"
                                            src="https://i0.wp.com/j19agriculture.com/wp-content/uploads/2020/06/ProfilePic.jpg?ssl=1"
                                            alt="profile-pic"
                                        />
                                    </td>
                                    <td>
                                        <p style={{ margin: "auto", display: "inline-block" }}>Jean Michel</p>
                                        <br />
                                        <p style={{ margin: "auto", display: "inline-block" }}>123456</p>
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
                                        <p style={{ margin: "auto" }}> 0 </p>
                                    </td>
                                    <td>
                                        <img className="small-img" src={require('../../images/icons/comment.png')} alt='comment' />
                                    </td>
                                    <td>
                                        <p style={{ margin: "auto" }}> 0 </p>
                                    </td>
                                </tr>
                            </table>
                        </footer>

                    </div >
                </div>


                <div className="YOUR_BACK_COMPONENT" onClick={handleFlip}>
                    <div className="programme-card">
                        <h1>Yo</h1>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
    )
};

export default ProgrammeCard;