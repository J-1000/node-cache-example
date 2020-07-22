const dotenv = require('dotenv')
dotenv.config()

const axios = require('axios');

const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`;

(async = () => {
    try {
        const response = await axios.get(url, { headers: { "X-CMC_PRO_API_KEY": process.env.API_KEY } })
    } catch (err) {
        console.log(err)
    }
})()

