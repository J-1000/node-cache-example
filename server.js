const app = require('express')();
const port = 8000;
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()

const NodeCache = require('node-cache');
const { response } = require('express');
const cache = new NodeCache({ stdTTL: 24 * 60 * 60 });

const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`;


const getCryptocurrencyMap = async (req, res, next) => {
    const content = cache.get(url)
    if (content) {
        console.log('content found')
        res.locals.data = content
        next()
        return
    }
    try {
        console.log('calling api')
        const response = await axios.get(url, { headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY } })
        cache.set(url, response.data)
        res.locals.data = response.data
        return next()
    } catch (err) {
        console.error(err)
        return err
    }
}

app.get('/', getCryptocurrencyMap, (req, res, next) => {
    res.json(res.locals.data)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})