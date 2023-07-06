// let url = 'https://api.openweathermap.org/data/2.5/weather?q=lahor&appid=995cc6caa68dd4e092cde009fab53325'
// let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=995cc6caa68dd4e092cde009fab53325`

let express = require('express')
let https = require('https')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {

    const { city } = req.body
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=995cc6caa68dd4e092cde009fab53325&units=metric`

    https.get(url, (response) => {

        response.on('data', (data) => {

            let obj = JSON.parse(data)

            const {
                weather: [{ id, main, description, icon }],
                main: { temp, feels_like, pressure, humidity },
                name,

            } = obj
            console.log(icon)

            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body>
                    <h1>The weather in ${name} is ${Math.round(temp)}C </h1>
                  
                    <figure>
                        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="img" width=150/>
                        <figcaption>${description}</figcaption>
                    </figure>
                </body>
                </html>
            `)
        })
    })
})

app.listen(3000, () => {
    console.log('Server is listing on port 3000!')
})