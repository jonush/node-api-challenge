import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h1>Projects from Node API</h1>
      {
        projects.map((p, index) => (
          <Link key={index} to='/:id'>
            <h2>{p.name}</h2>
          </Link>
        ))
      }
    </div>
  )
};

export default ProjectList;