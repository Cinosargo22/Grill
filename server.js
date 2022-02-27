const express = require('express');
const {
    createProxyMiddleware
} = require('http-proxy-middleware')
require('dotenv').config();

// Edamam api app id and key from .env file
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

// proxy for the edamam api calls

// adds the app_id and app_key query params to the url
const addApiKeys = (proxyReq, req, res) => {
    proxyReq.path += `&app_id=${app_id}&app_key=${app_key}`;
};
var apiProxy = createProxyMiddleware('/api', {
    target: 'http://api.edamam.com/api/recipes/v2',
    onProxyReq: addApiKeys
});
app.use(apiProxy)

app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));