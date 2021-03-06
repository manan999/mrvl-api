const exp = require('express') ;

const Story = require('../models/Story.js') ;
const Team = require('../models/Team.js') ;
const {Hero, Villain} = require('../models/Hero.js') ;
const writeDiary = require('../src/writeDiary.js') ;

const router = new exp.Router() ;

router.get('/team', (req, res) => {
	const { limit, name } = req.query ;
	console.log('team requested') ;

  	if(limit)
  	{ 	writeDiary('teamGet'+limit) ;
  		Team.find({}).limit(parseInt(limit)).sort('rank')
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("error fetching team data") ;
    	})
		.catch(err => res.status(404).json(err.message)) ;
	}
  	else if(name)
	{	writeDiary('teamGet'+name) ;
		Team.findByName(name)
	    .then( data => {
	    if(data.name)
			res.json(data) ;
	    else
			res.status(404).json("error fetching team data") ;
    	})
		.catch(err => res.status(404).json(err.message) ) ;
	}
 	else
  	{ 	writeDiary('teamGet') ;
  		Team.find({}).sort('rank')
		.then(heroes => res.json(heroes))
		.catch(err => res.status(404).json(err.message)) ;
  	}
}) ;

router.get('/tmem', (req, res) => {
	const {name} = req.query ;
	console.log(`Member for ${name} Requested` ) ;

	let members = [] ;
	let resp = {} ;

	writeDiary('teamMembersGet'+name) ;
	Team.findByName(name)
    .then( data => {
	    if(data.name)
	    {	resp = data ;
			return Hero.find({ name : { $in: data.member} }).sort('rank') ;
	    }
	    else
			res.status(404).json("error fetching team data") ;
	})
	.then( data2 => {
		members = [ ...members, data2]
		return Villain.find({ name : { $in: resp.member} }).sort('rank') ; ;
	})
	.then( data3 => {
		members = [ ...members, data3]
		res.json(members) ;
	})
	.catch(err => res.status(404).json(err.message) ) ;
}) ;

router.get('/tst', (req, res) => {
	const {name} = req.query ;
	console.log(`Stories for ${name} Requested` ) ;

	if(name)
	{	writeDiary('storyGet'+name) ;
		Story.find({ team : name }, "name link") 
	    .then( data => {
	    if(data)
			return res.json(data) ; 
	    else
			res.status(404).json("error fetching team data") ;
		})
		.catch(err => res.status(404).json(err.message) ) ;
	}
	else
	{	res.status(404).json("Error with character name")
	}
}) ;

router.get('/memt', (req, res) => {
	const {name} = req.query ;
	console.log(`Teams for ${name} Requested` ) ;

	if(name)
	{	writeDiary('membersTeamGet'+name) ;
		Team.find({ member : name }, "name link") 
	    .then( data => {
	    if(data)
			return res.json(data) ; 
	    else
			res.status(404).json("error fetching team data") ;
		})
		.catch(err => res.status(404).json(err.message) ) ;
	}
	else
	{	res.status(404).json("Error with character name")
	}
}) ;

module.exports = router ;