const express = require('express');

const watchThis = express();

watchThis.get('/', (req, res) => {
	res.send('API running');
})

const PORT = process.env.PORT || 3000;

watchThis.listen(PORT, () => console.log(`Server is listening: ${PORT}`));