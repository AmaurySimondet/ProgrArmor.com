function writeSeries(series) {
    let sameReps = true;
    let sameCharge = true;

    let reps = series[0].repsTime;
    let charge = series[0].charge;
    series.map((serie, index) => {
        if (index > 0) {
            if (serie.repsTime !== reps) {
                sameReps = false;
            }
            if (serie.charge !== charge) {
                sameCharge = false;
            }
        }
    })

    if (sameReps && sameCharge) {
        return series.length + "x" + reps + "x" + charge;
    }
    else {
        let text = "";
        series.map((serie, index) => {
            if (index > 0) {
                text += "\n";
            }
            if (index !== series.length - 1) {
                text += "1x" + serie.repsTime + "x" + serie.charge + ", ";
            }
            else {
                text += "1x" + serie.repsTime + "x" + serie.charge;
            }
        })
        return text;
    }
}

function writeCategories(categories) {
    let text = "";

    categories.map((categorie, index) => {
        if (categorie.name !== "Elastique") {
            if (index === categories.length - 1) {
                text += categorie.input
            }
            else {
                text += categorie.input + ", "
            }
        }
        else {
            if (index === categories.length - 1) {
                if (categorie.input === "mesure") {
                    text += "{" + categorie.utilisation + ";" + categorie.estimation + ";mesure=" + categorie.estimation + "}"
                }
                else {
                    text += "{" + categorie.utilisation + ";" + categorie.input + ";tension=" + categorie.estimation + "}"
                }
            }
            else {
                if (categorie.input === "mesure") {
                    text += "{" + categorie.utilisation + ";" + categorie.estimation + ";mesure=" + categorie.estimation + "}, "
                }
                else {
                    text += "{" + categorie.utilisation + ";" + categorie.input + ";tension=" + categorie.estimation + "}, "
                }
            }
        }
    })

    return text;
}

exports.writeCategories = writeCategories;
exports.writeSeries = writeSeries;