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

## to create cluster form yml file

    eksctl  create  cluster  -f  ./cluster.yml
## to add other user(iam role) to access the cluster

    eksctl  create  iamidentitymapping  --cluster  test  --region=ap-south-1  --arn  arn:aws:iam::137440810107:user/test01  --group  system:masters  --no-duplicate-arns

## to add cluster to the context

    aws  eks  --region  ap-south-1  update-kubeconfig  --name  test-eks-01
    

