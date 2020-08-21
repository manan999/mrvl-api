const mongoose = require('mongoose') ;

const StorySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	rank: {
		type: Number,
		required: true,
	},
	descr: {
		type: String,
		trim: true,
		required: true,
	},
	link : {
		type: String,
		trim: true,
	},
	data : [{
		hindi: String,
		english: String,
		img: String,
		page: Number,	
	}]
}, { 
	timestamps: true
}) ;

StorySchema.statics.findByName = async function(name){
	const Story = await this.findOne( {name} )
	
	if(!Story)
		throw new Error("Story with this name does not exist") ;
	else
		return Story ;
}

//Comment this method while debugging
StorySchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.__v ;

	return obj ;
}

const Story = mongoose.model('Story', StorySchema) ;

module.exports = Story ;