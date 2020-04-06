const exp = require('express') ;
const bc = require('bcryptjs') ;

const {Hero} = require('../models/Hero.js') ;
// const auth = require('../src/auth.js') ;

const router = new exp.Router() ;

router.get('/hero', (req, res) => {
	const { limit, name } = req.query ;
	console.log('hero(es) requested') ;

 //  	if(limit)
 //  	{ db.select('*').from('hero')
 //  		.orderBy('id').limit(limit)
 //    	.then ( data => {
	// 	if(data.length)
	// 		res.json(data) ;
	// 	else
	// 		res.status(404).json("error fetching hero data") ;
 //    	})
	// 	.catch(err => res.status(404).json("error fetching hero")) ;
	// }
  
 //  	else if(name)
	// {
 //   		db.where('name', name).select('*')
	//     .from('hero').orderBy('id')
	//     .then( data => {
	//     if(data.length)
	// 		res.json(data) ;
	//     else
	// 		res.status(404).json("error fetching hero data") ;
 //    	})
	// 	.catch(err => res.status(404).json("error fetching hero")) ;
	// }

 // 	else
 //  	{
	    Hero.find({})
		.then(heroes => res.json(heroes))
		.catch(err => res.status(404).json(err.message)) ;
  	// }
} ) ;

// router.post('/hero', (req, res) => insert.handle(req, res, db, 'hero') ) ;
// router.put('/hero', (req, res) => update.handle(req, res, db, 'hero') ) ;
// router.delete('/hero', (req, res) => del.handle(req, res, db, 'hero') ) ;

const handleBig = (req, res, db) => {
	const { limit, name } = req.query ;
	console.log('hero detail requested') ;


	if(name)
	{
		db('hdetail').join('hero', 'hero.id', '=', 'hdetail.id').where('hero.name', name)
		.select('hero.name','hero.id','hero.realname','hdetail.code','hdetail.gender','hdetail.origin',
			'hdetail.country','hdetail.universe','hdetail.first','hdetail.intel','hdetail.stren',
		 	'hdetail.speed','hdetail.combt','hdetail.tough','hdetail.magic', 'hero.biglink', 'hdetail.bio')
		.then( data => {
	    if(data.length)
			res.json(data) ;
	    else
			res.status(404).json("error fetching hero data") ;
    	})
		.catch(err => res.status(404).json("error fetching hero")) ;
	}
	else
	{
		db('hdetail').join('hero', 'hero.id', '=', 'hdetail.id')
		.select('hero.name','hero.id','hero.realname','hdetail.code','hdetail.gender','hdetail.origin',
			'hdetail.country','hdetail.universe','hdetail.first','hdetail.intel','hdetail.stren',
		 	'hdetail.speed','hdetail.combt','hdetail.tough','hdetail.magic', 'hero.biglink', 'hdetail.bio')
		.then( data => {
	    if(data.length)
			res.json(data) ;
	    else
			res.status(404).json("error fetching hero data") ;
    	})
		.then( data => res.json(data) ) ;
	}
}

module.exports = router ;