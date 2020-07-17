const exp = require('express') ;

const {Villain} = require('../models/Hero.js') ;

const router = new exp.Router() ;

router.get('/vill', (req, res) => {
	const { limit, name } = req.query ;
	console.log('villain(s) requested') ;

  	if(limit)
  	{ 	
  		Villain.find({}, "name realname link biglink")
  		.limit(parseInt(limit)).sort('rank')
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("error fetching villain data") ;
    	})
		.catch(err => res.status(404).json(err)) ;
	}
   	else if(name)
	{
   		Villain.findByName(name)
	    .then( data => {
	    if(data.name)
			res.json(data) ;
	    else
			res.status(404).json("error fetching villain data") ;
    	})
		.catch(err => res.status(404).json(err.message) ) ;
	}
 	else
  	{
	    Villain.find({}, "name realname link biglink").sort('rank')
		.then(vills => res.json(vills))
		.catch(err => res.status(404).json(err.message)) ;
  	}
} ) ;

// router.post('/hero', (req, res) => insert.handle(req, res, db, 'hero') ) ;
// router.put('/hero', (req, res) => update.handle(req, res, db, 'hero') ) ;
// router.delete('/hero', (req, res) => del.handle(req, res, db, 'hero') ) ;

router.get('/bigv', (req, res) => {
	const { limit, name } = req.query ;
	console.log('villain(s) requested') ;

  	if(limit)
  	{ 	
  		Villain.find({}).limit(parseInt(limit)).sort('rank')
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("error fetching villain data") ;
    	})
		.catch(err => res.status(404).json(err)) ;
	}
   	else if(name)
	{
   		Villain.findByName(name)
	    .then( data => {
	    if(data.name)
			res.json(data) ;
	    else
			res.status(404).json("error fetching villain data") ;
    	})
		.catch(err => res.status(404).json(err.message) ) ;
	}
 	else
  	{
	    Villain.find({}).sort('rank')
		.then(vills => res.json(vills))
		.catch(err => res.status(404).json(err.message)) ;
  	}
} ) ;

module.exports = router ;