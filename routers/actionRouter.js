const express = require('express');

const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req,res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve the actions" });
    })
});

router.get('/:id', validateActionId, (req,res) => {
  Actions.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve the actions" });
    })
});

router.put('/:id', validateActionId, (req,res) => {
  if(req.body.notes === '' || req.body.description === '') {
    res.status(400).json({ message: "Please provide the description and any notes" });
  } else {
    Actions.update(req.params.id, req.body)
      .then(action => {
        res.status(200).json(req.body);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "There was an error updating the action" });
      })
  }
});

router.delete('/:id', validateActionId, (req,res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json({ message: "Action has been deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error deleting the action" });
    })
});

// Middleware
function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if(action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "invalid action id" })
      }
    })
    .catch(err => {
      console.log(err);
    })
};

module.exports = router;