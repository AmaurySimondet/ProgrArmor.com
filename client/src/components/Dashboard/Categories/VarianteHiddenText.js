import React from "react";

function VarianteHiddenText(){
    return(
    <div className="hidden-text">
        <strong> Comment comprendre les variantes en StreetWorkout ? </strong> <br/>
        <br/>
        En StreetWorkout, le poids du corps a généralement une place plus importante que les charges. <br/>
        Afin de progresser sur les différentes figures et arriver à une position où tout le corps est aligné, <br/>
        {"il est commun d'utiliser un certain nombre de positions intermédiaires qui vont réduire le bras de levier."} <br/>
        Ces positions sont les mêmes pour toutes les figures, elles ont été décrites ci-dessous par ordre de difficulté, comme dans le bandeau déroulant <br/>
        <br/>
        TUCK <br/>
        Les hanches et les genoux sont pliés au maximum. Le dos est autorisé à arrondir, les hanches et les épaules doivent être au même niveau. <br/>
        <br/>
        ADVANCED TUCK <br/>
        {"Les hanches doivent s'ouvrir de sorte que l'angle entre les cuisses et le torse soit de 90 degrés. Le dos doit être plat."} <br/>
        <br/>
        CLOSED HIP STRADDLE <br/>
        Les hanches sont ouvertes aussi largement que possible et fléchies à 45 degrés. <br/>
        ONE LEG <br/>
        {"Une jambe est droite et alignée avec le torse, l'autre hanche et le genou sont pliés au maximum"} <br/>
        <br/>
        OPEN HIP STRADDLE <br/>
        Les hanches sont ouvertes aussi largement que possible et alignées avec le torse. <br/>
        <br/>
        ADVANCED ONE LEG <br/>
        {"Une jambe est droite et alignée avec le torse , l'autre jambe est pliée de façon à ce que son pied repose sur le genou de la jambe tendue."} <br/>
        <br/>
        HALF LAY <br/>
        Le corps est droit et seuls les genoux sont pliés. <br/>
        <br/>
        ONE LEG HALF LAY <br/>
        Le corps est droit et un seul genou est plié. <br/>
        <br/>
        FULL <br/>
        Le corps droit des épaules aux orteils. <br/>
        <br/>
        <i> {"Cliques à nouveau sur l'icone"} <img className="myDIV" src={require('../../../images/icons/icons8-question-mark-96.png')} alt="?" /> {"pour faire disparaître ce bandeau d'information"} </i>
    </div>
    )
}

export default VarianteHiddenText;