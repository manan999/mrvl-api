const Diary = require('../models/Diary.js') ;

const change = (str) => {
	const obj = new Diary({date: new Date(), changes : 1, data : {}}) ;

	Diary.last()
	.then(page => {
		if( page === 'no')
		{	obj.data[str] = 1 ;
			obj.markModified('data') ;
			return obj.save() ;
		}	
		else
		{
			page.changes += 1 ;
			if(page.data[str])
				page.data[str] += 1 ;
			else
				page.data[str] = 1 ;
			page.markModified('data') ;
			return page.save() ;
		}
	} )
	.then( x => console.log('Succesfully Changed') ) 
	.catch( err => console.log(err) );
}

module.exports = change ;