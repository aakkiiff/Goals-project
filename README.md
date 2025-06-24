helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

 helm show values grafana/promtail > values.yaml
 helm show values grafana/loki-distributed > values.yaml

helm install promtail grafana/promtail --values promtail.values.yaml

helm install loki grafana/loki-distributed --values loki.values.yaml

http://loki-loki-distributed-query-frontend.lp:3100

count_over_time({pod="server-deployment-79d6ddf455-74bkh"} | logfmt --strict | status="403" [5m])
count_over_time({pod="server-deployment-79d6ddf455-74bkh"} | logfmt | method="GET" [$__interval])

