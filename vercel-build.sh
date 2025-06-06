#!/bin/bash
echo "Instalando dependências..."
npm install

echo "Executando build do Ionic com npx..."
npx ionic build

echo "Build concluído com sucesso!"
