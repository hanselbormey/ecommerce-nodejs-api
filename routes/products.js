const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const Joi = require('joi');

router.get('/', async (req, resp) => {
    const products = await Product.find().sort('name');
    resp.send(products);
});

router.post('/', async (req, resp) => {
    const validation = validateProduct(req.body);

    if (validation.error) {
        resp.status(400).send(validation.error.details[0].message);
        return;
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image
    });
    
    const response = await product.save();
    resp.send(response);
});

router.put('/:id', async (req, resp) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image
    },
        { new: true }
    );

    if (!product) return resp.status(404).send('The product with the given ID was not found')

    resp.send(product);
});

router.delete('/:id', async (req, resp) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) return resp.status(404).send('The product with the given ID was not found')

    resp.send(product);
});

router.get('/:id', async (req, resp) => {
    const product = await Product.findById(req.params.id);

    if (!product) return resp.status(404).send('The product with the given ID was not found')

    resp.send(product);
});

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
    });

    return schema.validate(product);
}

module.exports = router;