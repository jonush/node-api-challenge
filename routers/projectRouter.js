const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req,res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve projects" });
    })
});

router.get('/:id', validateProjectId, (req,res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve the project" });
    })
});

router.post('/', validateProps("name"), validateProps("description"), (req,res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error creating the project" });
    })
});

router.put('/:id', (req,res) => {
  console.log(req.body);
  const edit = req.body;
  if(!req.params.id) {
    res.status(404).json({ message: "The project with the specified ID does not exist." });
  } else if(edit.name === '' || edit.description === '') {
    res.status(400).json({ errorMessage: "Please provide the name and description for the project." });
  } else {
    Projects.update(req.params.id, edit)
      .then(project => {
        res.status(200).json(edit);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The project information could not be modified." });
      })
  }
});

router.delete('/:id', validateProjectId, (req,res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json({ message: "Project has been deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error deleting the project" });
    })
});

router.get('/:id/actions', validateProjectId, (req,res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error retrieving the project actions" });
    })
});

router.post('/:id/actions', validateProps("notes"), validateProps("description"), (req,res) => {
  const newAction = { ...req.body, project_id: req.params.id };
  Actions.insert(newAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error creating the action" });
    })
});

// Middleware
function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "invalid project id" })
      }
    })
    .catch(err => {
      console.log(err);
    })
};

function validateProps(prop) {
  return function(req, res, next) {
    if(req.body) {
      if(req.body[prop]) {
        next();
      } else {
        res.status(400).json({ message: `Missing ${prop}` });
      }
    } else {
      res.status(400).json({ message: "missing post data" });
    }
  }
};

module.exports = router;