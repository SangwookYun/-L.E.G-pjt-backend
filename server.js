const http = require('http');
const url = require('url');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors');
const PORT = process.env.PORT || 8080; // Need this for Heroku
let jwt = require('jsonwebtoken')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.options('*', cors());
app.use(cors());
app.use(express.json());


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
                url: "http://localhost:3000/api/v1/",
                description: "Development"

            },
            {
                url: "https://api-jasonandyun.herokuapp.com/api/v1/",
                description: "live"
            }
        ],
    },
    apis: ["./routes/menu.js", "./routes/restaurant.js", "./routes/user.js"],

};
const config = swaggerJSDoc(options)
app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(config)
)

app.listen(PORT, () => console.log("Listening..."))