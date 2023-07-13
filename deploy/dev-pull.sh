#!/bin/bash

# Pull project code from GitLab
git pull origin rcds09/dev;

# Install dependencies
yarn install;

# Build app
yarn build;

# Restart application
pm2 restart dev.frontend.besthome.sabr.com.tr;
