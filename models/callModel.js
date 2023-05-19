const mongoose = require('mongoose');
const callRecordSchema= mongoose.Schema({
    key:String,
    callDateFrom:String,
    callDateTo:String,
    phoneNumber:String,
    campaignId:String,
    agentId:String,
    volunteerNumber:String,
    audioUrl:String
});

module.exports= mongoose.model("crms",callRecordSchema)