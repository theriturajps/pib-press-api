const express = require('express');
const cors = require('cors');
const pressReleaseRoutes = require('./routes/pressReleaseRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', pressReleaseRoutes);

// Health check
app.get('/', (req, res) => {
	res.json({ status: 'OK', message: 'PIB Press Release API is running' });
});

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;