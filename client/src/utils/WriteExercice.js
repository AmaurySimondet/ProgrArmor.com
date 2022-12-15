function writeSeries(series) {
    let sameReps = true;
    let sameCharge = true;

    let reps = series[0].repsTime;
    let charge = series[0].charge;
    let percent = series[0].percent;
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
        return series.length + "x" + reps + "x" + charge + "kg (" + percent + ")";
    }
    else {
        let text = "";
        series.map((serie, index) => {
            if (index > 0) {
                text += "\n";
            }
            if (index !== series.length - 1) {
                text += "1x" + serie.repsTime + "x" + serie.charge + "kg (" + serie.percent + ")" + ", ";
            }
            else {
                text += "1x" + serie.repsTime + "x" + serie.charge + "kg (" + serie.percent + ")";
            }
        })
        return text;
    }
}

function writeCategories(categories) {
    let text = "";

    categories.map((categorie, index) => {
        if (categorie.name !== "Elastique") {
            if (categorie.name === "Temps de repos entre les séries") {
                text += "Repos: ";
                if (index === categories.length - 1) {
                    text += categorie.input + "min"
                }
                else {
                    text += categorie.input + "min" + ", "
                }
            }
            else {
                if (index === categories.length - 1) {
                    text += categorie.input
                }
                else {
                    text += categorie.input + ", "
                }
            }
        }
        if (categorie.name === "Elastique") {
            if (index === categories.length - 1) {
                if (categorie.input === "mesure") {
                    text += "Elastique: {" + categorie.utilisation + ";" + categorie.estimation + "kg;mesure=" + categorie.estimation + "kg}"
                }
                else {
                    text += "Elastique: {" + categorie.utilisation + ";" + categorie.input + "kg;tension=" + categorie.tension + "m}"
                }
            }
            else {
                if (categorie.input === "mesure") {
                    text += "Elastique: {" + categorie.utilisation + ";" + categorie.estimation + ";mesure=" + categorie.estimation + "}, "
                }
                else {
                    text += "Elastique: {" + categorie.utilisation + ";" + categorie.input + ";tension=" + categorie.estimation + "}, "
                }
            }
        }
    })

    return text;
}

function includesExercice(array, exercice) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].exercice === exercice) {
            return true;
        }
    }
    return false;
}

exports.writeCategories = writeCategories;
exports.writeSeries = writeSeries;
exports.includesExercice = includesExercice;