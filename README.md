 helm show values grafana/promtail > values.yaml
 helm show values grafana/loki-distributed > values.yaml

helm install promtail grafana/promtail --values promtail.values.yaml

helm install loki grafana/loki-distributed --values loki.values.yaml