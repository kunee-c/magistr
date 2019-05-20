/**
 * Created by kunee on 03/04/2019.
 */
const express = require('express');
const reviewService = require('./reviewService');
const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        const { teacherId }= req.query;
        console.log(teacherId);
        res.status(200).json(await reviewService.findByTeacher(teacherId));
    })
    .post(async (req, res, next) => {
        res.status(200).json(await reviewService.postReview(req.body));
    });

exports.router = router;
