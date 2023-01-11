function writeSeries(series) {
    let sameReps = [];
    let sameCharge = [];

    let reps = series[0].repsTime;
    let charge = series[0].charge;

    for (let i = 0; i < series.length - 1; i++) {
        if (series[i].repsTime === series[i + 1].repsTime) {
            sameReps.push(i);
        }
        if (series[i].charge === series[i + 1].charge) {
            sameCharge.push(i);
        }
    }


    let text = "";
    let consecutiveSeries = 1;
    series.map((serie, index) => {
        if (index !== series.length - 1) {
            if (sameReps.includes(index) || sameCharge.includes(index)) {
                consecutiveSeries += 1;
            }
            else {
                text += consecutiveSeries + "x" + serie.repsTime + "x" + serie.charge + "kg (" + serie.percent + ")" + ", ";
                consecutiveSeries = 1;
            }
        }
        else {
            if (sameReps.includes(index) || sameCharge.includes(index)) {
                consecutiveSeries += 1;
                text += consecutiveSeries + "x" + serie.repsTime + "x" + serie.charge + "kg (" + serie.percent + ")";
            }
            else {
                text += consecutiveSeries + "x" + serie.repsTime + "x" + serie.charge + "kg (" + serie.percent + ")";
            }
        }
    })

    return text;

}

function writeSeriesProgramme(series) {
    let sameReps = [];

    for (let i = 0; i < series.length - 1; i++) {
        if (series[i].repsTime === series[i + 1].repsTime) {
            sameReps.push(i);
        }
    }


    let text = "";
    let consecutiveSeries = 1;
    series.map((serie, index) => {

        if (index !== series.length - 1) {
            if (sameReps.includes(index)) {
                consecutiveSeries += 1;
            }
            else {
                text += consecutiveSeries + "x" + serie.repsTime + ", ";
                consecutiveSeries = 1;
            }
        }
        else {
            if (sameReps.includes(index)) {
                consecutiveSeries += 1;
                text += consecutiveSeries + "x" + serie.repsTime;
            }
            else {
                text += consecutiveSeries + "x" + serie.repsTime;
            }
        }
    })

    return text;

}


function writeCategories(categories) {
    let text = "";

    console.log(categories)

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

function writeExercice(exercice) {
    let json = {}
    let series = Object.values(exercice.Series);
    let categories = Object.values(exercice.Categories);

    if (series.length > 0) {
        json.series = writeSeriesProgramme(series);
    }
    else {
        json.series = "";
    }

    if (categories.length > 0) {
        json.categories = writeCategories(categories);
    }
    else {
        json.categories = "";
    }

    if (exercice.exercice.muscle) {
        json.exercice = exercice.exercice.name + " - " + exercice.exercice.muscle;
        return json;
    }
    else if (exercice.exercice.ownExercice) {
        json.exercice = exercice.exercice.ownExercice;
        return json;
    }
    else if (exercice.exercice.name) {
        json.exercice = exercice.exercice.name;
        return json;
    }
    else {
        json.exercice = "";
        return json;
    }
}

exports.writeCategories = writeCategories;
exports.writeSeries = writeSeries;
exports.includesExercice = includesExercice;
exports.writeExercice = writeExercice;