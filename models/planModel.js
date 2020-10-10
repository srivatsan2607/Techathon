var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const PlanSchema = new Schema({
    planName: String,
    planType: String,
    pricePrice: Number
});

module.exports = mongoose.model("Plan", PlanSchema);