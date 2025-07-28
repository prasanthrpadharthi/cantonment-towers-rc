require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const eventRoutes = require('./routes/eventRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const imagesPaginatedRoutes = require('./routes/imagesPaginatedRoutes');
const jwtAuth = require('./middleware/jwtAuth');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api/auth', authRoutes);
//app.use('/api/images', jwtAuth, imageRoutes);
app.use('/api/images', imageRoutes);
//app.use('/api/events', jwtAuth, eventRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/images-paginated', imagesPaginatedRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
