const http = require('http');
const url = require('url');
const express = require('express')
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors');
const PORT = process.env.PORT || 8080; // Need this for Heroku
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const contact = require('./routes/contact')
const deals = require('./routes/deals')
const restaurant = require('./routes/restaurant')
const search = require('./routes/search')
const user = require('./routes/user');
const menu = require('./routes/menu');
const auth = require('./routes/auth');
const advertisement = require('./routes/advertisement')
const category = require('./routes/category')
const mongoose = require('mongoose');
// const admin = require('./firebaseinit')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.options('*', cors());
app.use(cors());
app.use(express.json());

const USERNAME = process.env.DBUSERNAME
const DBPASSWORD = process.env.DBPASSWORD
const DBNAME = process.env.DBNAME

const uri = `mongodb+srv://${USERNAME}:${DBPASSWORD}@cluster0.l8dbx.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (err) => {
        if (err) throw err;
        console.log('Successfully connected');
    })


const version = '/api/v1'
app.use(version + '/auth', auth)
app.use(version + '/contact', contact)
app.use(version + '/deals', deals)
app.use(version + '/restaurant', restaurant)
app.use(version + '/search', search)
app.use(version + '/user', user)
app.use(version + '/menu', menu)
app.use(version + '/advertisement', advertisement)
app.use(version + '/category', category)



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
                url: "https://leg-backend.herokuapp.com/api/v1/",
                description: "live"
            }
        ],
    },
    apis: ["./routes/*.js"],

};
const config = swaggerJSDoc(options)
app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(config)
)

app.listen(PORT, () => console.log("Listening..."))