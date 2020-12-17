const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey:'Use your own API key'
});

const handleApiCall = (req,res) => {
	app.models 
      .predict(/*'c0c0ac362b03416da06ab3fa36fb58e3',*/
       Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}



const handleImage = (req,res,db) => {
    const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
       res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get an entry'))
}	

module.exports = {
	handleImage,
	handleApiCall
}
