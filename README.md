https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install test1 prometheus-community/kube-prometheus-stack \
  --namespace monitor \
  --create-namespace \
  --values values.yaml

---------------------------------------------------------------------------------

#grafana
# memory usage
> 
100 * (1 - avg(node_memory_MemAvailable_bytes) by (instance) / avg(node_memory_MemTotal_bytes) by (instance))

> 
label_replace(
  100 * (1 - avg(node_memory_MemAvailable_bytes) by (instance) / avg(node_memory_MemTotal_bytes) by (instance))
  * on(instance) group_left(nodename) node_uname_info,
  "instance", "", "instance", ".*"
)


# cpu usage
> 
100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

>

label_replace(
  (100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100))
  * on(instance) group_left(nodename) node_uname_info,
  "instance", "", "instance", ".*"
)
