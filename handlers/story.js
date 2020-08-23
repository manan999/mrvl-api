const exp = require('express') ;

const Story = require('../models/Story.js') ;
const {Hero, Villain} = require('../models/Hero.js') ;
const writeDiary = require('../src/writeDiary.js') ;

const router = new exp.Router() ;

router.get('/story', (req, res) => {
	const { limit, name } = req.query ;
	console.log('Story requested') ;

  	if(limit)
  	{ 	writeDiary('storyGet'+limit) ;
  		Story.find({}).limit(parseInt(limit)).sort('rank')
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("error fetching Story data") ;
    	})
		.catch(err => res.status(404).json(err.message)) ;
	}
  	else if(name)
	{	writeDiary('storyGet'+name) ;
		Story.findByName(name)
	    .then( data => {
	    if(data.name)
			res.json(data) ;
	    else
			res.status(404).json("error fetching Story data") ;
    	})
		.catch(err => res.status(404).json(err.message) ) ;
	}
 	else
  	{ 	writeDiary('storyGet') ;
  		Story.find({}).sort('rank')
		.then(heroes => res.json(heroes))
		.catch(err => res.status(404).json(err.message)) ;
  	}
}) ;

router.get('/memst', (req, res) => {
	const {name, t} = req.query ;
	console.log(`Stories for ${name} Requested` ) ;

	if(name && t)
	{	writeDiary('storyGet'+name) ;
		let obj = (t === 'h')?{ hero : name }:{ villain : name} ;
		Story.find(obj, "name link") 
	    .then( data => {
	    if(data)
			return res.json(data) ; 
	    else
			res.status(404).json("error fetching story data") ;
		})
		.catch(err => res.status(404).json(err.message) ) ;
	}
	else
	{	res.status(404).json("Error with character name or type")
	}
}) ;

module.exports = router ;