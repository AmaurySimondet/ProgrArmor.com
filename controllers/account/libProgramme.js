const Programme = require("../../schema/schemaProgramme.js");
const Comment = require("../../schema/schemaComment.js");
const Like = require("../../schema/schemaLike.js");
const User = require("../../schema/schemaUser.js");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const getConditions = require("../utils/programme.js").getConditions

const app = express();

// Create a new Programme
async function create(req, res) {
    // Validate request
    if (!req.body || !req.body.programme || !req.body.materiel) {
        console.log(req.body)
        return res.json({ success: false, message: "Un ou plusieurs éléments non donnés" })
    }
    else {
        // Create a Programme
        const programme = new Programme({
            id: req.body.programmeId,
            createdBy: req.body.createdBy,
            materiel: req.body.materiel,
            programme: req.body.programme,
            type: req.body.type,
            niveau: req.body.niveau,
            duree: parseInt(req.body.duree),
            description: req.body.description,
            titre: req.body.titre,
            seancesSemaine: parseInt(req.body.seancesSemaine),
            seancesTotal: parseInt(req.body.seancesTotal),
            likes: [],
            comments: []
        });

        await programme.save({ runValidators: true }, (err) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: err })
            }
            else {
                User.findOneAndUpdate({ _id: req.body.createdBy }, { $addToSet: { programmes: programme._id } }, (err) => {
                    if (err) {
                        return res.json({ success: false, message: err })
                    }
                    else {
                        return res.json({ success: true, message: "Programme créé" })
                    }
                })
            }
        })
    }
};

// Retrieve all Programmes from the database.
exports.getProgrammes = (req, res) => {
    let conditions = {};
    if (req.body) {
        conditions = getConditions(req)
    }

    console.log("conditions", conditions)

    Programme.find(conditions,
        (err, data) => {
            if (err) {

                return res.json({ success: false, message: err })
            }
            else {
                if (req.body.tri) {
                    console.log("tri", req.body.tri)
                    if (req.body.tri.value === "mostLiked") {
                        data.sort((a, b) => b.likes.length - a.likes.length)
                    }
                    else if (req.body.tri.value === "mostRecent") {
                        data.sort((a, b) => b.createdAt - a.createdAt)
                    }
                    else if (req.body.tri.value === "mostCommented") {
                        data.sort((a, b) => b.comments.length - a.comments.length)
                    }
                    else if (req.body.tri.value === "oldest") {
                        data.sort((a, b) => a.createdAt - b.createdAt)
                    }
                }
                else {
                    data.sort((a, b) => b.likes.length - a.likes.length)
                }
                return res.json({ success: true, message: "Programmes trouvés !", programmes: data })
            }
        }
    )
};

async function likeProgramme(req, res) {
    let conditions = { programme: req.body.programmeId, user: req.body.userId }

    let likeData = [];
    let likeElement = {};

    //trouver le programme s'il est liké par user
    await Like.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            likeData = data;
        }
    })

    //si le programme est liké par user, supprimer le like
    if (likeData.length > 0) {
        let deleteEl = { programme: likeData[0].programme, user: likeData[0].user }

        await Like.deleteOne(deleteEl, function (err, data) {
            if (err) {
                res.json({ success: false, message: err })
            }
            else {
                res.json({ success: true, message: "Like supprimé" })
            }
        })
    }

    //sinon, ajouter le like
    else {
        likeElement = new Like({
            id: uuidv4(),
            programme: req.body.programmeId,
            user: req.body.userId
        })

        await likeElement.save((err) => {
            if (err) {
                res.json({ success: false, message: err })
            }
            else {
                res.json({ success: true, message: "Like ajouté" })
            }
        })
    }
}

//get programme by its id
exports.getProgramme = (req, res) => {
    let conditions = { _id: req.body.programmeId, createdBy: req.body.createdBy }

    //trouver le programme
    Programme.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            if (data[0]) {
                res.json({
                    success: true, programme: data[0],
                    message: "Programme trouvé !", numLikes: data[0].likes.length
                })
            }
            else {
                res.json({ success: false, message: "Programme non trouvé (il t'appartient surement pas !)" })
            }
        }
    })
};

//delete programme by its id
exports.deleteProgramme = (req, res) => {
    let conditions = { _id: req.body.programmeId, createdBy: req.body.createdBy }
    //trouver le programme
    Programme.deleteOne(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            res.json({ success: true, message: "Programme supprimé !" })
        }
    })
};

//get programme by user id
exports.getProgrammesByUser = (req, res) => {
    let conditions = { createdBy: req.body.userId }
    // console.log(conditions)

    //trouver le programme
    Programme.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            res.json({
                success: true, programmes: data,
                message: "Programme trouvé !"
            })
        }
    })
};

// exports.editDB2 = (req, res) => {
//     User.updateMany({}, { $set: { programmes: [] } }, (err) => {
//         if (err) {
//             res.json({ success: false, message: err })
//         }
//         else {
//             res.json({ success: true, message: "Users updated" })
//         }
//     })
// }

async function isProgrammeLiked(req, res) {
    let conditions = { programme: req.body.programmeId, user: req.body.userId }

    await Like.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {

            if (data.length > 0) {
                res.json({ success: true, message: "Programme liké", liked: true })
            }
            else {
                res.json({ success: true, message: "Programme non liké", liked: false })
            }
        }
    })
}

async function isProgrammeCommented(req, res) {
    let conditions = { programme: req.body.programmeId, user: req.body.userId }

    await Comment.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            if (data.length > 0) {
                res.json({ success: true, message: "Programme commenté", commented: true })
            }
            else {
                res.json({ success: true, message: "Programme non commenté", commented: false })
            }
        }
    })
}

async function getProgrammeLikes(req, res) {
    let conditions = { programme: req.body.programmeId }

    await Like.find(conditions, function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            res.json({ success: true, message: "Likes trouvés", likes: data.length })
        }
    })
}

async function whoLiked(req, res) {
    let conditions = { programme: req.body.programmeId }

    await Like.find(conditions).populate('user').exec(function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {


            res.json({ success: true, message: "Likes trouvés", whoLiked: data })
        }
    })
}

async function getProgrammeCreator(req, res) {
    let conditions = { _id: req.body.programmeId }

    await Programme.find(conditions).populate('createdBy').exec(function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            res.json({ success: true, message: "Créateur trouvé", creator: data[0].createdBy })
        }
    })
}

async function sendComment(req, res) {
    let comment = new Comment({
        id: uuidv4(),
        programme: req.body.programmeId,
        user: req.body.userId,
        comment: req.body.comment
    })

    await comment.save((err) => {
        if (err) {
            console.log(err)
            res.json({ success: false, message: err.Error })
        }
        else {
            res.json({ success: true, message: "Commentaire ajouté" })
        }
    })
}

async function getComments(req, res) {
    let conditions = { programme: req.body.programmeId }

    await Comment.find(conditions).populate('user').exec(function (err, data) {
        if (err) {
            res.json({ success: false, message: err })
        }
        else {
            res.json({ success: true, message: "Commentaires trouvés", comments: data })
        }
    })
}



exports.likeProgramme = likeProgramme;
exports.create = create;
exports.isProgrammeLiked = isProgrammeLiked;
exports.getProgrammeLikes = getProgrammeLikes;
exports.whoLiked = whoLiked;
exports.getProgrammeCreator = getProgrammeCreator;
exports.sendComment = sendComment;
exports.getComments = getComments;
exports.isProgrammeCommented = isProgrammeCommented;