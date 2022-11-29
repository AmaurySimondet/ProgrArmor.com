const mongoose = require("mongoose");

const programmeSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true
    },
    materiel: {
      type: Array,
      required: true
    },
    programme: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    niveau: {
      type: String,
      required: true
    },
    duree: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    titre: {
      type: String,
    },
    seancesSemaine: {
      type: Number,
      required: true
    },
    seancesTotal: {
      type: Number,
      required: true
    },
    likes: {
      type: Array,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }

  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Programme", programmeSchema);