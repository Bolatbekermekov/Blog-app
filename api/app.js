import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import connect_db from './db/connect_db.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import cors from 'cors'
import 'express-async-errors'

dotenv.config()

const app = express()
app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:5173', // Замените на адрес вашего React-приложения
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));


// import CustomAPIError from './error/CustomApi.js'
app.get('/',(req,res)=>{
  res.send("Hello World!!!")
})
app.use('/api/auth',authRoutes)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const start = async ()=>{
  try{await connect_db(process.env.MONGO_URI)
    app.listen(port,console.log(`app listening on port ${port}`))
  }
  catch(err)
  {console.log(err);}
}
start() 