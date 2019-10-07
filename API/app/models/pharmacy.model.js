const mongoose = require('mongoose');
const bcrypt  = require('bcrypt'), SALT_WORK_FACTOR = 10;
const Patient = require('./patient.model.js');

const Pharmacy = mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    pharmacy_name: {
        type: String,
        required: [true, 'Pharmacy name is required']
    },
    pharmacy_address: {
        type: String,
        required: [true, 'Pharmacy address is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    agreed: {
        type: Number,
        required: [true, 'You must agree with the Terms and Conditions']
    },
    patients: [{type: mongoose.Schema.Types.ObjectId, 'ref': 'Patient'}]

}, {
    timestamps: true,
});

//Authenticate input against database
Pharmacy.statics.authenticate = function (email, password, callback) {
    this.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                let err = new Error('Pharmacy not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};


//Pre save-- password hashing
Pharmacy.pre('save', function(next) {
    let pharmacy = this;

    // only hash the password if it has been modified (or is new)
    if (!pharmacy.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(pharmacy.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            pharmacy.password = hash;
            next();
        });
    });
});

Pharmacy.methods.comparePassword = function(pharmacyPassword, cb) {
    bcrypt.compare(pharmacyPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Pharmacy', Pharmacy);