const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bear = require('../app/models/bear');

const bearRouter = express.Router();

bearRouter.use(bodyParser.json());


//routes that end in /bears
bearRouter.route('/bears')
.get((req, res, next) => {
  bear.find({})
      .then((dishes) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dishes);
      }, (err) => next(err))
      .catch((err) => next(err));
})  
.post((req, res) => {
    bear.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
      res.json({ message: "bear created!"})
})

//Creating Routes for A Single Item
//on routes that end in /bears/:bear_id
/*
Get a single bear.
Update a bear's info.
Delete a bear. 
*/

bearRouter.route('/bears/:bear_id')
// get the bear with that id
.get((req, res, next) => {
  bear.findById(req.params.bear_id)
      .then((dishes) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dishes);
      }, (err) => next(err))
      .catch((err) => next(err));
})  

// update the bear with this id
.put((req, res, next) =>  {
      // use our bear model to find the bear we want
      bear.findById(req.params.bear_id)
        .then((bear) => {
          bear.name = req.body.name;  // update the bears info
          // save the bear
          bear.save((err) => {
            if (err)
              res.send(err);
              res.json({ message: 'Bear updated!' });
          });
      }, (err) => next(err))
      .catch((err) => next(err)) 
})

// delete the bear with this id
.delete((req, res, next) => {
  bear.findByIdAndRemove(req.params.bear_id)
    .then((bear) => {
        res.json({ message: "Successfully deleted "})  
  }, (err) => next(err))
  .catch((err) => next(err))
})

module.exports = bearRouter;