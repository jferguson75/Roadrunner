import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="app-container">
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <UnauthenticatedTemplate>
                <Home />
              </UnauthenticatedTemplate>
              <AuthenticatedTemplate>
                <Dashboard />
              </AuthenticatedTemplate>
            </>
          } />
          <Route path="/dashboard" element={
            <AuthenticatedTemplate>
              <Dashboard />
            </AuthenticatedTemplate>
          } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
