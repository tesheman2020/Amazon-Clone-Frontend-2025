#!/bin/bash
# Kill stuck Firebase emulator Node processes and start emulators

echo "Checking for running Node.js processes that may be Firebase emulators..."
ps -ef | grep node | grep -v grep

echo "Stopping all Node.js processes..."
ps -ef | grep node | grep -v grep | awk '{print $2}' | xargs -r kill -9

sleep 1

cd /c/Users/teshe/OneDrive/Desktop/EVANGADI/Phase-4/Bldg\ Fullstack\ Apps/Project\ Wk-2/Amazon-Clone-Frontend-2025/amazon-clone/functions

echo "Starting Firebase emulators..."
firebase emulators:start

cd /c/Users/teshe/OneDrive/Desktop/EVANGADI/Phase-4/Bldg\ Fullstack\ Apps/Project\ Wk-2/Amazon-Clone-Frontend-2025/amazon-clone/functions

