import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import data from './data.js';
import userRouter from './routers/userRouter.js';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import { applyPassportStrategy } from './utils.js';
import passport from 'passport';
import refreshTokenRouter from './routers/refreshTokenRouter.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// to read the content of env
dotenv.config();

const app = express();

// these two middleware will transfer the data to req.body in the app
// a middleware that parse json data in the body of the request
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(passport.initialize());
// Apply strategy to passport
applyPassportStrategy(passport);


mongoose.set('strictQuery', true)
// mongoose.connect('mongodb+srv://root:m1234@ecommerce.jglr2ap.mongodb.net/ecommerce?retryWrites=true&w=majority',{

// mongodb+srv://ali:1234@cluster0.3hshine.mongodb.net/smile?retryWrites=true&w=majority
// mongodb://localhost/smile 

mongoose.connect('mongodb://localhost/smile',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

app.use('/api/users',userRouter);

app.use('/api/products',productRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/refresh',refreshTokenRouter);


app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});

// this middleware is an error catcher.So, when an error appear in the routers that use expressAsyncHandler then the error will be redirected to this function or middleware and then the right error will redirected to the frontend
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Serve at http://localhost:${port}`);
})