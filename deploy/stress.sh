#!/bin/bash

url="http://localhost:31100/clients"
count=10000

echo "Iniciando $count chamadas GET para $url..."

for ((i = 1; i <= count; i++))
do
  curl -X GET "$url" &> /dev/null
  echo "Requisição $i feita."

  sleep 0.01
done

echo "Chamadas completadas."
