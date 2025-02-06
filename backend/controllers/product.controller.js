import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    }
    catch(err){
        console.error("Error in Fetching Products",err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const createProduct = async(req,res)=>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true,data: newProduct}); // created
    }
    catch(err){
        console.error("Error in Create Product",err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product Id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct});
    }
    catch(err){
        console.error("Error in Update Product",err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product Id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product Deleted"});
    }
    catch(err){
        console.error("Error in Delete Product",err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}