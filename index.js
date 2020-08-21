const exp = require('express') ;
const cors = require('cors') ;

require('./src/connect.js') ;
const heroHandler = require('./handlers/hero.js') ;
const villainHandler = require('./handlers/villain.js') ;
const teamHandler = require('./handlers/team.js') ; 
const storyHandler = require('./handlers/story.js') ;
const writeDiary = require('./src/writeDiary.js') ;

const app = exp() ;

app.use(exp.json()) ;
app.use(cors()) ;

app.use(heroHandler) ;
app.use(villainHandler) ;
app.use(teamHandler) ;
app.use(storyHandler) ;

app.get('/', (req, res) => {
	console.log(req.body) ;
	console.log(req.headers) ;
	console.log(req.params) ;
	console.log(req.url) ;
	writeDiary('homeGet') ;

	res.json("Please give the required endpoint for json data") ;
}) ;

app.listen(process.env.PORT || 8080, () => {
	console.log("Server is Online") ;
}) ;