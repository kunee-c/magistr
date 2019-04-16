/**
 * Created by kunee on 03/04/2019.
 */
const express = require('express');
const adService = require('./adService');
const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        const { topic, city } = req.query;

        res.status(200).json(await adService.findByTopicAndLocation(topic, city));
    })
    .post(async (req, res, next) => {
        console.log(req.body);
        res.status(200).json(await adService.postAd(req.body));
    });

router.route('/:id')
    .get( (req, res, next) => {
       const ad = adService.getAd(req.params.id);
    });

exports.router = router;