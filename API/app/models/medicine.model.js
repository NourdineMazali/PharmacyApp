const mongoose = require('mongoose');
const Patient = require('./patient.model.js');
const Supply = require('./supply.model.js');
const mongoosePaginate = require('mongoose-paginate');

const Medicine = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required']
    },
    type: {
        type: String,
        required: [true, 'Medicine type is required']
    },
    prescribed_by: {
        type: String,
        required: [true, 'Prescriber\'s details are required']
    },
    balance: {
        type: Number,
        required: [true, 'Medicine balance is required']
    },
    dose: {
        type: Number,
        required: [true, 'Medicine dose is required']
    },
    initial_balance: {
        type: Number,
       // required: [true, 'Initial balance is required']
    },
    schedule: {
        type: Number,
        required: [true, 'Schedule is required']
    },
    patients: [{type: mongoose.Schema.Types.ObjectId, 'ref': 'Patient'}],
    supplies: [{type: mongoose.Schema.Types.ObjectId, 'ref': 'Supply'}],
},
    {
        timestamps: true,
    });
Medicine.plugin(mongoosePaginate);

module.exports = mongoose.model('Medicine', Medicine);