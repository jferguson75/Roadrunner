import React from 'react';
import { Link } from 'react-router-dom';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch(e => {
    console.error(e);
  });
}

function handleLogout(instance) {
  instance.logoutPopup().catch(e => {
    console.error(e);
  });
}

const Header = () => {
  const { instance, accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;

  return (
    <header className="header">
      <Link to="/" className="header-title">
        MyApp
      </Link>
      <div className="auth-section">
        <AuthenticatedTemplate>
          <span className="user-info">Welcome, {name}</span>
          <button className="button" onClick={() => handleLogout(instance)}>
            Sign Out
          </button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button className="button button-primary" onClick={() => handleLogin(instance)}>
            Sign In
          </button>
        </UnauthenticatedTemplate>
      </div>
    </header>
  );
};

export default Header;
