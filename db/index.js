import mongoose from 'mongoose';

const connection = () =>
	mongoose
		.connect('mongodb://localhost:27017/fakerr', {
			useFindAndModify: false,
			useUnifiedTopology: true,
			useNewUrlParser: true,
            useCreateIndex: true
		})
		.then(res => {
			console.log('connected');
		})
		.catch(err => console.log(err));

export default connection;
