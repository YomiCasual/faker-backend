import readXlsxFile from 'read-excel-file/node/index.commonjs.js';

import fakerrModel from '../model/fakerrModel.js';

export const createFakerr = async (req, res) => {
	try {
		const {
			companyName = 'Fake Jobs',
			companyAddress = 'Faker Address',
		} = req.body;

		if (!req.body?.companyName.trim() && !req.body?.companyAddress.trim()) {
			return res.status(400).json({
				isSuccessful: false,
				message: 'Please enter one field',
			});
		}

		let fakerr = fakerrModel({ companyName, companyAddress });
		let fakerrSave = await fakerr.save();
		res.status(201).json({
			isSuccessful: true,
			data: fakerrSave,
		});
	} catch (error) {
		res.status(400).json({
			isSuccessful: false,
			message: error,
		});
	}
};

export const getFakerr = async (req, res) => {
	try {
		let { query = '', pageSize = 8, page = 0 } = req.body;
		let regex = new RegExp(query, 'i');
		const fakerrData = await fakerrModel
			.find({
				$and: [{ $or: [{ companyName: regex }, { companyAddress: regex }] }],
			})
			.skip(page * pageSize)
			.limit(pageSize)
			.sort('-createdAt');
		// let fakerrData = await fakerrModel.find({ $text: { $search: query } })
		res.status(200).json({
			isSuccessful: true,
			data: fakerrData,
		});
	} catch (err) {
		res.status(400).json({
			isSuccessful: false,
			message: 'Cannot find query',
		});
	}
};

export const uploadFile = async (req, res) => {
	try {
		if (req.file == undefined) {
			return res.status(400).send('Please upload an excel file!');
		}

		let path = 'public/uploads/' + req.file.originalname;
		// let lists = [];
		let files = await readXlsxFile(path)
			.then(rows => {
				// skip header
				rows.shift();
				let newLists = [];
				rows.forEach(row => {
					let list = {
						companyName: row[0],
						companyAddress: row[1],
					};
					newLists.push(list);
				});
				return newLists;
			})
			.catch(err => {
				return res.status(500).send({
					message: 'Could not upload the file1: ' + req.file.originalname,
				});
			});

		await fakerrModel.create(files);
		return res.json({
			isSuccessful: true,
			data: 'Fakes jobs successfully added',
		});
	} catch (error) {
		res.status(500).send({
			message: 'Could not upload the file2: ' + req.file.originalname,
		});
	}
};
