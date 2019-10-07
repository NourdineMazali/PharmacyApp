const Patient = require('../models/patient.model.js');
const Helper  = require('../helpers/helper.js');

// Retrieve and return all medicines for the patient from the database.
exports.findOne = (req, res) => {
    let perPage = 5;
    let page    = req.query.page || 1;
    let sortBy  = Helper.order(req.query.sort, true);

    Patient.findById(req.params.patientId)
        .populate({
            path: 'medicines',
            options: {
                limit: perPage,
                sort: sortBy,
                skip: (perPage * page) - perPage
            }
        })
        .exec((topicError, topicResult) => {
            if(!topicResult) {
                return res.status(404).send({
                    message: `Patient was not found with id ${req.params.patientId}`
                });
            }

            let patient = async function(req, res) {
                let patient;
                await Patient.Patient.find({ _id: req.params.patientId}, function(err,pro){
                    patient=pro;
                });
                return patient;
            };

            Patient.findById(req.params.patientId, 'medicines', function (err, patient) {
                res.send({
                    data:       topicResult.medicines,
                    pagination: Helper.paginate(
                        page, perPage, patient.medicines.length, 'http://localhost:3000/patients'
                    )
                });
            });

        })
};
