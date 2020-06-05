import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const Project = ({ fetchProjects }) => {
  const [ edit, setEdit ] = useState([]);
  const [ editing, setEditing ] = useState(false);
  const [ actions, setActions ] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  
  useEffect(() => {
    getProject();
    getActions();
  }, []);

  const getProject = () => {
    axios.get(`https://node-api-sprint.herokuapp.com/projects/${id}`)
      .then(res => {
        setEdit(res.data);
      })
      .catch(err => console.log(err));
  };

  const getActions = () => {
    axios.get(`https://node-api-sprint.herokuapp.com/projects/${id}/actions`)
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

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://node-api-sprint.herokuapp.com/projects/${id}`, edit)
      .then(res => {
        setEditing(false);
        getProject();
      })
      .catch(err => console.log(err));
  };

  const deleteProject = e => {
    e.preventDefault();
    axios.delete(`https://node-api-sprint.herokuapp.com/projects/${id}`)
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
        {!edit.completed ? <h2 className='no'>Incomplete</h2> : <h2 className='yes'>Completed</h2>}

        {
          actions.map((action, index) => (
            <div className='action' key={index}>
              <h3>{action.description}</h3>
              <p>{action.notes}</p>
              {!action.completed ? <h2 className='no'>Incomplete</h2> : <h2 className='yes'>Completed</h2>}
            </div>
          ))
        }

        <button onClick={() => setEditing(true)}>Edit Project</button>
        <button className='cancel' onClick={() => history.push('/')}>Back</button>
      </div> :
      <form onSubmit={handleSubmit}>
        <h1>Edit your project</h1>
        <textarea 
          name='name'
          value={edit.name}
          onChange={handleEdit}
        />

        <textarea 
          name='description'
          value={edit.description}
          onChange={handleEdit}
        />

        <button type='submit'>Save</button>
        <button className='delete' onClick={deleteProject}>Delete</button>
        <button className='cancel' onClick={() => setEditing(false)}>Cancel</button>
      </form>
      }
    </div>
  )
};

export default Project;