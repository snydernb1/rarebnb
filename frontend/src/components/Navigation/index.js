import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>

      <NavLink className="navlink" exact to="/">rarebnb</NavLink>

      <div>

      {sessionUser && <NavLink to='/new'>Create a New Spot</NavLink>}

      {isLoaded && (
      <ProfileButton user={sessionUser} />
      )}
      </div>

    </div>
  );
}

export default Navigation;
