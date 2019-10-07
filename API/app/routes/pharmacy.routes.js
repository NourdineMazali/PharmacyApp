module.exports = (app) => {
    const supplies = require('../controllers/pharmacy.controller.js');

    // Create a new pharmacy
    app.post('/pharmacies', supplies.create);

    // Retrieve all pharmacies
    app.get('/pharmacies', supplies.paginate);

    // Retrieve a single pharmacy with pharmacyId
    app.get('/pharmacies/:pharmacyId', supplies.findOne);

    // Update a pharmacy with pharmacyId
    app.put('/pharmacies/:pharmacyId', supplies.update);

    // Delete a pharmacyId with pharmacyId
    app.delete('/pharmacies/:pharmacyId', supplies.delete);
};
