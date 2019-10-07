const mongoose = require('mongoose');
const Medicine = require('./medicine.model.js');

const Supply = mongoose.Schema({
    prescription_id: [{type: mongoose.Schema.Types.ObjectId, 'ref': 'Medicine'}],
    tabs: {
        type: Number,
        required: [true, 'Tabs number is required']
    },
    phar_signature: {
        type: String,
        required: [true, 'Pharmacist signature is required']
    },
    cust_signature: {
        type: String,
        required: [true, 'Customer\'s signature is required']
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model('Supply', Supply);