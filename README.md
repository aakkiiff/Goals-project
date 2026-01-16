# phase 6 monitor everything
## Environment
this edition is tested on 
- kubeadm server
- installed on on prem vmware instances
- 1 master 2 worker
## installation
- we will use this helm chart, kube-prometheus stack
https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
- execute
 ```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install test1 prometheus-community/kube-prometheus-stack \
	--namespace monitor \
	--create-namespace \
	--values values.yaml
```

- install goals app
```
kubectl create ns goals-ns
kubens goals-ns
kubectl apply -f ./k8s
```

## expose
- port forward promethues and grafana dashboard
- prometheus in not password secured , so no need of credentials
- get the grafana creds form the secrets

## visualize
- import the grafana dashboards from the `./grafana-dashboards/`directory


