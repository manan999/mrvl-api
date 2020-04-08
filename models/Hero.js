const mongoose = require('mongoose') ;
const jwt = require('jsonwebtoken') ;

const HeroSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	realname: {
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
	gender: {
		type: String,
		trim: true, 
		required : true,
	},
	origin: {
		type: String,
		trim: true, 
		required : true,
	},
	country : {
		type: String,
		trim: true,
	},
	universe : {
		type: String,
		trim: true,
	},
	first : {
		type: String,
		trim: true,
		required : true,
	},
	bio : {
		type: String,
		trim: true,
	},
	intel: {
		type: Number,
		required: true,
		validate(intel) {
			if (intel < 10 || intel > 100)
				throw new Error('Intelligence value range incorrect') ;
		}
	},
	stren: {
		type: Number,
		required: true,
		validate(stren) {
			if (stren < 10 || stren > 100)
				throw new Error('Strength value range incorrect') ;
		}
	},
	magic: {
		type: Number,
		required: true,
		validate(magic) {
			if (magic < 10 || magic > 100)
				throw new Error('Magic value range incorrect') ;
		}
	},
	combt: {
		type: Number,
		required: true,
		validate(combt) {
			if (combt < 10 || combt > 100)
				throw new Error('Combat value range incorrect') ;
		}
	},
	tough: {
		type: Number,
		required: true,
		validate(tough) {
			if (tough < 10 || tough > 100)
				throw new Error('Toughness value range incorrect') ;
		}
	},
	speed: {
		type: Number,
		required: true,
		validate(speed) {
			if (speed < 10 || speed > 100)
				throw new Error('Speed value range incorrect') ;
		}
	},
	// tokens: [{
	// 	token: {
	// 		type: String, 
	// 		required: true 
	// 	}
	// }],
}, { 
	timestamps: true
}) ;

HeroSchema.statics.findByName = async function(name){
	// Same as
	// const Hero = await Hero.findOne( {name: name})
	const Hero = await this.findOne( {name} )
	
	
	if(!Hero)
		throw new Error("Hero with this name does not exist") ;
	else
		return Hero ;
}

// HeroSchema.methods.generateAuthToken = function(){
// 	const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET) ;
// 	this.tokens = this.tokens.concat({ token }) ;
// 	this.save() ;
// 	return token ;
// }

// HeroSchema.methods.uploaded = function(){
// 	this.uploads = this.uploads + 1 ;
// 	this.save() ;
// }

//Comment this method while debugging
HeroSchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.__v ;

	return obj ;
}

const Hero = mongoose.model('Hero', HeroSchema) ;

const Villain = mongoose.model('Villain', HeroSchema) ; 

module.exports =  { Hero , Villain } ;