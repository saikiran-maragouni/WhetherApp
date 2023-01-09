//after installing express in node than require method will load the package
const express = require('express');
const app = express();
//By using https module we can give request to an api
const https = require("https");
//after installing npm i body-parser
const bodyParser = require("body-parser");
//bodyParser allows me to look through the body of the pge
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){


  const place =req.body.cityName;
  const apikey ="7780845b83cac8d59fc625e53ccf5cb5";
  const units = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units="+units+"&appid="+apikey+"&q="+place+"#";
  https.get(url,function(response){

    // console.log(response.statusCode);  // it gives the status of page like 404 error 200 etc

    response.on("data",function(data){
      //converting byte code into javascript object
      const weatherdata=JSON.parse(data);
      // console.log(weatherdata);


      // const obj={
      //   name : "Saikiran",
      //   food : "Biryani"
      // };
      // //converting js object to string
      // console.log(JSON.stringify(obj));
      const temp = weatherdata.main.temp;
      const wdes = weatherdata.weather[0].description;
      console.log("The temperature in "+place+" is "+temp);
      console.log("the whether description is "+wdes);

      //WE can only use one res,send and thats the send
      /*
      var t="<h2> Todays is weather is "+temp;
      var des="The weather description is "+wdes+"</h2>";
        res.send(t+des);
        */
        //we can only write only one res.send() but we can write res.write() anytimes we want
        res.write("<p> The temperature in "+place+" is "+temp+ "</p>");
        res.write("<h3> The weather description is "+wdes+"</h3>");
        const icon = weatherdata.weather[0].icon;
        const imageurl = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<img src="+imageurl+">");
        res.send()
    });
  });


});



app.listen(3000,function(){
  console.log("Server is running on port 3000");
  console.log("Your server now started listening");
});
