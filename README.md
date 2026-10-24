# Asia Capital Quiz Application

A simple full-stack quiz application that tests users on the capitals of different countries.

The application consists of a frontend served using Nginx and a Node.js/Express backend. Both components are containerized using Docker and orchestrated using Docker Compose. The application is deployed on an AWS EC2 instance.

## Live Application

http://54.153.242.181:8080

## Tech Stack

- HTML, CSS, JavaScript
- Node.js
- Express.js
- Nginx
- Docker
- Docker Compose
- AWS EC2

## Project Structure

```text
asia-capital-application/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── data.js
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── docker-compose.yml
```

## How It Works

The application uses two Docker services:

### Backend

The backend is a Node.js/Express application that provides the quiz API.

It exposes:

- `GET /question` — returns a country for the current question.
- `POST /guess` — checks the submitted answer.

The backend runs on port `3000`.

### Frontend

The frontend is a static HTML/CSS/JavaScript application served using Nginx.

It communicates with the backend through the REST API and provides the quiz interface to the user.

The frontend is exposed on port `8080` on the host.

## Docker Setup

Each component has its own Dockerfile.

### Backend Dockerfile

The backend image:

1. Uses Node.js 22.
2. Sets `/app` as the working directory.
3. Installs the dependencies from `package.json`.
4. Copies the application files.
5. Exposes port `3000`.
6. Starts the application using the configured npm script.

### Frontend Dockerfile

The frontend image:

1. Uses the lightweight Nginx Alpine image.
2. Copies the frontend files into the Nginx web directory.
3. Serves the application through Nginx on port `80` inside the container.

## Docker Compose

Docker Compose is used to run both services together.

```yaml
services:

  backend:
    build: ./backend
    ports:
      - "3000:3000"

  frontend:
    build: ./frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
```

The port mappings allow:

```text
Host port 3000 → Backend container port 3000
Host port 8080 → Frontend container port 80
```

## Running Locally

Make sure Docker Desktop is installed and running.

Clone the repository:

```bash
git clone https://github.com/Ekmanjot-4/asia-capital-application.git
cd asia-capital-application
```

Build and start the application:

```bash
docker compose up --build
```

The frontend can then be accessed at:

```text
http://localhost:8080
```

To run the application in detached mode:

```bash
docker compose up --build -d
```

To check running containers:

```bash
docker compose ps
```

To stop the application:

```bash
docker compose down
```

## AWS EC2 Deployment

The application was deployed on an AWS EC2 instance running Amazon Linux 2023.

The deployment process was:

1. Create an EC2 instance.
2. Connect to the instance using SSH.
3. Install Docker.
4. Install Docker Compose.
5. Install Docker Buildx.
6. Clone the GitHub repository.
7. Build the Docker images using Docker Compose.
8. Start the frontend and backend containers.
9. Configure EC2 security group rules for ports `8080` and `3000`.
10. Access the application using the EC2 public IP.

The deployed application is available at:

```text
http://54.153.242.181:8080
```

## Useful Docker Commands

```bash
# Build and start services
docker compose up --build

# Start in detached mode
docker compose up --build -d

# Check running services
docker compose ps

# View logs
docker compose logs

# Stop and remove containers
docker compose down

# List Docker images
docker images

# List running containers
docker ps
```

## Deployment Architecture

```text
                    AWS EC2
              Public IP: 54.153.242.181
                       |
              +--------+--------+
              |                 |
           :8080             :3000
              |                 |
              v                 v
        Frontend Container  Backend Container
             Nginx             Node.js
              |                 |
              +------ API -------+
```

## Key Learning Outcomes

This project demonstrates:

- Containerizing a frontend and backend application.
- Writing Dockerfiles for different application types.
- Using Docker Compose to orchestrate
