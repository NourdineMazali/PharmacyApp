const mongoose = require('mongoose');
const Medicine = require('./medicine.model.js');


const Patient = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required']
    },
    phone_number: {
        type: String,
        required: [true, 'phone Number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    birth_date: {
        type: String,
    },
    medicare_num: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    gender: {
        type: String,
       // required: [true, 'Gender type is required']
    },
    type: {
        type: String,
        enum: [
            'Hypnotics and sedatives',
            'Antidepressants',
            'Opioid analgesics',
            'Psychostimulants',
            'Antipsychotics',
            'Anxiolytics'
        ],
    },
    fee: {
        type: Number
    },
    concession_num: {
        type: String
    },
    medicines: [{type: mongoose.Schema.Types.ObjectId, 'ref': 'Medicine'}]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Patient', Patient);