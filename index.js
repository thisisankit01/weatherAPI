import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import path from 'path';
const __dirname = path.resolve();


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
 res.sendFile(__dirname+'/index.html')
});

app.post('/',function(req,res){

const query = req.body.cityName;
const units = "metric";
const apiKey = "6bf8f95ddd12be5d55f4e9b3e060ac21";
const url =`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

https.get(url,function(response){
console.log('Status code: '+response.statusCode)

response.on("data",function(data){
const weatherData = JSON.parse(data);
const temprature = weatherData.main.temp;
const weatherDescription = weatherData.weather[0].description;

const icon = weatherData.weather[0].icon;
const imageURL = "https://openweathermap.org/img/wn/" +icon+ "@2x.png"

res.write(`<h1>temprature in ${query} is ` + temprature + ' degrees Celcius.</h1>');
res.write(`<h3>weather description: ${weatherDescription}</h3>`);
res.write("<img src="+imageURL+">");

res.send();

             })

      });
})


app.listen(port,function(){
  console.log(`server running at ${port}`);
});
