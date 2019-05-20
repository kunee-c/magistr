/**
 * Created by kunee on 02/04/2019.
 */
const express = require('express');
const userService = require('./userService');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {

        const { email } = req.query;
        let users;

        if(email)
            users = await userService.getUserByEmail(email);
        else
            users = await userService.getUsers();

        res.status(200).send(users);
    })
    .post(async (req, res, next) => {
        const doc = await userService.addUser(req.body);
        res.status(201).json(doc);
    })
    .put( (req, res, next) => {
        res.status(200).send(userService.updateUser(req.body));
    });

router.route('/:id')
    .get(async (req, res, next) => {
        res.status(200).send(await userService.getUser(req.params.id));
    });

router.route('/login')
    .post(async (req, res, next) => {

        const {email, password} =  req.body;

        const user = await userService.getUserByEmail(email);
        if(user !==null && user.checkPassword(password))
            res.send(200).json({authent:'OK'});
        else
            res.send(403).json({authent:'KO'});

    });

exports.router = router;
