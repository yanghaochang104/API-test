var express = require('express'),
    app = express();
    
app.set("view engine", "ejs"); // set ejs view engine
app.use(express.static(__dirname+"/public"));  // use public to refer to static files

app.get("/", function(req,res){
    res.render("api");    
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("server started!");
});