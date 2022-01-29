const db = require("../models");
const Owner = db.ownerInfo;

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body.address) {
    res.status(400).send({ message: "address can not be empty!" });
    return;
  }

  // Create owner
  const owner = new Owner({
    address: req.body.address,
    name: req.body.name,
    dob: req.body.dob,
    coordinates: req.body.coordinates,
  });

  // Save in the database
  owner
    .save(owner)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred while creating",
      });
    });
};

// Read
exports.findOne = (req, res) => {};

// Retrieve all
exports.findAll = (req, res) => {};

// Update
exports.update = (req, res) => {};

// Delete
exports.delete = (req, res) => {};

// Delete all
exports.deleteAll = (req, res) => {};
