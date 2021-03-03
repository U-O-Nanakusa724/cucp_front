#!/bin/sh
pidFile=`ls *.pid`
pid=${pidFile%.*}
echo $pid stop server
kill $pid
rm -rf $pidFile