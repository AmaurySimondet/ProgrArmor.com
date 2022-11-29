const Programme = require("../../schema/schemaProgramme.js");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

// Create a new Programme
exports.create = (req, res) => {
    console.log(req.body)

    // Validate request
    if (!req.body || !req.body.programme || !req.body.materiel) {
        res.json({ success: false, message: "Un ou plusieurs éléments non donnés" })
    }
    else {

        // Create a Programme
        const programme = new Programme({
            id: uuidv4(),
            createdBy: req.body.createdBy,
            materiel: req.body.materiel,
            programme: req.body.programme,
            type: req.body.type,
            niveau: req.body.niveau,
            duree: req.body.duree,
            description: req.body.description,
            titre: req.body.titre,
            seancesSemaine: req.body.seancesSemaine,
            seancesTotal: req.body.seancesTotal,
            likes: [],
            comments: []
        });

        // Save Programme in the database
        Programme.create(programme, (err, data) => {
            if (err) res.json({ success: false, message: err })
            else res.json({ success: true, message: "Programme created successfully", data: data });
        });
    }
};

// Retrieve all Programmes from the database.
exports.getProgrammes = (req, res) => {
    Programme.find({},
        (err, data) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: err })
            }
            else { return res.json({ success: true, message: "Programmes trouvés !", programmes: data }) }
        }
    )
};

async function likeProgramme(req, res) {
    let conditions = { id: req.body.programmeId }

    let programmeLikes = [];
    let userInLikes = false;
    let likeElement = {};

    //trouver le programme
    await Programme.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            programmeLikes = data[0].likes;
        }
    })

    //trouver si l'utilisateur a déjà liké
    programmeLikes.forEach(el => {
        if (el.userId === req.body.userId) {
            userInLikes = true;
            likeElement = el;
        }
    })

    //supprimer le like
    if (userInLikes) {
        update = {
            $pull: { likes: likeElement }
        }
    }

    //ajouter le like
    else {
        update = {
            $addToSet: { likes: { userId: req.body.userId, date: Date.now() } }
        }
    }

    Programme.findOneAndUpdate(
        conditions,
        update,
        (err) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: err })
            }
            else { return res.json({ success: true, message: "Like enregistré !" }) }
        }
    )

}

exports.getProgramme = (req, res) => {
    let conditions = { id: req.body.programmeId }

    //trouver le programme
    Programme.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            res.json({
                success: true, programme: data[0],
                message: "Programme trouvé !", numLikes: data[0].likes.length
            })
        }
    })
};

exports.likeProgramme = likeProgramme;