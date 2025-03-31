terraform {
  backend "s3" {
    bucket = "my-jenkins-eks-backend"
    key    = "jenkins/terraform.tfstate"
    region = "us-east-2"
  }
}