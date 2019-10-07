module.exports = (app) => {
    const supplies = require('../controllers/patient.controller.js');

    // Create a new patient
    app.post('/patients', supplies.create);

    // Retrieve all patients
    app.get('/patients', supplies.paginate);

    // Retrieve a single patient with patientId
    app.get('/patients/:patientId', supplies.findOne);

    // Update a patient with patientId
    app.put('/patients/:patientId', supplies.update);

    // Delete a patientId with patientId
    app.delete('/patients/:patientId', supplies.delete);
};
