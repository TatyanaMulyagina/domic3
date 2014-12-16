#!/bin/sh

sudo add-apt-repository ppa:chris-lea/node.js

sudo apt-get update
sudo apt-get -y install build-essential
sudo apt-get -y install python-software-properties
sudo apt-get -y install nodejs
sudo apt-get -y install postgresql postgresql-contrib postgresql-server-dev-9.3
sudo apt-get -y install git
sudo npm install -g bower

sudo su postgres <<'EOF'
psql -c "CREATE USER admin WITH PASSWORD 'admin';"
psql -c "CREATE DATABASE domic OWNER admin;"
EOF
