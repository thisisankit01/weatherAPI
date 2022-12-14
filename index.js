import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express();
const PORT= process.env.PORT;
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
 res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
  const query = req.body.cityName;
  const units = "metric";
  const apiKey = process.env.APIKEY;
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

axios(url)
.then((response) => {
    const temperature = response.data.main.temp;
    const icon = response.data.weather[0].icon;
    const weatherDescription = response.data.weather[0].description;
    const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
    
    res.send(
        `<h1>Temprature in ${query} is  ${temperature} degrees Celcius.<h1/>
         <h3>Weather Description: ${weatherDescription}<h3/>
         <img src = ${imageURL} >`
    );
  }).

 catch(()=> res.send(`<bold>Please Enter a Valid Place Name</bold>`));  
});


app.listen(PORT || 3000, () => console.log(`listening on 3000`));