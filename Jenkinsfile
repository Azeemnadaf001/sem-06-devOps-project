pipeline {
    agent any

    environment {
        EC2_HOST = '13.233.53.119'
        EC2_USER = 'ubuntu'
        EC2_KEY = '/var/jenkins_home/.ssh/ec2-key-devOps.pem'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh '''
                    npm install --prefix server
                    npm run build --prefix server
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                        cd ~/ecommerce
                        git pull origin main
                        docker compose restart backend
                        sleep 5
                        echo 'Backend restarted successfully'
                    "
                '''
            }
        }
    }

    post {
        always {
            deleteDir()
        }
        success {
            echo 'Pipeline succeeded! Backend deployed to EC2'
        }
        failure {
            echo 'Pipeline failed! Check logs for details'
        }
    }
}
