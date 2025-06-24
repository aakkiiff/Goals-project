#!/usr/bin/env bash

# Target endpoint
endpoint="http://115.127.206.116/api/goals/"

# Your Grafana cookie (update if it expires)
cookie="grafana_session=c5fb56838b285023309870752dadb49d; grafana_session_expiry=1750789897"

# Function to build a random alphanumeric string of length N
rand_string() {
  local N=${1:-8}   # default length = 8
  head /dev/urandom | tr -dc 'A-Za-z0-9' | head -c "$N"
}

while true; do
  # Generate a random payload
  text=$(rand_string 12)
  payload="{\"text\":\"${text}\"}"

  # Send the POST
  curl -s \
       -X POST "$endpoint" \
       -H 'Accept: */*' \
       -H 'Accept-Language: en-US,en;q=0.9' \
       -H 'Connection: keep-alive' \
       -H 'Content-Type: application/json' \
       -H "Cookie: $cookie" \
       -H 'Origin: http://115.127.206.116' \
       -H 'Referer: http://115.127.206.116/' \
       -H 'Sec-GPC: 1' \
       -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64)' \
       --data-raw "$payload" \
       --insecure \
       -w " → HTTP %{http_code}\n"

  # Wait a bit before the next POST (optional)
  sleep 1
done
