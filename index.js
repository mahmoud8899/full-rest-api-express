import express from 'express'
let app = express()
import path from 'path'
import morgan from 'morgan'
import * as dotenv from 'dotenv' 
dotenv.config()
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url';
import cors from 'cors'
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// import  connect from './Config/config.js'

// connect
import mongoose from 'mongoose'

mongoose.connect(
    process.env.MONGOOSEURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
  
    (err) => {
        if (err) console.log(err)
        else console.log("mongdb is connected")
    }
);







app.use([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    morgan('dev'),
    cors({
        origin: "*",
    })



])



app.use('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));




// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// import RouteUser from './router/Auth_Router.js'
// import CategoryRouter from './router/Category_Router.js'
// import ProductsRoute from './router/Product_Router.js'
// import OrderRoute from './router/Order_Router.js'
// import FoodRouter from './router/FoodOfTheWeek_Router.js'
// import DiscountRouter from './router/DiscountRouter.js'
//  app.use('/api/', [RouteUser, CategoryRouter,ProductsRoute,OrderRoute,FoodRouter,DiscountRouter])






//  if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client/build')))

//     app.get('*', (req, res) =>

//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     )
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running....')
//     })
// }


app.get('/', (req, res) => {
    res.send('API is runs....')
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
import RouteUser from './router/AuthRouter.js'
 app.use('/api/', [RouteUser])






 app.listen(process.env.PORT || 4000, () => {
    console.log(`Server Runig.....`)
})

// export default Server