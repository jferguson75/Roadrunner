import React from 'react';
import { useMsal } from "@azure/msal-react";

const Dashboard = () => {
    const { accounts } = useMsal();
    const name = accounts[0] && accounts[0].name;

    return (
        <div className="content-box">
            <h1>Authenticated Dashboard</h1>
            <p>Welcome, <strong>{name}</strong>! You have successfully signed in.</p>
            <p>This is your protected dashboard area. Only authenticated users can see this content.</p>
        </div>
    );
};

export default Dashboard;
