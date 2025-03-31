pipeline {
    agent any
    environment {
        AWS_DEFAULT_REGION = "us-east-2"
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Configure AWS Credentials") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'new-aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh '''
                        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                        aws configure set default.region $AWS_DEFAULT_REGION
                        aws sts get-caller-identity
                    '''
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'new-aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh '''
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin 577638372446.dkr.ecr.us-east-2.amazonaws.com

                        docker build -t node-app/server-repo:latest .
                          docker tag node-app/server-repo:latest 577638372446.dkr.ecr.us-east-2.amazonaws.com/node-app/server-repo:latest
                 docker push 577638372446.dkr.ecr.us-east-2.amazonaws.com/node-app/server-repo:latest
                    '''
                }
            }
        }

        // Add additional stages like Deploy, Terraform, Notifications, etc.
    }
}