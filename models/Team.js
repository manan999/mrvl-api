const mongoose = require('mongoose') ;

const TeamSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	link : {
		type: String,
		trim: true,
	},
	bio : {
		type: String,
		trim: true,
	},
	leader: [String],
	notable: [String],
	members: [String],
}, { 
	timestamps: true
}) ;

TeamSchema.statics.findByName = async function(name){
	const Team = await this.findOne( {name} )
	
	if(!Team)
		throw new Error("Team with this name does not exist") ;
	else
		return Team ;
}

//Comment this method while debugging
TeamSchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.__v ;

	return obj ;
}

const Team = mongoose.model('Team', TeamSchema) ;

module.exports =  Team ;