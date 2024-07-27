import express,{Express, Request, Response} from 'express';
import cors from 'cors';
import { config } from './config';
import { func } from 'joi';
import mongoose from 'mongoose';
import { registerRoutes } from './routes';

const PORT = config.server.port;

const app:Express = express();
app.use(express.json());
app.use(cors());

(async function startUp(){
    try {
        console.log(`starting server and connecting to : ${config.mongo.url}`);

        await mongoose.connect(config.mongo.url,{w:"majority", retryWrites:true,authMechanism:"DEFAULT"});

        registerRoutes(app);
    
        app.listen(PORT,()=>{
            console.log(`Server is listening on port ${PORT}`);
        })

    } catch (error) {
        console.log(`Could not make a connection to the database`,error);
    }
})();

