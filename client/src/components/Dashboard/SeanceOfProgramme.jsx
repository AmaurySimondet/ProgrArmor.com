import { React, useState, useEffect } from 'react';

function SeanceOfProgramme(props) {

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

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

    function handleClickPoubelle() {
        props.handleDeleteSeance(props.id);
    }

    function getMarginTop() {
        if (dimensions.width > 900) {
            return "40px";
        } else {
            return "5%";
        }
    }


    return (
        <div>

            <h1 id="seanceTitle" style={{ display: "inline-block" }}>Seance {props.index + 1}</h1>

            <img className={props.modeSombre === true ? "poubelleDark " : "poubelle"}
                onClick={handleClickPoubelle}
                style={{ float: "right", display: "inline-block", height: "10%", marginTop: getMarginTop() }}
                src={require('../../images/icons/icons8-trash-30.webp')}
                alt="Poubelle" />

            <h1>{props.seance.id}</h1>
        </div>
    )
}

export default SeanceOfProgramme;