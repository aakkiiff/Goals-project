https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install test1 prometheus-community/kube-prometheus-stack \
  --namespace monitor \
  --create-namespace \
  --values values.yaml
