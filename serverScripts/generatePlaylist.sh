#!/bin/bash

PATH_TO_FILE_LIST=$1

if [ -z $PATH_TO_FILE_LIST ]
then
        echo "No path to file list!"
else
        `ls -d $PATH_TO_FILE_LIST/*.mp3 > $PATH_TO_FILE_LIST/playlist.m3u`
fi