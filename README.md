# phase 7 alerting using alertmanager
## Environment
this edition is tested on 
- kubeadm server
- installed on on prem vmware instances
- 1 master 2 worker
## installation
- install goals app
```
kubectl create ns goals-ns
kubens goals-ns
kubectl apply -f ./k8s
```
- open slack, go to a space > channel >3 dot > edit channel details > integrations > add an app > Incoming WebHooks > add webhook > copy webhook url

- we will use this helm chart, kube-prometheus stack
https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack

- values.yaml file must have:
```bash
config:
  global:
    resolve_timeout: 10s
  route:
    group_by:
    - alertname
    - serverity
    group_wait: 30s
    group_interval: 5m
    repeat_interval: 1h
    receiver: void
    routes:
    - receiver: slack-notifications
      match:
        project: goals
  receivers:
  - name: void
  - name: slack-notifications
    slack_configs:
    # add channel name with #
    - channel: "#demo"
      send_resolved: true
      # add webhook url here
      api_url: 'https://hooks.slack.com/services/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'   
      title: "{{ range .Alerts }}[{{ .Status | toUpper }}] {{ .Labels.alertname }}\n{{ end }}"
      text: "{{ range .Alerts }}{{ .Annotations.description }}\n{{ end }}"
```

- execute
 ```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install test1 prometheus-community/kube-prometheus-stack \
	--namespace monitor \
	--create-namespace \
	--values values.yaml
```

- create promethues rule(rule must have label release: "helm chart name") so that promethues counts that rule
`kubectl apply -f ./alerts/`
= group label must match with on values.yaml
```
routes:
	- receiver: slack-notifications
	   match:
			project: goals #this label 
```
- changing promethues rule, might need to restart prometheus!
- port forwart prometheus and alertmanager
- alert will trigger if high cpu/ram usage/ wrong image name/ oom killed.test any of this and check promethues alert gets triggered.
- if fires > go to alert manager dashboard and check for alerts.
- check which receiver alert  went for? slack/void.
- if slack then the msg will come to slack.
- if no msg comes check alertmanager logs.must be invalid webhook!

## feature to be introduced
- pvc, pv should be added and monitored
	- dynamic alert manager config!?