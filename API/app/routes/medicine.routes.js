module.exports = (app) => {
    const medicines = require('../controllers/medicine.controller.js');

    // Create a new medicine
    app.post('/medicines', medicines.create);

    // Retrieve all medicines
    app.get('/medicines', medicines.paginate);

    // Retrieve a single medicine with medicineId
    app.get('/medicines/:medicineId', medicines.findOne);

    // Update a medicine with medicineId
    app.put('/medicines/:medicineId', medicines.update);

    // Delete a medicineId with medicineId
    app.delete('/medicines/:medicineId', medicines.delete);
};
