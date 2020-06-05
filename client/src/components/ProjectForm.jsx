import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialProject = {
  name: '',
  description: ''
};

const ProjectForm = ({ fetchProjects }) => {
  const [ project, setProject ] = useState(initialProject);
  const [ creating, setCreating ] = useState(false);
  const history = useHistory();

  const handleInput = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('localhost:5000/projects', project)
      .then(res => {
        fetchProjects();
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {!creating ?
        <button onClick={() => setCreating(true)}>Create a Project</button> :
        <form onSubmit={handleSubmit}>
          <input 
            type='text'
            name='name'
            value={project.name}
            onChange={handleInput}
          />

          <input 
            type='text'
            name='description'
            value={project.description}
            onChange={handleInput}
          />

          <button type='submit'>Create Project</button>
          <button onClick={() => setCreating(false)}>Cancel</button>
        </form>
      }
    </div>
  )
};

export default ProjectForm;