import { React, useState, useEffect } from 'react';

function SeanceOfProgramme(props) {

    function handleClickPoubelle() {
        props.handleDeleteSeance(props.id);
    }

    return (
        <div>
            <div className='form-group row'>
                <div className='col-10'>
                    <h1>Seance {props.index + 1}</h1>
                </div>
                <div className='col-2' style={{ margin: "auto" }}>
                    <img className={props.modeSombre === true ? "poubelleDark " : "poubelle"}
                        onClick={handleClickPoubelle}
                        src={require('../../images/icons/icons8-trash-30.png')}
                        alt="Poubelle" />
                </div>

            </div>

            <h1>{props.seance.id}</h1>
        </div>
    )
}

export default SeanceOfProgramme;