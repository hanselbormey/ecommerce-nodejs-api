const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Joi = require('joi');

router.post('/', async (req, resp) => {
    const { error } = validateUser(req.body);

    if (error) {
        resp.status(400).send(error.details[0].message);
        return;
    }

    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) return resp.status(400).send('User already registered.')

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const response = await user.save();
    resp.send(response);
});

function validateUser(product) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
    });

    return schema.validate(product);
}

module.exports = router;