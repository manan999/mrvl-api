const mongoose = require('mongoose') ;

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then( () => console.log('Database Connected'))
.catch(error => console.log(error)) ;