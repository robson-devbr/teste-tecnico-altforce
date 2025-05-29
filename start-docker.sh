#!/bin/bash

echo "========================================"
echo "🚀 Docker Control Script"
echo "========================================"
echo "Selecione uma opção:"
echo "1) Iniciar containers (docker-compose up -d --build)"
echo "2) Parar containers (docker-compose down)"
echo "3) Ver containers ativos (docker ps)"
echo "4) Ver logs (docker-compose logs -f)"
echo "5) Iniciando containers já criados (docker-compose start)"
echo "6) Entre no container (docker exec -it backend_api sh)"
echo "7) Sair"
echo "----------------------------------------"

read -p "Digite o número da opção desejada: " opcao

case $opcao in
  1)
    echo "🛠️ Iniciando containers em segundo plano..."
    docker-compose up -d --build
    ;;
  2)
    echo "🛑 Parando containers..."
    docker-compose down
    ;;
  3)
    echo "📦 Containers em execução:"
    docker ps
    ;;
  4)
    echo "📄 Exibindo logs dos containers..."
    docker-compose logs -f
    ;;
  5)
    echo "▶️ Iniciando containers já criados (docker-compose start)..."
    docker-compose start
    ;;
  6)
    echo "▶️ Entre no container (docker exec -it backend_api sh)..."
    docker exec -it backend_api sh
    ;;
  7)
    echo "👋 Saindo..."
    exit 0
    ;;
  *)
    echo "❌ Opção inválida. Tente novamente."
    ;;
esac
