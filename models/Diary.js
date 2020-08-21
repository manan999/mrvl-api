const mongoose = require('mongoose') ;

const DiarySchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	changes: {
		type: Number,
		required: true,
	},
	data: {	},
}, { 
	timestamps: true
}) ;

DiarySchema.statics.last = async function(){
	const Diary = await this.findOne().sort({date: -1}) ;
	const dt = new Date() ;
	
	if(Diary.date.getDate() === dt.getDate() && dt.getMonth() === Diary.date.getMonth()) 
		return Diary ;
	else 
		return 'no' ;
}

//Comment this method while debugging
DiarySchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.__v ;

	return obj ;
}

const Diary = mongoose.model('Diary', DiarySchema) ;

module.exports = Diary ;