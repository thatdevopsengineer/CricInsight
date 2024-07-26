const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/cricinsight');

app.post('/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const name = `${firstName} ${lastName}`;

    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create({ email, password, name })
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        });
});


app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

// Backend: 

app.get('/user', (req, res) => {
    const email = req.query.email;
    
    FormDataModel.findOne({ email: email })
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json("User not found");
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  


app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});