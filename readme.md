# Goals Project - CI/CD Pipeline

## Project Overview
Automated CI/CD pipeline using Jenkins, Docker, and GitHub webhooks to build and deploy a full-stack web application.

## Technologies Used
- **Cloud:** AWS EC2 (Ubuntu 24.04)
- **CI/CD:** Jenkins (containerized)
- **Containerization:** Docker
- **Version Control:** GitHub
- **Registry:** DockerHub
- **Automation:** GitHub Webhooks

## Architecture
```
GitHub (PR) → Webhook → Jenkins → Docker Build → DockerHub
```

## Implementation

### Infrastructure
- EC2 instance: m7i-flex.large
- Jenkins running in Docker container
- Ports: 22 (SSH), 8080 (Jenkins), 80 (HTTP)

### Pipeline Workflow
1. Developer creates Pull Request (dev → master)
2. GitHub sends webhook to Jenkins
3. Jenkins Generic Webhook Trigger filters for PR events
4. Jenkinsfile stages execute:
   - Checkout code from repository
   - Build frontend Docker image
   - Build backend Docker image
   - Push images to DockerHub
5. Images available in DockerHub registry

## Results
✅ Automated Docker image builds on PR creation  
✅ Images successfully pushed to DockerHub  
✅ Full CI automation achieved  

### DockerHub Images
- Frontend: `iankibria/goals_project_frontend:latest`
- Backend: `iankibria/goals_project_backend:latest`

## Links
- **DockerHub:** https://hub.docker.com/u/iankibria
- **Jenkins Pipeline:** (Include screenshot)

## Author
[Ian Kibria]  
[PIIT DevOps]  
[Jan 2026]
