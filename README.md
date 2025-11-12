# Roadrunner

This project was bootstrapped with a full-stack scaffolding script.

## Project Structure

- **/frontend**: Contains the React + Vite client application.
- **/backend**: Contains the Node.js + Express server.
- **/dist_deploy**: Contains the production-ready packaged application, ready for deployment.

## Development

1.  **Run Backend:**
    ```sh
    cd backend
    npm install
    node server.js
    ```

2.  **Run Frontend:**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
    
Your application will be available at `http://localhost:3000`.

## Deployment

1.  Run the `deploy.sh` script (or build manually).
2.  Deploy the contents of the `/dist_deploy` folder to your hosting provider.
3.  Set the start command to `node server.js`.
4.  Set the `NODE_ENV` environment variable to `production`.
