import  express  from 'express';
import morgan from 'morgan';
import cors from 'cors';
import contactController from './controllers/contactosControllers.js';

const app= express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(contactController)
export default app;   