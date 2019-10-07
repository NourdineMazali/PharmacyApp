module.exports = (app) => {
    const supplies = require('../controllers/patient_medicines.controller.js');

    // Get all patient medicines
    app.get('/patients/:patientId/prescriptions', supplies.findOne);


};
