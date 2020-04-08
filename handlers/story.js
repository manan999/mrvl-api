
// app.get('/story', (req, res) => story.handle(req, res, db) ) ;
// app.post('/story', (req, res) => insert.handle(req, res, db, 'story') ) ;
// app.put('/story', (req, res) => update.handle(req, res, db, 'story') ) ;
// app.delete('/story', (req, res) => del.handle(req, res, db, 'story') ) ;

// const handle = (req, res, db) => {
// 	const { limit, name } = req.query ;
// 	console.log('story requested') ;

//   	if(limit)
//   	{ 	db.select('*').from('story')
//   		.orderBy('id').limit(limit)
//     	.then ( data => {
// 		if(data.length)
// 			res.json(data) ;
// 		else
// 			res.status(404).json("error fetching story data") ;
//     	})
// 		.catch(err => res.status(404).json("error fetching story")) ;
// 	}
  
//   	else if(name)
// 	{
//    		db.where('story.name', name).select('*')
//    		.from('story').orderBy('id')
// 	    .then( data => {
// 	    if(data.length)
// 			res.json(data) ;
// 	    else
// 			res.status(404).json("error fetching story data") ;
//     	})
// 		.catch(err => res.status(404).json("error fetching story")) ;
// 	}

//  	else
//   	{
// 	    db.select('*').from('story').orderBy('id')
// 	    .then( data => {
// 	    if(data.length)
// 			res.json(data) ;
// 	    else
// 			res.status(404).json("error fetching story data") ;
//     	})
// 		.catch(err => res.status(404).json("error fetching story")) ;
//   	}
// }

// module.exports = {
// 	handle : handle ,
	
// } ;