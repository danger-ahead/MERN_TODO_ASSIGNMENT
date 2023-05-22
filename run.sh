#!/bin/bash

echo "***start express server***"
cd server
npm i
npm start &

echo "***start react app***"
cd ../client
npm i
npm start