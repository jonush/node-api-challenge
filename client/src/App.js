import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import ProjectList from './components/Projectlist';
import ProjectForm from './components/ProjectForm';
import Project from './components/Project';
import './App.css';

function App() {
  const [ projects, setProjects ] =  useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('localhost:5000/projects')
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <Route exact path='/'>
        <ProjectList projects={projects} />
        <ProjectForm fetchProjects={fetchProjects} />
      </Route>

      <Route path='/:id'>
        <Project fetchProjects={fetchProjects} />
      </Route>
    </div>
  );
}

export default App;
