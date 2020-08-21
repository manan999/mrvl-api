const exp = require('express') ;

const Story = require('../models/Story.js') ;
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

module.exports = router ;