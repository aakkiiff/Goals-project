endpoint="115.127.206.116"

while true; do
  curl -s -o /dev/null \
       -w "%{http_code}\n" \
       "http://${endpoint}/api/goals" \
       -H 'Accept: */*' \
       -H 'Accept-Language: en-US,en;q=0.5' \
       -H 'Connection: keep-alive' \
       -H 'Referer: http://${endpoint}/' \
       -H 'Sec-GPC: 1' \
       -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36' \
       --insecure

  # pause 1s between requests; uncomment if desired
  # sleep 1
done
