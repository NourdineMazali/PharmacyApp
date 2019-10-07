
const Medicine  = require('../models/medicine.model.js');
const Helper    = require('../helpers/helper.js');

// Retrieve and return all supplies for the medicine from the database.
exports.findOne = (req, res) => {
    let perPage = 5;
    let page    = req.query.page || 1;
    let sortBy  = Helper.order(req.query.sort, true);
    Medicine.findById(req.params.prescriptionId)
        .populate({
            path: 'supplies',
            options: {
                limit: perPage,
                sort: sortBy,
                skip: (perPage * page) - perPage
            }
        })
        .exec(async (topicError, topicResult) => {
            if(!topicResult) {
                return res.status(404).send({
                    message: `Medicine was not found with id ${req.params.prescriptionId}`
                });
            }
            let med =   await Medicine.findById( req.params.prescriptionId).populate('supplies').exec();
            res.send({
                data:       topicResult.supplies,
                pagination: Helper.paginate(
                    page, perPage, med.supplies.length, 'http://localhost:3000/patients'
                )
            });
        })
};
