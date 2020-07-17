const exp = require('express') ;

const Team = require('../models/Team.js') ;

const router = new exp.Router() ;

const handle = (req, res, db) => {
	const { limit, name } = req.query ;
	console.log('team requested') ;

  	if(limit)
  	{ 	db.select('*').from('team')
  		.orderBy('id').limit(limit)
    	.then ( data => {
		if(data.length)
			res.json(data) ;
		else
			res.status(404).json("team not found") ;
    	})
		.catch(err => res.status(404).json("error fetching team")) ;
	}
  
  	else if(name)
	{
   		db.where('team.name', name).select('*')
   		.from('team').orderBy('id')
	    .then( data => {
	    if(data.length)
			res.json(data) ;
	    else
			res.status(404).json("team not found") ;
    	})
		.catch(err => res.status(404).json("error fetching team")) ;
	}

 	else
  	{
		db.select('*').from('team').orderBy('id')
	    .then( data => {
	    if(data.length)
			res.json(data) ;
	    else
			res.status(404).json("Team not found") ;
    	})
		.catch(err => res.status(404).json("error fetching team")) ;
  	}
}

const handleSpec = (req, res, db, txt) => {
	console.log("Specific Team Requested" ) ;
	let resp = [] ;
	let arr = [] ;
	const {team, ch} = req.query
	if(team)
	{	
		db.select('ccode').from('tmem')
			.whereIn('tcode', function() {
			this.where('team.name', team).select('code').from('team');
		})
		.then( data => {
			if(data.length)
			{	data = data.map((one) => one.ccode) ;
				db.select('id').from(((txt === 'vill')?'vdetail':'hdetail'))
				.whereIn('code', data)
				.then( data2 => {
					if(data2.length)
					{	data2 = data2.map((two) => two.id) ;
						db.select('*').from(((txt === 'vill')?'villain':'hero'))
						.whereIn('id', data2)
						.then(data3 =>{
							if(data3.length)
								res.json(data3) ;
							else
								res.status(404).json("Hero (Team) not found") ;
						})
						.catch(err => res.status(404).json("Error searching by ID") ) ;
					}
					else 
						res.status(404).json("error fetching hero codes") ;
				})
				.catch(err => res.status(404).json("Error searching by code") ) ;
			}
	    	else
				res.status(404).json("Team not found") ;
    	})
		.catch(err => res.status(404).json("Error Fetching Team")) ;
	}
	else if (ch)
	{	const det = ((txt === 'hero')?'hdetail':'vdetail') ;
		db.select('tcode').from('tmem')
			.whereIn('ccode', function() {
			this.where(det+'.id', ch).select('code').from(det);
		})
		.then( data => {
			if(data.length)
			{	data = data.map((one) => one.tcode) ;
				db.select('*').from('team')
				.whereIn('code', data)
				.then( data2 => {
					if(data2.length)
						res.json(data2) ;
					else 
						res.status(404).json("error fetching team codes") ;
				})
				.catch(err => res.status(404).json("Error searching by code") ) ;
			}
	    	else
				res.status(404).json("Teams not found for this character") ;
    	})
		.catch(err => res.status(404).json("error fetching team")) ;
	}
	else
	{
	    db('tmem').join('team', 'tmem.tcode', '=', 'team.code')
		.select('team.name','tmem.ccode')
	    .then( data => {
	    if(data.length)
			res.json(data) ;
	    else
			res.status(404).json("team not found") ;
    	})
		.catch(err => res.status(404).json("error fetching team")) ;
  	}
}

const findVillTeams = (data, arr, db) => {
	
	return db.select('id').from('vdetail')
	.whereIn('code', arr) ;

}

const findVillId = (arr, db) => {
	return db.select('*').from('villain')
	.whereIn('id', arr) ;
}

module.exports = {
	handle : handle ,
	handleSpec : handleSpec ,
} ;