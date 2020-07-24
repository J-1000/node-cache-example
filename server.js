const app = require('express')();
const port = 8000;
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()

const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(url, { headers: { "X-CMC_PRO_API_KEY": process.env.API_KEY } })
        console.log(response);
        res.json(reponse);
    } catch (err) {
        console.error(err)
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})