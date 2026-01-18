# logging with promtail, loki, grafana

## steps
1. Deploy loki and promtail via helm
```
cd logging
```
2. deploy loki via loki helm chart
```
https://artifacthub.io/packages/helm/grafana/loki

```
3. deploy promtail from promtail helm chart
```
https://artifacthub.io/packages/helm/grafana/promtail
```
4. update the values to the correct loki endpoint
```
  clients:
    - url: http://my-loki-gateway/loki/api/v1/push
```
5. add loki data source in grafana
```
http://my-loki:3100
```
6. add a dashboard for visualizing logs
```
https://grafana.com/grafana/dashboards/15324-loki-logs-dashboard/
```