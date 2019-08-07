const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get the token from the request header:
	const token = req.header('x-auth-token');

	// Check if a token exists:
	if(!token) {
		return res.status(401).json({ msg: 'No token. Authorization denied' });
	}

	// If there is verify user:
	try {
		// jwt.verify decodes the token:
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch(err) {
		// This will run if token is not valid:
		console.error(err.message);
		res.status(401).json({ msg: 'Token is not valid' });
	}
}