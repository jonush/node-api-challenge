import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  return (
    <div className='list'>
      {
        projects.map((p, index) => (
          <Link key={index} to={`/${p.id}`}>
            <h2>{p.name}</h2>
          </Link>
        ))
      }
    </div>
  )
};

export default ProjectList;