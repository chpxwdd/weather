module.exports = function(app) {
	const passport = require('passport')
	const controllerCoreUser = require('../controllers/core.user.js')
	app.post('/api/auth/register', controllerCoreUser.register) // Create a new City
	app.post('/api/auth/login', controllerCoreUser.login) // Create a new City
	app.get('/api/auth/me', passport.authenticate('jwt', { session: false }), controllerCoreUser.me) // Retrieve a single City by Id
}
