const mongoose = require('mongoose') ;

const StorySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	descr: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	link : {
		type: String,
		trim: true,
	},
	biglink : {
		type: String,
		trim: true,
	},
}, { 
	timestamps: true
}) ;

StorySchema.statics.findByName = async function(name){
	// Same as
	// const Story = await Story.findOne( {name: name})
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