import AccessoireObjets from "./AccessoireObjet.js";
import lesTypesBarres from "./TypesBarres.js";
import lesElastiques from "./Elastiques.js";
import Streetworkout from "./StreetWorkout.js";
import MusclesCategorie from "./MusclesCategorie.js";
import PositionCorps from "./PositionCorps.js";
import PositionBras from "./PositionBras.js";
import PositionJambes from "./PositionJambes.js";
import PositionMains from "./PositionMains.js";
import PositionPieds from "./PositionPieds.js";
import AxeCategorie from "./AxeCategorie.js";
import CoudeGenou from "./CoudeGenou.js";
import Unilateral from "./Unilateral.js";
import Execution from "./ExecutionCategorie.js";
import ExecutionSpecifique from "./ExecutionSpecifique.js";
import PriseCategorie from "./PriseCategorie.js";
import TempoCategorie from "./TempoCategorie.js";
import Partiel from "./Partiel.js";
import DépartCategorie from "./DépartCategorie.js";
import ExplosifCategorie from "./ExplosifCategorie.js";
import Halterophilie from "./Halterophilie.js";
import RPE from "./RPE.js";
import Douleur from "./Douleur.js";

let AllCategories = []


AllCategories.push({
    id: "name",
    className: "select-title",
    label: "Tous (défaut)",
    value: "title",
},



    {
        id: "name",
        className: "select-title",
        label: "",
        value: "title",
    },
    {
        id: "name",
        className: "select-title",
        label: "Aucune",
        value: "title",
    },
    {
        id: "name",
        className: "select-item",
        label: "Aucune",
        value: "Aucune",
    },




    {
        id: "name",
        className: "select-title",
        label: "",
        value: "title",
    },
    {
        id: "name",
        className: "select-title",
        label: "Muscle",
        value: "title",
    })
MusclesCategorie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Muscle" });
})




AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
},
    {
        id: "name",
        className: "select-title",
        label: "Positionnement",
        value: "title",
    },
    {
        id: "name",
        className: "select-title",
        label: "Positionnement du corps",
        value: "Positionnement du corps",
    }
)
PositionCorps.forEach(obj => {
    AllCategories.push({ ...obj, name: "Positionnement du corps" });
})
AllCategories.push(
    {
        id: "name",
        className: "select-title",
        label: "",
        value: "title",
    }, {
    id: "name",
    className: "select-title",
    label: "Positionnement des bras",
    value: "Positionnement des bras",
})
PositionBras.forEach(obj => {
    AllCategories.push({ ...obj, name: "Positionnement des bras" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Positionnement des jambes",
    value: "Positionnement des jambes",
})
PositionJambes.forEach(obj => {
    AllCategories.push({ ...obj, name: "Positionnement des jambes" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Positionnement des mains",
    value: "Positionnement des mains",
})
PositionMains.forEach(obj => {
    AllCategories.push({ ...obj, name: "Positionnement des mains" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Positionnement des pieds",
    value: "Positionnement des pieds",
})
PositionPieds.forEach(obj => {
    AllCategories.push({ ...obj, name: "Positionnement des pieds" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Ouverture coudes / genoux",
    value: "Ouverture coudes / genoux",
})
CoudeGenou.forEach(obj => {
    AllCategories.push({ ...obj, name: "Ouverture coudes / genoux" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Placement et axe du corps / banc / barre",
    value: "Placement et axe du corps / banc / barre",
})
AxeCategorie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Placement et axe du corps / banc / barre" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Type de prise",
    value: "Type de prise",
})
PriseCategorie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Type de prise" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Point de départ",
    value: "Point de départ",
})
DépartCategorie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Point de départ" });
})




AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
},
    {
        id: "name",
        className: "select-title",
        label: "Materiel",
        value: "title",
    })
AllCategories.push({
    id: "name",
    className: "select-item",
    label: "Type de barre / poids / machine",
    value: "Type de barre / poids",
})
lesTypesBarres.forEach(obj => {
    AllCategories.push({ ...obj, name: "Type de barre / poids" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Elastique",
    value: "Elastique",
})
lesElastiques.forEach(obj => {
    AllCategories.push({ ...obj, name: "Elastique" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Accessoire supplémentaire ou objet spécifique",
    value: "Accessoire supplémentaire ou objet spécifique",
})
AccessoireObjets.forEach(obj => {
    AllCategories.push({ ...obj, name: "Accessoire supplémentaire ou objet spécifique" });
})






AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
},
    {
        id: "name",
        className: "select-title",
        label: "Forme",
        value: "title",
    })
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "Forme",
    value: "title",
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Unilatéral",
    value: "Unilatéral",
})
Unilateral.forEach(obj => {
    AllCategories.push({ ...obj, name: "Unilatéral" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Type d'éxecution",
    value: "Type d'éxecution",
})
Execution.forEach(obj => {
    AllCategories.push({ ...obj, name: "Type d'éxecution" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Type d'éxecution spécifique",
    value: "Type d'éxecution spécifique",
})
ExecutionSpecifique.forEach(obj => {
    AllCategories.push({ ...obj, name: "Type d'éxecution spécifique" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Tempo",
    value: "Tempo",
})
TempoCategorie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Tempo" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Forme (Partiel)",
    value: "Forme (Partiel)",
})
Partiel.forEach(obj => {
    AllCategories.push({ ...obj, name: "Forme (Partiel)" });
})






AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
},
    {
        id: "name",
        className: "select-title",
        label: "Spécifique",
        value: "title",
    })
AllCategories.push({
    id: "name",
    className: "select-item",
    label: "Variante Street Workout",
    value: "Variante Street Workout",
})
Streetworkout.forEach(obj => {
    AllCategories.push({ ...obj, name: "Variante Street Workout" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Variante d'exercice explosif",
    value: "Variante d'exercice explosif",
})
ExplosifCategorie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Variante d'exercice explosif" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Variante d'exercice d'haltérophilie",
    value: "Variante d'exercice d'haltérophilie",
})
Halterophilie.forEach(obj => {
    AllCategories.push({ ...obj, name: "Variante d'exercice d'haltérophilie" });
})




AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
},
    {
        id: "name",
        className: "select-title",
        label: "Detail",
        value: "title",
    },
    {
        id: "name",
        className: "select-item",
        label: "Temps de repos entre les séries",
        value: "Temps de repos entre les séries",
    })
AllCategories.push({
    id: "name",
    className: "select-item",
    label: "RPE / Niveau d'intensité",
    value: "RPE / Niveau d'intensité",
})
RPE.forEach(obj => {
    AllCategories.push({ ...obj, name: "RPE / Niveau d'intensité" });
})
AllCategories.push({
    id: "name",
    className: "select-title",
    label: "",
    value: "title",
}, {
    id: "name",
    className: "select-title",
    label: "Gêne / douleur / blessure",
    value: "Gêne / douleur / blessure",
})
Douleur.forEach(obj => {
    AllCategories.push({ ...obj, name: "Gêne / douleur / blessure" });
})


//get rid of / défaut
AllCategories.forEach((obj, indexObj) => {
    if (obj.label === "/ (défaut)") {
        delete AllCategories[indexObj]
    }
})

//keep unique
let AllCategoriesUniqueLabels = [];
AllCategories.forEach(obj => {
    let stringRes = JSON.stringify(AllCategoriesUniqueLabels)
    if (!stringRes.includes(obj.label) || obj.label === "") {
        AllCategoriesUniqueLabels.push(obj)
    }
})

export default AllCategoriesUniqueLabels;