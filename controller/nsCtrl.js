const Gas = require("../models/nsModel");

const getAllData = async (req, res) => {
  try {
    const result = await Gas.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterData = async (req, res) => {
    try {
      let query = Gas.find();
  
      if (req.body.topic) {
        query = query.where("topic").eq(req.body.topic);
      }
  
      if (req.body.sector) {
        query = query.where("sector").eq(req.body.sector);
      }
  
      if (req.body.country) {
        query = query.where("country").eq(req.body.country);
      }
  
      if (req.body.region) {
        query = query.where("region").eq(req.body.region);
      }
  
      if (req.body.min && req.body.max) {
        query = query.where("intensity").gte(req.body.min).lte(req.body.max);
      }
  
      const result = await query.exec();
  
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };

module.exports = {
  getAllData,
  filterData,
};
