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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Owner.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: `Owner Not found with id = ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "error occurred!" });
    });
};

// Retrieve all
exports.findAll = (req, res) => {
  const address = req.query.address;
  var condition = address
    ? { address: { $regex: new RegExp(address), $options: "i" } }
    : {};

  Owner.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred!",
      });
    });
};

// Update
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "data can not be empty!",
    });
  }

  const id = req.params.id;

  Owner.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update the owner information with id = ${id}`,
        });
      } else
        res.send({ message: "owner information was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "error occurred!",
      });
    });
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Owner.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete the Owner information with id = ${id}`,
        });
      } else {
        res.send({
          message: "Owner was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error occurred!",
      });
    });
};

// Delete all
exports.deleteAll = (req, res) => {
  Owner.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Owners information were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred!",
      });
    });
};
