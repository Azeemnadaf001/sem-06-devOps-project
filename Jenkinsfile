pipeline {
    agent any

    environment {
        EC2_HOST = '43.205.94.112'
        EC2_USER = 'ubuntu'
        EC2_KEY = '/var/jenkins_home/.ssh/ec2-key-devOps.pem'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t devops-backend:${BUILD_NUMBER} .'
                    sh 'docker tag devops-backend:${BUILD_NUMBER} devops-backend:latest'
                }
            }
        }

        stage('Test Build') {
            steps {
                script {
                    sh '''
                        docker run --rm devops-backend:latest npm run build
                    '''
                }
            }
        }

        stage('Save Image') {
            steps {
                script {
                    sh 'docker save devops-backend:latest -o backend.tar'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh '''
                        scp -i ${EC2_KEY} -o StrictHostKeyChecking=no backend.tar ${EC2_USER}@${EC2_HOST}:~/ecommerce/
                        ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                            cd ~/ecommerce
                            docker load -i backend.tar
                            docker compose restart backend
                            sleep 5
                            echo 'Backend restarted successfully'
                        "
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded! Backend deployed to EC2'
        }
        failure {
            echo 'Pipeline failed! Check logs for details'
        }
    }
}
