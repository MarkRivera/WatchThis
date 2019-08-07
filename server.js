const express = require("express");
const connectDB = require("./config/db");

const watchThis = express();

// Connect to DB:
connectDB();

// Init middleware

watchThis.use(express.json({extended: false}));

watchThis.get("/", (req, res) => {
	res.send("API running");
});


// Definite routes to connect to different aspects of API:
watchThis.use('/api/users', require('./routes/api/users'));
watchThis.use('/api/auth', require('./routes/api/auth'));
watchThis.use('/api/profile', require('./routes/api/profiles'));
watchThis.use('/api/movies', require('./routes/api/movies'));
watchThis.use('/api/genres', require('./routes/api/genres'));

const PORT = process.env.PORT || 5000;

watchThis.listen(PORT, () => console.log(`Server is listening: ${PORT}`));
