const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type:String,
        required : true,
    },
    description : String,
    image : {
        type :String,
        default: "https://www.istockphoto.com/photo/paper-house-with-exclamation-point-inside-conceptual-image-gm655282274-119193927?phrase=default+house+logo",
        set : (v) => v === "" ? "https://www.istockphoto.com/photo/paper-house-with-exclamation-point-inside-conceptual-image-gm655282274-119193927?phrase=default+house+logo" : v,
    },
    price : Number,
    location : String,
    country :String,
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing