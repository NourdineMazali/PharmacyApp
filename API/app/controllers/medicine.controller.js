const Medicine = require('../models/medicine.model.js');
const Patient = require('../models/patient.model.js');
const Helper = require('../helpers/helper.js');

// Create and Save a new Medicine
exports.create = (req, res) => {

    // Create a Medicine
    let medicine = new Medicine({
        name:               req.body.name,
        type:               req.body.type,
        dose:               parseInt(req.body.dose),
        initial_balance:    parseInt(req.body.initial_balance),
        schedule:           parseInt(req.body.schedule),
        balance:            parseInt(req.body.balance),
        prescribed_by:      req.body.prescribed_by,
    });

    //find patient
    Patient.findById(req.body.patient_id)
        .then(patient => {
            if(!patient) {
                return res.status(404).send({
                    message: `Patient was not found with id ${req.params.patientId}`
                });
            }
            medicine.patients.push(patient);

            //save medicine - patient relationship
            patient.medicines.push(medicine);

            // Save Medicine in the database
            patient.save()
                .then(data => {

                    res.send(data);


                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the patient."
                });
            });

            // Save Medicine in the database
            medicine.save()
                .then(data => {

                    res.send(data);


                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the medicine."
                });
            });
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
        });
};

// Retrieve and return all medicines from the database.
exports.findAll = (req, res) => {
    Medicine.find()
        .then(medicines => {
            res.send({'data': medicines});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving medicines."
        });
    });
};

exports.paginate = (req, res, next) => {
    let perPage = 3;
    let page = req.query.page || 1;
    let sortBy = Helper.order(req.query.sort);

    Medicine
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort([sortBy])
        .exec(function(err, medicines) {
            Medicine.count().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    data: medicines,
                    pagination: Helper.paginate(page,perPage, count, 'http://localhost:3000/medicines')
                })
            })
        })
};

// Find a single medicine with a medicineId
exports.findOne = (req, res) => {
    Medicine.findById(req.params.medicineId)
        .then(medicine => {
            if(!medicine) {
                return res.status(404).send({
                    message: `Medicine was not found with id ${req.params.medicineId}`
                });
            }
            res.send(medicine);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Medicine not found with id " + req.params.medicineId
                });
            }
            return res.status(500).send({
                message: "Error retrieving medicine with id " + req.params.medicineId
            });
        })
};

exports.findById = (id) => {
    Medicine.findById(id)
        .then(medicine => {
            return medicine;
        });
};

// Update a medicine identified by the medicineId in the request
exports.update = (req, res) => {
    Medicine.findByIdAndUpdate(
        // the id of the item to find
        req.params.medicineId,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, medicine) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(medicine);
        }
    )
};

// Delete a medicine the specified medicineId in the request
exports.delete = (req, res) => {
    Medicine.findByIdAndRemove(req.params.medicineId)
        .then(medicine => {
            if(!medicine) {
                return res.status(404).send({
                    message: "Medicine not found with id " + req.params.medicineId
                });
            }
            res.send({message: "Medicine deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });
        }
        return res.status(500).send({
            message: "Could not delete medicine with id " + req.params.medicineId
        });
    });
};
