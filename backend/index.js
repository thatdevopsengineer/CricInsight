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
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        else{
            res.json("No records found! ");
        }
    })
})

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
  
  app.post('/updateUser', (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    const name = `${firstName} ${lastName}`;
  
    FormDataModel.findOneAndUpdate({ email: email }, { name: name, password: password }, { new: true })
      .then(updatedUser => {
        if (updatedUser) {
          res.json(updatedUser);
        } else {
          res.status(404).json("User not found");
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  app.delete('/deleteUser', (req, res) => {
    const email = req.query.email;
  
    FormDataModel.findOneAndDelete({ email: email })
      .then(deletedUser => {
        if (deletedUser) {
          res.json("User deleted successfully");
        } else {
          res.status(404).json("User not found");
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
  });
  