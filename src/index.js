const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const PORT = 3000
const url = "https://www.theguardian.com/uk"

axios(url).
    then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.fc-item__title', html).each(function () {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).
    catch(err=>console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})