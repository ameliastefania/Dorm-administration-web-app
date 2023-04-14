import bodyParser from 'body-parser'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'

import credentials from './middleware/credentials.js'
import corsOptions from './config/corsOptions.js'
import LogIn from './routes/LogIn.js'
import RefreshToken from './routes/RefreshToken.js'
import LogOut from './routes/LogOut.js'
import GETRoutes from './routes/student/GETRoutes.js'
import POSTRoutes from './routes/student/POSTRoutes.js'
import PUTRoutes from './routes/student/PUTRoutes.js'
import DELETERoutes from './routes/student/DELETERoutes.js'
import adminGETRoutes from './routes/admin_camin/AdminGETRoutes.js'
import adminPUTRoutes from './routes/admin_camin/AdminPUTRoutes.js'



let app = express();
let router = express.Router();

const dbURI = "mongodb+srv://yourUsername:yourPassword@yourMongoDBcluster/?retryWrites=true&w=majority"
await mongoose.connect(dbURI, {useUnifiedTopology: true,
useNewUrlParser: true})
    .then(()=> {
        console.log("Conectare reusita")
        app.listen(8000)
        console.log("API is running on 8000")
    })
    .catch((err)  => {console.log("Internal server error")
        console.log(err)})


app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use('/api', router);
app.use('/api',LogIn);
app.use('/api',RefreshToken)
app.use('/api',LogOut);
app.use('/api',GETRoutes)
app.use('/api',POSTRoutes)
app.use('/api',PUTRoutes)
app.use('/api',DELETERoutes)
app.use('/api',adminGETRoutes)
app.use('/api',adminPUTRoutes)



        
