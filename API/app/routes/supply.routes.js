module.exports = (app) => {
    const supplies = require('../controllers/supply.controller.js');

    // Create a new Note
    app.post('/supplies', supplies.create);

    // Retrieve all Notes
    app.get('/supplies', supplies.findAll);

    // Retrieve a single supply with noteId
    app.get('/supplies/:supplyId', supplies.findOne);

    // Update a supply with supplyId
    app.put('/supplies/:supplyId', supplies.update);

    // Delete a supplyId with supplyId
    app.delete('/supplies/:supplyId', supplies.delete);
}
