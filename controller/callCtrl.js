const Record = require("../models/callModel");



const getAllData=async(req,res)=>{
    try{
        const result = await Record.find({})
        res.status(200).send(result)
    }catch(error){
        res.status(500).send(error)
    }
}

const filterData=async(req,res)=>{
    try {
        const result = await Record
          .where("callDateFrom")
          .eq(req.body.query.callDateFrom)
          .where("callDateTo")
          .eq(req.body.query.callDateTo)
          .where("phoneNumber")
          .eq(req.body.query.phoneNumber)
          .where("campaignId")
          .eq(req.body.query.campaignId)
          .where("agentId")
          .eq(req.body.query.agentId)
          .where("volunteerNumber")
          .eq(req.body.query.volunteerNumber)
    
        res.status(200).send(result);
      } catch (err) {
        console.log(err);
        if (res.status(500))
          res.status(500).json({ error: true, message: "Internal Server Error" });
        else if (res.status(404))
          res.status(500).json({ error: true, message: "404 error ----" });
      }
}

module.exports = {
getAllData,
filterData
};
