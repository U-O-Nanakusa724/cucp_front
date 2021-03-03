#!/bin/sh

if [ $# != 1 ]; then
    echo 引数にdevもしくはproを指定してください
    exit 1
else
    nohup npm run serve-$1 >/dev/null &
    pid=$!
    touch $pid.pid
fi