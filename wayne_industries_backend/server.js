const cors = require('cors');
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); 
const resourceRoutes = require('./routes/resources'); 
const dashboardRoutes = require('./routes/dashboard'); 
const securityAlertsRoutes = require('./routes/securityAlerts');
const accessLogRoutes = require('./routes/accessLogs');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(express.json()); 

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Usar as rotas
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes); 
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/security-alerts', securityAlertsRoutes); 
app.use('/api/access-logs', accessLogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
