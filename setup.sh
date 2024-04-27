#!/bin/bash

# Define directories
dir1="./Api"
dir2="./Client"

# Function to run npm install and check for errors
run_npm_install() {
    echo "Installing npm dependencies for $1..."
    cd "$1" || { echo "Error: Directory $1 not found."; exit 1; }
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: npm install failed for $1."
        exit 1
    fi
    echo "npm install completed successfully for $1."
}

# Run npm install for directory 1
run_npm_install "$dir1"

# Run npm install for directory 2
run_npm_install "$dir2"

echo "npm install completed successfully for both directories."
