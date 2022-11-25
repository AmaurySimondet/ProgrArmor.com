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
            likes: 0,
            comments: []
        });

        // Save Programme in the database
        Programme.create(programme, (err, data) => {
            if (err) res.json({ success: false, message: err })
            else res.json({ success: true, message: "Programme created successfully", data: data });
        });
    }
};