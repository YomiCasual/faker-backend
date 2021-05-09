import mongoose from 'mongoose';

const fakerrSchema = mongoose.Schema(
	{
		companyName: {
			type: String,
			index: true,
		},
		companyAddress: {
			type: String,
			index: true,
		},
	},
	{ timestamps: true },
);

fakerrSchema.index({ companyName: 1, companyAddress: 1 });

const fakerrModel = mongoose.model('fakeJobs', fakerrSchema);

export default fakerrModel;
