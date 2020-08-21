const exp = require('express') ;

const {Hero} = require('../models/Hero.js') ;
const writeDiary = require('../src/writeDiary.js') ;

const router = new exp.Router() ;

router.get('/hero', (req, res) => {
	const { limit, name } = req.query ;
	console.log('hero(es) requested') ;

  	if(limit)
  	{ 	writeDiary('heroGet'+limit) ;
  		Hero.find({}, "name realname link biglink")
  		.limit(parseInt(limit)).sort('rank')
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("error fetching hero data") ;
    	})
		.catch(err => res.status(404).json(err.message)) ;
	}
    else if(name)
	{	writeDiary('heroGet'+name) ;
   		Hero.findByName(name)
	    .then( data => {
	    if(data.name)
			res.json(data) ;
	    else
			res.status(404).json("error fetching hero data") ;
    	})
		.catch(err => res.status(404).json(err.message) ) ;
	}
 	else
  	{	writeDiary('heroGet') ;
	    Hero.find({}, "name realname link biglink").sort('rank')
		.then(heroes => res.json(heroes))
		.catch(err => res.status(404).json(err.message)) ;
  	}
} ) ;

// router.post('/hero', (req, res) => insert.handle(req, res, db, 'hero') ) ;
// router.put('/hero', (req, res) => update.handle(req, res, db, 'hero') ) ;
// router.delete('/hero', (req, res) => del.handle(req, res, db, 'hero') ) ;

router.get('/bigh', (req, res) => {
	const { limit, name } = req.query ;
	console.log('hero(es) requested') ;

  	if(limit)
  	{ 	writeDiary('heroDataGet'+limit) ;
  		Hero.find({}).limit(parseInt(limit)).sort('rank')
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("error fetching hero data") ;
    	})
		.catch(err => res.status(404).json(err.message)) ;
	}
    else if(name)
	{	writeDiary('heroDataGet'+name) ;
   		Hero.findByName(name)
	    .then( data => {
	    if(data.name)
			res.json(data) ;
	    else
			res.status(404).json("error fetching hero data") ;
    	})
		.catch(err => res.status(404).json(err.message) ) ;
	}
 	else
  	{	writeDiary('heroDataGet') ;
	    Hero.find({}).sort('rank')
		.then(heroes => res.json(heroes))
		.catch(err => res.status(404).json(err.message)) ;
  	}
} ) ;

module.exports = router ;