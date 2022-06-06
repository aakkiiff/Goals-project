# for docker compose:

 1. have docker running
 2. replace the mongodb url with urs
 3. `docker compose up`
 4. done!

# for kubernetes deployment :

 1. have kubectl,awscli,eksctl installed
 2. push all the all the custom docker images to your docker repositories and update the deployment file at k8s directory
 3. have eks cluster running manually or from the cluster.yml file.
 4. add cluster to context if u r using different machine
 5. add user to access the cluster if u want to add other user than the creator
 6. have helm installed 
 7. install k8s ingress nginx from here `https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx`
 
 - [ ] `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
 - [ ] `helm repo update`
 - [ ] `helm install name ingress-nginx/ingress-nginx`
 

    lastly , run `kubectl apply -f ./k8s/`
  go to the loadbalancer link to check the deployment

# for jenkins cicd eks deployment

 1. have jenkins,docker running
 2. make a jenkins freestyle job naming it *triggerer*,it will be invoked once code is commited to github
 3. add webhook to your github repo , as: yourpublicip/github-webhook/
 4. if you are using your personal pc,u can use ngrok [youtube video to set up ngrok](https://youtu.be/adVWQc8T9qg)
 5. create a jenkins pipeline job,and configure it to be triggered once *triggerer* finishes its job.
 6. on pipeline job paste the jenkins file contents.
 7. all commands are for windows batch command so there are those "bat " keywords.change them to sh for linux
 8. if using linux change docker login command to this:
 9. `echo "$MY_PASSWORD" | docker login --username foo --password-stdin`
 10. here MY_PASSWORD should be configured on jenkins secrets and credentials section. *ps this command for some reason doesnt work on windows due to some bug.* 
 11. once jenkins ,ngrok,ready make sure to update the docker hub account and repo names from the files
 12. create the eks cluster from cluster.yml file or manually from console
 13. push ur codes to the git repo and rest will work automatically


## to create cluster form yml file

    eksctl  create  cluster  -f  ./cluster.yml
## to add other user(iam role) to access the cluster

    eksctl  create  iamidentitymapping  --cluster  test  --region=ap-south-1  --arn  arn:aws:iam::137440810107:user/test01  --group  system:masters  --no-duplicate-arns

## to add cluster to the context

    aws  eks  --region  ap-south-1  update-kubeconfig  --name  test-eks-01
    

