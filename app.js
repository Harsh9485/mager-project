const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsyc.js");
const ExpressErroe = require("./utils/ExpressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded( {extended : true} ));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.engine("ejs",ejsMate);

main().then(() => {
    console.log("connect to db");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
};

// index app 
app.get("/listings",wrapAsync(async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
}) 
);

//create new listing root
app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs");
});

//Show root
app.get("/listings/:id",wrapAsync(async(req,res) => {
    let id = req.params.id;
    
    let listing = await Listing.findById(id);
   
    res.render("listings/show.ejs",{listing});
 })
);

// edit root
app.get("/listings/:id/edit",wrapAsync(async(req,res) =>  {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
 })
);

// Add new listing in db / create root
app.post("/listings",wrapAsync(async(req,res,next) => { 
    if(!req.body.listing) {
        throw new ExpressErroe(400, "send valid data for listing");
    }
    let newlisting = Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
 }) 
);

// update root
app.put("/listings/:id",wrapAsync(async(req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings`);
 })
);

//delete root
app.delete("/listings/:id",wrapAsync( async(req,res) => {
    let id = req.params.id;
    deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
 })
);

//
app.all("*", (req, res, next) => {
    next(new ExpressErroe(404, "Page Not Found"));
})

// middleware
// app.use((err,req,res,next) => {
//     res.send("some thing wrong " );   
// });

app.use((err,req,res,next) => {
    let  {status=500, message} = err;
    res.status(status).send(message);
});

app.listen(8080,() => {
    console.log("srever is working")
})