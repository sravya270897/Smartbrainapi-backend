const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Containers/register');
const signin = require('./Containers/signin');
const profile= require('./Containers/profile');
const image = require('./Containers/image')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 
const db=knex({
  client: 'pg',
 connection: {
 	connectionString: process.env.DATABASE_URL,
    ssl: true
  }
  //  host: 'postgresql-flexible-73536',
   // user:'postgres',
   // password:'sravya27',
    //database:'smart-brain' 
});

db.select('*')
  .from('users')
  .then(data => {});

const app=express();



app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => { res.json('it is working') })
	
app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})



app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})
app.listen(process.env.PORT || 3000 ,() => {
	console.log(`App is running in the port ${process.env.PORT}`);
})






