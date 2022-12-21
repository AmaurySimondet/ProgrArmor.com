import { React, useState, useEffect } from 'react';

function Accomplissement(props) {
    return (
        <div data-panel="{&quot;autoFocus&quot;:true,&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="achieveRow">
            <div class="achieveImgHolder">
                <img src={props.img} style={props.accomplished ? null : { filter: "grayscale(0.85)" }} />
            </div>
            <div class="achieveTxtHolder">
                <div class="achieveTxt">
                    <h3 class="ellipsis">{props.titre}</h3>
                    <h5>
                        {props.description}
                    </h5>
                </div>

                {/* <div class="achieveUnlockTime">
                    {props.date ? "Débloqué le " + props.date : null}

                </div> */}
            </div>
        </div>
    )
}

export default Accomplissement;