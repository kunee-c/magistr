'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');


const loadData = require('./dataset/LoadData');

// 1. Create main express intance
const router = express();

// 2. Require utility function for adding middleware
const {applyMiddleware} = require('./utils');

// 3a. Require general middleware
const middleWare = require('./middleware');
// 3b. Require error handling middleware
const errorHandlers = require('./middleware/errorHandlers');

// 4. Require routes
const {router: userRoutes} = require('./routes/users/userRoutes');
const {router: adRoutes} = require('./routes/ads/adRoutes');
const {router: reviewRoutes} = require('./routes/reviews/reviewRoutes');
const {router: geoLocationRoutes } = require('./routes/geolocation/GeoLocationRoute');

// 5. Require conatants
const {PORT, MONGO_DB_URL} = require('./utils/constants');

// 6. Apply general middleware
applyMiddleware(middleWare, router);

// 7. Utilise routes
const publicFolder = path.resolve(__dirname, '..', 'build');
console.log(router.use('/', express.static(publicFolder)))
router.use('/', express.static(publicFolder));

router.use('/api/users', userRoutes);
router.use('/api/ads', adRoutes);
router.use('/api/reviews', reviewRoutes);
router.use('/api/geolocation', geoLocationRoutes);

// 8. Apply error handling middleware (meaningfully last)
applyMiddleware(errorHandlers, router);
// 9. Create a server from express instance
const server = http.createServer(router);

mongoose.connect(MONGO_DB_URL)
    .then(() => {
        console.log('Connected to mongodb instance');
        // 10. Start server
        server.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);
            loadData.loadTeachersWithAds();
            if (process.send) {
                // NOTE: process is being run by pm2
                process.send('ready');
            }
        });
    })
    .catch((err) => {
        console.log(err);
    });

