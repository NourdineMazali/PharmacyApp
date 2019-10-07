module.exports = (app) => {
    const supplies = require('../controllers/medicine_supplies.controller.js');

    // Get all patient medicines
    app.get('/prescription/:prescriptionId/supplies', supplies.findOne);


};
