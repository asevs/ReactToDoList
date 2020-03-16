import React, { Component } from 'react';
import { CurrentUserConsumer } from '../../context/CurrentUser.context';
import './style.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginInNavbar = styled.div`zz
  margin-right: 30px;
  margin-left: 30px;
`;
const LoginLinkButton = styled.button`
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 0.8);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  margin-left: 30px;
`;

class Navbar extends Component {
  render() {
    return (
      <header>
        <img class="logo" src="" alt="logo" />
        <nav>
          <ul class="nav_links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/todolist">ToDoList</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <CurrentUserConsumer>
          {({ user, logout }) => (
            <LoginInNavbar>
              {user ? (
                <div>
                  Hello, {user.name}!<button onClick={logout}>Logout</button>
                </div>
              ) : (
                <div>
                  <Link to={`/login`}><LoginLinkButton>Log in</LoginLinkButton></Link>
                </div>
              )}
            </LoginInNavbar>
          )}
        </CurrentUserConsumer>
      </header>
    );
  }
}

export default Navbar;
