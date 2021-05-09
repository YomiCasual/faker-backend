import mongoose from 'mongoose';

import { DATABASE } from '../config.js';

const connection = () =>
	mongoose
		.connect(process.env.DATABASE, {
			useFindAndModify: false,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		})
		.then(res => {
			console.log('connected');
		})
		.catch(err => console.log(err));

export default connection;
