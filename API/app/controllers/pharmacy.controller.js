const Pharmacy = require('../models/pharmacy.model.js');
const Helper = require('../helpers/helper.js');

// Create and Save a new Pharmacy
exports.create = (req, res) => {

    // Create a Pharmacy
    const pharmacy = new Pharmacy({
        full_name:          req.body.full_name,
        email:              req.body.email,
        pharmacy_name:      req.body.pharmacy_name,
        pharmacy_address:   req.body.pharmacy_address,
        password:           req.body.password,
        agreed:             req.body.agreed
    });

    // Save Note in the database
    pharmacy.save()
        .then(data => {
            //Authenticate
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while registering the Pharmacy."
        });
    });
};

// Retrieve and return all supplies from the database.
exports.findAll = (req, res) => {
    Pharmacy.find()
        .then(supplies => {
            res.send({'data': supplies});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pharmacies."
        });
    });
};

exports.paginate = (req, res, next) => {
    let perPage = 10;
    let page = req.query.page || 1;
    let sortBy = Helper.order(req.query.sort);

    Pharmacy
        .find({})
        .populate({
            path: 'medicines',
            options: {
                sort: {'createdAt': 'desc'}
            },
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort([sortBy])
        .exec(function(err, pharmacies) {
            Pharmacy.count().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    data: pharmacies,
                    pagination: Helper.paginate(page,perPage, count, 'http://localhost:3000/pharmacies')
                })
            })
        })
};

// Find a single pharmacy with a pharmacyId
exports.findOne = (req, res) => {
    Pharmacy.findById(req.params.pharmacyId)
        .then(pharmacy => {
            if(!pharmacy) {
                return res.status(404).send({
                    message: `Pharmacy was not found with id ${req.params.pharmacyId}`
                });
            }
            res.send(pharmacy);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pharmacy not found with id " + req.params.pharmacyId
                });
            }
            return res.status(500).send({
                message: "Error retrieving pharmacy with id " + req.params.pharmacyId
            });
        })
};

// Update a pharmacy identified by the pharmacyId in the request
exports.update = (req, res) => {
    Pharmacy.findByIdAndUpdate(
        // the id of the item to find
        req.params.pharmacyId,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, pharmacy) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(pharmacy);
        }
    )
};

// Delete a pharmacy the specified pharmacyId in the request
exports.delete = (req, res) => {
    Pharmacy.findByIdAndRemove(req.params.pharmacyId)
        .then(pharmacy => {
            if(!pharmacy) {
                return res.status(404).send({
                    message: "Pharmacy not found with id " + req.params.pharmacyId
                });
            }
            res.send({message: "Pharmacy deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pharmacy not found with id " + req.params.pharmacyId
            });
        }
        return res.status(500).send({
            message: "Could not delete pharmacy with id " + req.params.pharmacyId
        });
    });
};
