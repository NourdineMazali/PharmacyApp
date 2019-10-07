const Patient = require('../models/patient.model.js');
const Helper = require('../helpers/helper.js');

// Create and Save a new Patient
exports.create = (req, res) => {

    // Create a Patient
    const patient = new Patient({
        first_name:         req.body.first_name,
        last_name:          req.body.last_name,
        phone_number:       req.body.phone_number,
        email:              req.body.email,
        prescribed_by:      req.body.prescribed_by,
        medicare_num:    req.body.medicare_num,
        address:            req.body.address,
        gender:             req.body.gender,
        type:               req.body.type,
        fee:               req.body.fee,
        concession_num:       req.body.concession_num,
    });

    // Save Note in the database
    patient.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the medicine."
        });
    });
};

// Retrieve and return all supplies from the database.
exports.findAll = (req, res) => {
    Patient.find()
        .then(supplies => {
            res.send({'data': supplies});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving supplies."
        });
    });
};

exports.paginate = (req, res, next) => {
    let perPage = 10;
    let page = req.query.page || 1;
    let sortBy = Helper.order(req.query.sort);

    Patient
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
        .exec(function(err, patients) {
            Patient.count().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    data: patients,
                    pagination: Helper.paginate(page,perPage, count, 'http://localhost:3000/patients')
                })
            })
        })
};

// Find a single patient with a patientId
exports.findOne = (req, res) => {
    Patient.findById(req.params.patientId)
        .then(patient => {
            if(!patient) {
                return res.status(404).send({
                    message: `Patient was not found with id ${req.params.patientId}`
                });
            }
            res.send(patient);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.patientId
                });
            }
            return res.status(500).send({
                message: "Error retrieving patient with id " + req.params.patientId
            });
        })
};

// Update a patient identified by the patientId in the request
exports.update = (req, res) => {
    Patient.findByIdAndUpdate(
        // the id of the item to find
        req.params.patientId,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, patient) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(patient);
        }
    )
};

// Delete a patient the specified patientId in the request
exports.delete = (req, res) => {
    Patient.findByIdAndRemove(req.params.patientId)
        .then(patient => {
            if(!patient) {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.patientId
                });
            }
            res.send({message: "Patient deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.patientId
            });
        }
        return res.status(500).send({
            message: "Could not delete patient with id " + req.params.patientId
        });
    });
};
