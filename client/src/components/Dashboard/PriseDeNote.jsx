import { React, useState, useEffect } from "react";
import PriseDeNoteHiddenText from "./PriseDeNoteHiddenText";

function PriseDeNote(props) {
    const [note, setNote] = useState();
    const [clicked, setClicked] = useState("hide");

    function handleClickQuestion() {
        if (clicked === "hide") {
            setClicked("nothide");
        } else { setClicked("hide") };
    }


    function handleNoteChange(event) {
        setNote(event.target.value);
    }

    function handleSubmitNotes() {
        return null
    }


    return (
        <div className="basic-div">

            <table className="basic-table">
                <col style={{ width: "90%" }} />
                <col style={{ width: "10%" }} />
                <tr>
                    <td>
                        <h1>
                            Prise de note rapide
                        </h1>
                    </td>
                    <td>
                        <img className={props.modeSombre === true ? "myDIV questionDark" : "myDIV"} onClick={handleClickQuestion} src={require('../../images/icons/icons8-question-mark-96.png')} alt="?" />
                    </td>
                </tr>
            </table>

            <p>
                <div className={clicked} style={{ marginTop: "10px", width: "100%" }}>
                    <PriseDeNoteHiddenText />
                </div>
            </p>




            <textarea
                name="note"
                value={note}
                className="inputDark form-control"
                onChange={handleNoteChange}
                placeholder="Saisissez votre note ici"
                rows="10"
                cols="50"
            />

            <button className="btn btn-black large-margin-updown" onClick={handleSubmitNotes}>
                Valider et générer la séance
            </button>
        </div >
    )
}

export default PriseDeNote;