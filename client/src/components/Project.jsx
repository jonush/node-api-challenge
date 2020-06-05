import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const Project = ({ fetchProjects }) => {
  const [ edit, setEdit ] = useState([]);
  const [ editing, setEditing ] = useState(false);
  const [ finished, setFinished ] = useState(edit.completed);
  const [ actions, setActions ] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  
  useEffect(() => {
    getProject();
    getActions();
  }, []);

  const getProject = e => {
    e.preventDefault();
    axios.get(`localhost:5000/projects/${id}`)
      .then(res => {
        setEdit(res.data[0]);
      })
      .catch(err => console.log(err));
  };

  const getActions = e => {
    e.preventDefault();
    axios.get(`localhost:5000/projects/${id}/actions`)
      .then(res => {
        setActions(res.data);
      })
      .catch(err => console.log(err));
  }

  const handleEdit = e => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
  };

  const toggleProject = () => {
    setFinished(!edit.completed);
    setEdit({
      ...edit,
      completed: finished
    });
    handleSubmit();
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`localhost:5000/projects/${id}`, edit)
      .then(res => {
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteProject = e => {
    e.preventDefault();
    axios.delete(`localhost:5000/projects/${id}`)
      .then(res => {
        fetchProjects();
        history.push('/')
      })
      .catch(err => console.log(err));
  }
  
  return (
    <div>
      {!editing ? 
      <div className='project'>
        <h1>{edit.name}</h1>
        <h3>{edit.description}</h3>
        {finished ? 
          <h2 className='no' onClick={toggleProject}>{finished}</h2> :
          <h2 className='yes' onClick={toggleProject}>{finished}</h2>
        }

        {
          actions.map((action, index) => (
            <div className='action' key={index}>
              <h3>{action.description}</h3>
              <p>{action.notes}</p>
              <h2>{action.completed}</h2>
            </div>
          ))
        }

        <button onClick={() => setEditing(true)}>Edit Project</button>
        <button onClick={deleteProject}>Delete</button>
        <button onClick={() => history.push('/projects')}>Back</button>
      </div> :
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='name'
          value={edit.name}
          onChange={handleEdit}
        />

        <input 
          type='text'
          name='description'
          value={edit.description}
          onChange={handleEdit}
        />

        <button type='submit'>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </form>
      }
    </div>
  )
};

export default Project;