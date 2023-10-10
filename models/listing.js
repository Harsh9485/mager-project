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
        default: "https://www.logolynx.com/images/logolynx/df/dfc95540c225d6841233d7f74c9a2a11.png",
        set : (v) => v === "" ? "https://www.logolynx.com/images/logolynx/df/dfc95540c225d6841233d7f74c9a2a11.png" : v,
    },
    price : Number,
    location : String,
    country :String,
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing