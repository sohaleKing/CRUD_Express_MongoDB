const db = require("../models");
const Owner = db.ownerInfo;

//methods - tools
const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

// Create
exports.create = (req, res) => {
  const item = req.body.root;
  // Validate request
  if (!item.address) {
    res.status(400).send({ message: "address can not be empty!" });
    return;
  }
  // Create owner
  const owner = new Owner({
    address: item.address,
    name: item.name,
    dob: item.dob,
    age: getAge(item.dob),
    coordinates: item.coordinates,
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

// Create Bulk- XML
exports.createBulk = (req, res) => {
  const items = req.body.root.homeowner;
  const homeOwners = items.map((item) => {
    // Validate request
    if (!item.address) {
      res.status(400).send({ message: "address can not be empty!" });
      return;
    }
    item.age = getAge(item.dob);
    return item;
  });

  // Save in the database
  Owner.insertMany(homeOwners)
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
  const ownersIds = req.body.ids;
  Owner.deleteMany({ _id: { $in: ownersIds } })
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
