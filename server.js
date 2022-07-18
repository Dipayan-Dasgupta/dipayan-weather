//my server
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const place = req.body.CityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    place +
    "&appid=1616755dccc2b4fc177ae4fe7e47751a&units=metric";

  https.get(url, function (resp) {
    resp.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weathertemp = weatherData.main.temp;
      const WeatherDescrip = weatherData.weather[0].description;
      const logo = weatherData.weather[0].icon;
      const logoUrl = "http://openweathermap.org/img/wn/" + logo + "@2x.png";

      res.write(
        "<h1>The weather of " +
          place +
          " is currently " +
          WeatherDescrip +
          "</h1>"
      );
      res.write(
        "<h1> The temp of " +
          place +
          " is " +
          weathertemp +
          " degree Celcius </h1>"
      );
      res.write("<img src = " + logoUrl + ">");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("My server is running on port 3000 .");
});
