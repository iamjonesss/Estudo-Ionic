#!/bin/bash
echo "Instalando dependências..."
npm install

echo "Instalando dependências do Ionic CLI..."
npm i -g @ionic/cli

echo "Executando build do Ionic..."
npx ionic build

echo "Build concluído com sucesso!"
