import { React, useState } from 'react';

function ProgrammeCard(props) {
    const [programme, setProgramme] = useState(props.programme);

    console.log(programme)

    return (
        <div className="programme-card">
            <div>
                <h1 style={{ marginBottom: "1rem", marginTop: "20px" }}>{programme.titre ? programme.titre : "Programme sans titre"} </h1>
                <p>{programme.description ? programme.description : "/"} </p>
                <p>{programme.id}</p>
            </div>

            <div style={{ margin: "40px" }}>
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

            {/* PROFILE */}
            <footer style={{ position: "absolute", bottom: "20px" }}>
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


            {/* 
            <img
                style={{ width: "20px" }}
                src={require('../../images/icons/flip.png')}
                alt="flip"
            /> */}


        </div >
    )
};

export default ProgrammeCard;