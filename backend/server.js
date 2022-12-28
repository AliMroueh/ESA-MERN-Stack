import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import data from './data.js';
import userRouter from './routers/userRouter.js';

// to read the content of env
dotenv.config();

const app = express();

// these two middleware will transfer the data to req.body in the app
// a middleware that parse json data in the body of the request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users',userRouter);

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