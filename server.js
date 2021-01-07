const http = require('http');
const url = require('url');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors');
const PORT = process.env.PORT || 8080; // Need this for Heroku
const jwt = require('jsonwebtoken')


const contact = require('./routes/contact')
const deals = require('./routes/deals')
const restaurant = require('./routes/restaurant')
const search = require('./routes/search')
const user = require('./routes/user')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.options('*', cors());
app.use(cors());
app.use(express.json());

const version = '/api/v1'


app.use(version + '/contact', contact)
app.use(version + '/deals', deals)
app.use(version + '/restaurant', restaurant)
app.use(version + '/search', search)
app.use(version + '/user', user)


const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Restaurant Express API with Swagger",
            version: "1.0.0",
            description: "A CRUD API for adding restaurant and menu items",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Jason and Yun",
                email: "jasonwei0224@gmail.com",
            },
        },
        servers: [{
                url: "http://localhost:8080/api/v1/",
                description: "Development"

            },
            {
                url: "https://api-jasonandyun.herokuapp.com/api/v1/",
                description: "live"
            }
        ],
    },
    apis: ["./routes/*.js"],

};
const config = swaggerJSDoc(options)
app.use(
    "/docs1",
    swaggerUI.serve,
    swaggerUI.setup(config)
)

app.listen(PORT, () => console.log("Listening..."))