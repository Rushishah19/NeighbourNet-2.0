const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


dotenv.config();
connectDB();



const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ origin: '*' }));
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('API is running....');
});
module.exports = app;
