import express from 'express';
import data from './data.js';
<<<<<<< Updated upstream

const app = express();

=======
import userRouter from './routers/userRouter.js';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import path from "path";
import { fileURLToPath } from 'url';
import categoryRouter from './routers/categoryRouter.js';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// import categoryRouter from './routers/categoryRouter.js';
// to read the content of env
dotenv.config();

const app = express();

// these two middleware will transfer the data to req.body in the app
// a middleware that parse json data in the body of the request
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, "uploads")));

// mongoose.connect('mongodb://localhost/smile',{
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// })
// .then(db => console.log('DB is connected'))
// .catch(err => console.log(err));

app.use('/api/users',userRouter);

app.use('/api/products',productRouter);
app.use('/api/categories',categoryRouter);


>>>>>>> Stashed changes
app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Serve at http://localhost:${port}`);
})