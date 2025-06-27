# logging with promtail, loki, grafana

## steps
1. Deploy loki and promtail via helm
```
cd logging

helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```
```
helm show values grafana/promtail > promtail.values.yaml
helm show values grafana/loki-distributed > loki.values.yaml
```
```
helm install promtail grafana/promtail --values promtail.values.yaml
helm install loki grafana/loki-distributed --values loki.values.yaml
```
- must update the promtail helm values to point to loki
```
clients:
 - url: http://loki-loki-distributed-gateway/loki/api/v1/push
```
- once everything is up, deploy grafana from previous stage and point grafana to get values from `http://loki-loki-distributed-query-frontend.ns-of-loki:3100`

2. update the promtain scrape config fir the goals project backend
`k apply -f promtailcm.yaml` 
3. restart the promtail ds
4. deploy the goals app
5. import the loki dashboard from  `grafana-dashboards/logging/goals-serverlog-json`