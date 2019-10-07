const Supply = require('../models/supply.model.js');
const Medicine = require('../models/medicine.model.js');

// Create and Save a new Supply
exports.create = (req, res) => {

    // Create a Supply
    const supply = new Supply({
        phar_signature:     req.body.phar_signature,
        cust_signature:     req.body.cust_signature,
        tabs:               req.body.tabs,
        notes:              req.body.notes
    });

    //Find parent prescription
    Medicine.findById(req.body.prescription_id).then(prescription => {
        if (!prescription) {
            return res.status(404).send({
                message: `prescription was not found with id ${req.body.prescription_id}`
            });
        }else {
            //Save prescription = supply relationship
            prescription.supplies.push(supply);
            //update balance
            prescription.balance -= supply.tabs;
            prescription.save();
        }
    });

    // Save Supply in the database
    supply.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the supply."
        });
    });
};

// Retrieve and return all supplies from the database.
exports.findAll = (req, res) => {
    Supply.find()
        .then(supplies => {
            res.send(supplies);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving supplies."
        });
    });
};

// Find a single supply with a supplyId
exports.findOne = (req, res) => {
    Supply.findById(req.params.supplyId)
        .then(supply => {
            if(!supply) {
                return res.status(404).send({
                    message: `Supply was not found with id ${req.params.supplyId}`
                });
            }
            res.send(supply);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Supply not found with id " + req.params.supplyId
                });
            }
            return res.status(500).send({
                message: "Error retrieving supply with id " + req.params.supplyId
            });
        })
};

// Update a supply identified by the supplyId in the request
exports.update = (req, res) => {
    Supply.findByIdAndUpdate(
        // the id of the item to find
        req.params.supplyId,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, supply) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(supply);
        }
    )
};

// Delete a supply the specified supplyId in the request
exports.delete = (req, res) => {
    Supply.findByIdAndRemove(req.params.supplyId)
        .then(supply => {
            if(!supply) {
                return res.status(404).send({
                    message: "Supply not found with id " + req.params.supplyId
                });
            }
            res.send({message: "Supply deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Supply not found with id " + req.params.supplyId
                });
            }
            return res.status(500).send({
                message: "Could not delete supply with id " + req.params.supplyId
            });
        });
};