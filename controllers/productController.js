const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')


//get all product
const getProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({});
        const users = [
            { name: "kim", email: "kim@abc.def"},
            { name: "oh", email: "oh@aff.fff"},
        ]
        res.render("mainUI", { users: users, products: products});

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//get a single product
const getProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findbyId(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//create new product
const createProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product); 

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a product
const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we cannot find any product in DB
        if(!product){
            return res.status(404).json({message : `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}