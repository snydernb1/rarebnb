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
      {isLoaded && (
      <ProfileButton user={sessionUser} />
      )}
      </div>

    </div>
  );
}

export default Navigation;
