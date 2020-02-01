const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const favicon = require('serve-favicon');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(express.json());
app.use(express.text());

app.get('/countryCode/:latlng', async (req, res) => {
    const [ lat, lng ] = req.params.latlng.split(',');
    const api_url = 'http://api.geonames.org/countryCode?lat=' + lat + '&lng=' + lng +
        '&username=' + process.env.API_USERNAME;
    const response = await fetch(api_url);
    const text = await response.text();
    const countryCode = text.trimEnd();
    let stat = countryCode.length === 2;
    res.json({ status: stat, countryCode: countryCode.trimEnd() });
});

app.get('/countryName/:latlng', async (req, res) => {
   const [ lat, lng ] = req.params.latlng.split(',');
   const api_url = 'http://api.geonames.org/findNearbyJSON?lat=' + lat + '&lng=' + lng +
       '&username=' + process.env.API_USERNAME;
   const response = await fetch(api_url);
   const json = await response.json();
   const country = json['geonames'][0];
   if (country) {
       const countryCode = country.countryCode;
       const countryName = country.countryName;
       res.json({ countryCode, countryName });
   } else {
       res.status(400).end();
   }
});
