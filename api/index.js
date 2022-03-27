const express = require('express');
const middlewares = require('./libs/middleware/middleware');
const authRoutes = require('./routes/authRoutes').router;
const moviesRoutes =  require('./routes/moviesRoutes').router
const app = express();
const PORT = 3000;

require('./libs/database/database');

middlewares.setupMiddleware(app);

app.use('/auth', authRoutes);
app.use('/movies', moviesRoutes)

app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));

exports.app = app;
