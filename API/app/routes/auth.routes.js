module.exports = (app) => {

    const auth = require('../controllers/auth.controller.js');

    // Create a new medicine
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
    app.get('/isLoggedIn', auth.isLoggedIn);
};
