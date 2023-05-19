const NGas = require("../models/nsModel");



const getAllData=async(req,res)=>{
    try{
        const result = await NGas.find({})
        res.status(200).send(result)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = {
getAllData
};
