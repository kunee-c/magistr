/**
 * Created by kunee on 19/05/2019.
 */
const express = require('express');
const router = express.Router();
var geoip = require('geoip-lite');

router.route('/')
    .get(async (req,res,next)=> {

        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip === "::1")
            ip='99.239.198.0';

        const geoData = geoip.lookup(ip);

        res.status(200).json(geoData);
    });

exports.router = router;
