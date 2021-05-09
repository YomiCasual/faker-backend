import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import connection from './db/index.js';
import fakerrRoute from './routes/fakerrRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// app.use(express.bodyParser())

//conections
connection();

app.use('/api/v1/', fakerrRoute);

//routes

const db = mongoose.connection;

const PORT = process.env.PORT || 	5000;

// process.on("unhandledRejection", err => {
// 	console.log("UNHANDLED REJECTION")
// 	console.loog(err.name, err.message)
// 	app.close(() => {
// 		process.exit(1)
// 	})
// })

app.listen(PORT, () => {
	console.log('Listening on Port 5000');
});
