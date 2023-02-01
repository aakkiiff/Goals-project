pipeline {
    agent any
    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKERHUB_USER = 'aakkiiff'
        FRONTEND_APP = "goals_project_frontend"
        BACKEND_APP = "goals_project_backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/${FRONTEND_APP}"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/${BACKEND_APP}"
    }

    stages {
        stage('cleanup Workspace') {
            steps {
                script{
                    cleanWs()
                }
                
            }
        }

        stage('Checkout') {
            steps {
                git 'https://github.com/aakkiiff/Goals-project'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} -t ${FRONTEND_IMAGE}:latest -f ./frontend/Dockerfile ./frontend'
                sh 'docker build --no-cache -t ${BACKEND_IMAGE}:${BUILD_NUMBER} -t ${BACKEND_IMAGE}:latest -f ./backend/Dockerfile ./backend'
                echo "ALL IMAGES BUILT"

            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USER_NAME')]) {
                    sh 'docker login -u $USER_NAME -p $PASSWORD'
                    sh 'docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}'
                    sh 'docker push ${FRONTEND_IMAGE}:latest'
                    sh 'docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}'
                    sh 'docker push ${BACKEND_IMAGE}:latest'
                    echo "ALL IMAGES PUSHED"
                    sh 'docker logout'
                        }
                }
        }

        // stage("DELETE OLD IMAGES"){
        //     steps{
        //             sh 'docker rmi ${FRONTEND_IMAGE}:${BUILD_NUMBER}'
        //             sh 'docker rmi ${FRONTEND_IMAGE}:latest'
        //             sh 'docker rmi ${BACKEND_IMAGE}:${BUILD_NUMBER}'
        //             sh 'docker rmi ${BACKEND_IMAGE}:latest'
        //     }
        // }


         stage('UPDATE K8s DEPLOYMENT FILE') {
             steps {
                 sh 'cat ./k8s/client-deployment.yml'
                //  sh "sed -i 's/aakkiiff.*/aakkiiff\/goals_project_frontend:${IMAGE_TAG}/g' ./k8s/client-deployment.yml"
                sh "sed -i 's/${FRONTEND_APP}.*/${FRONTEND_APP}:${IMAGE_TAG}/g' ./k8s/client-deployment.yml"
                sh "sed -i 's/${BACKEND_APP}.*/${BACKEND_APP}:${IMAGE_TAG}/g' ./k8s/server-deployment.yml"
                sh 'cat ./k8s/client-deployment.yml'
                sh 'cat ./k8s/server-deployment.yml'
                 
                 }
             }
            
     }
}